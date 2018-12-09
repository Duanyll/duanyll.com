---
title: OJStatusCrawler-爬取大佬的做题记录
author: duanyll
tags: ["项目","Dotnet","施工现场"]
---

>　~~我才不会告诉你我做这个项目是为了山寨llf0703~~,主要是为了dotnet core练手,顺便学习regex.

基于dotnet core的爬虫，主要用于爬取大佬的提交记录，用于了解大佬的做题顺序。

本来想直接通过解析HTML的形式分析网页,结果因为功能要求不高,就直接用regex了,受限于本人水平,只会写基于PHP的OJ的爬虫,(目前)对于ajax加载评测记录的OJ还很无力...

<!-- more -->

目前已支持抓取HDU与BZOJ的AC记录,POJ这段时间都无法访问,暂不添加.

[项目Github仓库](https://github.com/duanyll/OJStatusCrawler),可执行文件不太可能发布,请各位大佬自行build(期待dotnet core 3 单文件打包)

## 使用方法

```
命令行使用方法:
user:   指定用户名,若不指定,则从stdin读入
oj:     指定OJ,若不指定,则从stdin读入
            目前支持bzoj,hdu
output: 指定输出文件(默认result.md),附加到文件末尾
mode:   firstac(默认),ac,all(尚未支持)
reverse:是否倒序输出(默认true)

示例:
    dotnet run user=llf0703 oj=bzoj
        抓取llf0703的bzoj上的AC提交记录.
```

爬取的结果会以markdown格式追加到指定的文件中.

## 建议了解

[llf0703/pld](https://github.com/Llf0703/pld)
