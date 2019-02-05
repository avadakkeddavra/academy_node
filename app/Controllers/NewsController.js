
const Controller = require('@controller/Controller');

const GlobalModel = require('@model/index');
const NewsModel = GlobalModel.news;
const Attachements = GlobalModel.attachements;
const User = GlobalModel.users;
const Tags = GlobalModel.tags;
const NewsTags = GlobalModel.news_tags;
const NewsAttachements = GlobalModel.news_attachements;

const NewsService = require('@service/NewsService');
const NewsSchema = require('@schema/NewsSchema');
const fs = require('fs');

class NewsController extends Controller{

    get(Request, Response) {
        NewsModel.findById(Request.params.id, {
            include: [
                {
                    model: User,
                    as: 'creator'
                }, {
                    model: Attachements,
                    as: 'attachements',
                    order: [['main','ASC']]
                },  {
                    model: Tags,
                    as: 'tags',
                    order: [['index_number', 'ASC']]
                }, {
                    model: Attachements,
                    as: 'mainImg'
                }
            ]
        }).then((news) => {
            Response.send(news)
        }).catch((Error) => {
            Response.status(500).send(Error.stack);
        })
    }

    create(Request, Response) {
        this.Joi.validate(Request.body, NewsSchema.create).then((data) => {
            data.creator_id = Request.auth.id;

            NewsModel.create(data).then( (newCreated) => {
                data.tags.forEach(async (tag) => {
                    await NewsTags.findOrCreate({
                      where: {
                        tag_id: Number(tag),
                        new_id: newCreated.id
                      }
                    })
                });
                data.attachements.forEach(async (file) => {
                  await NewsAttachements.findOrCreate({
                      where: {
                        attachement_id: Number(file),
                        new_id: newCreated.id
                      }
                  })
                });
                Response.send(newCreated);
            }).catch((error) => {
                if (Request.files) {
                  Request.files.forEach((file) => {
                    fs.unlinkSync(file.path);
                  });
                }
                Response.json(error.message);
            })
        }).catch((error) => {
            Response.json(error.message);
        })
    }

    all(Request, Response) {
        NewsModel.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id','name'],
                    as: 'creator'
                }, {
                    model: Attachements,
                    as: 'attachements'
                }, {
                    model: Tags,
                    as: 'tags',
                    order: [['index_number', 'ASC']]
                }, {
                    model: Attachements,
                    as: 'mainImg'
                }
            ],
            order: [['createdAt', 'DESC']]
        }).then((news) => {
            Response.send(news)
        }).catch((Error) => {
            Response.status(500).send(Error.stack);
        })
    }

    delete(Request, Response) {
        NewsModel.findById(Request.params.id).then((newDeleted) => {
            if(!newDeleted) {
                Response.status(400).send({ success: false });
                return;
            }
            newDeleted.destroy();
            Response.send(newDeleted)
        }).catch(error => {
            Response.status(500).send(error.message);
        });
    }

    deleteTag(Request, Response) {
      NewsTags.findOne({
        new_id: Request.params.new_id,
        tag_id: Request.params.tag_id
      }).then((tag) => {
        if (tag) {
          tag.destroy();
        }
        Response.send({ succes: true, data: tag });
      }).catch(error => {
        Response.status(500).send({ success: false, message: error.message });
      })
    }

    deleteAttachement(Request, Response) {
      NewsAttachements.findOne({
        new_id: Request.params.new_id,
        attachement_id: Request.params.file_id
      }).then((file) => {
        if (file) {
          file.destroy();
        }
        Response.send({ success: true, data: file });
      }).catch(error => {
        Response.status(500).send({ success: false, message: error.message });
      })
    }

    update(Request, Response) {
      this.Joi.validate(Request.body, NewsSchema.create).then(async (data) => {
        data.creator_id = Request.auth.id;

        const UpdateNew = await NewsModel.findById(Request.params.id);
        UpdateNew.update(data).then(newUpdated => {
          data.tags.forEach(async (tag) => {
            await NewsTags.findOrCreate({
              where: {
                tag_id: Number(tag),
                new_id: newUpdated.id
              }
            })
          });
          data.attachements.forEach(async (file) => {
            await NewsAttachements.findOrCreate({
                where: {
                  attachement_id: Number(file),
                  new_id: newUpdated.id
                }
            })
          });
          Response.send(newUpdated);
        }).catch((error) => {
          if (Request.files) {
            Request.files.forEach((file) => {
              fs.unlinkSync(file.path);
            });
          }
          Response.json(error.message);
        })
      }).catch((error) => {
        Response.json(error.message);
      })
    }
}

module.exports = new NewsController();
