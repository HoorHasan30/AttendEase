const EmployeeRecord = require('../models/EmployeeRecord')
const Punch = require('../models/Punch')

async function getAllCompanyRecords(req, res) {
    try {

        // get company punches Id
        const companyPunches = await Punch.find({ company: req.user.company }).select('_id')
        const punchIds = companyPunches.map( p => p._id)

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

module.exports = {
    getAllCompanyRecords
}