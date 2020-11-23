<template>
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <use :xlink:href="iconHref"></use>
    </svg>
</template>

<script>

export default {
    name: 'SvgIcon',
    props: {
        iconName: String
    },
    computed: {
        iconHref() {
            const { iconName } = this;
            return `#icon-${iconName}`
        }
    },
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>