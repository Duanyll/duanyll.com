---
title: CF852C Property
author: duanyll
tags: [OI, 题解, 思维题]
source: https://www.luogu.org/problemnew/show/CF852C
---

## 题意

有一个正$2n$边形，在每条边上有$n$等分点. 现在已经选定了$n$个点, $n$个点分别位于第$2k+1$条边上, 且这$n$个点的序号构成了一个排列; 你需要再选出$n$个点位于第$2k$条边上, 并且这$n$个点的序号也构成一个排列, 使得这些点构成的多边形面积最大. 输出选择方案.

![图片2.png](https://i.loli.net/2019/07/23/5d36ec7a80c2052041.png)

$n=3$的一种选法, 蓝色是给定点, 红色是自选点.

![图片1.png](https://i.loli.net/2019/07/23/5d36ec7a80c7165340.png)

以上情况的最优解.

## 分析

要让保留的面积最大, 就要让删去的面积最小. 考虑计算每一个选择点对删去面积的贡献.

![图片3.png](https://i.loli.net/2019/07/23/5d36ec7a80e4a98760.png)

$B_{2k}$和$B_{2k+2}$是给定点, $X$是动点. $P_1, P_2$是删去区域的面积.

$$
P_1+P_2=\frac{A_{2k+1}X * h_{2k}}{2}+\frac{XA_{2k+2} * h_{2k+2}}{2}
$$

$$
P_1+P_2=\frac{A_{2k+1}X * (h_{2k} - h_{2k+2})}{2} + constant
$$

目的是要最小化$\sum{P_i}$, 由于$A_{2i+1}X$是$0$到$n-1$的一个排列, 所以应该用小的$A_{2i+1}X$搭配大的$h_{2i}-h_{2i+2}$, 就能使总和尽量小.

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <cassert>
#include <cmath>
using namespace std;

typedef long long int64;

const int INF = 0x3f3f3f3f;
const int MAXN = 50000 + 10;

int a[MAXN], b[MAXN], ans[MAXN];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        b[i] = i;
    }
    a[n + 1] = a[1];
    sort(b + 1, b + n + 1, [](const int& A, const int& B) -> bool {
        return a[A] + a[A + 1] < a[B] + a[B + 1];
    });
    for (int i = 1; i <= n; i++) {
        ans[b[i]] = i - 1;
    }
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << ' ';
    }
    cout << endl;
    return 0;
}
```