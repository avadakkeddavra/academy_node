const Controller = require('./Controller');
const GlobalModel = require('@model/index');
const Op = GlobalModel.Sequelize.Op;
const Attachements = GlobalModel.attachements;
const fs = require('fs');
const FileService = require('@service/FileService');
const rmrf = require('rimraf');

class FilesController {

    create(Request, Response) {
        if(Request.files && Request.files.length > 0) {

            const Data = Request.files.map((file) => {
                return {
                    name: file.originalname,
                    type: file.mimetype,
                    path: file.path,
                    abs_path: file.path,
                    folder_id: Request.params.id,
                    size: file.size
                }
            });
            Attachements.bulkCreate(Data).then((attachements) => {
                Response.send(attachements);
            }).catch((error) => {
                Response.send(error.stack)
            });


        } else {
            Response.send('Nothing founded');
        }
    }

    async toggleList(Request, Response) {
      let file = await Attachements.findById(Request.params.id);
      if(file.list === 0) {
        file.update({list: 1});
      } else {
        file.update({list: 0});
      }

      Response.send({ file });
    }
    /*
    * parentDir
    * name
    * */
    async createFolder(Request, Response) {
      const parentDir = await Attachements.findById(Request.params.id);
      const dirPath =  parentDir.path + '/' + Request.body.name;

      fs.mkdir(dirPath, { recursive: true, mode: 0o777}, (err) => {
        if (!err) {
            Attachements.create({
              type: 'folder',
              name: Request.body.name,
              path: dirPath,
              abs_path: dirPath,
              folder_id: parentDir.id
            }).then((data) => {
                Response.send(data)
            }).catch(Error => {
                Response.send(Error);
            })
        } else {
          Response.status(500).send(err);
        }
      });
    }

    allFiles(Request, Response) {
        Attachements.findAll({
          where: {
            folder_id: {
              [Op.ne] : null
            }
          },
          include: [
            {
              model: Attachements,
              as: 'folder'
            }
          ]
        }).then((files) => {
            Response.send(files);
        })
    }

    allFolders(Request, Response) {
      Attachements.findAll({
        where: {
          type: 'folder'
        },
        include: [
          {
            model: Attachements,
            as: 'files'
          }
        ]
      }).then((files) => {
        Response.send(files);
      })
    }

    async renameFolder(Request, Response) {
      if(Number(Request.params.id) !== 1) {
        const folder = await Attachements.findById(Request.params.id);
        if(folder) {
          fs.rename(folder.path, `./storage/${Request.body.name}`, (err) => {
            if(!err) {
              folder.update({
                path:`./storage/${Request.body.name}`,
                abs_path: `./storage/${Request.body.name}`,
                name: Request.body.name
              }).then((data) => {
                Response.send(data);
              }).catch(error => {
                Response.status(500).send(error);
              });
            } else {
              Response.status(500).send(err);
            }
          });
        } else {
          Response.status(400).send({ success: false, message: 'This folder does not exist' })
        }
      } else {
        Response.status(400).send({ success: false, message: 'You can not rename root folder' })
      }

    }

    async deleteFolder(Request, Response) {
      if(Number(Request.params.id) !== 1) {
        const folder = await Attachements.findById(Request.params.id);

        if(folder) {
          rmrf(folder.path, (err) => {
            if(!err) {
              folder.destroy();
              Response.send(folder);
            } else {
              Response.status(500).send(err);
            }
          });
        } else {
          Response.status(400).send({ success: false, message: 'This folder does not exist' })
        }
      } else {
        Response.status(400).send({ success: false, message: 'You can not delete root folder' })
      }
    }

    getFolder(req, res) {
      Attachements.findAll({
        where: {
          folder_id: req.params.id
        },
        order: [['type', 'ASC'], ['updated_at', 'DESC']]
      }).then((data) => {
        res.send(data);
      }).catch((error) => {
        res.send(error)
      })
    }

    async deleteFile(Request, Response) {
      const file = await Attachements.findById(Request.params.id);
      if(file) {
        fs.unlink(file.path, (err) => {
          if(!err) {
            file.destroy();
            Response.send({ success: true })
          } else {
            Response.status(500).send({success: false, message: err.message})
          }
        })
      } else {
        Response.status(400).send({ success: false, message: 'This file does not exist' });
      }
    }
}

module.exports = new FilesController();
