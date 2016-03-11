---
layout: post
title: "Web前端 JavaScript 深入浅出"
---
# JavaScript 深入浅出

> 慕课网 学习javascript的部分笔记:)

## 数据类型

### 原始类型

- number
- string
- boolean
- null
- undefined
- object
  - Function
  - Array
  - Date
  - ……














### 隐式转换

- a==b

  - "1.23"==1.23
  - 0==false
  - null==undefined
  - new Object()==new Object()
  - [1,2]==[1,2]

- a===b

  - 类型不同,返回false

  - 类型相同

    - NaN **不等于** NaN

    - new Object **不等于** new Object

    - null === null

    - undefined === undefined

      ​

      ​

### a==b 

**当类型相同** ,同===

**当类型不同**,尝试类型转化和比较:

- null==undefined
- number==string //**转number** 1=="1.0" true
- boolean==? //**转number** 1==true  //true
- object == number | string 尝试对象转为基本类型 new String("hi") =="hi" //true
- 其他:false




### 类型检测

- typeof
- instanceof
- Object.prototype.toString
- constructor
- duck type

```javascript
typeof 100 === "number"
typeof true === "boolean"
typeof function () {} === "function"


typeof(undefined) ) === "undefined"
typeof(new Object() ) === "object"
typeof( [1, 2] ) === "object"
typeof(NaN ) === "number"
typeof(null) === "object"
```

```javascript
typeof null === "object"
```







### obj instanceof Object

```javascript
 obj instanceof Object

 //例
 [1, 2] instanceof Array === true
new Object() instanceof Array === false

```



### Object.prototype.toString

Object.prototype.toString.apply(null).slice(7,12);

```javascript

Object.prototype.toString.apply([]); === "[object Array]";
Object.prototype.toString.apply(function(){}); === "[object Function]";
Object.prototype.toString.apply(null); === "[object Null]"
Object.prototype.toString.apply(undefined); === "[object Undefined]"

//  IE6/7/8 Object.prototype.toString.apply(null) 返回"[object Object]"
//  bugs
```







### 类型检测小结

```javascript
typeof
适合基本类型及function检测，遇到null失效。

[[Class]]
通过{}.toString拿到，适合内置对象和基元类型，遇到null和undefined失效(IE678等返回[object Object])。

instanceof
适合自定义对象，也可以用来检测原生对象，在不同iframe和window间检测时失效。

```









### 练习



```html
<!--任务
请在index.html文件中，编写arraysSimilar函数，实现判断传入的两个数组是否相似。具体需求：
1. 数组中的成员类型相同，顺序可以不同。例如[1, true] 与 [false, 2]是相似的。
2. 数组的长度一致。
3. 类型的判断范围，需要区分:String, Boolean, Number, undefined, null, 函数，日期, window.
当以上全部满足，则返回"判定结果:通过"，否则返回"判定结果:不通过"。

-->

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Untitled Document</title>

</head>
<body>
    <script type="text/javascript">   
        /*
         * param1 Array 
         * param2 Array
         * return true or false
         */
        function arraysSimilar(arr1, arr2){
            var t1=[];
            var t2=[];
            var flag=true;
            if (arr1 instanceof Array && arr2 instanceof Array && arr1.length == arr2.length ) {
                for (var i = arr1.length - 1; i >= 0; i--) {
                    if (Object.prototype.toString.apply(arr1) !==Object.prototype.toString.apply(arr2) ) {
                        flag=false;
                        break;
                    }
                }
            }
            if (flag) { 
                return true;
            }
            return false;

        }

        //方法2
        function arraysSimilar(arr1, arr2) {
            var t1 = [];
            var t2 = [];

            if (arr1 instanceof Array && arr2 instanceof Array && arr1.length === arr2.length) {
                for (var i in arr1) {
                    t1.push(getType(arr1[i]));
                    t2.push(getType(arr2[i]));
                }
                return t1.sort().toString() === t2.sort().toString();
            } else {
                return false;
            }
        }

        function getType(o) {
            var _opt = Object.prototype.toString.apply(o);
            /\[object (\w+)\]/.test(_opt);
            return RegExp.$1;
        }

    </script>
    <script src="testData.js"></script>
</body>
</html>



```












<hr />
## 表达式与运算符



- 原始表达式( 常量,直接量 / 关键字  / 变量)

- 数组,对象的初始化表达式

- 函数表达式

  ```javascript
  var fe = function(){};
  (function(){console.log('hello world');})();
  ```


