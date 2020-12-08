<template>
    <el-dialog
            :width="width"
            :title="title"
            :visible.sync="visible"
            :before-close="hideDialog"
    >
        <div class="dialog-form">
            <el-form
                    :model="updateItem"
                    :label-width="formLabelWidth"
                    ref="updateDialogForm"
            >
                <CustomFormItem
                        v-for="column in columns"
                        :key="column.label"
                        :rules="column.rules"
                        :label="column.label"
                        :fieldName="column.fieldName"
                        :type="column.type"
                        :defaultValue="updateItem[column.fieldName]"
                        :column="column"
                        :dataType="column.dataType"
                        @changeFieldValue="changeField"
                ></CustomFormItem>
            </el-form>
        </div>
        <div slot="footer" class="text-center">
            <el-button size="medium" @click="hideDialog">取 消</el-button>
            <el-button
                    style="margin-left: 30px;"
                    size="medium"
                    type="primary"
                    @click="currentSubmit"
                    :loading="loading"
            >
                确 定
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
    import CustomFormItem from './CustomFormItem'

    export default {
        name: 'updateDialogForm',
        data() {
            return {}
        },
        props: {
            title: String,
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            columns: Array,
            updateItem: Object,
            loading: Boolean,
            error: {},
            width: {
                default: '50%'
            },
            formLabelWidth: {
                default: '30%'
            },
            changeFieldValue: Function
        },
        methods: {
            changeField(data) {
                this.$emit('changeFieldValue', {
                    ...data,
                    type: 'updateItem'
                })
            },

            currentSubmit() {
                this.$refs['updateDialogForm'].validate(valid => {
                    if (valid) {
                        this.submit(this.updateItem)
                    } else {
                        return false
                    }
                })
            }
        },
        watch: {
            loading: function (n, o) {
                if (o && !n) {
                    if (this.error) {
                        this.$notify.error({
                            title: '提示',
                            message: typeof this.error === 'boolean' ? '修改失败' : this.error,
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '修改成功',
                        })
                        this.$refs['updateDialogForm'].resetFields()
                    }
                }
            }
        },
        components: {
            CustomFormItem
        }
    }
</script>
