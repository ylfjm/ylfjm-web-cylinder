import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapse: false,
        menuList: localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : [],
        activeMenuList: sessionStorage.getItem('activeMenuList') ? JSON.parse(sessionStorage.getItem('activeMenuList')) : [],
        admin: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : {},
        mainHeight: 900
    },
    getters: {},
    mutations: {
        //菜单展开
        toggleCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        //设置menus
        setMenuList(state, payload) {
            state.menuList = payload
        },
        setAdmin(state, payload) {
            state.admin = payload
        },
        saveMainHeight(state, payload) {
            state.mainHeight = payload - 122
        }
    },
    actions: {},
    modules: {common}
})
