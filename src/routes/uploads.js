const express = require("express");
const upload = require('../utils/upload.multer');
const UploadController = require("../controllers/uploads.controller");

const router = express.Router();

router.post("/", upload.single('file'), UploadController.uploadImageS3);

router.get("/:key", UploadController.getImageS3);

module.exports = router;
