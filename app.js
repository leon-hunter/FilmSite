var express =require('express');
var path=require('path');
var _=require('underscore');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Movie=require('./models/movie');
var port=process.env.port||3000;
var router=require("./router/router.js");
var app=express();

//mongoose.Promise =global.Promise;
app.locals.moment=require('moment');//记录本地时间
app.listen(port);

app.set('views','./views');
app.set("view engine","ejs");
//app.set('views', path.join(__dirname,"./views/pages"));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//利用path将静态资源中的css样式等导入node_module
//__dirname前边是双下划线,将电脑绝对路径加上node_moduls路径作为绝对路径
//将libs库中的bootstrap和jquery一起放到public文件夹下，视作样式静态资源的存储区
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json()); // for parsing application/json




/**通篇书写时切记个别地方要加英文逗号，不然会出现不可识别的符号*/
//index page
app.get('/',router.showIndex);

//detail page指的是从index page点进去的结果
app.get('/movie/:id',router.showDetail);

//admin get page
app.get('/admin/movie',router.addmovie);
//admin post movie page
app.post('/admin/movie/new',router.doadd);
//admin update movie
app.get('/admin/update/:id',router.updatedata);
//list page show
app.get('/admin/list',router.showList);
//list page delete part
app.delete('/admin/list',router.delete)

