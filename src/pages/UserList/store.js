import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            userList:[],
            page:0
        };
    },

    onGetUser(sort,num,type){
        const t = this;
        DB.Wopai.getUser({
            page:sort,
            pageNum:num,
            type:type
        }).then(function (data) {
            if(data){
                t.state.page = sort;
                t.state.userList = data;
            }
            t.updateComponent();
        });
    },

    onGetMoreUser(sort,num,type){
        const t = this;
        DB.Wopai.getUser({
            page:sort,
            pageNum:num,
            type:type
        }).then(function (data) {
            if(data){
                t.state.page++;
                t.state.userList = t.state.userList.concat(data);
            }
            t.updateComponent();
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});