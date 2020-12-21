import api from './api'

const baseUrl = 'http://localhost:9999';
const Service = {
    //登录
    userLogin: data => api.axiosPost(baseUrl + '/api/login', null, data),
    //用户管理
    getAdminList: data => api.axiosGet(baseUrl + '/api/admin/' + data.pageNum + '/' + data.pageSize, null, data),
    addAdmin: data => api.axiosPost(baseUrl + '/api/admin', data, null),
    updateAdmin: data => api.axiosPut(baseUrl + '/api/admin', data, null),
    changeAdminStatus: data => api.axiosPatch(baseUrl + '/api/admin/' + data.id + '/forbidden', null, null),
    deleteAdmin: data => api.axiosDelete(baseUrl + '/api/admin/' + data.id, null, null),
    changeAdminPassword: data => api.axiosPost(baseUrl + '/api/admin/changePassword', null, data),
    //部门管理
    getDepartmentList: data => api.axiosGet(baseUrl + '/api/department/' + data.pageNum + '/' + data.pageSize, null, data),
    addDepartment: data => api.axiosPost(baseUrl + '/api/department', data, null),
    updateDepartment: data => api.axiosPut(baseUrl + '/api/department', data, null),
    deleteDepartment: data => api.axiosDelete(baseUrl + '/api/department/' + data.id, null, null),
    getDepartmentAdminList: data => api.axiosGet(baseUrl + '/api/department/user', null, data),
    //菜单管理
    getMenuList: data => api.axiosGet(baseUrl + '/api/menu/' + data.pageNum + '/' + data.pageSize, null, data),
    getMenuWithPermissionByRoleId: data => api.axiosGet(baseUrl + '/api/menu/permission', null, data),
    addMenu: data => api.axiosPost(baseUrl + '/api/menu', data, null),
    updateMenu: data => api.axiosPut(baseUrl + '/api/menu', data, null),
    deleteMenu: data => api.axiosDelete(baseUrl + '/api/menu/' + data.id, null, null),
    getMenuTree: data => api.axiosGet(baseUrl + '/api/menu/tree', null, data),
    //权限管理
    getPermissionList: data => api.axiosGet(baseUrl + '/api/permission/' + data.pageNum + '/' + data.pageSize, null, data),
    addPermission: data => api.axiosPost(baseUrl + '/api/permission', data, null),
    updatePermission: data => api.axiosPut(baseUrl + '/api/permission', data, null),
    deletePermission: data => api.axiosDelete(baseUrl + '/api/permission/' + data.id, null, null),
    //职位
    getPositionList: data => api.axiosGet(baseUrl + '/api/position', null, data),
    //角色管理
    getRoleList: data => api.axiosGet(baseUrl + '/api/role/' + data.pageNum + '/' + data.pageSize, null, data),
    addRole: data => api.axiosPost(baseUrl + '/api/role', data, null),
    updateRole: data => api.axiosPut(baseUrl + '/api/role', data, null),
    updateRoleAdmin: data => api.axiosPut(baseUrl + '/api/roleUser', data, null),
    updateRoleMenu: data => api.axiosPut(baseUrl + '/api/roleMenu', data, null),
    updateRolePermission: data => api.axiosPut(baseUrl + '/api/rolePermission', data, null),
    deleteRole: data => api.axiosDelete(baseUrl + '/api/role/' + data.id, null, null),

    getProjectList: data => api.axiosGet(baseUrl + '/api/project/' + data.pageNum + '/' + data.pageSize, null, data),
    addProject: data => api.axiosPost(baseUrl + '/api/project', data, null),
    deleteProject: data => api.axiosDelete(baseUrl + '/api/project/' + data.id, null, null),

    getTaskList: data => api.axiosGet(baseUrl + '/api/task/' + data.pageNum + '/' + data.pageSize, null, data),
    getTaskById: data => api.axiosGet(baseUrl + '/api/task/' + data.id, null, null),
    addTask: data => api.axiosPost(baseUrl + '/api/task', data, null),
    deleteTask: data => api.axiosDelete(baseUrl + '/api/task/' + data.id, null, null),
    updateTask: data => api.axiosPut(baseUrl + '/api/task', data, null),
    taskAction: data => api.axiosPut(baseUrl + '/api/task/' + data.actionType + '/action', data, null),
    getTaskRemarkList: data => api.axiosGet(baseUrl + '/api/task/' + data.taskId + '/remark', null, null),

    getDailyProjectList: data => api.axiosGet(baseUrl + '/api/dailyProject/' + data.pageNum + '/' + data.pageSize, null, data),
    addDailyProject: data => api.axiosPost(baseUrl + '/api/dailyProject', data, null),
    updateDailyProject: data => api.axiosPut(baseUrl + '/api/dailyProject', data, null),
    deleteDailyProject: data => api.axiosDelete(baseUrl + '/api/dailyProject/' + data.id, null, null),

    getDailyShowList: data => api.axiosGet(baseUrl + '/api/daily/show/' + data.pageNum + '/' + data.pageSize, null, data),
    getDailyList: data => api.axiosGet(baseUrl + '/api/daily/' + data.pageNum + '/' + data.pageSize, null, data),
    addDaily: data => api.axiosPost(baseUrl + '/api/daily', data, null),

};

export default Service