- 属性访问表达式

  ```javascript
  var o={x:1};
  o.x;
  o['x'];
  ```



- 创建对象表达式
  ```
  new Func(1,2)

  new Object
  ```

### for...in

```
    var p;
    var obj = {x : 1, y: 2}

    for (p in obj) {
    }
```

**for in 的需要注意的地方**


```
- 顺序不确定

- enumerable为false时不会出现

- forin对象属性时受原型链影响
```















### With

```
with ({x : 1}) {
    console.log(x);
}


with (document.forms[0]) {
    console.log(name.value);
}

var form = document.forms[0];
console.log(form.name.value);



不推荐

- 让JS引擎优化更难
- 可读性差
- 可被变量定义代替
- 严格模式下被禁用

```



### 严格模式

Note:严格模式是一种特殊的执行模式，它修复了部分语言上的不足，它修复了部分语言上的不足，提供更强的错误检查，并增强安全性。

定义方式

```
function func() {
    'use strict';
}


或者
'use strict';
function func() {

}

```



严格模式下:

- 不允许用with

- 不允许未声明的变量被赋值

- arguments变为参数的静态副本

  ```javascript
  !function(a) {
  arguments[0] = 100;
  console.log(a);
  }(1);   

  // 1=>100
  // 不传 => undefined
  ​

  !function(a) {
  'use strict';
  arguments[0] = 100;
  console.log(a);
  }(1);

  // 1
  ​

  !function(a) {
  'use strict';
  arguments[0].x = 100;
  console.log(a.x);
  }({x:1});

  // 100
  ```



- delete参数、函数名报错
- delete不可配置的属性报错
- 对象字面量重复属性名报错
- 禁止八进制字面量
- eval, arguments变为关键字，不能作为变量、函数名
- eval独立作用域

**严格模式-小结**

```
- 不允许用with
- 所有变量必须声明, 赋值给为声明的变量报错，而不是隐式创建全局变量。
- eval中的代码不能创建eval所在作用域下的变量、函数。而是为eval单独创建一个作用域，并在eval返回时丢弃。
- 函数中得特殊对象arguments是静态副本，而不像非严格模式那样，修改arguments或修改参数变量会相互影响。
- 删除configurable=false的属性时报错，而不是忽略
- 禁止八进制字面量，如010 (八进制的8)
- eval, arguments变为关键字，不可作为变量名、函数名等
- 一般函数调用时(不是对象的方法调用，也不使用apply/call/bind等修改this)this指向null，而不是全局对象。
- 若使用apply/call，当传入null或undefined时，this将指向null或undefined，而不是全局对象。
- 试图修改不可写属性(writable=false)，在不可扩展的对象上添加属性时报TypeError，而不是忽略。
- arguments.caller, arguments.callee被禁用
```






<hr />
## 对象

对象中包含一系列属性，这些属性是无序的。

每个属性都有一个**字符串key**和对应的**value**。

```
var obj = {};
obj[1] = 1;
obj['1'] = 2;
obj; // Object {1: 2}

obj[{}] = true;
obj[{x : 1}] = true;
obj; // Object {1: 2, [object Object]: true}

```





### 创建对象

```
///创建对象 new/原型链

function foo(){}
foo.prototype.z = 3;

var obj =new foo();
obj.y = 2;
obj.x = 1;

obj.x; // 1
obj.y; // 2
obj.z; // 3
typeof obj.toString; // ‘function'
'z' in obj; // true
obj.hasOwnProperty('z'); // false

obj.z=5;

obj.hasOwnProperty('z'); // true
foo.prototype.z; // still 3
obj.z; // 5

obj.z = undefined;
obj.z; // undefined

delete obj.z; // true
obj.z; // 3


delete obj.z; // true
obj.z; // still 3!!!



//创建对象 Object.create

var obj = Object.create({x : 1});
obj.x // 1
typeof obj.toString // "function"
obj.hasOwnProperty('x');// false


var obj = Object.create(null);
obj.toString // undefined

```





### 对象的属性操作

- 读写对象属性


- 属性异常


- 删除属性


- 检测属性


- 枚举属性

```
var obj = {x : 1, y : 2};
obj.x; // 1
obj["y"]; // 2

obj["x"] = 3;
obj.y = 4;


var obj = {x1 : 1, x2 : 2};
var i = 1, n = 2;

for (; i <= n; i++) {
    console.log(obj['x' + i]);
}
// 输出: 1, 2

var p;
for (p in obj) {
    console.log(obj[p]);
}


```



