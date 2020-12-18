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
                    <el-button @click="showDialog(null, 'create')" type="primary" style="float: right;">
                        <i class="el-icon-plus"></i>
                        添加菜单
                    </el-button>
                </div>
                <div class="search-box-content" v-show="searchBoxVisible">
                    <el-form :inline="true" :model="formSearch" ref="formSearch">
                        <el-form-item label="菜单层级" prop="name" class="specialWidth80">
                            <el-select
                                    v-model="formSearch.level"
                                    clearable
                                    @clear="onSearch"
                            >
                                <el-option key="1" label="一级菜单" value="1"></el-option>
                                <el-option key="2" label="二级菜单" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜单名称" prop="name" class="specialWidth80">
                            <el-input
                                    v-model="formSearch.name"
                                    placeholder="请输入菜单名称"
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
                                min-width="100"
                                show-overflow-tooltip
                                label="菜单名"
                        ></el-table-column>
                        <el-table-column
                                prop="url"
                                min-width="150"
                                show-overflow-tooltip
                                label="菜单url"
                        ></el-table-column>
                        <el-table-column
                                prop="pidName"
                                min-width="150"
                                show-overflow-tooltip
                                label="上级菜单"
                        ></el-table-column>
                        <el-table-column
                                prop="sorts"
                                min-width="150"
                                show-overflow-tooltip
                                label="排序"
                        ></el-table-column>
                        <el-table-column
                                prop="description"
                                min-width="150"
                                show-overflow-tooltip
                                label="描述"
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
                                        <a @click="deleteMenu(scope.row)" class="action-a-btn">
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
        <MenuDialog
                :visible="dialogVisible"
                :hideDialog="hideDialog"
                :submit="addOrUpdateMenu"
                :loading="dialogSubmitLoading"
                :error="error"
                :updateObj="updateObj"
                :firstLevelMenuList="firstLevelMenuList"
        />
    </div>
</template>
<script>
    import MenuDialog from './container/menu/MenuDialog'

    export default {
        name: 'menuPage',
        data() {
            return {
                formSearch: {
                    pageNum: 1,
                    pageSize: 15,
                    checkMenuId: '',
                    name: '',
                    level: ''
                },
                defaultProps: {
                    children: 'subMenus',
                    label: 'name',
                    value: 'id'
                },
                menuList: [],
                firstMenuId: '',

                firstLevelMenuList: [],
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
                this.searchBoxVisible = !this.searchBoxVisible
            },
            onSearch() {
                this.formSearch.checkMenuId = '';
                this.formSearch.pageNum = 1
                this.searchCommon()
            },
            //重置
            refresh() {
                this.formSearch.checkMenuId = '';
                this.$refs['formSearch'].resetFields()
                this.onSearch()
            },
            async handleCheckChange(data) {
                this.formSearch.checkMenuId = data.id
                this.formSearch.name = '';
                this.formSearch.level = '';
                this.formSearch.pageNum = 1
                this.searchCommon()
            },
            //分页
            handleCurrentChange(pageNum) {
                this.formSearch.pageNum = pageNum
                this.searchCommon()
            },
            handleSizeChange(pageSize) {
                this.formSearch.pageNum = 1;
                this.formSearch.pageSize = pageSize;
                this.searchCommon()
            },
            async searchCommon() {
                let formData = {
                    pid: this.formSearch.checkMenuId,
                    name: this.formSearch.name.trim(),
                    level: this.formSearch.level,
                    pageNum: this.formSearch.pageNum,
                    pageSize: this.formSearch.pageSize,
                };
                this.searchLoading = true;
                const res = await this.$service.getMenuList(formData);
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum;
                    this.formSearch.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                    this.tableList = res.data.result
                        ? res.data.result.map(item => {
                            return Object.assign({}, item, {
                                pidName: this.getPidName(this.menuList, item.pid)
                            })
                        })
                        : []
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                        duration: 2000
                    })
                }
            },
            // //获取父级id
            // getPidArr(list, id) {
            //     let arr = []
            //     let map = (l, i) => {
            //         l.forEach(item => {
            //             if (item.id === i) {
            //                 arr.push(i)
            //                 map(list, item.pid)
            //             } else if (item.subMenus) {
            //                 map(item.subMenus, i)
            //             }
            //             return
            //         })
            //     }
            //     map(list, id)
            //     return arr.reverse()
            // },
            //获取父级name
            getPidName(list, id) {
                let name = ''
                let map = (l, i) => {
                    l.forEach(item => {
                        if (item.id === i) {
                            name = item.name
                        } else if (item.subMenus) {
                            map(item.subMenus, i)
                        }
                        return
                    })
                }
                map(list, id)
                return name
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
            async addOrUpdateMenu(data) {
                let formData = {...data};
                let res;
                this.dialogSubmitLoading = true;
                if (this.actionType === 'create') {
                    res = await this.$service.addMenu(formData);
                } else if (this.actionType === 'update') {
                    res = await this.$service.updateMenu(formData);
                }
                this.dialogSubmitLoading = false;
                if (res.code === 20000) {
                    this.hideDialog();
                    this.createLoad();
                } else {
                    this.error = res.message || true;
                }
            },
            //删除
            deleteMenu(row) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(async () => {
                    const res = await this.$service.deleteMenu({
                        id: row.id
                    });
                    if (res.code === 20000) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '删除成功',
                        });
                        this.createLoad()
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: res.message ? res.message : '删除失败',
                        })
                    }
                }).catch(() => {
                });
            },
            async createLoad() {
                const res = await this.$service.getMenuTree({})
                if (res.code === 20000) {
                    this.firstLevelMenuList = res.data;
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
            }
        },
        created() {
            this.createLoad()
        },
        mounted() {
        },
        computed: {},
        components: {
            MenuDialog,
        }
    }
</script>
<style scoped>
</style>
