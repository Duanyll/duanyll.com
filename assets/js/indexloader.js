//This file is licensed under the MIT license.

//保存一个json文件访问的URL作为一个变量
let requestURL = '/posts.json';
//创建一个HTTP请求对象
let request = new XMLHttpRequest();
//使用open（）打开一个新请求
request.open('GET', requestURL);
//设置XHR访问JSON格式数据，然后发送请求
// request.responseType = 'json';
//设置XHR访问text格式数据
request.responseType = 'text';
request.send();

var posts;
let section = null;

//处理来自服务器的数据
request.onload = function () {
	let postsText = request.response;
	posts = JSON.parse(postsText);
	//console.log(postsText);
	initPosts(posts['posts']);
};

var nextToShow = 0;
var postList;
var postToShow;

function initPosts(list) {
	postList = list;
	document.getElementById('nav-ul').innerHTML = "";
	initSearchBox();
	initTags(list);
	initDate(list);
	showAllPost();
}

function showAllPost() {
	clearSection();
	postToShow = postList;
	showPosts(postList.slice(0, Math.min(10, postList.length)));
	nextToShow = Math.min(10, postList.length);
}

function coverString(subStr, str) {
	var reg = eval("/" + subStr + "/ig");
	return reg.test(str);
}

function containsKeyWord(post, str) {
	if (coverString(str, post.title)) {
		return true;
	} else {
		if (coverString(str, post.excerpt)) {
			return true;
		} else {
			var found = false;
			post.tags.forEach(tag => {
				if (coverString(str, tag)) {
					found = true;
					return;
				}
			});
			return found;
		}
	}
}

