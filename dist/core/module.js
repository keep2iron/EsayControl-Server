'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resp_func = require('./resp_func');

var Respone = _interopRequireWildcard(_resp_func);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataBase = function () {

    /**
     * 构造函数中引用mysql模块，并且创建连接
     */
    function DataBase() {
        _classCallCheck(this, DataBase);

        //测试mysql
        var mysql = require('mysql'); //调用MySQL模块
        //创建一个connection
        this.connection = mysql.createConnection({
            host: '127.0.0.1', //主机
            user: 'root', //MySQL认证用户名
            password: 'root', //MySQL认证用户密码
            port: '3306', //端口号
            database: 'keep2iron'
        });

        this.connect();
    }

    /**
     * 连接mysql
     */


    _createClass(DataBase, [{
        key: 'connect',
        value: function connect() {
            //创建一个connection
            this.connection.connect(function (err) {
                if (err) {
                    console.log('[query] - :' + err);
                    return;
                }
                console.log('[connection connect]  succeed!');
            });
        }

        /**
         * 获取数据库中的维护的app
         */

    }, {
        key: 'getApp',
        value: function getApp() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.connection.query('SELECT * FROM tbl_app', function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(rows);
                });
            });
        }

        /**
         * 执行关闭当前连接对象
         */

    }, {
        key: 'close',
        value: function close() {
            //关闭connection
            this.connection.end(function (err) {
                if (err) {
                    return;
                }
                console.log('[connection end] succeed!');
            });
        }
    }]);

    return DataBase;
}();

exports.default = DataBase;
//# sourceMappingURL=module.js.map