---
title: 2022 UESTC ICPC Training for Dynamic Planning
author: duanyll
tags: ["OI", "题解", "动态规划"]
source: http://acm-uestc-edu-cn-s.vpn.uestc.edu.cn:8118/contest/172/summary
---

## A

首先考虑经典的 $O(mn)$ LCS 做法:

$$
dp[i][j] =
\begin{cases}
dp[i-1][j-1]+1,  & a[i]=b[j] \\
\textrm{max}(dp[i-1][j],dp[i][j-1]) & a[i]\neq b[j]
\end{cases}
$$

$dp[i][j]$ 指考虑了 $a$ 的前 $i$ 个字符和 $b$ 的前 $j$ 个字符的答案. 本题中公式涉及到 $a,b$ 长度的项, 只需要转移的时候相应地加上在 $a$ 或者 $b$ 方向上拓展的长度即可. 注意到 $-y,-z$ 是负数, 因此$a[i]=b[j]$进行拓展并不一定是最优解, 所以这个时候也要进行不拓展的转移. 于是得到求完整答案的转移方式: 

$$
dp[i][j] =
\begin{cases}
\textrm{max}(dp[i-1][j-1]+x-y-z, dp[i-1][j]-z,dp[i][j-1]-y)  & a[i]=b[j] \\
\textrm{max}(dp[i-1][j]-z,dp[i][j-1]-y) & a[i]\neq b[j]
\end{cases}
$$

在考虑如何只求子串的答案. 子串的终点容易处理, 直接最后取所有 $dp[i][j]$ 的最大值即可, 至于子串的起点, 可以通过每次转移时增加一种直接从头开始的转移方式, 即 $a[i]=b[j]$ 时, 允许直接转移 $x-y-z$; $a[i]\neq b[j]$ 时, 转移 $-y-z$. 最终的 dp 方程:

$$
dp[i][j] =
\begin{cases}
\textrm{max}\left(\begin{aligned}
    & dp[i-1][j-1]+x-y-z, \\
    & dp[i-1][j]-z, \\
    & dp[i][j-1]-y, \\
    & x - y -z
\end{aligned}\right)  & a[i]=b[j] \\
\textrm{max}\left(\begin{aligned}
    & dp[i-1][j]-z, \\
    & dp[i][j-1]-y, \\
    & - y -z
\end{aligned}\right) & a[i]\neq b[j]
\end{cases}
$$

## D

随便都能想到的 $dp[i][x][y][z]$, 处理完 $a_i$ 后三个机械臂分别位于 $x,y,z$ 处, 转移方式非常显然, 但明显 $O(nm^4)$ 跑不过, 需要考虑化简状态.

首先, 三个机械臂的顺序不重要. 并且, 处理完 $a_i$ 后有一个机械臂一定位于 $a_i$ 处, $n\geq2$ 时还有一个机械臂一定位于 $a_{i-1}$ 处, 因为刚刚处理了 $a_{i-1}$ 的机械臂并不能被移动. 这样就压缩到了 $O(nm)$, 已经可以直接跑了. 所以考虑状态表示 $dp[i][j]$ 表示处理完 $a_i$ 后, 有一个机械臂位于 $a_i$, 另一个 $a_{i-1}$ 剩下一个位于 $j$ 处. 转移方式是考虑用 $a_{i-1}$ 处的机械臂或者 $a_j$ 处的机械臂去点 $a_{i+1}$ ($a_i$ 刚刚用过不能再用了).

写出 dp 方程:

```cpp
auto dis = [&](int x, int y) -> int {
    return min(abs(x - y), m - abs(x - y));
};

dp[i + 1][j] =
    min(dp[i + 1][j], dp[i][j] + dis(a[i - 1], a[i + 1]));
dp[i + 1][a[i - 1]] =
    min(dp[i + 1][a[i - 1]], dp[i][j] + dis(j, a[i + 1]));
```

其中 `dis(x, y)` 是 $x\to y$ 移动的距离.

处理初值: 考虑点了 $a_1,a_2$ 后, 还有哪个机械臂没有动过. 一共有 6 种情况:

```cpp
dp[2][s1] = min(dis(s2, a[1]) + dis(s3, a[2]), dis(s2, a[2]) + dis(s3, a[1]));
dp[2][s2] = min(dis(s1, a[1]) + dis(s3, a[2]), dis(s1, a[2]) + dis(s3, a[1]));
dp[2][s3] = min(dis(s1, a[1]) + dis(s2, a[2]), dis(s1, a[2]) + dis(s2, a[1]));
```

## H

给一棵树，节点权值1或-1，选一个连通块使得连通块内点权值之和最大，问最大权值之和。“指挥中心”的存在对问题并不重要，但对于思考问题很有提示。

树形DP的基本套路：考虑某个子树中的答案如何转移到父亲节点中.
树根没有特殊的性质，可放心规定 1 做树根.
定义`dp1[u]`表示在 u 的子树中，选择 u 及其他节点的权值.
那么初值是显然的：`dp1[u] = (a[u] == 1) ? 1 : -1`.
从子树转移答案，过程很贪心，只需选择答案大于 0 的孩子：
`if (dp1[v] > 0) dp1[u] += dp1[v]`.
通过一次dfs完成以上转移，处理出每个节点子树方向的答案。

但每个节点的完整答案还应该包含选择父亲方向的情况。因此需要再进行一次从父亲到孩子的转移，可再利用一次DFS过程。
定义`dp2[u]`表示某个节点的完整答案。
从树根出发，树根没有父亲，有初值`dp2[u] = dp1[u]`.
树形DP从父亲转移到孩子，往往要考虑父亲有没有选择某个孩子.
如果fa没有选择u的子树，即`dp1[u] < 0`.
直接考虑是否要合并父亲的答案.
`dp2[u] = max(dp1[u], dp1[u] + dp2[fa])`.
如果fa选择了u的子树，
说明u位于fa的连通块中，fa的答案已经包含了u的答案，不用再重复加了.
`dp2[u] = max(dp1[u], dp2[fa])`.

## I

首先考虑如何求出每个区间自身的答案. 不断两两求异或的过程非常类似与求杨辉三角中两两求和的过程, 根据杨辉三角的性质容易得到转移区间答案的方式:

```cpp
dp1[l][r] = dp1[l + 1][r] ^ dp1[l][r - 1];
```

可以通过一个显然的 $O(n^2)$ 区间 dp 实现.

要求每个区间内答案的最大值, 再跑一趟显然的区间 dp:

```cpp
dp2[l][r] = max(max(dp2[l + 1][r], dp2[l][r - 1]), dp1[l][r]);
```

这样就预处理出了所有区间的答案, 直接回答即可.

## K

求图上两点间给定步数的路径数量, 是典型的 Floyd 传递闭包. 而 Floyd 传递闭包的本质是矩阵乘法, 所以看到巨大的 $t$, 可以用矩阵快速幂优化. 扬子鳄的周期较短, $\textrm{lcm}(2,3,4)$ 仅为 12, 所以 每个周期内的时刻, 

```
[0]  0  -> 1
[1]  1  -> 2
[2]  2  -> 3
...
[11] 11 -> 0
```

12 周期内, 每个时刻可行的转移方式都可以预处理出来, 在完整邻接矩阵的基础上删除有扬子鳄的点的入边就行(出边不用删). 完整的 12 周期用矩阵快速幂处理, 剩下的余数把相应的转移矩阵乘起来即可. 

题上似乎没说能不能站在原地不动, 但看样例是不行的. 所以初始的矩阵应该用零矩阵而不是单位矩阵.

## L

将严格单增转化为不减序列, 只需要做变换 $a_i \gets a_i-i$, 那么, 所有 LIS 以外的部分都一定要被调整, 所以答案就是总长度减去 LIS 的长度. 

附简洁 LIS 写法:

```cpp
memset(lis, INF, sizeof lis);
for (int i = 1; i <= n; i++) {
    *upper_bound(lis + 1, lis + n + 1, a[i]) = a[i];
}
int len = 0;
while (lis[len + 1] != INF) len++;
```

