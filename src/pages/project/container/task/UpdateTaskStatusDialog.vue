<template>
    <el-dialog
            width="50%"
            :visible.sync="visible"
            :before-close="hideDialog"
    >
        <div slot="title">
            <div class="page_title">
                <span class="taskId" v-text="task.id"></span>
                <span class="taskName" v-text="task.name"></span>
            </div>
        </div>
        <div class="dialog-form">
            <el-form :label-width="formLabelWidth" ref="form" :rules="rules" :model="form">
                <div class="dp-table" v-if="actionType === 'assign'">
                    <div class="dp-table-cell col-6">
                        <el-form-item label="产品设计">
                            <el-select v-model="form.pdDesigner" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="item.postCode === 'po'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="UI设计">
                            <el-select v-model="form.uiDesigner" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="item.postCode === 'ui'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="安卓开发">
                            <el-select v-model="form.androidDeveloper" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="item.postCode === 'android'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="苹果开发">
                            <el-select v-model="form.iosDeveloper" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="item.postCode === 'ios'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="dp-table-cell col-6">
                        <el-form-item label="前端开发">
                            <el-select v-model="form.webDeveloper" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="['web','dev'].indexOf(item.postCode) > -1">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="后端开发">
                            <el-select v-model="form.serverDeveloper" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="item.postCode === 'dev'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测试人员">
                            <el-select v-model="form.tester" clearable placeholder="请选择" style="width: 90%;">
                                <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                           v-show="item.postCode === 'test'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div v-if="actionType === 'estimate'">
                    <el-form-item label="预计完成" prop="estimateDate">
                        <el-date-picker
                                v-model="form.estimateDate"
                                type="date"
                                :clearable="false"
                                style="width: 200px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div v-if="actionType === 'complete'">
                    <el-form-item label="完成时间" prop="finishedDate">
                        <el-date-picker
                                v-model="form.finishedDate"
                                type="date"
                                :clearable="false"
                                style="width: 200px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div style="margin-left: 12px;">备注</div>
                <div style="margin-top: 5px;">
                    <KindEditor id="editor_id" :content.sync="form.remark" @onContentChange="onContentChange"></KindEditor>
                </div>
                <!--<el-form-item label="备注" prop="content">-->
                    <!--<KindEditor id="editor_id" @on-content-change="onContentChange"></KindEditor>-->
                <!--</el-form-item>-->
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
    // import QuillEditor from '@/components/common/QuillEditor'
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
                    finishedDate: '',
                },
                formLabelWidth: '80px',
                rules: {
                    estimateDate: [{required: true, message: '请选择预计完成时间', trigger: 'blur'}],
                },
            }
        },
        props: {
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            task: Object,
            actionType: String,
            adminList: Array,
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
            onContentChange(data) {
                this.form.remark = data;
            },
        },
        watch: {
            visible: function (n) {
                if (n) {
                    this.form.pdDesigner = this.task.pdDesigner;
                    this.form.uiDesigner = this.task.uiDesigner;
                    this.form.webDeveloper = this.task.webDeveloper;
                    this.form.androidDeveloper = this.task.androidDeveloper;
                    this.form.iosDeveloper = this.task.iosDeveloper;
                    this.form.serverDeveloper = this.task.serverDeveloper;
                    this.form.tester = this.task.tester;
                }
            }
        },
        components: {
            // QuillEditor,
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
