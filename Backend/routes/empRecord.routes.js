const router = require("express").Router();
const empRecordsController = require('../controllers/empRecord.controller')

const verifyToken = require("../middleware/verifyToken");
const isHR = require('../middleware/isHR')

router.get('/', verifyToken, isHR, empRecordsController.getAllCompanyRecords)
router.post('/dashboard', verifyToken, isHR, empRecordsController.getDashboard)

module.exports = router;
