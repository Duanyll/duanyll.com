---
layout: post
tags: [OI]
title: VSCode OI 使用配置
author: Duanyll
---

学校的电脑居然安装与运行VSCode不卡！（然而打开会卡两分钟）那我为什么还要用Dev-Cpp？下面贴出配置文件。建议安装C/C++扩展，使用Dev-Cpp的MinGW。

## `launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${file}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "Compile",
            "miDebuggerPath": "C:/Program Files/Dev-Cpp/MinGW32/bin/gdb.exe",
        }
    ]
}
```

## `tasks.json`

```json
{

    "version": "2.0.0",
    "tasks": [
        {
            "label": "Compile",
            "type": "shell",
            "command": "g++",
            "args": [
                "${file}",
                "-o",
                "${file}.exe",
                "-g"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher":"$gcc"
        },
        {
            "label": "Run",
            "type": "shell",
            "command": "./${file}.exe",
            "group": {
                "kind": "test",
                "isDefault": true
            }
        }
    ]
}
```

##  `keybindings.json`

```json
[
    {
        "key": "ctrl+f11",
        "command": "workbench.action.tasks.test"
    }
]
```
