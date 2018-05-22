
var mongoose=require("mongoose");
var db =require("./db.js");

// Schema 结构
var bookSchema = new mongoose.Schema({
    name     : {type : String},//name : {type : String, default : '匿名用户'}
    author   : {type : String},
    price    : {type : Number},
});


//   静态方法
// 添加 mongoose 静态方法，静态方法在Model层就能使用
bookSchema.statics.findallbook = function( callback) {//name,不用占位
    return this.model('Book').find({}, callback);
}

bookSchema.statics.findbyname = function(name, callback) {//name,不用占位
    return this.model('Book').find({"name":name}, callback);
}

//   暴露接口
var bookModel= db.model("Book",bookSchema);
module.exports=bookModel;