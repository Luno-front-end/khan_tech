const Router = require("express");

const uploadController = require("../controllers/uploadController");

// const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", uploadController.reedAndSaveDate);
router.get("/", uploadController.get);

module.exports = router;
