<template>
    <div class="login-main">
        <el-form :model="form" :rules="rules" ref="form" class="login-form">
            <div class="title">系统登录</div>
            <el-form-item prop="userName">
                <el-input type="text" v-model="form.userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-button" @click="doSubmit">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js'

    export default {
        name: 'login',
        data() {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            doSubmit() {
                this.$refs['form'].validate(async valid => {
                    if (valid) {
                        const loading = this.$loading({
                            lock: true,
                            text: '努力加载中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.4)'
                        })
                        const res = await this.$service.adminLogin({
                            userName: this.form.userName.trim(),
                            password: CryptoJS.MD5(this.form.password.trim()).toString(),
                            sysType: 5
                        });
                        if (res.code === 20000) {
                            let admin = res.data;
                            let menus = admin.menus.map(item => {
                                return Object.assign({}, item, {
                                    childUrls: item.subMenus ? item.subMenus.map(c => {
                                        return c.url
                                    }) : []
                                })
                            });
                            this.$store.commit('setAdmin', admin);
                            this.$store.commit('setMenuList', menus);
                            localStorage.setItem('admin', JSON.stringify(admin));
                            localStorage.setItem('menuList', JSON.stringify(menus));
                            this.$router.push('/project-index.html')
                        } else {
                            this.$notify.error({
                                title: '提示',
                                message: res.message ? res.message : '登录失败',
                            })
                        }
                        loading.close()
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '登录失败',
                        });
                        return false
                    }
                })
            }
        },
        created() {
            let lett = this;
            document.onkeydown = function (e) {
                var key = window.event.keyCode;
                if (key === 13) {
                    lett.doSubmit();
                }
            }
        },
    }
</script>

<style>
    .login-main {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: white;
    }

    .login-form {
        width: 400px;
        margin: 0 auto;
        padding-top: 260px;
    }

    .title {
        margin: 0 auto 40px auto;
        text-align: center;
        font-size: 24px;
        color: #9fa0a9;
    }

    .login-form input {
        height: 54px !important;
        line-height: 54px !important;
        padding: 0 24px !important;
        font-size: 16px !important;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);*/
    }

    .login-button {
        width: 100% !important;
        font-size: 18px !important;
    }

    .login-button span {
        height: 28px !important;
        line-height: 28px !important;
    }
</style>
