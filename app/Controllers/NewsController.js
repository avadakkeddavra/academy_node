
const Controller = require('@controller/Controller');

const GlobalModel = require('@model/index');
const NewsModel = GlobalModel.news;
const Attachements = GlobalModel.attachements;
const User = GlobalModel.users;
const Tags = GlobalModel.tags;
const NewsTags = GlobalModel.news_tags;

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
                }
            ]
        }).then((news) => {
            Response.send(news)
        }).catch((Error) => {
            Response.status(500).send(Error.stack);
        })
    }

    create(Request, Response, next) {
        this.Joi.validate(Request.body, NewsSchema.create).then((data) => {
            data.creator_id = Request.auth.id;
            let tags = '';
            let attachements;
            if(data.tags) {
                tags = data.tags.split(',');
                delete data.tags;
            }
            if(data.attachements) {
                attachements = data.attachements;
                delete data.attachements;
            }
               
            NewsModel.create(data).then( (newCreated) => {
                Request.new = newCreated; 
                if(tags && tags.length > 0) {
                    tags.forEach((item) => {
                        NewsTags.create({
                            new_id: newCreated.id,
                            tag_id: Number(item)
                        })
                    })
                }
                next();
            }).catch((error) => {
                Request.files.forEach((file) => {
                    fs.unlinkSync(file.path);
                });
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

    update() {

    }
    

}

module.exports = new NewsController();
