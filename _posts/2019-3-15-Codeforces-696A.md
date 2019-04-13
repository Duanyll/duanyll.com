---
title: CF696A Lorenzo Von Matterhorn
tags: [OI,题解,思维题]
author: duanyll
source: https://www.luogu.org/problemnew/show/CF696A
---

> 我打赌这道题如果`n=1e5`，绝对八成的人都会打树剖

然而n高达1e18，所以建图是不可能的了。注意观察q只有1000，就是说只会涉及最多2000个点，因此就可以离散化+LCA瞎搞。然而这是一颗满二叉树，所以不用建图，直接开一个`map<int64,int64>`表示每个节点到父亲的距离，按照LCA的求法边跳边更新答案就是了。

2000个点，最多处理2000*64次边，爆不了。

```cpp
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <vector>
#include <map>
using namespace std;

typedef long long int64;

const int MAXN = 500010;
const int INF = 0x3f3f3f3f;

map<int64,int64> dis;

int main(){
	int q;
	cin >> q;
	for(int i = 1;i<=q;i++){
		int64 opr,a,b;
		cin >> opr >> a >> b;
		if(opr == 1){
			int64 w;
			cin >> w;
			while(a != b){
				if(a < b){
					swap(a,b);
				}
				dis[a] += w;
				a >>= 1;
			}
		}else{
			int64 ans = 0;
			while(a != b){
				if(a < b){
					swap(a,b);
				}
				ans += dis[a];
				a >>= 1;
			}
			cout << ans << endl;
		}
	}
} 
```
