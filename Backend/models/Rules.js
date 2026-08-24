const mongoose = require('mongoose')

const rulesSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        shiftStart: {
            type: Date,
            required: true,
        },
        shiftEnd: {
            type: Date,
            required: true
        },
        lateArraivalsAllowed: {
            type: Number,
            required: true
        },
        lateArraivalsDuration: {
            type: Number,
            required: true
        },
        punchesExcused: {
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
            default: true
        }
    }
)

const Rules = mongoose.model('Rules', rulesSchema)

module.exports = Rules