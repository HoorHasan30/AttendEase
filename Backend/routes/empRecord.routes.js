const router = require("express").Router();
const empRecordsController = require('../controllers/empRecord.controller')

const verifyToken = require("../middleware/verifyToken");
const isHR = require('../middleware/isHR')

router.get('/', verifyToken, isHR, empRecordsController.getAllCompanyRecords)

module.exports = router;
