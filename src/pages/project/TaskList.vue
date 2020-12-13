<template>
    <div class="container">
        <div class="search_box">
            <a @click="onSearch('all')" :class="formSearch.searchType === 'all' ? 'link-btn link-btn-active' : 'link-btn'">所有</a>
            <a @click="onSearch('notClosed')" :class="formSearch.searchType === 'notClosed' ? 'link-btn link-btn-active' : 'link-btn'">未关闭</a>
            <a @click="onSearch('assignMe')" :class="formSearch.searchType === 'assignMe' ? 'link-btn link-btn-active' : 'link-btn'">我参与的</a>
            <a @click="onSearch('doing')" :class="formSearch.searchType === 'doing' ? 'link-btn link-btn-active' : 'link-btn'">进行中</a>
            <a @click="onSearch('done')" :class="formSearch.searchType === 'done' ? 'link-btn link-btn-active' : 'link-btn'">已完成</a>
            <a @click="onSearch('cancel')" :class="formSearch.searchType === 'cancel' ? 'link-btn link-btn-active' : 'link-btn'">已取消</a>
            <a @click="onSearch('closed')" :class="formSearch.searchType === 'closed' ? 'link-btn link-btn-active' : 'link-btn'">已关闭</a>
            <el-button type="primary" @click="jumpPage('', 'CreateTaskPage')" icon="el-icon-plus" style="float: right;">
                创建任务
            </el-button>
        </div>
        <div class="table-content">
            <el-table
                    :data="tableList"
                    tooltip-effect="dark"
                    v-loading="searchLoading"
                    :header-cell-style="{fontSize: '14px', color: '#333333'}"
                    stripe
            >
                <el-table-column
                        prop="id"
                        min-width="80"
                        show-overflow-tooltip
                        label="ID"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="pri"
                        min-width="80"
                        show-overflow-tooltip
                        label="优先级"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        min-width="450"
                        show-overflow-tooltip
                        label="任务名称"
                >
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" :content="scope.row.name" placement="right-start">
                            <el-link :underline="false" @click="jumpPage(scope.row.id, 'TaskDetailPage')">{{scope.row.name}}</el-link>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="status"
                        min-width="60"
                        show-overflow-tooltip
                        label="状态"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 'doing'" style="color: #ff5d5d;">进行中</div>
                        <div v-if="scope.row.status === 'done'" style="color: #00AA55;">已完成</div>
                        <!--<div v-if="scope.row.status === 'cancel'" style="color: #ff9800;">已取消</div>-->
                        <div v-if="scope.row.status === 'cancel'" style="color: #AAAAAA;">已取消</div>
                        <div v-if="scope.row.status === 'closed'" style="color: #AAAAAA;">已关闭</div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="createBy"
                        min-width="70"
                        label="创建"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="createDate"
                        min-width="100"
                        label="创建日期"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="deadline"
                        min-width="100"
                        label="截止日期"
                >
                    <template slot-scope="scope">
                        <!--<div v-if="scope.row.deadlineOverdue && scope.row.deadlineOverdue === true" style="color: #FF3300;">
                            {{scope.row.deadline}}
                        </div>
                        <div v-else>-->
                            {{scope.row.deadline}}
                        <!--</div>-->
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="tester"
                        min-width="70"
                        label="测试"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.testRequired">
                            <div v-if="scope.row.tester === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.tester)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.tester)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="testEstimateDate"
                        min-width="80"
                        label="测试排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.testRequired ? scope.row.testEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="testStatus"
                        min-width="80"
                        label="测试状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.testStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="pdDesigner"
                        min-width="70"
                        label="产品"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.pdRequired">
                            <div v-if="scope.row.pdDesigner === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.pdDesigner)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.pdDesigner)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="pdEstimateDate"
                        min-width="100"
                        label="产品排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.pdRequired ? scope.row.pdEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="pdStatus"
                        min-width="80"
                        label="产品状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.pdStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="uiDesigner"
                        min-width="70"
                        label="UI"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.uiRequired">
                            <div v-if="scope.row.uiDesigner === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.uiDesigner)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.uiDesigner)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="uiEstimateDate"
                        min-width="100"
                        label="UI排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.uiRequired ? scope.row.uiEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="uiStatus"
                        min-width="80"
                        label="UI状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.uiStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="webDeveloper"
                        min-width="70"
                        label="前端"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.webRequired">
                            <div v-if="scope.row.webDeveloper === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.webDeveloper)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.webDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="webEstimateDate"
                        min-width="100"
                        label="前端排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.webRequired ? scope.row.webEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="webStatus"
                        min-width="80"
                        label="前端状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.webStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="androidDeveloper"
                        min-width="70"
                        label="安卓"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.androidRequired">
                            <div v-if="scope.row.androidDeveloper === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.androidDeveloper)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.androidDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="androidEstimateDate"
                        min-width="100"
                        label="安卓排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.androidRequired ? scope.row.androidEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="androidStatus"
                        min-width="80"
                        label="安卓状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.androidStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="iosDeveloper"
                        min-width="70"
                        label="苹果"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.iosRequired">
                            <div v-if="scope.row.iosDeveloper === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.iosDeveloper)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.iosDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="iosEstimateDate"
                        min-width="100"
                        label="苹果排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.iosRequired ? scope.row.iosEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="iosStatus"
                        min-width="80"
                        label="苹果状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.iosStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="serverDeveloper"
                        min-width="70"
                        label="后端"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.serverRequired">
                            <div v-if="scope.row.serverDeveloper === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.serverDeveloper)}}</div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.serverDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="serverEstimateDate"
                        min-width="100"
                        label="后端排期"
                >
                    <template slot-scope="scope">
                        {{scope.row.serverRequired ? scope.row.serverEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="serverStatus"
                        min-width="80"
                        label="后端状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.serverStatus}}
                    </template>
                </el-table-column>
                <!--<el-table-column
                        prop="devList"
                        min-width="420"
                        label="指派列表"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.devList && scope.row.devList.length > 0">
                            <span v-for="(item, index) in scope.row.devList" :key="index">
                                {{item}}<span v-if="index < scope.row.devList.length - 1">、</span>
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="overdueList"
                        min-width="380"
                        label="逾期列表"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.overdueList && scope.row.overdueList.length > 0">
                            <span v-for="(item, index) in scope.row.overdueList" :key="index">
                                {{item}}<span v-if="index < scope.row.overdueList.length - 1">、</span>
                            </span>
                        </div>
                    </template>
                </el-table-column>-->
                <el-table-column
                        align="center"
                        fixed="right"
                        width="170"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-tooltip effect="dark" content="指派" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'assign')" class="action-a-btn">
                                    <img src="@/assets/images/assign-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="排期" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'estimate')" class="action-a-btn">
                                    <img src="@/assets/images/estimate-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="关闭" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'close')" class="action-a-btn">
                                    <img src="@/assets/images/close-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="完成" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'complete')" class="action-a-btn">
                                    <img src="@/assets/images/complete-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="编辑" placement="bottom-start">
                                <a @click="jumpPage(scope.row.id, 'EditTaskPage')" class="action-a-btn">
                                    <img src="@/assets/images/edit-22.png">
                                </a>
                            </el-tooltip>
                            <!--<el-button type="primary" size="mini" @click="jumpPage(scope.row.id, 'EditTaskPage')">编辑</el-button>-->
                            <!--<el-button type="danger" size="mini" @click="deleteTask(scope.row.id)">删除</el-button>-->
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination_box">
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        class="pagination_content"
                        :current-page="formSearch.pageNum"
                        :page-size="formSearch.pageSize"
                        :total="total"
                ></el-pagination>
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
    import UpdateTaskStatusDialog from './container/task/UpdateTaskStatusDialog'

    export default {
        name: 'TaskList',
        inject: ['reload'],
        data() {
            return {
                formSearch: {
                    searchType: 'notClosed',
                    pageNum: 1,
                    pageSize: 15
                },
                total: 0,
                pages: 0,
                tableList: [],
                adminList: [],
                searchLoading: false,

                currentPostCode: localStorage.getItem('currentPostCode'),
                currentUserName: localStorage.getItem('currentUserName'),

                task: {},
                dialogVisible: false,
                updateTaskStatusLoading: false,
                actionType: '',
            }
        },
        methods: {
            onSearch(searchType) {
                this.formSearch.pageNum = 1;
                this.formSearch.searchType = searchType;
                this.searchCommon()
            },
            //分页
            handleCurrentChange(pageNum) {
                this.formSearch.pageNum = pageNum;
                this.searchCommon()
            },
            handleSizeChange(pageSize) {
                this.formSearch.pageNum = 1;
                this.formSearch.pageSize = pageSize;
                this.searchCommon()
            },
            async searchCommon() {
                let searchParam = {
                    searchType: this.formSearch.searchType,
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize
                };
                this.searchLoading = true;
                const res = await this.$service.getTaskList(searchParam);
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum;
                    this.formSearch.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                    this.tableList = res.data.result || [];
                    this.tableList.map(item => {
                        if (new Date().getTime() > new Date(item.deadline).getTime()) {
                            item.deadlineOverdue = true;
                        } else {
                            item.deadlineOverdue = false;
                        }
                        if (item.createBy) {
                            item.createBy = this.getDevRealName(item.createBy);
                        }
                        // item.devList = [];
                        // if (item.pdDesigner) {
                        //     item.devList.push(this.getDevRealName(item.pdDesigner));
                        // }
                        // if (item.uiDesigner) {
                        //     item.devList.push(this.getDevRealName(item.uiDesigner));
                        // }
                        // if (item.webDeveloper) {
                        //     item.devList.push(this.getDevRealName(item.webDeveloper));
                        // }
                        // if (item.androidDeveloper) {
                        //     item.devList.push(this.getDevRealName(item.androidDeveloper));
                        // }
                        // if (item.iosDeveloper) {
                        //     item.devList.push(this.getDevRealName(item.iosDeveloper));
                        // }
                        // if (item.serverDeveloper) {
                        //     item.devList.push(this.getDevRealName(item.serverDeveloper));
                        // }
                        // if (item.tester) {
                        //     item.devList.push(this.getDevRealName(item.tester));
                        // }
                        // item.overdueList = [];
                        // if (item.pdRequired && item.pdEstimateDate) {
                        //     if (item.pdFinishedDate && new Date(item.pdFinishedDate).getTime() > new Date(item.pdEstimateDate).getTime()) {
                        //         item.overdueList.push("产品");
                        //     } else if (!item.pdFinishedDate && new Date().getTime() > new Date(item.pdEstimateDate).getTime()) {
                        //         item.overdueList.push("产品");
                        //     }
                        // }
                        // if (item.uiRequired && item.uiEstimateDate) {
                        //     if (item.uiFinishedDate && new Date(item.uiFinishedDate).getTime() > new Date(item.uiEstimateDate).getTime()) {
                        //         item.overdueList.push("UI");
                        //     } else if (!item.uiFinishedDate && new Date().getTime() > new Date(item.uiEstimateDate).getTime()) {
                        //         item.overdueList.push("UI");
                        //     }
                        // }
                        // if (item.webRequired && item.webEstimateDate) {
                        //     if (item.webFinishedDate && new Date(item.webFinishedDate).getTime() > new Date(item.webEstimateDate).getTime()) {
                        //         item.overdueList.push("前端");
                        //     } else if (!item.webFinishedDate && new Date().getTime() > new Date(item.webEstimateDate).getTime()) {
                        //         item.overdueList.push("前端");
                        //     }
                        // }
                        // if (item.androidRequired && item.androidEstimateDate) {
                        //     if (item.androidFinishedDate && new Date(item.androidFinishedDate).getTime() > new Date(item.androidEstimateDate).getTime()) {
                        //         item.overdueList.push("安卓");
                        //     } else if (!item.androidFinishedDate && new Date().getTime() > new Date(item.androidEstimateDate).getTime()) {
                        //         item.overdueList.push("安卓");
                        //     }
                        // }
                        // if (item.iosRequired && item.iosEstimateDate) {
                        //     if (item.iosFinishedDate && new Date(item.iosFinishedDate).getTime() > new Date(item.iosEstimateDate).getTime()) {
                        //         item.overdueList.push("苹果");
                        //     } else if (!item.iosFinishedDate && new Date().getTime() > new Date(item.iosEstimateDate).getTime()) {
                        //         item.overdueList.push("苹果");
                        //     }
                        // }
                        // if (item.serverRequired && item.serverEstimateDate) {
                        //     if (item.serverFinishedDate && new Date(item.serverFinishedDate).getTime() > new Date(item.serverEstimateDate).getTime()) {
                        //         item.overdueList.push("后端");
                        //     } else if (!item.serverFinishedDate && new Date().getTime() > new Date(item.serverEstimateDate).getTime()) {
                        //         item.overdueList.push("后端");
                        //     }
                        // }
                        // if (item.testRequired && item.testEstimateDate) {
                        //     if (item.testFinishedDate && new Date(item.testFinishedDate).getTime() > new Date(item.testEstimateDate).getTime()) {
                        //         item.overdueList.push("测试");
                        //     } else if (!item.testFinishedDate && new Date().getTime() > new Date(item.testEstimateDate).getTime()) {
                        //         item.overdueList.push("测试");
                        //     }
                        // }

                        if (item.pdRequired) {
                            if (!item.pdEstimateDate) {
                                item.pdStatus = '待排期';
                            } else if (!item.pdFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.pdEstimateDate) {
                                    item.pdStatus = '已逾期';
                                } else {
                                    item.pdStatus = '进行中';
                                }
                            } else if (item.pdFinishedDate) {
                                if (item.pdFinishedDate > item.pdEstimateDate) {
                                    item.pdStatus = '逾期完成';
                                } else {
                                    item.pdStatus = '正常完成';
                                }
                            }
                        } else {
                            item.pdStatus = '-';
                        }
                        if (item.uiRequired) {
                            if (!item.uiEstimateDate) {
                                item.uiStatus = '待排期';
                            } else if (!item.uiFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.uiEstimateDate) {
                                    item.uiStatus = '已逾期';
                                } else {
                                    item.uiStatus = '进行中';
                                }
                            } else if (item.uiFinishedDate) {
                                if (item.uiFinishedDate > item.uiEstimateDate) {
                                    item.uiStatus = '逾期完成';
                                } else {
                                    item.uiStatus = '正常完成';
                                }
                            }
                        } else {
                            item.uiStatus = '-';
                        }
                        if (item.webRequired) {
                            if (!item.webEstimateDate) {
                                item.webStatus = '待排期';
                            } else if (!item.webFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.webEstimateDate) {
                                    item.webStatus = '已逾期';
                                } else {
                                    item.webStatus = '进行中';
                                }
                            } else if (item.webFinishedDate) {
                                if (item.webFinishedDate > item.webEstimateDate) {
                                    item.webStatus = '逾期完成';
                                } else {
                                    item.webStatus = '正常完成';
                                }
                            }
                        } else {
                            item.webStatus = '-';
                        }
                        if (item.androidRequired) {
                            if (!item.androidEstimateDate) {
                                item.androidStatus = '待排期';
                            } else if (!item.androidFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.androidEstimateDate) {
                                    item.androidStatus = '已逾期';
                                } else {
                                    item.androidStatus = '进行中';
                                }
                            } else if (item.androidFinishedDate) {
                                if (item.androidFinishedDate > item.androidEstimateDate) {
                                    item.androidStatus = '逾期完成';
                                } else {
                                    item.androidStatus = '正常完成';
                                }
                            }
                        } else {
                            item.androidStatus = '-';
                        }
                        if (item.iosRequired) {
                            if (!item.iosEstimateDate) {
                                item.iosStatus = '待排期';
                            } else if (!item.iosFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.iosEstimateDate) {
                                    item.iosStatus = '已逾期';
                                } else {
                                    item.iosStatus = '进行中';
                                }
                            } else if (item.iosFinishedDate) {
                                if (item.iosFinishedDate > item.iosEstimateDate) {
                                    item.iosStatus = '逾期完成';
                                } else {
                                    item.iosStatus = '正常完成';
                                }
                            }
                        } else {
                            item.iosStatus = '-';
                        }
                        if (item.serverRequired) {
                            if (!item.serverEstimateDate) {
                                item.serverStatus = '待排期';
                            } else if (!item.serverFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.serverEstimateDate) {
                                    item.serverStatus = '已逾期';
                                } else {
                                    item.serverStatus = '进行中';
                                }
                            } else if (item.serverFinishedDate) {
                                if (item.serverFinishedDate > item.serverEstimateDate) {
                                    item.serverStatus = '逾期完成';
                                } else {
                                    item.serverStatus = '正常完成';
                                }
                            }
                        } else {
                            item.serverStatus = '-';
                        }
                        if (item.testRequired) {
                            if (!item.testEstimateDate) {
                                item.testStatus = '待排期';
                            } else if (!item.testFinishedDate) {
                                if (moment(new Date()).format('YYYY-MM-DD') > item.testEstimateDate) {
                                    item.testStatus = '已逾期';
                                } else {
                                    item.testStatus = '进行中';
                                }
                            } else if (item.testFinishedDate) {
                                if (item.testFinishedDate > item.testEstimateDate) {
                                    item.testStatus = '逾期完成';
                                } else {
                                    item.testStatus = '正常完成';
                                }
                            }
                        } else {
                            item.testStatus = '-';
                        }
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            getDevRealName(userName) {
                for (let item of this.adminList) {
                    if (item.userName === userName) {
                        return item.realName;
                    }
                }
            },
            jumpPage(id, pageName) {
                if (pageName === 'CreateTaskPage') {
                    this.$router.push({
                        name: 'create-task.html',
                    })
                } else if (pageName === 'EditTaskPage') {
                    this.$router.push({
                        name: 'edit-task.html',
                        query: {
                            taskId: id,
                        }
                    })
                } else if (pageName === 'TaskDetailPage') {
                    this.$router.push({
                        name: 'task-detail.html',
                        query: {
                            taskId: id,
                        }
                    })
                }
            },
            deleteTask(id) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(async () => {
                    const res = await this.$service.deleteTask({id: id});
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                            duration: 2000
                        });
                        this.searchCommon()
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
            showDialog(row, actionType) {
                this.dialogVisible = true;
                this.actionType = actionType;
                this.task = {...row};
            },
            hideDialog() {
                this.dialogVisible = false;
                this.task = {};
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
                this.searchCommon();
            },
        },
        created() {
            this.getAdminList();

        },
        mounted() {
        },
        computed: {},
        components: {
            UpdateTaskStatusDialog
        }
    }
</script>
<style scoped>

</style>
