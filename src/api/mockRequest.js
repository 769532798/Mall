//对于axios进行二次封装
import axios from "axios";
//获取仓库:存储数据
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";

let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/mock",
    //超时的设置
    timeout: 5000
});

//请求拦截器
requests.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    // 给服务器携带请求们的公共的参数
    //进度条开始
    nprogress.start();
    return config;
});


//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    alert(err.message);
    //终止Promise链
    return new Promise();
});

//暴露
export default requests;




