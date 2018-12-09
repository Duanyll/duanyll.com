---
layout: post
title: "PlaneGame正在施工中"
tags: [项目,施工现场,PlaneGame]
comment: true
published: true
date: 2018-8-17
author: Duanyll
---

[施工现场直通车](https://github.com/duanyll/PlaneGame/)

<!-- more -->

这个项目我今年一月份就想做了，但是没有什么经验，特别是当时对WPF一无所知，浪费了很多时间在GUI和git上，结果“一个月”过了只画出一个巨丑无比的主界面菜单。对oop的理解也不够深入，定义了一堆接口写不出实现。特别是浪费了大量时间摆弄git，最后发现单人开发就在master分支上一条线就够了，不用那么麻烦。当时还对网络通信一点概念都没有。最后留下了一片稀烂的代码。

所以我选择了删库重来，现在几天的进度已经比整个一月份快得多了。

施工中心得体会

1. WPF的数据绑定真好用
2. 程序的架构一定要先做好规划，尽量不要中途来改，很麻烦
3. 一个类的方法的抽象层次要统一，不然很难发现那里忘记实现或者重复实现

如果你对PlaneGame有问题，发现了BUG，或者是有什么建议，请到[Issues](https://github.com/duanyll/PlaneGame/issues)。