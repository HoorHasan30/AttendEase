const mongoose = require('mongoose')

const punchSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Compnay'
        },
        employeeId: {
            type: String
        },
        date: {
            type: Date
        },
        clockIn: {
            type: String
        },
        clockOut: {
            type: String
        },
        calculated: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

const Punch = mongoose.model('Punch', punchSchema)

module.exports = Punch