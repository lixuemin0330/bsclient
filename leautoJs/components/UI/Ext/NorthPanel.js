 /**
  * 上方面板
  * @module NorthPanel
  * @dateTime 2016-03-17
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'ExtComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, ExtComponent, publicUtils) {
    function NorthPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(NorthPanel, ExtComponent);
    componentController.addProperties(NorthPanel.prototype, {
        getNorthPanleTBar : function() {
            return new Ext.Toolbar({
                enableOverflow : true, // 如果tbar溢出自动显示下三角
                //cls:"x-toolbar1",
                items : [
                    "<b style='color:#15428b;'>"
                    + "查询条件"
                    + "</b>",
                    "->",
                    {
                        scope : this,
                        text : "隐藏查询",
                        iconCls : "splithide"
                    }]
            });
        },
        getComponent: function () {
            return new Ext.Panel(Ext.apply({
                region : "north",
                autoHeight : true,
                autoScroll : "auto",
                border : false,
                bodyStyle : "background:none;",
                tbar : this.getNorthPanleTBar()
            }, this.itemConfig.objConfig));
        }
    });
    return NorthPanel;
});