

// mongoose 链接
var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/FilmSite');

// 链接错误
db.on('error', function(error) {
    console.log(error);
});

db.once("open",function (callback) {
    console.log("数据库连接成功");
})


module.exports=db;