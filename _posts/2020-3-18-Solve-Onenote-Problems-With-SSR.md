---
title: 解决 Onenote UWP 版与某不可名状软件搭配使用的同步失败问题
author: duanyll
tags: [废话]
---

UWP 存在一个网络隔离机制使得程序无法正常访问 `localhost`, 表现为 Onenote UWP 版在搭配某不可名状软件使用时界面显示同步失败, 但是网页版上看内容都在.

解决方法: 管理员终端运行

```ps1
.\CheckNetIsolation.exe loopbackexempt -a -p=SID
```

`SID` 可以去注册表里找.

```
\HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\AppContainer\Mappings\
```