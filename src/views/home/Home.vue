<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl1"
                 @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" ref="tabControl2"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
  import { debounce } from "common/utils"

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
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
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
    mounted() {
      // 获取TabControl的offsetTop
      // 这里没有办法直接获取组件的offsetTop
      // 所有的组件都有一个元素$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
      // 上面这种方式，虽然是在挂载的生命周期中进行的但是图片的加载依然可能没有完成的，所以计算的高度可能还是不准确的。

      // 监听item中图片加载完成，不能写在created中，没有挂载可能会报错
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.scroll && this.$refs.scroll.refresh()
        refresh()
      })
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        // 上面这种写法看起来会觉得混乱，这里我们将scrollTo封装到组件的方法中
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // 注意这里的位置的值都是负值
        this.isShowBackTop = (- position.y) > 600

        // 决定TabControl是否吸顶（position: fixed）
        this.isTabFixed = (- position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
          this.$refs.scroll.finishPullUp()
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
    /*非原生效果 没必要再定位了*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
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
  .tab-control{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
