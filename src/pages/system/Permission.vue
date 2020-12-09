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
                    <a @click="changeSearchBox" :class="searchBoxVisible ? 'link-search-btn link-search-btn-active' : 'link-search-btn'">
                        <i class="el-icon-search"></i> 搜索
                    </a>
                    <el-button @click="showDialog(null, 'create')" type="primary" icon="el-icon-plus" style="float: right;">
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
                                    <el-tooltip effect="dark" content="编辑" placement="bottom-start">
                                        <a @click="showDialog(scope.row, 'update')" class="action-a-btn">
                                            <img src="@/assets/images/edit-22.png">
                                        </a>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" content="删除" placement="bottom-start">
                                        <a @click="deletePermission(scope.row)" class="action-a-btn">
                                            <img src="@/assets/images/delete-22.png">
                                        </a>
                                    </el-tooltip>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination_box">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                                class="pagination_content"
                                :current-page="formSearch.pageNum"
                                :page-size="formSearch.pageSize"
                                :total="total"
                        ></el-pagination>
                    </div>
                </div>
            </el-main>
        </el-container>
        <PermissionDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="addOrUpdatePermission"
                :loading="dialogSubmitLoading"
                :error="error"
                :updateObj="updateObj"
        />
    </div>
</template>
<script>
    import PermissionDialog from './container/permission/PermissionDialog'

    export default {
        name: 'permissionPage',
        data() {
            return {
                formSearch: {
                    pageNum: 1,
                    pageSize: 15,
                    checkMenuId: 0,
                    name: '',
                    code: '',
                },
                defaultProps: {
                    children: 'subMenus',
                    label: 'name',
                    value: 'id'
                },
                menuList: [],
                firstMenuId: '',

                searchBoxVisible: false,
                searchLoading: false,
                tableList: [],
                total: 0,
                pages: 0,
                error: false,
                dialogVisible: false,
                dialogSubmitLoading: false,
                actionType: '',
                updateObj: {},
            }
        },
        methods: {
            changeSearchBox() {
                this.searchBoxVisible = !this.searchBoxVisible;
            },
            onSearch() {
                this.formSearch.checkMenuId = 0;
                this.formSearch.pageNum = 1;
                this.searchCommon();
            },
            //重置
            refresh() {
                this.formSearch.checkMenuId = 0;
                this.$refs['formSearch'].resetFields();
                this.onSearch();
            },
            async handleCheckChange(data) {
                this.formSearch.checkMenuId = data.id;
                this.formSearch.name = '';
                this.formSearch.code = '';
                this.formSearch.pageNum = 1;
                this.searchCommon();
            },
            //分页
            handleCurrentChange(pageNum) {
                this.formSearch.pageNum = pageNum;
                this.searchCommon();
            },
            handleSizeChange(pageSize) {
                this.formSearch.pageNum = 1;
                this.formSearch.pageSize = pageSize;
                this.searchCommon();
            },
            async searchCommon() {
                let formData = {
                    menuId: this.formSearch.checkMenuId,
                    name: this.formSearch.name.trim(),
                    code: this.formSearch.code.trim(),
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize,
                };
                this.searchLoading = true;
                const res = await this.$service.getPermissionList(formData);
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum;
                    this.formSearch.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                    this.tableList = res.data.result || [];
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                        duration: 2000
                    })
                }
            },
            showDialog(row, actionType) {
                this.dialogVisible = true;
                this.error = false;
                this.actionType = actionType;
                if (this.actionType === 'update') {
                    this.updateObj = {...row};
                }
            },
            hideDialog() {
                this.dialogVisible = false;
                this.error = false;
                this.updateObj = {};
            },
            async addOrUpdatePermission(data) {
                let formData;
                let res;
                this.dialogSubmitLoading = true;
                if (this.actionType === 'create') {
                    formData = {...data, menuId: this.formSearch.checkMenuId};
                    res = await this.$service.addPermission(formData);
                } else if (this.actionType === 'update') {
                    formData = {...data};
                    res = await this.$service.updatePermission(formData);
                }
                this.dialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideDialog();
                    this.searchCommon();
                } else {
                    this.error = res.message || true;
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
                    });
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                            duration: 2000
                        });
                        this.searchCommon()
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: res.message ? res.message : '删除失败',
                            duration: 2000
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
        },
        computed: {},
        components: {
            PermissionDialog,
        }
    }
</script>
<style scoped>
</style>
