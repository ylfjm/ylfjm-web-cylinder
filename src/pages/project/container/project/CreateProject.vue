<template>
    <div class="container">
        <el-form :label-width="labelWidth" ref="form" :rules="rules" :model="form">
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目代号" prop="code">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="起止日期" prop="code">
                <!--<el-date-picker
                        v-model="form.begin"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                </el-date-picker>-->
                <el-date-picker
                        v-model="form.begin"
                        type="date"
                        @change="initEndDateOptions"
                        placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                        v-model="form.end"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="可用工作日" prop="days">
                <el-input v-model="form.days">
                    <template slot="append">天</template>
                </el-input>
            </el-form-item>
            <el-form-item label="文字描述" prop="description">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="text-center">
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
            return {
                form: {
                    name: '',
                    code: '',
                    begin: '',
                    end: '',
                    days: '',
                    description: '',
                },
                labelWidth: '120px',
                rules: {
                    name: [{required: true, message: '请填写角色名', trigger: 'blur'}],
                    description: [],
                },
                pickerOptions: {
                },
            }
        },
        methods: {
            initEndDateOptions(value) {
                this.pickerOptions.disabledDate = function (time) {
                    const begin = new Date(value);
                    let y = begin.getFullYear();
                    let m = begin.getMonth() + 1;
                    let d = begin.getDate() + 1;
                    const time2 = `${y}-${m}-${d}`;
                    console.log(time2)
                    return time.getTime() < new Date(time2);
                }
            },
            currentSubmit() {
                console.log(this.form.begin)
            },
        },
    }
</script>

<style scoped>
    .container {
        width: 800px;
        padding: 20px 40px;
        background-color: white;
        border-radius: 4px;
    }
</style>