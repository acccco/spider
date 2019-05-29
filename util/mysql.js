const mysql = require('mysql');

const {mysql: mysqlInfo} = require('../info');

const wallpaper = mysql.createConnection(Object.assign({
  database: 'wallpaper'
}, mysqlInfo));

exports.wallpaperQuery = (sql, params) => new Promise((resolve, reject) => {
  wallpaper.query(sql, params, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});

exports.wallpaperQueryConnect = () => {
  wallpaper.connect();
};

exports.wallpaperQueryEnd = () => {
  wallpaper.end();
};

exports.insert = (tableName, params, query) => {
  let keys = [];
  let value = [];
  for (let key in params) {
    keys.push(key);
    value.push(params[key]);
  }
  let sql = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${new Array(keys.length).fill('?').join(',')})`;
  return query(sql, value);
};

