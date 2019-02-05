const express = require('express');
const Router = express.Router();
const AuthController = require('@auth/AuthController');
const AuthMiddleware = require('@middleware/AuthMiddleware');
const FileUploadMiddleware = require('@middleware/FileUploadMiddleware');

const NewsController = require('@controller/NewsController');
const TagsController = require('@controller/TagsController');
const FilesController = require('@controller/FilesController');

const multer = require('multer');

const GlobalModel = require('@model/index');

const UploadService = multer({
    storage: FileUploadMiddleware.getStorage(),
}).array('files', 5);



Router.post('/login', AuthController.login.bind(AuthController));
Router.post('/register', AuthController.register.bind(AuthController));
Router.post('/resetlink', AuthController.requestForResetPassword.bind(AuthController));
Router.get('/check_resetlink/:hash', AuthController.checkResetPasswordLink.bind(AuthController));
Router.post('/reset_password/:hash', AuthController.resetPassword.bind(AuthController));

Router.post(
    '/news',
    AuthMiddleware.auth,
    AuthMiddleware.canCreate,
    NewsController.create.bind(NewsController)
);
Router.delete('/news/:id', AuthMiddleware.auth, AuthMiddleware.canDelete, NewsController.delete);

Router.get('/news/:id',  NewsController.get);
Router.put('/news/:id', AuthMiddleware.auth,  NewsController.update.bind(NewsController));
Router.delete('/news/:new_id/tag/:tag_id', AuthMiddleware.auth,  NewsController.deleteTag.bind(NewsController));
Router.delete('/news/:new_id/file/:file_id', AuthMiddleware.auth,  NewsController.deleteAttachement.bind(NewsController));
Router.get('/news',  NewsController.all);

Router.post('/tags', AuthMiddleware.auth, AuthMiddleware.canCreate, TagsController.create.bind(TagsController));
Router.get('/tags', AuthMiddleware.auth, TagsController.all.bind(TagsController));
Router.put('/menu/position', AuthMiddleware.auth, TagsController.updatePosition.bind(TagsController));
Router.put('/menu/:id', AuthMiddleware.auth, TagsController.addToMenu.bind(TagsController));
Router.delete('/menu/:id', AuthMiddleware.auth, TagsController.removeFromMenu.bind(TagsController));
Router.get('/menu', AuthMiddleware.auth, TagsController.menu.bind(TagsController));

Router.post('/folders/:id/files', AuthMiddleware.auth, UploadService, FilesController.create);
Router.get('/files', AuthMiddleware.auth, FilesController.allFiles);
Router.delete('/files/:id', AuthMiddleware.auth, FilesController.deleteFile);
Router.get('/files/:id/list', AuthMiddleware.auth, FilesController.toggleList);


Router.post('/folders/:id', AuthMiddleware.auth, FilesController.createFolder);
Router.get('/folders', AuthMiddleware.auth, FilesController.allFolders);
Router.put('/folders/:id', AuthMiddleware.auth, FilesController.renameFolder);
Router.get('/folders/:id', AuthMiddleware.auth, FilesController.getFolder);
Router.delete('/folders/:id', AuthMiddleware.auth, FilesController.deleteFolder);

module.exports = Router;
