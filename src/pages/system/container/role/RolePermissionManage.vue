<template>
    <div class="container">
        <div style="margin-bottom: 10px; font-size: 16px;">
            角色::{{roleName}}
        </div>
        <div class="container-border">
            <div class="dp-table" style="font-weight: bold;">
                <div class="dp-table-cell text-center" style="width: 10%;">
                    <div>模块</div>
                </div>
                <div class="dp-table-cell text-center" style="width: 90%;">
                    <div>权限</div>
                </div>
            </div>
            <div v-for="menu in menuList">
                <div v-if="menu.permissions && menu.permissions.length > 0">
                    <div class="dp-table">
                        <div class="dp-table-cell text-right" style="width: 10%; padding-right: 30px;">
                            <div>{{menu.name}}</div>
                        </div>
                        <div class="dp-table-cell text-left" style="width: 90%; padding-left: 30px;">
                            <el-checkbox-group v-model="checkedBox" @change="handleChecked">
                                <el-checkbox v-for="perm in menu.permissions" :label="perm.id" :key="perm.id" :checked="perm.have"
                                             style="width: 110px;">{{perm.name}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div v-if="menu.subMenus && menu.subMenus.length > 0">
                    <div v-for="subMenu in menu.subMenus">
                        <div class="dp-table">
                            <div class="dp-table-cell text-right" style="width: 10%; padding-right: 30px;">
                                <div>{{menu.name + ' > ' + subMenu.name}}</div>
                            </div>
                            <div class="dp-table-cell text-left" style="width: 90%; padding-left: 30px;">
                                <el-checkbox-group v-model="checkedBox" @change="handleChecked">
                                    <el-checkbox v-for="perm in subMenu.permissions" :label="perm.id" :key="perm.id" :checked="perm.have"
                                                 style="width: 200px;">
                                        {{perm.name}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dp-table">
                <div class="dp-table-cell text-right" style="width: 10%; padding-right: 30px;">
                    <div>全选</div>
                </div>
                <div class="dp-table-cell text-left" style="width: 90%; padding: 10px 30px;">
                    <el-button type="primary" @click="currentSubmit" :loading="submitLoading" style="width: 100px;">保 存
                    </el-button>
                    <router-link :to="'/role.html'">
                        <el-button style="margin-left: 30px; width: 100px;">返 回</el-button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RolePermissionManagePage",
        data() {
            return {
                roleId: '',
                roleName: '',
                menuList: [],
                checkedBox: [],
                submitLoading: false,
            }
        },
        methods: {
            handleChecked(value) {
            },
            async initData() {
                this.roleId = this.$route.query.roleId;
                this.roleName = this.$route.query.roleName;
                if (this.roleId) {
                    const res = await this.$service.getMenuWithPermissionByRoleId({roleId: this.roleId});
                    if (res.code === 20000) {
                        this.menuList = res.data;
                    }
                }
            },
            async currentSubmit() {
                this.submitLoading = true;
                const res = await this.$service.updateRolePermission({
                    id: this.roleId,
                    permissionIds: this.checkedBox
                });
                this.submitLoading = false;
                if (res.code === 20000) {
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: '维护成功',
                    });
                    this.$router.push('/role.html')
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '维护失败',
                    })
                }
            },
        },
        mounted() {
            this.initData();
        },
    }
</script>

<style scoped>
    .container {
        background-color: #fff;
        margin: 0 100px;
        padding: 20px;
        border-radius: 4px;
    }

    .container-border {
        border-top: 1px solid #efefef;
        border-right: 1px solid #efefef;
    }

    .dp-table-cell {
        border-left: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        line-height: 32px;
        vertical-align: middle;
        text-align: center;
        font-size: 14px;
    }
</style>
