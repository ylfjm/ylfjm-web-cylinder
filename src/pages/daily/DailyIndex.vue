<template>
    <div class="container">
        <div class="panel">
            <div class="panel-body">
                <template v-for="(item, idx) in tableList">
                    <div style="position:relative;padding-left:180px;margin-top:20px;">
                        <div :class="idx === 0 ? 'dynamic-date border-blue' : 'dynamic-date border-eee'">
                            {{item.date}}
                        </div>
                        <div :class="idx === 0 ? 'border-blue' : 'border-eee'" style="padding: 15px 30px;">
                            <div v-for="(p, i) in item.projectList">
                                <div class="daily-project-name">{{getNumber1(i) + p.name}}</div>
                                <div class="daily-project-body">
                                    <div v-for="(c, j) in p.contentList">
                                        <div class="daily-content">{{getNumber2(j) + c.content + getPostName(c.postCode) + '；'}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="pagination_box">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    class="pagination_content"
                    :current-page="formSearch.pageNum"
                    :page-size="formSearch.pageSize"
                    :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DailyIndex",
        data() {
            return {
                formSearch: {
                    pageNum: 1,
                    pageSize: 2
                },
                total: 0,
                pages: 0,
                tableList: [],
                searchLoading: false,
            }
        },
        methods: {
            handleCurrentChange(pageNum) {
                this.formSearch.pageNum = pageNum;
                this.searchCommon()
            },
            handleSizeChange(pageSize) {
                this.formSearch.pageNum = 1;
                this.formSearch.pageSize = pageSize;
                this.searchCommon()
            },
            async searchCommon() {
                this.searchLoading = true;
                const res = await this.$service.getDailyShowList(this.formSearch);
                this.searchLoading = false;
                if (res.code === 20000) {
                    this.formSearch.pageNum = res.data.pageNum;
                    this.formSearch.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                    this.tableList = res.data.result || [];
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: res.message ? res.message : '搜索失败',
                    })
                }
            },
            getNumber1(index) {
                return '' + (index + 1) + '.';
            },
            getNumber2(index) {
                return '（' + (index + 1) + '）';
            },
            getPostName(code) {
                switch (code) {
                    case 'po':
                        return '（产品）';
                    case 'ui':
                        return '（UI）';
                    case 'web':
                        return '（前端）';
                    case 'android':
                        return '（安卓）';
                    case 'ios':
                        return '（苹果）';
                    case 'dev':
                        return '（后端）';
                    case 'test':
                        return '（测试）';
                    case 'pm':
                        return '（项目经理）';
                    case 'td':
                        return '（研发经理）';
                    case 'others':
                        return '（其他）';
                }
            },
        },
        created() {
            this.searchCommon();
        },
    }
</script>

<style scoped>
    .panel {
        padding: 0 300px;
        margin-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .panel-body {
        margin: 20px 0;
    }

    .daily-project-name {
        font-size: 18px;
        font-weight: bold;
    }

    .daily-project-body {
        margin: 10px 30px 10px 30px;
    }

    .daily-content {
        font-size: 15px;
    }

    .dynamic-date {
        position: absolute;
        left: 0;
        top: 0;
        width: 150px;
        font-size: 16px;
        border: 2px solid #00a9fc;
        border-radius: 4px;
        padding-left: 30px;
        height: 58px;
        line-height: 54px;
    }

    .dynamic-date:before {
        content: ' ';
        display: block;
        position: absolute;
        right: -32px;
        top: 26px;
        height: 2px;
        width: 30px;
        background-color: #eee;
    }

    .border-blue {
        border: 2px solid #00a9fc;
        border-radius: 4px;
    }

    .border-blue:before {
        background-color: #00a9fc;
    }

    .border-eee {
        border: 2px solid #eee;
        border-radius: 4px;
    }
</style>
