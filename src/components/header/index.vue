<template>
    <div class="header">
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!$store.state.user.nickName">
                            <span>请</span>
                            <RouterLink to="/login"><a>登录</a></RouterLink>
                            <RouterLink to="/register"> <a class="register">免费注册</a></RouterLink>
                        </p>
                        <p v-else>
                            <a>{{ $store.state.user.nickName }}</a>
                            <a class="register" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link style="color: red;" to="/center">我的订单</router-link>

                        <router-link to="/shopcar" style="color: red;">我的购物车</router-link>
                        <a href="###">会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <RouterLink to="/home" class="logo">
                        <img src="./images/logo.png" alt="">
                    </RouterLink>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="search">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script>

export default {
    name: "Header",
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        search() {
            var locations = { name: 'search', params: { keyword: this.keyword || undefined } }
            if (this.$route.query.categoryName) {
                locations.query = this.$route.query
            }
            this.$router.push(locations)
        },
        // 退出登录
        logout() {
            this.$store.dispatch('logout')
        }

    },
    mounted() {
        this.$bus.$on('removeHHeaderKeyword', () => {
            this.keyword = ''
        })
    }
}

</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>