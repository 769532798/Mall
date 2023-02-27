<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="select(item, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="sub(item)">-</a>
            <input @change="changeSkunum(item, $event)" autocomplete="off" type="text" :value="item.skuNum" minnum="1"
              class="itxt">
            <a class="plus" @click="addd(item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="delte(item)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input @change="updateAllChecked($event)" :checked="isCartChecked && cartInfoList?.length > 0" class="chooseAll"
          type="checkbox">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ selectShopCount }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allshopPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
export default {
  name: 'ShopCart',
  mounted() {
    this.$store.dispatch('GetShopcar')
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    totalprice() {
      return this.cartInfoList?.reduce((pre, item) => pre + item.skuPrice * item.skuNum, 0)
    },
    // 刷新时全选框是否选中
    isCartChecked() {
      //购物车里面的数据进行过滤(勾选)，如果勾选的商品与购物车商品总数相等。全选勾选！相反不够！！！
      return this.cartInfoList?.filter(item => item.isChecked == '1').length === this.cartInfoList?.length;
    },
    // 已选中商品数量
    selectShopCount() {
      let count = 0
      this.cartInfoList?.forEach(element => {
        if (element.isChecked == '1') {
          count++
        }
      });
      return count
    },
    // 已选中商品的价格
    allshopPrice() {
      let price = 0
      this.cartInfoList?.forEach(element => {
        if (element.isChecked == '1') {
          price += element.skuPrice * element.skuNum
        }
      });
      return price
    }
  },
  methods: {
    // 减按钮
    sub: throttle(async function (item) {
      if (item.skuNum > 1) {
        let params = { skuId: item.skuId, skuNum: -1 };
        try {
          await this.$store.dispatch('AddCar', params)
          this.getshopcarlist()
        } catch (error) { }

      }
    }, 2000),
    // 封装获取购物车列表
    getshopcarlist() {
      return this.$store.dispatch('GetShopcar')
    },
    // 加按钮
    async addd(item) {
      console.log(11);
      let params = { skuId: item.skuId, skuNum: 1 };
      try {
        await this.$store.dispatch('AddCar', params)
        this.getshopcarlist()
      } catch (error) {
        alert('修改失败')
      }
    },
    // 修改数量框
    changeSkunum: debounce(async function (item, e) {
      let params = { skuId: item.skuId };
      let value = e.target.value * 1
      if (isNaN(value) || value < 1) {
        params.skuNum = 0
      } else {
        params.skuNum = parseInt(value) - item.skuNum
      }
      try {
        await this.$store.dispatch('AddCar', params)
        this.getshopcarlist()
      } catch (error) {
        alert('修改失败')
      }
    }, 100),
    // 删除
    async delte(item) {
      try {
        await this.$store.dispatch('deleteShop', item.skuId)
        this.getshopcarlist()

      } catch (error) {
        alert('删除失败')
      }

    },
    // 选择框
    async select(item, e) {
      let params = {
        skuId: item.skuId,
        isChecked: e.target.checked ? "1" : "0",
      };
      try {
        await this.$store.dispatch('Select', params)
        this.getshopcarlist()
      } catch (error) {
        alert('选择失败')
      }

    },
    // 全选框
    async updateAllChecked(e) {
      //获取全选的复选框勾选的状态,接口需要的1|0
      let isChecked = e.target.checked ? "1" : "0";
      try {
        //await等待成功:购物车全部商品勾选状态成功以后
        await this.$store.dispatch("allUpdateChecked", isChecked);
        this.getshopcarlist()
      } catch (error) {
        alert('修改失败');
      }
    },
    async deleteChecked() {
      try {
        await this.$store.dispatch('deleteAllCart')
        this.getshopcarlist()
      } catch (error) {
        alert('删除失败')
      }


    }


  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>