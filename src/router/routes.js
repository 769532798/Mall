import Home from '@/pages/home'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Search from '@/pages/search'
import Detail from '@/pages/detail'
import Addcarsuccess from '@/pages/addcartsuccess'
import Shopcar from '@/pages/shopcar'
import Trade from '@/pages/trade'
import Pay from '@/pages/pay'
import PaySUccess from '@/pages/paySuccess'
import Center from '@/pages/center'
export default [
    {
        path: '/home',
        component: () => import('@/pages/home'),

    },
    {
        path: '/login',
        component: () => import('@/pages//login'),

        meta: {
            show: true
        }

    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: true
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/search'),

    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: () => import('@/pages/detail'),

    },
    {
        name: 'addcarsuccess',
        path: '/addcarsuccess',
        component: () => import('@/pages/addcartsuccess'),

    },
    {
        name: 'shopcar',
        path: '/shopcar',
        component: () => import('@/pages/shopcar'),

    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/trade'),
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcar') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/pay'),
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/pages/paySuccess'),
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('@/pages/center'),

        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/center/myorder'),
            }
            ,
            {
                path: 'teamorder',
                component: () => import('@/pages/center/teamorder'),
            }
            ,
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
]