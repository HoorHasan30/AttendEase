const EmployeeRecord = require('../models/EmployeeRecord')
const Punch = require('../models/Punch')

async function getAllCompanyRecords(req, res) {
    try {

        // get company punches Id
        const companyPunches = await Punch.find({ company: req.user.company }).select('_id')
        const punchIds = companyPunches.map(p => p._id)

        // get the records
        const foundRecords = await EmployeeRecord.find({ punchRecord: { $in: punchIds } }).populate('punchRecord')

        if (!foundRecords) {
            return res.status(404).json({ message: "There are no records found" })
        }

        res.status(200).json(foundRecords)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getDashboard(req, res) {
    try {
        const { from, to } = req.body

        if (!from || !to){
            return res.status(400).json({ message: "Both dates are required" })
        }

        // get punches filtered by the dates
        const punches = await Punch.find({ company: req.user.company, date: { $gte: new Date(from), $lte: new Date(to)} })

        // get records
        const records = await EmployeeRecord.find({ punchRecord: { $in: punchIds } }).populate('punchRecord')

        // collecting data
        let totalShortage = 0
        let totalOvertime = 0

        // grouped by day(date)
        const byDay = {}

        records.forEach( r => {
            totalShortage += r.shortage
            totalOvertime += r.overtime

            const recDate = r.punchRecord.date.toISOString().split('T')[0]

            // if the day is not in the object
            if(!byDay[recDate]){
                byDay[recDate] = { date: recDate, shortage: 0, overtime: 0 }
            }

            byDay[recDate].shortage += r.shortage
            byDay[recDate].overtime += r.overtime
        })
        
        const trendChartData = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date))

        res.status(200).json({
            totalShortage,
            totalOvertime,
            trendChartData
        })
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllCompanyRecords,
    getDashboard
}