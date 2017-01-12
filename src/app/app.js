"use strict";
window.__G__ = {};
window._ = {};
import _map from 'lodash/map'
_.map = _map;

//基本组件
import React,{Component} from  'react'
import ReactDOM from 'react-dom'
import {Router,hashHistory} from 'react-router'

// 页面
import Home from '../pages/Home'
import ArticleDetail from '../pages/ArticleDetail'
import UserList from '../pages/UserList'
import UserDetail from '../pages/UserDetail'
import ArticleList from '../pages/ArticleList'
import DB from '../db/db'

// import {NavBar} from '../components/NavBar'
import {DropModal} from '../components/Modal'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typelist:[]
        }
    }

    componentDidMount(){
        const t = this;
        DB.Wopai.getArticleTypes().then((data)=>{
            if(data){
                t.setState(
                {
                    typelist:data
                })
            }
        })
        $(document).on('click','.nav-word',(e)=>{
            $('.nav-word').removeClass('active')
            $(e.target).addClass('active');
        })
    }

    getTitleBar(){
        const t = this;
        if(t.state.typelist.length === 0){
            return <div className=''></div>
        }
        const temTitleArr = [];
        _.map(t.state.typelist,function(item, index){
            temTitleArr.push(
            <a key={index} className='nav-word' href={'/#/articlelist/'+item.typeValue}>
                                {item.typeName}
                            </a>)
        })
        return temTitleArr;
    }

    render() {
        const t = this;
        return (
            <div className='body-wrap'>
                <div className='nav-wrap'>
                    <div className='top-nav flex-h ai-center jc-space-between'>
                        <div className='flex-h ai-center jc-start'>
                            <img onClick={()=>window.location.href='#/'} style={{width:240,height:70,marginRight:30}} src='assets/img/logo.png' />
                            <a className='nav-word active' href='#/'>
                                首页
                            </a>
                            {t.getTitleBar()}
                        </div>
                        <div onClick={()=>this.refs.DropModal.show()} className='nav-guanzhu flex-v ai-center'>
                            <img src='assets/img/guanzhu.png' />
                            <span>关注我们</span>
                        </div>
                        
                    </div>
                </div>
                
                <div style={{height:'97px'}} >
                    
                </div>
                {this.props.children}
                <div className='bottom-wrap'>
                    <div className='bottom-bar flex-h ai-center jc-space-between'>
                        浙ICP备16043737 | copyright @ 2015-2020 | 杭州我拍少女文化创意有限公司
                        <div className='bottom-btn' onClick={()=>window.scrollTo(0,0)} >
                            回到顶部
                        </div>
                    </div>
                </div>
                <DropModal ref='DropModal' className="modal">
                    <img src='assets/img/erweima.jpg' style={{width:'100%'}} />
                </DropModal>
            </div>
        )
    }
}
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: [
        {path: '/home',                 component: Home},
        {path: '/article/:id',          component: ArticleDetail},
        {path: '/userlist/:type',       component: UserList},
        {path: '/userdetail/:uid',       component: UserDetail},
        {path: '/articlelist/:type',       component: ArticleList},
    ]
};
ReactDOM.render(<Router history={hashHistory}  onUpdate={() => window.scrollTo(0,0)}  routes={routes}/>, document.getElementById('app'));



            // <NavBar>
            // <div className=''>
            //     111
            // </div>
            // <div className=''>
            //     222
            // </div>
            // </NavBar>