export default class DataBase{

    /**
     * 构造函数中引用mysql模块，并且创建连接
     */
    constructor(){
        //测试mysql
        var mysql  = require('mysql');  //调用MySQL模块
        //创建一个connection
        this.connection = mysql.createConnection({
            host: '127.0.0.1',       //主机
            user: 'root',               //MySQL认证用户名
            password: 'root',        //MySQL认证用户密码
            port: '3306',                   //端口号
            database: 'keep2iron'
        });

        this.connect();
    }

    /**
     * 连接mysql
     */
    connect() {
        //创建一个connection
        this.connection.connect(function(err){
            if(err){
                console.log('[query] - :'+err);
                return;
            }
            console.log('[connection connect]  succeed!');
        });
    }

    test(){
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
    close(){
        //关闭connection
        this.connection.end(function(err){
            if(err){
                return;
            }
            console.log('[connection end] succeed!');
        });
    }
}