<template>
    <div>
        <div class="container">
            <div>
                <!--<router-link :to="'/task-list.html'">
                    <el-button type="primary">返 回</el-button>
                </router-link>-->
                <!--<el-divider class="black-divider&#45;&#45;vertical" direction="vertical"></el-divider>-->
                <span class="taskId" v-text="task.id"></span>
                <span class="taskName" v-text="task.name"></span>
            </div>
            <div class="dp-table">
                <div class="dp-table-cell" style="padding: 0 10px 0 0;">
                    <div class="panel task-text-panel" style="padding: 15px 20px;">
                        <div>
                            <div style="font-weight: bold;">任务描述</div>
                            <!--<div v-html="task.richText" class="ql-editor"></div>-->
                            <div v-html="task.richText" class="kind-editor-show"></div>
                            <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                        </div>
                        <div class="history-record">
                            <div style="font-weight: bold; margin: 30px 0 10px 0;">历史记录</div>
                            <div v-for="(item, index) in taskRemarkList">
                                <div>{{(index+1)+'.'+item.createDate+', 由 '}}
                                    <span style="font-weight: bold;">{{item.createBy}}</span>{{' '+item.text+'。'}}
                                </div>
                                <div v-if="item.richText">
                                    <div v-html="item.richText" class="kind-editor-show"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dp-table-cell" style="width: 25%; padding: 0 0 0 10px;">
                    <div class="panel" style="padding: 5px 20px 20px 20px;">
                        <el-tabs>
                            <el-tab-pane label="基本信息">
                                <el-form :label-width="'70px'" class="task-info-form">
                                    <el-form-item label="所属项目">
                                        <div>{{task.projectName}}</div>
                                    </el-form-item>
                                    <el-form-item label="任务类型">
                                        <div v-if="task.type === 'design'">产品</div>
                                        <div v-else-if="task.type === 'develop'">开发</div>
                                        <div v-else-if="task.type === 'test'">测试</div>
                                        <div v-else-if="task.type === 'other'">其它</div>
                                    </el-form-item>
                                    <el-form-item label="优先级">
                                        <div>{{task.pri}}</div>
                                    </el-form-item>
                                    <el-form-item label="任务状态">
                                        <div v-if="task.status === 'doing'" style="color: #ff5d5d;">进行中</div>
                                        <div v-else-if="task.status === 'done'" style="color: #00AA55;">已完成</div>
                                        <div v-else-if="task.status === 'cancel'" style="color: #ff9800;">已取消</div>
                                        <div v-else-if="task.status === 'closed'" style="color: #AAAAAA;">已关闭</div>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="panel" style="padding: 5px 20px 20px 20px;">
                        <el-tabs>
                            <el-tab-pane label="任务的生命周期">
                                <el-form :label-width="'70px'" class="task-info-form">
                                    <el-form-item label="由谁创建">
                                        <div v-if="task.createBy">{{getDevRealName(task.createBy)}}于{{task.createDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="产品设计">
                                        <div v-if="task.pdRequired === true">
                                            <div v-if="task.pdFinishedDate">
                                                {{getDevRealName(task.pdDesigner)}}于{{task.pdFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.pdEstimateDate">
                                                {{getDevRealName(task.pdDesigner)}}预计于{{task.pdEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="UI设计">
                                        <div v-if="task.uiRequired === true">
                                            <div v-if="task.uiFinishedDate">
                                                {{getDevRealName(task.uiDesigner)}}于{{task.uiFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.uiEstimateDate">
                                                {{getDevRealName(task.uiDesigner)}}预计于{{task.uiEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="前端">
                                        <div v-if="task.webRequired === true">
                                            <div v-if="task.webFinishedDate">
                                                {{getDevRealName(task.webDeveloper)}}于{{task.webFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.webEstimateDate">
                                                {{getDevRealName(task.webDeveloper)}}预计于{{task.webEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="安卓端">
                                        <div v-if="task.androidRequired === true">
                                            <div v-if="task.androidFinishedDate">
                                                {{getDevRealName(task.androidDeveloper)}}于{{task.androidFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.androidEstimateDate">
                                                {{getDevRealName(task.androidDeveloper)}}预计于{{task.androidEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="苹果端">
                                        <div v-if="task.iosRequired === true">
                                            <div v-if="task.iosFinishedDate">
                                                {{getDevRealName(task.iosDeveloper)}}于{{task.iosFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.iosEstimateDate">
                                                {{getDevRealName(task.iosDeveloper)}}预计于{{task.iosEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="后端">
                                        <div v-if="task.serverRequired === true">
                                            <div v-if="task.serverFinishedDate">
                                                {{getDevRealName(task.serverDeveloper)}}于{{task.serverFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.serverEstimateDate">
                                                {{getDevRealName(task.serverDeveloper)}}预计于{{task.serverEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="测试">
                                        <div v-if="task.testRequired === true">
                                            <div v-if="task.testFinishedDate">
                                                {{getDevRealName(task.tester)}}于{{task.testFinishedDate}}完成
                                            </div>
                                            <div v-else-if="task.testEstimateDate">
                                                {{getDevRealName(task.tester)}}预计于{{task.testEstimateDate}}完成
                                            </div>
                                            <div v-else style="color: #ff5d5d;">尚未排期</div>
                                        </div>
                                        <div v-else>未指派，自动完成</div>
                                    </el-form-item>
                                    <el-form-item label="由谁取消">
                                        <div v-if="task.canceledBy">{{getDevRealName(task.canceledBy)}}于{{task.canceledDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="由谁关闭">
                                        <div v-if="task.closedBy">{{getDevRealName(task.closedBy)}}于{{task.closedDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="最后编辑">
                                        <div v-if="task.lastEditedBy">{{getDevRealName(task.lastEditedBy)}}于{{task.lastEditedDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="popup-btn-box">
                <div class="btn-toolbar">
                    <a @click="jumpPage(1)">
                        <img src="@/assets/images/back2.png" style="margin-top: 5px;">
                        <div class="text">返回</div>
                    </a>
                    <el-divider class="white-divider--vertical" direction="vertical"></el-divider>
                    <a @click="showDialog('assign')">
                        <img src="@/assets/images/assign-18.png" style="margin-top: 7px;">
                        <div class="text">指派</div>
                    </a>
                    <a @click="showDialog('estimate')" v-if="['doing'].indexOf(task.status) > -1">
                        <img src="@/assets/images/estimate-18.png" style="margin-top: 7px;">
                        <div class="text">排期</div>
                    </a>
                    <a @click="showDialog('complete')" v-if="'doing' === task.status">
                        <img src="@/assets/images/complete-18.png" style="margin-top: 7px;">
                        <div class="text">完成</div>
                    </a>
                    <a @click="showDialog('activate')" v-if="['done','cancel','closed'].indexOf(task.status) > -1">
                        <i class="el-icon-magic-stick"></i>
                        <div class="text">激活</div>
                    </a>
                    <a @click="showDialog('cancel')" v-if="['wait','doing'].indexOf(task.status) > -1">
                        <img src="@/assets/images/cancel-18.png" style="margin-top: 7px;">
                        <div class="text">取消</div>
                    </a>
                    <a @click="showDialog('close')" v-if="['wait','doing','done','cancel'].indexOf(task.status) > -1">
                        <!--<i class="el-icon-switch-button"></i>-->
                        <img src="@/assets/images/close.png" style="margin-top: 7px;">
                        <div class="text">关闭</div>
                    </a>
                    <el-divider class="white-divider--vertical" direction="vertical"></el-divider>
                    <a @click="jumpPage(2)" title="编辑">
                        <i class="el-icon-edit-outline"></i>
                    </a>
                    <a title="复制任务">
                        <i class="el-icon-copy-document"></i>
                    </a>
                    <a @click="deleteTask" title="删除" style="margin-right: 10px;">
                        <i class="el-icon-delete"></i>
                    </a>
                </div>
            </div>
        </div>
        <UpdateTaskStatusDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="updateTaskStatus"
                :task="task"
                :actionType="actionType"
                :loading="updateTaskStatusLoading"
                :adminList="adminList"
        />
    </div>
</template>

<script>
    import moment from 'moment'
    import UpdateTaskStatusDialog from './UpdateTaskStatusDialog'

    export default {
        name: "TaskDetailPage",
        inject: ['reload'],
        data() {
            return {
                task: {},
                projectList: [],
                taskRemarkList: [],
                activeTabName: 'first',
                dialogVisible: false,
                updateTaskStatusLoading: false,
                actionType: null,
                adminList: [],
            }
        },
        methods: {
            jumpPage(type) {
                if (type === 1) {
                    //返回到任务列表页
                    this.$router.push({
                        name: 'task-list.html'
                    })
                } else if (type === 2) {
                    //返回到任务编辑页
                    this.$router.push({
                        name: 'edit-task.html',
                        query: {
                            taskId: this.task.id,
                        }
                    })
                }
            },
            async deleteTask() {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(async () => {
                    const res = await this.$service.deleteTask({id: this.task.id});
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                            duration: 2000
                        });
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: res.message ? res.message : '删除失败',
                            duration: 2000
                        })
                    }
                }).catch(() => {
                });
            },
            showDialog(actionType) {
                this.dialogVisible = true;
                this.actionType = actionType
            },
            hideDialog() {
                this.dialogVisible = false;
            },
            async updateTaskStatus(data) {
                this.updateTaskStatusLoading = true;
                let res = null;
                let formData;
                if (this.actionType === 'assign') {
                    formData = {
                        id: this.task.id,
                        ...data,
                        // pdDesigner: data.pdDesigner && data.pdDesigner.length > 0 ? data.pdDesigner.join(",") : null,
                        // uiDesigner: data.uiDesigner && data.uiDesigner.length > 0 ? data.uiDesigner.join(",") : null,
                        // webDeveloper: data.webDeveloper && data.webDeveloper.length > 0 ? data.webDeveloper.join(",") : null,
                        // androidDeveloper: data.androidDeveloper && data.androidDeveloper.length > 0 ? data.androidDeveloper.join(",") : null,
                        // iosDeveloper: data.iosDeveloper && data.iosDeveloper.length > 0 ? data.iosDeveloper.join(",") : null,
                        // serverDeveloper: data.serverDeveloper && data.serverDeveloper.length > 0 ? data.serverDeveloper.join(",") : null,
                        // tester: data.tester && data.tester.length > 0 ? data.tester.join(",") : null,
                        // remark: data.remark
                    };
                } else if (this.actionType === 'estimate') {
                    formData = {
                        id: this.task.id,
                        estimateDate: moment(data.estimateDate).format('YYYY-MM-DD'),
                        currentPostCode: localStorage.getItem('currentPostCode'),
                        remark: data.remark
                    };
                } else if (this.actionType === 'complete') {
                    formData = {
                        id: this.task.id,
                        finishedDate: data.finishedDate ? moment(data.finishedDate).format('YYYY-MM-DD') : null,
                        currentPostCode: localStorage.getItem('currentPostCode'),
                        remark: data.remark
                    };
                } else if (this.actionType === 'activate' || this.actionType === 'cancel' || this.actionType === 'close') {
                    formData = {
                        id: this.task.id,
                        remark: data.remark
                    };
                }
                res = await this.$service.taskAction({
                    ...formData,
                    actionType: this.actionType
                });
                this.updateTaskStatusLoading = false;
                if (res.code === 20000) {
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '操作成功',
                        duration: 2000,
                    });
                    this.hideDialog();
                    this.reload();
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '操作失败',
                        duration: 2000,
                    })
                }
            },
            async getAdminList() {
                const res = await this.$service.getAdminList({pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.adminList = res.data.result || [];
                }
            },
            getDevRealName(userName) {
                for (let item of this.adminList) {
                    if (item.userName === userName) {
                        return item.realName;
                    }
                }
            },
        },
        async mounted() {
            if (this.$route.query.taskId) {
                //获取任务详情
                const res = await this.$service.getTaskById({id: this.$route.query.taskId});
                if (res.code === 20000) {
                    this.task = res.data;
                }
                //获取任务备注列表
                const res1 = await this.$service.getTaskRemarkList({taskId: this.$route.query.taskId});
                if (res1.code === 20000) {
                    this.taskRemarkList = res1.data || [];
                }
            }
            this.getAdminList();
        },
        components: {
            UpdateTaskStatusDialog
        }
    }
</script>

<style scoped>
    .container {
        margin: 0 100px;
        padding: 0;
        border-radius: 4px;
    }

    .panel {
        margin-top: 10px;
    }

    .task-text-panel {
        margin-bottom: 150px;
    }

    .taskId {
        font-weight: bold;
        color: #838a9d;
        border: 1px solid #838a9d;
        padding: 2px 5px;
        border-radius: 2px;
        margin-left: 5px;
    }

    .taskName {
        font-size: 15px;
        font-weight: bold;
        margin-left: 20px;
    }

    .history-record .kind-editor-show {
        font-size: 13px;
        padding: 5px 10px 5px 15px;
        margin: 5px 10px;
        background-color: rgba(0, 0, 0, .025);
    }

    .task-info-form /deep/ .el-form-item__label {
        color: #838a9d;
    }

    .task-info-form /deep/ .el-form-item {
        margin-bottom: 0;
    }

    /*.black-divider--vertical {
        background-color: #F5F5F5;
        width: 2px;
        height: 1.3em;
        margin: 0 20px;
    }

    .black-divider--horizontal {
        background-color: #F5F5F5;
        height: 2px;
        margin: 10px 0;
    }*/

    .white-divider--vertical {
        width: 2px;
        height: 1.3em;
        margin: 0 5px 0 10px;
    }

    .popup-btn-box {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 70px;
        text-align: center;
    }

    .btn-toolbar {
        display: inline-block;
        width: auto;
        color: #fff;
        background-color: rgba(90, 90, 90, .85);
        border-radius: 4px;
    }

    .popup-btn-box a {
        cursor: pointer;
        margin: 4px 0 4px 5px;
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        vertical-align: middle;
        display: inline-block;
        color: #fff;
    }

    .popup-btn-box a .text {
        margin-left: 3px;
        float: right;
        height: 32px;
        line-height: 32px;
        /*padding-top: 2px;*/
        font-size: 14px;
    }

    .popup-btn-box a:hover {
        background-color: #909090;
        border-radius: 4px;
    }

    .el-icon-magic-stick {
        vertical-align: middle;
        display: inline;
        font-size: 18px;
        line-height: 1px;
    }

    .el-icon-edit-outline, .el-icon-copy-document, .el-icon-delete {
        vertical-align: middle;
        display: inline;
        font-size: 22px;
        line-height: 1px;
    }
</style>
