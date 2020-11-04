<template>
    <div class="dashboard">
        <div class="col-main">
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title">项目统计</div>
                </div>
                <div class="panel-body">

                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title">项目统计</div>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
        <div class="col-side">
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title">项目总览</div>
                </div>
                <div class="panel-body table-row">
                    <div class="col-4 text-middle text-center">
                        <div style="text-align: center;">
                            <div style="line-height: 20px; color: #3c495c;">所有项目</div>
                            <div style="font-size: 48px; margin-bottom: 10px; font-weight: 700; line-height: 56px;">442</div>
                            <a class="look-all" href="">查看所有 <span class="label label-badge label-icon"><i class="el-icon-right" style="font-weight: bold; font-size: 14px;"></i></span></a>
                        </div>
                    </div>
                    <div class="col-8 text-middle">

                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title">项目总览</div>
                </div>
                <div class="panel-body table-row">
                    <div class="col-4 text-middle text-center">
                        <div style="text-align: center;">
                            <div style="line-height: 20px; color: #3c495c;">所有项目</div>
                            <div style="font-size: 48px; margin-bottom: 10px; font-weight: 700; line-height: 56px;">442</div>
                            <a class="look-all" href="">查看所有 <span class="label label-badge label-icon"><i class="el-icon-right" style="font-weight: bold; font-size: 14px;"></i></span></a>
                        </div>
                    </div>
                    <div class="col-8 text-middle">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'projectIndexPage',
        data() {
            return {
                formSearch: {
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0,
                pages: 0,
                tableList: [],
                error: false,
                searchBoxVisible: false,
            }
        },
        methods: {
        },
        created() {
        },
        mounted() {
        },
        computed: {
        },
        components: {
        }
    }
</script>
<style scoped lang="stylus">
    .el-main
        padding 10px 30px !important
</style>
