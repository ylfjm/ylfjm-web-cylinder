<template>
    <el-dialog width="30%" :title="title" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <el-form :label-width="'80px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="CODE值" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="权限方法" prop="method">
                    <el-input v-model="form.method"></el-input>
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
        name: 'PermissionDialog',
        data() {
            return {
                title: '',
                form: {
                    name: '',
                    code: '',
                    method: '',
                },
                rules: {
                    name: [{required: true, message: '请填写权限名称', trigger: 'blur'}],
                    code: [{required: true, message: '请填写CODE值', trigger: 'blur'}],
                    method: [{required: true, message: '请填写权限方法', trigger: 'blur'}],
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
                    this.title = '新增权限';
                    if (this.updateObj && this.updateObj.id) {
                        this.form = this.updateObj;
                        this.title = '修改权限';
                    } else {
                        this.form.name = '';
                        this.form.code = '';
                        this.form.method = '';
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
