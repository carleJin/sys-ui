<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
        const theme = localStorage.getItem('theme-color');
        const { themeInstance } = this.$root;
        if(themeInstance) {
            themeInstance.init(theme)
        }
    },
}
</script>

<style>

</style>