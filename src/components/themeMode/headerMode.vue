<template>
    <el-select v-model="theme" size="mini" @change="headerModeChange">
        <el-option
            v-for="item in themeMap"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
import { mapGetters } from 'vuex';
import { headerGroup } from './theme.js';

export default {
    data() {
        return {
            theme: 'top-fixed',
            themeMap: [...headerGroup]
        }
    },
    computed: {
        ...mapGetters(['headerMode'])
    },
    mounted() {
        this.theme = this.headerMode;
    },
    methods: {
        headerModeChange(mode) {
            this.$store.dispatch('toggleHeaderMode', mode)
        }
    }
}
</script>

<style>

</style>