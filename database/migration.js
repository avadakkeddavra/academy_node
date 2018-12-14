require('dotenv').config();
var mysql = require('mysql2');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.MIGRATION_HOST,
  user     : process.env.DB_USER,
  port     : process.env.MYSQL_LOCAL_PORT,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

migration.init(connection, __dirname + '/migrations');
