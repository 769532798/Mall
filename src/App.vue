<template>
  <div class="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.show"></Footer>

  </div>
</template>

<script>

export default {

  data() {
    return {
      searchParams: {
        pageNo: 6,
        pageSize: 5
      }
    }
  },
  mounted() {
    //App的根组件挂载完毕,发一次请求即可.
    this.$store.dispatch('getCategory')
  },
  methods: {
   
  }

}

</script>

<style scoped>

</style>