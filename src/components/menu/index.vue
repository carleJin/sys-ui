<template>
    <div class="menu"
        :class="`mode-${themeMode}`">
        <div class="menu-content">
            <el-scrollbar class="menu-content-scrollbar">
                <el-menu
                    class="menu-nav"
                    :collapse="menusCollapse"
                    :default-active="defaultActive"
                    uniqueOpened 
                    v-bind="menuAttrs">
                    <MenuNode 
                        v-for="(item, index) in (menus || [])"
                        :node="item" 
                        :key="index"></MenuNode>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuNode from './menu-node.vue';
import { themeGroup } from '@/components/themeMode/theme.js';
const themeMap = {};
themeGroup.forEach(item => {
    themeMap[item.value] = item.color
})

const MENUTHEME = {
    dark: {
        backgroundColor: themeMap.dark,
        textColor: "#FFFFFF",
        activeTextColor: "#409EFF",
    },
    bright: {
        backgroundColor: themeMap.bright,
        textColor: "#303133",
        activeTextColor: "#409EFF",
    },
    blue: {
        backgroundColor: themeMap.blue,
        textColor: "#FFFFFF",
        activeTextColor: "#E6A23C",
    }
}

export default {
    components: {
        MenuNode
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['menus', 'menusCollapse', 'themeMode']),
        defaultActive() {
            const { parent } = this.$route.meta;
            return (parent && parent.length && parent[0].path) || this.$route.path
        },
        menuAttrs() {
            const { themeMode } = this;
            if(themeMode && MENUTHEME[themeMode]) {
                return MENUTHEME[themeMode]
            } else {
                return MENUTHEME['dark']
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/assets/styles/theme-color.less';

.menu{
    height: 100%;
    transition: .2s;
    box-sizing: border-box;
    border-right: 1px solid @theme-dark-color;
    background-color: @theme-dark-color;
    &.mode-dark{
        background-color: @theme-dark-color;
        border-right-color: @theme-dark-color;
    }
    &.mode-bright{
        background-color: @theme-bright-color;
        border-right-color: #E4E7ED;
    }
    &.mode-blue{
        background-color: @theme-blue-color;
        border-right-color: @theme-blue-color;
    }
    .menu-content{
        height: 100%;
        /deep/.menu-content-scrollbar{
            height: 100%;
            .el-scrollbar__wrap{
                overflow-x: hidden!important;
            }
        }
    }
    .menu-nav{
        transition: .2s;
        border-right: none;
    }
}

/deep/ .el-menu--collapse{
    .menu-node .menu-node-text {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
    }
}
</style>