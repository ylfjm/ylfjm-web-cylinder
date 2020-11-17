<template>
    <div class="container">
        <div class="container-box">
            <div class="container-box-header">
                <span>创建任务</span>
            </div>
            <div class="container-box-body">
                <el-form :label-width="labelWidth" ref="form" :rules="rules" :model="form" class="task-form">
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="form.name" maxlength="30" placeholder="请输入任务名称（长度<=30位）" style="width: 500px"></el-input>
                    </el-form-item>
                    <el-form-item label="所属项目" prop="projectId">
                        <el-select v-model="form.projectId" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in projectList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优先级" prop="pri">
                        <el-select v-model="form.pri" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in priOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务类型" prop="type">
                        <el-select v-model="form.type" placeholder="请选择" style="width: 500px">
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
                                v-model="form.deadline"
                                type="date"
                                :clearable="false"
                                placeholder="选择日期"
                                style="width: 500px">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="任务描述" prop="content">
                        <el-input v-model="form.content" type="textarea" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="UI设计师">
                        <el-select v-model="form.uiDesigner" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="web开发者">
                        <el-select v-model="form.webDeveloper" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Android开发者">
                        <el-select v-model="form.androidDeveloper" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="IOS开发者">
                        <el-select v-model="form.iosDeveloper" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="后端开发者">
                        <el-select v-model="form.serverDeveloper" placeholder="请选择" style="width: 500px">
                            <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建之后">
                        <el-radio-group v-model="afterCreate">
                            <el-radio :label="1">继续为该项目创建任务</el-radio>
                            <el-radio :label="2">返回任务列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div class="text-center" style="margin-top: 50px;">
                    <el-button type="primary" @click="currentSubmit('form')" :loading="createLoading" size="medium" style="width: 100px;">保 存
                    </el-button>
                    <router-link :to="'/project-task-list.html'">
                        <el-button style="margin-left: 30px; width: 100px;" size="medium">取 消</el-button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

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
                    uiDesigner: null,
                    webDeveloper: null,
                    androidDeveloper: null,
                    iosDeveloper: null,
                    serverDeveloper: null,
                },
                labelWidth: '110px',
                rules: {},
                projectList: [],
                afterCreate: 1,
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
                const res = await this.$service.addTask(this.form);
                this.createLoading = false;
                if (res.code === 20000) {
                    this.createLoading = false;
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '创建任务成功',
                    });
                    if (this.afterCreate === 1) {
                        this.form.name = '';
                        this.form.content = '';
                        this.form.uiDesigner = null;
                        this.form.webDeveloper = null;
                        this.form.androidDeveloper = null;
                        this.form.iosDeveloper = null;
                        this.form.serverDeveloper = null;
                    } else if (this.afterCreate === 2) {
                        this.$router.push('/project-task-list.html')
                    }
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '创建任务失败',
                    })
                }
            },
        },
        async mounted() {
            const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
            if (res.code === 20000) {
                this.projectList = res.data.result || [];
            }
        },
    }
</script>

<style scoped>
    .container {
        margin: 0 100px;
        padding: 20px 280px;
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

    .task-form {
        margin: 0 100px;
    }
</style>