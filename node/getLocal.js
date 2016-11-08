//获取http模块
const http = require("http");
// param 是参数，在jsonp中用，res是回复
function getLocal(param,res){
	// ####此时是node服务器想接口服务器发送请求
	http.request({
	// 主机名
	hostname:'127.0.0.1',
	// 端口号
	port:'8210',
	// 查询路径
	path:param.page,
	method:'GET',
	// api
	},function(request){
		// 设置编码方式
		request.setEncoding('utf-8');
		// 建立一个str接收数据
		var str = "";
		// 开始请求数据，并存到str中
		request.on("data",function(data){
			str += data;

		});
		// 当所有数据请求完，打印数据
		request.on("end",function(data){
			
			// 当数据完全获得的时候。把他们组装成jsonp
			// param.callback是接口的参数，是自定义，但jsonp接收的数据
			// 要写成JSON_CALLBACK()
			res.end(param.callback+"("+str+")")
		})

	// end()是输出数据的方法
	}).end()
};
//导出getApi模块给index.js
exports.getLocal = getLocal;
