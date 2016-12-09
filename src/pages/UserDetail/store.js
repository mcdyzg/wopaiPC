import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            page:0,

            userArticleList:[]
        };
    },

    onGetUserDetail(id){
        const t = this;
        DB.Wopai.getUserDetail({
            id:id
        }).then(function (data) {
            if(data){
                t.state.userDetail = data;
            }
            t.updateComponent();
        });
    },

    onGetArticle(sort,num){
        const t = this;
        DB.Wopai.getArticle({
            page:sort,
            pageNum:num
        }).then(function (data) {
            if(data){
                t.state.page++;
                t.state.userArticleList = t.state.userArticleList.concat(data);
            }
            t.updateComponent();
            
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});