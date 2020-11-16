<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import { getHomeMultidata } from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar
    },
    data(){
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      // 请求多个数据，因为后端提供的数据有时候都放在一起的
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list

      })
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
