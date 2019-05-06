const R = require('ramda');
const {getPostList, getPost} = require('../service/html');
const {insert} = require('../service/datebase');

const init = async function () {
  let postList = await getPostList();
  for (let i = 0; i < postList.length; i++) {
    let uri = postList[i];
    let post = await getPost(uri);
    await insert([uri, post.title, post.content]);
  }
};

init();
