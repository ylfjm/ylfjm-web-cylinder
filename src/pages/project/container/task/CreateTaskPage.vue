<template>
    <div class="container">
        <div class="container-box">
            <div class="container-box-header">
                <span>创建任务</span>
            </div>
            <div class="container-box-body">
                <el-form :label-width="'80px'" ref="form" :rules="rules" :model="form">
                    <div class="dp-table">
                        <div class="dp-table-cell col-6">
                            <el-form-item label="所属项目" prop="projectId">
                                <el-select v-model="form.projectId" placeholder="请选择" style="width: 90%;">
                                    <el-option
                                            v-for="item in projectList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="任务类型" prop="type">
                                <el-select v-model="form.type" placeholder="请选择" style="width: 150px;">
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
                                        style="width: 150px;">
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="截止日期" prop="deadline">
                                <el-date-picker
                                        v-model="form.deadline"
                                        type="date"
                                        :clearable="false"
                                        style="width: 150px;"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
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
                    <el-form-item label="任务名称" prop="name" style="width: 96%;">
                        <el-input v-model="form.name" maxlength="30" placeholder="请输入任务名称（长度<=30位）"></el-input>
                    </el-form-item>
                    <el-form-item label="任务描述" prop="content" style="width: 96%;">
                        <QuillEditor @change="changeContent" :editorContent="form.content"></QuillEditor>
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
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import QuillEditor from '@/components/common/QuillEditor'

    export default {
        name: "CreateTaskPage",
        data() {
            return {
                form: {
                    name: '',
                    projectId: '',
                    pri: '',
                    type: '',
                    deadline: '',
                    content: null,
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
                    deadline: [{required: true, message: '请选择任务截止日期', trigger: 'blur'}],
                    name: [{required: true, message: '请填写任务名称', trigger: 'blur'}],
                },
                projectList: [],
                afterCreateAction: 1,
                priOptions: [
                    {label: "1", value: "1"},
                    {label: "2", value: "2"},
                    {label: "3", value: "3"},
                    {label: "4", value: "4"},
                ],
                typeOptions: [
                    {label: "产品", value: "design"},
                    {label: "开发", value: "develop"},
                    {label: "测试", value: "test"},
                    {label: "其它", value: "other"},
                ],
                userList: [
                    {label: "用户1", value: "user01"},
                    {label: "用户2", value: "user02"},
                    {label: "用户3", value: "user03"},
                    {label: "用户4", value: "user04"},
                ],
                createLoading: false,
            }
        },
        methods: {
            changeContent(data) {
                console.log("data=" + data);
                this.form.content = data;
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
                this.form.deadline = moment(this.form.deadline).format('YYYY-MM-DD');
                this.form.pdDesigner = this.form.pdDesigner.join(",");
                this.form.uiDesigner = this.form.uiDesigner.join(",");
                this.form.webDeveloper = this.form.webDeveloper.join(",");
                this.form.androidDeveloper = this.form.androidDeveloper.join(",");
                this.form.iosDeveloper = this.form.iosDeveloper.join(",");
                this.form.serverDeveloper = this.form.serverDeveloper.join(",");
                this.form.tester = this.form.tester.join(",");
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
                        this.form.content = '';
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
            async initData() {
                const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.projectList = res.data.result || [];
                }
            },
        },
        async mounted() {
            this.initData();
        },
        components: {
            QuillEditor
        },
    }
</script>

<style scoped>
    .container {
        margin: 0 100px;
        padding: 20px 80px;
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
        padding: 15px 20px;
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
