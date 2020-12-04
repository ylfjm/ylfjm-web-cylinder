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
                    <div class="panel" style="padding: 15px 20px;">
                        <div>
                            <div style="font-weight: bold;">任务描述</div>
                            <div v-html="task.richText" class="ql-editor"></div>
                            <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                        </div>
                        <div class="history-record">
                            <div style="font-weight: bold; margin: 30px 0 10px 0;">历史记录</div>
                            <div v-for="(item, index) in taskRemarkList">
                                <div v-if="item.textType === 2">
                                    <div>{{(index+1)+'.'+item.createDate+', 由 '}}
                                        <span style="font-weight: bold;">{{item.createBy}}</span> 添加备注。
                                    </div>
                                    <div v-html="item.richText" class="ql-editor"></div>
                                </div>
                                <div v-else>
                                    <div>{{(index+1)+'.'+item.createDate+', 由 '}}
                                        <span style="font-weight: bold;">{{item.createBy}}</span>{{' '+item.text+'。'}}
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="dp-table-cell" style="width: 22%; padding: 0 0 0 10px;">
                    <div class="panel" style="padding: 5px 20px 20px 20px;">
                        <el-tabs v-model="activeTabName">
                            <el-tab-pane label="基本信息" name="first">
                                <el-form :label-width="'70px'" class="task-info-form">
                                    <el-form-item label="所属项目">
                                        <div>{{task.projectName}}</div>
                                    </el-form-item>
                                    <el-form-item label="任务类型">
                                        <div>{{task.type}}</div>
                                    </el-form-item>
                                    <el-form-item label="优先级">
                                        <div>{{task.pri}}</div>
                                    </el-form-item>
                                    <el-form-item label="任务状态">
                                        <div>{{task.status}}</div>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="任务的周期" name="second">
                                <el-form :label-width="'70px'" class="task-info-form">
                                    <el-form-item label="由谁创建">
                                        <div v-if="task.openedBy">{{task.openedBy}} 于 {{task.openedDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="由谁完成">
                                        <div v-if="task.finishedBy">{{task.finishedBy}} 于 {{task.finishedDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="由谁取消">
                                        <div v-if="task.canceledBy">{{task.canceledBy}} 于 {{task.canceledDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="由谁关闭">
                                        <div v-if="task.closedBy">{{task.closedBy}} 于 {{task.closedDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="关闭原因">
                                        <div v-if="task.closedReason">{{task.closedReason}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                    <el-form-item label="最后编辑">
                                        <div v-if="task.lastEditedBy">{{task.lastEditedBy}} 于 {{task.lastEditedDate}}</div>
                                        <div v-else>/</div>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="panel" style="padding: 15px 20px 20px 20px;">
                        <span style="font-weight: bold; font-size: 14px;">开发信息</span>
                        <el-divider class="black-divider--horizontal" direction="horizontal"></el-divider>
                        <el-form :label-width="'126px'" class="task-info-form" style="">
                            <div v-if="task.pdEstimateDate">
                                <el-form-item label="产品预计完成时间">
                                    {{task.pdEstimateDate ? task.pdEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="产品实际完成时间">
                                    {{task.pdFinishedDate ? task.pdFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                            <div v-if="task.uiEstimateDate">
                                <el-form-item label="UI预计完成时间">
                                    {{task.uiEstimateDate ? task.uiEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="UI实际完成时间">
                                    {{task.uiFinishedDate ? task.uiFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                            <div v-if="task.webEstimateDate">
                                <el-form-item label="web预计完成时间">
                                    {{task.webEstimateDate ? task.webEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="web实际完成时间">
                                    {{task.webFinishedDate ? task.webFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                            <div v-if="task.androidEstimateDate">
                                <el-form-item label="android预计完成时间">
                                    {{task.androidEstimateDate ? task.androidEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="android实际完成时间">
                                    {{task.androidFinishedDate ? task.androidFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                            <div v-if="task.iosEstimateDate">
                                <el-form-item label="ios预计完成时间">
                                    {{task.iosEstimateDate ? task.iosEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="ios实际完成时间">
                                    {{task.iosFinishedDate ? task.iosFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                            <div v-if="task.serverEstimateDate">
                                <el-form-item label="后端预计完成时间">
                                    {{task.serverEstimateDate ? task.serverEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="后端实际完成时间">
                                    {{task.serverFinishedDate ? task.serverFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                            <div v-if="task.testEstimateDate">
                                <el-form-item label="测试预计完成时间">
                                    {{task.testEstimateDate ? task.testEstimateDate : '/'}}
                                </el-form-item>
                                <el-form-item label="测试实际完成时间">
                                    {{task.testFinishedDate ? task.testFinishedDate : '/'}}
                                </el-form-item>
                            </div>
                        </el-form>
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
                        <img src="@/assets/images/assign.png" style="margin-top: 5px;">
                        <div class="text">指派</div>
                    </a>
                    <a @click="showDialog('begin')" v-if="'wait' === task.status">
                        <img src="@/assets/images/begin.png" style="margin-top: 5px;">
                        <div class="text">开始</div>
                    </a>
                    <a @click="showDialog('done')" v-if="'doing' === task.status">
                        <img src="@/assets/images/complete.png" style="margin-top: 5px;">
                        <div class="text">完成</div>
                    </a>
                    <a @click="showDialog('doing')" v-if="['cancel','closed'].indexOf(task.status) > -1">
                        <i class="el-icon-magic-stick"></i>
                        <div class="text">激活</div>
                    </a>
                    <a @click="showDialog('cancel')" v-if="['wait','doing','pause'].indexOf(task.status) > -1">
                        <img src="@/assets/images/cancel.png" style="margin-top: 6px;">
                        <div class="text">取消</div>
                    </a>
                    <a @click="showDialog('closed')" v-if="['wait','doing','pause','cancel'].indexOf(task.status) > -1">
                        <i class="el-icon-switch-button"></i>
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
                :opeType="opeType"
                :loading="updateTaskStatusLoading"
        ></UpdateTaskStatusDialog>
    </div>
</template>

<script>
    import UpdateTaskStatusDialog from './UpdateTaskStatusDialog'

    export default {
        name: "TaskDetailPage",
        data() {
            return {
                task: {},
                projectList: [],
                taskRemarkList: [],
                activeTabName: 'first',
                dialogVisible: false,
                updateTaskStatusLoading: false,
                opeType: null,
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
                        params: {
                            id: this.task.id
                        }
                    })
                }
            },
            async deleteTask() {
                const res = await this.$service.deleteTask({id: this.task.id});
                if (res.code === 20000) {
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '删除任务成功',
                    });
                    this.$router.push('/task-list.html')
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '删除任务失败',
                    })
                }
            },
            showDialog(opeType) {
                this.dialogVisible = true;
                this.opeType = opeType
            },
            hideDialog() {
                this.dialogVisible = false;
            },
            async updateTaskStatus(data) {
                this.updateTaskStatusLoading = true;
                let res = null;
                if (this.opeType === 'assign') {
                    res = await this.$service.taskAssign({
                        id: this.task.id,
                        pdDesigner: data.pdDesigner ? data.pdDesigner.join(",") : data.pdDesigner,
                        uiDesigner: data.uiDesigner ? data.uiDesigner.join(",") : data.uiDesigner,
                        webDeveloper: data.webDeveloper ? data.webDeveloper.join(",") : data.webDeveloper,
                        androidDeveloper: data.androidDeveloper ? data.androidDeveloper.join(",") : data.androidDeveloper,
                        iosDeveloper: data.iosDeveloper ? data.iosDeveloper.join(",") : data.iosDeveloper,
                        serverDeveloper: data.serverDeveloper ? data.serverDeveloper.join(",") : data.serverDeveloper,
                        tester: data.tester ? data.tester.join(",") : data.tester,
                        remark: data.remark
                    });
                } else {
                    res = await this.$service.updateTaskStatus({
                        id: this.task.id,
                        oldStatus: this.task.status,
                        newStatus: this.opeType,
                        remark: data.remark
                    });
                }
                this.updateTaskStatusLoading = false;
                if (res.code === 20000) {
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '操作成功',
                    });
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '操作失败',
                    })
                }
            },
        },
        async created() {
            //获取项目列表
            const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
            if (res.code === 20000) {
                this.projectList = res.data.result || [];
            }
            if (this.$route.params.id) {
                const res = await this.$service.getTaskById({id: this.$route.params.id});
                if (res.code === 20000) {
                    this.task = res.data;
                    this.projectList.map(item => {
                        if (this.task.projectId === item.id) {
                            this.task.projectName = item.name;
                        }
                    });
                }
                //获取任务备注列表
                const res1 = await this.$service.getTaskRemarkList({taskId: this.$route.params.id});
                if (res1.code === 20000) {
                    this.taskRemarkList = res1.data || [];
                }
            }
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
        margin-bottom: 130px;
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

    .ql-editor {
        padding: 15px 0;
    }

    .history-record .ql-editor {
        /*padding: 5px 0;
        margin-left: 10px;*/
        padding: 5px 5px 5px 10px;
        margin: 5px 0 0 10px;
        background-color: rgba(0, 0, 0, .025);
        border: 1px solid #eee;
    }

    .task-info-form /deep/ .el-form-item__label {
        color: #838a9d;
    }

    .task-info-form /deep/ .el-form-item {
        margin-bottom: 0;
    }

    .black-divider--vertical {
        background-color: #838a9d;
        width: 2px;
        height: 1.3em;
        margin: 0 20px;
    }

    .black-divider--horizontal {
        height: 2px;
        margin: 10px 0;
    }

    .white-divider--vertical {
        width: 2px;
        height: 1.3em;
        margin: 0 10px 0 20px;
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
        margin: 4px 0 4px 10px;
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        vertical-align: middle;
        display: inline-block;
        color: #fff;
    }

    .popup-btn-box a .text {
        float: right;
        height: 30px;
        line-height: 30px;
        padding-top: 2px;
    }

    .popup-btn-box a:hover {
        background-color: #909090;
        border-radius: 4px;
    }

    .el-icon-back, .el-icon-right, .el-icon-magic-stick, .el-icon-switch-button {
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
