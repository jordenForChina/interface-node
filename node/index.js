//  官方提供的module
const http= require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");
// 自定义的module
const getApi = require("./getApi.js");
const  getApb = require('./getApb.js');
const turingApi = require('./turingApi.js');
// 主机名
// 更改成自己的电脑外网Ip
// 方法：ctrl+R ---》cmd---》ipconfig
const hostname ="10.3.131.240";
// 端口号
const port = 8888;
var i = 0;
//启动服务
http.createServer(function(req,res){
	// 获取浏览器地址
	// 浏览器完整地址------->接口：http://hostname:8888/getApi?callback=JSON_CALLBACK&page=2
	// req.url--------------->getApi?callback=J&page=2&rows=1
	//提取路径
	console.log(i++)
	var pathname = url.parse(req.url).pathname;
	// pathname---------------->/getApi
	//拿url的参数
	var paramStr = url.parse(req.url).query;
	//把url拿回来的参数处理成对象
	//paramStr------------------->callback=J&page=2&rows=1
	var param = querystring.parse(paramStr);
	//param=====================>[{callback:J},{page:2}]
	// 根据路由决定分支是进入webroot文件夹还是作为数据接口
	// 通过此处可以绑定多个接口
	// 写入头文件
	switch(pathname){
		case '/getApi':
			getApi.getApi(param,res);
			// param------>[{callback:J},{page:2}]
			// 服务器请求数据得到两个参数
			break;
		case '/getApb':
			getApb.getApb(param,res);
			break;
		case '/turingApi':
			turingApi.turingApi(param,res);
			break;
		default :
			break;
	}
	// 用fs读取本地webroot中文件,通过二进制binary
}).listen(port,hostname,function(){
	console.log("在浏览器输入接口http://"+hostname+":"+port+"/getApi?callback=JSON_CALLBACK&page=2")
})
