<template>
    <div class="panel" style="margin-left: 10px;">
        <div class="panel-header">
            <div class="panel-title">项目总览</div>
            <nav class="panel-dropdown">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link" style="cursor: pointer; font-size: 18px;">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>刷新</el-dropdown-item>
                        <el-dropdown-item>永久关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </nav>
        </div>
        <div class="panel-body dp-table">
            <div class="col-4 dp-table-cell vertical-middle">
                <div style="text-align: center;">
                    <div style="line-height: 20px; color: #3c495c;">所有项目</div>
                    <router-link :to="'/project-list.html'">
                        <div class="allProjectNum">442</div>
                    </router-link>
                    <a class="look-all" href="">
                        查看所有
                        <span class="label label-badge">
                            <i class="el-icon-right" style="font-weight: bold; font-size: 14px;"></i>
                        </span>
                    </a>
                </div>
            </div>
            <div class="col-8 dp-table-cell vertical-middle">
                <ul class="status-bars">
                    <li>
                        <span class="bar" style="height: 0%"><span class="value">0</span></span>
                        <span class="title">未开始</span>
                    </li>
                    <li>
                        <span class="bar" style="height: 0%"><span class="value">0</span></span>
                        <span class="title">进行中</span>
                    </li>
                    <li>
                        <span class="bar" style="height: 13%"><span class="value">1</span></span>
                        <span class="title">已挂起</span>
                    </li>
                    <li>
                        <span class="bar" style="height: 88%"><span class="value">7</span></span>
                        <span class="title">已关闭</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectOverviewPanel"
    }
</script>

<style scoped>
    .panel-body .look-all {
        position: relative;
        box-sizing: border-box;
        border-radius: 12px;
        text-align: center;
        font-size: 12px;
        line-height: 18px;
        color: #fff;
        background-color: #0c64eb;
        display: inline-block;
        margin-bottom: 0;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        border: 1px solid transparent;
        padding: 3px 10px 3px 10px;
    }

    .panel-body ul.status-bars {
        display: table;
        width: 100%;
        height: 140px;
        padding: 50px 5px 5px 5px;
        margin: 0;
        overflow: hidden;
        color: #3c4353;
        box-sizing: border-box;
    }

    .panel-body ul.status-bars > li {
        position: relative;
        display: table-cell;
        text-align: center;
        vertical-align: bottom;
        box-sizing: border-box;
    }

    .panel-body ul.status-bars .bar {
        position: absolute;
        bottom: 20px;
        left: 50%;
        display: block;
        width: 10px;
        margin-left: -5px;
        background: #0c64eb;
        border-radius: 5px 5px 0 0;
        box-sizing: border-box;
    }

    .panel-body ul.status-bars .bar:after {
        position: absolute;
        right: -50px;
        bottom: 0;
        left: -50px;
        display: block;
        height: 1px;
        content: ' ';
        background: #eee;
        box-sizing: border-box;
    }

    .panel-body ul.status-bars .value {
        position: relative;
        top: -20px;
        left: -20px;
        display: inline-block;
        width: 50px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        box-sizing: border-box;
    }

    .panel-body ul.status-bars .title {
        font-size: 12px;
        font-weight: 400;
        color: #a6a8b6;
        box-sizing: border-box;
    }

    .allProjectNum {
        font-size: 46px;
        margin-bottom: 10px;
        font-weight: 700;
        line-height: 56px;
    }

    .allProjectNum:hover {
        color: #0c64eb;
    }
</style>
