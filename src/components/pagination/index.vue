<template>
    <div class="pagination">
        <button @click="$emit('getPageNum', pageNo - 1)" :disabled="pageNo<=1">上一页</button>
        <button @click="$emit('getPageNum', 1)" v-show="startAndEnd.start > 1">1</button>
        <button v-show="startAndEnd.start > 2">···</button>
        <button :class="{ active: page == pageNo }" @click="$emit('getPageNum', page)" v-for="page in startAndEnd.end"
            v-if="page >= startAndEnd.start" :key="page">{{ page }}</button>
        <button v-show="startAndEnd.end < totalPage - 1">···</button>
        <button @click="$emit('getPageNum', totalPage)" v-show="startAndEnd.end < totalPage">{{ totalPage }}</button>
        <button @click="$emit('getPageNum', pageNo + 1)" :disabled="pageNo >= totalPage">下一页</button>

        <button style="margin-left: 30px">共{{ total }}条记录 {{ totalPage }}页</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['total', 'pageSize', 'pageNo', 'pagerCount'],
    computed: {
        // 一共多少页向上取整
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 算出连续5个数组(pageCount)开头数字和结尾数字
        startAndEnd() {
            let start = 0
            let end = 0
            // 解构
            const { totalPage, pageNo, pagerCount } = this

            // 当总页数小于显示的页数
            if (totalPage < pagerCount) {
                start = 1
                end = totalPage
            } else {
                start = pageNo - parseInt(pagerCount / 2)
                end = pageNo + parseInt(pagerCount / 2)

                // 约束头部
                if (start < 1) {
                    start = 1
                    end = pagerCount
                }
                // 约束尾部
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - pagerCount + 1
                }
            }


            return { start, end }
        }
    },
    mounted() {

    },
    method: {

    }
}
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
