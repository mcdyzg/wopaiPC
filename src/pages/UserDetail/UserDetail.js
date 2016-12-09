import React from 'react';
import {Component} from 'reflux';
import Action from './action'

import Store from './store';
import './UserDetail.css';

class UserInfo extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getUserDetail(this.props.params.uid);
        Action.getArticle(1,10);

        this.loadMore = this.loadMore.bind(this)
	}

	getUserDetailList(){
		const t = this;
		if(t.state.userArticleList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.userArticleList,function(item, index){
			temArr.push(
			
			<div key={index} className='hc-card'>
				<a key={index} href={'#/article/'+index}>
				<img onClick={t.handleConcern} src={item.thumb} className='hi-pic' />
				</a>
				<div className='hi-bottom-wrap'>
					<div className='hb-title'>
						{item.title ||'-'}
					</div>
					<div className='hb-date'>
						{item.date ||'-'}
					</div>
					<div className='hb-devider ud-devider'></div>
				</div>
			</div>)
		})
		return temArr;
	}

	loadMore(){
		Action.getArticle(this.state.page+1,10);
	}

    render() {
    	const t = this;
        return (
            <div className="userdetail">
            	<img className='ud-cover' src={t.state.userDetail && t.state.userDetail.cover} />
            	<div className='userlist-top' style={{background:'#FFF'}}>
	            	<img className='ul-avatar' src={t.state.userDetail && t.state.userDetail.pic} />
	            	<div className='ul-name'>
	            		{t.state.userDetail && t.state.userDetail.name || '-'}
	            	</div>
	            	<div className='ul-view flex-h jc-center ai-center'>
						<div className='hp-zan'  style={{backgroundImage:'url(assets/img/zan.png)'}}  ></div>
						<span className='hp-word'>{t.state.userDetail && t.state.userDetail.likes || '-'}</span>
					</div>
					<div style={{height:1}} ></div>
	            </div>
	            <div className=''>
	            	{
	            		t.getUserDetailList()
	            	}	
	            </div>    

            	<div onClick={t.loadMore} className='home-loadmore'>
					加载更多
				</div>
                <div style={{height:1}} ></div>
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