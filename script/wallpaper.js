const service = require('../service/html');
const sql = require('../service/sql');
const db = require('../util/mysql');
const http = require('../util/http');
const qiniu = require('../util/qiniu');

let filenameReg = /.*\/(.*)$/;

async function init() {

  for (let j = 1; j < 100; j++) {
    let imageInfo = await service.getBingBgUri(1);
    for (let i = 0; i < imageInfo.length; i++) {
      let info = imageInfo[i];
      let uri = info.uri;
      let filename = filenameReg.exec(uri)[1];
      delete info.uri;
      info.filename = filename;
      info.type = 'bing';
      try {
        let stream = await http.fetchImg(uri.replace('https', 'http'));
        console.log('get image');
        await qiniu.uploadStream(filename, stream);
        console.log('upload done');
        await sql.insert('wallpaper', info, db.wallpaperQuery);
        console.log('insert table');
      } catch (e) {
        i--;
      }
    }
  }
}

init().catch(console.log);
