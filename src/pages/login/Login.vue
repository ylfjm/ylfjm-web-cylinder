<template>
    <div class="login-main">
        <el-form :model="form" class="login-form">
            <div class="title">系统登录</div>
            <el-form-item>
                <el-input type="text" v-model="form.userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 8px;">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 5px; text-align: right;">
                <el-checkbox v-model="rememberPassword" @change="handleChecked">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-button" :loading="loginLoading" @click="loginSubmit">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js'

    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    userName: localStorage.getItem('remember_userName'),
                    password: localStorage.getItem('remember_password')
                },
                rememberPassword: JSON.parse(localStorage.getItem('remember_password_checked')),
                loginLoading: false,
                // rules: {
                //     userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                //     password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                // }
            }
        },
        methods: {
            handleChecked(value) {
                localStorage.setItem('remember_password_checked', value);
            },
            async loginSubmit() {
                if (this.form.userName.trim() === '') {
                    this.$message({
                        message: '请输入用户名',
                        type: 'warning',
                        duration: 1000
                    });
                    return false;
                }
                if (this.form.password.trim() === '') {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning',
                        duration: 1000
                    });
                    return false;
                }
                this.loginLoading = true;
                const res = await this.$service.userLogin({
                    userName: this.form.userName.trim(),
                    password: CryptoJS.MD5(this.form.password.trim()).toString()
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
                    if (this.rememberPassword) {
                        localStorage.setItem('remember_userName', this.form.userName.trim());
                        localStorage.setItem('remember_password', this.form.password.trim());
                    } else {
                        localStorage.removeItem('remember_userName');
                        localStorage.removeItem('remember_password');
                    }
                    // menus.map(item => {
                    //     if (item.url && item.url === '/daily-list.html') {
                    //         localStorage.setItem('activeMenuId', item.id);
                    //         localStorage.removeItem('activeSubMenuId');
                    //     }
                    // });
                    this.$router.push('/index.html')
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '登录失败',
                    })
                }
                this.loginLoading = false;
            },
            enterKey(event) {
                const componentName = this.$options.name;
                if (componentName === "Login") {
                    const code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                    if (code === 13) {
                        this.loginSubmit();
                    }
                }
            },
            enterKeyupDestroyed() {
                document.body.removeEventListener("keyup", this.enterKey, false);
            },
            enterKeyup() {
                document.body.addEventListener("keyup", this.enterKey, false);
            },
        },
        mounted() {
            // 绑定enter事件
            this.enterKeyup();
        },
        destroyed() {
            // 销毁enter事件
            this.enterKeyupDestroyed();
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
