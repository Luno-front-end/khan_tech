const { Readable } = require("stream");
const csv = require("fast-csv");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const ReviewsModel = require("../models/Reviews");
const TestModel = require("../models/Test");
const path = require("path");

const dirPath = path.join(__dirname, "../files");

const newArray = require("../utils/setArraysForTables");

let currentFilePath = "";
const newData = [];
const checkPos = [];

const uploadFile = async (file, res) => {
  const delSpaceFile = file.name.replace(/ /g, "_");
  const id = uuidv4();

  fs.mkdirSync(dirPath + `/${id}`);
  currentFilePath = dirPath + `/${id}/${delSpaceFile}`;
  await file.mv(currentFilePath, "utf8");
};

const reedAndSaveDate = async (req, res) => {
  const reviewsCheckTables = new ReviewsModel();
  await reviewsCheckTables.checkTables();
  const file = req.files.file;

  await uploadFile(file);

  csv
    .parseFile(currentFilePath, { headers: true })
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      const columns = Object.keys(row);
      const values = Object.values(row);
      const columsNoSpace = columns.map((item) =>
        item.replace(/ /g, "_").toLowerCase()
      );

      const review = new ReviewsModel(columsNoSpace, values);

      newData.push(review.removeSpaces());
    })
    .on("end", async () => {
      await processDataRows(newData);
    });

  async function processDataRows(data) {
    const reviews = new TestModel(data);
    await reviews.myData();
    // reviews.dellCeche();
  }

  // setTimeout(() => {
  //   fs.rm(currentFilePath, { recursive: true }, (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log("Папку видалено успішно");
  //     }
  //   });
  // }, 25000);

  res.status(200).json({ file: "ok" });
};

const get = async (req, res) => {
  const reviewsModel = new ReviewsModel();
  const oo = await reviewsModel.getAllCcomments();
  res.send(oo);
};

module.exports = { get, reedAndSaveDate };
