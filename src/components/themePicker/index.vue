<template>
    <el-color-picker
        popper-class="theme-picker-dropdown"
        v-model="theme"
        size="mini"
        :predefine="predefineColors">
    </el-color-picker>
</template>

<script>
import variables from '@/assets/styles/element-variables.scss';
const ORIGINAL_THEME = variables.theme;//本地初始主题色

export default {
    data() {
        return {
            theme: localStorage.getItem('theme-color') || ORIGINAL_THEME,
            predefineColors: [
                '#409EFF',
                '#025472',
                '#C71585',
                '#FF7800',
                '#90EE90',
                '#00CED1',
                '#1E90FF',
                '#001F3F',
                '#0074D9',
                '#7FDBFF'
            ]
        }
    },
    watch: {
        theme(val, oldVal) {
            if (typeof val !== 'string') return;
            this.$store.dispatch('changeSettings', {key: 'theme', value: val}).then(() => {
                localStorage.setItem('theme-color', val)
            });

            const { themeInstance } = this.$root;
            if(themeInstance) {
                themeInstance.init(val)
            }
        }
    }
}
</script>

<style>
.theme-picker-dropdown .el-color-dropdown__btns .el-color-dropdown__link-btn{
    display: none;
}
</style>