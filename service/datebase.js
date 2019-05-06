const {getConnection} = require('../util/mysql.js');

const connection = getConnection();

const insertSql = 'INSERT INTO dldl_wz_sjcs(tag, originUrl, title, content) VALUES(?, ?, ?, ?)';

exports.insert = (params) => new Promise((resolve, reject) => {
  connection.query(insertSql, params, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});
