const mongoose = require('mongoose')

const EmpSchema = new mongoose.Schema(
    {
        punchRecord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Punch'
        },
        workedHours: {
            type: Number
        },
        shortage: {
            type: Number
        },
        overtime: {
            type: Number
        },
        notes: {
            type: [String],
            default: "No Notes"
        }
    },
    {timestamps: true}    
)

const EmployeeRecord = mongoose.model('EmployeeRecord', EmpSchema)

module.exports = EmployeeRecord