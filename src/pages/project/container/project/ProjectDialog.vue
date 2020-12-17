<template>
    <el-dialog width="30%" :title="title" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <el-form :label-width="'90px'" ref="form" :rules="rules" :model="form">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目代号" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="起止日期" prop="dateRange">
                    <!--<el-date-picker
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
                    </el-date-picker>-->
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
            <el-button type="primary" @click="currentSubmit('form')" :loading="loading">保 存</el-button>
            <el-button style="margin-left: 30px;" @click="hideDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import moment from 'moment'
    import commonUtil from '@/common/js/commonUtil'

    export default {
        name: "ProjectDialog",
        data() {
            const dateValidator = async (rule, value, callback) => {
                if (!this.form.dateRange || this.form.dateRange.length === 0) {
                    return callback(new Error('请选择项目起止日期'));
                }
                return callback();
            };
            return {
                title: '',
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
                            const end = commonUtil.getDayAfter(29);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '两个月',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getDayAfter(59);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '三个月',
                        onClick(picker) {
                            const start = new Date();
                            const end = commonUtil.getDayAfter(89);
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
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            error: {},
            updateObj: Object,
        },
        methods: {
            countDays() {
                // console.log(JSON.stringify(this.form.dateRange))
                if (this.form.dateRange) {
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
        watch: {
            visible: function (n) {
                if (n) {
                    this.title = '新增项目';
                    if (this.updateObj && this.updateObj.id) {
                        this.form = this.updateObj;
                        // this.form.dateRange = [new Date(), new Date()];
                        // console.log(JSON.stringify(this.form.dateRange))
                        this.title = '修改项目';
                    } else {
                        this.form.name = '';
                        this.form.code = '';
                        this.form.begin = '';
                        this.form.end = '';
                        this.form.dateRange = [];
                        this.form.days = '';
                        this.form.type = 'short';
                        this.form.acl = 'open';
                    }
                    if (this.$refs['form']) {
                        this.$refs['form'].clearValidate();
                    }
                }
            },
            loading: function (n, o) {
                if (o && !n) {
                    if (this.error) {
                        this.$notify.error({
                            title: '提示',
                            message: typeof this.error === 'boolean' ? '操作失败' : this.error,
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '操作成功',
                            duration: 2000
                        });
                        this.$refs['form'].resetFields()
                    }
                }
            },
        },
    }
</script>

<style scoped>
</style>
