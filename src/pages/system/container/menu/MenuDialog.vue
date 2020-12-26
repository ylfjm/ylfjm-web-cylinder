<template>
    <el-dialog width="30%" :title="title" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <el-form :label-width="'70px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="菜单名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单URL" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="一级菜单" prop="pid">
                    <el-select v-model="form.pid" clearable placeholder="请选择一级菜单">
                        <el-option v-for="item in firstLevelMenuList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sorts">
                    <el-input-number
                            v-model="form.sorts"
                            :min="0"
                            style="width: 150px;">
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
        name: 'MenuDialog',
        data() {
            return {
                title: '',
                form: {
                    name: '',
                    url: '',
                    pid: '',
                    description: '',
                    sorts: '',
                },
                rules: {
                    name: [{required: true, message: '请填写菜单名', trigger: 'blur'}],
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
            firstLevelMenuList: Array
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
                    this.title = '新增菜单';
                    if (this.updateObj && this.updateObj.id) {
                        this.form = this.updateObj;
                        if (this.form.pid === 0) {
                            this.form.pid = '';
                        }
                        this.title = '修改菜单';
                    } else {
                        this.form.name = '';
                        this.form.url = '';
                        this.form.pid = '';
                        this.form.description = '';
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
