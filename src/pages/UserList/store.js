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

    onGetUser(sort,num){
        const t = this;
        DB.Wopai.getUser({
            page:sort,
            pageNum:num
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