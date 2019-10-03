---
title: CF575G Run for beer
tags: [OI, 题解, 图论]
source: http://codeforces.com/problemset/problem/575/G
author: duanyll
---

> 9月30日的 Codeforces Div.2 的题解大概就鸽了吧

## 题意

$n$个点$m$条边的带权图, 求$0$到$n-1$的最小权值且最小长度的路径, 权值为把路径经过的边的权从终点到起点往依次写下组成的十进制数, $0\leq w_i\leq9$.

## 思路

先把到终点距离为$0$的点预处理出来, 然后从多起点开始跑字典序最小最短路(分层BFS).

## 代码

```cpp
#include <algorithm>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <iostream>
#include <vector>
using namespace std;

typedef long long int64;

const int MAXN = 100010;
const int INF = 0x3f3f3f3f;

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

template <typename T>
inline void write(T x) {
    if (x < 0) putchar('-'), x = -x;
    if (x > 9) write(x / 10);
    putchar(x % 10 + '0');
}

class lfs {
   public:
    lfs(int N) {
        memset(head, -1, sizeof head);
        ecnt = 0;
        n = N;
    }
    void adde(int from, int to, int w) {
        e[ecnt].to = to;
        e[ecnt].w = w;
        e[ecnt].next = head[from];
        head[from] = ecnt++;
    }
    void addde(int a, int b, int w) {
        adde(a, b, w);
        adde(b, a, w);
    }

    void solve() {
        vector<int> bfs_order;
        memset(dis, INF, sizeof dis);
        dis[0] = 0;
        bfs_order.push_back(0); 
        int cur = 0; // bfs队列不用pop, 空间换时间
        while (cur < bfs_order.size()) {
            int u = bfs_order[cur];
            for (int i = head[u]; i != -1; i = e[i].next) {
                int v = e[i].to;
                if (dis[v] == INF) {
                    dis[v] = dis[u] + 1;
                    bfs_order.push_back(v);
                }
            }
            cur++;
        }

        vector<int> end_point;
        end_point.push_back(n - 1);
        memset(vis, false, sizeof vis);
        memset(pre, 0, sizeof pre);
        vis[n - 1] = true;
        cur = 0;
        int mindis = dis[n - 1];
        while (cur < end_point.size()) {
            int u = end_point[cur];
            for (int i = head[u]; i != -1; i = e[i].next) {
                int v = e[i].to;
                if (e[i].w == 0 && !vis[v]) {
                    end_point.push_back(v);
                    pre[v] = u;  // 实际顺序是反的
                    vis[v] = true;
                    mindis = min(mindis, dis[v]);
                }
            }
            cur++;
        }

        bool leading_zeros = true;  // 当前bfs是否还在前导零中
        for (int l = mindis; l > 0; l--) {
            int now = INF;
            vector<int> next_point;
            for (auto& u : end_point) {
                for (int i = head[u]; i != -1; i = e[i].next) {
                    int v = e[i].to;
                    if (dis[v] + 1 == l) {
                        now = min(now, e[i].w);
                    }
                }
            }

            if (now != 0) leading_zeros = false;
            if (l == 1 || !leading_zeros) cout << now;

            for (auto& u : end_point) {
                for (int i = head[u]; i != -1; i = e[i].next) {
                    int v = e[i].to;
                    if (dis[v] + 1 == l && e[i].w == now && !vis[v]) {
                        vis[v] = true;
                        next_point.push_back(v);
                        pre[v] = u;
                    }
                }
            }
            end_point = next_point;
        }
        if (leading_zeros) cout << 0; // 都是0的情况
        cout << endl;
        vector<int> path;
        int u = 0;
        path.push_back(u);
        while (u != n - 1) {
            u = pre[u];
            path.push_back(u);
        }
        cout << path.size() << endl;
        for (auto& i : path) {
            cout << i << ' ';
        }
        cout << endl;
    }


   protected:
    struct Edge {
        int to, next, w;
    } e[MAXN * 2];
    int head[MAXN];
    int ecnt;
    int n;

    int dis[MAXN];
    bool vis[MAXN];
    int pre[MAXN];
};

int main() {
    int n = read();
    int m = read();
    auto graph = new lfs(n);
    for (int i = 1; i <= m; i++) {
        int u = read();
        int v = read();
        int w = read();
        graph->addde(u, v, w);
    }
    graph->solve();
}
```