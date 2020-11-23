<template>
    <el-select v-model="theme" size="mini" @change="asideModeChange">
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
import { asideGroup } from './theme.js';

export default {
    data() {
        return {
            theme: 'left-fixed',
            themeMap: [...asideGroup]
        }
    },
    computed: {
        ...mapGetters(['asideMode'])
    },
    mounted() {
        this.theme = this.asideMode;
    },
    methods: {
        asideModeChange(mode) {
            this.$store.dispatch('toggleAsideMode', mode)
        }
    }
}
</script>

<style>

</style>