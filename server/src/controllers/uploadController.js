const csv = require("fast-csv");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const RecordReviewsModel = require("../models/RecordReviews");
const path = require("path");

const cache = require("../utils/caching");

const dirPath = path.join(__dirname, "../files");

let currentFilePathFolder = "";
let currentPathFile = "";
const newData = [];

// Видаляється тільки файл, але і папка повинна теж

const uploadFile = async (file, res) => {
  const delSpaceFile = file.name.replace(/ /g, "_");
  const id = uuidv4();

  fs.mkdirSync(dirPath + `/${id}`);
  currentFilePathFolder = dirPath + `/${id}/`;
  currentPathFile = currentFilePathFolder + `/${delSpaceFile}`;

  await file.mv(currentPathFile, "utf8");
};

const reedAndSaveData = async (req, res) => {
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
            console.error(err);
          } else {
            console.log("Папку видалено успішно");
          }
        });
      }, 25000);
      await processDataRows(newData);
    });

  async function processDataRows(data) {
    const reviews = new RecordReviewsModel(data);
    await reviews.myData();

    // const keysCahe = ["Reviewers", "Companyn", "Position"];
    // cache.delCeche(keysCahe);
    // reviews.dellCeche();
  }

  res.status(200).json({ message: "File upload" });
};

const getAllReviews = async (req, res) => {
  const reviewsModel = new RecordReviewsModel();
  const reviews = await reviewsModel.getAllCcomments();
  res.status(200).json({ message: "200 OK" });
};

module.exports = { getAllReviews, reedAndSaveData };
