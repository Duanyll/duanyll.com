---
title: CF870F Paths
author: duanyll
tags: [OI, 题解, 数论]
source: https://www.luogu.org/problemnew/show/CF870F
---

## 题意

照搬洛谷翻译

> 给定一张$n$个顶点的图, 对于点$i,j$, 如果$gcd(i,j)\neq1$,则$i$到$j$有一条长度为1的无向边. 令$dis(i,j)$表示从i到j的最短路, 如果$i$无法到$j$，则$dis(i,j)=0$. 
> 
> 求节点两两之间距离之和.

## 分析

先考虑两个数之间的路径情况.

- $gcd(a,b)\neq1$: 直接连边
- $gcd(a,b)=1$: 设$f_a,f_b$是$a,b$的最小质因子
  - $f_af_b\leq n$: 可以走$a\rightarrow f_af_b \rightarrow b$, 路径长度为$2$
  - $f_af_b>n$: 不妨设$f_a>f_b$, 那么有$f_a>\sqrt{n}$, 又有$a<n$, 故$a$一定是质数, 可以考虑存在一条这样的路径: $a\rightarrow2a\rightarrow2f_b\rightarrow b$, 路径长度为$3$, 并且当$2a>n$时, 不存在这样的路径.
  
若以$2$作为跳板来转移已经无解了, 用比$2$更大的数来转移也不会有解, 因此路径只有以上三种情况.

然后考虑如何统计答案, 应该考虑分种类统计条数.

- $a\rightarrow b$: 利用欧拉$\varphi$函数来线性统计.
- $a\rightarrow f_af_b\rightarrow b$: 不好直接做, 用总情况数来减.
- $a\rightarrow2a\rightarrow2f_b\rightarrow b$: 还是令$f_a>f_b$, 若这样的路径存在, 需满足以下条件:
$$
2f_b\leq n, f_af_b>n
$$
根据上面的推理, $a$是质数, 所以只需统计最小质因子是$f_b$的数的个数(线性筛可以做到), 对于$2a\leq n$的就是长度为$3$的路径, 否则就是不连通.

## 代码

```cpp
#include <algorithm>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <iostream>
using namespace std;

typedef long long int64;

const int INF = 0x3f3f3f3f;
const int MAXN = 1e7 + 10;

bool isnt_prime[MAXN];
int64 prime[MAXN], phi[MAXN];
int64 mfac_cnt[MAXN], mfac_sum[MAXN];

#define sum(l, r) (((r) < (l)) ? 0 : (mfac_sum[(r)] - mfac_sum[(l) - 1]))

int main() {
    int64 n;
    cin >> n;
    isnt_prime[1] = true;
    phi[1] = 1;
    int prime_cnt = 0;
    for (int i = 2; i <= n; i++) {
        if (!isnt_prime[i]) {
            prime[prime_cnt++] = i;
            mfac_cnt[i]++;
            phi[i] = i - 1;
        }
        for (int j = 0; j < prime_cnt; j++) {
            if (i * prime[j] > n) break;
            isnt_prime[i * prime[j]] = true;
            mfac_cnt[prime[j]]++;
            if (i % prime[j] == 0) {
                phi[i * prime[j]] = phi[i] * prime[j];
                break;
            } else {
                phi[i * prime[j]] = phi[i] * (prime[j] - 1);
            }
        }
    }
    for (int i = 1; i <= n; i++) {
        mfac_sum[i] = mfac_sum[i - 1] + mfac_cnt[i];
    }
    int64 path2 = 0;
    for (int i = 1; i <= n; i++) {
        path2 += phi[i] - 1;
        // clog << phi[i] << endl;
    }
    int64 path1 = (n - 1) * (n - 2) / 2 - path2;
    // 先假设都是长度为2的路径, 待会统计的时候再调整
    int64 ans = path2 * 2 + path1;
    for (int i = 0; i < prime_cnt; i++) {
        // 长度为3的路径, fa < n / 2
        ans += mfac_cnt[prime[i]] *
               sum(max(prime[i] + 1, n / prime[i] + 1), max(prime[i], n / 2));
        // 不存在的路径, fa > n / 2
        ans -= 2 * mfac_cnt[prime[i]] * sum(max(prime[i], n / 2) + 1, n);
    }
    cout << ans << endl;
    return 0;
}
```