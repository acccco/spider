exports.createWallpaperTable = (tableName) => `CREATE TABLE ${tableName} (
  id          INT(11)       PRIMARY KEY AUTO_INCREMENT,
  title       VARCHAR(255)  NOT NULL,
  copyright   VARCHAR(255)  NOT NULL,
  date        VARCHAR(255)  ,
  location    VARCHAR(255)  ,
  uri         VARCHAR(255)
)`;

exports.insert = (tableName, params, query) => {
  let keys = [];
  let value = [];
  for (let key in params) {
    keys.push(key);
    value.push(params[key]);
  }
  let sql = `INSERT INTO wallpaper(${keys.join(',')}) VALUES (${new Array(keys.length).fill('?').join(',')})`;
  return query(sql, value);
};
