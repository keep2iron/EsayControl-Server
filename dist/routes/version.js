'use strict';

var _module = require('../core/module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var data = { key: 'value', hello: 'world' };
/* GET users listing. */
router.get('/', function (req, res, next) {
    var database = new _module2.default();
    database.test();
    database.close();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
});

module.exports = router;
//# sourceMappingURL=version.js.map