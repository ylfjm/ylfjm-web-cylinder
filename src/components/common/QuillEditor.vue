<template>
    <div class="edit_container">
        <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @ready="onEditorReady($event)"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            <!--<div id="toolbar" slot="toolbar">
                &lt;!&ndash; Add a bold button &ndash;&gt;
                <button class="ql-bold" title="加粗">Bold</button>
                <button class="ql-italic" title="斜体">Italic</button>
                <button class="ql-underline" title="下划线">underline</button>
                <button class="ql-strike" title="删除线">strike</button>
                <button class="ql-blockquote" title="引用"></button>
                <button class="ql-code-block" title="代码"></button>
                <button class="ql-header" value="1" title="标题1"></button>
                <button class="ql-header" value="2" title="标题2"></button>
                &lt;!&ndash;Add list &ndash;&gt;
                <button class="ql-list" value="ordered" title="有序列表"></button>
                <button class="ql-list" value="bullet" title="无序列表"></button>
                &lt;!&ndash; Add font size dropdown &ndash;&gt;
                <select class="ql-header" title="段落格式">
                    <option selected>段落</option>
                    <option value="1">标题1</option>
                    <option value="2">标题2</option>
                    <option value="3">标题3</option>
                    <option value="4">标题4</option>
                    <option value="5">标题5</option>
                    <option value="6">标题6</option>
                </select>
                <select class="ql-size" title="字体大小">
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px" selected>16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                </select>
                <select class="ql-font" title="字体">
                    <option value="SimSun">宋体</option>
                    <option value="SimHei">黑体</option>
                    <option value="Microsoft-YaHei">微软雅黑</option>
                    <option value="KaiTi">楷体</option>
                    <option value="FangSong">仿宋</option>
                    <option value="Arial">Arial</option>
                </select>
                &lt;!&ndash; Add subscript and superscript buttons &ndash;&gt;
                <select class="ql-color" value="color" title="字体颜色"></select>
                <select class="ql-background" value="background" title="背景颜色"></select>
                <select class="ql-align" value="align" title="对齐"></select>
                <button class="ql-clean" title="还原"></button>
                &lt;!&ndash; You can also add your own &ndash;&gt;
            </div>-->
        </quill-editor>
    </div>
</template>

<script>
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.bubble.css';
    import {quillEditor} from "vue-quill-editor";

    export default {
        name: "QuillEditor",
        data() {
            return {
                content: this.editorContent,
                editorOption: {
                    placeholder: "请输入内容",
                    theme: "snow",
                    modules: {
                        // toolbar:"#toolbar"
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],     //引用，代码块
                            [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
                            [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
                            // [{'script': 'sub'}, {'script': 'super'}],   // 上下标
                            [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
                            // [{'direction': 'rtl'}],             // 文本方向
                            [{'size': ['small', false, 'large', 'huge']}], // 字体大小
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题
                            [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
                            [{'font': []}],     //字体
                            [{'align': []}],    //对齐方式
                            ['clean'],    //清除字体样式
                            // ['image', 'video']    //上传图片、上传视频
                            ['image']    //上传图片、上传视频
                        ],
                    }
                }
            }
        },
        props: {
            editorContent: String,
        },
        methods: {
            // 准备编辑器
            onEditorReady() {
            },
            // 失去焦点事件
            onEditorBlur() {
            },
            // 获得焦点事件
            onEditorFocus() {
            },
            // 内容改变事件
            onEditorChange(content) {
                this.$emit("change", content.html)
            },
            addQuillTitle() {
                const titleConfig = {
                    'ql-bold': '加粗',
                    'ql-color': '颜色',
                    'ql-font': '字体',
                    'ql-code': '插入代码',
                    'ql-italic': '斜体',
                    'ql-link': '添加链接',
                    'ql-background': '背景颜色',
                    'ql-size': '字体大小',
                    'ql-strike': '删除线',
                    'ql-script': '上标/下标',
                    'ql-underline': '下划线',
                    'ql-blockquote': '引用',
                    'ql-header': '标题',
                    'ql-indent': '缩进',
                    'ql-list': '列表',
                    'ql-align': '文本对齐',
                    'ql-direction': '文本方向',
                    'ql-code-block': '代码块',
                    'ql-formula': '公式',
                    'ql-image': '图片',
                    'ql-video': '视频',
                    'ql-clean': '清除字体样式'
                };
                const oToolBar = document.querySelector('.ql-toolbar');
                const aButton = oToolBar.querySelectorAll('button');
                const aSelect = oToolBar.querySelectorAll('select');
                aButton.forEach(function (item) {
                    if (item.className === 'ql-script') {
                        item.value === 'sub' ? item.title = '下标' : item.title = '上标'
                    } else if (item.className === 'ql-indent') {
                        item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进'
                    } else {
                        item.title = titleConfig[item.classList[0]]
                    }
                });
                aSelect.forEach(function (item) {
                    item.parentNode.title = titleConfig[item.classList[0]]
                })
            },
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        mounted() {
            this.addQuillTitle();
        },
        watch: {
            editorContent: function (n) {
                this.content = n
            }
        },
        components: {
            quillEditor
        },
    }
</script>

<style>
    /*.edit_container {
        min-height: 585px;
        height: 585px;
    }

    .edit_container /deep/ .quill-editor {
        min-height: 500px;
        height: 500px;
    }*/

    .ql-snow .ql-tooltip[data-mode="link"]::before {
        content: "请输入链接地址:";
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: "保存";
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode="video"]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: "14px";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
        content: "10px";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
        content: "18px";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
        content: "32px";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: "文本";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: "标题1";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: "标题2";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: "标题3";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: "标题4";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: "标题5";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: "标题6";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: "标准字体";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
        content: "衬线字体";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
        content: "等宽字体";
    }
</style>
