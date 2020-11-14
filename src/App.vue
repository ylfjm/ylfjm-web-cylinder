<template>
    <div id="app">
        <!--<el-container v-if="!$route.path.includes('/login.html')" class="container-main">
            <el-header class="container-header">
                <my_header></my_header>
            </el-header>
            <el-main class="container-body">
                <router-view></router-view>
            </el-main>
        </el-container>
        <router-view name="login"></router-view>-->
        <div v-if="!$route.path.includes('/login.html')">
            <div class="container-header">
                <Header></Header>
            </div>
            <div class="container-main">
                <router-view></router-view>
            </div>
        </div>
        <router-view name="login"></router-view>
    </div>
</template>

<script>
    import Header from './components/layout/Header.vue'

    export default {
        name: 'App',
        data() {
            return {
                activeIndex: '1'
            }
        },
        components: {
            Header
        }
    }
</script>
<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        margin: 0;
        padding: 0;
        height: 100%;
    }
</style>