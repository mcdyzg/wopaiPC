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

// import {NavBar} from '../components/NavBar'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        $('.nav-word').click((e)=>{
            $(e.target).parents('.top-nav').find('.nav-word').removeClass('active')
            $(e.target).addClass('active');
        })
    }

    render() {
        return (
            <div className='body-wrap'>
                <div className='nav-wrap'>
                    <div className='top-nav'>
                        <div className='nav-item'>
                            <a className='nav-word active' href='#/'>
                            少女对话少女
                            </a>
                        </div>
                        <div className='nav-item'>
                            <a className='nav-word' href='#/userlist/model'>
                            少女之春
                            </a>
                        </div>
                        <div className='nav-item'>
                            <a className='nav-word' href='#/userlist/photographer'>
                            摄影师访谈
                            </a>
                        </div>
                    </div>
                </div>
                
                <div style={{height:'45px'}} >
                    
                </div>
                {this.props.children}
            </div>
        )
    }
}
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: [
        {path: '/home',             component: Home},
        {path: '/article/:id',      component: ArticleDetail},
        {path: '/userlist/:type',         component: UserList},
        {path: '/userdetail/:uid',       component: UserDetail}
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