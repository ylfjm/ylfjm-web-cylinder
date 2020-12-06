<template>
    <el-dialog
            width="50%"
            :visible.sync="visible"
            :before-close="hideDialog"
            :append-to-body="true"
            :lock-scroll="false"
            :close-on-click-modal="false"
    >
        <div slot="title">
            <div class="page_title">
                <span class="taskId" v-text="task.id"></span>
                <span class="taskName" v-text="task.name"></span>
            </div>
        </div>
        <div class="dialog-form">
            <el-form :label-width="formLabelWidth" ref="form" :model="form">
                <div class="dp-table" v-if="opeType === 'assign'">
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
                <div class="dp-table" v-if="opeType === 'done'">
                    <el-form-item label="预计完成日期" prop="estimateDate">
                        <el-date-picker
                                v-model="form.estimateDate"
                                type="date"
                                :clearable="false"
                                style="width: 200px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <!--<el-form-item label="备注" prop="content" style="width: 96%;">
                    <QuillEditor @change="changeContent" :editorContent="form.remark"></QuillEditor>
                </el-form-item>-->
                <el-form-item label="备注" prop="content">
                    <KindEditor id="editor_id" :content.sync="editorText"
                                :afterChange="afterChange()" :loadStyleMode="false"
                                @on-content-change="onContentChange"></KindEditor>
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
    import KindEditor from '@/components/KindEditor/index'

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
                    remark: '',
                    estimateDate: '',
                },
                formLabelWidth: '80px',
                userList: [
                    {label: "用户1", value: "user01"},
                    {label: "用户2", value: "user02"},
                    {label: "用户3", value: "user03"},
                    {label: "用户4", value: "user04"},
                ],
                editorText: '',// 双向同步的变量
            }
        },
        props: {
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            task: Object,
            opeType: String,
        },
        methods: {
            changeContent(data) {
                this.form.remark = data;
            },
            currentSubmit(formName) {
                this.submit(this.form)
            },
            onContentChange(data) {
                // console.log(data)
                this.form.remark = data;
            },
            afterChange() {
                console.log("afterChange")
            }
        },
        watch: {
            visible: function (n) {
                if (n) {
                    this.form.pdDesigner = this.task.pdDesigner ? this.task.pdDesigner.split(',') : null;
                    this.form.uiDesigner = this.task.uiDesigner ? this.task.uiDesigner.split(',') : null;
                    this.form.webDeveloper = this.task.webDeveloper ? this.task.webDeveloper.split(',') : null;
                    this.form.androidDeveloper = this.task.androidDeveloper ? this.task.androidDeveloper.split(',') : null;
                    this.form.iosDeveloper = this.task.iosDeveloper ? this.task.iosDeveloper.split(',') : null;
                    this.form.serverDeveloper = this.task.serverDeveloper ? this.task.serverDeveloper.split(',') : null;
                    this.form.tester = this.task.tester ? this.task.tester.split(',') : null;

                    if (this.opeType === 'done') {
                        this.formLabelWidth = '110px'
                    }
                }
            }
        },
        components: {
            QuillEditor,
            KindEditor
        },
    }
</script>
<style scoped>
    .taskId {
        font-size: 15px;
        font-weight: bold;
        color: #838a9d;
        border: 1px solid #838a9d;
        padding: 2px 5px;
        border-radius: 2px;
        margin-left: 5px;
        line-height: 24px;
    }

    .taskName {
        font-size: 15px;
        font-weight: bold;
        margin-left: 20px;
        line-height: 24px;
    }
</style>
