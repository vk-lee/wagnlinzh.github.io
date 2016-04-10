---
layout: post
title: "Web前端 JavaScript Notes"
---




<hr />
# JavaScript Note





### 字符串

返回指定的字符串首次出现的位置


indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
语法

    stringObject.indexOf(substring, startpos)

参数说明：

说明：
1.该方法将从头到尾地检索字符串 stringObject，看它是否含有子串 substring。
2.可选参数，从stringObject的startpos位置开始查找substring，如果没有此参数将从stringObject的开始位置查找。
3.如果找到一个 substring，则返回 substring 的第一次出现的位置。stringObject 中的字符位置是从 0 开始的。
注意：1.indexOf() 方法区分大小写。
2.如果要检索的字符串值没有出现，则该方法返回 -1。

例如: 对 "I love JavaScript!" 字符串内进行不同的检索：

```
    <script type="text/javascript">
      var str="I love JavaScript!"
      document.write(str.indexOf("I") + "<br />");
      document.write(str.indexOf("v") + "<br />");
      document.write(str.indexOf("v",8));
    </script>


    //以上代码的输出：
    0
    4
    9
```






找到第二个o出现的位置

```javascript
var mystr="Hello World!"
(mystr.indexOf('o',mystr.indexOf('o')+1));//用两次indexOf
```






## 字符串分割split()

知识讲解：
split() 方法将字符串分割为字符串数组，并返回此数组。
语法：

​	stringObject.split(separator,limit)

参数说明:


注意：如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
我们将按照不同的方式来分割字符串：
使用指定符号分割字符串，代码如下:

```javascript
var mystr = "www.imooc.com";
document.write(mystr.split(".")+"<br>");
document.write(mystr.split(".", 2)+"<br>");

//运行结果:
www,imooc,com
www,imooc

//将字符串分割为字符，代码如下：
document.write(mystr.split("")+"<br>");
document.write(mystr.split("", 5));
//运行结果:
w,w,w,.,i,m,o,o,c,.,c,o,m
w,w,w,.,i
```










###提取字符串substring()

substring() 方法用于提取字符串中介于两个指定下标之间的字符。
语法:

```javascript
	stringObject.substring(starPos,stopPos);
```


参数说明:

注意：

1. 返回的内容是从 start开始(包含start位置的字符)到 stop-1 处的所有字符，其长度为 stop 减start。
2. 如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。
3. 如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。
   使用 substring() 从字符串中提取字符串，代码如下：

   ```javascript

     <script type="text/javascript">
     var mystr="I love JavaScript";
     document.write(mystr.substring(7));
     document.write(mystr.substring(2,6));
     </script>
     //运行结果:
     JavaScript
     love
   ```

<hr />
### 提取指定数目的字符substr()

substr() 方法从字符串中提取从 startPos位置开始的指定数目的字符串。
语法:
​		

​	stringObject.substr(startPos,length)


注意：如果参数startPos是负数，从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
如果startPos为负数且绝对值大于字符串长度，startPos为0。
使用 substr() 从字符串中提取一些字符，代码如下：

```javascript
<script type="text/javascript">
  var mystr="I love JavaScript!";
  document.write(mystr.substr(7));
  document.write(mystr.substr(2,4));
</script>
//运行结果：
JavaScript!
love
```







<hr />

### 数组



### 数组连接concat()


concat() 方法用于连接两个或多个数组。此方法返回一个新数组，不改变原来的数组。
语法
​		arrayObject.concat(array1,array2,...,arrayN)





### 指定分隔符连接数组元素join()

join()方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
语法：
​		arrayObject.join(分隔符)

参数说明:

注意：返回一个字符串，该字符串把数组中的各个元素串起来，用<分隔符>置于元素与元素之间。这个方法不影响数组原本的内容。 我们使用join（）方法，将数组的所有元素放入一个字符串中，代码如下：

```javascript

<script type="text/javascript">
  var myarr = new Array(3);
  myarr[0] = "I";
  myarr[1] = "love";
  myarr[2] = "JavaScript";
  document.write(myarr.join());
</script>
//运行结果：
I,love,JavaScript
```


我们将使用分隔符来分隔数组中的元素，代码如下：

