'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onFileUploadError = onFileUploadError;
exports.onSuccess = onSuccess;

var _resp_code = require('./resp_code');

var RESP = _interopRequireWildcard(_resp_code);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 当文件上传失败时进行调用
 * @param res   响应实体
 */
function onFileUploadError(res) {
    var resp = new RESP.default(RESP.ERROR_COMMON, '上传文件失败!~');

    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
    res.end(JSON.stringify(resp));
}

function onSuccess(res, msg, data) {
    var resp = new RESP.default(RESP.SUCCESS, msg, data);

    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
    res.end(JSON.stringify(resp));
}
//# sourceMappingURL=resp_func.js.map