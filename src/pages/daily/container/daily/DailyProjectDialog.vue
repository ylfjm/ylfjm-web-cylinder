<template>
    <el-dialog width="30%" :title="title" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <el-form :label-width="'50px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sorts">
                    <el-input-number
                            v-model="form.sorts"
                            :min="0"
                            style="width: 50%;">
                    </el-input-number>
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
        name: 'DailyProjectDialog',
        data() {
            return {
                title: '',
                form: {
                    name: '',
                    sorts: '',
                },
                rules: {
                    name: [{required: true, message: '请填写名称', trigger: 'blur'}],
                    sorts: [{required: true, message: '请填写排序', trigger: 'blur'}],
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
                    this.title = '添加日报项目';
                    if (this.updateObj && this.updateObj.id) {
                        this.form = this.updateObj;
                        this.title = '修改日报项目';
                    } else {
                        this.form.name = '';
                        this.form.sorts = '';
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
