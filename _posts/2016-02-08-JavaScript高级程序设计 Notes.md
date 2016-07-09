---
layout: post
title: "JavaScript高级程序设计 Notes (对象创建和继承)"
---


### JavaScript高级程序设计 Notes

ECMAScript中的构造函数可用来创建特定类型的对象。像Object和Array这样的原生的构造函数,在运行时会自动出现在执行环境中.此外,也可以定义自定义对象类型的属性和方法.

<br /><br /><br /><br />

### 创建一个新对象的方法

### 1.工厂模式


	​```
	function createPerson(name,age,job) {
		var obj=new Object();
		obj.name=name;
		obj.age=age;
		obj.job=job;
		obj.sayName=function(){
			alert(this.name);
		}
		retrun obj;
	
	}
	
	var person1=createPerson("wanglin",24,"front-end");
	var person2=createPerson('wanglinzhizhi.me',23,"front-end engreerer");
	​```

这种方法不好的地方在于,没有解决对象识别的问题(怎样知道一个对象的类型).

<br /><br /><br /><br />

### 2.构造函数模式


	​```
	function Person(name,age,job){
		this.name=name;
		this.age=age;
		this.job=job;
		this.sayName=function(){
			alert(this.name);
		};
	
	}
	
	var person1=new Person("wanglin",24,"front-end");
	var person2= Person('wanglinzhizhi.me',23,"front-end engreerer");
	​```

要创建一个新实例,必须使用new 操作符.以这种方式调用构造函数实际上会经历以下4个步骤:

- 创建一个新对象;
- 将构造函数的作用域附给新对象(因此this就指向了这个对象)
- 执行构造函数中的代码(为该对象添加属性);
- 返回新对象



构造函数也是函数

构造函数与其他函数唯一的区别,就在于调用它们的方式不同.不过,毕竟构造函数也是函数,不存在定义构造函数特殊的语法.任何函数,只要通过new操作符来调用,那它就可以作为构造含糊;而任何函数,如果不通过new操作符来调用,那它跟普通的函数也不会有什么两样.

而且,一以这种方式定义的构造函数是是定义在Global对象(在浏览器中是window对象)中的.



构造函数的问题

使用构造函数最主要的问题,及时每个方法都要在每个实例上重新创建一遍.在前面的例子中,person2和person1都有一个名为sayName()的方法,但那两个方法不是同一个Function的实例.不要忘了ECMAScript中的函数就是对象,因此没定义一个函数,也就实例化了一个对象.从逻辑上讲,此时的构造函数也可以这样定义.


	​```
	function Person(name , age, job){
		this.name=name;
		this.age=age;
		this.job=job;
		this.sayName=new Function("alert(this.name)");		//与声明函数在逻辑上是等价的.
	}
	​```

从这个角度更容易明白每个Person实例都包含一个不同的Function实例(以name属性)的本质.说明白些,以这种方式创建函数, 会导致不同的作用域链和标识符解析,但创建Function新实例的机制仍然是相同的.
因此,不同实例上的同名函数是不相等的.

	​```
	person2.sayName === person1.sayName //false
	​```


然而,创建两个完成相同任务的Function实例的确是没有必要.况且又this对象在,根本不用再执行代码前就把函数绑定到特定对象上面. 因此可以把函数定义转移到构造函数外部来解决这个问题



	​```
	function Person(name, age, job){
		this.name= name;
		this.age= age;
		this.job= job;
		this.sayName= sayName;
	}
	
	function sayName(){
		alert(this.name);
	}
	
	var person1=new Person("wanglin",24,"front-end");
	var person2=new Person("wanglinzhizhi",23,"front-end");
	​```



但是又有新的问题,全局作用域中定义的函数实际上只能被某个对象滴哦啊用.而且,如果对象需要定义很多方法,那么就要定义很多个全局函数,于是我们这个定义的引用类型就丝毫没有封装性可言了.

<br /><br /><br /><br />

### 3. 原型模式

多个对象实例共享原型所保存的属性和方法的基本原理.原型链


	​```
	function Person() {
			
	}
	
	//初始化
	Person.prototype.name = "wanglin";
	Person.prototype.age="24";
	Person.prototype.job="Software Engineer";
	Person.prototype.sayName=function(){
		alert(this.name);
	}


	var person2=new Person();
	person2.sayName();
	
	var person1= new Person();
	person1.sayName();
	
	person1.sayName===person2.sayName;  //true
	
	​```




