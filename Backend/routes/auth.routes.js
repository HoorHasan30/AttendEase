const router = require("express").Router();
const authController = require('../controllers/auth.controller')

const verifyToken = require("../middleware/verifyToken");
const isCompany = require('../middleware/isCompany');

router.post("/register-company", authController.registerCompany);
router.post("/register-hr", verifyToken, isCompany, authController.registerHr)
router.post("/sign-in",  authController.signIn);
router.get("/me", verifyToken, authController.verifyUser);
router.get("/hr-list", verifyToken, isCompany, authController.getHrList)
router.delete("/delete-hr/:id", verifyToken, isCompany, authController.deleteHrAccount )

module.exports = router;
