<template>
    <div class="container">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="box-card-header">
                <span>创建任务</span>
            </div>
            <el-form :label-width="labelWidth" ref="form" :rules="rules" :model="form" class="task-form">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目代号" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="起止日期" prop="end">
                    <el-date-picker
                            v-model="form.begin"
                            type="date"
                            @change="endDatePickerOptions"
                            style="width: 194px;"
                            placeholder="开始日期">
                    </el-date-picker>
                    至
                    <el-date-picker
                            v-model="form.end"
                            type="date"
                            @change="countDays"
                            :picker-options="pickerOptions"
                            style="width: 194px;"
                            placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="可用工作日" prop="days">
                    <el-input v-model="form.days" style="width: 410px;">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-select v-model="form.type" style="width: 410px;" placeholder="请选择">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="访问控制" prop="acl">
                    <el-radio-group v-model="form.acl">
                        <el-radio :label="'open'">默认设置(有项目视图权限，即可访问)</el-radio>
                        <el-radio :label="'private'">私有项目(只有项目团队成员才能访问)</el-radio>
                        <el-radio :label="'custom'">自定义白名单(团队成员和白名单的成员可以访问)</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="text-center" style="margin-top: 50px;">
                <el-button type="primary" @click="currentSubmit('form')" :loading="createLoading" size="medium" style="width: 100px;">保 存</el-button>
                <router-link :to="'/project-task-list.html'">
                    <el-button style="margin-left: 30px; width: 100px;" size="medium">取 消</el-button>
                </router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "CreateProject",
        data() {
            const dateValidator = async (rule, value, callback) => {
                if (!this.form.begin) {
                    return callback(new Error('请选择项目开始日期'));
                }
                if (!this.form.end) {
                    return callback(new Error('请选择项目截止日期'));
                }
                return callback();
            };
            return {
                form: {
                    name: '',
                    code: '',
                    begin: '',
                    end: '',
                    days: '',
                    type: 'short',
                    acl: 'open',
                },
                labelWidth: '90px',
                rules: {
                    name: [{required: true, message: '请填写项目名称', trigger: 'blur'}],
                    code: [{required: true, message: '请填写项目代号', trigger: 'blur'}],
                    end: [{validator: dateValidator, trigger: 'blur'}],
                },
                pickerOptions: {},
                typeOptions: [
                    {label: "短期项目", value: "short"},
                    {label: "长期项目", value: "long"},
                ],
                createLoading: false,
            }
        },
        methods: {
            endDatePickerOptions(value) {
                this.form.days = '';
                this.form.end = '';
                this.pickerOptions.disabledDate = function (time) {
                    let y = value.getFullYear();
                    let m = value.getMonth() + 1;
                    let d = value.getDate() + 1;
                    const time2 = `${y}-${m}-${d}`;
                    return time.getTime() < new Date(time2);
                }
            },
            countDays() {
                if (this.form.begin && this.form.end) {
                    const d1 = this.form.begin;
                    const d2 = this.form.end;
                    const time = d2.getTime() - d1.getTime();
                    this.form.days = parseInt(time / (1000 * 60 * 60 * 24));
                } else {
                    this.form.days = '';
                }
            },
            async currentSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addProject();
                    }
                });
            },
            async addProject() {
                let data = {
                    name: this.form.name,
                    code: this.form.code,
                    begin: moment(this.form.begin).format('YYYY-MM-DD'),
                    end: moment(this.form.end).format('YYYY-MM-DD'),
                    days: this.form.days,
                    type: this.form.type,
                    acl: this.form.acl,
                };
                this.createLoading = true;
                const res = await this.$service.addProject(data);
                this.createLoading = false;
                if (res.code === 20000) {
                    this.createLoading = false;
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '添加项目成功',
                    });
                    this.$router.push('/project-list.html')
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '添加项目失败',
                    })
                }
            },
        },
    }
</script>

<style scoped>
    .container {
        margin: 0 100px;
        padding: 30px 150px;
        background-color: white;
        border-radius: 4px;
    }
    .box-card-header{
        font-size: 15px;
    }
    .task-form {
        margin: 0 30px;
    }
</style>