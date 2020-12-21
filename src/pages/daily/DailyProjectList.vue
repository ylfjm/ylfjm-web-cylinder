<template>
    <div class="container">
        <div class="search_box">
            <div style="float: right;">
                <el-button @click="showDialog(null, 'create')" type="primary">
                    <i class="el-icon-plus"></i>
                    添加日报项目
                </el-button>
            </div>
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
                        width="100"
                        label="ID"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                ></el-table-column>
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
                                <a @click="deleteDailyProject(scope.row.id)" class="action-a-btn">
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
        <DailyProjectDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="addOrUpdate"
                :loading="dialogSubmitLoading"
                :error="error"
                :updateObj="updateObj"
        />
    </div>
</template>

<script>
    import DailyProjectDialog from './container/daily/DailyProjectDialog'

    export default {
        name: "DailyList",
        data() {
            return {
                formSearch: {
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
                this.searchLoading = true;
                const res = await this.$service.getDailyProjectList(this.formSearch);
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum;
                    this.formSearch.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                    this.tableList = res.data.result || [];
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
            async addOrUpdate(data) {
                let formData = {...data};
                let res;
                this.dialogSubmitLoading = true;
                if (this.actionType === 'create') {
                    res = await this.$service.addDailyProject(formData);
                } else if (this.actionType === 'update') {
                    res = await this.$service.updateDailyProject(formData);
                }
                this.dialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideDialog();
                    this.searchCommon();
                } else {
                    this.error = res.message || true;
                }
            },
            deleteDailyProject(id) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(async () => {
                    const res = await this.$service.deleteDailyProject({
                        id: id
                    });
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                            duration: 2000
                        });
                        this.searchCommon();
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
        },
        created() {
            this.searchCommon();
        },
        components: {
            DailyProjectDialog,
        }
    }
</script>

<style scoped>
</style>
