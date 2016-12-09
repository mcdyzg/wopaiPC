import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            left:true
        };
    },

    onGetArticleDetail(id){
        const t = this;
        DB.Wopai.getArticleDetail({
            id:id
        }).then(function (data) {
            if(data){
                t.state = data;
            }
            t.updateComponent();
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});