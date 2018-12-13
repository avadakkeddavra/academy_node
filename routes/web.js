const express = require('express');
const Router = express.Router();
const AuthController = require('@auth/AuthController');
const AuthMiddleware = require('@middleware/AuthMiddleware');

const NewsController = require('@controller/NewsController');
const TagsController = require('@controller/TagsController');
const FilesController = require('@controller/FilesController');

const multer = require('multer');
const UploadService = multer({
    dest:'./storage',
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
    UploadService,
    NewsController.create.bind(NewsController)
);
Router.delete('/news/:id', AuthMiddleware.auth, AuthMiddleware.canDelete, NewsController.delete);

Router.get('/news/:id',  NewsController.get);
Router.put('/news/:id', AuthMiddleware.auth,  NewsController.update.bind(NewsController));
Router.delete('/news/:new_id/tag/:tag_id', AuthMiddleware.auth,  NewsController.deleteTag.bind(NewsController));
Router.delete('/news/:new_id/file/:file_id', AuthMiddleware.auth,  NewsController.deleteAttachement.bind(NewsController));
Router.get('/news',  NewsController.all);

Router.post('/tags', AuthMiddleware.auth, AuthMiddleware.canCreate, TagsController.create.bind(TagsController));
Router.get('/tags', TagsController.all.bind(TagsController));

Router.post('/files', AuthMiddleware.auth, UploadService, FilesController.create);
Router.get('/files', AuthMiddleware.auth, FilesController.all);

module.exports = Router;