属性读写-**异常**

```
var obj = {x : 1};
obj.y; // undefined
var yz = obj.y.z; // TypeError: Cannot read property 'z' of undefined
obj.y.z = 2; // TypeError: Cannot set property 'z' of undefined

//异常解除
var yz;
if (obj.y) {
    yz = obj.y.z;
}
//或者
var yz = obj && obj.y && obj.y.z;

```







属性删除

```
var person = {age : 28, title : 'fe'};
delete person.age; // true
delete person['title']; // true
person.age; // undefined
delete person.age; // true

delete Object.prototype; // false,

var descriptor = Object.getOwnPropertyDescriptor(Object, 'prototype');
descriptor.configurable; // false



//global属性

var globalVal = 1;
delete globalVal; // false

(function() {
    var localVal = 1;
    return delete localVal;
}()); // false



function fd() {}
delete fd; // false

(function() {
    function fd() {};
    return delete fd;
}()); // false



//全局属性的删除
ohNo = 1;
window.ohNo; // 1
delete ohNo; // true

```







属性检测

```
var cat = new Object;
cat.legs = 4;
cat.name = "Kitty";

'legs' in cat; // true
'abc' in cat; // false
"toString" in cat; // true, inherited property!!!


hasOwnProperty方法

cat.hasOwnProperty('legs'); // true
cat.hasOwnProperty('toString'); // false

cat.propertyIsEnumerable('legs'); // true
cat.propertyIsEnumerable('toString'); // false



defineProperty检测

Object.defineProperty(cat, 'price', {enumerable : false, value : 1000});
cat.propertyIsEnumerable('price'); // false
cat.hasOwnProperty('price'); // true


if (cat && cat.legs) {
    cat.legs *= 2;
}


if (cat.legs !== undefined) {
    // only if cat.legs is not undefined
}

//Notes:
if (cat.legs != undefined) {
    // !== undefined, or, !== null
}

```



属性枚举

obj.propertyIsEnumerable

```
var o = {x : 1, y : 2, z : 3};
'toString' in o; // true
o.propertyIsEnumerable('toString'); // false
var key;
for (key in o) {
    console.log(key); // x, y, z
}


var obj = Object.create(o);
obj.a = 4;
var key;
for (key in obj) {
    console.log(key); // a, x, y, z
}

var obj = Object.create(o);
obj.a = 4;
var key;
for (key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key); // a
    }
}

```



### 另一种读写属性的方式    **getter/setter**方法

Notes: 用getter,setter方法,更可以看到成员变量的 **私有属性**

```
var man = {
    name : 'Bosn',
    weibo : '@Bosn',
    get age() {
        return new Date().getFullYear() - 1988;
    },
    set age(val) {
        console.log('Age can\'t be set to ' + val);
    }
}
console.log(man.age); // 27
man.age = 100; // Age can't be set to 100
console.log(man.age); // still 27








var man = {
    weibo : '@Bosn',
    $age : null,
    get age() {
        if (this.$age == undefined) {
            return new Date().getFullYear() - 1988;
        } else {
            return this.$age;
        }
    },
    set age(val) {
        val = +val;
        if (!isNaN(val) && val > 0 && val < 150) {
            this.$age = +val;
        } else {
            throw new Error('Incorrect val = ' + val);
        }
    }
}

console.log(man.age); // 27
man.age = 100;
console.log(man.age); // 100;
man.age = 'abc'; // error:Incorrect val = NaN


```



get/set与原型链

```
function foo() {}

Object.defineProperty(foo.prototype, 'z', 
    {get : function(){return 1;}});

var obj = new foo();

obj.z; // 1
obj.z = 10;
obj.z; // still 1

Object.defineProperty(obj, 'z', 
{value : 100, configurable: true});
obj.z; // 100;
delete obj.z;
obj.z; // back to 1




var o = {};
Object.defineProperty(o, 'x', {value : 1}); // writable=false, configurable=false
var obj = Object.create(o);
obj.x; // 1
obj.x = 200;
obj.x; // still 1, can't change it

Object.defineProperty(obj, 'x', {writable:true, configurable:true, value : 100});
obj.x; // 100
obj.x = 500;
obj.x; // 500

```

















### 属性级的权限设置

