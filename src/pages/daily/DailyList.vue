<template>
    <div class="container">
        <div class="dp-table">
            <div class="dp-table-cell" style="width: 40%; padding-right: 10px;">
                <div class="search_box">
                    <div style="float: right;">
                        <el-button @click="showLeftDialog(null, 'create')" type="primary">
                            <i class="el-icon-plus"></i>
                            添加项目
                        </el-button>
                    </div>
                </div>
                <div class="table-content">
                    <el-table
                            :data="leftTableList"
                            tooltip-effect="dark"
                            v-loading="leftSearchLoading"
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
                                    <el-tooltip effect="dark" content="编辑" placement="bottom-start" :enterable="false" open-delay="600">
                                        <a @click="showLeftDialog(scope.row, 'update')" class="action-a-btn">
                                            <img src="@/assets/images/edit-22.png">
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" content="删除" placement="bottom-start" :enterable="false" open-delay="600">
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
                                @current-change="leftHandleCurrentChange"
                                @size-change="leftHandleSizeChange"
                                class="pagination_content"
                                :current-page="leftForm.pageNum"
                                :page-size="leftForm.pageSize"
                                :total="leftTotal"
                        ></el-pagination>
                    </div>
                </div>
            </div>
            <div class="dp-table-cell" style="padding-left: 10px;">
                <div class="search_box">
                    <div style="float: right;">
                        <el-button @click="showDialog" type="primary">
                            <i class="el-icon-plus"></i>
                            填写日报
                        </el-button>
                    </div>
                </div>
                <div class="table-content">
                    <div class="panel">
                        <div class="panel-body">
                            <el-timeline>
                                <template v-for="item in tableList">
                                    <el-timeline-item :timestamp="item.date" placement="top" size="large" type="primary">
                                        <el-card>
                                            <div v-for="(p, i) in item.projectList">
                                                <div class="daily-project-name">{{getNumber1(i) + p.name}}</div>
                                                <div class="daily-project-body">
                                                    <div v-for="(c, j) in p.contentList">
                                                        <div class="daily-content">{{getNumber2(j) + c.content + getPostName(c.postCode) + '；'}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-timeline-item>
                                </template>
                            </el-timeline>
                        </div>
                    </div>
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
            </div>
        </div>
        <DailyProjectDialog
                :visible="leftDialogVisible"
                :hideDialog="hideLeftDialog"
                :submit="leftAddOrUpdate"
                :loading="leftDialogSubmitLoading"
                :error="leftError"
                :updateObj="leftUpdateObj"
        />
        <DailyDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="addDaily"
                :loading="dialogSubmitLoading"
                :error="error"
                :projectList="leftTableList"
        />
    </div>
</template>

<script>
    import DailyProjectDialog from './container/daily/DailyProjectDialog'
    import DailyDialog from './container/daily/DailyDialog'

    export default {
        name: "DailyList",
        data() {
            return {
                leftForm: {
                    pageNum: 1,
                    pageSize: 15
                },
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

                leftTotal: 0,
                leftPages: 0,
                leftTableList: [],
                leftSearchLoading: false,
                leftError: false,
                leftDialogVisible: false,
                leftDialogSubmitLoading: false,
                actionType: '',
                leftUpdateObj: {},
            }
        },
        methods: {
            leftHandleCurrentChange(pageNum) {
                this.leftForm.pageNum = pageNum;
                this.leftSearchCommon()
            },
            leftHandleSizeChange(pageSize) {
                this.leftForm.pageNum = 1;
                this.leftForm.pageSize = pageSize;
                this.leftSearchCommon()
            },
            async leftSearchCommon() {
                this.leftSearchLoading = true;
                const res = await this.$service.getDailyProjectList(this.leftForm);
                this.leftSearchLoading = false;
                if (res.code === 20000) {
                    this.leftForm.pageNum = res.data.pageNum;
                    this.leftForm.pageSize = res.data.pageSize;
                    this.leftTotal = res.data.total;
                    this.leftPages = res.data.pages;
                    this.leftTableList = res.data.result || [];
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            showLeftDialog(row, actionType) {
                this.leftDialogVisible = true;
                this.leftError = false;
                this.actionType = actionType;
                if (this.actionType === 'update') {
                    this.leftUpdateObj = {...row};
                }
            },
            hideLeftDialog() {
                this.leftDialogVisible = false;
                this.leftError = false;
                this.leftUpdateObj = {};
            },
            async leftAddOrUpdate(data) {
                let formData = {...data};
                let res;
                this.leftDialogSubmitLoading = true;
                if (this.actionType === 'create') {
                    res = await this.$service.addDailyProject(formData);
                } else if (this.actionType === 'update') {
                    res = await this.$service.updateDailyProject(formData);
                }
                this.leftDialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideLeftDialog();
                    this.leftSearchCommon();
                    this.searchCommon();
                } else {
                    this.leftError = res.message || true;
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
                        this.leftSearchCommon();
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
            getNumber1(i) {
                switch (i) {
                    case 0:
                        return '1.';
                    case 1:
                        return '2.';
                    case 2:
                        return '3.';
                    case 3:
                        return '4.';
                    case 4:
                        return '5.';
                    case 5:
                        return '6.';
                    case 6:
                        return '7.';
                    case 7:
                        return '8.';
                    case 8:
                        return '9.';
                    case 9:
                        return '10.';
                }
            },
            getNumber2(j) {
                switch (j) {
                    case 0:
                        return '(1)';
                    case 1:
                        return '(2)';
                    case 2:
                        return '(3)';
                    case 3:
                        return '(4)';
                    case 4:
                        return '(5)';
                    case 5:
                        return '(6)';
                    case 6:
                        return '(7)';
                    case 7:
                        return '(8)';
                    case 8:
                        return '(9)';
                    case 9:
                        return '(10)';
                    case 10:
                        return '(11)';
                    case 11:
                        return '(12)';
                    case 12:
                        return '(13)';
                    case 13:
                        return '(14)';
                    case 14:
                        return '(15)';
                    case 15:
                        return '(16)';
                    case 16:
                        return '(17)';
                    case 17:
                        return '(18)';
                    case 18:
                        return '(19)';
                    case 19:
                        return '(20)';
                }
            },
            getPostName(code) {
                switch (code) {
                    case 'po':
                        return '（产品）';
                    case 'ui':
                        return '（UI）';
                    case 'web':
                        return '（前端）';
                    case 'android':
                        return '（安卓）';
                    case 'ios':
                        return '（苹果）';
                    case 'dev':
                        return '（后端）';
                    case 'test':
                        return '（测试）';
                    case 'pm':
                        return '（项目经理）';
                    case 'td':
                        return '（研发经理）';
                    case 'others':
                        return '（其他）';
                }
            },
        },
        created() {
            this.leftSearchCommon();
            this.searchCommon();
        },
        mounted() {
        },
        computed: {},
        components: {
            DailyProjectDialog,
            DailyDialog,
        }
    }
</script>

<style scoped>
    .panel {
        margin-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .panel-body {
        margin: 20px;
    }

    .daily-project-name {
        font-size: 18px;
        font-weight: bold;
    }

    .daily-project-body {
        margin: 10px 30px 20px 30px;
    }

    .daily-content {
        font-size: 15px;
    }
</style>
