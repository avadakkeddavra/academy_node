
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
        Tags.findAll({
          where: {
              creator_id: Request.auth.id
          }
        }).then((tags) => {
            Response.send({ success: true, data: tags });
        }).catch((error) => {
            Response.status(500).send({ success: false, message: error.message });
        })
    }

    menu(Request, Response) {
        Tags.findAll({
          where: {
              in_menu: 1
          },
          order: [['orderBy', 'ASC']]
        }).then((tags) => {
          Response.send(tags);
        })
    }

    addToMenu(Request, Response) {
        Tags.findById(Request.params.id).then((tag) => {
            if(tag) {
                tag.update({in_menu: 1})
            }
            Response.send(tag);
        })
    }

    removeFromMenu(Request, Response) {
      Tags.findById(Request.params.id).then((tag) => {
        if(tag) {
          tag.update({in_menu: 0})
        }
        Response.send(tag);
      })
    }

    updatePosition(Request, Response) {
      if(Request.body.menu && Request.body.menu.length > 0) {
        const index=0;
        const promises = [];
        Request.body.menu.forEach((item, index) => {
          promises.push(
              Tags
                .update({
                  orderBy: index
                }, {
                  where: {
                    id: item
                  }
                })
          );
        });
        Promise.all(promises).then((data) => {
          Response.send(data);
        }).catch(Error => {
          Response.send({ success: false, message: Error.message });
        })
      }
    }

}

module.exports = new TagsController();
