const multer = require('multer');
const GlobalModel = require('@model/index');
const Folder = GlobalModel.attachements;

class FileUploadMiddleware {

  getStorage() {


    return multer.diskStorage({
      destination: async function (req, file, cb) {
        const folder = await Folder.findById(req.params.id);
        cb(null, folder.path);
      }
    });
  }
}
module.exports = new FileUploadMiddleware();

