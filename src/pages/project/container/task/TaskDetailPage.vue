<template>
    <div class="container">
        <div>
            <router-link :to="'/task-list.html'">
                <el-button type="primary" icon="el-icon-back">返 回</el-button>
            </router-link>
            <span style="margin-left: 30px; font-weight: bold;">{{form.name}}</span>
        </div>
        <div class="dp-table">
            <div class="dp-table-cell" style="width: 65%; padding: 0 10px 0 0;">
                <div class="panel" style="padding: 15px 20px;">
                    <span style="font-weight: bold;">任务描述</span>
                    <div v-html="form.content" class="ql-editor"></div>
                    <el-divider style="margin: 0 15px !important;"></el-divider>
                </div>
            </div>
            <div class="dp-table-cell" style="width: 35%; padding: 0 0 0 10px;">
                <div class="panel" style="padding: 0 20px 20px 20px;">
                    <el-tabs v-model="activeTabName" @tab-click="">
                        <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
                        <el-tab-pane label="任务的生命周期" name="second">任务的生命周期</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import QuillEditor from '@/components/common/QuillEditor'

    export default {
        name: "EditTaskPage",
        data() {
            return {
                form: {
                    id: '',
                    name: '',
                    content: null,
                    projectId: '',
                    pri: '',
                    type: '',
                    deadline: '',
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
                updateLoading: false,
                activeTabName: 'first',
            }
        },
        methods: {
            changeContent(data) {
                this.form.content = data;
            },
            currentSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateTask();
                    }
                });
            },
            async updateTask() {
                this.updateLoading = true;
                this.form.deadline = moment(this.form.deadline).format('YYYY-MM-DD');
                this.form.pdDesigner = this.form.pdDesigner.join(",");
                this.form.uiDesigner = this.form.uiDesigner.join(",");
                this.form.webDeveloper = this.form.webDeveloper.join(",");
                this.form.androidDeveloper = this.form.androidDeveloper.join(",");
                this.form.iosDeveloper = this.form.iosDeveloper.join(",");
                this.form.serverDeveloper = this.form.serverDeveloper.join(",");
                this.form.tester = this.form.tester.join(",");
                const res = await this.$service.updateTask(this.form);
                this.updateLoading = false;
                if (res.code === 20000) {
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '修改任务成功',
                    });
                    this.$router.push('/task-list.html')
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '修改任务失败',
                    })
                }
            },
            async initData() {
                const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.projectList = res.data.result || [];
                }
                if (this.$route.params.id) {
                    this.form.id = this.$route.params.id;
                    const res = await this.$service.getTaskById({id: this.form.id});
                    if (res.code === 20000) {
                        this.form.name = res.data.name;
                        this.form.content = res.data.content;
                        this.form.projectId = res.data.projectId;
                        this.form.pri = res.data.pri;
                        this.form.type = res.data.type;
                        this.form.deadline = moment(res.data.deadline);
                        this.form.pdDesigner = res.data.pdDesigner ? res.data.pdDesigner.split(',') : null;
                        this.form.uiDesigner = res.data.uiDesigner ? res.data.uiDesigner.split(',') : null;
                        this.form.webDeveloper = res.data.webDeveloper ? res.data.webDeveloper.split(',') : null;
                        this.form.androidDeveloper = res.data.androidDeveloper ? res.data.androidDeveloper.split(',') : null;
                        this.form.iosDeveloper = res.data.iosDeveloper ? res.data.iosDeveloper.split(',') : null;
                        this.form.serverDeveloper = res.data.serverDeveloper ? res.data.serverDeveloper.split(',') : null;
                        this.form.tester = res.data.tester ? res.data.tester.split(',') : null;
                    }
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
        padding: 0;
        border-radius: 4px;
    }

    .panel {
        margin-top: 10px;
    }

    .ql-editor {
        padding: 15px 0;
    }
</style>
