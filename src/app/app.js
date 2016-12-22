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

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='body-wrap'>
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