```javascript
<script type="text/javascript">
  var myarr = new Array(3)
  myarr[0] = "I";
  myarr[1] = "love";
  myarr[2] = "JavaScript";
  document.write(myarr.join("."));
</script>
//运行结果：
I.love.JavaScript
```






### 颠倒数组元素顺序reverse()


reverse() 方法用于颠倒数组中元素的顺序。
语法：


​		arrayObject.reverse()


注意：该方法会改变原来的数组，而不会创建新的数组。
定义数组myarr并赋值，然后颠倒其元素的顺序：

```javascript


  var myarr = new Array(3)
  myarr[0] = "1"
  myarr[1] = "2"
  myarr[2] = "3"
  document.write(myarr + "<br />")
  document.write(myarr.reverse())


//运行结果：
1,2,3
3,2,1
```












### 选定元素slice()


slice() 方法可从已有的数组中返回选定的元素。
语法
​		arrayObject.slice(start,end)
参数说明：

1.返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
1. 该方法并不会修改数组，而是返回一个子数组。
   注意：
2. 可使用负值从数组的尾部选取元素。
   2.如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。
3. String.slice() 与 Array.slice() 相似。
   我们将创建一个新数组，然后从其中选取的元素，代码如下：


```
   var myarr = new Array(1,2,3,4,5,6);
   document.write(myarr + "<br>");
   document.write(myarr.slice(2,4) + "<br>");
   document.write(myarr);

   //   运行结果：
   1,2,3,4,5,6
   3,4
   1,2,3,4,5,6
```



<hr />
### 数组排序sort()

sort()方法使数组中的元素按照一定的顺序排列。


语法:

	arrayObject.sort(方法函数)
参数说明：

1.如果不指定<方法函数>，则按unicode码顺序排列。

2.如果指定<方法函数>，则按<方法函数>所指定的排序方法排序。


myArray.sort(sortMethod);


注意: 该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下： 

- 若返回值<=-1，则表示 A 在排序后的序列中出现在 B 之前。

  - 若返回值>-1 && <1，则表示 A 和 B 具有相同的排序顺序。
  - 若返回值>=1，则表示 A 在排序后的序列中出现在 B 之后。

1.使用sort()将数组进行排序，代码如下：

    ​```
    <script type="text/javascript">
      var myarr1 = new Array("Hello","John","love","JavaScript"); 
      var myarr2 = new Array("80","16","50","6","100","1");
      document.write(myarr1.sort()+"<br>");
      document.write(myarr2.sort());
    </script>
    
    //运行结果：
    Hello,JavaScript,John,love
    1,100,16,50,6,80
    
    
    
    ​```

注意:上面的代码没有按照数值的大小对数字进行排序。


2.如要实现这一点，就必须使用一个排序函数，代码如下：

    ​```
    <script type="text/javascript">
      function sortNum(a,b) {
      return a - b;
     //升序，如降序，把“a - b”该成“b - a”
    }
     var myarr = new Array("80","16","50","6","100","1");
      document.write(myarr + "<br>");
      document.write(myarr.sort(sortNum));
    </script>
    
    //运行结果：
    80,16,50,6,100,1
    1,6,16,50,80,100
    
    ​```
    
    
    
    

<hr />
<hr />



### 日期格式


```
   <!DOCTYPE  HTML>
	<html >
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>系好安全带,准备启航</title>
	
	<script type="text/javascript">
	
	  //通过javascript的日期对象来得到当前的日期，并输出。
	
	  var date = new Date();  // 实例化日期对象  
	  var timeStr = '';//日期 
	  timeStr = date.getFullYear() + "年" ;  
	  timeStr += date.getMonth() + 1 +"月";  
	  timeStr += date.getDate()+"日";  
	  var day  = date.getDay(); //星期 
	  var week = '';
	  switch(day){
	
	case  0 :
	week  = '星期一';
	break;
	case  1 :
	week  = '星期二';
	break;
	case  2 :
	week  = '星期三';
	break;
	case  3 :
	week  = '星期四';
	break;
	case  4 :
	week  = '星期五';
	break;
	case  5 :
	week  = '星期六';
	break;
	case  6 :
	week  = '星期天';
	break; 
	}
	  timeStr += " "+week;
	  //打印出日期
	  document.write(timeStr);
	  
	  //成绩是一长窜的字符串不好处理，找规律后分割放到数组里更好操作哦
	  var sorceStr = "小明:87; 小花:81; 小红:97; 小天:76;小张:74;小小:94;小西:90;小伍:76;小迪:64;小曼:76";
	
	  var arr  = sorceStr.split(';');//按 ; 符号进行数组分割
	  var sum = 0;
	  var av= 0;
	  for( var i =0;i<arr.length;i++ ){
		var index = arr[i].indexOf(':'); //根据 ： 符号确定数字开始的位置 
		sum += parseInt(  arr[i].substr(index+1,2)  );  // parseInt() 字符串类型转成整型
	   }


		av = sum/arr.length;
		av = Math.floor(av);  // 取整
	
	   //从数组中将成绩撮出来，然后求和取整，并输出。
	   document.write("--班级总分为："+av);
	
	</script>
	</head>
	<body>
	</body>
	</html>

​```

