import  * as Respone from './resp_func'

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

    /**
     * 获取数据库中的维护的app
     */
    getApp(){
        return new Promise((resolve,reject)=>{
            this.connection.query('SELECT * FROM tbl_app',function(err,rows,fields){
                if(err){
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