在为对象添加一个属性时,这个属性就会屏蔽原型中保存的同名属性;换句话说, 添加这个属性只会阻止我们访问原型中的那个属性,但不会修改那个属性.即使将这个属性设置为null,也只会在实例中设置这个属性,而不会恢复其指向原型的链接.


但是, 使用delete 操作符则可以完全删除实例属性,从而让我们能够重新访问原型中的属性.


	​```
	function Person() {
	}
	
	//初始化
	Person.prototype.name = "wanglin";
	Person.prototype.age="24";
	Person.prototype.job="Software Engineer";
	Person.prototype.sayName=function(){
		alert(this.name);
	}
	
	var person1=new Person();
	var person2=new	Person();
	
	person1.name="wanglinzhizhi";
	alert(person1.name);	//wanglinzhizhi
	alert(person2.name);	//wanglin
	
	delete person1.name;
	alert(person1.name);	//wanglin
	​```



更简单的原型写法


	​```
	function Person( ) {
	}
	
	Person.prototype={
		name:"wanglin",
		age:25,
		job:"front-end",
		sayName:function(){
			alert(this.name);
		}
	}
	
	var person1=new Person();
	​```

Notes:这么做是有坑的。此时的contructor属性不在指向Person了.每创建一个函数就会同时创建它的prototype对象,因此constuctor属性也就变成了新对象的constructor属性(指向Object构造函数), 不再指向Person函数.



如果constructor的值真的很重要,可以继续修改,使其设置回适当的值


	​```
	function Person(){
	
	}
	
	Person.prototype={
		
		constructor: Person,
	
		name:"wanglin",
		age:25,
		job:"front-end",
		sayName:function(){
			alert(this.name);
		}
	}
	
	var person1=new Person();
	​```

我们回过头想想,构造函数的值到底重要吗?

而这样修改之后,会导致它的[[Enumrable]]特性被设置为true.



<br /><br /><br /><br />


### 原型对象的问题.

对于包含引用类型值的属性来说,问题很突出:


	​```
	function Person(){
	
	}
	
	Person.prototype={
		
		constructor: Person,
	
		name:"wanglin",
		age:25,
		job:"front-end",
		friends:["Shelby","Court"],
		sayName:function(){
			alert(this.name);
		}
	}


	var person1=new Person();
	var person2=new	Person();
	
	person1.friends.push("wanglinzhizhi");
	alert(person1.friends);	//"Shelby,Court wanglinzhizhi"
	alert(person2.friends);	//"Shelby,Court wanglinzhizhi"
	
	alert(person1.friends===person2.friends);//true
	​```





<br /><br /><br /><br />

### 4. 组合使用构造函数模式和原型模式

创建自定义类型的最常见方式,就是组合使用构造函数模式与原型模式.

> 构造函数模式用于定义实例属性,而原型模式用于定义方法和共享属性.

最终,每个实例都会有自己的一份实例属性的副本,但同时又共享着对方法的引用,最大限度地节省了内存.另外,这种混成模式还可支持向构造函数传递参数;可谓集二者之所长.

这种方法主要对应的情况是 对象中有引用类型的情况.(把引用类型定义在构造函数中).


	​```

	function Person(name, age, job){
		this.name= name;
		this.age= age;
		this.job= job;
		this.friends=["Shelby","Court"];
	}
	
	Person.prototype={
		constructor:Person,
		sayName:function(){
			alert(this.name);
		}
	}
	
	var person1=new Person("wanglin",25,"front-end");
	var person2=new Person("wanglinzhizhi",24,"front-end");





	person1.friends.push("wanglinzhizhi");
	alert(person1.friends);	//"Shelby,Court wanglinzhizhi"
	alert(person2.friends);	//"Shelby,Court"
	
	alert(person1.friends===person2.friends);//true
	​```


这种方式,用构造函数和原型混成的模式,是目前在ECMAScript 中使用**最广泛,认同度最高的一种创建自定义类型的方法**.可以说,这是用来**定义引用类型的一种默认模式**.







<br /><br /><br /><br />

###　5.动态原型模式

