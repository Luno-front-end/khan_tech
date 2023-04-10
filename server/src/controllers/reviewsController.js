const RecordReviews = require("../models/RecordReviews");
const ReceivingReviews = require("../models/receivingReviews");
const getDataReviews = require("../utils/getDataReviews");

const getAllReviws = async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;

    const receivingReviews = new ReceivingReviews(page, limit);
    const cachEmployeeLength = receivingReviews.checkCachEmployee().length;

    // if (cachEmployeeLength === 0) {
    const data = await receivingReviews.getAllEmployee();

    const newData = await getDataReviews(data);

    return res.status(200).json({
      data: newData,
      count: data.count,
      page: page,
      pages: data.pages,
    });
    // } else {
    //   const data = receivingReviews.checkCachEmployee();
    //   const newData = await getDataReviews(data);

    //   return res.status(200).json({
    //     data: newData,
    //     count: data.count,
    //     page: page,
    //     pages: data.pages,
    //   });
    // }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

module.exports = { getAllReviws };
