
import { reqCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api/index'
let state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    nickName: '',
};
let mutations = {
    GETCODE(state, payload) {
        state.code = payload
    },
    SET_USERINFO(state, payload) {
        state.nickName = payload
    },
    SET_TOKEN(state, payload) {
        state.token = payload
    },
    CLEAR(state) {
        state.token = ''
        state.nickName = ''
        localStorage.removeItem('TOKEN')
    }
};
//可以处理业务逻辑【if、异步语句等等】
let actions = {
    async getCode({ commit, state, dispath }, phone) {
        let res = await reqCode(phone)
        if (res.code == 200) {
            commit('GETCODE', res.data);
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    async registerUser({ commit, state, dispatch }, obj) {
        //注册接口没有返回data,不需要提交mutation
        let result = await reqRegister(obj);
        if (result.code == 200) {
            //注册成功
            return 'ok';
        } else {
            //注册失败
            return Promise.reject(new Error(result.message));
        }
    },
    // 登录
    async userLogin({ commit, state, dispatch }, obj) {
        //注册接口没有返回data,不需要提交mutation
        let result = await reqUserLogin(obj);
        console.log(result);
        if (result.code == 200) {
            commit('SET_TOKEN', result.data.token);

            //注册成功
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok';
        } else {
            //注册失败
            return Promise.reject(new Error(result.message));
        }
    },
    // 登录成功后根据token获取用户信息
    async getUserInfo({ commit, state, dispatch }) {
        let res = await reqUserInfo()
        if (res.code == 200) {
            commit('SET_USERINFO', res.data.nickName);
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    // 退出登录
    async logout({ commit, state, dispatch }) {
        let res = await reqUserLogout()
        if (res.code == 200) {
            commit('CLEAR');
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    }
};
//仓库计算属性
let getters = {

};

//对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters
}