动态原型模式,它把所有信息都封装在了构造函数中.而通过在构造函数中国初始化原型(仅仅在有必要的情况下),又保持了同时使用构造函数和原型的优点.换句话说,可以通过检查某个应该存在的方法是否有效,来决定是否需要初始化原型.


	​```
	function Person(name,age,job) {
		//属性
		this.name= name;
		this.age= age;
		this.job= job;
		//方法
		if (typeof this.sayName  != "function") {
			Person.prototype.sayName=function(){
				console.log(this.name);
			}
		}
	
	}
	
	var person1=new Person("wanglinzhizhi", 24, "front-end");
	person1.sayName();
	
	​```







<br /><br /><br /><br />



### 6.寄生构造函数模式


	​```
	function Person(name,age,job) {
		var obj=new Object();
		obj.name=name;
		obj.age=age;
		obj.job=job;
		obj.sayName=function(){
				console.log(this.name);
			}
		};
	
		retrun obj;
	}
	
	var person1=new Person("wanglinzhizhi", 24, "front-end");
	person1.sayName();
	​```

这个模式可以在特殊的情况下用来为对象创建构造函数.假设我们需要创建一个具有额外方法的特殊数组.由于不能直接用Array构造函数,因此可以使用这个模式.

	​```
	function SpecialArray() {
		//创建数组
		var values=new Array();
		//添加值
		values.push.apply(values,arguments);
		//添加方法
		values.toPipedString = function(){
			return this.join(" | ");
		};
	
		//返回数组
		return values;
	
	}
	
	var colors=new SpecialArray("red","blue","green");
	console.log(colors.toPipedString());	// "red|blue|green"
	​```


关于寄生构造函数模式,需要说明:首先,返回的对象与构造函数还活着与构造函数的原型属性之间没有任何关系,也就是说,构造函数返回的对象与在构造函数外部创建没什么区别.为此不能依赖instanceof 操作符来确定对象类型. 由于存在这个问题, 建议在可以使用其他模式的情况下,不要使用这种模式.







<br /><br /><br /><br />


### 7.稳妥构造函数模式


	​```
	function Person(name,age,job) {
		var obj=new Object();
		obj.name=name;
		obj.age=age;
		obj.job=job;
		obj.sayName=function(){
				console.log(name);
			}
		};
	
		retrun obj;
	}
	
	var person1=new Person("wanglinzhizhi", 24, "front-end");
	person1.sayName();


	//区别于寄生构造函数模式, 

	​```


<hr />





<br /><br /><br /><br />

### 继承

许多OO语言都支持两种继承方式: 接口继承和实现继承. 接口继承只继承方法签名, 而实现继承则继承实际的方法. 函数没有签名. 在ECMAScript 中 无法实现接口继承.ECMAScript只支持实现继承, 而且其实现继承主要依靠原型链来实现的.





<br /><br /><br /><br />

### #1原型继承

### 谨慎的定义方法

子类型有时候需要覆盖超类型中的某个方法，或者需要添加超类型中不存在的某个方法。但不管怎么样，给原型添加方法的代码一定要放在替换原型的语句之后。


	​```
	function SuperType() {
		this.property= true;
	}
	
	SuperType.prototype.getSuperTypeValue=function(){
		retrun this.property;
	}
	
	function SubType(){
		this.subproperty =  false;
	}
	
	// 继承，本质上 用SuperType的实例替换SubType的原型
	SubType.prototype = new SuperType();
	
	//add new methods
	SubType.prototype.getSubValue= function(){
		retrun this.subproperty;
	}
	
	//重写超类型中的方法
	SubType.prototype.getSuperTypeValue=function(){
		retrun false;
	}
	
	var instance=new SubType();
	console.log(instance.getSuperTypeValue());	//false
	​```



getSuperTypeValue()是原型链中已经存在的一个方法，但重写这个方法将会屏蔽原来的那个方法。

换句话说，当SubType的实例调用getSuperTypeValue()时，调用的就是这个重新定义的方法，但通过SuperType的实例调用getSuperTypeValue()方法时，还会继续调用原来的那个方法。

这里格外要注意的是，必须在用SuperType 的实例替换原型之后，再定义这两个方法。要先new.在设置属性或方法.





<br /><br /><br /><br />

### 原型链继承的问题


