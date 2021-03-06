import Vue from 'vue'
import VueRouter from 'vue-router'

//登录
import Login from "./pages/login/Login"
//主页
import Home from "./pages/home/Home"

//系统管理
import Admin from "./pages/system/Admin"
import Role from "./pages/system/Role"
import RoleUserPage from "./pages/system/container/role/RoleUserManage"
import RoleMenuPage from "./pages/system/container/role/RoleMenuManage"
import RolePermissionPage from "./pages/system/container/role/RolePermissionManage"
import Department from "./pages/system/Department"
import Menu from "./pages/system/Menu"
import Permission from "./pages/system/Permission"
import Position from "./pages/system/Position"

//项目模块
import ProjectIndex from "./pages/project/ProjectIndex"
import ProjectList from "./pages/project/ProjectList"
import TaskList from "./pages/project/TaskList"
import CreateTaskPage from "./pages/project/container/task/CreateTaskPage"
import EditTaskPage from "./pages/project/container/task/EditTaskPage"
import TaskDetailPage from "./pages/project/container/task/TaskDetailPage";

//日报模块
import DailyIndex from "./pages/daily/DailyIndex"
import DailyList from "./pages/daily/DailyList"
import DailyProjectList from "./pages/daily/DailyProjectList"

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
                title: '欢迎'
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
            path: "/role-user.html",
            name: "role-user.html",
            component: RoleUserPage,
            meta: {
                title: '系统-角色-成员维护'
            }
        },
        {
            path: "/role-menu.html",
            name: "role-menu.html",
            component: RoleMenuPage,
            meta: {
                title: '系统-角色-菜单维护'
            }
        },
        {
            path: "/role-permission.html",
            name: "role-permission.html",
            component: RolePermissionPage,
            meta: {
                title: '系统-角色-权限维护'
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
            path: "/position.html",
            name: "position.html",
            component: Position,
            meta: {
                title: '系统-职位'
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
                title: '任务列表'
            }
        },
        {
            path: "/create-task.html",
            name: "create-task.html",
            component: CreateTaskPage,
            meta: {
                title: '创建任务'
            }
        },
        {
            path: "/edit-task.html",
            name: "edit-task.html",
            component: EditTaskPage,
            meta: {
                title: '编辑任务'
            }
        },
        {
            path: "/task-detail.html",
            name: "task-detail.html",
            component: TaskDetailPage,
            meta: {
                title: '任务详情'
            }
        },
        {
            path: "/daily-index.html",
            name: "daily-index.html",
            component: DailyIndex,
            meta: {
                title: '系统 - 首页'
            }
        },
        {
            path: "/daily-list.html",
            name: "daily-list.html",
            component: DailyList,
            meta: {
                title: '系统 - 日报'
            }
        },
        {
            path: "/daily-project.html",
            name: "daily-project.html",
            component: DailyProjectList,
            meta: {
                title: '系统 - 日报项目'
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
