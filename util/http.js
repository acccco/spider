const https = require("https");
const http = require("http");
const request = require("request-promise-native");
const cheerio = require("cheerio");

exports.fetchHtml = (uri) =>
  request({
    uri,
    transform(body) {
      return cheerio.load(body);
    }
  });

exports.fetchJson = (uri) =>
  request({
    uri,
    json: true
  });

exports.fetchImg = (uri) =>
  new Promise((resolve, reject) => {
    let client = /https/.test(uri) ? https : http;
    client
      .get(
        uri,
        {
          rejectUnauthorized: false
        },
        resolve
      )
      .on("error", reject)
      .end();
  });
