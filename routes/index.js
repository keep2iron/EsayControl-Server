var express = require('express');
import DataBase from "../core/module";
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //这句话是将当前的页面交给express渲染的引擎模板,Express的模板引擎常用的是ejs和jade
    let database = new DataBase();
    database.getApp()
        .then(function(data){
            console.log(JSON.stringify(data));
            res.render('index', {data: data});
        }).catch(function(err){
        console.log(err);
    });
});

module.exports = router;