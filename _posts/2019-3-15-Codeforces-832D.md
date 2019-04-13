---
title: CF832D Misha, Grisha and Underground
tags: [OI,题解,LCA]
author: duanyll
source: https://www.luogu.org/problemnew/show/CF832D
---

简单LCA求距离，令a为汇合点，那么答案就是`(dis(a,b) + dis(a,c) - dis(b,c)) / 2 + 1`，dis用lca求出，枚举a就好。

当然也可以一一讨论abc的位置关系，不过容易出错。

```cpp
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 100010;
const int INF = 0x3f3f3f3f;

class LFS {
   public:
    LFS() {
        memset(head, -1, sizeof head);
        ecnt = 0;
        n = 0;
    }
    LFS(int N) {
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

   protected:
    struct Edge {
        int to, next, w;
    } e[MAXN * 2];
    int head[MAXN];
    int ecnt;
    int n;

   private:
    virtual void dfs(int u, int fa) {
        for (int i = head[u]; i != -1; i = e[i].next) {
            int v = e[i].to;
            if (v != fa) {
                dfs(v, u);
            }
        }
    }
};

class LCA : public LFS{
   public:
   	int dep[MAXN];
    LCA(int n) : LFS(n) {
        memset(dep, -1, sizeof dep);
    }
    void pre(int rt = 1) { dfs(rt, 1, 0); }
    int querylca(int a, int b) {
        if (dep[a] > dep[b]) swap(a, b);
        int h = dep[b] - dep[a];
        for (int i = 20; i >= 0; i--) {
            if(h & (1 << i)) {
				b = f[b][i];
			}
        }
        if (a == b) return a;
        for (int i = 20; i >= 0; i--) {
            if (f[a][i] == f[b][i]) continue;
            a = f[a][i];
            b = f[b][i];
        }
        return f[a][0];
    }
    
    int querydis(int a,int b){
    	int lca = querylca(a,b);
    	return dep[a] + dep[b] - dep[lca]*2;
    }

   protected:
    int f[MAXN][22];

   private:
    void dfs(int u, int d, int fa) {
        dep[u] = d;
        f[u][0] = fa;
        for (int i = 1; i < 21; i++) {
            f[u][i] = f[f[u][i - 1]][i - 1];
        }
        for (int i = head[u]; i != -1; i = e[i].next) {
            int v = e[i].to;
            if (dep[v] == -1) {
                dfs(v, d + 1, u);
            }
        }
    }
};

#include <cctype>
#include <cstdio>

inline int read() {
    int X = 0, w = 0;
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

int solve(LCA* tree,int a,int b,int c){
	int disab = tree->querydis(a,b);
	int disac = tree->querydis(a,c);
	int disbc = tree->querydis(b,c);
	return (disab + disac - disbc) / 2 + 1;
}

int main(){
	int n,q;
	cin >> n >> q;
	LCA* tree = new LCA(n);
	for(int i = 2;i<=n;i++){
		int a;
		cin >> a;
		tree->addde(i,a,1);
	}
	tree->pre();
	for(int i = 1;i<=q;i++){
		int a,b,c;
		cin >> a >> b >> c;
		int ans = 0;
		ans = max(solve(tree,a,b,c),max(solve(tree,b,a,c),solve(tree,c,a,b)));
		cout << ans << endl;
	}
}
```
