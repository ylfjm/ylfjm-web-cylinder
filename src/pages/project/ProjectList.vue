<template>
    <div class="container">
        <div class="search_box">
            <a @click="onSearch('')" :class="formSearch.status === '' ? 'link-btn link-btn-active' : 'link-btn'">所有</a>
            <a @click="onSearch('doing')" :class="formSearch.status === 'doing' ? 'link-btn link-btn-active' : 'link-btn'">进行中</a>
            <a @click="onSearch('suspended')" :class="formSearch.status === 'suspended' ? 'link-btn link-btn-active' : 'link-btn'">已挂起</a>
            <a @click="onSearch('closed')" :class="formSearch.status === 'closed' ? 'link-btn link-btn-active' : 'link-btn'">已关闭</a>
            <el-button @click="showDialog(null, 'create')" type="primary" style="float: right;">
                <i class="el-icon-plus"></i>
                添加项目
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
                        width="60"
                        label="ID"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        min-width="350"
                        show-overflow-tooltip
                        label="项目名称"
                ></el-table-column>
                <el-table-column
                        prop="begin"
                        width="100"
                        label="开始日期"
                ></el-table-column>
                <el-table-column
                        prop="end"
                        width="100"
                        label="截止日期"
                ></el-table-column>
                <el-table-column
                        prop="status"
                        width="80"
                        label="项目状态"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 'doing'" style="color: #ff5d5d;">进行中</div>
                        <div v-if="scope.row.status === 'suspended'" style="color: #ff9800;">已挂起</div>
                        <div v-if="scope.row.status === 'closed'" style="color: #AAAAAA;">已关闭</div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="days"
                        width="100"
                        label="预计（天）"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="restDays"
                        width="100"
                        label="剩余（天）"
                ></el-table-column>
                <el-table-column
                        prop="percentage"
                        width="230"
                        label="进度"
                >
                    <template slot-scope="scope">
                        <el-progress :stroke-width="8" :percentage="scope.row.percentage"
                                     :color="scope.row.percentage === 100 ? '#67C23A' : '#409EFF'"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        width="80"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-tooltip content="编辑" placement="bottom-start">
                                <a @click="showDialog(scope.row, 'update')" class="action-a-btn">
                                    <img src="@/assets/images/edit-22.png">
                                </a>
                            </el-tooltip>
                            <el-tooltip content="删除" placement="bottom-start">
                                <a @click="deleteProject(scope.row.id)" class="action-a-btn">
                                    <img src="@/assets/images/delete-22.png">
                                </a>
                            </el-tooltip>
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

        <!--<CreateProjectDialog
                width="50%"
                title="添加项目"
                :visible="createDialogVisible"
                :hideDialog="hideCreateDialog"
                :submit="createProject"
                :loading="createLoading"
        ></CreateProjectDialog>-->

        <ProjectDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="addOrUpdateRole"
                :loading="dialogSubmitLoading"
                :error="error"
                :updateObj="updateObj"
        />
    </div>
</template>
<script>
    import moment from 'moment'
    import commonUtil from '@/common/js/commonUtil'
    import ProjectDialog from './container/project/ProjectDialog'

    export default {
        name: 'ProjectList',
        data() {
            return {
                formSearch: {
                    status: '',
                    pageNum: 1,
                    pageSize: 15
                },
                total: 0,
                pages: 0,
                tableList: [],
                searchLoading: false,

                error: false,
                dialogVisible: false,
                dialogSubmitLoading: false,
                actionType: '',
                updateObj: {},
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
                const res = await this.$service.getProjectList(searchParam);
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum;
                    this.formSearch.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                    this.tableList = res.data.result || [];
                    this.tableList.map(item => {
                        if (item.end) {
                            item.end = moment(item.end).format('YYYY-MM-DD');
                        }
                        if (item.begin) {
                            item.begin = moment(item.begin).format('YYYY-MM-DD');
                        }
                        let tempDate1 = new Date(item.begin);
                        let tempDate2 = new Date();
                        let startDate = tempDate2 < tempDate1 ? tempDate1 : tempDate2;
                        if (tempDate2 < tempDate1) {
                            startDate = tempDate1;
                        }
                        item.restDays = commonUtil.countWorkDays(new Date(moment(moment(startDate).format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')), new Date(moment(item.end).format('YYYY-MM-DD HH:mm:ss')));
                        item.percentage = Math.round((item.days - item.restDays) / item.days * 100);
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            showDialog(row, actionType) {
                this.dialogVisible = true;
                this.error = false;
                this.actionType = actionType;
                if (this.actionType === 'update') {
                    this.updateObj = {...row};
                }
            },
            hideDialog() {
                this.dialogVisible = false;
                this.error = false;
                this.updateObj = {};
            },
            async addOrUpdateRole(data) {
                let formData = {...data};
                let res;
                this.dialogSubmitLoading = true;
                if (this.actionType === 'create') {
                    formData.id = null;
                    res = await this.$service.addProject(formData);
                } else if (this.actionType === 'update') {
                    res = await this.$service.updateProject(formData);
                }
                this.dialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideDialog();
                    this.searchCommon();
                } else {
                    this.error = res.message || true;
                }
            },
            //删除
            deleteProject(id) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(async () => {
                    const res = await this.$service.deleteProject({
                        id: id
                    });
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                        })
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
        components: {
            ProjectDialog,
        }
    }
</script>
<style scoped>

</style>
