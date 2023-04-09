const Router = require("express");

const userController = require("../controllers/userController");

// const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", userController.createUser);

module.exports = router;