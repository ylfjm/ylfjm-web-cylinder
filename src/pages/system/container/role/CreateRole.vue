<template>
    <el-dialog
            width="30%"
            :title="title"
            :visible.sync="visible"
            :before-close="hideDialog"
            :append-to-body="true"
            :close-on-click-modal="false"
    >
        <div class="dialog-form">
            <el-form :label-width="'80px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="文字描述" prop="description">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <!--<el-form-item label="添加权限" prop="permissionIds">
                    <el-tree
                            :data="permissions"
                            show-checkbox
                            node-key="key"
                            ref="permissions"
                            default-expand-all
                            @check="changePublic"
                            :props="defaultProps"
                    ></el-tree>
                </el-form-item>-->
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
        name: 'createRole',
        data() {
            return {
                form: {
                    name: '',
                    description: '',
                    permissionIds: []
                },
                rules: {
                    name: [{required: true, message: '请填写角色名', trigger: 'blur'}],
                    description: [],
                    permissionIds: []
                },
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    value: 'value',
                    key: 'key'
                },
                permissions: []
            }
        },
        props: {
            title: String,
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            error: {}
        },
        methods: {
            currentSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.submit({
                            ...this.form,
                            permissionIds: this.form.permissionIds.map(item => {
                                return item.value
                            })
                        })
                    } else {
                        return false
                    }
                })
            },
            changePublic(checkedNodes, checkedKeys) {
                this.form.permissionIds = checkedKeys.checkedNodes.filter(item => {
                    return item.level === ''
                })
            }
        },
        watch: {
            visible: async function (n) {
                if (n) {
                    const res = await this.$service.getMenuWithPermissionByRoleId({})
                    if (res.code === 20000) {
                        this.permissions = mapMenuData(res.data)
                    }
                }
            },
            loading: function (n, o) {
                if (o && !n) {
                    if (this.error) {
                        this.$notify.error({
                            title: '提示',
                            message: typeof this.error === 'boolean' ? '新增角色失败' : this.error,
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '新增角色成功',
                        })
                        this.$refs['form'].resetFields()
                        this.$refs.permissions.setCheckedKeys([])
                    }
                }
            }
        },
        components: {}
    }
    const mapMenuData = data => {
        return data ? data.map(item => {
            return {
                key: item.level ? item.id + '-' + item.level : item.id,
                value: item.id,
                label: item.name,
                level: item.level || '',
                children: item.subMenus && item.subMenus.length !== 0 ? mapMenuData(item.subMenus) : mapMenuData(item.permissions)
            }
        }) : data
    }
</script>
<style scoped></style>
