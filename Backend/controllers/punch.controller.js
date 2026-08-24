const readXlsxFile = require('read-excel-file/node');
const { readSheet }  =  require('read-excel-file/node')

const Punch = require('../models/Punch')


async function parsePunchData(req, res) {
    try {
        
        const { punchFile } = req.File
        
        if (!punchFile) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log(punchFile)

        const punchSchema = {
            'Employee ID': { prop: 'employeeId', type: String },
            'Date': { prop: 'date', type: Date },
            'In': { prop: 'clockIn', type: String },
            'Out': { prop: 'clockOut', type: String }
        }

        const { rows, errors } = await readXlsxFile(punchFile, { schema: punchSchema });

        if (errors.length > 0) {
            return res.status(400).json({ message: "Excel parsing errors", errors });
        }

        // converting to objects
        const createdObjects = rows.map(r => ({
            ...r,
            company: req.user.company
        }))

        const createdRecords = await Punch.insertMany(createdObjects)

        res.status(200).json(createdRecords)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    parsePunchData
}