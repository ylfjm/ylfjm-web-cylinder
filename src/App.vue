<template>
    <div id="app">
        <el-container v-if="!$route.path.includes('/login')" class="container-main">
            <el-header class="container-header">
                <Header></Header>
            </el-header>
            <el-main class="container-body">
                <router-view></router-view>
            </el-main>
        </el-container>
        <router-view name="login"></router-view>
    </div>
</template>

<script>
    import Header from '@/components/layout/Header.vue'

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

<style scoped lang="stylus">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .container-header {
        margin: 0;
        padding: 0;
        height: 100px !important;
        line-height: 100px !important;
        box-shadow: 0 2px 2px 0 rgba(230, 230, 230, 1);
    }

    .container-main {
        min-width: 1200px;
    }
    .container-body div {
        margin: 0 auto;
    }
</style>