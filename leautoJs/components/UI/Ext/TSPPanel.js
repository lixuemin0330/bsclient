 /**
  * TSP主页面
  * @module TSPPanel
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'ExtComponent', 'publicUtils', 'serviceManager', 'TreePanel', 'TextField', 'NorthPanel', 'TabPanel', 'StatusPanel', 'BorderPanel', 'TabCloseMenu','GridPanel', 'QueryFormPanel', 'NorthPanel', 'CenterPanel', 'QueryGridPanel'], function(componentController, initComponent, ExtComponent, publicUtils, serviceManager) {
    function TSPPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(TSPPanel, ExtComponent);
    componentController.addProperties(TSPPanel.prototype, {
        /**
         * 菜单点击处理
         * @dateTime 2016-03-10
         * @param {Object} node 点击节点
         */
        onTopMenuClick : function(node) {
            var tabPanel = body.children.TSPPanel.tabPanel, tabPanelComponent;
            if (!body.children.TSPPanel.children) {
                body.children.TSPPanel.children = {};
                body.children.TSPPanel.children.tabPanel = {
                    obj: tabPanel
                };
            }
            tabPanelComponent = body.children.TSPPanel.children.tabPanel; 
            if (Ext.isEmpty(node.url)) {
                return;
            } else if (!tabPanelComponent.children) {
                tabPanelComponent.children = {};
            } else if (tabPanelComponent.children[node.id]) {
                tabPanel.activate(tabPanelComponent.children[node.id].obj);
                return;
            }
            var tabItem = new Ext.Container({
                closable: true,
                title : node.text,
                layout  : "fit",
                border  : false,
                id: node.id,
                listeners : {
                    beforedestroy: function(e){
                        delete tabPanelComponent.children[this.id];
                    }
                }
            });
            tabPanelComponent.children[node.id]= {
                obj: tabItem,
                id: node.id
            };
            var services = {
                serviceName : "sendRequest",
                filterList :{
                    "send" : ["validaterFilter","privateFilter"],
                    "receive" : ["validaterFilter"]                    
                }
            }
            var metaData = {
                url: node.url,
                method: "GET",
                async: true,
                tag: "tag1",
                modulename: "frame",
                operation: "init",
                tokenid: "11111111",
                type: "single",
                fn: initCallback
            };           
            var data = {};
            function initCallback(result) {
                if (result["success"]) {
                    var config = result["data"], tabItem = tabPanelComponent.children[node.id];
                    tabItem.itemConfig = config;
                    initComponent.addComponents(tabPanelComponent.children[node.id]);
                    tabPanel.add(tabItem.obj);
                    tabPanel.activate(tabItem.obj);       
                }
            }
            serviceManager.send(services, metaData, data);
        },
        /**
         * 添加菜单
         * @dateTime 2016-03-10
         * @param {Object} obj 要添加的对象
         * @param {Object} config 配置
         */
        addInnerMenu: function(obj, config){
            if (config.children.length > 0) {
                var menuItem;
                obj.menu = [];
                for (var j = 0; j < config.children.length; j++) {
                    menuItem = {
                        xtype: 'menuitem',
                        text: config.children[j].displayname,
                        url: config.children[j].url,
                        handler: this.onTopMenuClick,
                        id: config.children[j].id
                    };
                    obj.menu.push(menuItem);
                    if (config.children[j].children.length > 0) {
                        this.addInnerMenu(menuItem, config.children[j]);                        
                    }
                }
            }
        },
        /**
         * 菜单
         * @dateTime 2016-01-29
         * @param {Object} config 配置
         */
        getMenubar: function (config) {
            var systemTitle = '<img src=' + 'images/logo_poc.png' + ' style= "display:block" />';
            var tb = new Ext.Toolbar({
                enableOverflow: true,
                // 如果tbar溢出自动显示下三角
                height: 60,
                cls: 'x-btn1 button',
                //items : ['<img src=' + this.LogoUrl + ' style= "display:block" />','->'],
                items: [systemTitle, '->'],
                style: 'border:none;'
            });
            var menuData = [], buttons = [], button;  
            for (var i = 0; i < config.length; i++) {
                button = {
                    xtype: 'button',
                    text: config[i].displayname
                };
                this.addInnerMenu(button, config[i]);
                
                buttons.push(button);
            };
            menuData.push(buttons);       
            menuData.push([{
                xtype: 'button',
                iconCls:'dengchu1',
                text:'注销登录',
                menu : [{
                    xtype: 'menuitem',
                    text: '注销登录'//,
                    //handler:GAS.Login.logout
                    },{
                    xtype: 'menuitem',
                    text: '修改密码'//,
                    //handler : GAS.Login.changePassword
                }]
            }]);
            tb.addButton(menuData);
            return tb;
        },
        /**
         * 菜单面板
         * @dateTime 2016-01-29
         * @param {Object} config 配置
         */
        getNorthPanel: function(config) {
            return new Ext.Panel(Ext.apply({
                region: 'north',
                frame: false,
                border: false,
                tbar: this.getMenubar(config),
                //layout : 'column',
                autoScroll: true,
                height: 60
            }));
        },
        /**
         * 选项卡
         * @dateTime 2016-01-29
         */
        getTabPanel: function() {
            var childItem = {
                xtype: "panel",
                title: "欢迎",
                layout: "fit",
                anchor: '98%',
                border: false,
                autoScroll: true,
                bodyStyle: "border:none;width:100%;height:480px;background:url(" + "images/poc/welcome_poc.png" + ") no-repeat center center;background-color:#ffffff"

            };
            return new Ext.TabPanel(Ext.apply({
                region: 'center',
                border: false,
                deferredRender: false,
                enableTabScroll: true,
                autoDestroy: true,
                activeTab: 0,
                plugins: new Ext.ux.TabCloseMenu({
                    closeTabText: "关闭",
                    closeOtherTabsText: "关闭其他",
                    closeAllTabsText: "关闭全部"
                }),
                items: [childItem]
            }));
        },
        /**
         * 状态行
         * @dateTime 2016-01-29
         */
        getStatusPanel: function() {
            var UserInfoFrame = "<div class='x-status-text-panel'>" + "<span style='color:red;'>" + Cookies.get("login.username") + "</span>" + "<span><font color='#FFFFFF'>，欢迎回来！</font></span>" + "<span><a href='#'><img onclick='window.pocTalkOperator.login();' alt='语音登录'  src='images/voicelogoin.png'/></a></span>" + "</div>";
            var statusBar = new Ext.Toolbar({
                style: 'border-top:none;',
                items: [UserInfoFrame, " ",
                '->', "<div id='alarmbox'></div>"
                ]
            });
            return new Ext.Panel(Ext.apply({
                region: 'south',
                frame: false,
                border: false,
                height: 0,
                bbar: statusBar
            }));
        },
        getComponent: function () {
            var services = {
                serviceName : "sendRequest",
                filterList :{
                    "send" : ["validaterFilter","privateFilter"],
                    "receive" : ["validaterFilter"]                    
                }
            }
            var metaData = {
                url: "../../leauto/menu_tsp.json",
                method: "GET",
                async: true,
                tag: "tag1",
                modulename: "frame",
                operation: "init",
                tokenid: "11111111",
                type: "single",
                fn: initCallback
            };           
            var data = {}, me = this;;
            function initCallback(result) {
                if (result["success"]) {
                    var config = result["data"];  
                    me.tabPanel = me.getTabPanel();
                    var borderPanel = new Ext.Panel(Ext.apply({
                        layout: 'border',
                        items: [
                            me.getNorthPanel(config), //菜单
                            me.tabPanel,
                            me.getStatusPanel()
                        ]
                    }));
                    var panel =  new Ext.Panel(Ext.apply({
                        layout: 'fit',
                        boxMinWidth: 680,
                        boxMinHeight: 500,
                        items: [borderPanel]
                    }));
                    me.obj = new Ext.Viewport(Ext.apply({
                        layout: 'fit',
                        items: panel
                    }, me.itemConfig.objConfig));
                    return me.obj;   
                }
            }
            serviceManager.send(services, metaData, data);
        }
    });
    return TSPPanel;
});