require('module-alias/register');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mailer = require('express-mailer');

app.use(cors());

if(process.env.DB_NAME && process.env.DB_HOST && process.env.DB_PASSWORD && process.env.DB_USER)
{
    require('@model/connection');

} 
mailer.extend(app, {
    from: process.env.MAILER_FROM,
    host: process.env.MAILER_HOST,
    secureConnection: true,
    port: process.env.MAILER_PORT,
    transportMethod: process.env.MAILER_TRANSPORT_METHOD,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

app.set('views','./resources/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(require('./routes/web'));

app.use('/storage',express.static('storage'));

app.listen(process.env.PORT, function(err) {
    if(!err) {
        console.log(`App is running on ${process.env.PORT} port`)
    }
});
