---
layout: post
title:  "JavaScript 笔记"
---

###**JavaScript 笔记**



**getElementById()和getElementByTagName()**


1. getElementById():这个方法返回一个与那个有着给定Id属性值的元素节点相对应的对象。

2. getElementByTagName()方法：返回一个对象数组，每个对象分别对应着文档里有着给定标签的一个元素。

以上两个方法用document调用，例如document.getElementById('');



**Note**

getAttribute（）方法，不能通过document对象调用，他只能通过一个元素节点调用，more 具体些，同理，setAttribute（）方法

childNodes属性可以让我们从给定文档的节点树里把任何一个志愿书的所有子元素检索出来。childNode属性返回一个数组，这个数组包含给定元素节点的全体子元素。
		element.childNodes



nodeType属性共有12种可能的值，但是其中仅有3种具有实用价值：元素节点，属性节点和文本节点的nodeType属性值是1，2，3

	元素节点的nodeType属性是1
	属性节点的nodeType属性是2
	文本节点的nodeType属性是3

**nodeValue属性**

如果想改变某个文本节点的值，就用DOM提供nodeValue属性，它的用途正式检索（和设置）节点的值：
node.nodeValue->>> null，
应该node.childNodes[0].nodeValue
firstChild lastChild属性。



**预留退路**

	```
	<a href="http://www.example.com/"
	 onclick="popUp(this.href);return false;">Example</a>
	```






**分离javaScript**

	1. 把文档里的所有链接全部放入到一个数组里
	2. 遍历数组
	3. 如果某个链接的class属性等于popUp，就说明这个链接在点击时间调用popUp（）函数
		3.1 于是，把某个链接的href属性值传递给popUp（）函数
		3.2	取消这个链接的默认行为，不然这个链接把访问者带离当前窗口


上述过程代码化：

	var links=document.getElementsByTagName('a');
	    for (var i = links.length - 1; i >= 0; i--) {
	    	if (links[i].className="popup"){
	    		links[i].onclick=function   () {
	    			popUp(this.getAttribute("href"));
	    			retrun false;
	    		}
	    	}
	    };




单独的语句在JavaScript文件被加载时立刻执行。因为此JavaScript文件是从HTML文档的head部分用
script标签调用的，所以它将在HTML文档之前加载到浏览器里，而此时HTML文档还没有全部加载到浏览器里，文档模型不完整。没有完整的DOM，getElementByTagName（）等方法也就不能正常工作。
必须让这些代码在HTML文档全部加载到浏览器之后才开始执行。HTML文档被加载到一个浏览器窗口里，document对象又是window对象的一个属性。当window对象触发onload事件时，document对象已经存在。

我们Javascript代码打包到prepareLinks（）函数里，并把这个函数添加到对象window对象的onload事件上去。

	代码化：

	window.onload=prepareLinks;
	function prepareLinks(){
			var links=document.getElementsByTagName('a');
		    for (var i = links.length - 1; i >= 0; i--) {
		    	if (links[i].className="popup"){
		    		links[i].onclick=function   () {
		    			popUp(this.getAttribute("href"));
		    			retrun false;
		    		}
		    	}
		    };

	}


假设我有两个函数，firstFunction（），secondFunction（）。如果我想让它们两个都在页面加载时得到执行，那么我该怎么办，首先每个事件处理函数都只能邦定到一条指令上。
	有个小技巧可以绕开这个问题：匿名函数

	window.onload=function () {
		firstFunction();
		secondFunction();
	}

还有另一个更通用的方法：

	addLoadEvent（）

这个函数完成的操作：

１. 把现有的window.onload事件的值存入oldonload。
2. 如果在这个处理函数上还没有绑定任何函数，就像平时那样把心函数添加给它
3. 如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾。

		code：
			function addLoadEvent(func){
				var oldonload=window.onload;
				if (typeof window.onload != 'function') {
					window.onload=func;
				}else{
					window.onload=function(){
						oldonload();
						func();
					}
				}
			}

这就相当于把那些将在页面加载完毕时执行的函数创建为一个队列。如果想把刚才两个函数加入到这个队列：

```
addLoadEvent(firstFunction);

addLoaddEvent(secondFunction);
```




onkeypress  事件处理函数是专门用来处理键盘事件的。按下键盘上任何一个按键都会触发onclick事件。**But most of time we don't use the attributetion**

动态创建HTML
用来创建HTML内容的老技巧：

	1. document.writln()
	2. document.innerHTML()


DOM 方法：
	createElement（），//创建元素节点

	createTextNode（），//创建文本节点

	appendChild（），//


	insertBefore();




按以下的顺序创建和插入新文本节点的：

1. 创建一个p元素节点；
2. 把这个元素节点追加到test.html文档中的以恶搞元素节点上；
3. 创建一个文本节点；
4. 把这个文本节点追加到刚才创建的p元素节点上；

例子：

	```
	function perparePlaceholder() {
		//check
		if (!document.createElement)
			return false;
		if (!document.createTextNode)
			return false;
		if (!document.getElementById)
			return false;
		if (!document.getElementById("imageGallery"))
			return false;


		var description=document.createElement("p");
		description.setAttribute("id","description");


		var desctext=document.createTextNode("南笙姑娘 写真");

		var placeholder=document.createElement("img");
		placeholder.setAttribute("id","placeholder");
		placeholder.setAttribute("src","img/h.jpg");
		placeholder.setAttribute("alt","my images gallery");
		placeholder.setAttribute("width","40%");
		placeholder.setAttribute("heigth","40%");



		description.appendChild(desctext);

		var hrID=document.getElementById('hrID');
		insertAfter(description,hrID);
		insertAfter(placeholder,description);
	}

	```



从理论上讲，完全可以用JavaScript把内容插入一份文档，但是“可以做一件事”不代表“应该做这件事”，在实际工作中，这种做法非常不好，因为那会让你的Javascript根本没有空间去预留退路。哪些缺乏必要的JavaScript支持的访问者将永远可看不到你心目中的重要内容。


**循序渐进 progressive enhancement 原则**

说的是这样一种思考方法：从最核心的内容开始，逐步添加额外的功能。应该先用标记语言给核心内容加上正确的标记以使其正确的结构，然后再逐步从事被加上了正确的标记的内容。从事的内容既可以通过CSS实现各种效果，也可以通过DOM脚本添加各种操作行为。
DOM对页面添加的内容：规整，排列，重新整理过的整齐的有统计规律，易于浏览，便于使用的内容，内容的来源是本来页面的不规整不可见，不整齐的内容。对原有内容 的归纳总结。



CSS声明样式信息的具体做法主要有3种。
第一种为同类型的所有元素统一地声明一种样式。

		p{
			Font-size：1em;

第二种为有着特定class属性的所有元素统一地声明一种样式

		.fineprint{
	        Font-size:0.8em

第三种是为某个有着独一无二的id属性的元素单独声明一种样式

	#intro{
	        Font-size:1.2em；


**注意抽象化（abstract）**





请注意，一上来就用通配符把每个元素的匀空和间距设置为零。这么做的好处是，可以让页面不受浏览器的页边距/字间距设置的影响——不同的浏览器往往有着不同的默认设置，而那会影响到页面的显示效果。把这些值设展位零等于是为自己开辟出了一个干净的战场。
