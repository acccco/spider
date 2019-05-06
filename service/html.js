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

exports.getPost = uri =>
  fetchHtml(uri, $ => {
    let post = {title: '', content: ''};
    post.title = $('.bookname h1')
      .html()
      .trim();
    post.content = $('#content')
      .html()
      .trim()
      .replace(/<br><br>/g, '<br>')
      .replace(/(<script>.*<\/script>)|(<a .*>.*<\/a>)/g, '');
    return post;
  });
