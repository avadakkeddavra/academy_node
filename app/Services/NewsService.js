const GlobalModel = require('@model/index');
const Attachement = GlobalModel.news_attachements;

class NewsService {
    
    uploadAttachements(attachements) {
        console.log(attachements);
    }

}

module.exports = new NewsService();
