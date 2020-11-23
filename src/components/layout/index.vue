<template>
    <el-container class="layout-container">
        <el-aside class="layout-aside" 
            :class="asideMode" 
            :width="menusCollapse ? '65px' : '200px'">
            <LeftMenu />
        </el-aside>
        <el-container class="layout-content" :style="{marginLeft: menusCollapse ? '65px' : '200px'}">
            <el-header class="layout-header" 
                :class="headerMode" :style="headerStyle">
                <Header />
            </el-header>
            <el-main class="layout-main" :style="mainStyle">
                <BreadCrumb />
                <transition name="slide">
                    <router-view />
                </transition>
            </el-main>
        </el-container>

        <!-- 系统配置 -->
        <Settings></Settings>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/header';
import LeftMenu from '@/components/menu';
import BreadCrumb from '@/components/breadcrumb';
import Settings from '@/components/settings';

export default {
    components: {
        Header,
        LeftMenu,
        BreadCrumb,
        Settings,
    },
    data() {
        return { }
    },
    computed: {
        ...mapGetters(['menusCollapse', 'asideMode', 'headerMode']),
        headerStyle() {
            const { headerMode, menusCollapse } = this;
            if(headerMode === 'top-fixed') {
                return {left: menusCollapse ? '65px' : '200px'}
            }
            return null
        },
        mainStyle() {
            const { headerMode } = this;
            if(headerMode === 'top-fixed') {
                return {paddingTop: headerMode ? '72px' : '12px'}
            }
            return null
        }
    }
}
</script>

<style scoped lang="less">
.slide-enter{
    filter: blur(4px);
}
.slide-enter-active{
    transition: all .3s ease;
}
.slide-leave{
    width: 0;
    height: 0;
    overflow: hidden;
}
.slide-leave-active{
    transition: all 0s;
}

.layout-container{
    min-height: 100%;
    position: relative;
    .layout-aside{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        transition: .2s;
        z-index: 2000;
        &.left{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
        }
        &.left-fixed{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
        }
    }
    .layout-content{
        margin-left: 200px;
        transition: .2s;
        position: relative;
    }
    .layout-header{
        padding: 0;
        transition: .2s;
        z-index: 1000;
        &.top{
            position: relative;
        }
        &.top-fixed{
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
        }
    }
    .layout-main{
        padding: 12px;
    }
}
</style>