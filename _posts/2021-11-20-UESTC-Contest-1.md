---
title: 电子科技大学第十二届ACM趣味程序设计竞赛第一场（热身赛）
author: duanyll
tags: [OI, 比赛]
source: https://acm.uestc.edu.cn/contest/151/summary
---

## A. 双十一

每种货物从最便宜的商店买即可。注意不要把 n 和 m 看反了。

```cpp
int prices[MAXN][MAXN];

int main() {
    int n = read();
    int m = read();
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            prices[i][j] = read();
            if (prices[i][j] == -1) {
                prices[i][j] = INF;
            }
        }
    }

    int ans = 0;
    for (int j = 1; j <= n; j++) {
        int cur = INF;
        for (int i = 1; i <= m; i++) {
            cur = min(cur, prices[i][j]);
        }
        ans += cur;
    }
    write(ans);
    putchar('\n');
}
```

## B. 我们身边的狼

向每一个人询问所有人的状态，则平民的回答都会相同，狼的回答都会相同，$n$ 为奇数则可以区分，偶数不能区分。减少询问的数量只会让信息量减少，更不能区分。

$n=1$ 是可行的，平民的数量不少于狼的数量，只有一个人一定是平民。

直接判断奇偶性输出。

```cpp
int main() {
    int n = read();
    if (n & 1) {
        puts("YES");
    } else {
        puts("NO");
    }
}
```

## C. 蔚蓝

### 一眼 DP

```cpp
int dp[MAXN][MAXN]; // dp[i][j] 前 i 关， a 打了 j 关的答案
dp[i][j] = min(dp[i - 1][j - 1] + a[i], dp[i - 1][j] + b[i]);
```

完整代码：

```cpp
int main() {
    int n = read();
    for (int i = 1; i <= n; i++) {
        a[i] = read();
    }
    for (int i = 1; i <= n; i++) {
        b[i] = read();
    }

    memset(dp, INF, sizeof dp);
    dp[1][1] = a[1];
    dp[1][0] = b[1];
    for (int i = 2; i <= n; i++) {
        dp[i][0] = dp[i - 1][0] + b[i];
        for (int j = 0; j <= n; j++) {
            dp[i][j] = min(dp[i - 1][j - 1] + a[i], dp[i - 1][j] + b[i]);
        }
    }
    write(dp[n][n / 2]);
    putchar('\n');
}
```

### 贪心

将关卡按照两人用时差异降序排序后贪心选择用时较小的，不难证明贪心正确性，可实现 $O(n\log n)$。

## D. 炉石传说

注意到值域较小，直接枚举全体伤害的次数。

```cpp
int main() {
    int n = read();
    int x = read();
    int y = read();
    int max_health = 0;
    for (int i = 1; i <= n; i++) {
        a[i] = read();
        max_health = max(max_health, a[i]);
    }

    int ans = INF;
    int max_aoe = max_health / x + 1;
    for (int aoe_times = 0; aoe_times <= max_aoe; aoe_times++) {
        int cur = aoe_times;
        for (int i = 1; i <= n; i++) {
            if (a[i] - x * aoe_times > 0) {
                cur += ceil(double(a[i] - x * aoe_times) / y);
            }
        }
        ans = min(ans, cur);
    }
    cout << ans << endl;
}
```

## E. 马拉松

考虑将所有速度向量对起点直线方向向量做正交投影，则**只有垂直于直线方向的速度分量相同，平行分量不同时**，才有可能在同一时刻相交。以上结论对所有特殊情况都成立。

可以用内积计算垂直分量和平行分量，由于起点直线的方向向量对所有计算都是相同的，故不需要除以方向向量的长度也能进行比较，可以全部通过整形运算处理。

算法实现可通过双重 map 统计平行和垂直分量都相同的数量，并在统计时减去。

```cpp
#include <algorithm>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <iostream>
#include <map>
using namespace std;

typedef long long int64;

const int INF = 0x3f3f3f3f;
const int MAXN = 100010;
const int MAXA = 110;

int vx[MAXN];
int vd[MAXN];
int vy[MAXN];
int vn[MAXN];

#include <cctype>
#include <cstdio>

template <typename T = int>
inline T read() {
    T X = 0, w = 0;
    char ch = 0;
    while (!isdigit(ch)) {
        w |= ch == '-';
        ch = getchar();
    }
    while (isdigit(ch)) {
        X = (X << 3) + (X << 1) + (ch ^ 48);
        ch = getchar();
    }
    return w ? -X : X;
}

map<int, map<int, int>> cnt;
map<int, int> vnsum;

int main() {
    int n = read();
    int a = read();
    read();

    const int dir_x = 1;
    const int dir_y = a;
    const int norm_x = -a;
    const int norm_y = 1;

    for (int i = 1; i <= n; i++) {
        read();
        vx[i] = read();
        vy[i] = read();

        vd[i] = vx[i] * dir_x + vy[i] * dir_y;
        vn[i] = vx[i] * norm_x + vy[i] * norm_y;

        cnt[vn[i]][vd[i]]++;
        vnsum[vn[i]]++;
    }

    int64 ans = 0;
    for (int i = 1; i <= n; i++) {
        ans += vnsum[vn[i]] - cnt[vn[i]][vd[i]];
    }
    cout << ans << endl;
}
```

当心 `ans` 爆 `int`。

## F. A+B Problem

略。