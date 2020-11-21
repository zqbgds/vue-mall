<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>

</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import { getDetail } from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data(){
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;
      // 2.根据iid请求详情数据
      // 同样的这里我们将网络请求封装到network中的detail.js
      getDetail(this.iid).then(res => {
        // 先获取顶部轮播图
        this.topImages = res.result.itemInfo.topImages

        console.log(res)
      })
    }
  }
</script>

<style scoped>

</style>