function initSearchBox() {
	var box = document.createElement('input');
	box.setAttribute('type', 'text');
	box.setAttribute('id', 'search-box');
	box.setAttribute('class', 'sbox');
	box.setAttribute('placeholder', '搜索...');
	box.oninput = function () {
		var text = this.value;
		if (text != "") {
			var list = [];
			postList.forEach(post => {
				if (containsKeyWord(post, text)) {
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

var tagsCount;
var tagCloudView;

function tagForSort(name, count) {
	this.name = name;
	this.count = count;
	return this;
}

//可以对对象中的任何属性进行排序
function sortByProperty(property) {
	function sortfun(obj1, obj2) {
		//核心代码
		if (obj1[property] > obj2[property]) return -1
		else if (obj1[property] < obj2[property]) return 1
		else if (obj1[property] == obj2[property]) return 0
	}
	return sortfun
}

function shuffle(a) {
	var len = a.length;
	for (var i = 0; i < len; i++) {
		var end = len - 1;
		var index = (Math.random() * (end + 1)) >> 0;
		var t = a[end];
		a[end] = a[index];
		a[index] = t;
	}
	return a;
};

function initTags(list) {
	var header = document.createElement('li');
	header.setAttribute('class', 'tag-h1');
	header.innerHTML = "<a href='#'>所有标签</a>";
	header.onclick = showAllPost;

	let nav = document.getElementById('nav-ul');
	nav.appendChild(header);

	tagsCount = new Map();
	list.forEach(post => {
		post.tags.forEach(tag => {
			if (!tagsCount.has(tag)) {
				tagsCount.set(tag, 1);
			} else {
				tagsCount.set(tag, tagsCount.get(tag) + 1);
			}
		});
	});

	let sortTemp = [];

	for (var [tag, count] of tagsCount) {
		sortTemp.push(new tagForSort(tag, count));
	};

	sortTemp.sort(sortByProperty("count"));

	for (let i = 0; i < 5; i++){
		let tag = sortTemp[i].name;
		let count = sortTemp[i].count;
		let label = document.createElement('li');
		label.innerHTML = '<a href="#">' + tag + '(' + count + ')' + '</a>';
		label.setAttribute('class', 'tag-h2');
		label.onclick = function () {
			var list = [];
			var tag = this.innerText.split('(')[0];
			postList.forEach(post => {
				if (post.tags.indexOf(tag) > -1) {
					list.push(post);
				}
			});
			showSelectedPost(list);
		}
		nav.appendChild(label);
	}

	tagCloudView = document.createElement('p');
	let maxCount = sortTemp[0].count;
	sortTemp = shuffle(sortTemp);
	for (let i = 0; i < sortTemp.length; i++) {
		let tag = sortTemp[i].name;
		let count = sortTemp[i].count;
		let label = document.createElement('span');
		label.innerHTML = '<a href="#">' + tag + '(' + count + ')' + '</a>';
		let fontSize = 18 + count / maxCount * 36;
		label.setAttribute("style", 'font-size:' + Math.round(fontSize) + 'px;margin:10px;display:inline-block;');
		label.onclick = function () {
			var list = [];
			var tag = this.innerText.split('(')[0];
			postList.forEach(post => {
				if (post.tags.indexOf(tag) > -1) {
					list.push(post);
				}
			});
			showSelectedPost(list);
		}
		tagCloudView.appendChild(label);
	}

	let btnShowTagCloud = document.createElement('li');
	btnShowTagCloud.setAttribute('class', 'tag-h2');
	btnShowTagCloud.innerHTML = "<a href='#'>标签云</a>";
	btnShowTagCloud.onclick = function () {
		clearSection();
		section.appendChild(tagCloudView);
	}
	nav.appendChild(btnShowTagCloud);
}

function extractDate(str){
	var vs = str.split(' ');
	return vs[1] + ' ' + vs[2];
}

function initDate(list){
	var header = document.createElement('li');
	header.setAttribute('class', 'tag-h1');
	header.innerHTML = "<a href='#'>所有发布时间</a>";
	header.onclick = showAllPost;

	let nav = document.getElementById('nav-ul');
	nav.appendChild(header);

	var allTags = new Set([]);
	for (let i = 0; i < list.length; i++) {
		if(!allTags.has(extractDate(list[i].date))){
			allTags.add(extractDate(list[i].date));
		}
	}

	allTags.forEach(tag => {
		let label = document.createElement('li');
		label.innerHTML = '<a href="#">' + tag + '</a>';
		label.setAttribute('class', 'tag-h2');
		label.onclick = function () {
			var list = [];
			var tag = this.innerText;
			postList.forEach(post => {
				if (extractDate(post.date) == tag) {
					list.push(post);
				}
			});
			showSelectedPost(list);
		}
		nav.appendChild(label);
	});
}

function showSelectedPost(list) {
	clearSection();
	postToShow = list;
	showPosts(list.slice(0, Math.min(10, list.length)));
	nextToShow = Math.min(10, list.length);
}

function addListMore() {
	if (nextToShow < postToShow.length) {
		showPost(postToShow[nextToShow]);
		nextToShow++;
	}
}

function showPosts(list) {
	section = document.getElementById('posts');
	for (let i = 0; i < list.length; i++) {
		showPost(list[i]);
	}
}

function clearSection() {
	postToShow = [];
	section = document.getElementById('posts');
	section.innerHTML = "";
}

function showPost(post) {
	let li = document.createElement('li');
	let article = document.createElement('article');

	let pinfo = document.createElement('p');
	let binfo = document.createElement('b');
	binfo.textContent = post.date + ' | ' + post.author + ' | ';
	for (let j = 0; j < post.tags.length; j++) {
		binfo.textContent += '\"' + post.tags[j] + '\" ';
	}
	pinfo.appendChild(binfo);
	article.appendChild(pinfo);

	let header = document.createElement('h1');
	header.innerHTML = '<a href="' + post.url + '">' + post.title + '</a>';
	article.appendChild(header);

	let para = document.createElement('p');
	para.innerHTML = post.excerpt + '<a href="' + post.url + '">' + '阅读更多' + '</a>';
	article.appendChild(para);

	li.appendChild(article);
	li.appendChild(document.createElement('hr'));

	section.appendChild(li);

	sectionHeight();
}

$(window).scroll(function () {
	//下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
	var htmlHeight = $(document).height();
	//clientHeight是网页在浏览器中的可视高度，
	var clientHeight = $(window).height();
	//scrollTop滚动条到顶部的垂直高度
	var scrollTop = $(document).scrollTop();
	//通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
	var he = scrollTop + clientHeight;
	if (he >= htmlHeight * 0.9) {
		addListMore();
	}
	//console.log("滚动条位置：" + scrollTop);
	//console.log("可视高度：" + clientHeight);
	//console.log("网页总高度" + htmlHeight);
});
