const express = require("express");
const router = express.Router();
require("../DB/db");
const multer = require("multer");
const CreatPost = require("../Models/CreatPost");
const storage = require("../Service/UploadImages");
const Authtication = require("../Middlewares/Auth");

const upload = multer({ storage: storage });
router.post(
  "/creatpost",
  Authtication,
  upload.array("files"),
  async (req, res) => {
    const { model, Price, phone, location, copies } = req.body;

    const files = req.files;

    try {
      const savePost = new CreatPost({
        model: model,
        price: Price,
        phone: phone,
        location: location,
        copies: copies,
        file: files.map(
          (file) => `${process.env.baseUrl}/uploads/${file.originalname}`
        ),
      });
      const response = await savePost.save();
      if (response) {
        return res.status(201).json({ message: "Post Created Successfully." });
      }
      return res.status(500).json({ error: "Server Error" });
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
