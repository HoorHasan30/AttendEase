const mongoose = require('mongoose')
function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "No object matching the id provided" });
  }
  next()
}

module.exports = validateObjectId