<template>
    <div class="container">
        <el-container class="left-right-structure">
            <el-aside width="200px" class="aside-box">
                <el-tree
                        :data="menuList"
                        :props="defaultProps"
                        class="terminal_tree"
                        highlight-current
                        check-on-click-node
                        node-key="id"
                        :default-expanded-keys="[0, firstMenuId]"
                        @node-click="handleCheckChange"
                ></el-tree>
            </el-aside>
            <el-main>
                <div class="search_box">
                    <CustomLinkButton @backFunc="changeSearchBox" :btnText="'搜索'" :active="searchBoxVisible"></CustomLinkButton>
                    <el-button @click="showCreateDialog" type="primary" icon="el-icon-plus" style="float: right;">
                        添加权限
                    </el-button>
                </div>
                <div class="search-box-content" v-show="searchBoxVisible">
                    <el-form :inline="true" :model="formSearch" ref="formSearch">
                        <el-form-item label="权限名称" prop="name" class="specialWidth80">
                            <el-input
                                    v-model="formSearch.name"
                                    placeholder="请输入权限名称"
                                    clearable
                                    @clear="onSearch"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="权限CODE" prop="code" class="specialWidth100">
                            <el-input
                                    v-model="formSearch.code"
                                    placeholder="请输入权限CODE"
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
                <div class="table-content">
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
                                min-width="150"
                                show-overflow-tooltip
                                label="权限名称"
                        ></el-table-column>
                        <el-table-column
                                prop="code"
                                min-width="150"
                                show-overflow-tooltip
                                label="权限CODE"
                        ></el-table-column>
                        <el-table-column
                                prop="method"
                                min-width="100"
                                show-overflow-tooltip
                                label="权限方法"
                        ></el-table-column>
                        <el-table-column
                                prop="menuName"
                                min-width="150"
                                show-overflow-tooltip
                                label="菜单名称"
                        ></el-table-column>
                        <el-table-column
                                align="center"
                                fixed="right"
                                width="150"
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-row type="flex" justify="center">
                                    <el-button type="primary" size="mini" @click="showUpdateDialog(scope.row)">编辑</el-button>
                                    <el-button type="danger" size="mini" @click="deletePermission(scope.row)">删除</el-button>
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
            </el-main>
        </el-container>
        <CreateDialogForm
                width="40%"
                title="添加权限"
                :visible="createDialogVisible"
                :form="form"
                :hideDialog="hideCreateDialog"
                @changeFieldValue="changeFieldValue"
                :submit="addPermission"
                :columns="columns"
                :loading="createPermissionLoading"
                :error="error"
        />
        <UpdateDialogForm
                width="40%"
                title="修改权限"
                :visible="updateDialogVisible"
                :hideDialog="hideUpdateDialog"
                @changeFieldValue="changeFieldValue"
                :submit="updatePermission"
                :updateItem="updateItem"
                :columns="columns"
                :loading="updatePermissionLoading"
                :error="error"
        />
    </div>
</template>
<script>
    import CreateDialogForm from '@/components/common/CreateDialogForm'
    import UpdateDialogForm from '@/components/common/UpdateDialogForm'
    import {mapState} from 'vuex'
    import CustomLinkButton from '@/components/common/CustomLinkButton'

    export default {
        name: 'permissionPage',
        data() {
            return {
                formSearch: {
                    pageNum: 1,
                    pageSize: 10,
                    checkMenuId: 0,
                    name: '',
                    code: '',
                },
                total: 0,
                pages: 0,
                tableList: [],
                error: false,
                searchBoxVisible: false,
                createDialogVisible: false,
                createPermissionLoading: false,
                updateDialogVisible: false,
                updatePermissionLoading: false,
                updateItem: {},
                form: {
                    name: '',
                    code: '',
                    method: ''
                },
                columns: [
                    {
                        label: '权限名称',
                        fieldName: 'name',
                        type: 'input',
                        rules: [
                            {required: true, message: '请填写权限名称', trigger: 'blur'}
                        ]
                    },
                    {
                        label: '权限CODE',
                        fieldName: 'code',
                        type: 'input',
                        rules: [
                            {required: true, message: '请填写权限CODE', trigger: 'blur'}
                        ]
                    },
                    {
                        label: '权限方法',
                        fieldName: 'method',
                        type: 'input',
                        rules: [
                            {required: true, message: '请填写权限方法', trigger: 'blur'}
                        ]
                    }
                ],
                searchLoading: false,
                defaultProps: {
                    children: 'subMenus',
                    label: 'name',
                    value: 'id'
                },
                menuList: [],
                firstMenuId: '',
                autoHeight: 500
            }
        },
        methods: {
            changeSearchBox() {
                this.searchBoxVisible = !this.searchBoxVisible
            },
            onSearch() {
                this.formSearch.checkMenuId = 0
                this.formSearch.pageNum = 1
                this.searchCommon()
            },
            //重置
            refresh() {
                this.formSearch.checkMenuId = 0
                this.$refs['formSearch'].resetFields()
                this.onSearch()
            },
            //新增修改弹窗回传值
            changeFieldValue(data) {
                this[data.type][data.fieldName] = data.value
            },
            async handleCheckChange(data) {
                this.formSearch.checkMenuId = data.id
                this.formSearch.name = ''
                this.formSearch.code = ''
                this.formSearch.pageNum = 1
                this.searchCommon()
            },
            //分页
            handleCurrentChange(pageNum) {
                this.formSearch.pageNum = pageNum
                this.searchCommon()
            },
            async searchCommon() {
                let formData = {
                    menuId: this.formSearch.checkMenuId,
                    name: this.formSearch.name.trim(),
                    code: this.formSearch.code.trim(),
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize,
                }
                this.searchLoading = true
                const res = await this.$service.getPermissionList(formData)
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
            async addPermission(data) {
                this.createPermissionLoading = true
                const res = await this.$service.addPermission({
                    ...data,
                    menuId: this.formSearch.checkMenuId
                })
                this.createPermissionLoading = false
                if (res.code === 20000) {
                    this.createDialogVisible = false
                    this.error = false
                    this.searchCommon()
                } else {
                    this.error = res.message || true
                }
            },
            //修改
            showUpdateDialog(row) {
                this.updateDialogVisible = true
                this.error = false
                this.$nextTick(function () {
                    this.updateItem = {...row}
                })
            },
            hideUpdateDialog() {
                this.updateDialogVisible = false
                this.error = false
                this.updateItem = {}
            },
            async updatePermission(data) {
                this.updatePermissionLoading = true
                const res = await this.$service.updatePermission(data)
                this.updatePermissionLoading = false
                if (res.code === 20000) {
                    this.searchCommon()
                    this.updateDialogVisible = false
                    this.error = false
                    this.updateItem = {}
                } else {
                    this.error = res.message || true
                }
            },
            //删除
            deletePermission(row) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$service.deletePermission({
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
        async created() {
            const res = await this.$service.getMenuTree({})
            if (res.code === 20000) {
                this.menuList = [
                    {
                        id: 0,
                        name: '根目录',
                        subMenus: res.data
                    }
                ];
                this.firstMenuId = res.data[0].id
            }
            this.searchCommon()
        },
        mounted() {
            this.$nextTick(function () {
                //56为全选导出数据列表高度
                // this.autoHeight = this.mainHeight - 28
            })
        },
        computed: {
            ...mapState({
                mainHeight: state => state.mainHeight
            })
        },
        components: {
            CreateDialogForm,
            UpdateDialogForm,
            CustomLinkButton,
        }
    }
</script>
<style scoped>
</style>
