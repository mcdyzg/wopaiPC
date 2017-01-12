import React from 'react';
import {Component} from 'reflux';
import Action from './action'
import Slider from 'react-slick'
import DB from '../../db/db'

import Store from './store';
import './Home.css';

class Home extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getBanner()
        Action.getArticle(1,6);
        Action.getPhotographers()
        Action.getModels();

        this.loadMore = this.loadMore.bind(this);
	}

	getBannerImg(){
		const t = this;
		if(t.state.bannerArr === undefined){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.bannerArr,function(item, index){
			temArr.push(
			<div key={index} className='slide-content' style={{height:$(window).width()/2.5+'px',overflow:'hidden'}}>
				<a href={item.href || '#/'}><img key={index} src={item.src} className='slide-item' /></a>
			</div>)
		})
		return temArr;
	}

	handleZan(id, ctx){
		if($(ctx.target).hasClass('zan-active')){
			return;
		}
		DB.Wopai.likeAjax({
			aid:id
		}).then(function(data){
			
		})
		$(ctx.target).addClass('zan-active')
		$(ctx.target).css('backgroundImage','url(assets/img/zan.png)')
		$(ctx.target).parent().find('.likes').html(+($(ctx.target).parent().find('.likes').html())+1)
	}

	loadMore(){
		Action.getMoreArticle(this.state.page+1,6);
	}

	getContent(){
		const t = this;
		if(t.state.articleList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.articleList,function(item, index){
			temArr.push(
			<div key={index} className='hc-card'>
				<a href={'#/article/'+item.id}>
				<img alt={item.title ||'-'} onClick={t.handleConcern} style={{height:'275px',overflow:'hidden'}} src={item.thumb} className='hi-pic' />
				</a>
				<div className='hi-bottom-wrap'>
					<a href={'#/article/'+item.id}>
					<div className='hb-title'>
						{item.title ||'-'}
					</div>
					</a>
					<div className='hb-date'>
						{item.date ||'-'}
					</div>
					<div className='hb-view flex-h ai-center jc-start'>
						<div data-id={item.id} onClick={t.handleZan.bind(this,item.id)} className='hv-zan' style={{backgroundImage:'url(assets/img/not_zan.png)'}}>
						</div>
						<span className='word1 hv-num likes'>{item.likes}</span>
						<div style={{backgroundImage:'url(assets/img/view.png)'}} className='hv-zan'>
						</div>
						<span className='word1 hv-num'>{item.views}</span>
					</div>
				</div>
			</div>)
		})
		return temArr;
	}

	getPhotographersBlock(){
		const t = this;
		if(t.state.photographerList.length === 0){
			return <div className=''></div>
		}

		const temArr = [];
		_.map(t.state.photographerList,function(item, index){
			temArr.push(
				<a key={index} href={'#/userdetail/'+item.id}>
			<div key={index} className='hc-card2'>
            	<div className='userlist-top'>
            		<img className='ul-avatar' src={item.pic} />
            		<div className='ul-name'>
            			{item.name || '-'}
            		</div>
            		<div className='ul-view flex-h ai-center jc-center'>
						<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
						<span className='hp-word'>{item.likes}</span>
						


					</div>
					<div className='ul-pic-content flex-h jc-space-between'>
						<img className='ul-pic' src={item.morePics ?item.morePics[0].src:''} />
						<img className='ul-pic' src={item.morePics ?item.morePics[1].src:''} />
						<img className='ul-pic' src={item.morePics ?item.morePics[2].src:''} />
					</div>
            	</div>
            </div>
            </a>
				)
		})
		return temArr;
	}

	getModelsBlock(){
		const t = this;
		if(t.state.modelList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.modelList,function(item, index){
			temArr.push(
				<a key={index} href={'#/userdetail/'+item.id}>
			<div key={index} className='hc-card2'>
            	<div className='userlist-top'>
            		<img className='ul-avatar' src={item.pic} />
            		<div className='ul-name'>
            			{item.name || '-'}
            		</div>
            		<div className='ul-view flex-h ai-center jc-center'>
						<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
						<span className='hp-word'>{item.likes}</span>
						


					</div>
					<div className='ul-pic-content flex-h jc-space-between'>
						<img className='ul-pic' src={item.morePics?item.morePics[0].src:''} />
						<img className='ul-pic' src={item.morePics?item.morePics[1].src:''} />
						<img className='ul-pic' src={item.morePics?item.morePics[2].src:''} />
					</div>
            	</div>
            </div>
            </a>
				)
		})
		return temArr;
	}

	yuepai(){
		alert('接口未开放')
	}

    render() {
    	const t = this;
    	const settings = {
	      dots: true,
	      infinite: false,
	      speed: 500,
	      arrows:false,
	      slidesToShow: 1,
	      draggable:false,
	      slidesToScroll: 1,
	      arrows:true,
	      prevArrow:<ArrowLeft />,
	      nextArrow:<ArrowRight />,
	      className:'slide-wrap'
	    };
        return (
            <div className="home">
            	
                <Slider {...settings}>
				    {
				    	t.getBannerImg()
				    }
				</Slider>
				<div className='home-content'>
					<div className='biaoti-bar flex-h jc-space-between'>
						<div className='bb-leftbtn'>
							文章
						</div>
						
						<a href='#/articlelist/all'>
						<div className='bb-rightbtn'>
							+ 更多
						</div>
						</a>
						
					</div>
					<div className='flex-h jc-start' style={{flexWrap:'wrap',marginRight:-15}} >
						{
							t.getContent()
						}


					</div>
				
					<div className='biaoti-bar flex-h jc-space-between'>
						<div className='bb-leftbtn'>
							摄影师
						</div>
						<a href='#/userlist/photographer'>
						<div className='bb-rightbtn'>
							+ 更多
						</div>
						</a>
					</div>
					<div className='flex-h jc-start' style={{flexWrap:'wrap',marginRight:-15}} >
						{
							t.getPhotographersBlock()
						}

					</div>

					<div className='biaoti-bar flex-h jc-space-between'>
						<div className='bb-leftbtn'>
							模特
						</div>
						<a href='#/userlist/model'>
						<div className='bb-rightbtn'>
							+ 更多
						</div>
						</a>
					</div>
					<div className='flex-h jc-start' style={{flexWrap:'wrap',marginRight:-15}} >
						{
							t.getModelsBlock()
						}
					</div>
				</div>

				

				<div style={{height:1}}></div>
				
            </div>
        )
    }
}
export default Home


