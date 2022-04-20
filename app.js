require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require('fs');
const util = require('util');
const multer = require('multer');
const { uploadFile, getFileStorage } = require("./s3");

const storage = multer.diskStorage({
  destination: (_, __, callback) => callback(null, 'uploads/'),
  filename: (_, file, callback) => callback(null, +Date.now() + Math.random() * 100 + file.originalname),
})

const upload = multer({ storage });

app.use(cors());

const PORT = process.env.PORT || 5000;
const unlinkFile = util.promisify(fs.unlink);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/uploads/:key", (req, res) => {
  const key = req.params.key;

  const readFile = getFileStorage(String(key));

  readFile.pipe(res);
});

app.post("/uploads", upload.single('file'), async (req, res) => {
  try {
    const file = req.file

    const result = await uploadFile(file);

    await unlinkFile(file.path)

    res.status(201).json(result);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));