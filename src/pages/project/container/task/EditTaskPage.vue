<template>
    <div class="container">
        <div class="container-box">
            <div class="container-box-header">
                <span>编辑任务</span>
            </div>
            <div class="container-box-body">
                <div class="dp-table">
                    <div class="dp-table-cell col-8">
                        <el-form :label-width="'80px'" ref="leftForm" :model="leftForm">
                            <el-form-item label="任务名称" prop="name">
                                <el-input v-model="leftForm.name" maxlength="30" placeholder="请输入任务名称（长度<=30位）"></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述" prop="content">
                                <QuillEditor @change="changeContent" :defalultContent="leftForm.content"></QuillEditor>
                            </el-form-item>
                        </el-form>
                        <div class="text-center" style="margin-top: 50px;">
                            <el-button type="primary" @click="currentSubmit('form')" :loading="updateLoading" size="medium" style="width: 100px;">保 存
                            </el-button>
                            <router-link :to="'/project-task-list.html'">
                                <el-button style="margin-left: 30px; width: 100px;" size="medium">取 消</el-button>
                            </router-link>
                        </div>
                    </div>
                    <div class="dp-table-cell col-4">
                        <el-form :label-width="'115px'" ref="rightForm" :model="rightForm">
                            <el-form-item label="所属项目" prop="projectId">
                                <el-select v-model="rightForm.projectId" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in projectList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="优先级" prop="pri">
                                <el-select v-model="rightForm.pri" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in priOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="任务类型" prop="type">
                                <el-select v-model="rightForm.type" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in typeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="截止日期" prop="deadline">
                                <el-date-picker
                                        v-model="rightForm.deadline"
                                        type="date"
                                        :clearable="false"
                                        placeholder="选择日期"
                                        style="width: 360px">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="UI设计师">
                                <el-select v-model="rightForm.uiDesigner" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in userList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="web开发者">
                                <el-select v-model="rightForm.webDeveloper" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in userList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Android开发者">
                                <el-select v-model="rightForm.androidDeveloper" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in userList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="IOS开发者">
                                <el-select v-model="rightForm.iosDeveloper" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in userList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="后端开发者">
                                <el-select v-model="rightForm.serverDeveloper" placeholder="请选择" style="width: 360px">
                                    <el-option
                                            v-for="item in userList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
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
                leftForm: {
                    id: '',
                    name: '',
                    content: null,
                },
                rightForm: {
                    projectId: '',
                    pri: '',
                    type: '',
                    deadline: '',
                    uiDesigner: null,
                    webDeveloper: null,
                    androidDeveloper: null,
                    iosDeveloper: null,
                    serverDeveloper: null,
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
            }
        },
        methods: {
            changeContent(data) {
                console.log("data=" + data);
                this.leftForm.content = data;
            },
            currentSubmit(formName) {
                this.initData();
            },
            async initData() {
                const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.projectList = res.data.result || [];
                }
                if (this.$route.params.id) {
                    this.leftForm.id = this.$route.params.id;
                    const res = await this.$service.getTaskById({id: this.leftForm.id});
                    if (res.code === 20000) {
                        this.leftForm.name = res.data.name;
                        this.leftForm.content = res.data.content;
                        this.rightForm.projectId = res.data.projectId;
                        this.rightForm.pri = res.data.pri;
                        this.rightForm.type = res.data.type;
                        this.rightForm.deadline = moment(res.data.deadline);
                        this.rightForm.uiDesigner = res.data.uiDesigner;
                        this.rightForm.webDeveloper = res.data.webDeveloper;
                        this.rightForm.androidDeveloper = res.data.androidDeveloper;
                        this.rightForm.iosDeveloper = res.data.iosDeveloper;
                        this.rightForm.serverDeveloper = res.data.serverDeveloper;
                    }
                }
            },
        },
        async created() {
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