<template>
    <header id="header">
        <div id="mainHeader">
            <div class="container">
                <h1 id="headerName">软件研发任务管理系统</h1>
                <nav id="menuBar">
                    <ul>
                        <template v-for="menu in menuList">
                            <li v-if="menu.url === '/system.html'" class="divider"></li>
                            <li :class="activeMenuId === menu.id ? 'active' : ''">
                                <a @click="clickMenu(menu.id)" v-text="menu.name"></a>
                            </li>
                        </template>
                    </ul>
                </nav>
                <div id="postCode">
                    <el-dropdown trigger="click" @command="switchCommand">
                    <span class="el-dropdown-link">
                        当前身份：{{ currentPostCodeName }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <template v-for="item in postList">
                                <template v-if="admin.postCode.indexOf(item.code) > -1">
                                    <el-dropdown-item :command="item.code">{{item.name}}</el-dropdown-item>
                                </template>
                            </template>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div id="toolBar">
                    <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ admin.realName }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item class="el-dropdown-menu-divided"></el-dropdown-item>
                            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <!--<div id="subHeader" v-show="subMenuList && subMenuList.length > 0">-->
        <div id="subHeader">
            <div class="container">
                <div id="subMenuBar">
                    <ul>
                        <li v-for="subMenu in subMenuList" :key="subMenu.id" :class="activeSubMenuId === subMenu.id ? 'active' : ''">
                            <a @click="clickSubMenu(subMenu.id)" v-text="subMenu.name"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ChangePasswordDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="changeAdminPassword"
                :loading="dialogSubmitLoading"
                :error="error"
                :updateObj="updateObj"
        />
    </header>
</template>
<script>
    import CryptoJS from 'crypto-js'
    import ChangePasswordDialog from './ChangePasswordDialog'

    export default {
        name: "HeaderPage",
        data() {
            return {
                admin: {},
                menuList: [],
                activeMenuId: localStorage.getItem('activeMenuId'),
                activeSubMenuId: localStorage.getItem('activeSubMenuId'),
                subMenuList: [],
                currentPostCodeName: '',
                postList: [],

                error: false,
                dialogVisible: false,
                dialogSubmitLoading: false,
                updateObj: {},
            }
        },
        /*computed: {
            ...mapState({
                admin: state => state.admin,
                menuList: state => state.menuList,
            })
        },*/
        methods: {
            clickMenu(id) {
                this.activeMenuId = id;
                this.subMenuList = [];
                for (let item of this.menuList) {
                    if (item.id === id) {
                        this.subMenuList = item.subMenus;
                        this.activeSubMenuId = '';
                        localStorage.setItem('activeMenuId', this.activeMenuId);
                        localStorage.setItem('activeSubMenuId', this.activeSubMenuId);
                        if (item.url && item.url !== '') {
                            this.$router.push(item.url);
                            return;
                        }
                    }
                }
                for (let item of this.subMenuList) {
                    if (item.url && item.url !== '') {
                        this.activeSubMenuId = item.id;
                        localStorage.setItem('activeMenuId', this.activeMenuId);
                        localStorage.setItem('activeSubMenuId', this.activeSubMenuId);
                        this.$router.push(item.url);
                        return;
                    }
                }
            },
            clickSubMenu(id) {
                this.activeSubMenuId = id;
                for (let item of this.subMenuList) {
                    if (item.id === id) {
                        localStorage.setItem('activeMenuId', this.activeMenuId);
                        localStorage.setItem('activeSubMenuId', this.activeSubMenuId);
                        this.$router.push(item.url);
                        return;
                    }
                }
            },
            //切换身份
            switchCommand(command) {
                for (let item of this.postList) {
                    if (item.code === command) {
                        this.currentPostCodeName = item.name;
                        localStorage.setItem('currentPostCode', item.code);
                        return;
                    }
                }
            },
            //退出登录
            handleCommand(command) {
                if (command === 'loginOut') {
                    localStorage.removeItem('admin');
                    localStorage.removeItem('admin_token');
                    localStorage.removeItem('menuList');
                    localStorage.removeItem('activeMenuId');
                    localStorage.removeItem('activeSubMenuId');
                    localStorage.removeItem('currentPostCode');
                    localStorage.removeItem('currentUserName');
                    this.$router.push('/login.html')
                } else if (command === 'changePassword') {
                    this.showDialog();
                }
            },
            showDialog(row) {
                this.dialogVisible = true;
                this.error = false;
                this.updateObj = {...row};
            },
            hideDialog() {
                this.dialogVisible = false;
                this.error = false;
                this.updateObj = {};
            },
            async changeAdminPassword(data) {
                this.dialogSubmitLoading = true;
                let formData = {
                    adminId: this.admin.id,
                    password: CryptoJS.MD5(data.password.trim()).toString(),
                    newPassword: CryptoJS.MD5(data.newPassword.trim()).toString(),
                    newPasswordConfirm: CryptoJS.MD5(data.newPasswordConfirm.trim()).toString(),
                };
                const res = await this.$service.changeAdminPassword(formData);
                this.dialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideDialog();
                } else {
                    this.error = res.message || true;
                }
            },
            async getPositionList() {
                const res = await this.$service.getPositionList({});
                if (res.code === 20000) {
                    this.postList = res.data || [];
                    this.switchCommand(this.admin.postCode.split(',')[0]);
                }
            },
        },
        created() {
            this.admin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : {};
            localStorage.setItem('currentUserName', this.admin.userName);
            this.menuList = localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : [];
            this.getPositionList();
            this.activeMenuId = Number.parseInt(localStorage.getItem('activeMenuId'));
            this.activeSubMenuId = Number.parseInt(localStorage.getItem('activeSubMenuId'));
            for (let item of this.menuList) {
                this.subMenuList = item.subMenus;
                if (item.id === this.activeMenuId) {
                    this.activeMenuId = item.id;
                    return;
                }
                if (this.subMenuList) {
                    for (let item2 of this.subMenuList) {
                        if (item2.id === this.activeSubMenuId) {
                            this.activeMenuId = item.id;
                            this.activeSubMenuId = item2.id;
                            return;
                        }
                    }
                }
            }
        },
        components: {
            ChangePasswordDialog
        }
    }