```
Object.getOwnPropertyDescriptor({pro : true}, 'pro');
// Object {value: true, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({pro : true}, 'a'); // undefined


var person = {};
Object.defineProperty(person, 'name', {
    configurable : false,
    writable : false,
    enumerable : true,
    value : "Bosn Ma"
});


person.name; // Bosn Ma
person.name = 1;
person.name; // still Bosn Ma
delete person.name; // false


Object.defineProperty(person, 'type', {
    configurable : true,
    writable : true,
    enumerable : false,
    value : "Object"
});

Object.keys(person); // ["name"]


Object.defineProperties(person, {
    title : {value : 'fe', enumerable : true},
    corp : {value : 'BABA', enumerable : true},
    salary : {value : 50000, enumerable : true, writable : true}
});

Object.getOwnPropertyDescriptor(person, 'salary');
// Object {value: 50000, writable: true, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(person, 'corp');
// Object {value: "BABA", writable: false, enumerable: true, configurable: false}

```











```
Object.defineProperties(person, {
    title : {value : 'fe', enumerable : true},
    corp : {value : 'BABA', enumerable : true},
    salary : {value : 50000, enumerable : true, writable : true},
    luck : {
        get : function() {
        return Math.random() > 0.5 ? 'good' : 'bad';
        }
    },
    promote : {
        set : function (level) {
            this.salary *= 1 + level * 0.1;
        }
    }
});

Object.getOwnPropertyDescriptor(person, 'salary');
// Object {value: 50000, writable: true, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(person, 'corp');
// Object {value: "BABA", writable: false, enumerable: true, configurable: false}
person.salary; // 50000
person.promote = 2;
person.salary; // 60000

```



### 对象标签

- [[proto]]


- [[class]]


- [[extensible]]

标签原型:**__proto__**















### class 标签
```javascript
var toString = Object.prototype.toString;

function getType(o){
	return toString.call(o).slice(8,-1);
    };

toString.call(null); // "[object Null]"
getType(null); // "Null"
getType(undefined); // "Undefined"
getType(1); // "Number"
getType(new Number(1)); // "Number"
typeof new Number(1); // "object"
getType(true); // "Boolean"
getType(new Boolean(true)); // "Boolean"
```





### extensible 标签

```javascript
var obj = {x : 1, y : 2};
Object.isExtensible(obj); // true
Object.preventExtensions(obj);
Object.isExtensible(obj); // false
obj.z = 1;
obj.z; // undefined, add new property failed
Object.getOwnPropertyDescriptor(obj, 'x');
// Object {value: 1, writable: true, enumerable: true, configurable: true}

Object.seal(obj);
Object.getOwnPropertyDescriptor(obj, 'x');
// Object {value: 1, writable: true, enumerable: true, configurable: false}
Object.isSealed(obj); // true


//冻结
Object.freeze(obj);
Object.getOwnPropertyDescriptor(obj, 'x');
// Object {value: 1, writable: false, enumerable: true, configurable: false}
Object.isFrozen(obj); // true

// [caution] not affects prototype chain!!!

```





### 对象序列化

```javascript
var obj = {x : 1, y : true, z : [1, 2, 3], nullVal : null};
JSON.stringify(obj); // "{"x":1,"y":true,"z":[1,2,3],"nullVal":null}"

obj = {val : undefined, a : NaN, b : Infinity, c : new Date()};
JSON.stringify(obj); // "{"a":null,"b":null,"c":"2015-01-20T14:15:43.910Z"}"

obj = JSON.parse('{"x" : 1}');
obj.x; // 1
	
```



序列化-自定义

```javascript
var obj = {
    x : 1,
    y : 2,
    o : {
        o1 : 1,
        o2 : 2,
        toJSON : function () {
            return this.o1 + this.o2;
        }
    }
};
JSON.stringify(obj); // "{"x":1,"y":2,"o":3}"

```





### 小结

> •对象的结构
>
> •创建对象
>
> •属性操作
>
> •getter setter
>
> •属性标签
>
> •对象标签
>
> •序列化
>
> •对象方法
>
> 





<hr />

## 数组

数组是值的有序集合。每个值叫做元素，每个元素在数组中都有数字位置编号，也就是索引。JS中的数组是弱类型的，数组中可以含有不同类型的元素。数组元素甚至可以是对象或其它数组。



```javascript
var arr = [1, true, null, undefined, {x : 1}, [1, 2, 3]];
```



### 创建数组

创建数组-字面量

