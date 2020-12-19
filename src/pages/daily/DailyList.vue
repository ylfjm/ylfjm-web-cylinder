<template>
    <div class="container">
        <div class="search_box">
            <el-button @click="showDialog" type="primary" style="float: right;">
                <i class="el-icon-plus"></i>
                填写日报
            </el-button>
        </div>
        <div class="table-content">
            <div class="panel">
                <div>
                    <el-timeline>
                        <template v-for="item in tableList">
                            <el-timeline-item :timestamp="item" placement="top">
                                <el-card>
                                    <h4>更新 Github 模板</h4>
                                    <p>王小虎 提交于 2018/4/12 20:46</p>
                                </el-card>
                            </el-timeline-item>
                        </template>
                    </el-timeline>
                </div>
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
                    this.tableList = res.data || [];
                    // console.log(JSON.stringify(this.tableList))
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
                }
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
        },
        created() {
            this.searchCommon()
        },
        mounted() {
        },
        computed: {},
        components: {
            DailyDialog
        }
    }
</script>

<style scoped>

</style>
