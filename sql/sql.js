exports.createWallpaperTable = (tableName) => `CREATE TABLE ${tableName} (
  id          INT(11)       PRIMARY KEY AUTO_INCREMENT,
  title       VARCHAR(255)  NOT NULL,
  copyright   VARCHAR(255)  NOT NULL,
  date        VARCHAR(255)  ,
  location    VARCHAR(255)  ,
  uri         VARCHAR(255)
)`;