`upper_bound` 本身返回一个指针, 所以可以直接赋值. 注意输出答案的时候开 `int64`.

## M

~~[https://oeis.org/A001250](https://oeis.org/A001250)~~

## O

多重背包模版.

$$
dp[j + k * c_i] = \max(dp[j]) + k * v_i
$$

直接上单调队列优化, 背包模板不妨直接贴代码.

```cpp
for (int i = 1; i <= n; i++) {
    int64 v = read(); // 价值
    int c = read(); // 重量
    int m = read(); // 数量
    for (int j = 0; j < c; j++) {
        deque<int64> q;    // 这个队列存所有最近 m 次转移的结果
        deque<int64> qval; // 只存具有单调性的最优转移结果
                           // 实际上可以只用一个存下标的队列来代替两个队列
        for (int k = 0; j + k * c <= w; k++) {
            // 利用队列的长度控制物品最多选择的数量
            if (q.size() > m) {
                if (qval.front() == q.front()) {
                    qval.pop_front();
                }
                q.pop_front();
            }
            int64 cur = dp[j + k * c] - k * v; // 应该排除掉随 k 变化的项
            q.push_back(cur); // 总队列入队
            while (!qval.empty() && qval.back() < cur) qval.pop_back();
            qval.push_back(cur); // 单调队列入队
            dp[j + k * c] = qval.front() + k * v; // 直接选取最优的物品个数转移
        }
    }
}
```

## R

~~好怪的树形 DP。~~

注意到在整个过程中，只有归零之后走到的节点的权重才对答案有影响，也就是说，从根节点到叶子节点的路径可以分为三部分，前一部分是要触发归零的，中间一部分是要统计到答案之中的，最后可能还有一部分是叶子末端不划算不走的。更进一步思考，第一部分归零之后的节点的子树都应该作为第二三部分来考虑。于是可以设计给子树设计出两种状态，`dp1` 表示第二三种情况，不会再归零时的答案，`dp2` 表示第一种情况，还可能再归零时的答案。可以设计出如下转移方式：

```cpp
dp1[u] = a[u];
dp1[u] += max(dp1[v], 0);
dp2[u] += max(dp1[v], dp2[v]);
```

由于不能保证整个过程中归零操作一定存在，答案应该取 `max(dp1[1], dp2[1])`

## V

首先，注意到只能选择一种票，而且距离长的票可以取代距离短的票，所以扫一遍去除距离短价格高的票，然后剩下的票在距离和价格上都是单调的，可以二分答案。之后考虑如何 `check`，可以写出如下 DP 方程来求到终点的最小时间

```cpp
dp[i] = min(dp[j] + d[i]); // i - j <= mid
```

则答案是从 `n - d + 1` 到 `n` 范围内最小的 dp 值。

直接枚举 j 转移显然超时，可以考虑用单调队列优化。利用单调队列维护 `[i - d + 1, i]` 的一段滑动窗口，队列内元素从左到右从大到小排序，超出范围的元素从左侧出队，没有当前值优秀的元素从右侧出队，然后当前值从右侧进队。每个元素最多进队一次，出队一次，可保证 $O(n)$ 的复杂度。

## X

要把树上根节点出发的所有到叶子的路径长度全部填充成一样，应该全部补充到根节点出发到最远叶子节点的距离。所以先一边 DFS 处理出每个节点到最远叶子的距离：`dp[u] = max(dp[v] + w)`。 然后容易贪心地证明，在更靠近根节点的位置增加路径长度更优。所以，再用一遍 DFS，从根节点出发，依次将每条路径补充到孩子的最长路径长度等于全局最长，然后递归处理还没有补足长度的路径，下传已经补全的长度。

## Z

零一背包模板。只需要注意到滚动数组时更新顺序很重要，从上到下枚举重量时，不会从该物品已经选取过的状态转移，所以物品只选取一次，成为零一背包；而从小到大枚举时，会从该物品已经处理过的状态转移，所以物品会选取多次，成为多重背包。