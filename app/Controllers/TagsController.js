
const Controller = require('@controller/Controller');
const GlobalModel = require('@model/index');
const Tags = GlobalModel.tags;


class TagsController extends Controller{
    
    create(Request, Response) {
        this.Joi.validate(
            Request.body,
            this.Joi.object().keys({
                name: this.Joi.string().required()
            })
        ).then(data => {
            data.creator_id = Request.auth.id;
            Tags.create(data).then(tag => {
                Response.send({ success: true, data: tag });
            }).catch(error => {
                Response.status(500).send({ success: false, message: error.message })
            })
        })
    }

    all(Request, Response) {
        Tags.findAll().then((tags) => {
            Response.send({ success: true, data: tags });
        }).catch((error) => {
            Response.status(500).send({ success: false, message: error.message });
        })
    }

}

module.exports = new TagsController();
