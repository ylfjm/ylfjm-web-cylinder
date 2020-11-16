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
                <el-form-item label="起止日期" prop="dateRange">
                    <el-date-picker
                            v-model="form.dateRange"
                            type="daterange"
                            align="center"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            @change="countDays">
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
    import commonUtil from '@/common/js/commonUtil'

    export default {
        name: "CreateProjectDialog",
        data() {
            const dateValidator = async (rule, value, callback) => {
                if (!this.form.dateRange || this.form.dateRange.length === 0) {
                    return callback(new Error('请选择项目起止日期'));
                }
                return callback();
            };
            return {
                form: {
                    name: '',
                    code: '',
                    begin: '',
                    end: '',
                    dateRange: [],
                    days: '',
                    type: 'short',
                    acl: 'open',
                },
                formLabelWidth: '90px',
                rules: {
                    name: [{required: true, message: '请填写项目名称', trigger: 'blur'}],
                    code: [{required: true, message: '请填写项目代号', trigger: 'blur'}],
                    dateRange: [{validator: dateValidator, trigger: 'blur'}],
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '一周',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getDayAfter(6);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '两周',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getDayAfter(13);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '一个月',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getMonthAfter(1);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '两个月',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getMonthAfter(2);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '三个月',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getMonthAfter(26);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
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
            countDays() {
                if (this.form.dateRange) {
                    // const d1 = this.form.dateRange[0];
                    // const d2 = this.form.dateRange[1];
                    // const time = d2.getTime() - d1.getTime();
                    // this.form.days = parseInt(time / (1000 * 60 * 60 * 24));
                    this.form.days = commonUtil.countWorkDays(this.form.dateRange[0], this.form.dateRange[1]);
                } else {
                    this.form.days = '';
                }
            },
            async currentSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.form.name.trim(),
                            code: this.form.code.trim(),
                            begin: moment(this.form.dateRange[0]).format('YYYY-MM-DD'),
                            end: moment(this.form.dateRange[1]).format('YYYY-MM-DD'),
                            days: this.form.days,
                            type: this.form.type,
                            acl: this.form.acl,
                        };
                        this.submit(data);
                    }
                });
            },
        },
        created() {
        },
    }
</script>

<style scoped>
</style>