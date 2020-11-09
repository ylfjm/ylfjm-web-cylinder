<template>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">项目统计</div>
            <nav class="panel-dropdown">
                <el-dropdown trigger="click">
                    <span style="cursor: pointer; font-size: 18px;">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>刷新</el-dropdown-item>
                        <el-dropdown-item>永久关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </nav>
        </div>
        <div class="panel-body">
            <div class="dp-table" style="height: 300px; background-color: aqua;">
                <div class="dp-table-cell" style="background-color: aquamarine;">
123
                </div>
                <div class="dp-table-cell" style="height: 100px !important; background-color: #777777;">
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
    .vertical-nav {
        position: relative;
        min-height: 1px;
        border-right: 1px solid #EBF2FB;
        width: 260px;
    }

    .vertical-nav > ul {
        overflow: auto;
        max-height: 220px;
    }

    .vertical-nav > ul:hover {
        overflow: auto;
    }

    .vertical-nav > ul > li.active > a:first-child:before {
        content: ' ';
        display: block;
        background: #006af1;
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
        width: 3px;
        border-radius: 2px;
    }

    .vertical-nav > ul > li > a {
        font-size: 14px;
        color: #838A9D;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        display: block;
        padding: 8px 15px;
    }

    .vertical-nav > ul > li > a:first-child {
        padding-right: 36px;
    }

    .vertical-nav > ul > li > a:last-child {
        box-shadow: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 8px;
        width: 36px;
        text-align: center;
        background: rgba(0, 0, 0, .05);
    }

    .vertical-nav > ul > li > a:last-child > i {
        font-size: 18px;
        font-weight: bold;
        color: #0c64eb;
    }

    .vertical-nav > ul > li > a:hover {
        background-color: #f5f5f5;
    }

    .progress {
        position: relative;
    }

    .progress-scale {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .product-info {
        position: relative;
        height: 65px;
    }

    .product-info .progress-info {
        position: absolute;
        left: 8px;
        top: 10px;
        width: 180px;
        font-size: 12px;
        box-sizing: border-box;
    }

    .product-info .progress {
        position: absolute;
        left: 10px;
        top: 25px;
        right: 50px;
        margin-bottom: 20px;
    }

    .product-info .type-info {
        position: absolute;
        color: #A6AAB8;
        text-align: center;
        right: 0;
        top: 6px;
        width: 100px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .product-info .type-info table {
        margin: auto;
        color: #3c4353;
        max-width: 100%;
        background-color: transparent;
        border-spacing: 0;
        border-collapse: collapse;
        box-sizing: border-box;
        overflow: hidden;
    }
</style>