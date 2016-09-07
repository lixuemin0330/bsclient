 /**
  * 选项卡
  * @module TabPanel
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'publicUtils', 'ExtComponent', 'TabCloseMenu'], function(componentController, initComponent, publicUtils, ExtComponent) {
    function TabPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(TabPanel, ExtComponent);
    componentController.addProperties(TabPanel.prototype, {
        getComponent: function () {
            var childItem = {
                xtype: "panel",
                title: "欢迎",
                layout: "fit",
                anchor: '98%',
                border: false,
                autoScroll: true,
                bodyStyle: "border:none;width:100%;height:480px;background:url(" + "images/poc/welcome_poc.png" + ") no-repeat center center;background-color:#ffffff"
            };
            var tabPanel = new Ext.TabPanel(Ext.apply({
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
            }, this.itemConfig.objConfig));
            return tabPanel;
        }
    });
    return TabPanel;
});