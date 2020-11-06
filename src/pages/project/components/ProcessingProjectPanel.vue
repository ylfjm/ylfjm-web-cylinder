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
        <div class="panel-body has-table">
            <div class="table-content">
                <el-table
                        :data="tableList"
                        tooltip-effect="dark"
                        v-loading="searchLoading"
                        :header-cell-style="{fontSize: '14px', color: '#333333'}"
                        stripe
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
                    >
                    </el-table-column>
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
                        if(item.end) {
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
    .has-table {
        padding: 0 10px 10px 10px;
    }
</style>