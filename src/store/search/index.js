import { reSearch } from '@/api'
//仓库存储数据的地方
let state = {
    searchlist: {}
};
let mutations = {
    GETSEARCHLIST(state, searchlist) {
        state.searchlist = searchlist
    }
};
let actions = {
    async getSearchList({ commit, state, dispath }, payload) {
        let res = await reSearch(payload)
        if (res.code == 200) {
            commit('GETSEARCHLIST', res.data)
        }
    }
};
let getters = {
    goodsList(state) {
        return state.searchlist.goodsList
    },
    // 品牌
    trademarkList(state) {
        return state.searchlist.trademarkList
    },
    attrsList(state) {
        return state.searchlist.attrsList
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}




