const R = require('ramda');
const {fetchHtml} = require('../util/html.js');

exports.getPostList = () =>
  fetchHtml('https://www.dingdiann.com/ddk94497/', $ => {
    const links = [];
    $('#list a').each((_, item) => {
      links.push(`https://www.dingdiann.com${item.attribs.href}`);
    });
    return R.uniq(links.reverse()).reverse();
  });

exports.getPost = (uri, titleTag, contentTag) =>
  fetchHtml(uri, $ => {
    let post = {title: '', content: ''};
    post.title = $(titleTag)
      .html()
      .trim();
    post.content = $(contentTag)
      .html()
      .trim()
      .replace(/<br><br>/g, '<br>')
      .replace(/<br>$/, '')
      .replace(/\s+/g, ' ')
      .replace(/[-－]{8}.*/, '');
    return post;
  });
