import { reDetail, reqAddBuycar } from '@/api/index'
//仓库存储数据的地方
let state = {
    detaiData: {}
};
let mutations = {
    GETDETAILDATA(state, payload) {
        state.detaiData = payload
    }
};
let actions = {
    async getdetaildata({ commit, state, dispath }, id) {
        let res = await reDetail(id)
        if (res.code == 200) {
            commit('GETDETAILDATA', res.data)
        }
    },
    // 加入购物车请求
    async AddCar({ commit, state, dispath }, { skuId, skuNum }) {
        let res = await reqAddBuycar(skuId, skuNum)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject()
        }
    }
};
//仓库计算属性
let getters = {
    categoryView(state) {
        return state.detaiData.categoryView
    },
    skuInfo(state) {
        return state.detaiData.skuInfo
    },
    spuSaleAttrList(state) {
        return state.detaiData.spuSaleAttrList
    }
};

//对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters
}




