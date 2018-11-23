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
request.onload = function() {
    let postsText = request.response;
    posts = JSON.parse(postsText);
    //console.log(postsText);
	initPosts(posts['posts']);
};

function initPosts(list){
	clearSection();
	showPosts(list);
}

function showPosts(list) {
	section = document.getElementById('posts');
	for(let i = 0;i<list.length;i++){
		showPost(list[i]);
	}
}

function clearSection(){
	section = document.getElementById('posts');
	section.innerHTML = "";
}

function showPost(post){
	let li = document.createElement('li');
	let article = document.createElement('article');
		
	let pinfo = document.createElement('p');
	let binfo = document.createElement('b');
	binfo.textContent = post.date + ' | ' + post.author + ' | ';
	for(let j = 0;j<post.tags.length;j++){
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
}
	