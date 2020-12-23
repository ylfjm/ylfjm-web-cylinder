<template>
    <div class="">
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
                this.editor && val !== this.outContent && this.editor.html(val);
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
                langType: _this.langType,
                themeType: _this.themeType,
                fontSizeTable: _this.fontSizeTable,
                htmlTags: _this.htmlTags,
                items: _this.items,
                // loadStyleMode: _this.loadStyleMode,
                noDisableItems: _this.noDisableItems,
                filterMode: _this.filterMode,
                wellFormatMode: _this.wellFormatMode,
                resizeType: _this.resizeType,
                designMode: _this.designMode,
                fullscreenMode: _this.fullscreenMode,
                basePath: _this.basePath,
                themesPath: _this.cssPath,
                pluginsPath: _this.pluginsPath,
                langPath: _this.langPath,
                minChangeSize: _this.minChangeSize,
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
                // afterCreate: _this.afterCreate,
                afterCreate: function () {
                    let _edit = this;
                    KindEditor(this.edit.doc.body).bind('paste', function (e) {
                        //处理IE11,Chrome粘贴图片上传
                        function doPasteImg() {
                            let file = null;
                            if (window.clipboardData) {//ie
                                if (window.clipboardData.files && window.clipboardData.files.length) {//IE11
                                    file = window.clipboardData.files[0];
                                } else if (!window.clipboardData.getData("text") && !window.clipboardData.getData("url")) {
                                    alert("不能粘贴文件或图片,请使用IE11或者Chrome浏览器,或使用上传功能");
                                    return true;
                                }
                            } else {
                                if (e.event.clipboardData.items) {//chrome
                                    for (let i = 0; i < e.event.clipboardData.items.length; i++) {
                                        if (e.event.clipboardData.items[i].kind === "file") {
                                            file = e.event.clipboardData.items[i];
                                            break;
                                        }
                                    }
                                }
                                if (file == null) {
                                    if (!e.event.clipboardData.getData("url") && !e.event.clipboardData.getData("text")) {
                                        alert("不能粘贴文件或图片,请使用IE11或者Chrome浏览器,或使用上传功能");
                                        return true;
                                    }
                                }
                            }
                            if (file) {
                                if (!KindEditor.undef(self.allowImageUpload, true)) {
                                    alert("编辑器禁止上传图片,请与有关人员联系!");
                                    return true;
                                }
                                //获取File Blob
                                let blb;
                                if (file.getAsFile) {//Chrome
                                    blb = file.getAsFile();
                                    if (blb.size === 0) {
                                        alert("不能获取剪切板中的" + (file.type.indexOf("image/") === 0 ? "图像" : "文件")
                                            + "\n如果是从OutLook中复制的,请换其他程序,如Word");
                                        return true;
                                    }
                                    sendfile(blb, file.type);
                                } else {
                                    let fr = new FileReader();
                                    if (fr.readAsArrayBuffer) {//ie
                                        fr.onloadend = function (evt) {
                                            blb = evt.target.result;
                                            sendfile(blb, file.type);
                                        };
                                        fr.readAsArrayBuffer(file);
                                    }
                                }
                                return true;
                            }
                        }

                        async function sendfile(b, t) {
                            let formData = new FormData();
                            // let isImg = t.indexOf("image/") === 0;
                            //formData.append('imgFile', file,"untitled." + t.split('/')[1]);
                            //formData.append('imgFile', b);
                            let myBlob = new Blob([b], {"type": t});
                            formData.append('imgFile', myBlob, "untitled." + t.split('/')[1]);
                            //formData.append('imgFile', b);
                            // formData.append('dir', isImg ? 'image' : 'file');
                            const res = await _this.$service.uploadFile(formData);
                            if (res.code === 20000) {
                                console.log(res.data)
                                let imgTag = '<img src="' + res.data + '" border="0"/>';
                                _edit.insertHtml(imgTag);
                            } else {
                                _this.$message({
                                    message: '上传失败',
                                    type: 'error',
                                    duration: 2000
                                });
                            }
                        }

                        if (doPasteImg()) {
                            e.stop();
                        }
                    });
                },
                afterChange: function () {
                    _this.outContent = this.html();
                    if (!this.isEmpty()) {
                        this.edit.keplaceholder.css('display', 'none');
                    }
                },
                afterTab: _this.afterTab,
                afterFocus: function () {//编辑器聚焦(focus)时执行的回调函数。
                    this.edit.keplaceholder.css('display', 'none');
                    this.edit.srcElement.parent().first().addClass('ke-container-focus');
                },
                afterBlur: function () {//编辑器失去焦点(blur)时执行的回调函数。
                    if (this.isEmpty()) {
                        this.edit.keplaceholder.css('display', 'block');
                        this.html(null);
                    }
                    this.edit.srcElement.parent().first().removeClass('ke-container-focus');
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
        },
    }
</script>

<style scoped>
    /deep/ .ke-container-focus {
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(20, 92, 205, .6) !important;
        border-color: #0000FF !important;
    }
</style>
