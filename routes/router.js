var express = require('express');
var index = require('./index');
var router = express.Router();

module.exports = function(){
    router.get('/', index.get);
    router.get('/index', index.get);
    router.post('/index', index.post);

    return router;
};