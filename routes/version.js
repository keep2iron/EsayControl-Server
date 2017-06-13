import DataBase from '../core/module';
import * as Response from '../core/resp_func';

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let database = new DataBase();
    database.getApp()
        .then((data)=>{
            Response.onSuccess(res,'成功',data)
        });
});

module.exports = router;