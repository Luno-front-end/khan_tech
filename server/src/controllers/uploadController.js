const csv = require("fast-csv");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const RecordReviewsModel = require("../models/RecordReviews");
const AdminUser = require("../models/AdminUser");
const path = require("path");

const dirPath = path.join(__dirname, "../files");

let currentFilePathFolder = "";
let currentPathFile = "";
const newData = [];

const uploadFile = async (file, res) => {
  const delSpaceFile = file.name.replace(/ /g, "_");
  const id = uuidv4();

  fs.mkdirSync(dirPath + `/${id}`);
  currentFilePathFolder = dirPath + `/${id}/`;
  currentPathFile = currentFilePathFolder + `/${delSpaceFile}`;

  await file.mv(currentPathFile, "utf8");
};

const reedAndSaveData = async (req, res) => {
  try {
    const reviewsCheckTables = new RecordReviewsModel();
    await reviewsCheckTables.checkTables();
    const file = req.files.file;

    await uploadFile(file);

    csv
      .parseFile(currentPathFile, { headers: true })
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        const columns = Object.keys(row);
        const values = Object.values(row);
        const columsNoSpace = columns.map((item) =>
          item.replace(/ /g, "_").toLowerCase()
        );

        const review = new RecordReviewsModel(null, columsNoSpace, values);

        newData.push(review.removeSpaces());
      })
      .on("end", async () => {
        setTimeout(() => {
          fs.rm(currentFilePathFolder, { recursive: true }, (err) => {
            if (err) {
              res.status(500).json({ error: err });
              console.error(err);
            }
          });
        }, 50000);
        await processDataRows(newData);
        res.status(200).json({ message: "File upload" });
      });

    async function processDataRows(data) {
      const reviews = new RecordReviewsModel(data);
      await reviews.myData();
    }
  } catch (error) {
    res.status(500).json({ message: "File err" });
  }
};

const deleteAllReviews = async (req, res) => {
  try {
    const reviewsModel = new RecordReviewsModel();

    await reviewsModel.deleteTables();

    res.status(200).json({ message: "200 OK" });
  } catch (error) {
    res.status(500).json({ message: "error deleted" });
  }
};

module.exports = { deleteAllReviews, reedAndSaveData };
