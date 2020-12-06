<template>
    <el-dialog
            width="35%"
            :title="title"
            :visible.sync="visible"
            :before-close="hideDialog"
            :append-to-body="true"
            :close-on-click-modal="false"
    >
        <div class="dialog-form">
            <el-form :label-width="'70px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <el-select v-model="form.deptId" clearable placeholder="请选择">
                        <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" prop="postCode">
                    <el-select v-model="form.postCode" clearable placeholder="请选择">
                        <el-option v-for="item in postList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="roleIds">
                    <el-select v-model="form.roleIds" clearable multiple placeholder="请选择" style="width: 100%;">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文字描述" prop="description">
                    <el-input type="textarea" v-model="form.remark"></el-input>
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
        name: 'CreateAdminDialog',
        data() {
            return {
                title: '',
                form: {
                    id: '',
                    userName: '',
                    password: '',
                    realName: '',
                    deptId: '',
                    postCode: '',
                    roleIds: [],
                    remark: '',
                },
                rules: {
                    userName: [{required: true, message: '请填写用户名', trigger: 'blur'}],
                    password: [{required: true, validator: this.checkPassword, trigger: 'blur'}],
                    realName: [{required: true, message: '请填写姓名', trigger: 'blur'}],
                    deptId: [{required: true, message: '请选择部门', trigger: 'blur'}],
                    postCode: [{required: true, message: '请选择职位', trigger: 'blur'}],
                    roleIds: [{required: true, message: '请选择角色', trigger: 'blur'}],
                },
            }
        },
        props: {
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            error: {},
            updateItem: Object,
            deptList: Array,
            postList: Array,
            roleList: Array,
        },
        methods: {
            //密码校验
            checkPassword(rule, value, callback) {
                const phoneReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/
                if (!value) {
                    return callback(new Error('密码不能为空'))
                }
                if (phoneReg.test(value) && value.length > 7) {
                    callback()
                } else {
                    callback(new Error('密码需要大小写字母、数字、特殊字符任意两组组成且长度最少八位'))
                }
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
            visible: async function (n) {
                if (n) {
                    this.title = '新增用户';
                    if (this.updateItem && this.updateItem.id) {
                        this.form = this.updateItem;
                        this.title = '修改用户';
                    } else {
                        this.form.id = '';
                        this.form.userName = '';
                        this.form.password = '';
                        this.form.realName = '';
                        this.form.deptId = '';
                        this.form.postCode = '';
                        this.form.roleIds = [];
                        this.form.remark = '';
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
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '操作成功',
                        });
                        this.$refs['form'].resetFields()
                    }
                }
            },
        },
        components: {}
    }
</script>
<style scoped>
</style>
