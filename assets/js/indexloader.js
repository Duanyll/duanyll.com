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
	box.setAttribute('placeholder', '搜索文章标题/摘要/标签...');
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

function initTags(list) {
	var header = document.createElement('li');
	header.setAttribute('class', 'tag-h1');
	header.innerHTML = "<a href='#'>所有分类</a>";
	header.onclick = showAllPost;

	let nav = document.getElementById('nav-ul');
	nav.appendChild(header);

	var allTags = new Set([]);
	for (let i = 0; i < list.length; i++) {
		for (let j = 0; j < list[i].tags.length; j++){
			if (!allTags.has(list[i].tags[j])) {
				allTags.add(list[i].tags[j]);
			}
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
				if (post.tags.indexOf(tag) > -1) {
					list.push(post);
				}
			});
			showSelectedPost(list);
		}
		nav.appendChild(label);
	});
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