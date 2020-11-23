<template>
    <el-dropdown @command="langToogle" trigger="click">
        <el-button type="text" title="国际化">
            {{langSelect.label}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item 
                v-for="item in langNames" 
                :key="item.value" 
                :disabled="item.value === langSelect.value"
                :command="item.value">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { langs } from '@/lang';

export default {
    data() {
        return {
            langNames: [...langs]
        }
    },
    computed: {
        langSelect() {
            let item = this.langNames.find(v => v.value === this.$i18n.locale);
            if(item) {
                return item
            } else {
                return this.langNames[0]
            }
        },
    },
    methods: {
        langToogle(command) {
            this.$i18n.locale = command;
            localStorage.setItem('lang', command);
        }
    },
}
</script>

<style>

</style>