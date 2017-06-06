'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //这句话是将当前的页面交给express渲染的引擎模板,Express的模板引擎常用的是ejs和jade
    res.render('index', { title: '版本控制' });
});

module.exports = router;
//# sourceMappingURL=index.js.map