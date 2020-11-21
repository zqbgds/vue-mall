<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        // 要计算高度加载完一张图片就可以进行计算了，每次都加载浪费性能
        if (!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
          // console.log('-----')
        }
      }
    }
  }
</script>

<style scoped>

</style>
