---
title: CSP 考前急救
author: duanyll
tags: [OI]
---

## 背板

### Exgcd 求逆元

```cpp
int64 exgcd(int64 a, int64 b, int64& x, int64& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int64 d = exgcd(b, a % b, x, y);
    int64 tmp = x;
    x = y;
    y = tmp - a / b * y;
    return d;
}

int64 inv1(int64 a, int64 mod) {
    int64 x, y;
    exgcd(a, mod, x, y);
    return (x % mod + mod) % mod;  
}
```

### 线性递推逆元

```cpp
inv[1] = 1;
for (int i = 2; i <= n; i++) {
    inv[i] = p - (p / i) * inv[p % i] % p;
}
```

### 矩阵乘法

```cpp
template <typename T, size_t h, size_t w, size_t w1>
matrix<T, h, w> operator*(const matrix<T, h, w1>& a, const matrix<T, w1, w>& b) {
	matrix<T, h, w> ans;
	for (size_t k = 0; k < w1; k++) {
		for (size_t i = 0; i < h; i++) {
			if (a[i][k] == 0) continue;
			for (size_t j = 0; j < w; j++) {
				ans[i][j] += a[i][k] * b[k][j];
				ans[i][j] %= MOD;
			}
		}
	}
	return ans;
}
```

关键一句话: 

```cpp
ans[i][j] += a[i][k] * b[k][j];
```

### 有关组合数

```cpp
int64 a = 1, b = 1;
for (int i = 0; i < m; i++) {
	a = a * (n - i) % mod;
	b = b * (i + 1) % mod;
}
return a * pow(b, mod - 2, mod) % mod;
```

卢卡斯定理

```cpp
lucas(n, m, mod) {
    return lucas(n / mod, m / mod, mod) * c(n % mod, m % mod, mod) % mod;
}
```

### tarjan scc

```cpp
void tarjan(int u) {
    dfn[u] = low[u] = tim++;
    s.push(u);
    ins[u] = true;
    for (int i = head[u]; i != -1; i = e[i].next) {
        int v = e[i].to;
        if (dfn[v] == -1) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else {
            if (ins[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }
    }
    if (dfn[u] == low[u]) {
        scccnt++;
        int v = 0;
        while (v != u) {
            v = s.top();
            s.pop();
            ins[v] = false;
            belong[v] = scccnt;
        }
    }
}
```

### tarjan 割顶

```cpp
void dfs(int u, int fa) {
    int cc = 0;
    dfn[u] = low[u] = tim++;
    for (int i = head[u]; i != -1; i = e[i].next) {
        int v = e[i].to;
        if (dfn[v] == -1) {
            dfs(v, u);
            cc++;
            low[u] = min(low[u], low[v]);
            if (fa != -1 && low[v] > dfn[u]) {
                ans.push_back(u);
            }
        } else if (v != fa) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (fa == -1 && cc >= 2) {
        ans.push_back(u);
    }
}
```

DFS 后要对 ans 进行 `unique` 操作, 或直接用 `set`.

### tarjan bcc

```cpp
void dfs(int u, int fa) {
    dfn[u] = low[u] = ++tim;
    for (int i = head[u]; i != -1; i = e[i].next) {
        int v = e[i].to;
        if (v == fa) continue;
        if (dfn[v] == 0) {
            s.push(make_pair(u, v));
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] >= dfn[u]) {
                vector<int> cur;
                bcccnt++;
                pair<int, int> now;
                do {
                    now = s.top();
                    s.pop();
                    if (color[now.first] != bcccnt) {
                        cur.push_back(now.first);
                        color[now.first] = bcccnt;
                        belong[now.first].push_back(bcccnt);
                    }
                    if (color[now.second] != bcccnt) {
                        cur.push_back(now.second);
                        color[now.second] = bcccnt;
                        belong[now.second].push_back(bcccnt);
                    }
                } while (!(now.first == u && now.second == v));
                bccs.push_back(cur);
            }
        } else if (dfn[v] < dfn[u]) {
            s.push(make_pair(u, v));
            low[u] = min(low[u], dfn[v]);
        }
    }
}
```

