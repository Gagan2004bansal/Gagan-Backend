const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (err, uploadRes) => {
        if (err) return res.json({ success: 0 });

        res.json({
          success: 1,
          file: { url: uploadRes.secure_url },
        });
      }
    );

    result.end(req.file.buffer);
  } catch (e) {
    res.json({ success: 0 });
  }
});

module.exports = router;
