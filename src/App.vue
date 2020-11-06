<template>
    <div id="app">
        <el-container v-if="!$route.path.includes('/login.html')" class="container-main">
            <el-header class="container-header">
                <my_header></my_header>
            </el-header>
            <el-main class="container-body">
                <router-view></router-view>
            </el-main>
        </el-container>
        <router-view name="login"></router-view>
    </div>
</template>

<script>
    import my_header from './components/layout/Header.vue'

    export default {
        name: 'App',
        data() {
            return {
                activeIndex: '1'
            }
        },
        components: {
            my_header
        }
    }
</script>