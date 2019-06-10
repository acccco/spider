const schedule = require('node-schedule');

const {fetchJson, fetchImg} = require('../util/http');
const {uploadStream} = require('../util/qiniu');
const {wallpaperQuery, wallpaperQueryConnect, wallpaperQueryEnd, insert} = require('../util/mysql');

wallpaperQueryConnect();

exports.main = async function main() {
  let filenameReg = /.*?id=(.*)&rf/;
  let json = (await fetchJson('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')).images[0];
  let filename = filenameReg.exec(json.url)[1];
  let data = {
    title: json.title,
    describe: json.copyright,
    date: json.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    location: '',
    filename: filename,
    type: 'bing'
  };
  let stream = await fetchImg(`https://cn.bing.com/${json.url}`);
  await uploadStream(filename, stream);
  try {
    await insert('wallpaper', data, wallpaperQuery);
    console.log(`file: ${filename} added`);
  } catch (e) {
    wallpaperQueryConnect();
    await insert('wallpaper', data, wallpaperQuery);
    console.log(`file: ${filename} added`);
  }
};

schedule.scheduleJob('00 10 * * *', function () {
  main().catch(console.log);
});

// main().catch(console.log);