```




<hr />

### 计时器setInterval()


在执行时,从载入页面后每隔指定的时间执行代码。
语法:
setInterval(代码,交互时间);
参数说明：

1. 代码：要调用的函数或要执行的代码串。
2. 交互时间：周期性执行或调用表达式之间的时间间隔，以毫秒计（1s=1000ms）。

返回值:
   一个可以传递给 clearInterval() 从而取消对"代码"的周期性执行的值。
   调用函数格式(假设有一个clock()函数):

   setInterval("clock()",1000)
   或
   setInterval(clock,1000)

我们设置一个计时器，每隔100毫秒调用clock()函数，并将时间显示出来，代码如下:










     <!DOCTYPE HTML>
     <html>
     <head>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
       <title>计时器</title>
       <script type="text/javascript">
     		var int=setInterval(clock, 100)
             function clock(){
               var time=new Date();
               document.getElementById("clock").value = time;
             }
       </script>
    </head>
    <body>
    <form>
     <input type="text" id="clock" size="50"  />
    </form>
    </body>
    </html>

```

```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>定时器</title>
<script type="text/javascript">
  var attime;
  function clock(){
    var time=new Date();          
    attime= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
    document.getElementById("clock").value = attime;
  }
  setInterval(clock,1000);
</script>
</head>
<body>
<form>
<input type="text" id="clock" size="50"  />
</form>
</body>
</html>
```






<hr />
### 取消计时器clearInterval()


clearInterval() 方法可取消由 setInterval() 设置的交互时间。

```
语法：
	clearInterval(id_of_setInterval)

参数说明:
id_of_setInterval：由 setInterval() 返回的 ID 值。
```



每隔 100 毫秒调用 clock() 函数,并显示时间。当点击按钮时，停止时间,代码如下:

```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>计时器</title>
<script type="text/javascript">
   function clock(){
      var time=new Date();                     
      document.getElementById("clock").value = time;
   }
	// 每隔100毫秒调用clock函数，并将返回值赋值给i
   var i=setInterval("clock()",100);
</script>

</head>
<body>
<form>
<input type="text" id="clock" size="50"  />
<input type="button" value="Stop" onclick="clearInterval(i)"  />
</form>
</body>
</html>
```














<hr />
### 计时器setTimeout()


setTimeout()计时器，在载入后延迟指定时间后,去执行一次表达式,仅执行一次。
语法:
​	setTimeout(代码,延迟时间);
参数说明：

1. 要调用的函数或要执行的代码串。
2. 延时时间：在执行代码前需等待的时间，以毫秒为单位（1s=1000ms)。
   当我们打开网页3秒后，在弹出一个提示框，代码如下:

```
   <!DOCTYPE HTML>
   <html>
   <head>
   <script type="text/javascript">
   setTimeout("alert('Hello!')", 3000 );
   </script>
   </head>
   <body>
   </body>
   </html>
   当按钮start被点击时，setTimeout()调用函数，在5秒后弹出一个提示框。
   <!DOCTYPE HTML>
   <html>
   <head>
   <script type="text/javascript">
   function tinfo(){
   var t=setTimeout("alert('Hello!')",5000);
   }
   </script>
   </head>
   <body>
   <form>
   <input type="button" value="start" onClick="tinfo()">
   </form>
   </body>
   </html>
```

   要创建一个运行于无穷循环中的计数器，我们需要编写一个函数来调用其自身。在下面的代码，当按钮被点击后，输入域便从0开始计数。

