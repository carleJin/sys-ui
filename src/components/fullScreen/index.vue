<template>
    <i class="full-screen el-icon-full-screen" title="全屏" @click="fullScreen"></i>
</template>

<script>
//https://github.com/sindresorhus/screenfull.js
import screenfull from 'screenfull'

export default {
    methods: {
        fullScreen() {
            if(!screenfull.isEnabled) {
                this.$message({
                    type: 'warning',
                    message: 'Failed to enable fullscreen'
                });

                return false;
            }
            screenfull.toggle();
        }
    },
}
</script>

<style scoped>
.full-screen{
    cursor: pointer;
    vertical-align: middle;
    font-size: 16px;
}
.full-screen:hover{
    transform: scale(1.2);
}
</style>