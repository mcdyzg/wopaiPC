import React from 'react';
import {Component} from 'reflux';
import Action from './action'

import Store from './store';
import './UserList.css';

class UserList extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getUser(1,10,this.props.params.type)
        this.loadMore = this.loadMore.bind(this);
	}

	getUserList(){
		const t = this;
		if(t.state.userList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.userList,function(item, index){
			temArr.push(
			<a key={index} href={'#/userdetail/'+item.id}>
			<div key={index} className='hc-card2'>
            	<div className='userlist-top'>
            		<img className='ul-avatar' src={item.pic} />
            		<div className='ul-name'>
            			{item.name || '-'}
            		</div>
            		<div className='ul-view flex-h jc-center'>
						<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
						<span className='hp-word'>{item.likes}</span>
						


					</div>
					<div className='ul-pic-content flex-h jc-space-between'>
						<img className='ul-pic' src={item.morePics[0].src} />
						<img className='ul-pic' src={item.morePics[1].src} />
						<img className='ul-pic' src={item.morePics[2].src} />
					</div>
            	</div>
            </div>
            </a>)
		})
		return temArr;
	}

	loadMore(){
		Action.getMoreUser(this.state.page+1,10);
	}

    render() {
    	const t = this;
        return (
            <div className="userlist" style={{minHeight:$(window).height()+'px'}}>
            	<div style={{height:1}}></div>
            	<div className='flex-h jc-start' style={{flexWrap:'wrap',marginRight:-15}}>
            		{
	            		t.getUserList()
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
export default UserList

// rank排名（皇冠）
// <span className='hp-word'>/</span>
// <div className='hp-rank'></div>
// <span className='hp-word'>{item.likes || '-'}</span>