import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { signup, deposit, transfer, getUserDetails } from "./controller.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB and start server aftwards
const dbURI = `mongodb+srv://lexNwimue:${process.env.password}@cluster0.bmtc1.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 4000);
    console.log("Server ready . . .");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.json({ welcome: "Hi, welcome" }));
app.post("/signup", signup);
app.post("/deposit", deposit);
app.post("/transfer", transfer);
app.post("/withdraw", deposit);
app.get("/:email", getUserDetails);
app.all("*", (req, res) => {
  res.json({ err: "Invalid URL" });
});
