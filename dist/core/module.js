'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    }, {
        key: 'test',
        value: function test() {
            //执行SQL语句
            this.connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
                if (err) {
                    console.log('[query] - :' + err);
                    return;
                }
                console.log('The solution is: ', rows[0].solution);
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