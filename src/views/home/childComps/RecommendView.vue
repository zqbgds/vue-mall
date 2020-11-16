<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: "RecommendView",
      props: {
        recommends: {
          type: Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .recommend{
    display: flex;
    flex-grow: 1;
    text-align: center;
    margin-top: 4px;
    font-size: 12px;
  }
  .recommend-item{
    padding: 10px;
  }
  .recommend-item img{
    width: 100%;
    padding-bottom: 5px;
  }
</style>
