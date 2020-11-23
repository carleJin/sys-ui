<template>
    <div class="login">
        <div class="login-container">
            <div class="login-form">
                <div>
                    <h2 class="login-form-title">系统登录</h2>
                </div>
                <el-form class="login-el-form" :model="ruleForm" :rules="rules" ref="rf">
                    <el-form-item prop="userId">
                        <el-input v-model="ruleForm.userId" 
                            class="login-input"
                            placeholder="请输入用户名">
                            <i slot="prefix" class="el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" 
                            type="password" 
                            class="login-input"
                            placeholder="请输入密码">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="randCode">
                        <el-row :gutter="10">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.randCode" 
                                    class="login-input"
                                    maxlength="6"
                                    placeholder="请输入验证码"
                                    @keyup.enter.native="loginTo('rf')">
                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <div class="captcha" @click="getCaptcha" title="点击刷新">
                                    <el-image :src="captcha" alt="验证码">
                                        <span slot="error">点击刷新</span>
                                    </el-image>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <div class="login-form-btns">
                        <el-button class="btn" type="primary" :loading="loading" @click="loginTo('rf')">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { authToken } from '@/utils/auth';
import { initLoginServe, captchaServe, loginInServe } from '@/serve/auth';

export default {
    data() {
        return {
            loading: false,
            ruleForm: {},
            rules: {
                userId: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入登录密码', trigger: 'blur'}
                ],
                randCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            },
            captcha: null
        }
    },
    created() {
        this.init();
        this.getCaptcha()
    },
    methods: {
        //判断是否登录
        init() {
            initLoginServe()
            .then(res => {
                this.$router.push('/home')
            })
            .catch(err => { })
        },
        //获取验证码
        getCaptcha() {
            captchaServe()
            .then(res => {
                this.captcha = 'data:image/gif;base64,' + res.data;
            })
            .catch(err => { })
        },
        //点击登录
        loginTo(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.asyncLogin(this.ruleForm);
                } else {
                    return false;
                }
            });
        },
        //发动登录请求
        asyncLogin(values) {
            if(this.loading) return;
            this.loading = true;

            loginInServe(values).then(async (res) => {
                if(res) {
                    console.log(res)
                    this.$router.push('/home')
                    // authToken.setToken(res.access_token);
                    // // await this.$store.dispatch('setToken', res.access_token);
                    // await this.$store.dispatch('setUser', res);

                    // /**
                    //  * 获取路由、菜单权限
                    //  * 此处优先把路由数据载入在进行跳转，可解决先跳转在加载路由而引发的 vue-router 报错
                    // */
                    // appInfoServe().then(() => {
                    //     this.loading = false;
                    //     this.$store.dispatch('setMenus', asyncMenus);
                    //     this.$store.dispatch('setRoutes', asyncRoutes).then(() => {
                    //         this.$router.push('/home')
                    //     });
                    // }).catch(() => {
                    //     this.loading = false;
                    // })
                }
            }).catch(err => {
                this.$message.error(err.message)
                this.loading = false;
            })
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
        .captcha{
            user-select: none;
            min-height: 40px;
            color: #909399;
            text-align: center;
            cursor: pointer;
            /deep/.el-image{
                display: block;
                 img{
                    width: 100%;
                    vertical-align: middle;
                }
            }
        }
    }
}

</style>