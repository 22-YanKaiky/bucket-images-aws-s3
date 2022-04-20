const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_, __, callback) => callback(null, '../uploads/'),
  filename: (_, file, callback) => callback(null, +Date.now() + Math.random() * 100 + file.originalname),
})

const upload = multer({ storage })

module.exports = upload
