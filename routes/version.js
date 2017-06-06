import DataBase from '../core/module';

let express = require('express');
let router = express.Router();
let data = {key: 'value', hello: 'world'};
/* GET users listing. */
router.get('/', function(req, res, next) {
    let database = new DataBase();
    database.test();
    database.close();

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
});

module.exports = router;