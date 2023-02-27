<template>
    <div>
        <div class="order-right">
            <div class="order-content">
                <div class="title">
                    <h3>我的订单</h3>
                </div>
                <div class="chosetype">
                    <table>
                        <thead>
                            <tr>
                                <th width="29%">商品</th>
                                <th width="31%">订单详情</th>
                                <th width="13%">收货人</th>
                                <th>金额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <!-- 订单详情部分 -->
                <div class="orders">

                    <table class="order-item" v-for="(shop, index) in goods.records" :key="shop.id">
                        <thead>
                            <tr>
                                <th colspan=" 5">
                                    <span class="ordertitle">{{ shop.createTime }}　订单编号：{{ shop.outTradeNo }} <span
                                            class="pull-right delete"><img src="../images/delete.png"></span></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 每一个日期购买信息 -->
                            <tr v-for="(item, index) in shop.orderDetailList" :key="item.id">
                                <td width="60%">
                                    <div class="typographic">
                                        <img :src="item.imgUrl" style="width:100px;height:100px">
                                        <a href="#" class="block-text">{{ item.skuName }}</a>
                                        <span>x{{ item.skuNum }}</span>
                                        <a href="#" class="service">售后申请</a>
                                    </div>
                                </td>
                                <td v-show="index == 0" :rowspan="shop.orderDetailList.length" width="8%"
                                    class="center">
                                    {{
                                        shop.consignee
                                    }}</td>
                                <td v-show="index == 0" :rowspan="shop.orderDetailList.length" width="13%"
                                    class="center">
                                    <ul class="unstyled">
                                        <li>总金额¥{{ shop.totalAmount }}.00</li>
                                        <li>在线支付</li>

                                    </ul>
                                </td>
                                <td v-show="index == 0" :rowspan="shop.orderDetailList.length" width="8%"
                                    class="center">
                                    <a href="#" class="btn">{{ shop.orderStatusName }} </a>
                                </td>
                                <td v-show="index == 0" :rowspan="shop.orderDetailList.length" width="13%"
                                    class="center">
                                    <ul class="unstyled">
                                        <li>
                                            <a href="mycomment.html" target="_blank">评价|晒单</a>
                                        </li>

                                    </ul>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                <!-- 分页部分 -->
                <pagination @getPageNum="getPageNum" :total="goods.total" :pageSize="limit" :pageNo="page"
                    :pagerCount="5">
                </pagination>
                <!--猜你喜欢-->

            </div>
            <div class="like">
                <h4 class="kt">猜你喜欢</h4>
                <ul class="like-list">
                    <li class="likeItem">
                        <div class="p-img">
                            <img src="../images/itemlike01.png" />
                        </div>
                        <div class="attr">
                            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                        </div>
                        <div class="price">
                            <em>¥</em>
                            <i>3699.00</i>
                        </div>
                        <div class="commit">已有6人评价
                        </div>
                    </li>
                    <li class="likeItem">
                        <div class="p-img">
                            <img src="../images/itemlike02.png" />
                        </div>
                        <div class="attr">
                            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                        </div>
                        <div class="price">
                            <em>¥</em>
                            <i>4388.00</i>
                        </div>
                        <div class="commit">已有700人评价
                        </div>
                    </li>
                    <li class="likeItem">
                        <div class="p-img">
                            <img src="../images/itemlike03.png" />
                        </div>
                        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                        </div>
                        <div class="price">
                            <em>¥</em>
                            <i>4088.00</i>
                        </div>
                        <div class="commit">已有700人评价
                        </div>
                    </li>
                    <li class="likeItem">
                        <div class="p-img">
                            <img src="../images/itemlike04.png" />
                        </div>
                        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                        </div>
                        <div class="price">
                            <em>¥</em>
                            <i>4088.00</i>
                        </div>
                        <div class="commit">已有7000人评价
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: '1',
            limit: '5',
            goods: {}
        }
    },
    mounted() {
        this.getmyOrderinfo()
    },
    methods: {
        async getmyOrderinfo() {
            let res = await this.$http.reqMyorderinfor(this.page, this.limit)
            if (res.code == '200') {
                this.goods = res.data
            }
        },
        getPageNum(page) {
            this.page = page
            this.getmyOrderinfo()
        }
    },
    watch: {
        page() {
            window.scrollTo({

                top: 0,


            });
        }
    }
}

</script>

<style scoped>

</style>