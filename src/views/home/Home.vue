<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  import { getHomeMultidata, getHomeGoods } from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      BackTop,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 请求多个数据，因为后端提供的数据有时候都放在一起的
      this.getHomeMultidata()
      // 具体内容封装到methods中去了

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      // 事件监听相关方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick(){
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        // 上面这种写法看起来会觉得混乱，这里我们将scrollTo封装到组件的方法中
        this.$refs.scroll.scrollTo(0,0)
      },
      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 67px;
  }
  */
</style>
