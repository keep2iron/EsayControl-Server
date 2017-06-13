"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response =

/**
 * 响应实体
 * @param code      响应code值
 * @param msg       响应的message
 * @param data      响应的数据
 */
function Response(code, msg, data) {
    _classCallCheck(this, Response);

    if (!code) {
        throw new Error("Code值不能为空");
    }
    this.code = code;

    if (!msg) {
        this.msg = "";
    } else {
        this.msg = msg;
    }

    if (!data) {
        this.data = {};
    } else {
        this.data = data;
    }
};

exports.default = Response;
var SUCCESS = exports.SUCCESS = 100;
var ERROR_COMMON = exports.ERROR_COMMON = 101;
//# sourceMappingURL=resp_code.js.map