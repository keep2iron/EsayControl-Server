'use strict';

var _module = require('../core/module');

var _module2 = _interopRequireDefault(_module);

var _resp_func = require('../core/resp_func');

var Response = _interopRequireWildcard(_resp_func);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var database = new _module2.default();
    database.getApp().then(function (data) {
        Response.onSuccess(res, '成功', data);
    });
});

module.exports = router;
//# sourceMappingURL=version.js.map