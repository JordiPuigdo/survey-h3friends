import express from "express";
import { api } from "./api";

const app = express();
app.listen(3002, () => {
  app.use(api);
  app.get("/api/hi", (req, res) => {
    res.send("Hello World!");
  });
  console.log("Server started on port 3002 :)");
});
