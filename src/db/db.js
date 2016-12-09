var DBF = require('./dbFactory');

// 设置全局的`url`前缀
// 开发环境
if (__LOCAL__) {   
    var urlPrefix= 
   	// '//localhost:3000/';
   	'./data/';
}

// 生产环境
if (__PRO__) {  
    var urlPrefix = 
    './data/';
    
}

DBF.set('urlPrefix', urlPrefix);

DBF.set('defaultParsePesp', function(resp){
    return resp;
});

DBF.create('Wopai', {
	getBanner:{
		url       :'banner.json',
		type      :'GET'
	},
	getArticle:{
		url       :'article.json',
		type      :'GET'
	},
	getPhotographers:{
		url       :'photographers.json',
		type      :'GET'
	},
	getModels:{
		url       :'models.json',
		type      :'GET'
	},
	getArticleDetail:{
		url       :'articleDetail.json',
		type      :'GET'
	},
	getUser:{
		url       :'userlist.json',
		type      :'GET'
	},
	getUserDetail:{
		url       :'userdetail.json',
		type      :'GET'
	},
	likeAjax:{
		url       :'/likeAjax',
		type      :'GET'
	},
});

module.exports = DBF.context;