```
   <!DOCTYPE HTML>
   <html>
   <head>
   <script type="text/javascript">
   var num=0;
   function numCount(){
     document.getElementById('txt').value=num;
     num=num+1;
     setTimeout("numCount()",1000);
   }
   </script>

   </head>
   <body>
   <form>
   <input type="text" id="txt" />
   <input type="button" value="Start" onClick="numCount()" />
   </form>
   </body>
   </html>
```








<hr />
### 取消计时器clearTimeout()


setTimeout()和clearTimeout()一起使用，停止计时器。


```
语法:
	clearTimeout(id_of_setTimeout)

参数说明:
	id_of_setTimeout：由 setTimeout() 返回的 ID 值。该值标识要取消的延迟执行代码块。
```


下面的例子和上节的无穷循环的例子相似。唯一不同是，现在我们添加了一个 "Stop" 按钮来停止这个计数器：


```
<!DOCTYPE HTML>
<html>
<head>
<script type="text/javascript">
  var num=0,i;
  function timedCount(){
    document.getElementById('txt').value=num;
    num=num+1;
    i=setTimeout(timedCount,1000);
  }
setTimeout(timedCount,1000);
  function stopCount(){
    clearTimeout(i);
  }
</script>
</head>
<body>
  <form>
	<input type="text" id="txt">
	<input type="button" value="Stop" onClick="stopCount()">
  </form>
</body>
</html>

```







<hr />
### History 对象

history对象记录了用户曾经浏览过的页面(URL)，并可以实现浏览器前进与后退相似导航的功能。
注意:从窗口被打开的那一刻开始记录，每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。
语法：
window.history.[属性|方法]
注意：window可以省略。
History 对象属性

### History 对象方法

使用length属性，当前窗口的浏览历史总长度，代码如下：

```

<script type="text/javascript">
  var HL = window.history.length;
  document.write(HL);
</script>

```













### 返回前一个浏览的页面

back()方法，加载 history 列表中的前一个 URL。


```
语法：
window.history.back();


比如，返回前一个浏览的页面，代码如下：
window.history.back();
注意：等同于点击浏览器的倒退按钮。
back()相当于go(-1),代码如下:
window.history.go(-1);
```





<hr />
### userAgent

返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
语法
navigator.userAgent
几种浏览的user_agent.，像360的兼容模式用的是IE、极速模式用的是chrom的内核。

使用userAgent判断使用的是什么浏览器(假设使用的是IE8浏览器),代码如下:


```

function validB(){ 
  var u_agent = navigator.userAgent; 
  var B_name="Failed to identify the browser"; 
  if(u_agent.indexOf("Firefox")>-1){ 
  	B_name="Firefox"; 
  }else if(u_agent.indexOf("Chrome")>-1){ 
	  B_name="Chrome"; 
  }else 	
    if(u_agent.indexOf("MSIE")>-1&&u_agent.indexOf("Trident")>-1){ 
    B_name="IE(8-10)";  
  }

	document.write("B_name:"+B_name+"<br>");
	document.write("u_agent:"+u_agent+"<br>"); 

} 

```













HTML文档可以说由节点构成的集合，DOM节点有:

1. **元素节点**：<html>、<body>、<p>等元素节点，即**标签**。
2. **文本节点**: 向用户展示的内容，如<li>...</li>中的**文本**。
3. **属性节点**: 元素属性，如<a>标签的链接属性href="http://www.imooc.com"。

### getElementsByTagName()方法


返回带有**指定标签名**的节点对象的集合。**返回元素的顺序是它们在文档中的顺序**。


```
语法:
		getElementsByTagName(Tagname)
说明:

1. Tagname是标签的名称，如p、a、img等标签名。
2. 和数组类似也有length属性，可以和访问数组一样的方法来访问，所以从0开始。

```





<hr />
### 区别getElementByID,getElementsByName,

### getElementsByTagName




以人来举例说明，人有能标识身份的身份证，有姓名，有类别(大人、小孩、老人)等。

1. ID 是一个人的身份证号码，是唯一的。所以通过getElementById获取的是指定的一个人。
2. Name 是他的名字，可以重复。所以通过getElementsByName获取名字相同的人集合。
3. TagName可看似某类，getElementsByTagName获取相同类的人集合。如获取小孩这类人，getElementsByTagName("小孩")。

