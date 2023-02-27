import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
Vue.use(VueRouter)

// import Home from '@/pages/home'
// import Login from '@/pages/login'
// import Register from '@/pages/register'
// import Search from '@/pages/search'
// import Detail from '@/pages/detail'
import routes from './routes'

let originpush = VueRouter.prototype.push
let originreplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originpush.call(this, location, resolve, reject)
    } else {
        originpush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originreplace.call(this, location, resolve, reject)
    } else {
        originreplace.call(this, location, () => { }, () => { })
    }
}


const router = new VueRouter({
    routes,
    scrollBehavior() {
        return { y: 0 };
    }
    //  : [
    //     {
    //         path: '/home',
    //         component: Home
    //     },
    //     {
    //         path: '/login',
    //         component: Login,
    //         meta: {
    //             show: true
    //         }

    //     },
    //     {
    //         path: '/register',
    //         component: Register,
    //         meta: {
    //             show: true
    //         }
    //     },
    //     {
    //         name: 'search',
    //         path: '/search/:keyword?',
    //         component: Search
    //     },
    //     {
    //         path: '/',
    //         redirect: '/home'
    //     },
    //     {
    //         name: 'detail',
    //         path: '/detail/:skuid?',
    //         component: Detail
    //     }
    // ]
})
export default router

router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录:不能进入
        let topath = to.path
        if (topath.indexOf('trade') != -1 || topath.indexOf('pay') != -1 || topath.indexOf('center') != -1) {
            next('/login?redirect=' + topath);
        } else {
            next();
        }


    }
});