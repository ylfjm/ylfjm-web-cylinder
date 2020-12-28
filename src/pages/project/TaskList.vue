<template>
    <div class="container">
        <div style="position: relative;">
            <div class="projectBar">
                <el-dropdown trigger="click" placement="bottom-start" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{projectName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in projectList">
                            <el-dropdown-item :command="item.id">{{item.name}}</el-dropdown-item>
                        </template>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="search_box">
            <a @click="onSearch('all')" :class="formSearch.searchType === 'all' ? 'link-btn link-btn-active' : 'link-btn'">所有</a>
            <a @click="onSearch('notClosed')" :class="formSearch.searchType === 'notClosed' ? 'link-btn link-btn-active' : 'link-btn'">未关闭</a>
            <a @click="onSearch('assignMe')" :class="formSearch.searchType === 'assignMe' ? 'link-btn link-btn-active' : 'link-btn'">我参与的</a>
            <a @click="onSearch('doing')" :class="formSearch.searchType === 'doing' ? 'link-btn link-btn-active' : 'link-btn'">进行中</a>
            <a @click="onSearch('done')" :class="formSearch.searchType === 'done' ? 'link-btn link-btn-active' : 'link-btn'">已完成</a>
            <a @click="onSearch('cancel')" :class="formSearch.searchType === 'cancel' ? 'link-btn link-btn-active' : 'link-btn'">已取消</a>
            <a @click="onSearch('closed')" :class="formSearch.searchType === 'closed' ? 'link-btn link-btn-active' : 'link-btn'">已关闭</a>
            <div class="" style=" float: right; display: inline-block; text-align: right; position: relative;">
                <el-button type="primary" @click="jumpPage('', 'CreateTaskPage')" style="margin-right: 10px;">
                    <i class="el-icon-plus"></i>
                    创建任务
                </el-button>
                <el-popover placement="bottom-end" width="330" trigger="click"
                            style="position:absolute;top:54px;left:85px;z-index:20;cursor:pointer;">
                    <el-col :span="6">
                        <el-checkbox v-model="createByColumnVisible" @change="showOrHide">创建</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="createDateColumnVisible" @change="showOrHide">创建日期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="deadlineColumnVisible" @change="showOrHide">截止日期</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="pdDesignerColumnVisible" @change="showOrHide">产品</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="pdEstimateDateColumnVisible" @change="showOrHide">产品排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="pdStatusColumnVisible" @change="showOrHide">产品状态</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="uiDesignerColumnVisible" @change="showOrHide">UI</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="uiEstimateDateColumnVisible" @change="showOrHide">UI排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="uiStatusColumnVisible" @change="showOrHide">UI状态</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="webDeveloperColumnVisible" @change="showOrHide">前端</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="webEstimateDateColumnVisible" @change="showOrHide">前端排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="webStatusColumnVisible" @change="showOrHide">前端状态</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="androidDeveloperColumnVisible" @change="showOrHide">安卓</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="androidEstimateDateColumnVisible" @change="showOrHide">安卓排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="androidStatusColumnVisible" @change="showOrHide">安卓状态</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="iosDeveloperColumnVisible" @change="showOrHide">苹果</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="iosEstimateDateColumnVisible" @change="showOrHide">苹果排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="iosStatusColumnVisible" @change="showOrHide">苹果状态</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="serverDeveloperColumnVisible" @change="showOrHide">后端</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="serverEstimateDateColumnVisible" @change="showOrHide">后端排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="serverStatusColumnVisible" @change="showOrHide">后端状态</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="testerColumnVisible" @change="showOrHide">测试</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="testEstimateDateColumnVisible" @change="showOrHide">测试排期</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox v-model="testStatusColumnVisible" @change="showOrHide">测试状态</el-checkbox>
                    </el-col>
                    <img slot="reference" src="@/assets/images/setting-18.png">
                </el-popover>
            </div>
        </div>
        <div class="table-content">
            <el-table
                    :data="tableList"
                    tooltip-effect="dark"
                    v-loading="searchLoading"
                    :header-cell-style="{fontSize: '14px', color: '#333333'}"
                    stripe
                    @sort-change="sortChange"
            >
                <el-table-column
                        prop="id"
                        width="60"
                        label="ID"
                        sortable="custom"
                        :sort-orders="sortOrders"
                ></el-table-column>
                <el-table-column
                        prop="pri"
                        width="90"
                        label="优先级"
                        sortable="custom"
                        :sort-orders="sortOrders"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        min-width="450"
                        label="任务名称"
                >
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.name" placement="right-start">
                            <el-link :underline="false" @click="jumpPage(scope.row.id, 'TaskDetailPage')">{{scope.row.name}}</el-link>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        width="75"
                        label="状态"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 'doing'" style="color: #ff5d5d;">进行中</div>
                        <div v-if="scope.row.status === 'done'" style="color: #00AA55;">已完成</div>
                        <div v-if="scope.row.status === 'cancel'" style="color: #AAAAAA;">已取消</div>
                        <div v-if="scope.row.status === 'closed'" style="color: #AAAAAA;">已关闭</div>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="createByColumnVisible"
                        prop="createBy"
                        width="80"
                        label="创建"
                        sortable="custom"
                        :sort-orders="sortOrders"
                ></el-table-column>
                <el-table-column
                        v-if="createDateColumnVisible"
                        prop="createDate"
                        width="100"
                        label="创建日期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                ></el-table-column>
                <el-table-column
                        v-if="deadlineColumnVisible"
                        prop="deadline"
                        width="100"
                        label="截止日期"
                        sortable="custom"
                        :sort-orders="sortOrders"
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
                        v-if="pdDesignerColumnVisible"
                        prop="pdDesigner"
                        width="80"
                        label="产品"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.pdRequired">
                            <div v-if="scope.row.pdDesigner === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.pdDesigner)}}
                            </div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.pdDesigner)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="pdEstimateDateColumnVisible"
                        prop="pdEstimateDate"
                        width="100"
                        label="产品排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.pdRequired ? scope.row.pdEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="pdStatusColumnVisible"
                        align="center"
                        prop="pdStatus"
                        width="80"
                        label="产品状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.pdStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="uiDesignerColumnVisible"
                        prop="uiDesigner"
                        width="80"
                        label="UI"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.uiRequired">
                            <div v-if="scope.row.uiDesigner === currentUserName" style="color: #ff5d5d;">{{getDevRealName(scope.row.uiDesigner)}}
                            </div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.uiDesigner)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="uiEstimateDateColumnVisible"
                        prop="uiEstimateDate"
                        width="100"
                        label="UI排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.uiRequired ? scope.row.uiEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="uiStatusColumnVisible"
                        align="center"
                        prop="uiStatus"
                        width="80"
                        label="UI状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.uiStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="webDeveloperColumnVisible"
                        prop="webDeveloper"
                        width="80"
                        label="前端"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.webRequired">
                            <div v-if="scope.row.webDeveloper === currentUserName" style="color: #ff5d5d;">
                                {{getDevRealName(scope.row.webDeveloper)}}
                            </div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.webDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="webEstimateDateColumnVisible"
                        prop="webEstimateDate"
                        width="100"
                        label="前端排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.webRequired ? scope.row.webEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="webStatusColumnVisible"
                        align="center"
                        prop="webStatus"
                        width="80"
                        label="前端状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.webStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="androidDeveloperColumnVisible"
                        prop="androidDeveloper"
                        width="80"
                        label="安卓"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.androidRequired">
                            <div v-if="scope.row.androidDeveloper === currentUserName" style="color: #ff5d5d;">
                                {{getDevRealName(scope.row.androidDeveloper)}}
                            </div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.androidDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="androidEstimateDateColumnVisible"
                        prop="androidEstimateDate"
                        width="100"
                        label="安卓排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.androidRequired ? scope.row.androidEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="androidStatusColumnVisible"
                        align="center"
                        prop="androidStatus"
                        width="80"
                        label="安卓状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.androidStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="iosDeveloperColumnVisible"
                        prop="iosDeveloper"
                        width="80"
                        label="苹果"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.iosRequired">
                            <div v-if="scope.row.iosDeveloper === currentUserName" style="color: #ff5d5d;">
                                {{getDevRealName(scope.row.iosDeveloper)}}
                            </div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.iosDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="iosEstimateDateColumnVisible"
                        prop="iosEstimateDate"
                        width="100"
                        label="苹果排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.iosRequired ? scope.row.iosEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="iosStatusColumnVisible"
                        align="center"
                        prop="iosStatus"
                        width="80"
                        label="苹果状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.iosStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="serverDeveloperColumnVisible"
                        prop="serverDeveloper"
                        width="80"
                        label="后端"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.serverRequired">
                            <div v-if="scope.row.serverDeveloper === currentUserName" style="color: #ff5d5d;">
                                {{getDevRealName(scope.row.serverDeveloper)}}
                            </div>
                            <div v-else style="color: #0066CC;">{{getDevRealName(scope.row.serverDeveloper)}}</div>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="serverEstimateDateColumnVisible"
                        prop="serverEstimateDate"
                        width="100"
                        label="后端排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.serverRequired ? scope.row.serverEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="serverStatusColumnVisible"
                        align="center"
                        prop="serverStatus"
                        width="80"
                        label="后端状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.serverStatus}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="testerColumnVisible"
                        prop="tester"
                        width="80"
                        label="测试"
                        sortable="custom"
                        :sort-orders="sortOrders"
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
                        v-if="testEstimateDateColumnVisible"
                        prop="testEstimateDate"
                        width="100"
                        label="测试排期"
                        sortable="custom"
                        :sort-orders="sortOrders"
                >
                    <template slot-scope="scope">
                        {{scope.row.testRequired ? scope.row.testEstimateDate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="testStatusColumnVisible"
                        align="center"
                        prop="testStatus"
                        width="80"
                        label="测试状态"
                >
                    <template slot-scope="scope">
                        {{scope.row.testStatus}}
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
                            <el-tooltip content="指派" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'assign')" class="action-a-btn">
                                    <img src="@/assets/images/assign-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip content="排期" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'estimate')" class="action-a-btn">
                                    <img src="@/assets/images/estimate-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip content="关闭" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'close')" class="action-a-btn">
                                    <img src="@/assets/images/close-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip content="完成" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'complete')" class="action-a-btn">
                                    <img src="@/assets/images/complete-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip content="编辑" placement="bottom-start">
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
                        background
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
                    pageSize: 15,
                    idSortBy: null,
                    priSortBy: null,
                    statusSortBy: null,
                    createBySortBy: null,
                    createDateSortBy: 'descending',
                    deadlineSortBy: null,
                    pdDesignerSortBy: null,
                    pdEstimateDateSortBy: null,
                    uiDesignerSortBy: null,
                    uiEstimateDateSortBy: null,
                    webDeveloperSortBy: null,
                    webEstimateDateSortBy: null,
                    androidDeveloperSortBy: null,
                    androidEstimateDateSortBy: null,
                    iosDeveloperSortBy: null,
                    iosEstimateDateSortBy: null,
                    serverDeveloperSortBy: null,
                    serverEstimateDateSortBy: null,
                    testerSortBy: null,
                    testEstimateDateSortBy: null,
                },
                sortOrders: ['ascending', 'descending'],
                createByColumnVisible: JSON.parse(localStorage.getItem('createByColumnVisible')),
                createDateColumnVisible: JSON.parse(localStorage.getItem('createDateColumnVisible')),
                deadlineColumnVisible: JSON.parse(localStorage.getItem('deadlineColumnVisible')),
                pdDesignerColumnVisible: JSON.parse(localStorage.getItem('pdDesignerColumnVisible')),
                pdEstimateDateColumnVisible: JSON.parse(localStorage.getItem('pdEstimateDateColumnVisible')),
                pdStatusColumnVisible: JSON.parse(localStorage.getItem('pdStatusColumnVisible')),
                uiDesignerColumnVisible: JSON.parse(localStorage.getItem('uiDesignerColumnVisible')),
                uiEstimateDateColumnVisible: JSON.parse(localStorage.getItem('uiEstimateDateColumnVisible')),
                uiStatusColumnVisible: JSON.parse(localStorage.getItem('uiStatusColumnVisible')),
                webDeveloperColumnVisible: JSON.parse(localStorage.getItem('webDeveloperColumnVisible')),
                webEstimateDateColumnVisible: JSON.parse(localStorage.getItem('webEstimateDateColumnVisible')),
                webStatusColumnVisible: JSON.parse(localStorage.getItem('webStatusColumnVisible')),
                androidDeveloperColumnVisible: JSON.parse(localStorage.getItem('androidDeveloperColumnVisible')),
                androidEstimateDateColumnVisible: JSON.parse(localStorage.getItem('androidEstimateDateColumnVisible')),
                androidStatusColumnVisible: JSON.parse(localStorage.getItem('androidStatusColumnVisible')),
                iosDeveloperColumnVisible: JSON.parse(localStorage.getItem('iosDeveloperColumnVisible')),
                iosEstimateDateColumnVisible: JSON.parse(localStorage.getItem('iosEstimateDateColumnVisible')),
                iosStatusColumnVisible: JSON.parse(localStorage.getItem('iosStatusColumnVisible')),
                serverDeveloperColumnVisible: JSON.parse(localStorage.getItem('serverDeveloperColumnVisible')),
                serverEstimateDateColumnVisible: JSON.parse(localStorage.getItem('serverEstimateDateColumnVisible')),
                serverStatusColumnVisible: JSON.parse(localStorage.getItem('serverStatusColumnVisible')),
                testerColumnVisible: JSON.parse(localStorage.getItem('testerColumnVisible')),
                testEstimateDateColumnVisible: JSON.parse(localStorage.getItem('testEstimateDateColumnVisible')),
                testStatusColumnVisible: JSON.parse(localStorage.getItem('testStatusColumnVisible')),

                total: 0,
                pages: 0,
                tableList: [],
                adminList: [],
                projectList: [],
                projectId: localStorage.getItem('remember_task_project_id') ? Number(localStorage.getItem('remember_task_project_id')) : null,
                projectName: localStorage.getItem('remember_task_project_name'),
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
            handleCommand(command) {
                for (let item of this.projectList) {
                    if (item.id === command) {
                        this.projectId = item.id;
                        this.projectName = item.name;
                        localStorage.setItem('remember_task_project_id', this.projectId);
                        localStorage.setItem('remember_task_project_name', this.projectName);
                        this.searchCommon();
                        return;
                    }
                }
            },
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
                    projectId: this.projectId,
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize,
                    idSortBy: this.formSearch.idSortBy,
                    priSortBy: this.formSearch.priSortBy,
                    statusSortBy: this.formSearch.statusSortBy,
                    createBySortBy: this.formSearch.createBySortBy,
                    createDateSortBy: this.formSearch.createDateSortBy,
                    deadlineSortBy: this.formSearch.deadlineSortBy,
                    pdDesignerSortBy: this.formSearch.pdDesignerSortBy,
                    pdEstimateDateSortBy: this.formSearch.pdEstimateDateSortBy,
                    uiDesignerSortBy: this.formSearch.uiDesignerSortBy,
                    uiEstimateDateSortBy: this.formSearch.uiEstimateDateSortBy,
                    webDeveloperSortBy: this.formSearch.webDeveloperSortBy,
                    webEstimateDateSortBy: this.formSearch.webEstimateDateSortBy,
                    androidDeveloperSortBy: this.formSearch.androidDeveloperSortBy,
                    androidEstimateDateSortBy: this.formSearch.androidEstimateDateSortBy,
                    iosDeveloperSortBy: this.formSearch.iosDeveloperSortBy,
                    iosEstimateDateSortBy: this.formSearch.iosEstimateDateSortBy,
                    serverDeveloperSortBy: this.formSearch.serverDeveloperSortBy,
                    serverEstimateDateSortBy: this.formSearch.serverEstimateDateSortBy,
                    testerSortBy: this.formSearch.testerSortBy,
                    testEstimateDateSortBy: this.formSearch.testEstimateDateSortBy,
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
                        if (item.createBy) {
                            item.createBy = this.getDevRealName(item.createBy);
                        }
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
            sortChange(data) {
                this.formSearch.idSortBy = null;
                this.formSearch.priSortBy = null;
                this.formSearch.statusSortBy = null;
                this.formSearch.createBySortBy = null;
                this.formSearch.createDateSortBy = null;
                this.formSearch.deadlineSortBy = null;
                this.formSearch.pdDesignerSortBy = null;
                this.formSearch.pdEstimateDateSortBy = null;
                this.formSearch.uiDesignerSortBy = null;
                this.formSearch.uiEstimateDateSortBy = null;
                this.formSearch.webDeveloperSortBy = null;
                this.formSearch.webEstimateDateSortBy = null;
                this.formSearch.androidDeveloperSortBy = null;
                this.formSearch.androidEstimateDateSortBy = null;
                this.formSearch.iosDeveloperSortBy = null;
                this.formSearch.iosEstimateDateSortBy = null;
                this.formSearch.serverDeveloperSortBy = null;
                this.formSearch.serverEstimateDateSortBy = null;
                this.formSearch.testerSortBy = null;
                this.formSearch.testEstimateDateSortBy = null;
                if (data.order === null) {
                    this.formSearch.createDateSortBy = 'descending';
                } else {
                    this.formSearch[data.prop + 'SortBy'] = data.order;
                }
                this.searchCommon();
            },
            showOrHide() {
                localStorage.setItem('createByColumnVisible', this.createByColumnVisible);
                localStorage.setItem('createDateColumnVisible', this.createDateColumnVisible);
                localStorage.setItem('deadlineColumnVisible', this.deadlineColumnVisible);
                localStorage.setItem('pdDesignerColumnVisible', this.pdDesignerColumnVisible);
                localStorage.setItem('pdEstimateDateColumnVisible', this.pdEstimateDateColumnVisible);
                localStorage.setItem('pdStatusColumnVisible', this.pdStatusColumnVisible);
                localStorage.setItem('uiDesignerColumnVisible', this.uiDesignerColumnVisible);
                localStorage.setItem('uiEstimateDateColumnVisible', this.uiEstimateDateColumnVisible);
                localStorage.setItem('uiStatusColumnVisible', this.uiStatusColumnVisible);
                localStorage.setItem('webDeveloperColumnVisible', this.webDeveloperColumnVisible);
                localStorage.setItem('webEstimateDateColumnVisible', this.webEstimateDateColumnVisible);
                localStorage.setItem('webStatusColumnVisible', this.webStatusColumnVisible);
                localStorage.setItem('androidDeveloperColumnVisible', this.androidDeveloperColumnVisible);
                localStorage.setItem('androidEstimateDateColumnVisible', this.androidEstimateDateColumnVisible);
                localStorage.setItem('androidStatusColumnVisible', this.androidStatusColumnVisible);
                localStorage.setItem('iosDeveloperColumnVisible', this.iosDeveloperColumnVisible);
                localStorage.setItem('iosEstimateDateColumnVisible', this.iosEstimateDateColumnVisible);
                localStorage.setItem('iosStatusColumnVisible', this.iosStatusColumnVisible);
                localStorage.setItem('serverDeveloperColumnVisible', this.serverDeveloperColumnVisible);
                localStorage.setItem('serverEstimateDateColumnVisible', this.serverEstimateDateColumnVisible);
                localStorage.setItem('serverStatusColumnVisible', this.serverStatusColumnVisible);
                localStorage.setItem('testerColumnVisible', this.testerColumnVisible);
                localStorage.setItem('testEstimateDateColumnVisible', this.testEstimateDateColumnVisible);
                localStorage.setItem('testStatusColumnVisible', this.testStatusColumnVisible);
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
            },
            async getProjectList() {
                const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
                if (res.code === 20000) {
                    this.projectList = res.data.result || [];
                }
            },
        },
        async created() {
            const res = await this.$service.getProjectList({status: 'doing', pageNum: 1, pageSize: 10000});
            if (res.code === 20000) {
                this.projectList = res.data.result || [];
                let rememberProjectId = localStorage.getItem('remember_task_project_id');
                let rememberProjectName = localStorage.getItem('remember_task_project_name');
                console.log('111---' + rememberProjectId+'---222---'+rememberProjectName);
                if (rememberProjectId == null || rememberProjectId === '') {
                    if (this.projectList && this.projectList.length > 0) {
                        this.projectId = this.projectList[0].id;
                        this.projectName = this.projectList[0].name;
                        localStorage.setItem('remember_task_project_id', this.projectId);
                        localStorage.setItem('remember_task_project_name', this.projectName);
                    }
                }
            }
            this.getAdminList();
            this.searchCommon();
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
    /deep/ .el-dropdown {
        cursor: pointer;
        font-size: 14px;
        padding: 5px 10px;
        vertical-align: middle;
        height: 30px;
    }

    .projectBar {
        position: absolute;
        display: inline-block;
        width: auto;
        /*height: 34px;*/
        z-index: 10;
        top: -62px;
        margin-right: 10px;
        padding: 1px;
        border: 1px solid #cbd0db;
        border-right: 0;
    }

    .projectBar:before {
        position: absolute;
        top: -1px;
        right: -8px;
        display: block;
        width: 0;
        height: 0;
        content: ' ';
        border-color: transparent transparent transparent #cbd0db;
        border-style: solid;
        border-width: 17px 0 17px 8px;
    }

    .projectBar:after {
        position: absolute;
        top: -1px;
        right: -7px;
        display: block;
        width: 0;
        height: 0;
        content: ' ';
        border-color: transparent transparent transparent #fff;
        border-style: solid;
        border-width: 17px 0 17px 8px;
    }
</style>
