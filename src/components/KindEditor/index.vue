<template>
    <div class="kindeditor">
        <textarea :id="id" name="content">{{ outContent }}</textarea>
    </div>
</template>

<script>
    // 以下四个配置文件见下文
    import otherConfig from "./config/otherConfig";

    export default {
        name: 'KindEditor',
        data() {
            return {
                editor: null,
                outContent: this.content
            }
        },
        props: {
            content: {
                type: String,
                default: ''
            },
            id: {
                type: String,
                required: true
            },
            ...otherConfig
        },
        watch: {
            content(val) {
                this.editor && val !== this.outContent && this.editor.html(val)
            },
            outContent(val) {
                // this.$emit('update:content', val);
                this.$emit('onContentChange', val);
            }
        },
        mounted() {
            let _this = this;
            _this.editor = KindEditor.create('#' + this.id, {
                width: _this.width,
                height: _this.height,
                minWidth: _this.minWidth,
                minHeight: _this.minHeight,
                items: _this.items,
                noDisableItems: _this.noDisableItems,
                filterMode: _this.filterMode,
                htmlTags: _this.htmlTags,
                wellFormatMode: _this.wellFormatMode,
                resizeType: _this.resizeType,
                themeType: _this.themeType,
                langType: _this.langType,
                designMode: _this.designMode,
                fullscreenMode: _this.fullscreenMode,
                basePath: _this.basePath,
                themesPath: _this.cssPath,
                pluginsPath: _this.pluginsPath,
                langPath: _this.langPath,
                minChangeSize: _this.minChangeSize,
                loadStyleMode: _this.loadStyleMode,
                urlType: _this.urlType,
                newlineTag: _this.newlineTag,
                pasteType: _this.pasteType,
                dialogAlignType: _this.dialogAlignType,
                shadowMode: _this.shadowMode,
                zIndex: _this.zIndex,
                useContextmenu: _this.useContextmenu,
                syncType: _this.syncType,
                indentChar: _this.indentChar,
                cssPath: _this.cssPath,
                cssData: _this.cssData,
                bodyClass: _this.bodyClass,
                colorTable: _this.colorTable,
                afterCreate: _this.afterCreate,
                afterChange: function () {
                    // _this.afterChange;
                    _this.outContent = this.html()
                },
                afterTab: _this.afterTab,
                // afterFocus: _this.afterFocus,
                // afterBlur: _this.afterBlur,
                afterFocus: function () {//编辑器聚焦(focus)时执行的回调函数。
                    let _html = this.html();
                    this.edit.iframe[0].contentDocument.firstChild.lastChild.style.display = "none";
                    let _kecontainer = document.getElementsByClassName("ke-container")[0];
                    _kecontainer.classList.add("ke-container-focus")
                },
                afterBlur: function () {//编辑器失去焦点(blur)时执行的回调函数。
                    let _html = this.html();
                    if (_html !== '') {
                        this.edit.iframe[0].contentDocument.firstChild.lastChild.style.display = "none";
                    } else {
                        this.edit.iframe[0].contentDocument.firstChild.lastChild.style.display = "block";
                    }
                    let _kecontainer = document.getElementsByClassName("ke-container")[0];
                    _kecontainer.classList.remove("ke-container-focus")
                },
                afterUpload: _this.afterUpload,
                uploadJson: _this.uploadJson,
                fileManagerJson: _this.fileManagerJson,
                allowPreviewEmoticons: _this.allowPreviewEmoticons,
                allowImageUpload: _this.allowImageUpload,
                allowFlashUpload: _this.allowFlashUpload,
                allowMediaUpload: _this.allowMediaUpload,
                allowFileUpload: _this.allowFileUpload,
                allowFileManager: _this.allowFileManager,
                fontSizeTable: _this.fontSizeTable,
                imageTabIndex: _this.imageTabIndex,
                formatUploadUrl: _this.formatUploadUrl,
                fullscreenShortcut: _this.fullscreenShortcut,
                extraFileUploadParams: _this.extraFileUploadParams,
                filePostName: _this.filePostName,
                fillDescAfterUploadImage: _this.fillDescAfterUploadImage,
                afterSelectFile: _this.afterSelectFile,
                pagebreakHtml: _this.pagebreakHtml,
                allowImageRemote: _this.allowImageRemote,
                autoHeightMode: _this.autoHeightMode,
                fixToolBar: _this.fixToolBar,
            });

            let span = '<span class="kindeditor-placeholder" style="width:auto;color:rgb(136,136,136);padding:8px 8px 8px 8px;background-color:transparent;position:absolute;top:0;z-index:10;resize:none;font-size:14px;pointer-events:none;display:block;">可以在编辑器直接粘贴图片。</span>';
            KindEditor(span).appendTo(_this.editor.edit.iframe[0].contentDocument.firstChild)
        }
    }
</script>

<style scoped>
    /deep/ .ke-container-focus {
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(20,92,205,.6) !important;
        border-color: #0c64eb !important;
    }
</style>