```javascript
var BAT = ['Alibaba', 'Tencent', 'Baidu'];
var students = [{name : 'Bosn', age : 27}, {name : 'Nunnly', age : 3}];
var arr = ['Nunnly', 'is', 'big', 'keng', 'B', 123, true, null];
var arrInArr = [[1, 2], [3, 4, 5]];


var commasArr1 = [1, , 2]; // 1, undefined, 2
var commasArr2 = [,,]; // undefined * 2

```





创建数组-new Array

```
var arr = new Array(); 
var arrWithLength = new Array(100); // undefined * 100
var arrLikesLiteral = new Array(true, false, null, 1, 2, "hi");
// 等价于[true, false, null, 1, 2, "hi"];

```



数组元素读写

```javascript
var arr = [1, 2, 3, 4, 5];
arr[1]; // 2
arr.length; // 5


arr[5] = 6;
arr.length; // 6


delete arr[0];
arr[0]; // undefined

```





数组的增删

**动态的,无需指定大小**

```
var arr = [];
arr[0] = 1;
arr[1] = 2;
arr.push(3);
arr; // [1, 2, 3]

arr[arr.length] = 4; // equal to arr.push(4);
arr; // [1, 2, 3, 4]

arr.unshift(0);
arr; // [0, 1, 2, 3, 4];


delete arr[2];
arr; // [0, 1, undefined, 3, 4]
arr.length; // 5
2 in arr; // false

arr.length -= 1;
arr; // [0, 1, undefined, 3, 4],  4 is removed

arr.pop(); // 3 returned by pop
arr; // [0, 1, undefined], 3 is removed

arr.shift(); // 0 returned by shift
arr; // [1, undefined]


```



数组迭代

```javascript
var i = 0, n = 10;
var arr = [1, 2, 3, 4, 5];
for (; i < n; i++) {
    console.log(arr[i]); // 1, 2, 3, 4, 5
}

for(i in arr) {
    console.log(arr[i]); // 1, 2, 3, 4, 5
}



Array.prototype.x = 'inherited';

for(i in arr) {
    console.log(arr[i]); // 1, 2, 3, 4, 5, inherited
}

for(i in arr) {
    if (arr.hasOwnProperty(i)) {
        console.log(arr[i]); // 1, 2, 3, 4, 5
    }
}

```









### 二维数组

```
var arr = [[0, 1], [2, 3], [4, 5]];
var i = 0, j = 0;
var row;
for (; i < arr.length; i++) {
     row = arr[i];
     console.log('row ' + i);
     for (j = 0; j < row.length; j++) {
          console.log(row[j]);
     }
}

```







### 稀疏数组

稀疏数组并不含有从0开始的连续索引。一般length属性值比实际元素个数大。





```
var arr1 = [undefined];
var arr2 = new Array(1);
0 in arr1; // true
0 in arr2; // false
arr1.length = 100;
arr1[99] = 123;
99 in arr1; // true
98 in arr1; // false



var arr = [,,];
0 in arr; // false

```









### 数组方法

```
{}   =>  Object.prototype
[]   =>  Array.prototype
```



Array.prototype.join()   

**将数组转化成字符串**

```
var arr = [1, 2, 3];
arr.join(); // "1,2,3"
arr.join("_"); // "1_2_3"

function repeatString(str, n) {
     return new Array(n + 1).join(str);
}
repeatString("a", 3); // "aaa"
repeatString("Hi", 5); // "HiHiHiHiHi"

```









### Array.prototype.reverse



### Array.prototype.sort

**Notes:原数组被修改**

```
var arr = ["a", "d", "c", "b"];
arr.sort(); // ["a", "b", "c", "d"]

arr = [13, 24, 51, 3];
arr.sort(); // [13, 24, 3, 51]
arr; // [13, 24, 3, 51]

arr.sort(function(a, b) {
     return a - b;
}); // [3, 13, 24, 51]


arr = [{age : 25}, {age : 39}, {age : 99}];
arr.sort(function(a, b) {
     return a.age - b.age;
});
arr.forEach(function(item) {
     console.log('age', item.age);
});
// result:
// age 25
// age 39
// age 99


```





### Array.prototype.concat

**Notes:原数组不被修改**

```
var arr = [1, 2, 3];
arr.concat(4, 5); // [1, 2, 3, 4, 5]
arr; // [1, 2, 3]

arr.concat([10, 11], 13); // [1, 2, 3, 10, 11, 13]

arr.concat([1, [2, 3]]); // [1, 2, 3, 1, [2, 3]]
```



### Array.prototype.slice

**Notes:原数组未被修改**

