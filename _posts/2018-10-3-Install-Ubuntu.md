---
layout: post
tags: ["linux","教程"]
title: 单硬盘安装Ubuntu18.04与Win10
author: Duanyll
---

最近研究 .net core，wsl用的一点也不爽(图形界面太卡了，还一堆Bug，字体也不好看)，遂决定安装Ubuntu双系统，基本上没有什么困难，下面是我的安装方法(没有多少截图，忘截了)，因为用UEFI，就用不着双硬盘了

<!-- more -->

1. 去[Ununtu官网](https://www.ubuntu.com/download/desktop)下载iso镜像，速度不错
2. 准备一个容量大于4G的移动硬盘（U盘也行），划分一个4G大小的`FAT32`分区或删掉原有文件，**直接**将ISO镜像里面的所有内容 **复制粘贴**到空分区里面，**不用** 特地创建引导。（因为用了UEFI）
3. 用磁盘管理或者别的什么软件在硬盘里划出60G空闲空间，**不要** 建立分区。
4. 如果托盘区里面有一个 `英特尔快速存储技术`，就要关掉它，请一定严格按照下列步骤操作，否则win10可能变砖
   1. 关闭win10快速启动
   2. 进入设置（immersive control panel）> 更新与安全 > 恢复 > 立即重新启动 > 疑难解答 > 更多选项 > 高级启动
   3. 进入UEFI设置，找到`英特尔快速存储技术`并关闭他（我的电脑是在`SATA Options`里面从`Raid On`改成`AHCI`）
   4. 退出UEFI设置，开机按F4进入安全模式，登陆进入桌面后重启电脑
5. 重启，进入`Boot Menu`，关闭`secure boot`，启动模式设为`UEFI Only`，如果此时`Boot Menu`里面没有你的U盘，那就放弃这篇教程吧
6. 选择你的U盘，弹出Grub的菜单，选`Try Ubuntu without installing`
7. 如果U盘性能足够，很快就进入Ubuntu桌面环境了，双击打开桌面的`Install Ubuntu 18.04 LTS`
8. 语言选中文，联不联网随意，下一步下一步下一步
9. 这一步很关键，别听其他教程把事情搞复杂，如果第一条提到了`windows boot manager`或者与其他系统共存什么的就选它没有错
10. 下一步下一步
11. 重启电脑，Ubuntu应该已经是启动项第一位了，开机你会看到一个Grub选单，里面有Windows有Ubuntu，自己选
12. 如果想默认启动Windows，就去UEFI里面把`windows boot manager`排前面
13. 你可以把Windows的快速启动打开了（别开`secure boot`和`英特尔快速存储技术`）

Ubuntu中文输入法教程很多，自己看（系统自带的很垃圾，建议用搜狗）