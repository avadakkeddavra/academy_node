const Controller = require('./Controller');
const GlobalModel = require('@model/index');
const Attachements = GlobalModel.attachements;

class FilesController {

    create(Request, Response) {
        if(Request.files && Request.files.length > 0) {

            const Data = Request.files.map((file) => {
                return {
                    name: file.originalname,
                    type: file.mimetype,
                    path: file.path,
                    abs_path: file.path,
                }
            });
            Attachements.bulkCreate(Data).then((attachements) => {
                Response.send(attachements);
            }).catch((error) => {
                Response.send(error.stack)
            });

           
        } else {
            Response.send(Request.new)
        }
    }

    all(Request, Response) {
        Attachements.findAll().then((files) => {
            Response.send(files);
        })
    }

}

module.exports = new FilesController();