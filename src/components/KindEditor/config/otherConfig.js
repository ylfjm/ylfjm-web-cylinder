import items from "./items";
import htmlTags from "./htmlTags";
import fontSizeTable from "./fontSizeTable";
// 其他非主要配置项
const otherConfig = {
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '200'
    },
    minWidth: {
        type: Number,
        default: 100
    },
    minHeight: {
        type: Number,
        default: 100
    },
    langType: {
        type: String,
        default: 'zh-CN'
    },
    themeType: {
        type: String,
        default: 'default'
    },
    fontSizeTable: {
        type: Array,
        default: function () {
            return [...fontSizeTable]
        }
    },
    htmlTags: {
        type: Object,
        default: function () {
            return {...htmlTags}
        }
    },
    items: {
        type: Array,
        default: function () {
            return [...items]
        }
    },
    // loadStyleMode: {
    //     type: Boolean,
    //     default: true
    // },
    noDisableItems: {
        type: Array,
        default: function () {
            return ["source", "fullscreen"];
        }
    },
    filterMode: {
        type: Boolean,
        default: true
    },
    wellFormatMode: {
        type: Boolean,
        default: true
    },
    resizeType: {
        type: Number,
        default: 1//2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
    },
    designMode: {
        type: Boolean,
        default: true
    },
    fullscreenMode: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String
    },
    themesPath: {
        type: String
    },
    pluginsPath: {
        type: String,
        default: ""
    },
    langPath: {
        type: String
    },
    minChangeSize: {
        type: Number,
        default: 5
    },
    urlType: {
        type: String,
        default: ""
    },
    newlineTag: {
        type: String,
        default: "br"//设置回车换行标签，可设置”p”、”br”。
    },
    pasteType: {
        type: Number,
        default: 2//设置粘贴类型，0:禁止粘贴, 1:纯文本粘贴, 2:HTML粘贴
    },
    dialogAlignType: {
        type: String,
        default: "page"
    },
    shadowMode: {
        type: Boolean,
        default: true
    },
    zIndex: {
        type: Number,
        default: 811213
    },
    useContextmenu: {
        type: Boolean,
        default: true//true时使用右键菜单，false时屏蔽右键菜单。
    },
    syncType: {
        type: String,
        default: ""//同步数据的方式，可设置”“、”form”，值为form时提交form时自动同步，空时不会自动同步。
    },
    indentChar: {
        type: String,
        default: "\t"
    },
    cssPath: {
        type: [String, Array]
    },
    cssData: {
        type: String,
        default: "body {font-family: \"Helvetica Neue\",Helvetica,Arial,Tahoma,'Microsoft Yahei','PingFang SC','Hiragino Sans GB','WenQuanYi Micro Hei',sans-serif; font-size:14px;padding:8px;}"
    },
    bodyClass: {
        type: String,
        default: 'ke-content'
    },
    colorTable: {
        type: Array,
        default: function () {
            return [
                ['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
                ['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
                ['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
                ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
            ];
        }

    },
    afterCreate: {
        type: Function//设置编辑器创建后执行的回调函数。
    },
    afterChange: {
        type: Function//编辑器内容发生变化后执行的回调函数。
    },
    afterTab: {
        type: Function//按下TAB键后执行的的回调函数。
    },
    afterUpload: {
        type: Function
    },
    uploadJson: {
        type: String
    },
    fileManagerJson: {
        type: String
    },
    allowPreviewEmoticons: {
        type: Boolean,
        default: true
    },
    allowImageUpload: {
        type: Boolean,
        default: true
    },
    allowFlashUpload: {
        type: Boolean,
        default: true
    },
    allowMediaUpload: {
        type: Boolean,
        default: true
    },
    allowFileUpload: {
        type: Boolean,
        default: true
    },
    allowFileManager: {
        type: Boolean,
        default: false
    },
    imageTabIndex: {
        type: Number,
        default: 0
    },
    formatUploadUrl: {
        type: Boolean,
        default: true
    },
    fullscreenShortcut: {
        type: Boolean,
        default: false
    },
    extraFileUploadParams: {
        type: Object,
        default: function () {
            return {};
        }
    },
    filePostName: {
        type: String,
        default: "imgFile"
    },
    fillDescAfterUploadImage: {
        type: Boolean,
        default: false
    },
    afterSelectFile: {
        type: Function
    },
    pagebreakHtml: {
        type: String,//可指定分页符HTML。
        default: '<hr style="page-break-after: always;" class="ke-pagebreak"/>'
    },
    allowImageRemote: {
        type: Boolean,
        default: true
    },
    autoHeightMode: {
        type: Boolean,
        default: false
    },
    fixToolBar: {
        type: Boolean,
        default: false
    }
};

export default otherConfig;
