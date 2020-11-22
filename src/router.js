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

//项目模块
import ProjectIndex from "./pages/project/ProjectIndex"
import ProjectList from "./pages/project/ProjectList"
import TaskList from "./pages/project/TaskList"
import CreateTaskPage from "./pages/project/container/task/CreateTaskPage"
import EditTaskPage from "./pages/project/container/task/EditTaskPage"

//日报模块
import DailyIndex from "./pages/daily/DailyIndex"
import DailyList from "./pages/daily/DailyList"

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
            name: 'login.html',
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
            name: 'index.html',
            component: Home,
            meta: {
                title: '主页'
            }
        },
        //系统管理
        {
            path: '/admin.html',
            name: 'admin.html',
            component: Admin,
            meta: {
                title: '系统 - 管理员'
            }
        },
        {
            path: "/role.html",
            name: "role.html",
            component: Role,
            meta: {
                title: '系统 - 角色'
            }
        },
        {
            path: "/department.html",
            name: "department.html",
            component: Department,
            meta: {
                title: '系统 - 部门'
            }
        },
        {
            path: '/menu.html',
            name: 'menu.html',
            component: Menu,
            meta: {
                title: '系统 - 菜单'
            }
        },
        {
            path: "/permission.html",
            name: "permission.html",
            component: Permission,
            meta: {
                title: '系统 - 权限'
            }
        },
        {
            path: "/project-index.html",
            name: "project-index.html",
            component: ProjectIndex,
            meta: {
                title: '项目 - 首页'
            }
        },
        {
            path: "/project-list.html",
            name: "project-list.html",
            component: ProjectList,
            meta: {
                title: '项目 - 列表'
            }
        },
        {
            path: "/task-list.html",
            name: "task-list.html",
            component: TaskList,
            meta: {
                title: '项目 - 任务'
            }
        },
        {
            path: "/create-task.html",
            name: "create-task.html",
            component: CreateTaskPage,
            meta: {
                title: '项目 - 创建任务'
            }
        },
        {
            path: "/edit-task.html",
            name: "edit-task.html",
            component: EditTaskPage,
            meta: {
                title: '项目 - 编辑任务'
            }
        },
        {
            path: "/daily-index.html",
            name: "daily-index.html",
            component: DailyIndex,
            meta: {
                title: '日报 - 首页'
            }
        },
        {
            path: "/daily-list.html",
            name: "daily-list.html",
            component: DailyList,
            meta: {
                title: '日报 - 日报'
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