把上面的例子转换到HTML中，如下:

```
<input type="checkbox" name="hobby" id="hobby1">  音乐
   input标签就像人的类别。
   name属性就像人的姓名。
   id属性就像人的身份证。
```


方法总结如下:

注意：方法区分大小写
通过下面的例子(6个name="hobby"的复选项，两个按钮)来区分三种方法的不同:


```
  <input type="checkbox" name="hobby" id="hobby1">  音乐
  <input type="checkbox" name="hobby" id="hobby2">  登山
  <input type="checkbox" name="hobby" id="hobby3">  游泳
  <input type="checkbox" name="hobby" id="hobby4">  阅读
  <input type="checkbox" name="hobby" id="hobby5">  打球
  <input type="checkbox" name="hobby" id="hobby6">  跑步 
  <input type="button" value = "全选" id="button1">
  <input type="button" value = "全不选" id="button1">
```

1. document.getElementsByTagName("input")，结果为获取所有标签为input的元素，共8个。
2. document.getElementsByName("hobby")，结果为获取属性name="hobby"的元素，共6个。
3. document.getElementById("hobby6")，结果为获取属性id="hobby6"的元素，只有一个，"跑步"这个复选项。

<hr />
### getAttribute()方法


通过元素节点的属性名称获取属性的值。
语法：

	elementNode.getAttribute(name)

说明:

1. elementNode：使用getElementById()、getElementsByTagName()等方法，获取到的元素节点。
2. name：要想查询的元素节点的**属性**名字

### setAttribute()方法


setAttribute() 方法增加一个指定名称和值的新属性，或者把一个现有的属性设定为指定的值。
语法：

​		elementNode.setAttribute(name,value)

说明：

1.name: 要设置的属性名。
2.value: 要设置的属性值。


注意：

1. 把指定的属性设置为指定的值。如果不存在具有指定名称的属性，该方法将创建一个新属性。
2. 类似于getAttribute()方法，setAttribute()方法只能通过元素节点对象调用的函数。






### 节点属性


**在文档对象模型 (DOM) 中，每个节点都是一个对象**。DOM 节点有三个重要的属性 ：

```

1. nodeName : 节点的名称
2. nodeValue ：节点的值
3. nodeType ：节点的类型

```

一、nodeName 属性: 节点的名称，是只读的。

-   **元素节点**的 nodeName 与标签名相同

-   **属性节点**的 nodeName 是属性的名称

-   **文本节点**的 nodeName 永远是 #text

-   **文档节点**的 nodeName 永远是 #document

二、nodeValue 属性：节点的值

- **元素节点**的 nodeValue 是 undefined 或 null
- **文本节点**的 nodeValue 是文本自身
- **属性节点**的 nodeValue 是属性的值











<hr />
### 访问子结点childNodes


访问选定元素节点下的所有子节点的列表，返回的值可以看作是一个数组，他具有length属性。
语法：

​		elementNode.childNodes

注意：
如果选定的节点没有子节点，则该属性返回不包含节点的 NodeList。


示例代码：

```
<script type="text/javascript">
  	var x=document.getElementsByTagName('ul')[0].childNodes;
  	document.write("UL子节点个数: "+x.length+"<br/>");
  	document.write("节点类型:"+x[0].nodeType);
</script>

运行结果:
IE:
  UL子节点个数:3
  节点类型:1
其它浏览器:
   UL子节点个数:7
   节点类型:3

```


注意:

1. IE全系列、firefox、chrome、opera、safari兼容问题
2. 节点之间的空白符，在firefox、chrome、opera、safari浏览器是文本节点，所以IE是3，其它浏览器是7，

如果把代码改成这样:

```
<ul><li>javascript</li><li>jQuery</li><li>PHP</li></ul>
```

运行结果:（IE和其它浏览器结果是一样的）

  UL子节点个数:3

  节点类型:1



```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>
<body>
<div>
  javascript  
  <p>javascript</p>
  <div>jQuery</div>
  <h5>PHP</h5>
</div>
<script type="text/javascript">

​```
var x=document.getElementsByTagName('div')[0].childNodes;
for(var i=0;i<x.length;i++){
    document.write(x[i].nodeName+"  "+x[i].nodeValue+"   "+x[i].nodeType+"<br />");
}
​```

//   	document.write("UL子节点个数: "+x.length+"<br/>");
//   	document.write("节点类型:"+x[0].nodeType);



</script>
</body>
</html>
```










