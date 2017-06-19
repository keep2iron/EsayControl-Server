'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
    }, {
        key: 'queryAppList',
        value: function queryAppList() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.connection.query('SELECT * FROM tbl_app', function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(rows);
                });
            });
        }
    }, {
        key: 'queryAppVersion',
        value: function queryAppVersion(id, type) {
            var _this3 = this;

            var params = [id, type];
            return new Promise(function (resolve, reject) {
                _this3.connection.query('SELECT version,path FROM tbl_apk_file WHERE id = ? AND type = ?', params, function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(rows);
                });
            });
        }

        /**
         * 获取数据库中的维护的app
         */

    }, {
        key: 'getApp',
        value: function getApp(type) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var _type = type;
                _this4.queryAppList().then(function (result) {
                    var appList = [];
                    var queryPromise = [];
                    var _this = _this4;

                    var _loop = function _loop() {
                        var data = result[i];
                        var promiseArray = [];

                        if ('local' == type) {
                            promiseArray = [_this.queryAppVersion.call(_this, result[i].id, type)];
                        } else if ('releaseDebug' == type) {
                            promiseArray = [_this.queryAppVersion.call(_this, result[i].id, type)];
                        } else if ('release' == type) {
                            promiseArray = [_this.queryAppVersion.call(_this, result[i].id, type)];
                        } else {
                            promiseArray = [_this.queryAppVersion.call(_this, result[i].id, 'local'), _this.queryAppVersion.call(_this, result[i].id, 'releaseDebug'), _this.queryAppVersion.call(_this, result[i].id, 'release')];
                        }

                        queryPromise.push(Promise.all([_this.queryAppVersion.call(_this, result[i].id, 'local'), _this.queryAppVersion.call(_this, result[i].id, 'releaseDebug'), _this.queryAppVersion.call(_this, result[i].id, 'release')]).then(function (_ref) {
                            var _ref2 = _slicedToArray(_ref, 3),
                                localVersion = _ref2[0],
                                releaseDebugVersion = _ref2[1],
                                releaseVersion = _ref2[2];

                            var app = new Object();
                            app.id = data.id;
                            app.name = data.name;
                            app.icon_url = data.icon_url;
                            if ('local' == _type) {
                                app.localVersion = localVersion[0].version;
                                app.localPath = localVersion[0].path;
                            } else if ('releaseDebug' == _type) {
                                app.releaseDebugVersion = releaseDebugVersion[0].version;
                                app.releaseDebugPath = releaseDebugVersion[0].path;
                            } else if ('release' == _type) {
                                app.releaseVersion = releaseVersion[0].version;
                                app.releasePath = releaseVersion[0].path;
                            } else {
                                app.localVersion = localVersion[0].version;
                                app.localPath = localVersion[0].path;

                                app.releaseDebugVersion = releaseDebugVersion[0].version;
                                app.releaseDebugPath = releaseDebugVersion[0].path;

                                app.releaseVersion = releaseVersion[0].version;
                                app.releasePath = releaseVersion[0].path;
                            }

                            appList.push(app);
                        }));
                    };

                    for (var i = 0; i < result.length; i++) {
                        _loop();
                    }

                    Promise.all(queryPromise).then(function () {
                        resolve(appList);
                    });
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'insertAppInfo',
        value: function insertAppInfo(params) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                _this5.connection.query('INSERT INTO tbl_app(id,name,icon_url) values(?,?,?)', params, function (err, result) {
                    if (err) reject(err);

                    console.log("update : " + result);
                    resolve(result);
                });
            });
        }
    }, {
        key: 'insertAppVersion',
        value: function insertAppVersion(params) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                _this6.connection.query('INSERT INTO tbl_apk_file(id,type,path,version) values(?,?,?,?)', params, function (err, result) {
                    if (err) reject(err);

                    console.log("update : " + result);
                    resolve(result);
                });
            });
        }
    }, {
        key: 'updateAppVersion',
        value: function updateAppVersion(id, type, path, version) {
            var _this7 = this;

            var params = [path, version, id, type];
            return new Promise(function (resolve, reject) {
                _this7.connection.query('update tbl_apk_file set path = ?,version = ? where id = ? and type = ?', params, function (err, result) {
                    if (err) reject(err);

                    console.log("update : " + result);
                    resolve(result);
                });
            });
        }
    }, {
        key: 'insertApp',
        value: function insertApp(id, name, icon_url, version_name) {
            var _this8 = this;

            var appInfo = [id, name, icon_url, version_name];
            return this.insertAppInfo(appInfo).then(function (data) {
                return _this8.insertAppVersion([id, 'local', '', version_name]);
            }).then(function (data) {
                return _this8.insertAppVersion([id, 'releaseDebug', '', version_name]);
            }).then(function (data) {
                return _this8.insertAppVersion([id, 'release', '', version_name]);
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