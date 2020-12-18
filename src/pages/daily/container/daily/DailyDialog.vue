<template>
    <el-dialog width="60%" title="填写日报" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <el-form :label-width="'70px'" ref="form" :rules="rules" :model="form">
                <div class="dp-table" v-for="(item, index) in domList" style="margin-bottom: 10px;">
                    <div class="dp-table-cell" style="width: 20px;">
                        <div style="height: 32px; line-height: 32px;">{{(index+1)+'.'}}</div>
                    </div>
                    <div class="dp-table-cell" style="width: 26%; padding-right: 10px;">
                        <el-select v-model="domList[index].projectId" placeholder="请选择项目" style="width: 100%;">
                            <el-option v-for="p in projectList" :key="p.id" :label="p.name" :value="p.id"></el-option>
                        </el-select>
                    </div>
                    <div class="dp-table-cell">
                        <el-input v-model="domList[index].content" placeholder="请填写日报内容"></el-input>
                    </div>
                    <div class="dp-table-cell" style="width: 70px; padding-left: 10px;">
                        <el-row type="flex" justify="left">
                            <!--<el-tooltip effect="dark" content="添加" placement="bottom-start">-->
                                <a @click="addNode(index)" class="action-a-btn">
                                    <img src="@/assets/images/plus-16.png">
                                </a>
                            <!--</el-tooltip>-->
                            <!--<el-tooltip effect="dark" content="删除" placement="bottom-start">-->
                                <a @click="deleteNode(index)" class="action-a-btn" style="margin-left: 5px;">
                                    <img src="@/assets/images/close-16.png">
                                </a>
                            <!--</el-tooltip>-->
                        </el-row>
                    </div>
                </div>
            </el-form>
        </div>
        <div slot="footer" class="text-center">
            <el-button type="primary" @click="currentSubmit('form')" :loading="loading">确 定</el-button>
            <el-button style="margin-left: 10px;" @click="hideDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'DailyDialog',
        data() {
            return {
                form: {
                    userName: '',
                },
                domList: [
                    {projectId: '', content: ''},
                    {projectId: '', content: ''},
                    {projectId: '', content: ''},
                ],
                projectList: [],
                rules: {
                    userName: [{required: true, message: '请填写用户名', trigger: 'blur'}],
                },
            }
        },
        props: {
            visible: Boolean,
            hideDialog: Function,
            submit: Function,
            loading: Boolean,
            error: {},
        },
        methods: {
            currentSubmit(formName) {
                console.log(JSON.stringify(this.domList))
                // this.$refs[formName].validate(valid => {
                //     if (valid) {
                //         this.submit(this.form)
                //     } else {
                //         return false
                //     }
                // })
            },
            async getProjectList() {
                const res = await this.$service.getProjectList({pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.projectList = res.data.result || [];
                }
            },
            addNode(index) {
                // this.domList.push(this.domList[index]);
                this.domList.push({projectId: '', content: ''});
            },
            deleteNode(index) {
                if (this.domList.length <= 1) {
                    this.$message({
                        message: '就一条了，别再删了。',
                        type: 'warning',
                        duration: 2000
                    });
                } else {
                    this.domList.splice(index, 1);//删除index为i,位置的数组元素
                }
            }
        },
        watch: {
            visible: function (n) {
                if (n) {
                    if (this.$refs['form']) {
                        this.$refs['form'].clearValidate();
                    }
                    this.getProjectList();
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
    .action-a-btn {
        height: 26px;
        padding: 0 5px;
        display: inline;
        text-align: center;
        vertical-align: middle;
        margin-top: 3px;
    }

    .action-a-btn:hover {
        background-color: #dbdbdb;
        border-radius: 4px;
    }

    .action-a-btn img {
        width: 16px;
        height: 16px;
        margin-top: 5px;
    }
</style>