<hr />
### 访问子结点的第一和最后项


一、firstChild 属性返回‘childNodes’数组的第一个子节点。如果选定的节点没有子节点，则该属性返回 NULL。


```
语法：
	node.firstChild

说明：与elementNode.childNodes[0]是同样的效果。 
```


二、 lastChild 属性返回‘childNodes’数组的最后一个子节点。如果选定的节点没有子节点，则该属性返回 NULL。


```
语法：
	node.lastChild

说明：与elementNode.childNodes[elementNode.childNodes.length-1]是同样的效果。 
```



注意: 上一节中，我们知道Internet Explorer 会忽略节点之间生成的空白文本节点，而其它浏览器不会。我们可以通过检测节点类型，过滤子节点。 (以后章节讲解)









### 访问父节点parentNode


获取指定节点的父节点



语法：
​	elementNode.parentNode
注意:父节点只能有一个。


看看下面的例子,获取 P 节点的父节点，代码如下:

```
<div id="text">
  <p id="con"> parentNode 获取指点节点的父节点</p>
</div> 
<script type="text/javascript">
  var mynode= document.getElementById("con");
  document.write(mynode.parentNode.nodeName);
</script>
运行结果:
parentNode 获取指点节点的父节点
DIV
访问祖节点:
elementNode.parentNode.parentNode
看看下面的代码:
<div id="text">  
  <p>parentNode<span id="con"> 获取指点节点的父节点</span></p>
</div> 

<script type="text/javascript">
  var mynode= document.getElementById("con");
  document.write(mynode.parentNode.parentNode.nodeName);
</script>

```



运行结果:
parentNode获取指点节点的父节点
DIV
注意: 浏览器兼容问题，chrome、firefox等浏览器标签之间的空白也算是一个文本节点。











### 任务

试一试，通过获取的mylist节点，使用访问父节点parentNode，将"HTML/CSS"课程内容输出。
补充第30行代码，将"HTML/CSS"课程内容输出

```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>
<body>
<ul id="con">
<li id="lesson1">javascript
  <ul> 

​```
  <li id="tcon"> 基础语法</li>
  <li>流程控制语句</li>
  <li>函数</li>
  <li>事件</li>
  <li>DOM</li>
​```

  </ul>
</li>
<li id="lesson2">das</li>
<li id="lesson3">dadf</li>
<li id="lesson4">HTML/CSS 
  <ul>

​```
<li>文字</li>
<li>段落</li>
<li>表单</li>
<li>表格</li>  
​```

  </ul> 
</li></ul>  
<script  type="text/javascript">    
   var mylist = document.getElementById("tcon"); 

​
// document.write(mylist.parentNode.lastChild.nodeName);
document.write(mylist.parentNode.parentNode.parentNode.lastChild.innerHTML);
​

</script> 

</body>
</html>


```


<hr />
### 访问兄弟节点



1. nextSibling 属性可返回某个节点之后紧跟的节点（处于同一树层级中）。
   语法：
   nodeObject.nextSibling
   说明：如果无此节点，则该属性返回 null。
2. previousSibling 属性可返回某个节点之前紧跟的节点（处于同一树层级中）。
   语法：
   nodeObject.previousSibling  
   说明：如果无此节点，则该属性返回 null。
   注意: 两个属性获取的是节点。Internet Explorer 会忽略节点间生成的空白文本节点（例如，换行符号），而其它浏览器不会忽略。
   解决问题方法:
   判断节点nodeType是否为1, 如是为元素节点，跳过

<hr />
### 插入节点appendChild()


在指定节点的最后一个子节点列表之后添加一个新的子节点。
语法:
appendChild(newnode)
参数:
newnode：指定追加的节点。


任务
试一试，完成为UL标签添加一个新项PHP。
1.在代码编辑器中，script标签内，为ul添加一个li。
2.设置li内容为PHP。

​```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>
<body>

<ul id="test">
  <li>JavaScript</li>
  <li>HTML</li>
</ul> 

<script type="text/javascript">

  var otest = document.getElementById("test");  
  var newli=document.createElement("li");
  newli.innerHTML="PHP";
  otest.appendChild(newli);

</script> 

</body>
</html>


```



