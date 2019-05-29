const {fetchJson, fetchImg} = require('../util/http');
const {uploadStream} = require('../util/qiniu');
const {insert} = require('../service/sql');
const {wallpaperQuery} = require('../util/mysql');

async function main() {
  let filenameReg = /.*?id=(.*)&rf/;
  let json = (await fetchJson('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')).images[0];
  let filename = filenameReg.exec(json.url)[1];
  let data = {
    title: json.title,
    copyright: json.copyright,
    date: json.enddate,
    location: '',
    filename: filename
  };
  let stream = await fetchImg(`https://cn.bing.com/${json.url}`);
  await uploadStream(filename, stream);
  await insert('wallpaper', data, wallpaperQuery);
  console.log(`filename:${filename} add`);
}

main().catch(console.log);
