//第一步:引入插件
import VeeValidate from 'vee-validate'
import Vue from 'vue';
import zh_CN from 'vee-validate/dist/locale/zh_CN' //这个插件提供中文提示文件
//第二步：引入Vue 安装插件
//使用插件的时候，配置表单验证的触发事件
Vue.use(VeeValidate,{
     //失却焦点进行表单验证
    // events:'blur'
})

//使用表单验证插件:
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}两次必须密码相同` // 修改内置规则的 message，让确认密码和密码相同
        
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})


//协同同意的自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})
