const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
    {
        CompanyName: {
            type: String,
            required: true
        },
        HrEmployees: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, { timestamps: true }
)

const Company = mongoose.model('Company', companySchema)

module.exports = Company