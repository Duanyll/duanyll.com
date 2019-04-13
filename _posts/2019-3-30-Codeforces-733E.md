---
title: CF733E Sleep in Class [思维题]
tags: [OI,题解,思维题]
author: duanyll
source: https://www.luogu.org/problemnew/show/CF733E
---

## 题意

一个人站在楼梯上，楼梯编号1到n，每一层楼梯上面都有着标识，'U'代表这个人上楼，'D'代表这个人下楼，每当这个人离开这一层楼梯，这层楼梯的标识改变，U变成D，D变成U。

现在的问题是，询问出这个人站在1到N的每一层楼梯，那么在每一层楼梯，他要花费多少时间才能走出这些楼（从1或者N走出去），如果他永远走不出去，输出-1

## 分析

```
UUD UUD UUD
^    ^    ^
DUD UDD UUU
 ^    ^  ^
DDD UDU UDU
  ^  ^    ^
DDU UUU
 ^  ^
DUU ...
^
```

手工模拟几次样例之后容易发现人会一直沿着一段连续相同的标记往前走，遇到第一个不同的标记就返回后一直往回走，再碰到一个不一样的标记后继续向开始的方向走，回到刚才的折返点时不同的标记已经被清除掉了，就可以继续向前走了……

相当于这个人从出发点开始，以 $ 2*dis $ 的代价依次消除两侧颜色不一样的点，最后获得一条连续的颜色相同的路走出去，不存在走不出去的情况。

```
DUDUDDDUU
   |-^
   |--|
 |----|
 |------>
```

再模拟几次又发现如果~~出发点方向的折返点（D方向的U，U方向的D）数量**大于**出发点的反方向的折返点数量，就会从出发点的反方向走出来，否则就从出发点方向走出来~~好绕啊，再概括一下就是**左U（包括自己）大于右D就从右边出去，否则从左边出去**。

答案就是D方向的U，U方向的D的距离之和乘二加上最后走出去的花费。

用前缀和统计D和U的数量来判定每个点走出去的方向，然后正方向反方向各开一个队列（里面存当前点需要的的折返点位置）来差分统计当前方向的折返点的距离之和，统计时利用另一个方向的折返点计数保证队列中元素个数正确。

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdio>
using namespace std;

typedef long long int64;

const int MAXN = 1e6+10;
const int INF = 0x3f3f3f3f;

char a[MAXN];
int64 ans[MAXN];

int sumu[MAXN],sumd[MAXN];
int q[MAXN];

int main(){
	int n;
	cin >> n >> (a+1);
	for(int i = 1;i<=n;i++){
		sumu[i] = sumu[i-1];
		if(a[i] == 'U'){
			sumu[i]++;
		}
	}
	for(int i = n;i>=1;i--){
		sumd[i] = sumd[i+1];
		if(a[i] == 'D'){
			sumd[i]++;
		}
	}
	for(int i = 1;i<=n;i++){
		if(sumd[i+1] >= sumu[i]){
			ans[i] = i;
		}else{
			ans[i] = n-i+1;
		}
	}
	
	int head = 0,tail = 0;
	int64 tot = 0;
	for(int i = 1;i<=n;i++){
		tot += head-tail;			//向前推进一格，距离当前队列中折返点距离之和增加为折返点个数 
		while(head-tail > sumd[i]){
			tot -= i - q[tail++];	//出队多余折返点 
		}
		ans[i] += tot*2;
		if(a[i] == 'U'){
			q[head++] = i;
		} 
	}
	
	head = 0,tail = 0;
	tot = 0;
	for(int i = n;i>=1;i--){
		tot += head-tail;
		while(head-tail > sumu[i]){
			tot += i - q[tail++];	//出队多余折返点 
		}
		ans[i] += tot*2;
		if(a[i] == 'D'){
			q[head++] = i;
		} 
	}
	
	for(int i = 1;i<=n;i++){
		cout << ans[i] << ' '; 
	}
	cout << endl;
}
```

本代码在差分统计答案上参考了[Toooooocold](https://blog.csdn.net/qq_32506797/article/details/53039638)的代码实现（自己没想到直接加元素个数这一点，写的太复杂了）。