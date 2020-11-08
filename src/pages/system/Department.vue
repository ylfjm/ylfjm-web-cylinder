<template>
    <div class="container">
        <div class="search_box">
            <CustomLinkButton @backFunc="changeSearchBox" :btnText="'搜索'" :active="searchBoxVisible"></CustomLinkButton>
            <el-button @click="showCreateDialog" type="primary" icon="el-icon-plus" style="float: right;">
                新增部门
            </el-button>
        </div>
        <div class="search-box-content" v-show="searchBoxVisible">
            <el-form :inline="true" :model="formSearch" ref="formSearch">
                <el-form-item label="部门" prop="name" class="specialWidth50">
                    <el-input
                            v-model="formSearch.name"
                            placeholder="请输入部门"
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
                        min-width="130"
                        show-overflow-tooltip
                        label="部门"
                ></el-table-column>
                <el-table-column
                        prop="accountCount"
                        min-width="130"
                        show-overflow-tooltip
                        label="账号数量"
                >
                    <template slot-scope="scope">
                        <div v-show="scope.row.accountCount === 0">{{ scope.row.accountCount}}</div>
                        <router-link
                                v-show="scope.row.accountCount > 0"
                                :to="{name:'admin', path:'/admin', params:{deptId: scope.row.id}}"
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
                            <el-button type="danger" size="mini" @click="deleteDepartment(scope.row)">删除</el-button>
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
        <CreateDialogForm
                width="40%"
                title="新增部门"
                :visible="createDialogVisible"
                :form="form"
                :hideDialog="hideCreateDialog"
                @changeFieldValue="changeFieldValue"
                :submit="addDepartment"
                :columns="columns"
                :loading="createDepartmentLoading"
                :error="error"
        />
        <UpdateDialogForm
                width="40%"
                title="修改部门"
                :visible="updateDialogVisible"
                :hideDialog="hideUpdateDialog"
                @changeFieldValue="changeFieldValue"
                :submit="updateDepartment"
                :updateItem="updateItem"
                :columns="columns"
                :loading="updateDepartmentLoading"
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
        name: 'departmentPage',
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
                createDepartmentLoading: false,
                updateDialogVisible: false,
                updateDepartmentLoading: false,
                updateItem: {},
                form: {
                    name: '',
                    remark: ''
                },
                columns: [
                    {
                        label: '部门',
                        fieldName: 'name',
                        type: 'input',
                        rules: [{required: true, message: '请填写部门', trigger: 'blur'}]
                    },
                    {
                        label: '描述',
                        fieldName: 'remark',
                        type: 'textarea',
                        rules: []
                    }
                ],
                searchLoading: false,
                autoHeight: 500
            }
        },
        methods: {
            changeSearchBox() {
                this.searchBoxVisible = !this.searchBoxVisible
            },
            //新增修改弹窗回传值
            changeFieldValue(data) {
                this[data.type][data.fieldName] = data.value
            },
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
                const res = await this.$service.getDepartmentList(formData)
                this.searchLoading = false
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum
                    this.formSearch.pageSize = res.data.pageSize
                    this.total = res.data.total
                    this.pages = res.data.pages
                    this.tableList = res.data.result || []
                } else {
                    // console.log("123---"+JSON.stringify(res))
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
            async addDepartment(data) {
                this.createDepartmentLoading = true
                const res = await this.$service.addDepartment({
                    ...data
                })
                this.createDepartmentLoading = false
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
            async updateDepartment(data) {
                this.updateDepartmentLoading = true
                const res = await this.$service.updateDepartment({
                    ...data
                })
                this.updateDepartmentLoading = false
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
            deleteDepartment(row) {
                this.$confirm('您选择了1条数据，是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$service.deleteDepartment({
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
            CreateDialogForm,
            UpdateDialogForm,
            CustomLinkButton,
        }
    }
</script>
<style scoped></style>
