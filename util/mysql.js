const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'post'
});
connection.connect();

exports.getConnection = () => connection;
