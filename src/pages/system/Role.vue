<template>
    <div>
        <div class="search_box">
            <a id="searchTab" @click="searchBoxVisible = !searchBoxVisible" :class="searchBoxVisible ? 'searchTab_active' : ''">
                <i class="el-icon-search" style="font-weight: bold"></i> 搜索
            </a>
            <el-button @click="showCreateDialog" type="primary" icon="el-icon-plus" style="float: right;">
                新增角色
            </el-button>
        </div>
        <div class="search_box_content" v-show="searchBoxVisible">
            <el-form :inline="true" :model="formSearch" ref="formSearch">
                <el-form-item label="角色" prop="name" class="specialWidth50">
                    <el-input
                            v-model="formSearch.name"
                            placeholder="请输入角色"
                            clearable
                            @clear="onSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSearch" type="primary" icon="el-icon-search" plain>
                        查询
                    </el-button>
                    <el-button @click="refresh" icon="el-icon-refresh">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_content">
            <el-table
                    :data="tableList"
                    tooltip-effect="dark"
                    v-loading="searchLoading"
                    :header-cell-style="{fontSize: '14px', color: '#333333'}"
                    stripe
            >
                <el-table-column
                        type="index"
                        :index="index => index + 1 + (formSearch.pageNum - 1) * formSearch.pageSize"
                        align="center"
                        fixed="left"
                        min-width="70"
                        label="序号"
                ></el-table-column>
                <el-table-column
                        prop="name"
                        min-width="100"
                        show-overflow-tooltip
                        label="角色名"
                ></el-table-column>
                <el-table-column
                        prop="accountCount"
                        min-width="120"
                        show-overflow-tooltip
                        label="账号数量"
                >
                    <template slot-scope="scope">
                        <div v-show="scope.row.accountCount === 0">{{ scope.row.accountCount}}</div>
                        <router-link
                                v-show="scope.row.accountCount > 0"
                                :to="{name:'admin', path:'/admin', params:{roleId: scope.row.id}}"
                        >
                            <span style="color: #409EFF">{{ scope.row.accountCount}}</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        width="150"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-button type="primary" size="mini" @click="showUpdateDialog(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteRole(scope.row)">删除</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination_box">
                <el-pagination
                        @current-change="handleCurrentChange"
                        class="pagination_content"
                        :current-page="formSearch.pageNum"
                        layout="total, sizes, prev, pager, next"
                        :page-size="formSearch.pageSize"
                        :total="total"
                ></el-pagination>
            </div>
        </div>
        <CreateRole
                width="40%"
                title="新增角色"
                :visible="createDialogVisible"
                :hideDialog="hideCreateDialog"
                :submit="createRole"
                :loading="createRoleLoading"
                :error="error"
        />
        <UpdateRole
                width="40%"
                title="修改角色"
                :visible="updateDialogVisible"
                :hideDialog="hideUpdateDialog"
                :submit="updateRole"
                :updateItem="updateItem"
                :loading="updateRoleLoading"
                :error="error"
        />
    </div>
</template>
<script>
    import CreateRole from './container/role/CreateRole'
    import UpdateRole from './container/role/UpdateRole'
    import {mapState} from 'vuex'

    export default {
        name: 'rolePage',
        data() {
            return {
                formSearch: {
                    name: '',
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0,
                pages: 0,
                tableList: [],
                error: false,
                searchBoxVisible: false,
                createDialogVisible: false,
                createRoleLoading: false,
                updateDialogVisible: false,
                updateRoleLoading: false,
                updateItem: {},
                searchLoading: false,
                autoHeight: 500
            }
        },
        methods: {
            async onSearch() {
                this.formSearch.pageNum = 1
                this.searchCommon()
            },
            //重置
            refresh() {
                this.$refs['formSearch'].resetFields()
                this.onSearch()
            },
            //分页
            handleCurrentChange(pageNum) {
                this.formSearch.pageNum = pageNum
                this.searchCommon()
            },
            async searchCommon() {
                let formData = {
                    name: this.formSearch.name.trim(),
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize
                }
                this.searchLoading = true
                const res = await this.$service.getRoleList(formData)
                this.searchLoading = false
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum
                    this.formSearch.pageSize = res.data.pageSize
                    this.total = res.data.total
                    this.pages = res.data.pages
                    this.tableList = res.data.result || []
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            //新增
            showCreateDialog() {
                this.createDialogVisible = true
                this.error = false
            },
            hideCreateDialog() {
                this.createDialogVisible = false
                this.error = false
            },
            async createRole(data) {
                this.createRoleLoading = true
                const res = await this.$service.addRole(data)
                this.createRoleLoading = false
                if (res.code === 20000) {
                    this.createDialogVisible = false
                    this.error = false
                    this.searchCommon()
                } else {
                    this.error = res.message || true
                }
            },
            getCheckedPermissions(list) {
                let arr = []
                let map = l => {
                    l.forEach(item => {
                        if (item.subMenus && item.subMenus.length !== 0) {
                            map(item.subMenus)
                        } else if (item.permissions && item.permissions.length !== 0) {
                            item.permissions.forEach(c => {
                                if (c.have && c.method) {
                                    arr.push(c.id)
                                }
                            })
                        }
                        return
                    })
                }
                map(list)
                return arr
            },
            //修改
            showUpdateDialog(row) {
                this.updateDialogVisible = true
                this.error = false
                this.$nextTick(async function () {
                    const res = await this.$service.getMenuWithPermissionByRoleId({
                        roleId: row.id
                    })
                    if (res.code === 20000) {
                        this.updateItem = {
                            ...row,
                            permissionIds: this.getCheckedPermissions(res.data)
                        }
                    }
                })
            },
            hideUpdateDialog() {
                this.updateDialogVisible = false
                this.error = false
                this.updateItem = {}
            },
            async updateRole(data) {
                this.updateRoleLoading = true
                const res = await this.$service.updateRole(data)
                this.updateRoleLoading = false
                if (res.code === 20000) {
                    this.searchCommon()
                    this.updateDialogVisible = false
                    this.error = false
                } else {
                    this.error = res.message || true
                }
            },
            //删除
            deleteRole(row) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$service.deleteRole({
                        id: row.id
                    })
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                        })
                        this.searchCommon()
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: res.message ? res.message : '删除失败',
                        })
                    }
                }).catch(() => {
                });
            }
        },
        created() {
            this.searchCommon()
        },
        mounted() {
            this.$nextTick(function () {
                //56为全选导出数据列表高度
                // this.autoHeight = this.mainHeight - this.$el.querySelector('.search_box').clientHeight
            })
        },
        computed: {
            ...mapState({
                mainHeight: state => state.mainHeight
            })
        },
        components: {
            CreateRole,
            UpdateRole,
        }
    }
</script>
<style scoped></style>
