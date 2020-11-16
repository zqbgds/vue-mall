<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar.vue"
    }
</script>

<style scoped>
    #tab-bar{
        display: flex;
        background-color: #f6f6f6;
        box-shadow: 0 -1px 5px rgba(24,24,24,0.2);
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
    }
</style>