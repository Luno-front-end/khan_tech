const Router = require("express");

const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", authMiddleware, uploadController.reedAndSaveData);
router.get("/", authMiddleware, uploadController.deleteAllReviews);

module.exports = router;
