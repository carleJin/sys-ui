<template>
    <el-select v-model="theme" size="mini" @change="themeModeChange">
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
import { themeGroup } from './theme.js';

export default {
    data() {
        return {
            theme: 'dark',
            themeMap: [...themeGroup]
        }
    },
    computed: {
        ...mapGetters(['themeMode'])
    },
    mounted() {
        this.theme = this.themeMode;
    },
    methods: {
        themeModeChange(mode) {
            this.$store.dispatch('toggleMeunsMode', mode)
        }
    }
}
</script>

<style>

</style>