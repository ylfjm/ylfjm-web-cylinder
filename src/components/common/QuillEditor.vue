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
        </quill-editor>
    </div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor";
    // import {ImageResize} from 'quill-image-resize-module'
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    // Quill.register('modules/imageResize', ImageResize);
    export default {
        name: "QuillEditor",
        data() {
            return {
                content: this.defaultContent,
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],     //引用，代码块
                            [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
                            [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
                            [{'script': 'sub'}, {'script': 'super'}],   // 上下标
                            [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
                            [{'direction': 'rtl'}],             // 文本方向
                            [{'size': ['small', false, 'large', 'huge']}], // 字体大小
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题
                            [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
                            [{'font': []}],     //字体
                            [{'align': []}],    //对齐方式
                            ['clean'],    //清除字体样式
                            ['image', 'video']    //上传图片、上传视频
                        ]
                    }
                }
            }
        },
        props: {
            defaultContent: String,
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
        },
        computed: {
            /*editor() {
                return this.$refs.myQuillEditor.quill;
            },*/
        },
        mounted() {
            // this.addQuillTitle();
        },
        components: {
            quillEditor
        },
        watch: {
            defaultContent: function (n) {
                console.log(44444444444)
                this.content = n
            }
        }
    }
</script>

<style scoped>
    /*.edit_container {
        min-height: 290px;
    }

    .quill-editor {
        height: 100%;
    }*/
</style>