### 插入节点insertBefore()


insertBefore() 方法可在已有的子节点前插入一个新的子节点。
语法:
insertBefore(newnode,node);
参数:
newnode: 要插入的新节点。
node: 指定此节点前插入节点。



任务
试一试，在script 标签内补充代码，实现创建一个新li标签，内容为"php",并将新创建的li插入到内容为HTML的标签前。

```html

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>
<body>

<ul id="test"><li>JavaScript</li><li>HTML</li></ul> 

<script type="text/javascript">

  var otest = document.getElementById("test");  

  var newli=document.createElement("li");
  newli.innerHTML="PHP";

	//<!--这里添加的inserBefore()-->
  otest.insertBefore(newli,otest.childNodes[0]);

</script> 

</body>
</html>


```





### 删除节点removeChild()


removeChild() 方法从子节点列表中删除某个节点。如删除成功，此方法可返回被删除的节点，如失败，则返回 NULL。
语法:
nodeObject.removeChild(node)
参数:
node ：必需，指定需要删除的节点。
我们来看看下面代码，删除子点。



```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>

<body>
<div id="content">
  <h1>html</h1>
  <h1>php</h1>
  <h1>javascript</h1>
  <h1>jquery</h1>
  <h1>java</h1>
</div>

<script type="text/javascript">
function clearText() {
  var content=document.getElementById("content");
//   在此完成该函数

  for(var i=1;i<content.chlidNodes.length;i++){

​```
  var x=content.removeChild(content.chlidNodes[i]);
  x=null;
​```

  }

//   for(var i=1;i<content.childNodes.length;i++){  
//   var x=content.removeChild(content.childNodes[i]);
//   x=null;
//   }

}
</script>

<button onclick="clearText()">清除节点内容</button>



</body>
</html>
```











<hr />

### 替换元素节点replaceChild()


replaceChild 实现子节点(对象)的替换。返回被替换对象的引用。 
语法：
node.replaceChild (newnode,oldnew ) 
参数：
newnode : 必需，用于替换 oldnew 的对象。 
oldnew : 必需，被 newnode 替换的对象。



```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>
<body>

  <div><b id="oldnode">JavaScript</b>是一个很常用的技术，为网页添加动态效果。</div>
  <a href="javascript:replaceMessage()"> 将加粗改为斜体</a>

​```
<script type="text/javascript">
  function replaceMessage(){
      var oldnode=document.getElementById("oldnode");
      var newnode=document.createElement("i");
      newnode.innerHTML=oldnode.innerHTML;
      oldnode.parentNode.replaceChild(newnode,oldnode);
	   
   }    
​```

  </script>

 </body>
</html>
```













<hr />

### 创建元素节点createElement


createElement()方法可创建元素节点。此方法可返回一个 Element 对象。
语法：
​	document.createElement(tagName)
参数:
tagName：字符串值，这个字符串用来指明创建元素的类型。
注意：要与appendChild() 或 insertBefore()方法联合使用，将元素显示在页面中。
我们来创建一个按钮，代码如下：

```html
<script type="text/javascript">
   var body = document.body; 
   var input = document.createElement("input");  
   input.type = "button";  
   input.value = "创建一个按钮";  
   body.appendChild(input);  
 </script>  
```


效果：在HTML文档中，创建一个按钮。
我们也可以使用setAttribute来设置属性，代码如下：

```html
<script type="text/javascript">  
   var body= document.body;             
   var btn = document.createElement("input");  
   btn.setAttribute("type", "text");  
   btn.setAttribute("name", "q");  
   btn.setAttribute("value", "使用setAttribute");  
   btn.setAttribute("onclick", "javascript:alert('This is a text!');");       
   body.appendChild(btn);  
</script>  

```


效果：在HTML文档中，创建一个文本框，使用setAttribute设置属性值。 当点击这个文本框时，会弹出对话框“This is a text!”。





```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>
<body>
<script type="text/javascript">
var main = document.body;
//创建链接
function createa(url,text)
{
	var newa=document.createElement("a");
	newa.href=url;
	newa.value="慕课网";
	newa.style.color="red";
	newa.innerHTML=text;
	main.appendChild(newa);
    	return newa;
}

	// 调用函数创建链接
	createa("http://www.imooc.com","慕课网");
}
</script> 
</body>
</html>
```















