const express = require("express");
const fileUpload = require("express-fileupload");
const CommentsModel = require("./models/RecordReviews");

require("dotenv").config();

const uploadRoute = require("./routes/uploadRoute");
const userRoute = require("./routes/userRoute");
const reviewsRoute = require("./routes/reviewsRoute");

const app = express();

app.use(express.json());
app.use(fileUpload({}));

app.use("/upload", uploadRoute);
app.use("/reviews", reviewsRoute);
app.get("/q", async (req, res) => {
  const t = new CommentsModel();
  await t.deleteTables();
});
// app.use("/q", async () => {

//   });

app.listen(8080, () => console.log(8080));
