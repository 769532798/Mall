<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="phone" placeholder="请输入你的手机号" name="phone"
          v-validate="{ required: true, regex: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/ }"
          :class="{ invalid: errors.has('phone') }">
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" v-model="code" placeholder="请输入验证码" name="code" v-validate="{
          required: true,
          regex: /^\d{4,6}$/,
        }" :class="{ invalid: errors.has('phone') }">
        <button style="height: 38px;" @click="getCode">发送验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" v-model="password" placeholder="请输入你的登录密码" name="password" v-validate="{
          required: true,
          regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        }" :class="{ invalid: errors.has('password') }">
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" name="password1" v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }">
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" name="agree" v-validate="{ required: true, agree: true }"
          :class="{ invalid: errors.has('agree') }">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      password: '',
      code: '',
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        await this.$store.dispatch('getCode', this.phone)
        this.code = this.$store.state.user.code;
      } catch (error) {

      }
    },
    // 注册按钮

    async register() {
      //这行代码能保证表单验证的字段都复合规则
      const success = await this.$validator.validateAll();
      //如果全部表单验证通过了[success：返回的是布尔值真|假]
      if (success) {
        try {
          await this.$store.dispatch('registerUser', { phone: this.phone, password: this.password, code: this.code })
          this.$message.success('注册成功,进入登入界面');
          this.$router.push('/login');
        } catch (error) {
          alert(error.message)
        }

      }
    },
    // async register() {
    //   try {
    //     await this.$store.dispatch('registerUser', { phone: this.phone, password: this.password, code: this.code })
    //     this.$router.push('/login');
    //   } catch (error) {
    //     alert(error.message)
    //   }

    // }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>