const mysql = require('mysql');

const {mysql: mysqlInfo} = require('../info');

const connection = mysql.createConnection({
  host: mysqlInfo.host,
  user: mysqlInfo.user,
  password: mysqlInfo.password,
  database: mysqlInfo.database
});

connection.connect();

exports.getConnection = () => connection;
