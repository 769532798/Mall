<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 产品名称面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removecategoryName">×</i></li>
            <!-- 产品关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{ searchParams.keyword }}<i @click="removekeyword">×</i>
            </li>
            <!-- 品牌名面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removetrademark">×</i>
            </li>
            <!-- 属性名面包屑 -->
            <li class="with-x" v-for="(value, index) in searchParams.props">{{ value.split(':')[1] }}<i
                @click="removeprops(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件使子组件传递数据给父组件 -->
        <SearchSelector @getTrademark="trademarkdata" @getattribute="getattribute" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="sort(1)">
                  <a class="iconfont">综合<span v-show="isOne" :class="{
                    'icon-paixu': isDesc, 'icon-xiangshang': isAsc
                  }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="sort(2)">
                  <a class="iconfont">价格<span v-show="isTwo"
                      :class="{ 'icon-paixu': isDesc, 'icon-xiangshang': isAsc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 货品部分 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(item, index) in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"><img v-lazy="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${item.id}`"> <a :title="item.title">
                        {{ item.title }}</a></router-link>

                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ item.id }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>

          <!-- 分页部分 -->
          <div class="fr page">
            <pagination @getPageNum="getPageNum" :total="total" :pageSize="searchParams.pageSize"
              :pageNo="searchParams.pageNo" :pagerCount="5">
            </pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',

  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "",//二级分类的id
        category3Id: "",//三级分类的id
        categoryName: "",//商品的名字
        keyword: "",//用户搜索的关键字  
        props: [],//商品属性的搜索条件
        trademark: "",//品牌的搜索条件
        order: "1:desc",//排序的参数 【默认初始值:1:desc】
        pageNo: 1,//当前分页器的页码  【默认初始值:1】
        pageSize: 5,//代表当前一页显示几条数据 【默认初始值:10】
      }
    }
  },

  components: {
    SearchSelector
  },
  beforeMount() {
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id

    // 和上面的代码一样效果
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getSearchdata()
    this.searchParams.pageNo = 1
  },
  methods: {
    getSearchdata() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },

    // 删除面包屑 产品名字
    removecategoryName() {
      this.searchParams.categoryName = ''

      // 因为下面监听了$route所以跳转时会字自动发送请求  
      // 有的话携带上params的数据
      this.$router.push({ name: 'search', params: this.$route.params })

    },
    // 删除关键字面包屑
    removekeyword() {
      this.searchParams.keyword = ''
      this.$router.push({ name: 'search', query: this.$route.query })
      // 通知header组件删除keyword
      this.$bus.$emit('removeHHeaderKeyword')
    },
    // 获取到searchselector组件中的品牌id和名称
    trademarkdata(id, name) {
      this.searchParams.trademark = `${id}:${name}`
      this.getSearchdata()
    },
    // 删除品牌面包屑
    removetrademark() {
      this.searchParams.trademark = ''
      this.getSearchdata()

    },
    // 获取到属性id名字等
    getattribute(id, value, attr) {
      this.searchParams.props.push(`${id}:${value}:${attr}`)
      this.getSearchdata()
    },
    // 删除品牌面包屑
    removeprops(index) {
      this.searchParams.props.splice(index, 1)
      this.getSearchdata()
    },
    // 分类排序
    sort(flag) {
      let originnum = this.searchParams.order.split(':')[0]
      let originsort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      if (flag == originnum) {
        newOrder = `${originnum}:${originsort == 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:${originsort = 'desc'}`
      }
      this.searchParams.order = newOrder

      this.getSearchdata()
    },
    // 获取当前页面的值
    getPageNum(index) {
      this.searchParams.pageNo = index
      this.getSearchdata()
    }
  },
  computed: {
    // ...mapState({
    //   goodlist: (state) => state.search.searchlist
    // })
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchlist.total
    }),

    // 判断是在综合排序上还是价格排序上
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
  },
  watch: {
    $route() {
      // this.searchParams.category1Id = this.$route.query.category1Id
      // this.searchParams.category2Id = this.$route.query.category2Id
      // this.searchParams.category3Id = this.$route.query.category3Id

      // 先把之前的id清空
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      Object.assign(this.searchParams, this.$route.query, this.$route.params)

      this.getSearchdata()
    },

  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                img {
                  max-width: 100%;
                  height: auto;
                  vertical-align: middle;

                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>