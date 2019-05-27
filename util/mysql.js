const mysql = require('mysql');

const {mysql: mysqlInfo} = require('../info');

const wallpaper = mysql.createConnection({
  host: mysqlInfo.host,
  user: mysqlInfo.user,
  password: mysqlInfo.password,
  database: 'wallpaper'
});

wallpaper.connect();

exports.wallpaperQuery = (sql, params) => new Promise((resolve, reject) => {
  wallpaper.query(sql, params, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});

