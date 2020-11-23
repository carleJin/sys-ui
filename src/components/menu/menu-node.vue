<template>
    <div class="menu-node">
        <el-submenu v-if="node.children && node.children.length" :index="node.path">
            <template v-slot:title>
                <i v-if="node.icon" :class="node.icon"></i>
                <span class="menu-node-text">{{node.title}}</span>
            </template>
            <el-menu-item-group v-if="node.children && node.children.length">
                <MenuNode
                    v-for="(child, index) in node.children"
                    :node="child" 
                    :key="index"></MenuNode>
            </el-menu-item-group>
        </el-submenu>
        <router-link v-else :to="node.path">
            <!-- <el-menu-item v-else :index="node.path"> -->
            <el-menu-item :index="node.path">
                <i v-if="node.icon" :class="node.icon"></i>
                <template v-slot:title>
                    <span>{{node.title}}</span>
                </template>
            </el-menu-item>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'MenuNode',
    props: {
        node: {
            default() {
                return {}
            }
        }
    }
}
</script>
