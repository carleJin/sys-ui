<template>
    <div class="login">
        <div class="login-container">
            <div class="login-form">
                <div>
                    <h2 class="login-form-title">系统登录</h2>
                </div>
                <el-form class="login-el-form" :model="ruleForm" :rules="rules" ref="rf">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" class="login-input">
                            <i slot="prefix" class="el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.password" type="password" class="login-input">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <div class="login-form-btns">
                        <el-button class="btn" type="primary" :loading="loading" @click="loginTo('rf')">登录</el-button>
                        <!-- <el-button type="primary" @click="langToogle">en/中文</el-button> -->
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { authToken } from '@/utils/auth';
import { loginServe, appInfoServe } from '@/serve/auth';
import { userConfig } from '@/base.config';
const asyncMenus = require('@/menu.json');

const asyncRoutes = require('@/routes.json');

export default {
    data() {
        return {
            loading: false,
            ruleForm: {
                username: 'admin',
                password: 123456
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入登录密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        loginTo(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.login();
                    // this.asyncLogin();
                } else {
                    return false;
                }
            });
        },
        asyncLogin() {
            this.loading = true;

            loginServe().then(async (res) => {
                if(res) {
                    authToken.setToken(res.access_token);
                    // await this.$store.dispatch('setToken', res.access_token);
                    await this.$store.dispatch('setUser', res);

                    /**
                     * 获取路由、菜单权限
                     * 此处优先把路由数据载入在进行跳转，可解决先跳转在加载路由而引发的 vue-router 报错
                    */
                    appInfoServe().then(() => {
                        this.loading = false;
                        this.$store.dispatch('setMenus', asyncMenus);
                        this.$store.dispatch('setRoutes', asyncRoutes).then(() => {
                            this.$router.push('/home')
                        });
                    }).catch(() => {
                        this.loading = false;
                    })
                }
            }).catch(() => {
                this.loading = false;
            })

        },
        login() {
            // 登录并获取 token，用户信息，路由、菜单权限
            const res = {...userConfig};

            authToken.setToken(res.access_token);
            this.$store.dispatch('setToken', res.access_token);
            this.$store.dispatch('setUser', res);
            this.$store.dispatch('setMenus', asyncMenus);
            this.$store.dispatch('setRoutes', asyncRoutes).then(() => {
                this.$router.push('/home')
            });

        }
    },
}
</script>

<style lang="less" scoped>
.login{
    min-height: 100%;
    background: url('~@/assets/images/login/timg.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    .login-container{
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 160px 32px 0;
        max-width: 520px;
    }

    .login-form{
        width: 100%;
        box-sizing: border-box;
        padding: 38px;
        background-color: #fff;
        border-radius: 4px;
        .login-form-title{
            text-align: center;
        }
        .login-form-btns{
            text-align: center;
            .btn{
                width: 100%;
            }
        }
        .login-el-form{
            margin-top: 20px;
        }
    }
}

</style>