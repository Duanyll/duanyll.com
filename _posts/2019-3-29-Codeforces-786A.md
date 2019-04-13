---
title: CF786A Berzerk
author: duanyll
tags: [OI,题解,博弈论]
source: https://www.luogu.org/problemnew/show/CF786A
---

> 切着切着搜索水题就做到它了。鉴于我还没有正式的学过博弈论，就写篇题解纪念一下吧。

## 题意

有一个物品放在n个排成一圈的点上，初始放在第2到n号点，甲乙各有一个数集，每次操作时可以将这个物品向后移动s格(s是集合中的数)，判断物品位于每个起始位置时，二人的胜负情况。

<!-- more -->

## 分析

结论：能转移到必败态的状态就是必胜态，只能转移到必胜态的状态就是必败态。（思考一下）

因此就可以从1号点开始倒着dfs，记得判平局(从1号点出发不能到达的就是平局)

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdio>
#include <vector>
using namespace std;

const int MAXN = 7010;
const int INF = 0x3f3f3f3f;

vector<int> s[2];
bool ans[MAXN][2];
bool vis[MAXN][2];
int cnt[MAXN][2];	//统计当前状态可以到达的必胜态的数量 
int n;

void dfs(int pos,int player){
	if(vis[pos][player]){
		return;
	}
	clog << pos << ' ' << player << endl;
	vis[pos][player] = true;
	int last = 1-player;
	for(int i = 0;i<s[last].size();i++){
		int v = (pos - s[last][i] + n - 1)%n + 1;
		if(v == 1){
			continue;
		}
		if(ans[pos][player]){
			cnt[v][last]++;
			if(cnt[v][last] == s[last].size()){
				ans[v][last] = false;
				dfs(v,last);
			}
		}else{
			ans[v][last] = true;
			dfs(v,last);
		}
	}
}

int main(){
	cin >> n;
	int k0;
	cin >> k0;
	for(int i = 1;i<=k0;i++){
		int x;
		cin >> x;
		s[0].push_back(x);
	}
	int k1;
	cin >> k1;
	for(int i = 1;i<=k1;i++){
		int x;
		cin >> x;
		s[1].push_back(x);
	}
	dfs(1,0);
	dfs(1,1);
	for(int i = 2;i<=n;i++){
		if(vis[i][0]){
			if(ans[i][0]){
				cout << "Win ";
			}else{
				cout << "Lose ";
			}
		}else{
			cout << "Loop ";
		}
	}
	cout << endl;
	for(int i = 2;i<=n;i++){
		if(vis[i][1]){
			if(ans[i][1]){
				cout << "Win ";
			}else{
				cout << "Lose ";
			}
		}else{
			cout << "Loop ";
		}
	}
	cout << endl;
}
```
