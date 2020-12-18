<template>
    <div class="container">
        <div class="search_box">
            <el-button @click="showDialog(null, 'create')" type="primary" style="float: right;">
                <i class="el-icon-plus" style="font-weight: bold;"></i>
                填写日报
            </el-button>
        </div>
        <div class="table-content">
            <div class="panel">
                123
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Daily",
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
                let searchParams = {
                    status: this.formSearch.status,
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize
                };
                this.searchLoading = true;
                const res = await this.$service.getDailyList(searchParams);
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
            async addOrUpdateRole(data) {
                let formData = {...data};
                let res;
                this.dialogSubmitLoading = true;
                if (this.actionType === 'create') {
                    res = await this.$service.addDaily(formData);
                } else if (this.actionType === 'update') {
                    res = await this.$service.updateDaily(formData);
                }
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
        components: {}
    }
</script>

<style scoped>

</style>
