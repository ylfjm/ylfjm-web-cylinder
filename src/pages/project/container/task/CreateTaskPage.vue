<template>
    <div class="container">
        <div class="container-box">
            <div class="container-box-header">
                <span>创建任务</span>
            </div>
            <div class="container-box-body">
                <el-form :label-width="'80px'" ref="form" :rules="rules" :model="form">
                    <div class="dp-table">
                        <div class="dp-table-cell">
                            <el-form-item label="任务名称" prop="name" style="width: 100%;">
                                <el-input v-model="form.name" maxlength="30" placeholder="请输入任务名称（字数<=30）"></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述" prop="richText" style="width: 100%;">
                                <!--<QuillEditor @change="changeText" :editorContent="form.richText"></QuillEditor>-->
                                <KindEditor id="editor_id" :content.sync="form.richText" height="400px" @onContentChange="onContentChange">
                                </KindEditor>
                            </el-form-item>
                            <el-form-item label="创建之后">
                                <el-radio-group v-model="afterCreateAction">
                                    <el-radio :label="1">继续为该项目创建任务</el-radio>
                                    <el-radio :label="2">返回任务列表</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <div class="text-center" style="margin-top: 20px;">
                                <el-button type="primary" @click="currentSubmit('form')" :loading="createLoading" style="width: 100px;">保 存
                                </el-button>
                                <router-link :to="'/task-list.html'">
                                    <el-button style="margin-left: 30px; width: 100px;">返 回</el-button>
                                </router-link>
                            </div>
                        </div>
                        <div class="dp-table-cell" style="width: 35%; padding: 0 15px 0 30px;">
                            <el-form-item label="所属项目" prop="projectId">
                                <el-select v-model="form.projectId" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                            v-for="item in projectList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="任务类型" prop="type">
                                <el-select v-model="form.type" placeholder="请选择" style="width: 210px;">
                                    <el-option
                                            v-for="item in typeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="优先级" prop="pri">
                                <el-input-number
                                        v-model="form.pri"
                                        :min="1"
                                        :max="3"
                                        style="width: 210px;">
                                </el-input-number>
                            </el-form-item>
                            <!--<el-form-item label="截止日期" prop="deadline">
                                <el-date-picker
                                        v-model="form.deadline"
                                        type="date"
                                        :clearable="false"
                                        style="width: 210px;"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>-->
                            <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                            <el-form-item label="产品设计">
                                <el-select v-model="form.pdDesigner" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('po') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="UI设计">
                                <el-select v-model="form.uiDesigner" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('ui') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="前端开发">
                                <el-select v-model="form.webDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('web') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="安卓开发">
                                <el-select v-model="form.androidDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('android') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="苹果开发">
                                <el-select v-model="form.iosDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('ios') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="后端开发">
                                <el-select v-model="form.serverDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('dev') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="测试人员">
                                <el-select v-model="form.tester" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode.indexOf('test') > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    // import QuillEditor from '@/components/common/QuillEditor'
    import KindEditor from '@/components/KindEditor/index'

    export default {
        name: "CreateTaskPage",
        data() {
            return {
                form: {
                    name: '',
                    projectId: '',
                    pri: '',
                    type: '',
                    // deadline: '',
                    richText: null,
                    pdDesigner: null,
                    uiDesigner: null,
                    webDeveloper: null,
                    androidDeveloper: null,
                    iosDeveloper: null,
                    serverDeveloper: null,
                    tester: null,
                },
                rules: {
                    projectId: [{required: true, message: '请选择任务所属项目', trigger: 'blur'}],
                    type: [{required: true, message: '请选择任务类型', trigger: 'blur'}],
                    pri: [{required: true, message: '请选择任务优先级', trigger: 'blur'}],
                    // deadline: [{required: true, message: '请选择任务截止日期', trigger: 'blur'}],
                    name: [{required: true, message: '请填写任务名称', trigger: 'blur'}],
                },
                projectList: [],
                adminList: [],
                afterCreateAction: 1,
                priOptions: [
                    {label: "1", value: "1"},
                    {label: "2", value: "2"},
                    {label: "3", value: "3"},
                    {label: "4", value: "4"},
                ],
                typeOptions: [
                    {label: "产品", value: "design"},
                    {label: "UI", value: "ui"},
                    {label: "开发", value: "develop"},
                    {label: "测试", value: "test"},
                    {label: "其它", value: "other"},
                ],
                createLoading: false,
            }
        },
        methods: {
            /*changeText(data) {
                console.log("data=" + data);
                this.form.richText = data;
            },*/
            onContentChange(data) {
                // console.log("data=" + data);
                this.form.richText = data;
            },
            currentSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addTask();
                    }
                });
            },
            async addTask() {
                this.createLoading = true;
                // this.form.deadline = moment(this.form.deadline).format('YYYY-MM-DD');
                // this.form.pdDesigner = this.form.pdDesigner && this.form.pdDesigner.length > 0 ? this.form.pdDesigner.join(",") : null;
                // this.form.uiDesigner = this.form.uiDesigner && this.form.uiDesigner.length > 0 ? this.form.uiDesigner.join(",") : null;
                // this.form.webDeveloper = this.form.webDeveloper && this.form.webDeveloper.length > 0 ? this.form.webDeveloper.join(",") : null;
                // this.form.androidDeveloper = this.form.androidDeveloper && this.form.androidDeveloper.length > 0 ? this.form.androidDeveloper.join(",") : null;
                // this.form.iosDeveloper = this.form.iosDeveloper && this.form.iosDeveloper.length > 0 ? this.form.iosDeveloper.join(",") : null;
                // this.form.serverDeveloper = this.form.serverDeveloper && this.form.serverDeveloper.length > 0 ? this.form.serverDeveloper.join(",") : null;
                // this.form.tester = this.form.tester && this.form.tester.length > 0 ? this.form.tester.join(",") : null;
                const res = await this.$service.addTask(this.form);
                this.createLoading = false;
                if (res.code === 20000) {
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '创建任务成功',
                    });
                    if (this.afterCreateAction === 1) {
                        this.form.name = '';
                        this.form.richText = '';
                        this.form.pdDesigner = null;
                        this.form.uiDesigner = null;
                        this.form.webDeveloper = null;
                        this.form.androidDeveloper = null;
                        this.form.iosDeveloper = null;
                        this.form.serverDeveloper = null;
                        this.form.tester = null;
                    } else if (this.afterCreateAction === 2) {
                        this.$router.push('/task-list.html')
                    }
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '创建任务失败',
                    })
                }
            },
            async getProjectList() {
                const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.projectList = res.data.result || [];
                }
            },
            async getAdminList() {
                const res = await this.$service.getAdminList({pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.adminList = res.data.result || [];
                }
            },
        },
        async mounted() {
            this.getProjectList();
            this.getAdminList();
            let task = this.$route.params.task;
            if (task) {
                this.form.name = task.name;
                this.form.projectId = task.projectId;
                this.form.pri = task.pri;
                this.form.type = task.type;
                // this.form.deadline = task.deadline;
                this.form.richText = task.richText;
                this.form.pdDesigner = task.pdDesigner;
                this.form.uiDesigner = task.uiDesigner;
                this.form.webDeveloper = task.webDeveloper;
                this.form.androidDeveloper = task.androidDeveloper;
                this.form.iosDeveloper = task.iosDeveloper;
                this.form.serverDeveloper = task.serverDeveloper;
                this.form.tester = task.tester;
            }
        },
        components: {
            // QuillEditor,
            KindEditor
        },
    }
</script>

<style scoped>
    .container {
        margin: 0 100px;
        padding: 20px 30px;
        background-color: white;
        border-radius: 4px;
    }

    .container-box {
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        border-radius: 4px;
        overflow: hidden;
    }

    .container-box-header {
        padding: 10px 20px;
        border-bottom: 1px solid #EBEEF5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 15px;
        background-color: #efefef;
    }

    .container-box-body {
        padding: 20px;
    }
</style>
