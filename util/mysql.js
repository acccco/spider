const mysql = require('mysql');

const {mysql: mysqlInfo} = require('../info');

const wallpaper = mysql.createConnection(Object.assign({
  database: 'wallpaper'
}, mysqlInfo));

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

exports.wallpaperInit = () => {
  wallpaper.connect();
};

exports.wallpaperClose = () => {
  wallpaper.end();
};

