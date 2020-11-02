<template>
    <div>
        <div class="mainHeader">
            <div class="header-left">
                敏捷开发任务管理系统
            </div>
            <div class="header-center">
                <ul class="nav-default">
                    <li class="active" data-id="my"><a href="/my/" class="active"><span> 我的地盘</span></a></li>
                    <li><a href="/product-index-no.html">项目</a></li>
                    <li><a href="/project-index-no.html">冲刺</a></li>
                    <li><a href="/qa/">测试</a></li>
                    <li class="divider"></li>
                    <li><a href="/doc/">文档</a></li>
                    <li><a href="/report/">统计</a></li>
                    <li class="divider"></li>
                    <li><a href="/company/">组织</a></li>
                    <li><a href="/admin/">后台</a></li>
                </ul>
            </div>
            <div class="header-right">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ admin.realName }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人资料</el-dropdown-item>
                        <el-dropdown-item divided command="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                datas: [
                    {
                        type: 'el-icon-share',
                        count: 10
                    },
                    {
                        type: 'el-icon-share',
                        count: 10
                    },
                    {
                        type: 'el-icon-share',
                        count: 10
                    }
                ],
            }
        },
        computed: {
            ...mapState({
                admin: state => state.admin,
                isCollapse: state => state.isCollapse
            })
        },
        methods: {
            //注销
            handleCommand(command) {
                if (command === 'loginOut') {
                    this.$confirm('是否确认退出当前账号?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        localStorage.removeItem('admin');
                        localStorage.removeItem('admin_token');
                        localStorage.removeItem('menuList');
                        this.$router.push('/login.html')
                    }).catch(() => {
                    });
                }
            },
        }
    }
</script>
<style scoped lang="stylus">
    .mainHeader
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        color: #fff;
        background: #1183fb linear-gradient(-90deg, #0a48d1 0, #1183fb 100%);
        border-top-color: #0c64eb;
        border-bottom-color: #e9f2fb;

    .header-left
        position: absolute;
        left: 30px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;

    .header-center
        min-width: 1200px;
        max-width: 1600px;
        margin: 0 auto;
        text-align: center;

    .header-right
        position: absolute;
        right: 30px;

    .el-dropdown-link
        margin: 0 8px;
        cursor: pointer;
        font-size: 16px;
        color: #fff;

    .nav-default {
        padding: 0;
        margin: 0;
        list-style: none;
        display: inline-block;
        height: 50px;
        line-height: 50px;
    }

    .nav-default > li {
        position: relative;
        display: block;
        float: left;
    }

    .nav-default > li > a {
        color: #fff !important;
        opacity: .9;
        margin: 0 10px;
        border-radius: 0;
        text-decoration: none;
        font-size: 14px;
    }

    .nav-default > li.divider {
        display: block;
        width: 2px;
        height: 20px;
        margin: 15px;
        background: rgba(255, 255, 255, .4);
    }
</style>
