---
title: CF852A Digits
author: duanyll
tags: [OI, 题解, 思维题, 分类讨论]
source: https://www.luogu.org/problemnew/show/CF852A
---

> 好久都没写过题解了...

## 题意

给定一个大整数$A$, 你需要对$A$执行$3$次操作, 一次操作为在$A$这个数中间添加若干加号, 让这个数变成若干个数的和, 举个例子$123450089$可以变成 $123+450+089$, 要求执行这$3$次操作之后$A$为$1$位数, 输出操作方案.

## 分析

$A$最多有$200000$位, 令$f(A)$表示$A$的各数位之和.

- 显然当$f(A)\leq198$时, 直接三次加满加号就行
- 当$f(A)=199$时, 加三次加号不行了, 第一步加成$199$, 第二步$1+99=100$, 第三步$1+00=1$
- 当$200\leq f(A)\leq288$时, 也是三次加满加号
- 对于$289\leq f(A)\leq999$的情况:
  
    令

    $$
    A = \overline{a_0a_1a_2\cdots a_n}, f(A)=\sum{a_i}
    $$

    以两位为间隔划分$A$, 假设$n$是奇数($A$有偶数位, 奇数位的情况同理), 令

    $$
    X = \overline{a_0a_1} + \overline{a_2a_3} + \cdots + \overline{a_{n-1}a_n}
    $$

    错开一位, 令

    $$
    Y = a_0 + \overline{a_1a_2} + \overline{a_3a_4} + \cdots + a_n
    $$

    两式相加并整理得

    $$
    X+Y = 11f(A)-9a_n > 10f(A)
    $$

    令$X>Y$,

    $$
    X>5f(A)
    $$

    考虑以下划分情况:

    $$
    a_0+a_1+a_2+\cdots+a_n (f(A))
    $$

    $$
    \overline{a_0a_1} + a_2 + a_3 + \cdots + a_n
    $$

    $$
    \overline{a_0a_1} + \overline{a_2a_3} + \cdots + a_n
    $$

    $$
    \cdots
    $$

    $$
    \overline{a_0a_1} + \overline{a_2a_3} + \cdots + \overline{a_{n-1}a_n}(X)
    $$

    第一项是$f(A)$, 是三位数, 最后一项是$X>5f(A)$, 一定是四位数, 易知以上两项之间不会相差$81$, 那么以上划分情况中一定存在一种满足$1000\leq S\leq 1080$,这样的$S$可以在剩下的两次操作中变成一位数

- 再推广到$f(A)\geq1000$的情况

    令

    $$
    X = \overline{a_0a_1a_2} + \cdots + \overline{a_{n-2}a_{n-1}a_n}
    $$

    $$
    Y = a_0 + \overline{a_1a_2a_3} + \cdots + a_{n-1} + a_n
    $$

    $$
    Z = a_0 + a_1 + \overline{a_2a_3a_4} + \cdots + a_{n}
    $$

    (假设$n$凑的出来以上序列, 凑不出来的类推), 有

    $$
    X + Y + Z > 98f(A)
    $$

    令$X$最大(放缩一下,够用了)

    $$
    x > 30f(A)
    $$
    
    再考虑刚才那样的依次合并连续两项的过程, 最开始是$f(A)$, 每次增加不超过$81$, 最后大于$30f(A)$, 位数多了一位, 一定存在一种情况满足$100\cdots000\leq S \leq 100\cdots080$, 可以两步解决.

## 代码

据说随机化第一步乱分很容易过(代码也短), 不过我没有写.

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
const int MAXN = 200010;

char A[MAXN];
char buffer[MAXN];
int n;

void final_step(int fA) {
    if (fA != 199) {
        sprintf(buffer, "%d", fA);
        putchar(buffer[0]);
        int tot = buffer[0] - '0', bufs = strlen(buffer);
        for (int i = 1; i < bufs; i++) {
            putchar('+');
            putchar(buffer[i]);
            tot += buffer[i] - '0';
        }
        putchar('\n');

        sprintf(buffer, "%d", tot);
        putchar(buffer[0]);
        bufs = strlen(buffer);
        for (int i = 1; i < bufs; i++) {
            putchar('+');
            putchar(buffer[i]);
        }
        putchar('\n');
    } else {
        puts("1+99");
        puts("1+0+0");
    }
}

void solve_by_split_2(int fA, int offset = 0, int find_line = 1000,
                      bool need_plus = false) {
    int dfA = 0;
    for (int i = offset; i < n; i += 2) {
        dfA += A[i] - '0';
    }
    // 第一位要错开
    if (dfA * 9 + fA < find_line) {
        if (need_plus) putchar('+');
        need_plus = true;
        putchar(A[offset++]);
    }

    int i;
    for (i = offset; i + 1 < n; i += 2) {
        if (need_plus) putchar('+');
        need_plus = true;
        putchar(A[i]);
        putchar(A[i + 1]);
        fA += (A[i] - '0') * 9;
        // 刚好凑出1000...00xx
        if (fA > find_line) break;
    }
    for (i += 2; i < n; i++) {
        putchar('+');
        putchar(A[i]);
    }
    putchar('\n');
    final_step(fA);
}

bool try_solve_3(int offset, int fA, int find_line) {
    int dfA = 0;
    for (int i = offset; i + 2 < n; i += 3) {
        dfA += (A[i] - '0') * 99 + (A[i + 1] - '0') * 9;
    }
    if (dfA + fA >= find_line) {
        bool need_add = false;
        if (offset == 1) {
            putchar(A[0]);
            need_add = true;
        } else if (offset == 2) {
            putchar(A[0]);
            putchar(A[1]);
            need_add = true;
        }
        for (int i = offset; i + 2 < n; i += 3) {
            if (fA + 999 > find_line) {
                solve_by_split_2(fA, i, find_line, need_add);
                return true;
            }
            fA += (A[i] - '0') * 99 + (A[i + 1] - '0') * 9;
            if (need_add) putchar('+');
            need_add = true;
            putchar(A[i]);
            putchar(A[i + 1]);
            putchar(A[i + 2]);
        }
    }
    return false;
}

int main() {
    cin >> n;
    cin >> A;
    int fA = 0;
    for (int i = 0; i < n; i++) {
        fA += A[i] - '0';
    }
    if (fA <= 288) {
        putchar(A[0]);
        for (int i = 1; i < n; i++) {
            putchar('+');
            putchar(A[i]);
        }
        putchar('\n');
        final_step(fA);
    } else if (fA < 1000) {
        solve_by_split_2(fA);
    } else {
        int line = 1;
        while (line < fA) line *= 10;
        if (!try_solve_3(0, fA, line)) {
            if (!try_solve_3(1, fA, line)) {
                try_solve_3(2, fA + (A[0] - '0') * 9, line);
            }
        }
    }
    return 0;
}
```