</script>
<style scoped>
    #mainHeader {
        height: 50px;
        line-height: 50px;
        color: #fff;
        background: #1183fb linear-gradient(-90deg, #0a48d1 0, #1183fb 100%);
        border-top-color: #0c64eb;
        border-bottom-color: #e9f2fb;
    }

    #header .container {
        min-width: 1200px;
        padding: 0 60px;
    }

    #headerName {
        position: absolute;
        left: 40px;
        max-width: 350px;
        margin: 0;
        overflow: hidden;
        font-size: 20px;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;
        opacity: .95;
    }

    #menuBar {
        margin: 0 auto;
        text-align: center;
        font-size: 15px;
    }

    #menuBar > ul, #subMenuBar > ul {
        display: inline-block;
    }

    #menuBar > ul > li, #subMenuBar > ul > li {
        float: left;
        display: block;
    }

    #menuBar > ul > li.active > a {
        font-weight: 700;
        background: rgba(0, 0, 0, .1);
        opacity: 1;
    }

    #menuBar > ul > li > a {
        padding: 10px 15px;
        line-height: 30px;
        color: #fff;
        opacity: .9;
        position: relative;
        display: block;
    }

    #menuBar > ul > li > a:hover {
        background: rgba(0, 0, 0, .1);
    }

    #menuBar > ul > li.divider {
        position: relative;
        float: left;
        display: block;
        width: 2px;
        height: 20px;
        margin: 15px;
        background: rgba(255, 255, 255, .4);
    }

    #postCode {
        position: absolute;
        top: 0;
        right: 130px;
        font-size: 9px;
        color: #fff;
        opacity: .8;
    }

    #toolBar {
        position: absolute;
        top: 0;
        right: 40px;
        font-size: 13px;
        color: #fff;
        opacity: .8;
    }

    .el-dropdown-link {
        margin: 0 8px;
        cursor: pointer;
        font-size: 15px;
        color: #fff;
    }

    #subHeader {
        height: 50px;
        line-height: 50px;
        background: #fff;
    }

    #subMenuBar {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
    }

    #subMenuBar > ul > li.active > a {
        font-weight: 700;
        color: #0c64eb;
    }

    #subMenuBar > ul > li > a {
        margin-top: 5px;
        position: relative;
        display: block;
        padding: 8px 12px;
        line-height: 24px;
        color: #3c4353;

    }

    #subMenuBar > ul > li > a:hover {
        background: rgba(0, 0, 0, .1);
    }

</style>
