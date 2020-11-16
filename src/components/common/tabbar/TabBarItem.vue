<template>
    <div class="tab-bar-item" @click="clickItem">
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        data(){
            return {
                // isActive: true,
            }
        },
        computed: {
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle(){
                return this.isActive ? {color: this.activeColor} : {}
            }
        },
        methods: {
            clickItem(){
                this.$router.push(this.path).catch(() => {})
                //没有 .catch(() => {}) 的话 双击 某个 item会报错
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        flex-grow: 1;
        text-align: center;
        height: 49px; /*tabBar的一般高度都是49*/
        font-size: 14px;
    }
    .tab-bar-item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
</style>