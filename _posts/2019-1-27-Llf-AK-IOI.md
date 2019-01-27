---
title: 贴几个VSCode的常用代码片段
tags: [OI,vscode]
author: duanyll
---

包括常用头文件,快读等.

<!-- more -->

```json
{
	"Common Headers": {
		"prefix": "#inc",
		"scope": "cpp",
		"body": [
			"#include <iostream>",
			"#include <algorithm>",
			"#include <cstdio>",
			"#include <cstring>",
			"#include <fstream>",
			"#include <cassert>",
			"using namespace std;",
			"",
			"typedef long long int64;",
			"",
			"const int INF = 0x3f3f3f3f;",
			"const int MAXN = $1;",
			"",
			"int main(){",
			"\t//ifstream cin(\"$2.in\");",
			"\t//ofstream cout(\"$2.out\");",
			"\t$0",
			"\treturn 0;",
			"}"
		]
	},
	"Fast Read":{
		"scope": "cpp",
		"prefix": "fastread",
		"body": [
			"#include <cctype>",
			"#include <cstdio>",
			"",
			"inline int read()",
			"{",
    		"\tint X = 0, w = 0;",
    		"\tchar ch = 0;",
			"\twhile (!isdigit(ch))",
    		"\t{",
			"\t\tw |= ch == '-';",
        	"\t\tch = getchar();",
			"\t}",
    		"\twhile (isdigit(ch)){",
        	"\t\tX = (X << 3) + (X << 1) + (ch ^ 48);",
        	"\t\tch = getchar();",
			"\t}",
    		"\treturn w ? -X : X;",
			"}"
		]
	},
	"memset":{
		"scope": "cpp",
		"prefix": "mems",
		"body": "memset($1,$2,sizeof $1);"
	},
	"Minimize":{
		"scope": "cpp",
		"prefix": "gmin",
		"body": "$1 = min($1,$2);"
	},
	"Maximize": {
		"scope": "cpp",
		"prefix": "gmax",
		"body": "$1 = max($1,$2);"
	}
}
```