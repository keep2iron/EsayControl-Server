'use strict';

var _resp_func = require('../core/resp_func');

var RESP = _interopRequireWildcard(_resp_func);

var _module = require('../core/module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//1.首先加载express
var express = require('express');
//2.获取路由
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var crypto = require('crypto');

//3.对路由对象进行get post方法的配置
//更新app
router.post('/update', function (req, res, next) {
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = __dirname + '\\..\\..\\public\\apk';
    //设置单文件大小限制
    form.maxFilesSize = 50 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    //生成multiparty对象，并配置上传目标路径
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            RESP.onFailed(res, 101, err);
            console.log('parse error: ' + err);
        } else {
            var appName = fields.app_name[0];
            if (appName.replace(/(^s*)|(s*$)/g, "").length == 0) {
                RESP.onFailed(res, "app名字不能为空");
                return;
            }

            var appId = fields.app_id[0];
            if (appId.replace(/(^s*)|(s*$)/g, "").length == 0) {
                RESP.onFailed(res, "appId不能为空");
                return;
            }

            var appType = fields.app_type[0];
            if (appType.replace(/(^s*)|(s*$)/g, "").length == 0) {
                RESP.onFailed(res, "appType不能为空");
                return;
            }

            var appVersion = fields.app_version[0];
            if (appVersion.replace(/(^s*)|(s*$)/g, "").length == 0) {
                RESP.onFailed(res, "appType不能为空");
                return;
            }

            if (!files.application) {
                RESP.onFailed(res, "上传的apk不能为空");
                return;
            }

            var apkFile = files.application[0];
            var uploadedPath = apkFile.path;

            var fileDir = './public/apk/' + appId + '/' + appType;
            var isFolderExist = fs.existsSync(fileDir);
            if (isFolderExist) {
                var fileList = fs.readdirSync(fileDir);
                fileList.map(function (fileName) {
                    fs.unlinkSync(fileDir + '/' + fileName);
                });
            } else {
                fs.mkdirSync('./public/apk/' + appId + '/' + appType);
            }
            //重命名为真实文件名
            fs.renameSync(uploadedPath, fileDir + '/' + apkFile.originalFilename);
            var database = new _module2.default();
            database.updateAppVersion(appId, appType, '/' + 'apk/' + appId + '/' + appType + '/' + apkFile.originalFilename, appVersion).then(function (result) {
                RESP.onSuccess(res, apkFile.originalFilename + '文件上传成功');
            }).catch(function (err) {
                console.log(err);
                RESP.onFailed(res, apkFile.originalFilename + '文件上传失败 : ' + err.toString());
            });
        }
    });
});

router.post('/add', function (req, res, next) {
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = __dirname + '\\..\\..\\public\\apk';
    //设置单文件大小限制
    form.maxFilesSize = 50 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    //生成multiparty对象，并配置上传目标路径
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            RESP.onFailed(res, err);
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);

            var appName = fields.app_name[0];
            if (appName.replace(/(^s*)|(s*$)/g, "").length == 0) {
                RESP.onFailed(res, "app名字不能为空");
                return;
            }

            var appVersion = fields.app_version[0];
            if (appVersion.replace(/(^s*)|(s*$)/g, "").length == 0) {
                RESP.onFailed(res, "app版本号不能为空");
                return;
            }

            var md5 = crypto.createHash('md5');
            var id = md5.update(Date.now() + '').digest('hex');
            var iconFile = files.icon[0];
            var uploadedPath = iconFile.path;
            fs.mkdir('./public/apk/' + id.toString(), function (err) {
                if (err) {
                    return console.error(err);
                }
                //重命名为真实文件名
                fs.rename(uploadedPath, './public/apk/' + id + '/' + iconFile.originalFilename, function (err) {
                    if (err) {
                        RESP.onFailed(res, "添加失败");
                    } else {
                        var database = new _module2.default();
                        database.insertApp(id, appName, 'apk/' + id + '/' + iconFile.originalFilename, appVersion).then(function (result) {
                            RESP.onSuccess(res, '添加app成功');
                            database.close();
                        }).catch(function (err) {
                            console.log(err);
                            RESP.onSuccess(res, '添加app失败');
                        });
                    }
                });
            });
        }
    });
});
module.exports = router;
//# sourceMappingURL=file.js.map