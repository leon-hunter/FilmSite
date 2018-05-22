var mongoose=require('mongoose');
var db =require("./db.js");


var MovieSchema= new mongoose.Schema({
/*    movieid:ObjectId,*/
    director:String,
    title: String,
    language: String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,

    meta:{//录入或者更新数据时的时间记录,这里和其他字段一样，冒号不能省掉
        createAt:{
            type:Date,
            default:Date.now()
        },
        updeteAt:{
            type:Date,
            default:Date.now()
        }
    }
})

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updeteAt=Date.now()
    }
    else{
        this.meta.updateAt=Date.now()
    }
    next()//
})
//同时写了两个静态方法fetch和findById
MovieSchema.statics={
    fetch:function(cb){//取出当前数据库所有数据
        return this
            .find({})
            .sort('meta.updeteAt')
            .exec(cb)
    },
    findById:function(id,cb){//取出当前数据库所有数据
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

var movie=db.model('movie',MovieSchema);
module.exports=movie;