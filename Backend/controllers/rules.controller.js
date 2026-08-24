const User = require("../models/User");
const Company = require('../models/Company');
const Rules = require('../models/Rules')


async function getCompanyRules(req, res) {
    try {
        const foundRules = await Rules.findOne({ company: req.user.company })
        res.status(200).json(foundRules)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function setRules(req, res) {
    try {
        const { shiftStart, shiftEnd, lateArraivalsAllowed, lateArraivalsDuration,
            punchesExcused, countEarlyArraival, countEarlyLeave } = req.body

        const createdRules = await Rules.create({
            company: req.user.company,
            shiftStart,
            shiftEnd,
            lateArraivalsAllowed,
            lateArraivalsDuration,
            punchesExcused,
            countEarlyArraival,
            countEarlyLeave
        })

        res.status(201).json(createdRules)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        return res.status(500).json({ message: err.message })
    }
}

async function updateRules(req, res) {
    try {
        const foundRules = await Rules.findOne({ company: req.user.company })

        const { shiftStart, shiftEnd, lateArraivalsAllowed, lateArraivalsDuration,
            punchesExcused, countEarlyArraival, countEarlyLeave } = req.body

        foundRules.shiftStart = shiftStart
        foundRules.shiftEnd = shiftEnd
        foundRules.lateArraivalsAllowed = lateArraivalsAllowed
        foundRules.lateArraivalsDuration = lateArraivalsDuration
        foundRules.punchesExcused = punchesExcused
        foundRules.countEarlyArraival = countEarlyArraival
        foundRules.countEarlyLeave = countEarlyLeave
        
        await foundRules.save()

        res.status(200).json(foundRules)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getCompanyRules,
    setRules,
    updateRules
}