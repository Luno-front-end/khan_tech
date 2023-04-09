const Router = require("express");

const uploadController = require("../controllers/uploadController");

// const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", uploadController.reedAndSaveData);
router.get("/", uploadController.getAllReviews);

module.exports = router;
