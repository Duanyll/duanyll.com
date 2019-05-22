---
title: C++(Dev-Cpp附赠的Mingw32)的浮点数的坑
tags: [OI]
author: duanyll
---

昨天改[考试题](https://duanyll.com/2019/05/21/UVa-11768.html)的错是发现标程有锅，造出来的数据是错误的，导致集体不过大样例。。。问题出在这一句话：

```cpp
double a = dbread();
int64 b = a * 10;
```

这道题需要把输入的浮点数扩大十倍变成整数处理，请读程序写结果：

```cpp
#include <iostream>
#include <cmath>
using namespace std;

typedef long long int64;

int main() {
    double orig = 10.1;
    cout << "original value: " << orig << endl;
    int64 a = orig * 10;
    cout << "initialize directly: " << a << endl;
    int64 b = (int64)((double)orig * 10.0);
    cout << "force cast: " << b << endl;
    int64 c = floor(orig * 10);
    cout << "floor: " << c << endl;
    int64 d = ceil(orig * 10);
    cout << "ceil: " << d << endl;
    orig *= 10;
    int64 e = orig;
    cout << "multiply then initialize: " << e << endl;
}
```

猜猜输出是什么(用学校电脑Dev-Cpp编译)？

```
original value: 10.1
initialize directly: 100
force cast: 100
floor: 101
ceil: 101
multiply then initialize: 101
```

惊不惊喜意不意外？精度误差不会这么明显吧！吓得我用自己的电脑(`g++.exe (x86_64-posix-seh-rev0, Built by MinGW-W64 project) 8.1.0`)试了一下：

```
original value: 10.1
initialize directly: 101
force cast: 101
floor: 101
ceil: 101
multiply then initialize: 101
```

怎么又正常了？在Ubuntu 18.04中结果也是正常的。也不会是32位64位的锅，因为标程在64位的评测机上也是错的。那就只可能是这个Mingw32的锅了，这还能解释为什么标程在UVa上能A。**Dev-Cpp真是害人不浅啊！**

保险起见，以后处理`double`转整型是，还是加一个`EPS`比较妥当。