```
var arr = [1, 2, 3, 4, 5];
arr.slice(1, 3); // [2, 3]
arr.slice(1); // [2, 3, 4, 5]
arr.slice(1, -1); // [2, 3, 4]
arr.slice(-4, -3); // [2]

```

**Notes:原数组被修改**

```
var arr = [1, 2, 3, 4, 5];
arr.splice(2); // returns [3, 4, 5]
arr; // [1, 2];

arr = [1, 2, 3, 4, 5];
arr.splice(2, 2); // returns [3, 4]
arr; // [1, 2, 5];

arr = [1, 2, 3, 4, 5];
arr.splice(1, 1, 'a', 'b'); // returns [2]
arr; // [1, "a", "b", 3, 4, 5]

```





### Array.prototype.forEach

```
var arr = [1, 2, 3, 4, 5];
arr.forEach(function(x, index, a){
    console.log(x + '|' + index + '|' + (a === arr));
});
// 1|0|true
// 2|1|true
// 3|2|true
// 4|3|true
// 5|4|true

```



Array.prototype.map

```
var arr = [1, 2, 3];
arr.map(function(x) {
     return x + 10;
}); // [11, 12, 13]
arr; // [1, 2, 3]

```



Array.prototype.filter)

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.filter(function(x, index) {
     return index % 3 === 0 || x >= 8;
}); // returns [1, 4, 7, 8, 9, 10]
arr; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

```



Array.prototype.indexOf&lastIndexOf

```
var arr = [1, 2, 3, 2, 1];
arr.indexOf(2); // 1
arr.indexOf(99); // -1
arr.indexOf(1, 1); // 4
arr.indexOf(1, -3); // 4
arr.indexOf(2, -1); // -1
arr.lastIndexOf(2); // 3
arr.lastIndexOf(2, -2); // 3
arr.lastIndexOf(2, -3); // 1

```



Array.isArray

```
Array.isArray([]); // true



[] instanceof Array; // true
({}).toString.apply([]) === '[object Array]'; // true
[].constructor === Array; // true

```





字符串和数组

```
var str = "hello world";
str.charAt(0); // "h"
str[1]; // e

Array.prototype.join.call(str, "_");
// "h_e_l_l_o_ _w_o_r_l_d"


var str = "hello world";
str.charAt(0); // "h"
str[1]; // e

Array.prototype.join.call(str, "_");
// "h_e_l_l_o_ _w_o_r_l_d"

```






























<hr />
## 函数

函数是一块JavaScript代码，被定义一次，但可执行和调用多次。  JS中的函数也是对象，所以JS函数可以像其它对象那样操作和传递  所以我们也常叫JS中的函数为函数对象。



### 重点:

- **this**
- **arguments**
- **作用域**
- **不同 的调用方法**
- **不同 的创建方法**



### 不同的调用方法:

- **直接调用** foo();
- **对象方法** obj.method();
- **构造器** new Foo();
- **call/apply/bind**   func.call(obj);















### 函数声明 Vs. 函数表达式



函数声明

```
function add (a, b) { 
	a = +a; 
	b = +b; 
	if (isNaN(a) || isNaN(b)) { 	return;
    }
    return a + b;  
}
```

函数表达式

```
// function variable   最常用
    var add = function (a, b) {     
    // do sth  
    };  


// IEF(Immediately Executed Function)   经常用
    (function() {      
    // do sth  
    })(); 

// first-class function   很少用
    return function() {     
    // do sth  
    }; 

// NFE (Named Function Expression)   很少用,递归的时候会用到
    var add = function foo (a, b) {     
        // do sth  
    };
```



变量与函数的声明前置

```
var num=add(1,2)  //3
console.log(num);

function add(a,b){
  a=+a;
  b=+b;
  if(isNaN(a) || isNaN(b)){
  	return;
  }
  return a+b;
}
```

**Notes:**函数表达式方式这么做是错的.





命名函数表达


```
  var func = function nfe() {};  
  alert(func === nfe);  
  // 递归调用  

  var func = function nfe() {
  /** do sth.**/ 
  nfe();
  }
```



### Function构造器
```
var func = new Function('a', 'b', 'console.log(a + b);');  
func(1, 2);  // 3 
var func = Function('a', 'b', 'console.log(a + b);');  
func(1, 2);  // 3

//CASE1 localVal 仍为局部变量
Function('var localVal="local";console.log(localVal);')();
console.log(typeof localVal);
//result: local,undefined

