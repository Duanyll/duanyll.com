---
author: duanyll
date: 2018-10-19
title: Linux下对拍sh
tags: ["OI","linux","vscode"]
---

不多说,上代码

<!-- more -->

```sh
g++ Problem.cpp -o Problem.out
g++ Problem_std.cpp -o Problem_std.out
g++ Problem_dm.cpp -o Problem_dm.out
printf "Compile Compelete\n"
while true; do
    ./Problem_dm.out > Problem.in
    printf "Data made\n"
    ./Problem_std.out < Problem.in > Problem_std.ans
    printf "Std compelete\n"
    ./Problem.out < Problem.in > Problem.ans
    printf "Ans Compelete\n"
    if diff Problem.ans Problem_std.ans; then
        printf "AC\n"
    else
        printf "WA\n"
        exit 0
    fi
done
```

为了充分利用VSCode,将下列代码加入代码片段,一秒打出对拍

```json
{
	"Duipai":{
		"prefix": "duipai",
		"body": [
			"g++ $1.cpp -o $1.out",
			"g++ $1_std.cpp -o $1_std.out",
			"g++ $1_dm.cpp -o $1_dm.out",
			"while true; do",
			"\t./$1_dm.out > $1.in",
			"\t./$1_std.out < $1.in > $1_std.ans",
			"\t./$1.out < $1.in > $1.ans",
			"\tif diff $1.ans $1_std.ans; then",
			"\t\tprintf \"AC\\n\"",
			"\telse",
			"\t\tprintf \"WA\\n\"",
			"\t\texit 0",
			"\tfi",
			"done"
		]
	}
}
```