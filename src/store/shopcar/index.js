import { reqShopCar, reqDelete, reqSelect } from '@/api/index'
//仓库存储数据的地方
let state = {
    shopcarlist: []
};
let mutations = {
    GETSHOPCAR(state, payload) {
        state.shopcarlist = payload
    }
};
let actions = {
    // 获取购物车
    async GetShopcar({ commit, state, dispatch }) {
        let res = await reqShopCar()
        commit('GETSHOPCAR', res.data)
    },
    async deleteShop({ commit, state, dispatch }, skuId) {
        let res = await reqDelete(skuId)
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }

    },
    // 是否选中
    async Select({ commit, state, dispatch }, { skuId, isChecked }) {
        let res = await reqSelect(skuId, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject
        }
    },
    // 全选框
    allUpdateChecked({ commit, state, dispatch }, isChecked) {
        let arr = [];
        //获取购物车商品的个数,进行遍历
        state.shopcarlist[0]?.cartInfoList?.forEach(item => {
            //调用修改某一个商品的action【四次】
            let ps = dispatch("Select", { skuId: item.skuId, isChecked });
            arr.push(ps);
        })
        //Promise.all():参数需要的是一个数组【数组里面需要promise】
        //Promise.all()执行一次,返回的是一个Promise对象
        //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
        return Promise.all(arr);
    },
    // 删除选中
    deleteAllCart({ commit, state, dispatch }) {
        let arr = [];
        //获取仓库里面购物车的数据
        state.shopcarlist[0]?.cartInfoList?.forEach(item => {
            //商品的勾选状态是勾选的,发请求一个一个删除
            if (item.isChecked == 1) {
                let ps = dispatch('deleteShop', item.skuId);
                arr.push(ps);
            }
        })
        return Promise.all(arr);
    }
};
//仓库计算属性
let getters = {
    cartInfoList(state) {
        return state.shopcarlist[0]?.cartInfoList
    }
};

//对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters
}




