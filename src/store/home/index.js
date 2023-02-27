import { reqCategory, getBannerlist, getFloorlist } from '@/api'
//仓库存储数据的地方
let state = {
    category: [],
    bannerlist: [],
    floordata: []

};
let mutations = {

    GETCATEGORY(state, category) {
        state.category = category;
    },
    GETBANNER(state, payload) {
        state.bannerlist = payload
    },
    GETFLOORDATA(state, floordata) {
        state.floordata = floordata
    }

};
let actions = {
    // 主页分类数据
    async getCategory({ commit, state, dispatch }) {
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await reqCategory();
        //判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("GETCATEGORY", result.data);
        }
    },
    // 主页轮播图数据
    async getBannerdata({ commit, state, dispatch }) {
        let res = await getBannerlist()
        if (res.code == 200) {
            commit('GETBANNER', res.data)
        }
    },
    async getFloordata({ commit, state, dispatch }) {
        let res = await getFloorlist()
        if (res.code == 200) {
            commit('GETFLOORDATA', res.data)
        }
    }
};
let getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}




