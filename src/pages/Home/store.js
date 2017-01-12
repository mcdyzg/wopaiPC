import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            articleList:[],
            photographerList:[],
            modelList:[],
            page:0,
            showModal:false,
        };
    },

    onGetBanner() {
        const t = this;
        DB.Wopai.getBanner().then(function (data) {
            if(data){
                t.state.bannerArr = data;
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
                t.state.page = sort;
                t.state.articleList = data;
            }
            t.updateComponent();
        });
    },

    onGetMoreArticle(sort,num){
        const t = this;
        DB.Wopai.getArticle({
            page:sort,
            pageNum:num
        }).then(function (data) {
            if(data){
                t.state.page++;
                t.state.articleList = t.state.articleList.concat(data);
            }
            t.updateComponent();
        });
    },

    getPhotographers(){
        const t = this;
        DB.Wopai.getPhotographers().then(function (data) {
            if(data){
                t.state.photographerList = data;
            }
            t.updateComponent();
        });
    },

    getModels(){
        const t = this;
        DB.Wopai.getModels().then(function (data) {
            if(data){
                t.state.modelList = data;
            }
            t.updateComponent();
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});



            // typelist:[{
            //     typeValue: 1,
            //     typeName: "分类"
            // },{
            //     typeValue: 2,
            //     typeName: "分类"
            // },{
            //     typeValue: 3,
            //     typeName: "分类"
            // },{
            //     typeValue: 4,
            //     typeName: "分类"
            // },{
            //     typeValue: 5,
            //     typeName: "分类"
            // }]