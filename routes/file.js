import * as RESP from '../core/resp_func';

//1.首先加载express
let express = require('express');
//2.获取路由
let router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

//3.对路由对象进行get post方法的配置
router.post('/upload', function (req, res, next) {
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = 'C:\\Users\\keep2iron\\Desktop\\Server\\public\\files';
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    //生成multiparty对象，并配置上传目标路径
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            RESP.onFileUploadError(res);
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/files/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
            RESP.onSuccess(res, inputFile.originalFilename + '文件上传成功');
        }


    });
});

module.exports = router;
