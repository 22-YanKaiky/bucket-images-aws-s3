require("dotenv").config();
const { S3 } = require('aws-sdk');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secreatAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  accessKeyId: accessKey,
  secretAccessKey: secreatAccessKey,
  region: region,
});

// Upload a file to S3
const uploadS3 = async (file) => {
  const name = +Date.now() + Math.random() * 100 + file.originalname;

  const params = {
    Bucket: bucketName,
    Key: name,
    Body: file.filename,
    Expires: 3600,
    ContentType: file.mimetype,
  };

  let location;

  await s3.upload(params, async (err) => {
    if (err) throw err;
  }).promise().then((response) => location = response.Location);

  return location;
}

const uploadFile = async (file) => {
  const s3Location = await uploadS3(file);

  const image = { image_url: s3Location };

  return image;
}

// Download a file from S3
const getFileStorage = (key) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: key,
  }

  return s3.getObject(downloadParams).createReadStream();
}

module.exports = { uploadFile, getFileStorage };
