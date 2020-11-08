<template>
    <div class="panel">
        <div class="panel-header">

        </div>
        <div class="panel-body">
            <div class="tab-row" style="height: 300px; background-color: aqua;">
                <div class="tab-row-cell1" style="background-color: aquamarine;">
123
                </div>
                <div class="tab-row-cell2" style="height: 100px !important; background-color: #777777;">
456
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectTask"
    }
</script>

<style scoped>
    .tab-row {
        display: table;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
    }

    .tab-row-cell1 {
        display: table-cell;
        float: none;
        vertical-align: top;
    }

    .tab-row-cell2 {
        display: table-cell;
        float: none;
        vertical-align: top;
    }
</style>