//CASE2 local 不可访问,全局变量global可以访问 .原因,想想闭包
var globalVal='global';
(function(){
  var localVal='local';
  Function('console.log(typeof localVal,typeof globalVal);')();
})();
```





<hr />
## this  

- 全局的this (浏览器) ,指向window/浏览器.

  ```
    console.log(this.document  ===  document);  //  true  
    console.log(this  ===  window);  //  true  
    this.a  =  37;   console.log(window.a);  //  37
  ```

- 一般函数的this(浏览器),指向浏览器/window.

  ```javascript
      function  f1(){      
          return  this;   
          }  
      f1()  ===  window;  //  true,  global  object

      function  f2(){
            "use  strict";  //  see  strict  mode
             return  this;
           }  
      f2()  ===  undefined;  //  true
  ```

- 作为对象方法的函数的this,指向所创建的对象

  ```javascript
  var  o  =  {
        prop:  37,
        f:  function()  {
             return  this.prop;
          }
    }; 
   console.log(o.f());  //  logs  37

    var  o  =  {prop:  37};  
    function  independent()  {
          return  this.prop;   
     }  
    o.f  =  independent;  
    console.log(o.f());  //  logs  37
  ```

  ​

- 对象原型链上的this

​	指向最具体层的对象,虽然在这里是this是p的原型链p上的this,创建过程中指向了p

  ```
  var o = {
     f:function(){ 
        return this.a + this.b; 
      }
    };  
    var p = Object.create(o);  
    p.a = 1;  
    p.b = 4; 

    console.log(p.f()); // 5
    
  ```

- get/set方法与this 指向get/set的对应的对象

```javascript
  function modulus(){
     return Math.sqrt(this.re * this.re + this.im * this.im);
       } 

  var o = {
     re: 1,
     im: -1,
     get phase(){
          return Math.atan2(this.im, this.re);
      }  
  }; 

  Object.defineProperty(o, 'modulus', {
       get: modulus, enumerable:true, configurable:true}); 

  console.log(o.phase, o.modulus); // logs -0.78 1.4142
```

- 构造器中的this

  ```javascript
    function  MyClass(){
          this.a  =  37;
        }  

    var  o  =  new  MyClass(); //new 若没有返回值或返回值为基本类型,则将this作为返回值,返回给新创建的对象
    console.log(o.a);  //  37,来资源原型链中查找到,而不是自身的

    function  C2(){
          this.a  =  37;
          return  {a  :  38}; 
    }  

     /*当我们使用new(作为构造器)来创建对象的时候,
        这时this会指向一个空的对象,这个空对象的原型会指向是Myclass.porotary
        this会指向MyClass.porototype的空对象 
        但是当有返回值时,如果返回的是个对象的话,那么会把对象作为返回值,所以这里o.a =38,这里的o的this指向返回的对象{a:38},所以o.a=38
    */
    o  =  new  C2();
    console.log(o.a);  //  38  
  ```



- call/apply方法与this 

  ```javascript
  function  add(c,  d){
        return  this.a  +  this.b  +  c  +  d;
      }  

  var  o  =  {a:1,  b:3};  
  add.call(o,  5,  7);  //  1  +  3  +  5  +  7  =  16  

  add.apply(o,  [10,  20]);  //  1  +  3  +  10  +  20  =  34  
  function  bar()  {
        console.log(Object.prototype.toString.call(this));
      }  

  bar.call(7);  //  "[object  Number]

  //Notes:call(this,arg[0],arg[1],...);我们用这个函数去调用没法直接调用的方法
  ```


- bind方法与this

  **作用同call/apply,更简单高效ES5支持**

```javascript

  function  f(){
        return  this.a;   
   }

  var  g  =  f.bind({a  :  "test"});
  console.log(g());  //  test  

  var  o  =  {a  :  37,  f  :  f,  g  :  g};
  console.log(o.f(),  o.g());  //  37,  test
```




<hr />
## 参数属性与arguments

```javascript
function foo(x,y) {
	console.log(x,y,this);
}

foo.call(100,1,2);//1,2,Number(100)
foo.apply(true,[3,4]);//3,4,Boolean(true)
foo.apply(null);//undefined,undefined,window (注意第三个量)
foo.apply(undefined);//undefined,undefined,window  (注意第三个量)
```



apply/call 方法(浏览器)



```javascript
function foo(x,y){
  'use sttic';
  console.log(x,y,this);
}

