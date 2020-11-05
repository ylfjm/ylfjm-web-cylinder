<template>
    <div class="panel">
        <div class="panel-heading">
            <div class="panel-title">项目统计</div>
            <nav class="panel-actions">
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
        <div class="panel-body">
            <div class="table-row">
                <div class="col-nav">
                    <ul>
                        <li :class="projectName === '翼猫公众号123' ? 'active' : ''" @mouseenter="handleMouseover('翼猫公众号123')" @mouseout="handleMouseout">
                            <a @click="handleClick('翼猫公众号123')">翼猫公众号123</a>
                            <a class="btn-view" title="任务列表" v-if="projectName2 === '翼猫公众号123'"><i class="el-icon-right"></i></a>
                        </li>
                        <li :class="projectName === '翼猫公众号456' ? 'active' : ''" @mouseenter="handleMouseover('翼猫公众号456')" @mouseout="handleMouseout">
                            <a @click="handleClick('翼猫公众号456')">翼猫公众号456</a>
                            <a class="btn-view" title="任务列表" v-if="projectName2 === '翼猫公众号456'"><i class="el-icon-right"></i></a>
                        </li>
                        <li :class="projectName === '翼猫公众号789' ? 'active' : ''" @mouseenter="handleMouseover('翼猫公众号789')" @mouseout="handleMouseout">
                            <a @click="handleClick('翼猫公众号789')">翼猫公众号789</a>
                            <a class="btn-view" title="任务列表" v-if="projectName2 === '翼猫公众号789'"><i class="el-icon-right"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade active in" id="tab3Content15">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space progress-pie-120" data-value="0" data-doughnut-size="84">
                                    <canvas width="120" height="120" style="width: 120px; height: 120px;"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>0
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
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
                    <div class="tab-pane fade" id="tab3Content14">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="0" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>0
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
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
                    <div class="tab-pane fade" id="tab3Content13">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="0" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>0
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">总任务 :</td>
                                                    <td class="text-left">1</td>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">115</td>
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
                    <div class="tab-pane fade" id="tab3Content12">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="0" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>0
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">11</td>
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
                    <div class="tab-pane fade" id="tab3Content11">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="98" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>98
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
                                    <div class="col-4 text-bottom">
                                        <div>预计</div>
                                        <div>693 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-primary"></span>
                                        <div>消耗</div>
                                        <div>687 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-pale"></span>
                                        <div>剩余</div>
                                        <div>16 <span class="muted">小时</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="product-info">
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 98%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">总任务 :</td>
                                                    <td class="text-left">44</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">未完成 :</td>
                                                    <td class="text-left">1</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-info">
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">9</td>
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
                    <div class="tab-pane fade" id="tab3Content1">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="97" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>97
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
                                    <div class="col-4 text-bottom">
                                        <div>预计</div>
                                        <div>330 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-primary"></span>
                                        <div>消耗</div>
                                        <div>887 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-pale"></span>
                                        <div>剩余</div>
                                        <div>24 <span class="muted">小时</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="product-info">
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">总任务 :</td>
                                                    <td class="text-left">56</td>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">81</td>
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
                    <div class="tab-pane fade" id="tab3Content6">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="100" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>100
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
                                    <div class="col-4 text-bottom">
                                        <div>预计</div>
                                        <div>0 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-primary"></span>
                                        <div>消耗</div>
                                        <div>2359 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-pale"></span>
                                        <div>剩余</div>
                                        <div>8 <span class="muted">小时</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="product-info">
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="74" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 74%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">总任务 :</td>
                                                    <td class="text-left">80</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">未完成 :</td>
                                                    <td class="text-left">21</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-info">
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 99%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">395</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">未解决 :</td>
                                                    <td class="text-left">2</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab3Content7">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="100" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>100
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
                                    <div class="col-4 text-bottom">
                                        <div>预计</div>
                                        <div>0 <span class="muted">小时</span></div>
                                    </div>
                                    <div class="col-4">
                                        <span class="label label-dot label-primary"></span>
                                        <div>消耗</div>
                                        <div>23 <span class="muted">小时</span></div>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="9" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 9%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">总任务 :</td>
                                                    <td class="text-left">11</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">未完成 :</td>
                                                    <td class="text-left">10</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-info">
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">7</td>
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
                    <div class="tab-pane fade" id="tab3Content4">
                        <div class="table-row">
                            <div class="col-5 text-middle text-center">
                                <div class="progress-pie inline-block space" data-value="0" data-doughnut-size="84">
                                    <canvas width="120" height="120"></canvas>
                                    <div class="progress-info">
                                        <small>已完成</small>
                                        <strong>0
                                            <small>%</small>
                                        </strong>
                                    </div>
                                </div>
                                <div class="table-row text-center small text-muted with-padding">
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨日完成</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">已发布</span>
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
                                    <div class="progress-info"><i class="icon icon-check-circle text-success icon-sm"></i> <span class="text-muted">昨天解决</span>
                                        <strong>0</strong></div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="type-info">
                                        <div class="type-label">
                                            <table class="status-count">
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">所有 Bug :</td>
                                                    <td class="text-left">60</td>
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
    </div>
</template>

<script>
    export default {
        name: "ProjectStatisticPanel",
        data() {
            return {
                projectName: '',
                projectName2: '',
                rightIconShow: false,
            }
        },
        methods: {
            handleClick(name) {
                this.projectName = name;
            },
            handleMouseover(name) {
                this.projectName2 = name;
            },
            handleMouseout() {
                this.projectName2 = '';
            },
        }
    }
</script>

<style scoped>
    .panel-actions {
        position: absolute;
        top: 0;
        right: 0;
        padding: 7px 13px 7px 8px;
        margin-bottom: 0;
        list-style: none;
        display: block;
        box-sizing: border-box;
    }

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

    .icon, a [class*="el-icon-"] {

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
        box-sizing: border-box;
        position: relative;
        min-height: 1px;
        padding-right: 10px;
        padding-left: 10px;
        display: table-cell;
        float: none;
        vertical-align: top;
    }
</style>