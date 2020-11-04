<template>
    <div>
        <ul class="pager">
            <li>
                <div class="pager-label">共 <strong>{{total}}</strong> 项</div>
            </li>
            <li>
                <div class="pager-size-menu">
                    <a class="dropdown-toggle" style="border-radius: 2px;">每页 <strong>10</strong> 项<span class="caret"></span></a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                total: 0,
            }
        },
    }
</script>

<style scoped>
    .pager {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 4;
        height: 40px;
        padding: 0 5px 0 10px;
        margin: 0;
        background: #fff;
        opacity: 1;
        transition: opacity .4s;
        display: inline-block;
    }

    .pager > li {
        display: inline;
    }

    .pager > li > .pager-label {
        position: relative;
        color: #838a9d;
        background: 0;
        padding: 2px;
        line-height: 20px;
        text-decoration: none;
        border: 1px solid transparent;
    }

    .pager > li > div {
        float: left;
    }
    .pager > li > .pager-size-menu {
        margin: 0 5px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }
    .pager > li > .pager-size-menu .dropdown-toggle {
        padding: 1px;
        margin: 2px 0;
        color: #838a9d;
        background: 0;
        line-height: 20px;
        cursor: pointer;
        user-select: none;
        border: 1px solid transparent;
        text-transform: none;
        display: inline-block;
        vertical-align: middle;
    }
</style>