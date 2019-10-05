---
title: CF360E Levko and Game
tags: [OI, 题解, 贪心]
author: duanyll
source: http://codeforces.com/problemset/problem/360/E
---

## 题意

$n$个点, $m+k$条边的有向图, 其中给定$k$条边可以在给定$[l_i, r_i]$范围内任意修改边权, 判断并输出是否存在一种方案使$s_1\rightarrow f$的最短路比$s_2\rightarrow f$短.

## 分析

先令所有的边权都取到$r_i$, 然后从$s_1,s_2$开始单源最短路. 然后每次考虑一条边$(u,v)$满足$dis_1[u] < dis_2[u]$, 将他的边权设为$l_i$后再跑最短路, 直到不存在这样的边, 然后判断结果并输出.

因为对于$dis_1[u] < dis_2[u]$的情况, 假如$(u, v)$在最短路上, 一定有$dis_1[v] < dis_2[v]$, 所以现在修改了边权, 一定会使后面的$dis_1[u]$更小, 即答案更优.

允许平局的情况, 改为$dis_1[u] \leq dis_2[u]$即可.

## 代码

```cpp
#include <algorithm>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <iostream>
#include <queue>
using namespace std;

typedef long long int64;

const int INF = 0x3f3f3f3f;
const int MAXN = 1e4 + 110;

class lfs {
   public:
    lfs(int N) {
        memset(head, -1, sizeof head);
        memset(l, 0, sizeof l);
        memset(r, 0, sizeof r);
        ecnt = 0;
        n = N;
    }
    void adde(int from, int to, int L, int R) {
        u[ecnt] = from;
        l[ecnt] = L;
        r[ecnt] = R;
        e[ecnt].to = to;
        e[ecnt].w = R;
        e[ecnt].next = head[from];
        head[from] = ecnt++;
    }

    struct Edge {
        int to, next, w;
    } e[MAXN * 2];
    int head[MAXN];
    int ecnt;
    int n;

    int u[MAXN], l[MAXN], r[MAXN];
};

class dijkstra : public lfs {
   public:
    dijkstra(int n) : lfs(n) {}
    int64 dis1[MAXN], dis2[MAXN];
    void solve(int s, int64* dis) {
        priority_queue<pair<int64, int>, vector<pair<int64, int>>,
                       greater<pair<int64, int>>>
            que;
        dis[s] = 0;
        que.push(pair<int64, int>(0, s));
        while (!que.empty()) {
            pair<int64, int> p = que.top();
            que.pop();
            int v = p.second;
            if (dis[v] < p.first) continue;
            for (int i = head[v]; ~i; i = e[i].next) {
                Edge now = e[i];
                if (now.w + dis[v] < dis[now.to]) {
                    dis[now.to] = now.w + dis[v];
                    que.push(pair<int64, int>(dis[now.to], now.to));
                }
            }
        }
    }

    bool check(int s1, int s2, int f, bool can_draw, int m, int k) {
        bool updated;
        do {
            updated = false;
            memset(dis1, INF, sizeof dis1);
            memset(dis2, INF, sizeof dis2);
            solve(s1, dis1);
            solve(s2, dis2);
            if (dis1[f] < dis2[f] + can_draw) {
                cout << (can_draw ? "DRAW" : "WIN") << endl;
                for (int i = m; i < m + k; i++) {
                    cout << e[i].w << ' ';
                }
                cout << endl;
                return true;
            }
            for (int i = m; i < m + k; i++) {
                if (dis1[u[i]] < dis2[u[i]] + can_draw) {
                    if (e[i].w > l[i]) {
                        e[i].w = l[i];
                        updated = true;
                        break;
                    }
                }
            }
        } while (updated);
        return false;
    }
};

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

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    int s1, s2, f;
    cin >> s1 >> s2 >> f;
    dijkstra* graph = new dijkstra(n);
    for (int i = 1; i <= m; i++) {
        int u = read();
        int v = read();
        int w = read();
        graph->adde(u, v, w, w);
    }
    for (int i = 1; i <= k; i++) {
        int u = read();
        int v = read();
        graph->l[i] = read();
        graph->r[i] = read();
        graph->adde(u, v, graph->l[i], graph->r[i]);
    }
    if (!graph->check(s1, s2, f, false, m, k)) {
        if (!graph->check(s1, s2, f, true, m, k)) {
            cout << "LOSE" << endl;
        }
    }
}
```