<template>
    <div class="panel">
        <div class="panel-heading">
            <div class="panel-title">进行中的项目</div>
            <nav class="panel-actions">
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
            <div class="table-content">
                <el-table
                        :data="tableList"
                        tooltip-effect="dark"
                        v-loading="searchLoading"
                        :header-cell-style="{fontSize: '14px', color: '#333333'}"
                        stripe
                        height="400"
                >
                    <el-table-column
                            type="index"
                            :index="index => index + 1"
                            align="center"
                            fixed="left"
                            min-width="70"
                            label="序号"
                    ></el-table-column>
                    <el-table-column
                            prop="name"
                            min-width="150"
                            show-overflow-tooltip
                            label="项目名称"
                    ></el-table-column>
                    <el-table-column
                            prop="end"
                            min-width="130"
                            show-overflow-tooltip
                            label="截止日期"
                    ></el-table-column>
                    <el-table-column
                            prop="status"
                            min-width="130"
                            show-overflow-tooltip
                            label="状态"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.status === 'suspended'" style="color: #FF9900;">已挂起</div>
                            <div v-if="scope.row.status === 'wait'" style="color: #FF3300;">进行中</div>
                            <div v-if="scope.row.status === 'closed'" style="color: #FF0000;">已关闭</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="aaa"
                            min-width="130"
                            show-overflow-tooltip
                            label="预计"
                    ></el-table-column>
                    <el-table-column
                            prop="aaa"
                            min-width="130"
                            show-overflow-tooltip
                            label="消耗"
                    ></el-table-column>
                    <el-table-column
                            prop="aaa"
                            min-width="130"
                            show-overflow-tooltip
                            label="剩余"
                    ></el-table-column>
                    <el-table-column
                            prop="status"
                            min-width="130"
                            show-overflow-tooltip
                            label="进度"
                    ></el-table-column>
                </el-table>
            </div>
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
                let a = moment('2018-12-05 11:30:36').format('YYYY-MM-DD');
                console.log(a)
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
                }
            },
        },
        created() {
            this.searchCommon()
        },
        components: {
            moment
        }
    }
</script>

<style scoped>
    .panel-body {
        padding: 0 10px 10px 10px;
        box-sizing: border-box;
        width: 100%;
    }

    .table-content {
        margin-top: 0 !important;
        overflow: hidden;
    }

    .table-content:hover {
        overflow: auto !important;
    }

</style>