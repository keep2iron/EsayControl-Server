import DataBase from '../core/module';
import * as Response from '../core/resp_func';

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.query.type){
        console.log('err');
        Response.onFailed(res,'type参数不能为空');
        return;
    }
    let database = new DataBase();
    database.getApp(req.query.type)
        .then((data)=>{
            console.log('successful');
            Response.onSuccess(res,'成功',data)
        });
});

module.exports = router;