<template>
    <div class="container">
        <div class="container-border">
            <div class="dp-table">
                <div class="dp-table-cell text-right" style="width: 10%; padding-right: 30px;">
                    <div>菜单</div>
                </div>
                <div class="dp-table-cell text-left" style="width: 90%; padding-left: 30px;">
                    <el-checkbox-group v-model="checkedBox" @change="handleChecked">
                        <template v-for="menu in menuList">
                            <el-checkbox :label="menu.id" :key="menu.id" :checked="menu.have" style="width: 60px;">{{menu.name}}</el-checkbox>
                            <template v-if="menu.subMenus && menu.subMenus.length > 0">
                                <template v-for="subMenu in menu.subMenus">
                                    <el-checkbox :label="subMenu.id" :key="subMenu.id" :checked="subMenu.have" style="width: 60px;">{{subMenu.name}}
                                    </el-checkbox>
                                </template>
                            </template>
                        </template>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="dp-table">
                <div class="dp-table-cell text-right" style="width: 10%; padding-right: 30px;">
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
        name: "RoleMenuManagePage",
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
                if (this.$route.params.id) {
                    this.roleId = this.$route.params.id;
                    const res = await this.$service.getMenuTree({roleId: this.roleId});
                    if (res.code === 20000) {
                        this.menuList = res.data;
                    }
                }
            },
            async currentSubmit() {
                this.submitLoading = true;
                const res = await this.$service.updateRoleMenu({
                    id: this.roleId,
                    menuIds: this.checkedBox
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
