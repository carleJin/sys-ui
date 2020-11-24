<template>
    <div class="header"
        :class="`mode-${themeMode}`">
        <div class="menus-collapse" @click="toggleMenusCollapse">
            <i :class="menusCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>

        <div class="right">

            <!-- 国际化 -->
            <div class="right-item">
                <International />
            </div>

            <!-- 全屏 -->
            <div class="right-item">
                <FullScreen />
            </div>
            
            <!-- 用户信息及退出 -->
            <div class="right-item">
                <el-dropdown trigger="click">
                    <el-button type="text">
                        <i class="el-icon-setting"></i> 
                        {{user && user.username}}
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="loginOut">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { loginOutServe } from '@/serve/auth';
import { authToken } from '@/utils/auth';
import International from '@/components/international';
import FullScreen from '@/components/fullScreen';

export default {
    components: {
        International,
        FullScreen
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['user', 'menusCollapse', 'themeMode'])
    },
    methods: {
        toggleMenusCollapse() {
            this.$store.dispatch('changeSettings', {key: 'menusCollapse', value: !this.menusCollapse})
        },
        asyncLoginOut() {
            loginOutServe().then(() => {
                this.$store.dispatch('resetAuthState', null).then(() => {
                    // location.reload();
                    this.$router.push('/login')
                });
            }).catch(async () => {
                this.$store.dispatch('resetAuthState', null).then(() => {
                    // location.reload();
                    this.$router.push('/login')
                });
            })
        },
        loginOut() {
            this.$store.dispatch('resetAuthState', null).then(() => {
                authToken.removeToken();
                location.reload();
                // this.$router.push('/login')
            });
        }
    },
}
</script>

<style scoped lang="less">
@import '~@/assets/styles/theme-color.less';

.header{
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    height: 100%;
    justify-content: space-between;
    // border-bottom: 1px solid #E4E7ED;
    box-shadow: 0 2px 10px #E4E7ED;
    background-color: #fff;
    &.mode-dark{
        background-color: @theme-dark-color;
        color: #fff;
        .menus-collapse{
            color: #fff;
        }
    }
    &.mode-bright{
        background-color: @theme-bright-color;
    }
    &.mode-blue{
        background-color: @theme-bright-color;
    }
    .menus-collapse{
        margin-right: 10px;
        padding: 10px;
        font-size: 28px;
        background-color: transparent;
        transition: .2s;
        color: #409EFF;
        cursor: pointer;
        &:hover{
            background-color: rgba(0, 0, 0, .3);
        }
    }
    .right{
        margin-right: 12px;
        display: flex;
        align-items: center;
        .right-item{
            &+.right-item{
                margin-left: 10px;
            }
        }
    }
}
</style>