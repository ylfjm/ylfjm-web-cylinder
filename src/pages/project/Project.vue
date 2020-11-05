<template>
    <div class="container-body-content dashboard">
        <div class="col-main">
            <ProjectStatisticPanel></ProjectStatisticPanel>
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title">项目统计</div>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
        <div class="col-side">
            <ProjectOverviewPanel></ProjectOverviewPanel>
            <ProjectOverviewPanel></ProjectOverviewPanel>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import ProjectStatisticPanel from './components/ProjectStatisticPanel'
    import ProjectOverviewPanel from './components/ProjectOverviewPanel'

    export default {
        name: 'projectIndexPage',
        data() {
            return {}
        },
        methods: {},
        created() {
        },
        mounted() {
        },
        computed: {},
        components: {
            ProjectStatisticPanel,
            ProjectOverviewPanel,
        }
    }
</script>
<style scoped lang="stylus">
    .el-main
        padding 10px 60px !important
</style>
