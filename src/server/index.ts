import express from "express";

const app = express();

app.use(express.json());

app.get("/api/hi", (req, res) => {
  res.send("Hello World!");
});

app.listen(3002, () => {
  console.log("Example app listening on port 3000!");
});
