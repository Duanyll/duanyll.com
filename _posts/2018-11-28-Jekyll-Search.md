---
author: duanyll
title: 为你的Jekyll博客添加搜索文章功能
tags: ["教程","Jekyll"]
---

众所周知，Github上的Jekyll上实现自定义插件很困难，因此即使有Jekyll的搜索插件，也只能手写js代码。静态网站实现搜索原理是这样的，通过HTTP请求获取`posts.json`，然后本地解析里面内容实现搜索。

<!-- more -->

## posts.json

{% raw %}

```liquid
---
layout: null
permalink: /posts.json
---

{
	"posts":[
	{%- for post in site.posts -%}
		{
			"title" : "{{ post.title }}",
			"date" : "{{ post.date | date_to_long_string }}",
			"author" : "{{ post.author }}",
			"tags" : [
			{%- for tag in post.tags -%}
				"{{ tag }}"
				{%- if forloop.rindex != 1 -%}
				,
				{%- endif -%}
			{%- endfor -%}
			],
			"url" : "{{ post.url }}",
			"excerpt" : "{{ post.excerpt | strip_html | strip_newlines | lstrip | rstrip | truncate:100 }}"
		}
		{%- if forloop.rindex != 1 -%}
		,
		{%- endif -%}
    {%- endfor -%}
	]
}
```

{% endraw %}

## HTTP请求

```js
let requestURL = '/posts.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();

var posts;
let section = null;

request.onload = function () {
	let postsText = request.response;
	posts = JSON.parse(postsText);
	//console.log(postsText);
	initPosts(posts['posts']);
};
```

## 显示搜索框

```js
function initSearchBox() {
	var box = document.createElement('input');
	box.setAttribute('type', 'text');
	box.setAttribute('id', 'search-box');
	box.setAttribute('placeholder', '搜索文章...');
	box.oninput = function () {
		var text = this.value;
		if (text != "") {
			var list = [];
			postList.forEach(post => {
				if (post.title.search(text) > -1 || post.excerpt.search(text) > -1) {
					list.push(post);
				}
			});
			showSelectedPost(list);
		} else {
			showAllPost();
		}
	}

	document.getElementById('nav-ul').appendChild(box);
}
```

## 滚动到底自动加载

```js
$(window).scroll(function () {
	var htmlHeight = $(document).height();
	var clientHeight = $(window).height();
	var scrollTop = $(document).scrollTop();
	var he = scrollTop + clientHeight;
	if (he >= htmlHeight * 0.9) {
		addListMore();
	}
});
```

这样做就可以在不花钱的情况下，实现一个支持在线编辑的，支持自定义域名的，功能齐全的博客。