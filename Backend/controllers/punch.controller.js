const readXlsxFile = require('read-excel-file/node');
const { readSheet } = require('read-excel-file/node')

const Punch = require('../models/Punch')
const Rule = require('../models/Rules')
const EmployeeRecord = require('../models/EmployeeRecord')
const XLSX = require('xlsx')


async function parsePunchData(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        const workbook = XLSX.read(req.file.buffer);

        const firstSheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet);

        const normalizedData = rows.map((card) => {

            // convert date formate
            return {
                employeeId: card['Employee ID'],
                date: formatDate(card['Date']),
                clockIn: card['In'],
                clockOut: card['Out'],
                company: req.user.company
            }
        })

        const createdRecords = await Punch.insertMany(normalizedData)

        res.status(200).json(createdRecords)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}

// function re-format the date
function formatDate(oldDate) {

    if (!oldDate) {
        return null
    }

    // if already formated
    if (oldDate instanceof Date) {
        return value.toISOString().split('T')[0];
    }

    //if (DD/MM/YYYY)
    if (typeof oldDate === 'string') {
        const parts = oldDate.split('/');
        if (parts.length === 3) {
            const [dd, mm, yyyy] = parts;
            return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        }
    }

}

async function calculateData(req, res) {
    try {

        // get the company rules and destructuring the fields
        const rules = await Rule.findOne({ company: req.user.company })

        if (!rules) {
            return res.status(404).json({ message: "Rules not found" })
        }

        const {
            shiftStart, shiftEnd,
            lateArrivalsAllowed, lateArrivalDuration,
            missedPunches,
            countEarlyArraival, countEarlyLeave,
            workingDays
        } = rules

        // converting Hours to Minutes
        const shiftStartMin = timeToMinutes(shiftStart)
        const shiftEndMin = timeToMinutes(shiftEnd)
        const scheduledMinutes = shiftEndMin - shiftStartMin //Whole shift duration in minutes

        // get the punches that are just inserted in Punches (not calculated yet) and sort them
        const newPunches = await Punch.find({ company: req.user.company, calculated: false }).sort({ employeeId: 1, date: 1 })

        if (!newPunches.length) {
            return res.status(200).json({ message: "There are no new records to calculate" })
        }

        // Grouping punhes by employeeId for easiser count of missed punches, and late arraivals
        const employeePunches = {}

        newPunches.forEach(p => {

            // if employee is have no array in the object, create it
            if (!employeePunches[p.employeeId]) {
                employeePunches[p.employeeId] = []
            }

            // push the punch to the employee array in the object
            employeePunches[p.employeeId].push(p)
        })

        const recordsToInsert = []
        const calculatedPunchIds = []

        // looping through the object of employeePunches
        Object.values(employeePunches).forEach(empPunch => {

            let lateCount = 0
            let missingPunchesCount = 0

            // loop through each empPunche
            empPunch.forEach(p => {

                // EmployeeRecords Fields
                const notes = []
                let workedHours = 0
                let shortage = 0
                let overtime = 0

                // mapping each date to its actual day
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayName = days[new Date(p.date).getDay()]

                // Rule 1: Check if the date is a working day 
                const isWorkingDay = workingDays.includes(dayName)
                if (!isWorkingDay) {
                    // no calculation, but mark it as calculated
                    calculatedPunchIds.push(p._id)
                    return // to stop the rest of calculations
                }

                // Rule 2: Check for missed Punches
                if (!p.clockIn || !p.clockOut) {
                    missingPunchesCount++

                    // check if count exceeded the missedPunches
                    if (missingPunchesCount > missedPunches) {
                        // add note
                        notes.push('Missing Punch - Unexcused')

                        // set shortage
                        shortage = scheduledMinutes
                    }
                    else {
                        // add note
                        notes.push('Missing Punch - Excused')
                    }

                    // set the record that have a missed punch 
                    recordsToInsert.push({
                        punchRecord: p._id,
                        workedHours: 0,
                        shortage,
                        overtime: 0,
                        notes
                    })

                    // set the punch to calculated
                    calculatedPunchIds.push(p._id)

                    // skip the rest of calculations 
                    return
                }

                // Rule 3: Check for workingHours
                const clockInMin = timeToMinutes(p.clockIn)
                const clockOutMin = timeToMinutes(p.clockOut)

                // Calculate worked hours by Hours
                workedHours = (clockOutMin - clockInMin) / 60

                // Rule 4: Check for late arrival duration
                if (clockInMin > shiftStartMin) {
                    const lateMinutes = clockInMin - shiftStartMin

                    // Compare to comany late arrival duration
                    if (lateMinutes <= lateArrivalDuration) {  // late within company excused duration
                        lateCount++

                        // Rule 5: Check for late arrivals allowed
                        if (lateCount > lateArrivalsAllowed) {
                            // add note
                            notes.push('Late Arrival - Unexcused')

                            // set shortage
                            shortage += lateMinutes
                        }
                        else {
                            // add note
                            notes.push('Late Arrival - Excused')
                        }
                    }
                    else {
                        // add note
                        notes.push('Late Arrival - Exceeds Allowed Duration')

                        // set shortage
                        shortage += lateMinutes
                    }
                }

                // Rule 6: Check for early arrival & late leave
                // Clock In
                if (clockInMin < shiftStartMin) {

                    // calculate duration
                    const earlyMinutes = shiftStartMin - clockInMin

                    // Rule 7: Check if company counts the early arrival
                    if (countEarlyArraival) {
                        overtime += earlyMinutes
                    }
                }
                // Clock Out
                if (clockOutMin < shiftEndMin) { // shortage

                    // calculate duration
                    const earlyLeaveMinutes = shiftEndMin - clockOutMin

                    // Rule 8: Check if company counts the early leave
                    if (countEarlyLeave) {
                        shortage += earlyLeaveMinutes
                    }
                }
                else if (clockOutMin > shiftEndMin) { //overtime
                    const lateLeave = clockOutMin - shiftEndMin
                    overtime += lateLeave
                }

                // set the record
                recordsToInsert.push({
                    punchRecord: p._id,
                    workedHours,
                    shortage,
                    overtime,
                    notes
                })

                // set the punch to calculated
                calculatedPunchIds.push(p._id)
            })
        })

        // Insert the EmployeeRecords
        if (recordsToInsert.length) {
            await EmployeeRecord.insertMany(recordsToInsert)
        }

        // Update the Calculated Punches
        if (calculatedPunchIds.length) {
            await Punch.updateMany(
                { _id: { $in: calculatedPunchIds } },
                { $set: { calculated: true } }
            )
        }

        res.status(200).json({ message: "Calculation Complete", recordsToInsert: recordsToInsert.length })
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}


// Convert "HH:MM" strings to minutes for comparison
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

module.exports = {
    parsePunchData,
    calculateData
}