---
author: duanyll
date: 2018-10-18
title: GCC/STL里面不那么常用又很有帮助的函数
tags: ["OI","总结"]
---

今天改以前的错题，发现了几个当初知道干嘛现在搞忘了的函数，能偷懒少写几行代码，再次做一个收集整理。

<!-- more -->

## max_element/min_element/minmax_element

找数组里面最大值或最小值，用法类似`sort`.

```cpp
template <class ForwardIterator, class Compare>
  ForwardIterator max_element (ForwardIterator first, ForwardIterator last,
                               Compare comp);
```

`comp`可以省略,注意返回类型是迭代器.

## accumulate

区间暴力求和.

```cpp
template< class InputIt, class T >
T accumulate( InputIt first, InputIt last, T init );
```

`init`是初始值,一般取0.

## random_shuffle

随机打乱序列.(模拟退火?)

```cpp
template< class RandomIt >
void random_shuffle( RandomIt first, RandomIt last );
```

## uninitialized_fill_n

妈妈再也不用担心memset只能赋char了.

```cpp
template< class ForwardIt, class Size, class T >
void uninitialized_fill_n( ForwardIt first, Size count, const T& value );
```

## G++的__builtin系列

`__builtin_popcount(x)`：x中1的个数

`__builtin_ffs(x)`：返回x中最后一个为1的位是从后向前的第几位(lowbit?)
