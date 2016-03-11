---
layout: post
title: "Web前端: Ajax Notes"
---



# Ajax Notes



HTML和CSS 来实现页面，表达信息

运用XMLHttpRequest和web服务器进行数据的异步交换

用javascript 操作DOM,实现动态局部刷新



## XMLHttpRequest 对象创建

var request=new XMLHttpRequest();





## HTTP请求

无状态协议



Get请求:

- 一般用于获取信息(一般用于查询信息)


- 使用URL传递参数


- 对所发送信息的数量也有限制,一般在2000个字符以内.

Notes：GET请求是 幂等 



POST请求(相对安全):

- 一般用于修改服务器上 的资源


- 对所发送信息的数量无限制



HTTP响应:

1. 数字和文字,状态码
2. 响应头.和请求头一样包含许多有用的信息,服务器类型,日期时间,内容类型和长度等
3. 响应体


XMLHttpRequest发送请求

- open(method,url,async)


- sent(string)



**demo**

```
request.open("POST","create.php",true);
request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
request.send("name=wanglinzhizhi&sex=male");
```

Notes:request.setRequestHeader 这个必须要加,渲染方式











### XHR的响应



##  JSON的解析

方法一 eval()方法

```
var jsondata='{"staff":[{"name":"洪七","age":70},{"name":"郭靖","age":30},{"name":"黄蓉","age":35}]}';
var jsonobj=eval('('+jsondata+')');
alert(jsonobj.staff[0].name);
```




方法二(JSON.parse)

```
var jsondata='{"staff":[{"name":"洪七","age":70},{"name":"郭靖","age":30},{"name":"黄蓉","age":35}]}';
var jsonobj=JSON.parse(jsondata);
alert(jsonobj.staff[0].name);
```

推荐使用第二种方法



Note: **无论何时使用eval时是非常危险的.**





JSON校验

http://jsonlint.com/





Notes:CND加速的jquery库

<script src="http://apps.bdimg.com/libs/jquery/1.11.1/jquery.min.js"></script>
// 使用了CDN加速,调用很快.







## 跨域问题

javascript出于安全方面的考虑，不允许跨域调用其他页面的对象。

什么是跨域呢？简单地理解就是因为javascript同源策略的限制，a.com域名下的js无法操作b.com或是c.a.com域名下的对象。









解决跨域问题的方法

1. **代理**
   通过在同域名下的web服务器端创建一个代理：
   北京服务器(域名:www.beijing.com)
   上海服务器(域名：www.shanghai.com)
   比如在北京的web服务器的后台(www.beijing.com/proxy-shanghaiservice.php)来调用上海服务器(www.shanghai.com/services.php)的服务，然后再把访问结果返回给前端，这样前端调用北京同域名的服务就和调用上海的服务效果相同了。
   ​
2. **JSONP(只支持GET请求)：**

   ​

	<script src="http://www.bbb.com/jsonp.js"></script>
	
	在www.aaa.com页面中
	<script>
	function jsonp(json){
		alert(json["name"]);
	}
	</script>
​	
​	

	在www.bbb.com页面中:
	
	jsonp({"name":"洪七公",'age':24});
​	
​	

	jsonp只能对get请求起作用,不能对post请求起作用(不支持post请求)
```
JSONP可用于解决主流浏览器的跨域数据访问的问题。
在www.aaa.com页面中：
<script>
  function jsonp(json){
      alert(json["name"]);
  }
</script>
<script src="http;//www.bbb.com/jsonp.js"></script>
在www.bbb.com页面中：
jsonp({'name':'xx','age':24})
这样就可以实现在www.aaa.com客户端访问获取www.bbb.com所在服务器中的文件或数据,从而实现跨域
```



### 3. XHR2



HTML5 提供的XMLHttpRequest Level2已经实现了跨域访问以及其他一些新功能:

对于解决跨域问题,只需要对**服务端**做较小的改变, 客户端不需要做改变

```
header("Content-Type:application/json;charset=utf-8");

header("Access-Control-Allow-Origin:*");

header("Access-Control-Allow-Methods:POST,GET");
```



Notes:

1.HTML5提供的XMLHttpRequest Level2已经实现了跨域访问以及其他的一些新功能
2.IE10以下的版本都不支持
3.在服务器端




**总结:**

```
跨域处理，三种方法：
1、处理跨域方法一 代理


2、处理跨域方式二——


3、处理跨域的方法三——XHR2：

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
```





## Demo

JavaScript原生版实现demo

```javascript
<script>
document.getElementById("search").onclick = function() { 
	var request = new XMLHttpRequest();
	request.open("GET", "serverjson.php?number=" + document.getElementById("keyword").value);
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState===4) {
			if (request.status===200) { 
				var data = JSON.parse(request.responseText);
				if (data.success) { 
					document.getElementById("searchResult").innerHTML = data.msg;
				} else {
					document.getElementById("searchResult").innerHTML = "出现错误：" + data.msg;
				}
			} else {
				alert("发生错误：" + request.status);
			}
		} 
	}
}

document.getElementById("save").onclick = function() { 
	var request = new XMLHttpRequest();
	request.open("POST", "serverjson.php");
	var data = "name=" + document.getElementById("staffName").value 
	                  + "&number=" + document.getElementById("staffNumber").value 
	                  + "&sex=" + document.getElementById("staffSex").value 
	                  + "&job=" + document.getElementById("staffJob").value;
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(data);
	request.onreadystatechange = function() {
		if (request.readyState===4) {
			if (request.status===200) { 
				var data = JSON.parse(request.responseText);
				if (data.success) { 
					document.getElementById("createResult").innerHTML = data.msg;
				} else {
					document.getElementById("createResult").innerHTML = "出现错误：" + data.msg;
				}
			} else {
				alert("发生错误：" + request.status);
			}
		} 
	}
}
</script>
```







jQuery版的实现

jQuery中封装了request.setRequestHeader("Content-type"... 故不需要额外添加句代码

```javascript
<script>
$(document).ready(function(){ 
	$("#search").click(function(){ 
		$.ajax({ 
		    type: "GET", 	
			url: "http://127.0.0.1:8000/ajaxdemo/serverjsonp.php?number=" + $("#keyword").val(),
			dataType: "jsonp",
			jsonp: "callback",
			success: function(data) {
				if (data.success) {
					$("#searchResult").html(data.msg);
				} else {
					$("#searchResult").html("出现错误：" + data.msg);
				}  
			},
			error: function(jqXHR){     
			   alert("发生错误：" + jqXHR.status);  
			},     
		});
	});
	
	$("#save").click(function(){ 
		$.ajax({ 
		    type: "POST", 	
			url: "http://127.0.0.1:8000/ajaxdemo/serverjsonp.php",
			data: {
				name: $("#staffName").val(), 
				number: $("#staffNumber").val(), 
				sex: $("#staffSex").val(), 
				job: $("#staffJob").val()
			},
			dataType: "json",
			success: function(data){
				if (data.success) { 
					$("#createResult").html(data.msg);
				} else {
					$("#createResult").html("出现错误：" + data.msg);
				}  
			},
			error: function(jqXHR){     
			   alert("发生错误：" + jqXHR.status);  
			},     
		});
	});
});
</script>
```



