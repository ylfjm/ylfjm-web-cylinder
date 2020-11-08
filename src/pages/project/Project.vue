<template>
    <div class="container">
        <div class="dashboard">
            <div class="col-main">
                <ProjectStatisticPanel></ProjectStatisticPanel>
                <ProcessingProjectPanel></ProcessingProjectPanel>
            </div>
            <div class="col-side">
                <ProjectOverviewPanel></ProjectOverviewPanel>
                <ProjectOverviewPanel></ProjectOverviewPanel>
            </div>
        </div>
    </div>
</template>
<script>
    import ProjectStatisticPanel from './components/ProjectStatisticPanel'
    import ProcessingProjectPanel from './components/ProcessingProjectPanel'
    import ProjectOverviewPanel from './components/ProjectOverviewPanel'

    export default {
        name: 'projectIndexPage',
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {
            ProjectStatisticPanel,
            ProcessingProjectPanel,
            ProjectOverviewPanel,
        }
    }
</script>
<style scoped>
</style>
