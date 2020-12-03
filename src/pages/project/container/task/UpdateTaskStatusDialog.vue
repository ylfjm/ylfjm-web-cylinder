<template>
    <el-dialog
            width="50%"
            :title="title"
            :visible.sync="visible"
            :before-close="hideDialog"
            :append-to-body="true"
            :lock-scroll="false"
            :close-on-click-modal="false"
    >
        <div class="dialog-form">
            <el-form :label-width="'70px'" ref="form" :model="form">
                <div class="dp-table" v-if="type === 1">
                    <div class="dp-table-cell col-6">
                        <el-form-item label="产品设计">
                            <el-select v-model="form.pdDesigner" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="UI设计">
                            <el-select v-model="form.uiDesigner" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="安卓开发">
                            <el-select v-model="form.androidDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="苹果开发">
                            <el-select v-model="form.iosDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="dp-table-cell col-6">
                        <el-form-item label="前端开发">
                            <el-select v-model="form.webDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="后端开发">
                            <el-select v-model="form.serverDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测试人员">
                            <el-select v-model="form.tester" clearable multiple placeholder="请选择" style="width: 90%;">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item label="备注" prop="content" style="width: 96%;">
                    <QuillEditor @change="changeContent" :editorContent="form.content"></QuillEditor>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="text-center">
            <el-button type="primary" @click="currentSubmit('form')" :loading="loading" style="width: 100px;">
                确 定
            </el-button>
            <el-button style="margin-left: 30px; width: 100px;" @click="hideDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import QuillEditor from '@/components/common/QuillEditor'

    export default {
        name: 'UpdateTaskStatusDialog',
        data() {
            return {
                form: {
                    pdDesigner: null,
                    uiDesigner: null,
                    webDeveloper: null,
                    androidDeveloper: null,
                    iosDeveloper: null,
                    serverDeveloper: null,
                    tester: null,
                    content: '',
                },
                title: '指派',
                userList: [
                    {label: "用户1", value: "user01"},
                    {label: "用户2", value: "user02"},
                    {label: "用户3", value: "user03"},
                    {label: "用户4", value: "user04"},
                ],
            }
        },
        props: {
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            task: Object,
            type: Number,//1-指派
        },
        methods: {
            changeContent(data) {
                console.log("data=" + data);
                this.form.content = data;
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
                    if (this.type === 1) {
                        this.title = '指派';
                    } else if (this.type === 2) {
                        this.title = '取消';
                    } else if (this.type === 3) {
                        this.title = '关闭';
                    }
                    this.form.pdDesigner = this.task.pdDesigner ? this.task.pdDesigner.split(',') : null;
                    this.form.uiDesigner = this.task.uiDesigner ? this.task.uiDesigner.split(',') : null;
                    this.form.webDeveloper = this.task.webDeveloper ? this.task.webDeveloper.split(',') : null;
                    this.form.androidDeveloper = this.task.androidDeveloper ? this.task.androidDeveloper.split(',') : null;
                    this.form.iosDeveloper = this.task.iosDeveloper ? this.task.iosDeveloper.split(',') : null;
                    this.form.serverDeveloper = this.task.serverDeveloper ? this.task.serverDeveloper.split(',') : null;
                    this.form.tester = this.task.tester ? this.task.tester.split(',') : null;
                }
            }
        },
        components: {
            QuillEditor
        },
    }
</script>
<style scoped>
    .edit_container {
        height: 220px;
    }

    .edit_container /deep/ .quill-editor {
        height: 150px;
    }
</style>
