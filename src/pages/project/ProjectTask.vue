<template>
    <div class="container">
        <div class="dashboard">
            <div class="col-main">
            </div>
            <div class="col-side">
            </div>
        </div>
    </div>
</template>

<script>
    import ProjectStatisticPanel from './components/ProjectStatisticPanel'
    import ProcessingProjectPanel from './components/ProcessingProjectPanel'
    import ProjectOverviewPanel from './components/ProjectOverviewPanel'
    import ProjectTaskPanel from './components/ProjectTaskPanel'

    export default {
        name: "ProjectTask",
        components: {
            ProjectStatisticPanel,
            ProcessingProjectPanel,
            ProjectOverviewPanel,
            ProjectTaskPanel,
        }
    }
</script>

<style scoped>
</style>