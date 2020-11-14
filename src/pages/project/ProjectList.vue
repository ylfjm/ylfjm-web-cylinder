<template>
    <div class="container">
        <div class="search_box">
            <a @click="onSearch('')" :class="formSearch.status === '' ? 'link-btn link-btn-active' : 'link-btn'">所有</a>
            <a @click="onSearch('wait')" :class="formSearch.status === 'wait' ? 'link-btn link-btn-active' : 'link-btn'">未开始</a>
            <a @click="onSearch('doing')" :class="formSearch.status === 'doing' ? 'link-btn link-btn-active' : 'link-btn'">进行中</a>
            <a @click="onSearch('suspended')" :class="formSearch.status === 'suspended' ? 'link-btn link-btn-active' : 'link-btn'">已挂起</a>
            <a @click="onSearch('closed')" :class="formSearch.status === 'closed' ? 'link-btn link-btn-active' : 'link-btn'">已关闭</a>
            <router-link :to="'/create-project.html'">
                <el-button @click="" type="primary" icon="el-icon-plus" style="float: right;">
                    添加项目
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
                <!--<el-table-column
                        type="index"
                        :index="index => index + 1 + (formSearch.pageNum - 1) * formSearch.pageSize"
                        align="center"
                        fixed="left"
                        min-width="70"
                        label="序号"
                ></el-table-column>-->
                <el-table-column
                        prop="id"
                        min-width="50"
                        show-overflow-tooltip
                        label="ID"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        min-width="450"
                        show-overflow-tooltip
                        label="项目名称"
                ></el-table-column>
                <el-table-column
                        prop="code"
                        min-width="130"
                        show-overflow-tooltip
                        label="项目代号"
                ></el-table-column>
                <el-table-column
                        prop="begin"
                        min-width="100"
                        show-overflow-tooltip
                        label="开始日期"
                ></el-table-column>
                <el-table-column
                        prop="end"
                        min-width="100"
                        show-overflow-tooltip
                        label="截止日期"
                ></el-table-column>
                <el-table-column
                        prop="status"
                        min-width="80"
                        show-overflow-tooltip
                        label="项目状态"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 'wait'" style="color: #00AA55;">未开始</div>
                        <div v-if="scope.row.status === 'doing'" style="color: #ff5d5d;">进行中</div>
                        <div v-if="scope.row.status === 'suspended'" style="color: #ff9800;">已挂起</div>
                        <div v-if="scope.row.status === 'closed'" style="color: #AAAAAA;">已关闭</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="aaa"
                        min-width="80"
                        show-overflow-tooltip
                        label="预计"
                ></el-table-column>
                <el-table-column
                        prop="bbb"
                        min-width="80"
                        show-overflow-tooltip
                        label="消耗"
                ></el-table-column>
                <el-table-column
                        prop="ccc"
                        min-width="80"
                        show-overflow-tooltip
                        label="剩余"
                ></el-table-column>
                <el-table-column
                        prop="ddd"
                        min-width="180"
                        show-overflow-tooltip
                        label="进度"
                ></el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        width="150"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-button type="primary" size="mini" @click="">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteProject(scope.row.id)">删除</el-button>
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
        name: 'ProjectList',
        data() {
            return {
                formSearch: {
                    status: '',
                    pageNum: 1,
                    pageSize: 10
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
                const res = await this.$service.getProcessingProjectList(searchParam);
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
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            //删除
            deleteProject(id) {
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
            }
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
