---
title: CF615D Multipliers
tags: [OI,题解,数论,组合数学]
author: duanyll
source: https://www.luogu.org/problemnew/show/CF615D
---

> 垃圾JSON！！！有空去把`/posts.json`改成`/posts.xml`，JSON的转义符太恶心了。以上是吐槽。

## 题意

给你一个数，输出其所有因数的乘积。这个数以质因子乘积的形式给出。答案膜$10^9+7$，$m \leq 200000, p_i \leq 200000$

## 分析

首先肯定要~~对n质因数分解~~已经分好了，只用把相同的因子合并一下指数，记做`tim[i]`，表示第i个质因子的次数。

我们单独考虑每个质因子对答案的贡献，则答案是$\prod p_i^k_i$，$k_i$即因数$p_i$在所有因子里的出现次数，显然

$$
k_i = (tim_1 + 1)(tim_2 + 1) \cdots (tim_{i-1}+1)(tim_{i+1}+1) \cdots (tim_n+1) \times \sum_{j=1}^tim_i j
$$

相当于

$$
k_i = \prod (tim_i+1) * tim_i / 2
$$

指数很大，用一下指数循环节公式：

$$
a^b\%p=a^{b\%(p-1)}\%p
$$

但是！等差数列求和公式里面除了个2，而$10^9+7-1$不与2互质，取不了膜！

ZML老师给了我们一个神奇的公式：

$$
(a/b)\%m=(ab)\%m\div 2
$$

可是我并不会证明它，网上也查不到证明。不过$2(10^9+7)-2$就与2互质了嘛，计算过程中膜它，最后再膜$1e9+7$就是了。

另外一种做法是直接用前后缀积来算$k_i$，就可以避免这个除2的问题了(前缀和在指数上，对`MOD-1`取膜)

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdio>
using namespace std;

typedef long long int64;
const int MAXN = 200010;
const int64 MOD = 1e9+7;

int vcnt[MAXN];
int cnt[MAXN];
int64 prime[MAXN];
//int64 sum1[MAXN];
//int64 sum2[MAXN];

template <typename T>
T pow_mod(T a, T b, T MOD) {
    T res = 1;
    while (b) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

int main(){
	int n;
	cin >> n;
	for(int i = 1;i<=n;i++){
		int p;
		cin >> p;
		vcnt[p]++;
	}
	int pcnt = 0;
	for(int i = 1;i<=200000;i++){
		if(vcnt[i] > 0){
			cnt[++pcnt] = vcnt[i];
			prime[pcnt] = i;
		}
	}
//	sum1[0] = sum1[pcnt+1] = sum2[0] = sum2[pcnt+1] = 1;
//	for(int i = 1;i<=pcnt;i++){
//		sum1[i] = sum1[i-1] * (cnt[i] + 1);
//		sum1[i] %= MOD - 1;
//	}
//	for(int i = pcnt;i>=1;i--){
//		sum2[i] = sum2[i+1] * (cnt[i] + 1);
//		sum2[i] %= MOD - 1;
//	}
	int64 prod = 1;
	for(int i = 1;i<=pcnt;i++){
		prod *= (cnt[i] + 1);
		prod %= MOD*2 - 2;
	}
	int64 ans = 1;
	for(int i = 1;i<=pcnt;i++){
//		int64 k = (sum1[i-1] * sum2[i+1]);
//		k %= MOD - 1;
//		k *= cnt[i] * (cnt[i] + 1) / 2;
//		k %= MOD - 1;
		int64 k = prod * cnt[i] % (MOD*2 - 2) / 2;
		ans *= pow_mod(prime[i],k,MOD);
		ans %= MOD;
	}
	cout << ans << endl;
}
```
