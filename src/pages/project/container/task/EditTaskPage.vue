<template>
    <div class="container">
        <div class="container-box">
            <div class="container-box-header">
                <span>编辑任务</span>
            </div>
            <div class="container-box-body">
                <el-form :label-width="'80px'" ref="form" :model="form">
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
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'po'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="UI设计">
                                <el-select v-model="form.uiDesigner" clearable multiple placeholder="请选择" style="width: 90%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'ui'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="dp-table-cell col-6">
                            <el-form-item label="前端开发">
                                <el-select v-model="form.webDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="['web','dev'].indexOf(item.postCode) > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="安卓开发">
                                <el-select v-model="form.androidDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'android'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="苹果开发">
                                <el-select v-model="form.iosDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'ios'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="后端开发">
                                <el-select v-model="form.serverDeveloper" clearable multiple placeholder="请选择" style="width: 90%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'dev'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="测试人员">
                                <el-select v-model="form.tester" clearable multiple placeholder="请选择" style="width: 90%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'test'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item label="任务名称" prop="name" style="width: 96%;">
                        <el-input v-model="form.name" maxlength="30" placeholder="请输入任务名称（长度<=30位）"></el-input>
                    </el-form-item>
                    <el-form-item label="任务描述" prop="richText" style="width: 96%;">
                        <!--<QuillEditor @change="changeText" :editorText="form.richText"></QuillEditor>-->
                        <KindEditor id="editor_id" :content.sync="form.richText" @onContentChange="onContentChange"></KindEditor>
                    </el-form-item>
                    <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                    <div class="text-center" style="margin-top: 20px;">
                        <el-button type="primary" @click="currentSubmit('form')" :loading="updateLoading" style="width: 100px;">保 存
                        </el-button>
                        <router-link :to="'/task-list.html'">
                            <el-button style="margin-left: 30px; width: 100px;">返 回</el-button>
                        </router-link>
                    </div>
                    <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                    <div class="history-record">
                        <div style="font-weight: bold; margin: 30px 0 10px 0;">历史记录</div>
                        <div v-for="(item, index) in taskRemarkList">
                            <div>{{(index+1)+'.'+item.createDate+', 由 '}}
                                <span style="font-weight: bold;">{{item.createBy}}</span>{{' '+item.text+'。'}}
                            </div>
                            <div v-if="item.richText">
                                <div v-html="item.richText" class="kind-editor-show"></div>
                            </div>
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
        name: "EditTaskPage",
        data() {
            return {
                form: {
                    id: '',
                    name: '',
                    richText: null,
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
                adminList: [],
                taskRemarkList: [],
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
                updateLoading: false,
            }
        },
        methods: {
            /*changeText(data) {
                this.form.richText = data;
            },*/
            onContentChange(data) {
                // console.log("data=" + data);
                this.form.richText = data;
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
                this.form.pdDesigner = this.form.pdDesigner && this.form.pdDesigner.length > 0 ? this.form.pdDesigner.join(",") : null;
                this.form.uiDesigner = this.form.uiDesigner && this.form.uiDesigner.length > 0 ? this.form.uiDesigner.join(",") : null;
                this.form.webDeveloper = this.form.webDeveloper && this.form.webDeveloper.length > 0 ? this.form.webDeveloper.join(",") : null;
                this.form.androidDeveloper = this.form.androidDeveloper && this.form.androidDeveloper.length > 0 ? this.form.androidDeveloper.join(",") : null;
                this.form.iosDeveloper = this.form.iosDeveloper && this.form.iosDeveloper.length > 0 ? this.form.iosDeveloper.join(",") : null;
                this.form.serverDeveloper = this.form.serverDeveloper && this.form.serverDeveloper.length > 0 ? this.form.serverDeveloper.join(",") : null;
                this.form.tester = this.form.tester && this.form.tester.length > 0 ? this.form.tester.join(",") : null;
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
                        this.form.richText = res.data.richText;
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
                //获取任务备注列表
                const res1 = await this.$service.getTaskRemarkList({taskId: this.$route.params.id});
                if (res1.code === 20000) {
                    this.taskRemarkList = res1.data || [];
                }
            },
        },
        mounted() {
            this.initData();
            this.adminList = this.$route.params.adminList || [];
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

    .history-record .kind-editor-show {
        font-size: 13px;
        padding: 5px 10px 5px 15px;
        margin: 5px 10px;
        background-color: rgba(0, 0, 0, .025);
    }
</style>
