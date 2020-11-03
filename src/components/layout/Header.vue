<template>
    <header id="header">
        <div id="mainHeader">
            <div class="container">
                <div id="heading">
                    <h1 id="headerName">敏捷开发任务管理</h1>
                </div>
                <nav id="navBar">
                    <ul class="nav">
                        <li v-for="menu in menuList" :key="menu.id" :class="activeIndex === menu.id ? 'active' : ''">
                            <a @click="chooseSubMenu(menu.id)">{{menu.name}}</a>
                        </li>
                    </ul>
                </nav>
                <div id="toolbar">
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
        <div id="subHeader">
            <div class="container">
                <div id="pageNav" class="btn-toolbar"></div>
                <div id="subNavBar">
                    <ul class="nav">
                        <li v-for="subMenu in subMenuList" :key="subMenu.id" :class="subActiveIndex === subMenu.id ? 'active' : ''">
                            <a @click="routerPage(subMenu.id)">{{subMenu.name}}</a>
                        </li>
                    </ul>
                </div>
                <div id="pageActions"></div>
            </div>
        </div>
    </header>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                activeIndex: '',
                subActiveIndex: '',
                subMenuList: [],
            }
        },
        computed: {
            ...mapState({
                admin: state => state.admin,
                menuList: state => state.menuList,
            })
        },
        methods: {
            chooseSubMenu(id) {
                this.activeIndex = id;
                this.subMenuList = [];
                this.menuList.map(item => {
                    if (item.id === id) {
                        this.subMenuList = item.subMenus;
                    }
                })
            },
            routerPage(id) {
                this.subActiveIndex = id;
                this.subMenuList.map(item => {
                    if (item.id === id) {
                        this.$router.push(item.url);
                    }
                })
            },
            //注销
            handleCommand(command) {
                // if (command === 'loginOut') {
                //     this.$confirm('是否确认退出当前账号?', '提示', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(async () => {
                //         localStorage.removeItem('admin');
                //         localStorage.removeItem('admin_token');
                //         localStorage.removeItem('menuList');
                //         this.$router.push('/login.html')
                //     }).catch(() => {
                //     });
                // }
                localStorage.removeItem('admin');
                localStorage.removeItem('admin_token');
                localStorage.removeItem('menuList');
                this.$router.push('/login.html')
            },
        },
        created() {
            for(let item of this.menuList) {
                this.activeIndex = item.id;
                this.subMenuList = item.subMenus;
                break;
            }
            for(let item of this.subMenuList) {
                this.subActiveIndex = item.id;
                this.$router.push(item.url);
                break;
            }
        },
    }
</script>
<style scoped>
    #header {
        min-width: 1200px;
    }

    #mainHeader {
        height: 50px;
        line-height: 50px;
        color: #fff;
        overflow: hidden;
        background: #1183fb linear-gradient(-90deg, #0a48d1 0, #1183fb 100%);
        border-top-color: #0c64eb;
        border-bottom-color: #e9f2fb;
    }

    #mainHeader > .container {
        min-width: 1200px;
        padding: 0;
    }

    #heading {
        position: absolute;
        top: 10px;
        left: 20px;
    }

    #heading h1 {
        float: left;
        max-width: 300px;
        margin: 0;
        overflow: hidden;
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        opacity: .95;
    }

    #navBar {
        margin: 0 auto;
        padding: 0;
        font-size: 15px;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }

    #navBar .nav > li.active > a {
        font-weight: 700;
        background: rgba(0, 0, 0, .1);
        opacity: 1;
    }

    #navBar .nav > li > a {
        padding: 10px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        border-radius: 0;
        opacity: .9;
        position: relative;
        display: block;
    }

    #navBar .nav > li > a:hover {
        background: rgba(0, 0, 0, .1);
    }

    #navBar .nav > li.divider {
        position: relative;
        float: left;
        display: block;
        width: 2px;
        height: 20px;
        margin: 15px;
        background: rgba(255, 255, 255, .4);
    }

    #toolbar {
        position: absolute;
        top: 0;
        right: 30px;
        font-size: 12px;
        color: #fff;
        opacity: .9;
    }

    .el-dropdown-link {
        margin: 0 8px;
        cursor: pointer;
        font-size: 16px;
        color: #fff;
    }

    #subHeader {
        height: 50px;
        line-height: 50px;
        background: #fff;
    }

    #subHeader > .container {
        padding: 0 20px;
    }

    #subNavBar {
        /*margin-top: 5px;*/
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
    }

    #subNavBar .nav > li.active > a {
        font-weight: 700;
        color: #0c64eb;
    }

    #subNavBar .nav > li > a {
        padding: 8px 12px;
        height: 24px;
        line-height: 24px;
        color: #3c4353;
    }

    #subNavBar .nav > li > a:hover {
        background: rgba(0, 0, 0, .1);
    }

    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        display: inline-block;
    }

    .nav > li {
        position: relative;
        display: block;
        float: left;
    }

    .nav > li > a {
        border-radius: 4px;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        transition: .4s cubic-bezier(.175, .885, .32, 1);
        transition-property: color, background, transform, opacity, left, top, right, bottom, -webkit-transform, -o-transform;
        background: 0;
    }
</style>
