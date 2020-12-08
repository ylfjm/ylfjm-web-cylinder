<template>
    <el-dialog
            width="30%"
            :title="title"
            :visible.sync="visible"
            :before-close="hideDialog"
    >
        <div class="dialog-form">
            <el-form :label-width="'80px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="文字描述" prop="description">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="text-center">
            <el-button size="medium" @click="hideDialog">取 消</el-button>
            <el-button
                    style="margin-left: 30px;"
                    size="medium"
                    type="primary"
                    @click="currentSubmit('form')"
                    :loading="loading"
            >
                确 定
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'UpdateRole',
        data() {
            return {
                form: {
                    name: this.updateItem.name,
                    description: this.updateItem.description,
                },
                rules: {
                    name: [{required: true, message: '请填写角色名', trigger: 'blur'}],
                },
            }
        },
        props: {
            title: String,
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            error: {},
            updateItem: Object
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
            loading: function (n, o) {
                if (o && !n) {
                    if (this.error) {
                        this.$notify.error({
                            title: '提示',
                            message: typeof this.error === 'boolean' ? '修改角色失败' : this.error,
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '修改角色成功',
                        });
                        this.$refs['form'].resetFields()
                    }
                }
            },
            updateItem: function (n) {
                this.form = n
            }
        },
        components: {}
    }
</script>
<style scoped>
</style>
