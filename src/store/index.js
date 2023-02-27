//仓库
import Vuex from 'vuex';
import Vue from 'vue';
//安装插件
Vue.use(Vuex);

//引入小仓库
import home from './home/index';
import search from './search';
import detail from './detail';
import shopcar from './shopcar';
import user from './user';
import trade from './trade';


//对外暴露仓库
//第一个注意:需要关键字new，你没有new会报错的
export default new Vuex.Store({
    //大仓库需要注册全部小仓库
    modules: {
        home,
        search,
        detail,
        shopcar,
        user,
        trade
    }
})