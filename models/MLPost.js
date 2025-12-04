const mongoose = require("mongoose");

const MLPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    thumbnail: String,
    content: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MLPost", MLPostSchema);
