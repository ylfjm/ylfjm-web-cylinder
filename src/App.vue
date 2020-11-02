<template>
    <div id="app">
        <el-container
                v-if="!$route.path.includes('/login')"
                class="container-el"
                direction="vertical"
        >
            <el-header>
                <Header></Header>
            </el-header>
            <el-container style="overflow: hidden;">
            </el-container>
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
        computed: {
        },
        mounted() {
        },
        components: {
            Header
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
