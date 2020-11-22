<template>
    <div class="container">
        <div class="search_box">
            <a @click="onSearch('')" :class="formSearch.status === '' ? 'link-btn link-btn-active' : 'link-btn'">所有</a>
            <a @click="onSearch('wait')" :class="formSearch.status === 'wait' ? 'link-btn link-btn-active' : 'link-btn'">未开始</a>
            <a @click="onSearch('doing')" :class="formSearch.status === 'doing' ? 'link-btn link-btn-active' : 'link-btn'">进行中</a>
            <a @click="onSearch('done')" :class="formSearch.status === 'done' ? 'link-btn link-btn-active' : 'link-btn'">已完成</a>
            <a @click="onSearch('pause')" :class="formSearch.status === 'pause' ? 'link-btn link-btn-active' : 'link-btn'">已暂停</a>
            <a @click="onSearch('cancel')" :class="formSearch.status === 'cancel' ? 'link-btn link-btn-active' : 'link-btn'">已取消</a>
            <a @click="onSearch('closed')" :class="formSearch.status === 'closed' ? 'link-btn link-btn-active' : 'link-btn'">已关闭</a>
            <router-link :to="'/create-task.html'">
                <el-button type="primary" icon="el-icon-plus" style="float: right;">
                    创建任务
                </el-button>
            </router-link>
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
                        <el-link :underline="false" @click="jumpPage(scope.row.id, 'TaskDetailPage')">{{scope.row.name}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        min-width="60"
                        show-overflow-tooltip
                        label="状态"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 'wait'" style="color: #00AA55;">未开始</div>
                        <div v-if="scope.row.status === 'doing'" style="color: #ff5d5d;">进行中</div>
                        <div v-if="scope.row.status === 'done'" style="color: #ff9800;">已完成</div>
                        <div v-if="scope.row.status === 'pause'" style="color: #ff9800;">已暂停</div>
                        <div v-if="scope.row.status === 'cancel'" style="color: #ff9800;">已取消</div>
                        <div v-if="scope.row.status === 'closed'" style="color: #AAAAAA;">已关闭</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="deadline"
                        min-width="100"
                        show-overflow-tooltip
                        label="截止日期"
                ></el-table-column>
                <el-table-column
                        prop="pdDesigner"
                        min-width="80"
                        show-overflow-tooltip
                        label="产品设计"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="pdEstimateDate"
                        min-width="100"
                        show-overflow-tooltip
                        label="产品已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.pdOverdue === '是'" style="color: #FF0000;">{{scope.row.pdOverdue}}</div>
                        <div v-else>{{scope.row.pdOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="uiDesigner"
                        min-width="80"
                        show-overflow-tooltip
                        label="UI设计师"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="uiEstimateDate"
                        min-width="100"
                        show-overflow-tooltip
                        label="UI已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.uiOverdue === '是'" style="color: #FF0000;">{{scope.row.uiOverdue}}</div>
                        <div v-else>{{scope.row.uiOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="webDeveloper"
                        min-width="80"
                        show-overflow-tooltip
                        label="web开发"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="webEstimateDate"
                        min-width="100"
                        show-overflow-tooltip
                        label="web已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.webOverdue === '是'" style="color: #FF0000;">{{scope.row.webOverdue}}</div>
                        <div v-else>{{scope.row.webOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="androidDeveloper"
                        min-width="100"
                        show-overflow-tooltip
                        label="android开发"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="androidEstimateDate"
                        min-width="120"
                        show-overflow-tooltip
                        label="android已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.androidOverdue === '是'" style="color: #FF0000;">{{scope.row.androidOverdue}}</div>
                        <div v-else>{{scope.row.androidOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="iosDeveloper"
                        min-width="80"
                        show-overflow-tooltip
                        label="ios开发"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="iosEstimateDate"
                        min-width="100"
                        show-overflow-tooltip
                        label="ios已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.iosOverdue === '是'" style="color: #FF0000;">{{scope.row.iosOverdue}}</div>
                        <div v-else>{{scope.row.iosOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="serverDeveloper"
                        min-width="80"
                        show-overflow-tooltip
                        label="后台开发"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="serverEstimateDate"
                        min-width="100"
                        show-overflow-tooltip
                        label="后台已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.serverOverdue === '是'" style="color: #FF0000;">{{scope.row.serverOverdue}}</div>
                        <div v-else>{{scope.row.serverOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tester"
                        min-width="80"
                        show-overflow-tooltip
                        label="测试人员"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="testEstimateDate"
                        min-width="100"
                        show-overflow-tooltip
                        label="测试已逾期"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.testOverdue === '是'" style="color: #FF0000;">{{scope.row.testOverdue}}</div>
                        <div v-else>{{scope.row.testOverdue}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        width="150"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-button type="primary" size="mini" @click="jumpPage(scope.row.id, 'EditTaskPage')">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteTask(scope.row.id)">删除</el-button>
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
                        layout="total, sizes, prev, pager, next"
                        :page-size="formSearch.pageSize"
                        :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'

    export default {
        name: 'TaskList',
        data() {
            return {
                formSearch: {
                    status: '',
                    pageNum: 1,
                    pageSize: 20
                },
                total: 0,
                pages: 0,
                tableList: [],
                searchLoading: false,
            }
        },
        methods: {
            onSearch(status) {
                this.formSearch.pageNum = 1;
                this.formSearch.status = status;
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
                    status: this.formSearch.status,
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
                        if (item.deadline) {
                            item.deadline = moment(item.deadline).format('YYYY-MM-DD');
                        }
                        if (item.pdEstimateDate && item.pdFinishedDate) {
                            item.pdOverdue = new Date(item.pdFinishedDate).getTime() > new Date(item.pdEstimateDate).getTime() ? '是' : '否';
                        }
                        if (item.uiEstimateDate && item.uiFinishedDate) {
                            item.uiOverdue = new Date(item.uiFinishedDate).getTime() > new Date(item.uiEstimateDate).getTime() ? '是' : '否';
                        }
                        if (item.webEstimateDate && item.webFinishedDate) {
                            item.webOverdue = new Date(item.webFinishedDate).getTime() > new Date(item.webEstimateDate).getTime() ? '是' : '否';
                        }
                        if (item.androidEstimateDate && item.androidFinishedDate) {
                            item.androidOverdue = new Date(item.androidFinishedDate).getTime() > new Date(item.androidEstimateDate).getTime() ? '是' : '否';
                        }
                        if (item.iosEstimateDate && item.iosFinishedDate) {
                            item.iosOverdue = new Date(item.iosFinishedDate).getTime() > new Date(item.iosEstimateDate).getTime() ? '是' : '否';
                        }
                        if (item.serverEstimateDate && item.serverFinishedDate) {
                            item.serverOverdue = new Date(item.serverFinishedDate).getTime() > new Date(item.serverEstimateDate).getTime() ? '是' : '否';
                        }
                        if (item.testEstimateDate && item.testFinishedDate) {
                            item.testOverdue = new Date(item.testFinishedDate).getTime() > new Date(item.testEstimateDate).getTime() ? '是' : '否';
                        }
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            jumpPage(id, pageName) {
                if (pageName === 'EditTaskPage') {
                    this.$router.push({
                        name: 'edit-task.html',
                        params: {
                            id: id
                        }
                    })
                } else if (pageName === 'TaskDetailPage') {
                    this.$router.push({
                        name: 'task-detail.html',
                        params: {
                            id: id
                        }
                    })
                }
            },
            //删除
            deleteTask(id) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$service.deleteProject({
                        id: id
                    });
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                        });
                        this.searchCommon()
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: res.message ? res.message : '删除失败',
                        })
                    }
                }).catch(() => {
                });
            },
        },
        created() {
            this.searchCommon()
        },
        mounted() {
        },
        computed: {},
        components: {}
    }
</script>
<style scoped>

</style>
