<template>
    <div class="panel" style="margin-right: 10px;">
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
            <div class="dp-table">
                <div class="dp-table-cell vertical-nav">
                    <ul>
                        <template v-for="item in projectList">
                            <li :class="projectId === item.id ? 'active' : ''" @mouseover="handleMouseover(item.id)" @mouseout="handleMouseout">
                                <a @click="handleClick(item.id)">{{item.name}}</a>
                                <a title="任务列表" v-show="projectId2 === item.id"><i class="el-icon-right"></i></a>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="dp-table-cell">
                    <div class="dp-table">
                        <div class="col-5 dp-table-cell vertical-middle text-center">
                            <div class="progress">
                                <el-progress type="circle" :stroke-width="8" :width="108" :percentage="45"></el-progress>
                                <div class="progress-scale">
                                    <small style="color: #a6aab8;">已完成</small>
                                    <strong style="display: block; font-size: 33px;">99
                                        <small style="font-size: 20px;">%</small>
                                    </strong>
                                </div>
                            </div>
                            <div class="dp-table" style="color: #838a9d; padding: 20px 40px 0 40px; font-size: 10px;">
                                <div class="col-4 dp-table-cell">
                                    <div>预计</div>
                                    <div>0 <span style="opacity: 0.5;">小时</span></div>
                                </div>
                                <div class="col-4 dp-table-cell">
                                    <span class=""></span>
                                    <div>消耗</div>
                                    <div>0 <span style="opacity: 0.5;">小时</span></div>
                                </div>
                                <div class="col-4 dp-table-cell">
                                    <span class=""></span>
                                    <div>剩余</div>
                                    <div>0 <span style="opacity: 0.5;">小时</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-7 dp-table-cell">
                            <div class="product-info">
                                <div class="progress-info"><i class="el-icon-success" style="color: #00da88;"></i>
                                    <span style="color: #838a9d;"> 昨日完成</span>
                                    <strong> 0</strong>
                                </div>
                                <el-progress type="line" :stroke-width="8" :percentage="85" class="progress"></el-progress>
                                <div class="type-info">
                                    <table>
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
                            <div class="product-info">
                                <div class="progress-info"><i class="el-icon-success" style="color: #00da88;"></i>
                                    <span style="color: #838a9d;"> 已发布</span>
                                    <strong> 0</strong>
                                </div>
                                <el-progress type="line" :stroke-width="8" :percentage="15" class="progress"></el-progress>
                                <div class="type-info">
                                    <table>
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
                            <div class="product-info">
                                <div class="progress-info"><i class="el-icon-success" style="color: #00da88;"></i>
                                    <span style="color: #838a9d;"> 昨天解决</span>
                                    <strong> 0</strong>
                                </div>
                                <el-progress type="line" :stroke-width="8" :percentage="45" class="progress"></el-progress>
                                <div class="type-info">
                                    <table>
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
