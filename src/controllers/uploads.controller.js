const fs = require('fs');
const util = require('util');
const { uploadFile, getFileStorage } = require("../utils/s3");

const unlinkFile = util.promisify(fs.unlink);

class UploadController {
  static async uploadImageS3(request, response) {
    try {      
      const file = request.file

      const result = await uploadFile(file);

      await unlinkFile(file.path)

      response.status(201).json(result);
    } catch (error) {
      response.status(422).json(error);
    }
  }

  static getImageS3(request, response) {
    try {
      const key = request.params.key;

      const readFile = getFileStorage(String(key));

      readFile.pipe(response);
    } catch (error) {
      response.status(422).json(error);
    }
  }
}

module.exports = UploadController;
