import React from 'react';
import {Component} from 'reflux';
import Action from './action'
import DB from '../../db/db'

import Store from './store';
import './ArticleDetail.css';

class ArticleDetail extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getArticleDetail(this.props.params.id)
	}

	handleZan(id,ctx){
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

    render() {
    	const t = this;
        return (
            <div className="detail">
            	<div style={{height:1}}></div>
                <div className='article-wrap'>
                	<div className='article-bg' style={{backgroundImage:'url('+ (t.state.thumb || '') +')'}} >
                		
                	</div>
                	<div className=''>
                		<div style={{width:900,margin:'0 auto'}}>
                			<div className='article-title' style={{width:($(window).width()-900)/2+900}} >
								{t.state.title ||'-'}
							</div>
                		</div>
						

						<div className='article-content'>
							<div className='hb-date' style={{padding:0}}>
								{t.state.date ||'-'}
							</div>

							<div className='flex-h hb-people jc-start'>
								<div className='' style={{marginRight:40,display:(t.state.getPhotographer && t.state.getPhotographer.name)?'block':'none'}} >
									<span className="grey">摄影师：</span>
									<span className="word1">{t.state.getPhotographer? t.state.getPhotographer.name :'-'}</span>
								</div>
								<div className='' style={{marginRight:40,display:(t.state.model&& t.state.model.name)?'block':'none'}} >
									<span className="grey">模特：</span>
									<span className="word1">{t.state.model? t.state.model.name :'-'}</span>
								</div>
								<div className=''>
									<span className="grey">坐标：</span>
									<span className="word1">{t.state.address || '-'}</span>
								</div>
							</div>

							<div className='hb-zhaiyao1'>
								{t.state.desc || '-'}
							</div>

							<div className='hb-zhaiyao' style={{overflow:'hidden',color:'#4d4d4d',border:'none'}} dangerouslySetInnerHTML={{__html: t.state.content || '-'}}>
							</div>

							<div style={{borderBottom:'1px solid #e6e6e6'}} ></div>

							<div className='hb-view'>
								<div onClick={t.handleZan.bind(this,this.props.params.id)} className='hv-zan' style={{backgroundImage:'url(assets/img/not_zan.png)'}}>
								</div>
								<span className='word1 hv-num likes'>{t.state.likes}</span>
								<div style={{backgroundImage:'url(assets/img/view.png)'}} className='hv-zan'>
								</div>
								<span className='word1 hv-num'>{t.state.views}</span>
							</div>
						</div>
						
						<div style={{backgroundImage:'url(assets/img/bottomlogo.png)'}} className='bottom-content'>
							
						</div>
					</div>
                </div>


                <div style={{height:1}} ></div>
            </div>
        )
    }
}
export default ArticleDetail

// 缺少文章是否已被赞字段
// 文章内容图片未给出
// 剩余文章分割线不明确
// 剩余全文是否有接口

// rank排名（皇冠）
// <span className='hp-word'>/</span>
// <div className='hp-rank'></div>
// <span className='hp-word'>{t.state.getPhotographer && t.state.getPhotographer.likes || '-'}</span>



// 底部的摄影师和模特版块
// <div className='detail-bottom'>
// 	<a href={'#/userdetail/'+(t.state.getPhotographer ? t.state.getPhotographer.id : '')}>
// 	<div className='hp-item flex-h jc-start ai-center'>
// 		<img src={t.state.getPhotographer && t.state.getPhotographer.pic || ''} className='hp-avatar' />
// 		<div className='flex1'>
// 			<div className='hp-name1' style={{color:'#1a1a1a'}}>
// 				{t.state.getPhotographer && t.state.getPhotographer.name || '-'}
// 			</div>
// 			<div className='hp-name3'>
// 				摄影师
// 			</div>
// 		</div>
// 		<div className='hp-name2'>
// 			<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
// 			<span className='hp-word'>{t.state.getPhotographer && t.state.getPhotographer.likes || '-'}</span>
			


// 		</div>
// 	</div>
// 	</a>
// </div>


// <div className='detail-bottom'>
// 	<a href={'#/userdetail/'+(t.state.model ? t.state.model.id : '')}>
// 	<div className='hp-item flex-h jc-start ai-center'>
// 		<img src={t.state.model && t.state.model.pic || ''} className='hp-avatar' />
// 		<div className='flex1'>
// 			<div className='hp-name1' style={{color:'#1a1a1a'}}>
// 				{t.state.model && t.state.model.name || '-'}
// 			</div>
// 			<div className='hp-name3'>
// 				模特
// 			</div>
// 		</div>
// 		<div className='hp-name2'>
// 			<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
// 			<span className='hp-word'>{t.state.model && t.state.model.likes || '-'}</span>
			


// 		</div>
// 	</div>
// 	</a>
// </div>