---
title: CF273D Dima and Figure
tags: [OI, 题解, DP]
source: http://codeforces.com/problemset/problem/273/D
author: duanyll
---

## 题意

在$n\times m, (n, m \leq 150)$的方格纸上选择一个四连块, 要求对于四连块中的任意两点之间的最小移动距离等于他们之间的曼哈顿距离. 问有多少种选法.

## 分析

条件的意思是选出的格子集是凸的, 即: **左边界先减后增, 右边界先增后减**

可以定义$dp[i][l][r][ls][rs]$, 表示考虑前$i$行, 左边界为$l$, 右边界为$r$, $ls$表示左边界是否可以减少, $rs$表示右边界是否可以增加. 不难发现第一维可以滚动数组.

得到大量转移方程, 具体分类讨论见代码.

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
const int MAXN = 155;
const int MOD = 1e9 + 7;

int64 dp[MAXN][MAXN][2][2];

int main() {
    int n, m;
    cin >> n >> m;
    for (int l = 1; l <= m; l++) {
        for (int r = l; r <= m; r++) {
            dp[l][r][1][1] = 1;
        }
    }
    int64 ans = 0;
    for (int i = 1; i <= n; i++) {
        int64 sum = 0;
        for (int l = 1; l <= m; l++) {
            for (int r = l; r <= m; r++) {
                for (int sl = 0; sl <= 1; sl++) {
                    for (int sr = 0; sr <= 1; sr++) {
                        sum += dp[l][r][sl][sr];
                        sum %= MOD;
                    }
                }
            }
        }
        ans += sum * (n - i + 1);  // 统计的是上一行的答案
        ans %= MOD;

        // 左侧收缩
        for (int l = 1; l < m; l++) {
            for (int r = l + 1; r <= m; r++) {
                for (int sl = 0; sl <= 1; sl++) {
                    for (int sr = 0; sr <= 1; sr++) {
                        dp[l + 1][r][0][sr] += dp[l][r][sl][sr];
                        dp[l + 1][r][0][sr] %= MOD;
                    }
                }
            }
        }

        // 右侧收缩
        for (int l = m - 1; l >= 1; l--) {
            for (int r = m; r >= l + 1; r--) {
                for (int sl = 0; sl <= 1; sl++) {
                    for (int sr = 0; sr <= 1; sr++) {
                        dp[l][r - 1][sl][0] += dp[l][r][sl][sr];
                        dp[l][r - 1][sl][0] %= MOD;
                    }
                }
            }
        }

        // 左侧扩张
        for (int l = m; l >= 2; l--) {
            for (int r = m; r >= l; r--) {
                for (int sr = 0; sr <= 1; sr++) {
                    dp[l - 1][r][1][sr] += dp[l][r][1][sr];
                    dp[l - 1][r][1][sr] %= MOD;
                }
            }
        }

        // 右侧扩展
        for (int l = 1; l < m; l++) {
            for (int r = l; r < m; r++) {
                for (int sl = 0; sl <= 1; sl++) {
                    dp[l][r + 1][sl][1] += dp[l][r][sl][1];
                    dp[l][r + 1][sl][1] %= MOD;
                }
            }
        }
    }
    cout << ans << endl;
}
```