原型链虽然很强大，可以用它来实现继承，但它也存在一些问题。 最主要的问题来自于包含引用类型值的原型。我们知道包含引用类型的原型属性会被所有实例所共享；而这也正是为什么要在构造函数中，而不是在原型中定义属性的原因。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺利成章地变成了现在的原型属性了。


	​```
	function SuperType() {
		this.colors=["red","blue","green"];
	}
	
	function SubType(){
	}
	
	//继承了SuperType
	SubType.prototype=new SuperType();
	
	var instance1= new SubType();
	instance1.colors.push("black");
	console.log(instance1.colors);//["red", "blue", "green", "black"]
	
	var instance2=new SubType();
	console.log(instance2.colors);//["red", "blue", "green", "black"]
	​```

原型链的第二个问题:在创建子类的实例时,不能像超类的构造函数中传递参数.实际上,应该说是没有办法在不影响所有对象实例的情况下,给超类型的构造函数传递参数.鉴于此,再加上前面说的原型中对包含引用类型的值所带来的问题,在实践中我们很少会单独使用原型链.



<br /><br /><br /><br />

### #2借用构造函数 继承

借用构造函数,也成为伪造对象或经典继承. 这种技术的基本思想相当简单, 即在子类型构造函数的内部 调用 超类型的构造函数.函数只不过是在特定环境中执行代码的对象,因此可以通过使用apply()和call() 方法也可在(将来)新创建的对象上执行构造函数.


	​```
	function SuperType() {
		this.colors=["red","blue","green"];
	}


	//子类的构造函数中.
	function SubType(){
		// 在构造函数中，继承了SuppperType
		SuperType.call(this);
	
	}


	var instance1= new SubType();
	instance1.colors.push("black");
	console.log(instance1.colors);//["red", "blue", "green", "black"]
	
	var instance2=new SubType();
	console.log(instance2.colors);//["red", "blue", "green"]
	​```


代码中，我们实际上是在（未来将要）新创建的SubType实例的环境下调用了SuperType构造函数，这样一来，就会在新SubType上执行SuperType()函数中定义的所有对象初始化代码.结果,SubType的每个实例就都会具有自己的color属性的副本了.




只借用构造函数的问题: 那么无法避免构造函数模式存在的问题,方法都在构造函数中定义,因此函数复用性就无从谈起了.而且,在超类的原型中定义的方法,对子类ixngeryan也是不可见的,结果所有类型都只能使用构造函数模式.





<br /><br /><br /><br />

### #3组合继承.(伪经典继承)

思路是将原型链和借用构造函数的技术组合在一起.使用原型链实现对原型属性和方法的继承,而通过借用构造函数来实现对实例属性的继承.这样,级通过在原型上定义方法实现了函数复用,又能够保证每个实例都有自己的属性.

	​```

	function SuperType(name) {
		this.name=name;
		this.colors=["red","blue","green"];
	}
	
	SuperType.prototype.sayName=function(){
		console.log(this.name);
	};
	
	function SubType(name, age){
		//继承属性
		SuperType.call(this,name);
	
		//自己的属性
		this.age=age;
	}
	
	//通过原型链来继承方法
	SubType.prototype = new SuperType();
	SubType.prototype.constructor=SubType;
	SubType.prototype.sayAge=function(){
		console.log(this.name);
	}
	
	var instance1=new SubType("wanglinzhizhi",24);
	instance1.colors.push("black");
	console.log(instance1.colors);
	instance1.sayName();
	instance1.sayAge();
	
	var instance2=new SubType("wanglin",25);
	console.log(instance2.colors);
	instance2.sayName();
	instance2.sayAge();
	
	​```


组合继承，避免了原型链和借用构造函数的缺陷，融合了它们 的优点，成为JavaScript中最常用的继承模式。而且，instanceof 和 isPrototypeof() 也能够用于识别给予组合继承创建的对象。







<br /><br /><br /><br />


### #4原型式继承


	​```

	function object(o){
		function F(){};
		F.prototype=o;
		return new F();
	}
	​```

先在object()函数内部,先创建一个临时性的构造函数,然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的新实例. 本质上讲,object() 对传入其中的对象执行了一次浅复制.


