
//这个页面只关心类，不关心数据库
var express =require('express');
var mongoose = require('mongoose');
var app=express();
var Movie=require("../models/movie.js");
var _=require('underscore');
var bodyParser = require('body-parser');

mongoose.Promise =global.Promise;
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//显示首页
exports.showIndex=function(req,res,next){
    Movie.fetch(function(err,movies){//返回的数组movies
        if(err){
            console.log(err)
        }else {
            res.render('index',{//传递局部变量title、movies给视图index
                title:'imooc首页',
                // movies: movies//把上边fetch到的返回值movies赋给这里的movies
                movies:movies
            });
        }
    })
}
//显示详情页面
exports.showDetail= function(req,res){//:id可以匹配到下面拿出来的参数id值
    var id=req.params.id//和路由对应，:id所以需要从请求参数中取出id

    Movie.findById(id,function(err,movie){
        if(err){
            console.log(err)
        }
        res.render('detail',{
            title:'imooc'+ movie.title,
            movie: movie
        })
    })


}
//添加电影,回应get请求
exports.addmovie=function(req,res){
    console.log(req.query);
    res.render('admin',{
        title:'imooc后台录入页',
        movie:{//提交的是movie表单,这里是给的空表单
            //_id:new mongoose.Types.ObjectId ,//mongoose.Schema.Types.ObjectId
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
}
//执行添加，回应post请求
exports.doadd=function(req,res){
    var id=req.body.movie._id;
    var movieObj=req.body.movie;
    console.log("-----------");
    console.log(id);
    console.log("-----------");
    var _movie;
    if (id!=='undefined'&& id !=='') {
        console.log('exist');
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
            _movie=_.extend(movie,movieObj)//_.extend表示underscore的方法，把老对象的字段值赋给对象movie，生成新对象_movie
            _movie.save(function(err,movie){
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)//调到详情页面
            })
        })
    }
    else{
        console.log('new')
        _movie=new Movie({
            director: movieObj.doctor,
            title: movieObj.title,
            language: movieObj.language,
            country: movieObj.country,
            summary: movieObj.summary,
            flash: movieObj.flash,
            poster: movieObj.poster,
            year: movieObj.year

        })
        _movie.save(function(err,movie){
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/'+movie._id)

        })
    }
}
//显示后台中的电影列表
exports.showList=function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        console.log('list')
        res.render('list',{
            title:'imooc 电影表',
            movies: movies//之前list页面没显示是赋给了空数组
        })
    })
}
//更正编辑后台电影数据
exports.updatedata=function(req,res){
    var id=req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'imooc 后台更新页面',
                movie: movie
            })
        })
    }
}

exports.delete=function(req,res){
    var id=req.query.id;
    console.log("haha")
    console.log(id)
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if (err) {
                console.log(err);
            } else {
                console.log("删除成功")
                res.json({success: 1});
            }
        })
    }
}