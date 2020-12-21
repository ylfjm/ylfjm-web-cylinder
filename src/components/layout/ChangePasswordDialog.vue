<template>
    <el-dialog width="35%" title="修改密码" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <el-form :label-width="'80px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="旧密码" prop="password">
                    <el-input size="medium" v-model="form.password" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input size="medium" v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="newPasswordConfirm">
                    <el-input size="medium" v-model="form.newPasswordConfirm" type="password" placeholder="请确认新密码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="text-center">
            <el-button type="primary" @click="currentSubmit('form')" :loading="loading">确 定</el-button>
            <el-button style="margin-left: 30px;" @click="hideDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'ChangePasswordDialog',
        data() {
            return {
                form: {
                    password: '',
                    newPassword: '',
                    newPasswordConfirm: '',
                },
                rules: {
                    password: [{required: true, message: '请填写旧密码', trigger: 'blur'}],
                    newPassword: [{required: true, validator: this.checkPassword, trigger: 'blur'}],
                    newPasswordConfirm: [{required: true, validator: this.checkPassword2, trigger: 'blur'}],
                },
            }
        },
        props: {
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            error: {},
            updateObj: Object,
        },
        methods: {
            //密码校验
            checkPassword(rule, value, callback) {
                const phoneReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/
                if (!value) {
                    return callback(new Error('密码不能为空'))
                }
                if (value.trim() === this.password.trim()) {
                    return callback(new Error('新密码不能与旧密码一致'))
                }
                if (phoneReg.test(value) && value.length > 7) {

                    callback()
                } else {
                    callback(new Error('密码需要大小写字母、数字、特殊字符任意两组组成且长度最少八位'))
                }
            },
            checkPassword2(rule, value, callback) {
                if (!value) {
                    return callback(new Error('密码不能为空'))
                }
                if (value.trim() !== this.form.newPassword.trim()) {
                    return callback(new Error('2次填写的密码不一致'))
                }
                callback()
            },
            currentSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.submit(this.form)
                    } else {
                        return false
                    }
                })
            },
        },
        watch: {
            visible: function (n) {
                if (n) {
                    if (this.updateObj && this.updateObj.id) {
                        this.form = this.updateObj;
                    }
                    if (this.$refs['form']) {
                        this.$refs['form'].clearValidate();
                    }
                }
            },
            loading: function (n, o) {
                if (o && !n) {
                    if (this.error) {
                        this.$notify.error({
                            title: '提示',
                            message: typeof this.error === 'boolean' ? '操作失败' : this.error,
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '操作成功',
                            duration: 2000
                        });
                        this.$refs['form'].resetFields()
                    }
                }
            },
        },
    }
</script>
<style scoped>
</style>
