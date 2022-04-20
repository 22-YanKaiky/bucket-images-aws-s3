const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const uploads = require("./uploads");

router.get("/", (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, Uploads S3 AWS` }));

router.use("/uploads", uploads);

router.use(async (_, __, message) => message(createError.NotFound("Route not Found")));

router.use((error, _, response, __) => response.status(error.status || 500).json({ message: error.message }));

module.exports = router;