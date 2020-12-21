<template>
    <el-dialog width="70%" title="填写日报" :visible.sync="visible" :before-close="hideDialog">
        <div class="dialog-form">
            <div class="dp-table" v-for="(item, index) in domList" style="margin-bottom: 10px;">
                <div class="dp-table-cell" style="width: 20px;">
                    <div style="height: 36px; line-height: 36px; font-size: 18px;">{{(index+1)+'.'}}</div>
                </div>
                <div class="dp-table-cell" style="width: 32%; padding-right: 10px;">
                    <el-select v-model="domList[index].projectId" size="medium" clearable placeholder="请选择项目" style="width: 100%;">
                        <el-option v-for="p in dailyProjectList" :key="p.id" :label="p.name" :value="p.id"></el-option>
                    </el-select>
                </div>
                <div class="dp-table-cell">
                    <el-input v-model="domList[index].content" size="medium" maxlength="50" placeholder="请填写日报内容（字数<=50）"></el-input>
                </div>
                <div class="dp-table-cell" style="width: 70px; padding-left: 10px;">
                    <el-row type="flex" justify="left">
                        <a @click="addNode(index)" class="action-a-btn">
                            <img src="@/assets/images/plus-16.png">
                        </a>
                        <a @click="deleteNode(index)" class="action-a-btn" style="margin-left: 5px;">
                            <img src="@/assets/images/close-16.png">
                        </a>
                    </el-row>
                </div>
            </div>
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
                domList: [
                    {projectId: '', content: ''},
                    {projectId: '', content: ''},
                    {projectId: '', content: ''},
                ],
                dailyProjectList: [],
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
                this.domList = this.domList.filter(item => {
                    return item.projectId && item.projectId !== '' && item.content.trim() !== '';
                });
                if (this.domList.length <= 0) {
                    this.$message({
                        message: '请至少填写一条日报信息',
                        type: 'warning',
                        duration: 2000
                    });
                    this.domList = [
                        {projectId: '', content: ''},
                    ];
                    return false;
                }
                this.submit(this.domList);
            },
            addNode(index) {
                this.domList.splice(index + 1, 0, {projectId: this.domList[index].projectId, content: ''});
            },
            deleteNode(index) {
                if (this.domList.length <= 1) {
                    this.$message({
                        message: '至少需要填写一条日报信息',
                        type: 'warning',
                        duration: 2000
                    });
                } else {
                    this.domList.splice(index, 1);//删除index为i,位置的数组元素
                }
            },
            async getDailyProjectList() {
                const res = await this.$service.getDailyProjectList({pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.dailyProjectList = res.data.result || [];
                }
            },
        },
        watch: {
            visible: function (n) {
                if (n) {
                    this.getDailyProjectList();
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
                        this.domList = [
                            {projectId: '', content: ''},
                            {projectId: '', content: ''},
                            {projectId: '', content: ''},
                        ];
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
        margin-top: 5px;
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
