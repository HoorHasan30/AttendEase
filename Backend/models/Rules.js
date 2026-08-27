const mongoose = require('mongoose')

const rulesSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        shiftStart: {
            type: String,
            required: true,
        },
        shiftEnd: {
            type: String,
            required: true
        },
        lateArrivalsAllowed: {
            type: Number,
            required: true
        },
        lateArrivalDuration: {
            type: Number,
            required: true
        },
        missedPunches: {
            type: Number,
            required: true
        },
        countEarlyArraival: {
            type: Boolean,
            required: true,
            default: false
        },
        countEarlyLeave: {
            type: Boolean,
            required: true,
            default: false
        },
        workingDays: {
            type: [String],
            required: true,
        }
    }, { timestamps: true }
)

const Rules = mongoose.model('Rules', rulesSchema)

module.exports = Rules