// 约拍
// <div className='hp-btn' onClick={t.yuepai} >
	// <span className='hp-btn-word'>约拍</span>
// </div>

// rank排名（皇冠）
// <span className='hp-word'>/</span>
// <div className='hp-rank'></div>
// <span className='hp-word'>{item.likes}</span>


class ArrowLeft extends React.Component{
	render() {
    return <div {...this.props} className='arrow arrow-left' style={{backgroundImage:'url(assets/img/arrowleft.png)'}} ></div>
  }
}
class ArrowRight extends React.Component{
	render() {
    return <div {...this.props} className='arrow arrow-right' style={{backgroundImage:'url(assets/img/arrowright.png)'}} ></div>
  }
}


// 首页卡片的里的资料
// <div className='flex-h hb-people jc-start'>
// 	<div className='flex1'>
// 		<span className="grey">摄影师：</span>
// 		<span className="word1">{item.photographer ||'-'}</span>
// 	</div>
// 	<div className='flex1'>
// 		<span className="grey">模特：</span>
// 		<span className="word1">{item.model ||'-'}</span>
// 	</div>
// </div>
// <div className='hb-address'>
// 	<span className="grey">坐标：</span>
// 	<span style={{marginLeft:'10px'}} className="word1">{item.city ||'-'}</span>
// </div>


// 加载更多按钮
// <div onClick={t.loadMore} className='home-loadmore'>
	// 加载更多
// </div>