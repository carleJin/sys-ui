<template>
    <i class="app-icon iconfont" :class="name"></i>
</template>

<script>

export default {
    name: 'IconFont',
    props: {
        iconName: String
    },
    computed: {
        name() {
            const { iconName } = this;
            return `icon-${iconName}`
        }
    },
}
</script>

<style lang="less" scoped>
.app-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>