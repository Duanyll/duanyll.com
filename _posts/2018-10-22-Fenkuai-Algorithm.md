---
date: 2018-10-22
author: Duanyll
tags: ["OI","算法","分块"]
title: 初步认识分块算法
---

> 我实在太弱了，连分块算法都不知道，现在才学。

<!-- more -->

分块算法可以解决区间查询功能，可以替代线段树，代码量比线段树少。分块算法的思想是把原始数组分为多个大小相等的连续的块，每次对单个元素或整块操作，下面以求区间和为例。

## 初始化

分块一般需要以下变量：

```cpp
int v[MAXN];              //单个元素的值
int atag[MAXN],sum[MAXN]  //每一块lazytag，每一块的和
int bl[MAXN],blo;         //每个元素属于那一块，每块的元素个数
```

根据某种数学公式可以得出分块每块的大小为`sqrt(n)`时效率最高，不难写出以下代码：

```cpp
blo = sqrt(n);
for(int64 i = 1;i<=n;i++){
    v[i] = read();
    bl[i] = (int64)(i-1)/blo+1;
    sum[bl[i]]+=v[i]; 
}
```

## 区间更新

分为三个步骤，单点更新l到下一个整块，更新中间的整块，单点更新最后剩下单点。箭头处代码处理l和r在同一块的特殊情况。

```cpp
void add(int64 l,int64 r,int64 x){
    int64 first = min(r,bl[l]*blo); //<--- 
    for(int64 i = l;i<=first;i++){  
        v[i]+=x;
        sum[bl[i]]+=x;
    }
    for(int64 i = bl[l]+1;i<=bl[r]-1;i++){
        atag[i]+=x;
    }
    if(bl[l]!=bl[r]){               //<---
        for(int64 i = (bl[r]-1)*blo+1;i<=r;i++){
            v[i]+= x;
            sum[bl[i]]+=x;
        }
    }    
}
```

## 区间查询

类似区间更新，不要忘了lazy

```cpp
int64 query(int64 l,int64 r){
    int64 first = min(r,bl[l]*blo);
    int64 ans = 0;
    for(int64 i = l;i<=first;i++){
        ans+=v[i]+atag[bl[i]];
    }
    if(bl[l]!=bl[r]){
        for(int64 i = (bl[r]-1)*blo+1;i<=r;i++){
            ans+=v[i]+atag[bl[i]];
        }
    }
    for(int64 i = bl[l]+1;i<=bl[r]-1;i++){
        ans+=atag[i]*blo+sum[i];
    }
    return ans;
}
```

注意分块算法涉及for循环操作较多，经`KING_LRL`提醒，`i`使用`register int`能有效提升速度。分块算法最坏情况时间复杂度为O(3*sqrt(n))。
