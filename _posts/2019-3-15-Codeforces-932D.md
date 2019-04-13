---
title: CF932D Tree
tags: [OI,题解,LCA]
author: duanyll
source: https://www.luogu.org/problemnew/show/CF932D
---

## 题意

一棵树开始只有一个1号点，权值为0，两种操作：

- `1 R W` 在R号点下面加一个cnt+1号点
- `2 R X` 从R号点开始向祖先走，依次选择R的祖先，要求权值依次增大，且已选择的点权值之和小于X，输出最多能选几个点

强制在线

## 题解

观察发现只要记录当前已选点序列中的最远点，就可以倍增合并两段的点权之和，回答时与X比较即可

由于新的点只会是叶节点，就可以在加点时倍增预处理出该点向上选取`1<<i`个合法点时的最远点和此时的点权之和。详见代码。

```cpp
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <vector>
using namespace std;

typedef long long int64;

const int MAXN = 500010;
const int64 INF = 0x3f3f3f3f3f3f3f3fll;

int fa[MAXN][22];	//向上跳1<<i个权值大于u的点的编号，忽视权值小于u的点 
int64 w[MAXN];
int64 sum[MAXN][22];	//到第1<<i个满足要求的祖先的和 

void adde(int u,int v){
	if(w[u] >= w[v]){
		fa[v][0] = u;
	}else{
		for(int i = 20;i>=0;i--){
			if(w[fa[u][i]] < w[v]){
				u = fa[u][i];
			}
			fa[v][0] = fa[u][0];
		}
	}
	sum[v][0] = w[fa[v][0]];
	for(int i = 1;i<=20;i++){
		fa[v][i] = fa[fa[v][i-1]][i-1];
		if(fa[v][i] != 0){	//防爆int64
			sum[v][i] = sum[v][i-1] + sum[fa[v][i-1]][i-1];
		}else{
			sum[v][i] = INF;
		}		
	} 
}

int query(int r,int64 x){
	if(w[r] > x){
		return 0;
	}
	x -= w[r];
	int now = r,ans = 1;
	for(int i = 20;i>=0;i--){
		if(x - sum[now][i] >= 0){
			x -= sum[now][i];
			ans += 1<<i;
			now = fa[now][i];
		}
	} 
	return ans;
}

#include <cctype>
#include <cstdio>

inline int64 read() {
    int64 X = 0, w = 0;
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

template<typename T>
inline void write(T x) {
    if (x < 0) putchar('-'), x = -x;
    if (x > 9) write(x / 10);
    putchar(x % 10 + '0');
}

int main(){
	w[0] = INF;	//边界条件  
	memset(sum[1],INF,sizeof sum[1]);
	int64 last = 0;
	int q,cnt = 1;
	cin >> q;
	for(int i = 1;i<=q;i++){
		int64 opr,a,b;
		opr = read();
		a = read();
		b = read();
		a ^= last;
		b ^= last;
		//clog << a << ' ' << b << endl;
		if(opr == 1){
			w[++cnt] = b;
			adde(a,cnt);
		}else{
			last = query(a,b);
			write(last);
			putchar('\n');
		}
	}
}
```

注意INF要开int64，被坑了好久
