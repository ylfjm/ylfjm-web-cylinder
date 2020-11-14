<template>
    <el-dialog
            width="692px"
            :title="title"
            :visible.sync="visible"
            :before-close="hideDialog"
            :append-to-body="true"
            :close-on-click-modal="false"
    >
        <div class="dialog-form">
            <el-form :label-width="formLabelWidth" ref="form" :rules="rules" :model="form">
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
                            placeholder="开始日期">
                    </el-date-picker>
                    至
                    <el-date-picker
                            v-model="form.end"
                            type="date"
                            @change="countDays"
                            :picker-options="pickerOptions"
                            placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="可用工作日" prop="days">
                    <el-input v-model="form.days">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="访问控制" prop="acl">
                    <el-radio-group v-model="form.acl">
                        <el-radio :label="'open'">默认设置(有项目视图权限，即可访问)</el-radio>
                        <el-radio :label="'private'">私有项目(只有项目团队成员才能访问)</el-radio>
                        <el-radio :label="'custom'">自定义白名单(团队成员和白名单的成员可以访问)</el-radio>
                    </el-radio-group>
                </el-form-item>-->
            </el-form>
        </div>
        <div slot="footer" class="text-center">
            <el-button type="primary" size="medium" @click="currentSubmit('form')" :loading="loading">保 存</el-button>
            <el-button size="medium" style="margin-left: 30px;" @click="hideDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "CreateProjectDialog",
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
                formLabelWidth: '90px',
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
        props: {
            title: String,
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
        },
        methods: {
            endDatePickerOptions(value) {
                this.form.days = '';
                this.form.end = '';
                this.pickerOptions.disabledDate = function (time) {
                    let y = value.getFullYear();
                    let m = value.getMonth() + 1;
                    let d = value.getDate();
                    const time2 = `${y}-${m}-${d} 23:59:59`;
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
                        let data = {
                            name: this.form.name,
                            code: this.form.code,
                            begin: moment(this.form.begin).format('YYYY-MM-DD'),
                            end: moment(this.form.end).format('YYYY-MM-DD'),
                            days: this.form.days,
                            type: this.form.type,
                            acl: this.form.acl,
                        };
                        this.submit(data);
                    }
                });
            },
        },
    }
</script>

<style scoped>
</style>