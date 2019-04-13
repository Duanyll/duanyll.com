---
title: CF95B Lucky Numbers [毒瘤分类讨论贪心/DFS]
tags: [OI,题解,贪心,思维题]
author: duanyll
source: https://www.luogu.org/problemnew/show/CF95B
---

其实代码用不着这么多goto，不过写着方便~

详细分析有时间再写吧

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdio>
using namespace std;

const int MAXN = 1e5+10;

char a[MAXN],ans[MAXN];
int n;

int main(){
	cin >> (a+1);
	int n = strlen(a+1);
	if(n & 1){
ODD_N:
		for(int i = 1;i<=n/2 + 1;i++){
			putchar('4');
		}
		for(int i = 1;i<=n/2 + 1;i++){
			putchar('7');
		}
		putchar('\n');
	}else{	
		int lead4 = 0,lead7 = 0,now = 1;
		while(now <= n){
			if(a[now] < '4'){
				break;
			}else if(a[now] == '4' && lead4 < n/2){
				ans[now] = '4';
				lead4++;
				now++;
			}else if(a[now] < '7' && lead7 < n/2){
				ans[now] = '7';
				lead7++;
				break;
			}else if(a[now] == '7' && lead7 < n/2){
				ans[now] = '7';
				lead7++;
				now++;
			}else{
				goto TRY_LAST_USE_7;
			}
		} 
		if(false){
TRY_LAST_USE_7:
			while(--now){
				if(ans[now] == '4'){
					lead4--;
				}else{
					lead7--;
				}
				if(ans[now] < '7' && lead7 < n/2){
					ans[now] = '7';
					lead7++;
				 	goto OUTPUT;
				}
			}
			goto ODD_N;
		}
OUTPUT:
		for(int i = 1;i<=lead4 + lead7;i++){
			putchar(ans[i]);
		}
		for(int i = 1;i<=n/2 - lead4;i++){
			putchar('4');
		}
		for(int i = 1;i<=n/2 - lead7;i++){
			putchar('7');
		}
		putchar('\n');
	}
}
```
