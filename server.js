require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔥 MUST COME FIRST
app.use(cors({
  origin: ["https://gagan-eosin.vercel.app/", "http://localhost:5173"],   // allow all origins
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

// 🔥 SECOND
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// 🔥 ROUTES
app.use("/api/ml", require("./routes/ml"));
app.use("/api/upload", require("./routes/upload"));

// 🔥 DB + SERVER START
const PORT = process.env.PORT || 3002;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected");
    app.listen(PORT, () =>
      console.log("Server running on", PORT)
    );
  })
  .catch((err) => console.log(err));
