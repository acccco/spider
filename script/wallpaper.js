const {getBingBgUri} = require('../service/html');
const {insert} = require('../service/sql');
const {wallpaperQuery} = require('../util/mysql');
const {fetchImg} = require('../util/http');
const {uploadStream} = require('../util/qiniu');

async function init() {
  let filenameReg = /.*\/(.*)$/;
  for (let j = 1; j < 100; j++) {
    let imageInfo = await getBingBgUri(j);
    for (let i = 0; i < imageInfo.length; i++) {
      let info = imageInfo[i];
      let uri = info.uri;
      let filename = filenameReg.exec(uri)[1];
      delete info.uri;
      info.filename = filename;
      info.type = 'bing';
      try {
        let stream = await fetchImg(uri.replace('https', 'http'));
        await uploadStream(filename, stream);
        await insert('wallpaper', info, wallpaperQuery);
        console.log(`filename:${filename} add`);
      } catch (e) {
        i--;
      }
    }
  }
}

init().catch(console.log);
