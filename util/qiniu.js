const qiniu = require('qiniu');
const {qiniu: qiniuInfo} = require('../info');

const mac = new qiniu.auth.digest.Mac(qiniuInfo.accessKey, qiniuInfo.secretKey);
const putPolicy = new qiniu.rs.PutPolicy({
  scope: qiniuInfo.scope,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
});

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

exports.getToken = () => {
  return putPolicy.uploadToken(mac);
};

exports.uploadStream = (key, stream) => {
  return new Promise((resolve, reject) => {
    formUploader.putStream(exports.getToken(), key, stream, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr);
      }
      resolve(respInfo);
    });
  });
};