### EK 网络流

思想: 暴力 BFS 找增广路.

```cpp
int flow = 0;
while (true) {
    memset(a, 0, sizeof a);
    queue<int> q;
    q.push(s);
    a[s] = INF;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int i : g[u]) {
            edge& now = e[i];
            if (a[now.to] == 0 && now.cap > now.flow) {
                fa[now.to] = i;
                a[now.to] = min(a[u], now.cap - now.flow);
                q.push(now.to);
            }
        }
        if (a[t] > 0) {  //剪枝：已经找到了一条
            break;
        }
    }
    if (a[t] == 0) {  //没有增广路了
        break;
    }
    for (int u = t; u != s; u = e[fa[u]].from) {
        e[fa[u]].flow += a[t];
        e[fa[u] ^ 1].flow -= a[t];
    }
    flow += a[t];
}
return flow;
```

最小费用流: 每次用 Dijkstra / SPFA 找增广路.

### 树剖

第一遍 DFS 找重儿子, 第二遍 DFS 给点编号. (至少预留 30min 打树剖).

### 线性筛质数

```cpp
void make_prime() {
    prime_cnt = 0;
    memset(isntp, false, sizeof(isntp));
    for (int i = 2; i <= AMXA; ++i) {
        if (!isntp[i]) {
            prime[prime_cnt++] = i;
        }
        for (int j = 0; j < prime_cnt; ++j) {
            if (i * prime[j] > AMXA) {
                break;
            }
            isntp[i * prime[j]] = true;
            if (i % prime[j] == 0) {
                break;
            }
        }
    }
}
```

## STL

> 我个人认为在绝大多数情况下为了卡常而放弃 STL 放弃代码可读性是一种得不偿失的行为.

- `lower_bound` 找第一个大于等于目标的元素
- `upper_bound` 找第一个大于目标的元素

以上两者返回指向目标元素的指针, 减去数组开头地址得到 0 开始的下标.

强行用 `unordered_map` 救急: 

```cpp
#include <tr1/unordered_map>
using std::tr1::unordered_map;
```

## 别的东西

- 背包分清楚要不要重复枚举同一个节点, 从大到小还是从小到大枚举.
- 不要把 DP 状态表示的复杂度当成 DP 转移的复杂度! 实际上很多暴力算法往往转移会比状态表示大一两个数量级!
- 链式前向星记得 `memset(head, -1, sizeof head)`.
- 能不写平衡树就不写平衡树! 真的要写先画图! 坚决不写维护父指针的 splay!
- Dijkstra 能过坚决不写 SPFA!
- 快读快写码完要测试!
- 把 Dev-C++ 的自动保存拉到最快, 重构代码不要删掉原来的!

### 对拍

最好带文件一起对拍.

#### Windows bat

```bat
@echo off
problem_gen
problem
problem_std
fc problem.out problem1.out
if not ERRORLEVEL 1 goto loop
pause
```

#### Linux sh

```sh
while true; do
    ./problem_gen
    ./problem
    ./problem_std
    if diff problem.out problem1.out; then
        printf "AC\n"
    else 
        printf "WA\n"
        exit 0;
    fi
done
```

### 常见的 DFS 优化: 

1. 优化搜索顺序
2. 结合二分
3. 可行性剪枝
4. 最优化剪枝
5. 记忆化
6. 预处理

### 常见的 DP 优化

1. 单调队列 / 单调栈
2. 尝试分治
3. 斜率优化
4. 结合线段树
5. 前缀和优化
6. 矩阵快速幂 (初始参数不多, 转移跨度不大)
7. 不证明结论, 直接瞎贪心

### 吉利模数

- `1e9 + 7`
- `1e7 + 9`
- `998244353`
- `19260817`