<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item 
                v-for="(item, index) in crumbs"
                :key="index">
                <router-link 
                    v-if="(index < crumbs.length - 1 && item.type != 'layout')" 
                    :to="{ path: item.path }">{{item.title}}</router-link>
                <span v-else>{{item.title}}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        crumbs() {
            let { parent = [], title = '' } = this.$route.meta;
            parent = [...parent, {path: this.$route.path, title}];
            if(!parent.find(v => v.path === '/home')) {
                parent.unshift({path: '/home', title: '首页'})
            }
            return parent
        }
    },
}
</script>

<style scoped>
.crumbs{
    padding: 12px;
}
</style>