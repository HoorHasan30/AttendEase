const router = require("express").Router();
const rulesController = require('../controllers/rules.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')
const isCompany = require('../middleware/isCompany');
const isHR = require('../middleware/isHR')

router.get('/', verifyToken, rulesController.getCompanyRules)
router.post('/set-rules', verifyToken, isCompany, rulesController.setRules)
router.put('/update-rules', verifyToken, isCompany, rulesController.updateRules)

module.exports = router;
