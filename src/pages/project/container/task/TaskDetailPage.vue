<template>
    <div class="container">
        <div>
            <router-link :to="'/task-list.html'">
                <el-button type="primary" icon="el-icon-back">返 回</el-button>
            </router-link>
            <el-divider direction="vertical"></el-divider>
            <span style="font-weight: bold; color: #838a9d; border: 1px solid #838a9d; padding: 2px 5px; border-radius: 2px;" v-text="task.id"></span>
            <span style="margin-left: 30px; font-weight: bold;" v-text="task.name"></span>
        </div>
        <div class="dp-table">
            <div class="dp-table-cell" style="width: 68%; padding: 0 10px 0 0;">
                <div class="panel" style="padding: 15px 20px;">
                    <span style="font-weight: bold;">任务描述</span>
                    <div v-html="task.content" class="ql-editor"></div>
                    <el-divider style="margin: 0 15px !important;"></el-divider>
                </div>
            </div>
            <div class="dp-table-cell" style="width: 32%; padding: 0 0 0 10px;">
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
                    <el-form :label-width="'126px'" class="task-info-form" style="margin-top: 10px;">
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
</template>

<script>
    export default {
        name: "TaskDetailPage",
        data() {
            return {
                task: {},
                projectList: [],
                activeTabName: 'first',
            }
        },
        methods: {
            async initData() {

            },
        },
        async created() {
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
            }
        },
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

    .ql-editor {
        padding: 15px 0;
    }

    .task-info-form /deep/ .el-form-item__label {
        color: #838a9d;
    }

    .task-info-form /deep/ .el-form-item {
        margin-bottom: 0;
    }

    .el-divider--vertical {
        background-color: #838a9d;
        width: 2px;
        height: 1.3em;
        margin: 0 18px;
    }
</style>
