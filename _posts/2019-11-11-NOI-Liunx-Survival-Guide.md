---
title: NOI Linux 存活指北
author: duanyll
tags: [OI, Linux]
---

## 启动

### 电子科大考场

在桌面上或开始菜单里有一个叫做 VMWare Workstation 或者 VMWare Player 的软件, 双击运行后, 默认应该已经打开了 NOI Linux 虚拟机的操作界面 (如果没有请咨询考场工作人员). 点击菜单栏上的绿色播放按钮就可以运行虚拟机了. 你可以全屏或者窗口化运行虚拟机.

### CDFLS

镜像列表里面有一个 NOI Linux 选项, 选他就是了.

注意事项:

1. 分辨率要自己设, 右上角菜单 > 设置 > 显示
2. 要上网的话, IP 要自己设, 右上角 WiFi 图标 > 连接属性 > wired connection 2 > 属性 > ipv4, 自己看着办.
3. 拖动窗口时轻拿轻放, 遇到花屏就用另一个窗口把花掉的部分挡一下再来.

## 简单的使用

锁屏密码是 `123456`.

CCF 为我们预装了一个叫做 GUIDE 的 C++ IDE, 类似 Dev-C++, 但是界面丑陋, Bug 繁多, 此处不讲解也不推荐使用.

在电子科大的 VMWare 环境下, 你可以直接将 `cpp` 文件和大样例拖到虚拟机的桌面上, 或者直接使用剪贴板复制粘贴文件. 当然, 你也可以直接在 NOI Linux 里写题. 

推荐直接使用终端编译和运行你的程序, 方法如下

1. 按 `Ctrl + Alt + T` 打开终端
2. 输入 `cd Desktop` 切换到桌面 (Linux 严格区分文件名的大小写)
3. 输入 `ls` 查看当前文件夹内容, 确保这里有你的 `cpp`
4. 输入编译指令 (NOIP 的题面 PDF 中有, 直接复制粘贴), 如果你要自己编译, 应该这样:

```sh
g++ filename.cpp -o filename.out -Wall -Wextra
```

注意:

1. 在 Linux 下, 如果一条指令没有任何输出, 说明他执行成功了.
   > 没有消息就是最好的消息
2. 不同于 Windows 的可执行文件一定是 `*.exe` (严谨来说, 还有 `*.com`, `*.bat` 等等), Linux 并不按照扩展名区分是否可执行文件. 也就是说, 可执行文件可以使任意扩展名, 或者没有扩展名 (多数情况是这样). 要执行当前目录下一个叫做 `filename.out` 的可执行文件, 输入 `./filename.out`
3. Linux 对于内存越界等错误的检测更加严格. 
4. 如果你不会 Vim 或者是 Emacs, 请使用 GEdit, 他就是一个普通的记事本.
5. 在终端里复制和粘贴要使用 `Ctrl + Shift + C` 和 `Ctrl + Shift + V`, 按 `Ctrl + C` 终止正在运行的程序(比如无限死循环了), 然而在终端和 Vim / Emacs 以外的地方就是普通的 `Ctrl + C/V` 了.
6. 加栈用 `ulimit -s 1000000000`, 仅对当前终端会话有效.

## vim / Emacs

问 hxy / 百度.

## Arbiter (CCF 御用评测软件)

我也不会用.

## 一些奇怪的预定义函数

- `index`
- `prev`
- `next`
- `data`

这些标识符可以用于重载的函数, 局部变量, 但不能用于全局变量. 

解决全局变量重名的根本办法:

```cpp
#include <bits/stdc++.h>
using namespace std;

namespace solution {
int data, index, prev, next;

void work() {
    cin >> data;
    // ...
    cout << data << endl;
}
}  // namespace solution

int main() { solution::work(); }
```

原理: 存在局部作用域时, 局部作用域中的声明优先被采用.

## 对拍

```sh
g++ example.cpp -o example
g++ example_std.cpp -o example_std
g++ example_dm.cpp -o example_dm
while true; do
    ./example_dm
    ./example_std
    ./example
    if diff example.out example_std.out; then
        printf "AC\n"
    else
        printf "WA\n"
        exit 0
    fi
done
```

文件名保存为 `example.sh`, 在终端中用 `bash example.sh` 运行.