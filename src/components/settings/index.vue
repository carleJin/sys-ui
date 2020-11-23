<template>
    <Drawer title="系统配置">
        <el-row class="row" type="flex" align="middle" :gutter="20">
            <el-col :span="12">主题色</el-col>
            <el-col :span="12">
                <ThemePicker />
            </el-col>
        </el-row>
        <el-row class="row" type="flex" align="middle" :gutter="20">
            <el-col :span="12">主题模式</el-col>
            <el-col :span="12">
                <ThemeModeTpl />
            </el-col>
        </el-row>
        <el-row class="row" type="flex" align="middle" :gutter="20">
            <el-col :span="12">菜单模式</el-col>
            <el-col :span="12">
                <AsideModeTpl />
            </el-col>
        </el-row>
        <el-row class="row" type="flex" align="middle" :gutter="20">
            <el-col :span="12">头部模式</el-col>
            <el-col :span="12">
                <HeaderModeTpl />
            </el-col>
        </el-row>
    </Drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import Drawer from './drawer';
import ThemePicker from '@/components/themePicker';
import ThemeModeTpl from '@/components/themeMode';
import AsideModeTpl from '@/components/themeMode/asideMode';
import HeaderModeTpl from '@/components/themeMode/headerMode';

export default {
    components: {
        Drawer,
        ThemePicker,
        ThemeModeTpl,
        AsideModeTpl,
        HeaderModeTpl
    }
}
</script>

<style lang="less" scoped>
.row{
    &+.row{
        margin-top: 10px;
    }
}
</style>