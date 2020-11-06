<template>
    <a @click="handleClick" :class="active ? 'btn-link btn-link-active' : 'btn-link'">
        <i class="el-icon-search"></i> {{btnText}}
    </a>
</template>

<script>
    export default {
        name: "CustomLinkButton",
        data() {
            return {}
        },
        props: {
            btnText: {
                type: String,
                default: '搜索'
            },
            active: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            handleClick() {
                this.$emit('backFunc', {});
            }
        },
    }
</script>

<style scoped>
    .el-icon-search {
        font-weight: bold;
    }

    .btn-link {
        position: relative;
        cursor: pointer;
        box-shadow: none;
        display: inline-block;
        padding: 8px 12px;
        border-radius: 4px;
    }

    .btn-link:hover {
        background: rgba(0, 0, 0, .1);
    }

    .btn-link-active {
        font-weight: 700;
        color: #0c64eb;
    }

    .btn-link-active::before {
        position: absolute;
        bottom: -14px;
        left: 40%;
        width: 0;
        height: 0;
        content: ' ';
        border-color: transparent transparent #fff transparent;
        border-style: solid;
        border-width: 0 10px 10px 10px;
    }
</style>