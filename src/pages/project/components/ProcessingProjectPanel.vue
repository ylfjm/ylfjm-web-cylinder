<template>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">进行中的项目</div>
            <nav class="panel-dropdown">
                <el-dropdown trigger="click">
                    <span style="cursor: pointer; font-size: 18px;">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu>
                        <el-dropdown-item>刷新</el-dropdown-item>
                        <el-dropdown-item>永久关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </nav>
        </div>
        <div class="panel-body">
            <el-table
                    :data="tableList"
                    tooltip-effect="dark"
                    v-loading="searchLoading"
                    :header-cell-style="{fontSize: '14px', color: '#333333'}"
                    stripe
                    height="380"
            >
                <el-table-column
                        type="index"
                        align="center"
                        fixed="left"
                        label="序号"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        show-overflow-tooltip
                        label="项目名称"
                ></el-table-column>
                <el-table-column
                        prop="end"
                        show-overflow-tooltip
                        label="截止日期"
                ></el-table-column>
                <el-table-column
                        prop="status"
                        show-overflow-tooltip
                        label="状态"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 'wait'" style="color: #FF3300;">未开始</div>
                        <div v-if="scope.row.status === 'doing'" style="color: #FF3300;">进行中</div>
                        <div v-if="scope.row.status === 'suspended'" style="color: #FF9900;">已挂起</div>
                        <div v-if="scope.row.status === 'closed'" style="color: #FF0000;">已关闭</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="aaa"
                        show-overflow-tooltip
                        label="预计"
                ></el-table-column>
                <el-table-column
                        prop="aaa"
                        show-overflow-tooltip
                        label="消耗"
                ></el-table-column>
                <el-table-column
                        prop="aaa"
                        show-overflow-tooltip
                        label="剩余"
                ></el-table-column>
                <el-table-column
                        prop="status"
                        show-overflow-tooltip
                        label="进度"
                ></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "ProcessingProjectPanel",
        data() {
            return {
                tableList: [],
                searchLoading: false,
            }
        },
        methods: {
            async searchCommon() {
                this.searchLoading = true;
                const res = await this.$service.getProcessingProjectList({pageNum: 1, pageSize: 10000});
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.tableList = res.data.result || []
                    this.tableList.map(item => {
                        if (item.end) {
                            item.end = moment(item.end).format('YYYY-MM-DD');
                        }
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '加载数据失败',
                    })
                }
            },
        },
        created() {
            // this.searchCommon()
        },
        components: {}
    }
</script>

<style scoped>

</style>