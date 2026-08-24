const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true
        },
        hrEmployees: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, { timestamps: true }
)

const Company = mongoose.model('Company', companySchema)

module.exports = Company