<template>
    <div class="panel">
        <div class="panel-heading">
            <div class="panel-title">项目统计</div>
            <nav class="panel-actions">
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
        <div class="panel-body table-row">
            <div class="col-nav">
                <ul>
                    <template v-for="item in projectList">
                        <li :class="projectId === item.id ? 'active' : ''" @mouseover="handleMouseover(item.id)" @mouseout="handleMouseout">
                            <a @click="handleClick(item.id)">{{item.name}}</a>
                            <a class="btn-view" title="任务列表" v-show="projectId2 === item.id"><i class="el-icon-right"></i></a>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="table-row">
                        <div class="col-5">
                            <div class="progress-pie">
                                <el-progress type="circle" :stroke-width="8" :width="108" :percentage="45"></el-progress>
                                <div class="progress-info">
                                    <small>已完成</small>
                                    <strong>45
                                        <small>%</small>
                                    </strong>
                                </div>
                            </div>
                            <div class="table-row text-muted">
                                <div class="col-4 text-bottom">
                                    <div>预计</div>
                                    <div>0 <span class="muted">小时</span></div>
                                </div>
                                <div class="col-4">
                                    <span class="label label-dot label-primary"></span>
                                    <div>消耗</div>
                                    <div>0 <span class="muted">小时</span></div>
                                </div>
                                <div class="col-4">
                                    <span class="label label-dot label-pale"></span>
                                    <div>剩余</div>
                                    <div>0 <span class="muted">小时</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="product-info">
                                <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span
                                        class="text-muted">昨日完成</span>
                                    <strong>0</strong></div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                         style="width: 0%">
                                    </div>
                                </div>
                                <div class="type-info">
                                    <div class="type-label">
                                        <table class="status-count">
                                            <tbody>
                                            <tr>
                                                <td class="text-right">总任务 :</td>
                                                <td class="text-left">0</td>
                                            </tr>
                                            <tr>
                                                <td class="text-right">未完成 :</td>
                                                <td class="text-left">0</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="product-info">
                                <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span
                                        class="text-muted">已发布</span>
                                    <strong>0</strong></div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                         style="width: 0%"></div>
                                </div>
                                <div class="type-info">
                                    <div class="type-label">
                                        <table class="status-count">
                                            <tbody>
                                            <tr>
                                                <td class="text-right">总需求 :</td>
                                                <td class="text-left">0</td>
                                            </tr>
                                            <tr>
                                                <td class="text-right">未关闭 :</td>
                                                <td class="text-left">0</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="product-info">
                                <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span
                                        class="text-muted">昨天解决</span>
                                    <strong>0</strong></div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                         style="width: 0%">
                                    </div>
                                </div>
                                <div class="type-info">
                                    <div class="type-label">
                                        <table class="status-count">
                                            <tbody>
                                            <tr>
                                                <td class="text-right">所有 Bug :</td>
                                                <td class="text-left">0</td>
                                            </tr>
                                            <tr>
                                                <td class="text-right">未解决 :</td>
                                                <td class="text-left">0</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectStatisticPanel",
        data() {
            return {
                projectId: '',
                projectId2: '',
                rightIconShow: false,
                projectList: [
                    {
                        id: 1,
                        name: '微信公众号1',
                    },
                    {
                        id: 2,
                        name: '微信公众号2',
                    },
                    {
                        id: 3,
                        name: '微信公众号3',
                    },
                    {
                        id: 4,
                        name: '微信公众号4',
                    },
                    {
                        id: 5,
                        name: '微信公众号5',
                    },
                    {
                        id: 6,
                        name: '微信公众号6',
                    },
                    {
                        id: 7,
                        name: '微信公众号7',
                    },
                    {
                        id: 8,
                        name: '微信公众号8',
                    },
                    {
                        id: 9,
                        name: '微信公众号9',
                    },
                ],
            }
        },
        methods: {
            handleClick(id) {
                this.projectId = id;
            },
            handleMouseover(id) {
                this.projectId2 = id;
            },
            handleMouseout() {
                this.projectId2 = '';
            },
        },
    }
</script>

<style scoped>
    .table-row {
        display: table;
        width: 100%;
        table-layout: fixed;
        box-sizing: border-box;
    }

    .col-nav {
        box-sizing: border-box;
        position: relative;
        min-height: 1px;
        border-right: 1px solid #EBF2FB;
        width: 260px;
        padding: 0;
        display: table-cell;
        float: none;
        vertical-align: top;
    }

    .col-nav > ul {
        box-sizing: border-box;
        overflow: auto;
        max-height: 220px;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        margin-top: 0;
    }

    .col-nav > ul > li {
        box-sizing: border-box;
        position: relative;
        float: none;
        list-style: none;
    }

    .col-nav > ul > li.active > a:first-child:before {
        box-sizing: border-box;
        content: ' ';
        display: block;
        left: -1px;
        top: 10px;
        bottom: 10px;
        width: 4px;
        background: #006af1;
        position: absolute;
    }

    .col-nav > ul > li > a {
        box-sizing: border-box;
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
        padding: 8px 15px 8px 36px;
    }

    .col-nav > ul > li > a:first-child {
        padding-right: 36px;
    }

    .col-nav > ul > li > a.btn-view {
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

    .col-nav > ul > li > a.btn-view > i {
        display: inline;
        font-size: 18px;
        font-weight: bold;
        color: #0c64eb;
    }

    .col-nav > ul > li > a:hover {
        background-color: #f5f5f5;
    }

    .tab-content {
        display: table-cell;
        float: none;
        vertical-align: top;
        position: relative;
        min-height: 1px;
        padding-right: 10px;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .tab-pane {
        display: block;
        opacity: 1;
        box-sizing: border-box;
        color: rgb(60, 67, 83);
        font-size: 13px;
        transition-delay: 0s;
        transition: opacity .15s linear;
    }

    .panel-body .col-5 {
        width: 41.66666667%;
        display: table-cell;
        float: none;
        box-sizing: border-box;
        vertical-align: middle;
        text-align: center;
    }

    .panel-body .col-7 {
        width: 58.33333333%;
        display: table-cell;
        float: none;
        box-sizing: border-box;
    }

    .progress-pie {
        position: relative;
        margin-bottom: 20px;
        display: inline-block;
        box-sizing: border-box;
    }

    .progress-info {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 30px;
        box-sizing: border-box;
    }

    .progress-info > small {
        line-height: 18px;
        display: block;
        color: #a6aab8;
        font-size: 85%;
        box-sizing: border-box;
        text-align: center;
    }

    .progress-info > strong {
        display: block;
        font-size: 33px;
        line-height: 40px;
        font-weight: 700;
        box-sizing: border-box;
        text-align: center;
    }

    .progress-info > strong > small {
        font-size: 20px;
        box-sizing: border-box;
    }

    .col-4 {
        width: 33.33333333%;
    }

    .text-bottom {
        vertical-align: bottom !important;
    }

    .text-muted {
        text-align: center;
        color: #838a9d;
        font-size: 85%;
        padding: 5px 12px;
    }

    .muted {
        opacity: .5;
    }

    .table-row > .col, .table-row > [class*=col-], .table-row > [class*="-col"] {
        display: table-cell;
        float: none;
        vertical-align: top;
    }


</style>