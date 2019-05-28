const {fetchHtml} = require('../util/http.js');

exports.getBingBgUri = (page) => {
  return fetchHtml(`https://bing.ioliu.cn/?p=${page}`).then($ => {
    let data = [];
    $('.card').each((_, item) => {
      data.push({
        title: '',
        copyright: $(item).find('.description h3').text(),
        date: $(item).find('.calendar .t').text(),
        location: $(item).find('.location .t').text(),
        uri: $(item).find('img').get(0).attribs.src
      });
    });
    return data;
  });
};
