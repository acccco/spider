const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

exports.fetchHtml = (uri) => {
  let options = {
    uri,
    transform(body) {
      return cheerio.load(body);
    }
  };
  return request(options);
};

exports.fetchImg = (uri, fileName) => {
  let options = {
    uri,
    encoding: 'binary'
  };
  return request(options).then(body => {
    fs.writeFileSync(fileName, body, 'binary');
  });
};
