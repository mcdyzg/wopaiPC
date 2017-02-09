import React from 'react';
import {Component} from 'reflux';
import Action from './action'
import DB from '../../db/db'

import Store from './store';
import './ArticleList.css';

class ArticleList extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getArticle(1,10,this.props.params.type);
        

        this.loadMore = this.loadMore.bind(this);
	}

	// static contextTypes = {
	//     router: React.PropTypes.object,
	// };

	componentWillReceiveProps(nextProps){
		Action.getArticle(1,10,nextProps.params.type);
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
		Action.getMoreArticle(this.state.page+1,10,this.props.params.type);
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

    render() {
    	const t = this;
        return (
            <div className="home" style={{minHeight:$(window).height()+'px'}}>
				<div className='home-content'>
					<div style={{padding:20}} >
					</div>
					<div className='flex-h jc-start' style={{flexWrap:'wrap',marginRight:-15}} >
						{
							t.getContent()
						}


					</div>
					<div onClick={t.loadMore} className='home-loadmore'>
						加载更多
					</div>
				
				</div>

				<div style={{height:1}}></div>
				
            </div>
        )
    }
}
export default ArticleList


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