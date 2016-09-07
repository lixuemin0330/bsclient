 /**
  * 启动脚本加载
  * @module main
  * @dateTime 2016-01-06
  * @author lixuemin
  */
require.config({
    baseUrl: 'leautoJs/components',
    paths: {
        //外部框架
        jquery: '../../jQuery/jquery',
        bootstrap: '../../bootstrap/js/bootstrap.min',
        semanticUI:'../../SemanticUI/js/semantic.min',
        ExtBaseDebug: '../../ext-3.4.0/adapter/ext/ext-base-debug',
        extAll: '../../ext/ext-all',
        ext: '../../ext-3.4.0-examples-link/examples',
        TabCloseMenu: '../../ext/examples/ux/TabCloseMenu',
        zh_CN_Ext: '../../ext-3.4.0/src/locale/ext-lang-zh_CN',
        //ext框架自定义修改文件
        ext4Fix: '../../ext-patch/ext4Fix',
        //框架外工具
        publicUtils: '../publicUtils',
        //主页面
        mainFrame: '../frame/mainFrame',
        //通讯层框架
        AOP: '../frame/AOP',
        //服务层框架
        bindEvent: '../frame/bindEvent',
        serviceManager: '../frame/serviceManager',
        //展示层框架
        initComponent: '../frame/initComponent',
        //框架组件控制
        componentController: '../frame/componentController',
        //通讯层组件
        jqueryAjax: 'communication/jqueryAjax',
        //服务层组件
        dataAdapter: 'service/dataAdapter',
        validater: 'service/validater',
        safeValidater: 'service/safeValidater',
        asyncInfo: 'service/asyncInfo',
        messageProcess: 'service/messageProcess',
        sendRequest: 'service/sendRequest',
        //展示层组件
        ExtComponent: 'UI/Ext/ExtComponent',
        TextField: 'UI/Ext/TextField',
        TreePanel: 'UI/Ext/TreePanel',
        Container: 'UI/Ext/Container',
        Panel: 'UI/Ext/Panel',
        BorderPanel: 'UI/Ext/BorderPanel',
        NorthPanel: 'UI/Ext/NorthPanel',
        TabPanel: 'UI/Ext/TabPanel',
        StatusPanel: 'UI/Ext/StatusPanel',
        Viewport: 'UI/Ext/Viewport',
        TSPPanel: 'UI/Ext/TSPPanel',
        QueryFormPanel: 'UI/Ext/QueryFormPanel',
        NorthPanel: 'UI/Ext/NorthPanel',
        CenterPanel: 'UI/Ext/CenterPanel',
        GridPanel: 'UI/Ext/GridPanel',
        QueryGridPanel: 'UI/Ext/QueryGridPanel',

        OriginalComponent: 'UI/original/OriginalComponent',
        Div: 'UI/original/Div',
        Button: 'UI/original/Button',
        Input: 'UI/original/Input',

        frame: 'UI/bootstrap/frame',
        menu : 'UI/bootstrap/menu',
        bootstrapContainer: 'UI/bootstrap/container',    
        statusBar : 'UI/bootstrap/statusBar',
        uiTable: 'UI/bootstrap/uiTable',

        uiButtons: 'UI/semanticUI/uiButtons',
        uiModal: 'UI/semanticUI/uiModal',
        uiButton: 'UI/semanticUI/uiButton' 
    },
    map: {
      '*': {
        'css': '../../../../requireJS/css'
      }
    },
    shim: {
        'bootstrap': ['jquery', 'css!../../../../bootstrap/css/bootstrap'],
        'extAll': ['ExtBaseDebug', 'css!../../../../ext-3.4.0/resources/css/ext-all', 'css!../../../../ext-3.4.0/resources/css/ext-patch', 'css!../../../../css/icon'],
        'ext': ['extAll'],
        'ext4Fix': ['ext'],
        'menu': ['css!../../../../css/style'],
        'TabCloseMenu': ['ext4Fix'],
        'zh_CN_Ext': ['TabCloseMenu', 'css!../../../../css/public'],
        'semanticUI' : ['jquery','css!../../SemanticUI/css/semantic.css','css!../../css/uiStyle.css']
    }   
});

require(['mainFrame', 'zh_CN_Ext'], function(mainFrame) {
    mainFrame.createComponents();
});