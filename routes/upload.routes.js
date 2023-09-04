const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const isAuthenticated = require("../middlewares/isAuthenticated");
const Especialidad = require("../models/Especialidad.model");
const uploader = require("../middlewares/cloudinary.middleware");

// POST "/api/upload"
router.post("/", uploader.single("image"), (req, res, next) => {
  // console.log("file is: ", req.file);

  if (!req.file) {
    next("No file uploaded!");
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ cloudinaryUrl: req.file.path });
});

module.exports = router;

