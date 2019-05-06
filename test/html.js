const {getPostList, getPost} = require('../service/html');
const {insert} = require('../service/datebase');

const init = async function () {
  let postList = await getPostList();
  for (let i = 0; i < postList.length; i++) {
    let uri = postList[i];
    let post = await getPost(uri, '.bookname h1', '#content');
    await insert([`dldl_wz_sjcs_${i + 1}`, uri, post.title, post.content]);
  }
};

init();
