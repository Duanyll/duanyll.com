---
title: CF625E Frog Fights
author: duanyll
tags: [OI, 题解, 思维题]
source: https://www.luogu.org/problemnew/show/CF625E
---

## 题意

有$n$只青蛙在一个长度为$m$的环上打架；每只青蛙有一个初始位置$p_i$，和一个跳跃数值$a_i$。从$1$号青蛙开始按序号循环行动，每次若第$i$只青蛙行动，则它会向前跳$a_i$个格子，撞飞它遇见的所有青蛙，包括终点格子上的，之后它的$a_i$减少等同于撞飞的青蛙只数，若$a_i<0$，它不会移动。求最后剩下的所有青蛙的编号。

$𝑛\leq10^5,𝑚\leq10^9$，不会有两只青蛙一开始在同一个格子里。

## 分析

先把青蛙按照位置排序. 我们在模拟过程中只关心两只青蛙(准确来说,相邻的两只)相撞的事件, 所以开一个`priority_queue`或`set`存下一次碰撞发生的时间, 用一个链表来维护每只青蛙的下一只是谁. 这样就可以依次按照时间先后顺序处理青蛙被撞飞的事件, 由于每只青蛙最多只被撞飞一次, 故时间复杂度为$O(n\log n)$.

## 代码

```cpp
#include <algorithm>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <iostream>
#include <set>
using namespace std;

typedef long long int64;

const int INF = 0x3f3f3f3f;
const int MAXN = 100010;

// 第一关键字: 碰撞时间, 第二关键字: 碰撞的青蛙
struct frog {
    int a, p, id;
    frog* succ;
    frog* prev;  // 下标是frogs数组的下标
} frogs[MAXN];

struct comp {
    bool operator()(const pair<int, frog*>& a, const pair<int, frog*>& b) const {
        return (a.first == b.first) ? (a.second->id < b.second->id)
                                    : (a.first < b.first);
    }
};
set<pair<int, frog*>, comp> s;

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

int m;

// a撞上b需要的时间
int time_to_hit(const frog& a, const frog& b) {
    if (a.id == b.id) return INF;
    int d = (b.p - a.p + m) % m;
    if (a.id > b.id) {  // b比a先行动;
        d = (d + b.a) % m;
    }
    if (d <= a.a) return 1; // 即使a的速度不够也能跳到
    if (a.a <= b.a) return INF; 
    // return ceil((double)(d - b.a) / (a.a - b.a));
    return (d - b.a - 1) / (a.a - b.a) + 1;
}

int main() {
    int n = read();
    m = read();
    for (int i = 1; i <= n; i++) {
        frogs[i].p = read();
        frogs[i].a = read();
        frogs[i].id = i;
    }
    sort(frogs + 1, frogs + n + 1,
         [](const frog& a, const frog& b) -> bool { return a.p < b.p; });
    for (int i = 1; i <= n; i++) {
        frogs[i].succ = &frogs[(i + 1 > n) ? 1 : (i + 1)];
        frogs[i].prev = &frogs[(i - 1 < 1) ? n : (i - 1)];
    }
    for (int i = 1; i <= n; i++) {
        s.insert(make_pair(time_to_hit(frogs[i], *frogs[i].succ), &frogs[i]));
        // clog << time_to_hit(frogs[i], *frogs[i].succ) << endl;
    }
    while (!s.empty()) {
        auto cur = *s.begin();
        if (cur.first == INF) break;
        frog* now = cur.second;
        s.erase(cur);
        s.erase(make_pair(time_to_hit(*now->prev, *now), now->prev));
        s.erase(
            make_pair(time_to_hit(*now->succ, *now->succ->succ), now->succ));
        now->p += time_to_hit(*now, *now->succ);
        now->a--;
        now->succ = now->succ->succ;
        now->succ->prev = now;
        s.insert(make_pair(time_to_hit(*now->prev, *now), now->prev));
        s.insert(make_pair(time_to_hit(*now, *now->succ), now));
    }
    cout << s.size() << endl;
    for (auto i : s) {
        cout << i.second->id << ' ';
    }
    cout << endl;
    return 0;
}
```