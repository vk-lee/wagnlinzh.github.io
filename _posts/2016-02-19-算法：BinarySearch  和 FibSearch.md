---
layout: post
title:  "算法：BinarySearch和FibSearch"
---







## 算法：BinarySearch  和 FibSearch

<hr/>

    ``` c++
    binarySearch(int[] A,int e,int lo,int hi){
      while(lo<hi){
      	int mid=(lo+hi)/2;
        if(e<A[mid])
          hi=mid;
        else if(A[mid]<e)
          lo=mid+1;
        else
          return mid;
      }//while end
      return -1;
    }//code end

    ```



以上是简单的二分查找，对于有序数列，我们常用的是二分查找对其进行遍历，查找到相应所需要的元素的位置。当元素不存在时，返回-1.

算法的时间复杂度是我们原因欣然接受的O(nlogn).

这就是最好的了吗？不是，还有比二分查找更好的算法FibSearch。

    ``` C++
    int fibSearch(int[] A,int e,int lo,int hi){
      Fib fib(hi-lo);
      while(lo<hi){
        int mid=lo+fib.get()-1;
        if(e<A[mid]) hi=mid;
        else if(A[mid]<e) lo=mid-1;
        else return mid;
      }//while end
      return -1;
    }//code end

    //Fibonacci 类
    class Fib { //Fibonacci数列类
    private:
       int f, g; //f = fib(k - 1), g = fib(k)。均为int型，很快就会数值溢出
    public:
       Fib ( int n ) //初始化为不小于n的最小Fibonacci项
       { f = 1; g = 0; while ( g < n ) next(); } //fib(-1), fib(0)，O(log_phi(n))时间
       int get()  { return g; } //获取当前Fibonacci项，O(1)时间
       int next() { g += f; f = g - f; return g; } //转至下一Fibonacci项，O(1)时间
       int prev() { f = g - f; g -= f; return g; } //转至上一Fibonacci项，O(1)时间
    };




    ```

以上是fibSearch的基本代码。

事实上，从代码可以看出，fibSearch的算法是基于二分查找的结构之上的。区别在于，每次对mid定位不再是取中点，而是取黄静分割点。这样做对性能的影响是，原来的二分查找BinarySearch的平均复杂段是 1.5*nlogn，可减低前面的常系数 1.5 降到 黄金分割率 (约为1.44）.

之所以会是这样，是因为 binarySearch 中左右两边分支时，进行的比较次数时不同的，左边比较次数比右边的比较次数少，那么虽然每次是平均从中间截断，但是效果并不是分摊，而是后面分摊的比较次数更多。所以可以用fibSearch将比较次数更少的左边截取更长的长度，这有点类似于哈夫曼编码的方式，将较小权值的分支分更深，而将将较大权值的分支放在更浅的位置已达到整体的权值最小。



另外一个发现是关于fibonacci数列的。以前只知道有 Fibonacci数列，但是没有想过它的用途，现在发现这货还是很有用的。而且原来Fibonacci 数列与黄金分割点之间存在相关关系。

tips，fibonacci数列千万不要使用递归来构造。 :)


by wanglinzhizhi