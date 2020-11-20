<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // probeType: 3, // 值为3是性能最低的，所以我们封装的时候根据传入的值来设置
        probeType: this.probeType,
        // pullUpLoad: true, pullUpLoad也根据使用它的父组件来设置
        pullUpLoad: this.pullUpLoad,
        click: true
      })
      // 监听滚动位置
      this.scroll.on('scroll', (position) => {
        // 通过$emit发送出去共外面的组件使用
        // console.log(position)
        this.$emit('scroll', position)
      })
      // 监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time = 500){
        return this.scroll.scrollTo(x, y, time = 500)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
