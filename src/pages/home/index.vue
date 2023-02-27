<template>
    <div class="home">
        <TypeNav></TypeNav>
        <listContainer></listContainer>
        <recomend></recomend>
        <rank></rank>
        <like></like>
        <floor v-for="(value, index) in floordata" :key="value.id" :floor="value"></floor>

    </div>
</template>

<script>
import listContainer from './listContainer'
import recomend from './recomend'
import rank from './rank'
import like from './like'
import floor from './floor'
import { mapState } from 'vuex'
export default {
    name: 'Home',
    components: {
        listContainer,
        recomend,
        rank,
        like,
        floor
    },
    methods: {
        // reqCategory
    },
    mounted() {
        this.$store.dispatch('getFloordata')
    },
    computed: {
        ...mapState({
            floordata: (state) => state.home.floordata
        })
    }
}

</script>

<style scoped>

</style>