### 创建文本节点createTextNode


createTextNode() 方法创建新的文本节点，返回新创建的 Text 节点。


语法：
​		document.createTextNode(data)
参数：
data : 字符串值，可规定此节点的文本。



```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<style type="text/css">
.message{    
    width:200px;
    height:100px;
    background-color:#CCC;
}
</style>
</head>

<body>
<script type="text/javascript">
    var element=document.createElement('p');
    element.className="message";
    var textNode=document.createTextNode("I love JavaScript!");
    element.appendChild(textNode);
    document.body.appendChild(element);
</script> 

</body>
</html>


```








<hr />
### 浏览器窗口可视区域大小


获得浏览器窗口的尺寸（浏览器的视口，不包括工具栏和滚动条）的方法:
一、对于IE9+、Chrome、Firefox、Opera 以及 Safari：
•  window.innerHeight - 浏览器窗口的内部高度
•  window.innerWidth - 浏览器窗口的内部宽度


二、对于 Internet Explorer 8、7、6、5：
•  document.documentElement.clientHeight表示HTML文档所在窗口的当前高度。
•  document.documentElement.clientWidth表示HTML文档所在窗口的当前宽度。
或者
Document对象的body属性对应HTML文档的<body>标签
•  document.body.clientHeight
•  document.body.clientWidth


在不同浏览器都实用的 JavaScript 方案：

```javascript
var w= document.documentElement.clientWidth|| document.body.clientWidth;
var h= document.documentElement.clientHeight|| document.body.clientHeight;
```

任务
在script标签内，补充右边编辑器代码，获取浏览器当前窗口大小。

```html

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<script type="text/javascript">
var w= document.documentElement.clientWidth||document.body.clientWidth;


var h= document.documentElement.clientHeight||document.body.clientHeight;

document.write(w+"<br />");
document.write(h);
</script>
</body>
</html>

```












<hr />
### 网页尺寸scrollHeight

scrollHeight和scrollWidth，获取网页内容高度和宽度。

一、针对IE、Opera:
scrollHeight 是网页内容实际高度，可以小于 clientHeight。

二、针对NS、FF:
scrollHeight 是网页内容高度，不过最小值是 clientHeight。也就是说网页内容实际高度小于 clientHeight 时，scrollHeight 返回 clientHeight 。

三、浏览器兼容性

```
var w=document.documentElement.scrollWidth || document.body.scrollWidth;

var h=document.documentElement.scrollHeight|| document.body.scrollHeight;
```

注意:**区分大小写**
scrollHeight和scrollWidth还可获取Dom元素中内容实际占用的高度和宽度。



```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 

</head>
<body>
<script type="text/javascript">

var w=document.documentElement.scrollWidth
   || document.body.scrollWidth;
var h=document.documentElement.scrollHeight
   || document.body.scrollHeight;



</script>
</body>    
</html>
```











### 网页尺寸offsetHeight

offsetHeight和offsetWidth，获取网页内容高度和宽度(包括滚动条等边线，会随窗口的显示大小改变)。


一、值
offsetHeight = clientHeight + 滚动条 + 边框。


二、浏览器兼容性


    var w= document.documentElement.offsetWidth || document.body.offsetWidth;
    var h= document.documentElement.offsetHeight|| document.body.offsetHeight;
    <!DOCTYPE HTML>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
    </head>
    <body>
     <script type="text/javascript">
    
    var w= document.documentElement.offsetWidth|| document.body.offsetWidth;
    
    var h= document.documentElement.offsetHeight|| document.body.offsetHeight;
    
    document.write(w);
    </script>
    </body>
    </html>
    

### 网页卷去的距离与偏移量


- scrollLeft:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离 ，即左边灰色的内容。
- scrollTop:设置或获取位于对象最顶端与窗口中可见内容的最顶端之间的距离 ，即上边灰色的内容。
- offsetLeft:获取指定对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 。
- offsetTop:获取指定对象相对于版面或由 offsetParent 属性指定的父坐标的计算顶端位置 。

注意:

1. 区分大小写
2. offsetParent：布局中设置postion属性(Relative、Absolute、fixed)的父容器，从最近的父节点开始，一层层向上找，直到HTML的body。