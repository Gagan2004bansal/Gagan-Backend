const express = require("express");
const router = express.Router();
const MLPost = require("../models/MLPost");

// CREATE
router.post("/create", async (req, res) => {
  try {
    const { title, thumbnail, content } = req.body;

    const slug = title.toLowerCase().replace(/ /g, "-");

    const post = await MLPost.create({ title, thumbnail, slug, content });
    res.json({ success: true, post });
  } catch (e) {
    res.json({ success: false });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const posts = await MLPost.find().sort({ createdAt: -1 });
  res.json(posts);
});

// GET SINGLE
router.get("/:slug", async (req, res) => {
  const post = await MLPost.findOne({ slug: req.params.slug });
  res.json(post);
});

// UPDATE
router.put("/:slug", async (req, res) => {
  try {
    const updated = await MLPost.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res.json({ success: false });
  }
});

module.exports = router;
