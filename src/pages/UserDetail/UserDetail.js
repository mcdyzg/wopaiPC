import React from 'react';
import {Component} from 'reflux';
import Action from './action'
import DB from '../../db/db'

import {DropModal} from '../../components/Modal'
import Store from './store';
import './UserDetail.css';

class UserInfo extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getUserDetail(this.props.params.uid);
        Action.getArticle(1,10,this.props.params.uid);

        this.loadMore = this.loadMore.bind(this)
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

	getUserDetailList(){
		const t = this;
		if(t.state.userArticleList.length === 0){
			return <div className='' style={{padding: 20,textAlign: 'center'}}>暂无文章</div>
		}
		const temArr = [];
		_.map(t.state.userArticleList,function(item, index){
			temArr.push(
			
			<div key={index} className='hc-card'>
				<a key={index} href={'#/article/'+item.id}>
				<img  style={{height:'275px',overflow:'hidden'}} onClick={t.handleConcern} src={item.thumb} className='hi-pic' />
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
						<div data-id={item.id} className='hv-zan' style={{backgroundImage:'url(assets/img/not_zan.png)'}} onClick={t.handleZan.bind(this,item.id)}>
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

	loadMore(){
		Action.getMoreArticle(this.state.page+1,10,this.props.params.uid);
	}

    render() {
    	const t = this;
        return (
            <div className="userdetail" style={{minHeight:$(window).height()+'px'}}>
            	<div className='userDetail-top'  >
            		<div className='userDetail-bg' style={{backgroundImage:'url(' + (t.state.userDetail && t.state.userDetail.pic) +')'}}></div>

            		<div className='userDetail-wrap'>
            			<img className='userDetail-avatar' src={t.state.userDetail && t.state.userDetail.pic} />
		            	<div className='userDetail-name'>
		            		{t.state.userDetail && t.state.userDetail.name || '-'}
		            	</div>
		            	<div className='userDetail-view flex-h jc-center ai-center'>
							<div className='hp-zan'  style={{backgroundImage:'url(assets/img/zan.png)'}}  ></div>
							<span className='hp-word' style={{color:'#fff'}} >{t.state.userDetail && t.state.userDetail.likes}</span>
						</div>

						<div className='ud-yuepai'  onClick={()=>this.refs.DropModal.show()}>
							约拍
						</div>
						<div style={{height:1}} ></div>
            		</div>
	            	
	            </div>
	            <div className='userdetail-content'>
		            <div className='flex-h jc-start' style={{flexWrap:'wrap',marginRight:-15}}>
		            	{
		            		t.getUserDetailList()
		            	}	
		            </div> 
	            </div>
	               

            	<div onClick={t.loadMore} className='home-loadmore'>
					加载更多
				</div>
                <div style={{height:1}} ></div>
                <DropModal ref='DropModal' className="modal">
                    <img src='assets/img/erweima2.png' style={{width:'100%'}} />
                </DropModal>
            </div>
        )
    }
}
export default UserInfo

// 用户详情页得不到 用户id
// 用户文章列表接口未给出

// rank排名（皇冠）
// <span className='hp-word'>/</span>
// <div className='hp-rank'></div>
// <span className='hp-word'>{item.likes || '-'}</span>