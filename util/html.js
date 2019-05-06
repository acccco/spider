const request = require('request');
const cheerio = require('cheerio');

exports.fetchHtml = (uri, handler) =>
  new Promise((resolve, reject) => {
    request(
      uri,
      {
        strictSSL: false,
        rejectUnauthorized: false
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(body, {
            decodeEntities: false
          });
          resolve(handler($, response));
        } else {
          reject(error);
        }
      }
    );
  });