ECMAScript5 通过新增Object.create()方法规范化了原型式继承.这个方法接受两个参数:1个用作新对象原型的对象和(可选的)1个为新对象定义额外属性的对象.在传入1个参数的情况下,object()和Object.create() 方法的行为相同.

	​```
	var person={
		name:"wanglinzhizhi",
		friends:["luozhen1","luozhen2","luozhen3"]
	};
	
	var anotherPerson=Object.create(person);
	anotherPerson.name="wanglin2";
	anotherPerson.friends.push("luozhen4");
	
	var anotherPerson2=Object.create(person);
	anotherPerson2.name="wanglin33";
	anotherPerson2.friends.push("luozhen5");
	
	console.log(person.friends);
	​```

进一步简写:

	​```
	var person={
		name:"wanglinzhizhi",
		friends:["luozhen1","luozhen2","luozhen3"]
	};
	
	var anotherPerson=Object.create(preson,{
		name:{
			value:"wanglinzhzihi5555"
		}
	});
	
	console.log(anotherPerson.name);//wanglinzhzihi5555
	​```

在没有必要兴师动众地创建构造函数,而只想让一个对象与另一个对象保持类似的情况下,原型式继承是完全可以胜任的. 不过需要留意, 包含引用类型值的属性始终都会共享相应的值,就像使用原型模式一样.







<br /><br /><br /><br />

### #5寄生式继承

寄生式继承的思路与寄生构造函数和工厂模式类似,即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真地是它做了所有工作一样返回对象.


	​```
	function createAnoter(origianl){
		var clone = object(origianl);
		clone.sayHi=function ( ) {
			console.log("hi");
		}
		return clone;
	}


	var person={
		name:"wanglinzhizhi",
		friends:["luozhen1","luozhen2","luozhen3"]
	};
	var anotherPerson=createAnoter(person);
	anotherPerson.sayHi();//hi
	
	​```







<br /><br /><br /><br />

### #6寄生组合式继承

组合式继承是Javascript最常用的继承模式,不过,它也有不足. 组合继承最大的问题是无论什么情况下, 都会叼调用两次超类的构造函数:一次是在创建子类原型的时候, 另一次是在子类构造函数内部. 没错,子类型最终会包含超类型的全部实例属性, 但是我们不得不在调用子类型构造函数时重写这些属性.




	​```
	function SuperType(name) {
		this.name=name;
		this.colors=["red","blue","green"];
	}
	
	SuperType.prototype.sayName=function(){
		console.log(this.name);
	};
	
	function SubType(name, age){
		//继承属性
		SuperType.call(this,name);				//第二次调用SuperType
	
		//自己的属性
		this.age=age;
	}
	
	//通过原型链来继承方法
	SubType.prototype = new SuperType();		//第一次调用SuperType
	SubType.prototype.constructor=SubType;
	SubType.prototype.sayAge=function(){
		console.log(this.name);
	}
	
	​```

所谓寄生组合式继承, 级即通过借用构造函数来继承属性, 通过原型链的混成形式来继承方法.基本思路是: 不必为了指定子类型的原型而调用超类型的构造函数, 我们所需的无非是操类型的原型的一个副本而已. 本质上, 就是使用寄生式继承来继承超类型的原型, 然后再将结果指定给子类型的原型.



	​```
	function inheritPrototype(subType,superType) {
		var prototype=Object(SuperType.prototype);//创建对象
		//等价于 var prototype=Object.create(superType.prototype);


		//下面两行完成原型链的链接,其实本质上就是两个List节点的拼接.
		prototype.constructor = subType;		//增强对象
		subType.prototype = prototype;			//指定对象
	}
	
	function SuperType(name) {
		this.name=name;
		this.colors=["red","blue","green"];
	}
	
	SuperType.prototype.sayName=function(){
		console.log(this.name);
	};
	
	function SubType(name, age){
		//继承属性
		SuperType.call(this,name);				
		//自己的属性
		this.age=age;
	}
	
	// 寄生组合继承.
	inheritPrototype(subType,SuperType);
	
	SubType.prototype.sayAge=function(){
		console.log(this.age);
	}
	
	​```

其高效性体现在 它只调用了一次SuperType构造函数，并且因此避免了在superType.prototype上面创建不必要的,多余的属性.同时,原型链还能保持不变;因此,还能正常使用 instanceof 和 isPrototypeOf().

开发人员普遍认为 **寄生组合继承 是引用类型最为理想的继承范式**.(YAHOO.lang.extend()方法运用了寄生组合继承.)