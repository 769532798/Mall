//统一管理项目前部的接口
import requests from "./requests";
import mockRequest from './mockRequest'
//获取商品分类的数据
export const reqCategory = () => {
   return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}
// 获取主页轮播图数据
export const getBannerlist = () => {
   return mockRequest({ method: 'get', url: '/banner' })
}
// 获取floor部分数据
export const getFloorlist = () => {
   return mockRequest({ method: 'get', url: '/floor' })
}
//搜索数据
export const reSearch = (data) => {
   return requests({ method: 'post', url: '/list', data })
}
// 详情页
export const reDetail = (skuid) => {
   return requests({ method: 'get', url: `/item/${skuid}` })
}

// 请求加入或修改购物车
export const reqAddBuycar = (skuID, skuNum) => {
   return requests({ method: 'post', url: `/cart/addToCart/${skuID}/${skuNum}` })
}
// 获取购物车列表
export const reqShopCar = () => {
   return requests({ method: 'get', url: '/cart/cartList' })
}
// 删除购物车商品
export const reqDelete = (skuId) => {
   return requests({ method: 'DELETE', url: `/cart/deleteCart/${skuId}` })
}
// 是否选中商品
export const reqSelect = (skuId, isChecked) => {
   return requests({ method: 'get', url: `/cart/checkCart/${skuId}/${isChecked}` })
}

// 注册获取验证码
export const reqCode = (phone) => {
   return requests({ method: 'get', url: `/user/passport/sendCode/${phone}` })
}

//注册的接口
export const reqRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data });

//登录的接口:请求体携带参数 phone&&password
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data });

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });
//退出登录业务
export const reqUserLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

//获取商品清单数据
export const reqShopInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

// 提交订单
//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

// 获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//查询支付结果
export const reqPayResult = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

// 获取我的订单
export const reqMyorderinfor = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })