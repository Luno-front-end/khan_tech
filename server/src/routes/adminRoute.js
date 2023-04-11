const Router = require("express");

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/login", adminController.loginAdmin);
router.post("/registration", adminController.createUser);
router.get("/auth", authMiddleware, adminController.auth);

module.exports = router;
