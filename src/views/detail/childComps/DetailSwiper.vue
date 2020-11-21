<template>
  <swiper class="swiper-wrap">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>

  .swiper-wrap{
    /*这里如果将类名定义为swiper会和组件有冲突报错*/
    height: 300px;
    overflow: hidden;
  }
</style>
