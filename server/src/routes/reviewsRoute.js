const Router = require("express");

const reviewsController = require("../controllers/reviewsController");

// const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.get("/", reviewsController.getAllReviws);

module.exports = router;
