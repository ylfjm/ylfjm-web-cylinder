<template>
    <div class="container">
        <el-form :label-width="labelWidth" ref="form" :rules="rules" :model="form">
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
        </el-form>
        <div class="text-center">
            <router-link :to="'/project-list.html'">
                <el-button size="medium">取 消</el-button>
            </router-link>
            <el-button
                    style="margin-left: 30px;"
                    size="medium"
                    type="primary"
                    @click="currentSubmit('form')"
            >
                确 定
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CreateProject",
        data() {
            const dateValidator = async (rule, value, callback) => {
                console.log(this.form.begin)
                console.log(this.form.end)
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
            currentSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    }
                });
            },
        },
    }
</script>

<style scoped>
    .container {
        width: 600px;
        padding: 30px 50px;
        background-color: white;
        border-radius: 4px;
    }
</style>