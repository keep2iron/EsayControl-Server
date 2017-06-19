'use strict';

var _module = require('../core/module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //这句话是将当前的页面交给express渲染的引擎模板,Express的模板引擎常用的是ejs和jade
    var database = new _module2.default();
    database.getApp().then(function (data) {
        console.log(JSON.stringify(data));
        res.render('index', { data: data });
    }).catch(function (err) {
        console.log(err);
    });
});

module.exports = router;
//# sourceMappingURL=index.js.map