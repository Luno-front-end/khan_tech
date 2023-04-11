const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

const uploadRoute = require("./routes/uploadRoute");
const adminRoute = require("./routes/adminRoute");
const reviewsRoute = require("./routes/reviewsRoute");

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/upload", uploadRoute);
app.use("/reviews", reviewsRoute);
app.use("/delete", uploadRoute);
app.use("/", adminRoute);

app.listen(8080, () => console.log(8080));
