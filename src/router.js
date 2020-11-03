import Vue from 'vue'
import VueRouter from 'vue-router'

//登录
import Login from "./pages/login/Login"
//主页
import Home from "./pages/home/Home"

//系统管理
import Admin from "./pages/system/Admin"
import Role from "./pages/system/Role"
import Department from "./pages/system/Department"
import Menu from "./pages/system/Menu"
import Permission from "./pages/system/Permission"

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/login.html',
            name: 'login',
            components: {
                login: Login
            },
            meta: {
                title: '登录'
            }
        },
        //主页
        {
            path: '/index.html',
            name: 'home',
            component: Home,
            meta: {
                title: '主页'
            }
        },
        //系统管理
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                title: '管理员'
            }
        },
        {
            path: "/role",
            name: "role",
            component: Role,
            meta: {
                title: '角色'
            }
        },
        {
            path: "/department",
            name: "department",
            component: Department,
            meta: {
                title: '部门'
            }
        },
        {
            path: '/menu',
            name: 'menu',
            component: Menu,
            meta: {
                title: '菜单'
            }
        },
        {
            path: "/permission",
            name: "permission",
            component: Permission,
            meta: {
                title: '权限'
            }
        },
    ]
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next()
});
export default router

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};