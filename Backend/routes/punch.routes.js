const router = require("express").Router();
const punchController = require('../controllers/punch.controller')

const verifyToken = require("../middleware/verifyToken");
const isHr = require('../middleware/isHR')

router.post('/', verifyToken, isHr, punchController.parsePunchData)

module.exports = router;