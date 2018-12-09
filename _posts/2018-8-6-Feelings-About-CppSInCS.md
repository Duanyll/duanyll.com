---
layout: post
title: "一次对.Net Framework的失败的挑战"
tags: [废话,感想,项目,dotnet,咕咕咕]
comment: true
published: true
date: 2018-8-31
author: Duanyll
---

一次失败的尝试。

<!-- more -->

这件事是这样的：我在调试PlaneGame时，发现C#对控制台输入输出的支持太不方便了。比如说从键盘读取三个整数，C++可以这样写：

```cplusplus
cin >> a >> b >> c;
```

或者是这样

```cplusplus
scanf("%d%d%d",&a,&b,&c);
```

都很方便。但是用C#，就得这样写：

```csharp
string temp = Console.ReadLine();
string[] vs = temp.Split(' ');
a = int.Parse(vs[0]);
b = int.Parse(vs[1]);
c = int.Parse(vs[2]);
```

下次再说。