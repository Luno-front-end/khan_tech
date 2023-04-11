const ReceivingReviews = require("../models/ReceivingReviews");
const RecordReviewsModel = require("../models/RecordReviews");
const getDataReviews = require("../utils/getDataReviews");

const getAllReviws = async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;

    const reviewsCheckTables = new RecordReviewsModel();
    await reviewsCheckTables.checkTables();

    const receivingReviews = new ReceivingReviews(page, limit);

    const data = await receivingReviews.getAllEmployee();

    const newData = await getDataReviews(data);

    return res.status(200).json({
      data: newData,
      count: data.count,
      page: page,
      pages: data.pages,
    });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

module.exports = { getAllReviws };
