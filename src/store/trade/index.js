import { reqShopInfo, reqAddressInfo, reqSubmitOrder } from '@/api/index'

let state = {
    address: [{ consignee: '刘德华', id: '313', isDefault: "0", provinceID: 1, phoneNum: 123456789, regionId: 1, userAddress: '江阴', fullAddress: '福建福清江阴' },
    { consignee: '张学友', id: '313', isDefault: "1", provinceID: 1, regionId: 1, userAddress: '江阴', phoneNum: 123456789, fullAddress: '福建福清江阴' }],
    tradeInfo: {},
    payId: ''
};
let mutations = {
    GETORDERINFO(state, payload) {
        state.tradeInfo = payload
    },
    // 获取code
    SUBMITINFO(state, payId) {
        state.payId = payId;
    }
};
let actions = {
    // 获取地址信息
    async getAddress({ commit, state, dispatch }) {
        let res = await reqAddressInfo()
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    // 获取订单信息
    async getOrderinfo({ commit, state, dispatch }) {
        let res = await reqShopInfo()
        if (res.code == 200) {
            commit('GETORDERINFO', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    // 提交订单
    async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit('SUBMITINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
};
let getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}




