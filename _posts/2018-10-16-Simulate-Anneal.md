---
author: duanyll
date: 2018-10-16
title: 玄(pian)学(fen)算法——模拟退火
tags: ["OI","算法","模拟退火"]
---

NOIP在即，还是复习一下经典玄(pian)学(fen)算法，多骗个二三十分，以免爆零。

<!-- more -->

我个人理解模拟退火就是随机猜，不过通过温度机制，让当前状态越接近正确答案时随机变化幅度越小，来尽量接近正确答案。大概过程是每次随机出一个新答案，如果这个答案比现在更优秀就直接接受它，否则就根据某个热力学公式按照一定概率接受它，防止被卡在局部最小值，最后降低温度参数。

调参是模拟退火的主要乐趣，可以利用用对拍大法。如果有条件最好卡时。

```cpp
#include <algorithm>
#include <cmath>
#include <ctime>
using namespace std;

#define SEED time(0)
const double TBEGIN = 3000;
const double EPS = 1e-14;
const double TEND = EPS;
const double DELTAT = 0.99;
const double INF = 1e18;
template<typename T,typename TComp>
T SA(T s){
	srand(SEED);
	double t = TBEGIN;
	double ans = INF;
	T now = s;
	while(t>EPS){
		T n = now.get_new([](double t)->double{
			return (rand()*2-RAND_MAX)*t;
		},t);
		double nans = n.get_ans();
		if(TComp()(nans,ans)){
			ans = nans;
			now = n;
		}else{
			if(exp((ans-nans)/t)*RAND_MAX>rand()){
				now = n;
			}
		}
		t *= DELTAT;
	}
	return now;
}

const double MAX_TIME = 0.8; 
template<typename T,typename TComp>
T SA_Time(T s){
	state ans = SA<state,less<double> >(s);
    while((double)clock()/CLOCKS_PER_SEC<MAX_TIME)
    	ans = SA<state,less<double> >(ans);
    return ans;
}
```

> 代码说明：`T`是状态结构体，需要定义`T get_new(double(*prand)(double),double t)`方法用于更新状态，`double get_ans()`方法用于计算状态最小值。`TComp`是`less<double>`(最小化ans)或`greater<double>`(最大化ans)
