<template>
    <div class="container">
        <div class="container-box">
            <div class="container-box-header">
                <span>编辑任务</span>
            </div>
            <div class="container-box-body">
                <el-form :label-width="'80px'" ref="form" :model="form" :rules="rules">
                    <div class="dp-table">
                        <div class="dp-table-cell">
                            <el-form-item label="任务名称" prop="name" style="width: 100%;">
                                <el-input v-model="form.name" maxlength="30" placeholder="请输入任务名称（长度<=30位）"></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述" prop="richText" style="width: 100%;">
                                <KindEditor id="editor_desc" :content.sync="form.richText" height="300px"
                                            @onContentChange="onContentChange">
                                </KindEditor>
                            </el-form-item>
                            <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                            <el-form-item label="备注" prop="richText" style="width: 100%;">
                                <KindEditor id="editor_remark" :content.sync="form.remark" @onContentChange="onRemarkChange">
                                </KindEditor>
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
                        </div>
                        <div class="dp-table-cell" style="width: 34.2%; padding: 0 15px 0 30px;">
                            <el-form-item label="所属项目" prop="projectId" style="margin-bottom: 10px;">
                                <el-select v-model="form.projectId" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                            v-for="item in projectList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="任务类型" prop="type" style="margin-bottom: 10px;">
                                <el-select v-model="form.type" placeholder="请选择" style="width: 200px;">
                                    <el-option
                                            v-for="item in typeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="优先级" prop="pri" style="margin-bottom: 10px;">
                                <el-input-number
                                        v-model="form.pri"
                                        :min="1"
                                        :max="3"
                                        style="width: 200px;">
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="截止日期" prop="deadline" style="margin-bottom: 10px;">
                                <el-date-picker
                                        v-model="form.deadline"
                                        type="date"
                                        :clearable="false"
                                        style="width: 200px;"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                            <el-form-item label="产品设计" style="margin-bottom: 5px;">
                                <el-select v-model="form.pdDesigner" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'po'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.pdEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.pdFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="UI设计" style="margin-bottom: 5px;">
                                <el-select v-model="form.uiDesigner" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'ui'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.uiEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.uiFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="前端开发" style="margin-bottom: 5px;">
                                <el-select v-model="form.webDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="['web','dev'].indexOf(item.postCode) > -1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.webEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.webFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="安卓开发" style="margin-bottom: 5px;">
                                <el-select v-model="form.androidDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'android'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.androidEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.androidFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="苹果开发" style="margin-bottom: 5px;">
                                <el-select v-model="form.iosDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'ios'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.iosEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.iosFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="后端开发" style="margin-bottom: 5px;">
                                <el-select v-model="form.serverDeveloper" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'dev'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.serverEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.serverFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="测试" style="margin-bottom: 5px;">
                                <el-select v-model="form.tester" clearable placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName"
                                               v-show="item.postCode === 'test'">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预计完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.testEstimateDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际完成" style="margin-bottom: 10px; display: inline-block">
                                <el-date-picker
                                        v-model="form.testFinishedDate"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable="false"
                                        style="width: 170px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                            <el-form-item label="由谁创建" style="margin-bottom: 0;">
                                {{getDevRealName(form.openedBy)}}
                            </el-form-item>
                            <el-form-item label="创建时间" style="margin-bottom: 0;">
                                {{form.openedDate}}
                            </el-form-item>
                            <el-form-item label="最后编辑" style="margin-bottom: 0;">
                                {{getDevRealName(form.lastEditedBy)}}
                            </el-form-item>
                            <el-form-item label="编辑时间" style="margin-bottom: 0;">
                                {{form.lastEditedDate}}
                            </el-form-item>
                            <el-form-item label="由谁取消" style="margin-bottom: 10px;">
                                <el-select v-model="form.canceledBy" clearable style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="取消时间" style="margin-bottom: 10px;">
                                <el-date-picker
                                        v-model="form.canceledDate"
                                        type="datetime"
                                        :clearable="false"
                                        style="width: 200px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="由谁关闭" style="margin-bottom: 10px;">
                                <el-select v-model="form.closedBy" clearable style="width: 100%;">
                                    <el-option v-for="item in adminList" :key="item.id" :label="item.realName" :value="item.userName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="关闭时间" style="margin-bottom: 10px;">
                                <el-date-picker
                                        v-model="form.closedDate"
                                        type="datetime"
                                        :clearable="false"
                                        style="width: 200px;">
                                </el-date-picker>
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
                    type: '',
                    pri: '',
                    deadline: '',
                    canceledBy: '',
                    canceledDate: '',
                    closedBy: '',
                    closedDate: '',
                    pdDesigner: null,
                    pdEstimateDate: null,
                    pdFinishedDate: null,
                    uiDesigner: null,
                    uiEstimateDate: null,
                    uiFinishedDate: null,
                    webDeveloper: null,
                    webEstimateDate: null,
                    webFinishedDate: null,
                    androidDeveloper: null,
                    androidEstimateDate: null,
                    androidFinishedDate: null,
                    iosDeveloper: null,
                    iosEstimateDate: null,
                    iosFinishedDate: null,
                    serverDeveloper: null,
                    serverEstimateDate: null,
                    serverFinishedDate: null,
                    tester: null,
                    testEstimateDate: null,
                    testFinishedDate: null,
                    remark: '',
                },
                rules: {
                    name: [{required: true, message: '请填写任务名称', trigger: 'blur'}],
                    projectId: [{required: true, message: '请选择任务所属项目', trigger: 'blur'}],
                    type: [{required: true, message: '请选择任务类型', trigger: 'blur'}],
                    pri: [{required: true, message: '请选择任务优先级', trigger: 'blur'}],
                    deadline: [{required: true, message: '请选择任务截止日期', trigger: 'blur'}],
                },
                projectList: [],
                adminList: [],
                taskRemarkList: [],
                priOptions: [
                    {label: "1", value: "1"},
                    {label: "2", value: "2"},
                    {label: "3", value: "3"},
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
            onContentChange(data) {
                this.form.richText = data;
            },
            onRemarkChange(data) {
                this.form.remark = data;
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
                this.form.pdEstimateDate = this.form.pdEstimateDate ? moment(this.form.pdEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.pdFinishedDate = this.form.pdFinishedDate ? moment(this.form.pdFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.uiEstimateDate = this.form.uiEstimateDate ? moment(this.form.uiEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.uiFinishedDate = this.form.uiFinishedDate ? moment(this.form.uiFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.webEstimateDate = this.form.webEstimateDate ? moment(this.form.webEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.webFinishedDate = this.form.webFinishedDate ? moment(this.form.webFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.androidEstimateDate = this.form.androidEstimateDate ? moment(this.form.androidEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.androidFinishedDate = this.form.androidFinishedDate ? moment(this.form.androidFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.iosEstimateDate = this.form.iosEstimateDate ? moment(this.form.iosEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.iosFinishedDate = this.form.iosFinishedDate ? moment(this.form.iosFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.serverEstimateDate = this.form.serverEstimateDate ? moment(this.form.serverEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.serverFinishedDate = this.form.serverFinishedDate ? moment(this.form.serverFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.testEstimateDate = this.form.testEstimateDate ? moment(this.form.testEstimateDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.testFinishedDate = this.form.testFinishedDate ? moment(this.form.testFinishedDate).format('YYYY-MM-DD HH:mm') : null;
                this.form.canceledDate = this.form.canceledDate ? moment(this.form.canceledDate).format('YYYY-MM-DD HH:mm:ss') : null;
                this.form.closedDate = this.form.closedDate ? moment(this.form.closedDate).format('YYYY-MM-DD HH:mm:ss') : null;
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
            getDevRealName(userName) {
                for (let item of this.adminList) {
                    if (item.userName === userName) {
                        return item.realName;
                    }
                }
            },
            async getTaskDetail() {
                this.form.id = this.$route.query.taskId;
                if (this.form.id) {
                    const res = await this.$service.getTaskById({id: this.form.id});
                    if (res.code === 20000) {
                        this.form = {
                            ...res.data,
                            deadline: moment(res.data.deadline),
                        }
                    }
                    //获取任务备注列表
                    const res1 = await this.$service.getTaskRemarkList({taskId: this.form.id});
                    if (res1.code === 20000) {
                        this.taskRemarkList = res1.data || [];
                    }
                }
            },
        },
        mounted() {
            this.getProjectList();
            this.getAdminList();
            this.getTaskDetail();
        },
        components: {
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

    .history-record .kind-editor-show {
        font-size: 13px;
        padding: 5px 10px 5px 15px;
        margin: 5px 10px;
        background-color: rgba(0, 0, 0, .025);
    }
</style>
