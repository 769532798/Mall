<template>
  <div class="spec-preview">
    <img :src="bigObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="bigObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Zoom",
  data() {
    return {
      index: 0
    }
  },
  computed: {
    ...mapGetters(['skuInfo']),
    skuImageList() {
      return this.skuInfo?.skuImageList || [];
    },
    bigObj() {
      return this.skuImageList[this.index] || {};
    },
  },
  mounted() {
    this.$bus.$on('indexpost', (index) => {
      this.index = index
    })
  },

  methods: {
    handler(e) {
      let mask = this.$refs.mask
      let big = this.$refs.big
      let x = e.offsetX - mask.offsetWidth / 2
      let y = e.offsetY - mask.offsetHeight / 2
      if (x < 0) x = 0
      if (x > mask.offsetWidth) x = mask.offsetWidth
      if (y < 0) y = 0
      if (y > mask.offsetHeight) y = mask.offsetHeight
      mask.style.left = x + 'px'
      mask.style.top = y + 'px'
      big.style.left = -2 * x + "px";
      big.style.top = -2 * y + "px";
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>