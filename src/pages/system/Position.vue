<template>
    <div class="container">
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
                        width="80"
                        label="ID"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        label="NAME"
                ></el-table-column>
                <el-table-column
                        prop="code"
                        label="CODE"
                ></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PositionPage',
        data() {
            return {
                tableList: [],
                searchLoading: false,
            }
        },
        methods: {
            async searchCommon() {
                this.searchLoading = true;
                const res = await this.$service.getPositionList({});
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.tableList = res.data || []
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
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
    .container {
        margin: 0 600px;
        padding: 0;
        border-radius: 4px;
    }

    .table-content {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>
