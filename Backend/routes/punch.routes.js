const router = require("express").Router();
const punchController = require('../controllers/punch.controller')

const verifyToken = require("../middleware/verifyToken");
const isHr = require('../middleware/isHR')

const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/', upload.single('punchData'), verifyToken, isHr, punchController.parsePunchData)
router.post('/calculate', verifyToken, isHr, punchController.calculateData)

module.exports = router;