foo.apply(null); // undefined, undefined, null 
foo.apply(undefined); // undefined, undefined, undefined
```



bind方法

```javascript
	
    this.x=9;
    var module={
        x:81,
        getX:function(){return this.x; }
    };

    module.getX();//81

    var getX = module.getX;
    getX();//9

    var boundGetX=getX.bind(module);
    boundGetX();//81
```





bing与currying

```javascript
function add(a,b,c){
  return a+b+c;
}

var func=add.bind(undefined,100);
func(3);//103

var func2=func.bind(undefined,200);
func2(10);//310
```



```
function getConfig(colors,size,otherOptions){

	console.log(colors,size,otherOptions);

}

var defaultConfig=getConfig.bind(null,"#CC0000","1024*768");

defaultConfig("123");
degaultConfig("456");
```

bind 与 new

```
 function foo(){
  this.b=100;
  return this.a;
 }

 var func = foo.bind({a:1});

 func();      //1
 new func();  //{b:100}
```



<hr />
## 闭包

    !function(){
      var localData="localData here";
      document.addEventListener('click',
      function(){
      	console.log(localData);
    	});
    }();




    !function(){
      var localData="localData here";
      var url="http://www.baidu.com/";
      $.ajax({
    	url:url,
    	sucess:function(){
      		//do sth...
      		console.log(localData);
      	}
     });
    }();




### 闭包常见错误之循环闭包


    document.body.innerHTML="<div id=div1>aa</div>"+"<div id=div2>bbb</div><div id=div3>ccc</div>";
    for(var i=0;i<4;i++){
      document.getElementById('div'+i).addEventListener('click',function(){
      		alert(i);//all are 4
    	});
    }


改正如下:

```
document.body.innerHTML="<div id=div1>aa</div>"
    +"<div id=div2>bbb</div><div id=div3>ccc</div>";
for(var i=1;i<4;i++){
  !function(i){
    document.getElementById('div'+i).addEventListener('click',function(){
      alert(i);//1,2,3
    });
  }(i);
}
```




### 闭包-封装
```
!function(){
  var _userId=2345;
  var _typeId='item';
  var export={};

  function converter(userId){
    return +userId;
  }

  export.getUserId=function(){
    return converter(_userId);
  }

  export.getTypeId=function(){
    return _typeId;
  }

  window.export=export;

}());


export.getUserId();//2345
export.getTypeId();//item

export._userId; //undefined
export._typeId; //undefined
export.converter;//undefined
```



### 闭包的概念

在计算机科学中，闭包（也称词法闭包或函数闭包）是指一个函数或函数的引用，与一个引用环境绑定在一起。这 个引用环境是一个存储该函数每个非局部变量（也叫自由变量）的表。 
闭包，不同于一般的函数，它允许一个函数在立即词法作用域外调用时，仍可访问非本地变量。  


from  维基百科





### 闭包-小结

**优点**

- 灵活和方便
- 封装

**缺点**

- 空间浪费
- 内存泄漏
- 性能消耗




<hr />
## 作用域

作用域(全局、函数、eval)

```javascript
var a = 10;                   //全局
(function() {
     var b = 20;              //函数
  })();  
  console.log(a);             // 10   
  console.log(b);             // error, b in not defined 

  for (var item in {a : 1, b : 2}) {
       console.log(item);  
  }  
  console.log(item);         // item still in scope

  eval("var a = 1;");
```



### 作用域链

```
function outer2(){
  var local2=1;
  function outer1(){
  var local1=1;
  //visit local1,local2,or global3
  console.log(local1,local2,global3);
  }
  outer1();
}

var global3=1;
outer2();

function outer(){
  var i=1;
  var func=new Function("console.log(typeof i);");
  func();//undefined
}
outer();
```



### 利用函数作用域封装

```
(function(){
  //to do sth here
  var a,b;
})();

!function(){
  var a,b;
}();
```





































































































## 继承


```javascript
// 继承
function Person() {
    //todo
}

function Student( ) {
    //todo

}

Student.prototype=Person.prototype;//1
Student.prototype=new Person();//2
Student.prototype=Object.create(Person.prototype);//
// Notes:这三种方法中，第一种错误的，破坏了原型链上其他的原型，
//第二种，不好，Student 是个类，往上面加函数加对象都很奇怪
//ji 的写，不向上查找的属性。 问题是ES5 之后才有的
//ES4 的兼容模式：
if (!Object.create) {
    Object.create=function(proto) {
     	function F(){}
     	F.prototype=proto;
     	return new F;   
    }

}


```