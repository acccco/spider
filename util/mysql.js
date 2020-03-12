const mysql = require('mysql');
const info = require('../info');

const execute = (connect, sql, params) => new Promise((resolve, reject) => {
  connect.query(sql, params, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});

exports.insert = (database, tableName, params) => {
  let keys = [];
  let value = [];
  for (let key in params) {
    keys.push('`' + key + '`');
    value.push(params[key]);
  }
  let sql = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${new Array(keys.length).fill('?').join(',')})`;

  let wallpaperConnect = mysql.createConnection(Object.assign({
    database
  }, info.mysql));

  wallpaperConnect.connect();

  return execute(wallpaperConnect, sql, value).then(res => {
    wallpaperConnect.end();
    return res;
  });
};

