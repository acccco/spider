const httpUtil = require('../util/http');
const qiniuUtil = require('../util/qiniu');
const mysqlUtil = require('../util/mysql');

async function getTodayWallpaper() {
  let filenameReg = /.*?id=(.*)&rf/;
  let json = (await httpUtil.fetchJson('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')).images[0];
  let filename = filenameReg.exec(json.url)[1];
  let data = {
    title: json.title,
    describe: json.copyright,
    date: json.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    location: '',
    filename: filename,
    type: 'bing'
  };
  let stream = await httpUtil.fetchImg(`https://cn.bing.com/${json.url}`);
  await qiniuUtil.uploadStream(filename, stream);
  await mysqlUtil.insert('wallpaper', 'wallpaper', data);
  console.log(`file: ${filename} added`);
}

exports.getTodayWallpaper = getTodayWallpaper;
