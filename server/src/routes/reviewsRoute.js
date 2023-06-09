const Router = require("express");

const reviewsController = require("../controllers/reviewsController");
const corsMiddleware = require("../middleware/corsMiddleware");

const router = new Router();

router.get("/", corsMiddleware, reviewsController.getAllReviws);

module.exports = router;
