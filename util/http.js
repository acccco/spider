const https = require('https');
const http = require('http');
const request = require('request-promise-native');
const cheerio = require('cheerio');

exports.fetchHtml = (uri) => {
  let options = {
    uri,
    transform(body) {
      return cheerio.load(body);
    }
  };
  return request(options);
};

exports.fetchImg = (uri) => new Promise((resolve, reject) => {
  let client = /https/.test(uri) ? https : http;
  client
    .get(uri, {
        rejectUnauthorized: false
      },
      resolve)
    .on('error', reject)
    .end();
});
