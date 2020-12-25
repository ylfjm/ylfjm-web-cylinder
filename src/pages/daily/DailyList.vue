<template>
    <div class="container">
        <div class="search_box">
            <a @click="onSearch('')" :class="formSearch.searchType === '' ? 'link-btn link-btn-active' : 'link-btn'">所有</a>
            <a @click="onSearch('me')" :class="formSearch.searchType === 'me' ? 'link-btn link-btn-active' : 'link-btn'">我的</a>
            <div style="float: right;">
                <el-button @click="showDialog" type="primary">
                    <i class="el-icon-plus"></i>
                    填写日报
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
                        width="60"
                        label="ID"
                ></el-table-column>
                <el-table-column
                        prop="projectName"
                        width="500"
                        show-overflow-tooltip
                        label="项目名称"
                ></el-table-column>
                <el-table-column
                        prop="content"
                        label="日报内容"
                ></el-table-column>
                <el-table-column
                        prop="createBy"
                        width="150"
                        label="由谁创建"
                ></el-table-column>
                <el-table-column
                        prop="createDate"
                        width="150"
                        label="创建日期"
                ></el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        width="80"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-tooltip content="删除" placement="bottom-start">
                                <a @click="deleteDaily(scope.row.id)" class="action-a-btn">
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
        <DailyDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="addDaily"
                :loading="dialogSubmitLoading"
                :error="error"
        />
    </div>
</template>

<script>
    import DailyDialog from './container/daily/DailyDialog'

    export default {
        name: "DailyList",
        data() {
            return {
                formSearch: {
                    searchType: 'me',
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
            }
        },
        methods: {
            onSearch(searchType) {
                this.formSearch.pageNum = 1;
                this.formSearch.searchType = searchType;
                this.searchCommon()
            },
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
                const res = await this.$service.getDailyList(this.formSearch);
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
            showDialog() {
                this.dialogVisible = true;
                this.error = false;
            },
            hideDialog() {
                this.dialogVisible = false;
                this.error = false;
            },
            async addDaily(data) {
                let submitData = {
                    dailyList: data,
                    currentPostCode: localStorage.getItem('currentPostCode'),
                };
                this.dialogSubmitLoading = true;
                const res = await this.$service.addDaily(submitData);
                this.dialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideDialog();
                    this.searchCommon();
                } else {
                    this.error = res.message || true;
                }
            },
            //删除
            deleteDaily(id) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(async () => {
                    const res = await this.$service.deleteDaily({
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
            this.searchCommon();
        },
        components: {
            DailyDialog,
        }
    }
</script>

<style scoped>
</style>
