import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("HI!");
});

app.listen(8080, () => console.log(8080));
