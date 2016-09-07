 /**
  * 中间面板
  * @module CenterPanel
  * @dateTime 2016-03-18
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'ExtComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, ExtComponent, publicUtils) {
    function CenterPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(CenterPanel, ExtComponent);
    componentController.addProperties(CenterPanel.prototype, {
        getComponent: function () {
            return new Ext.Container(Ext.apply({
                region : "center",
                frame : false,
                border : false,
                bodyBorder : false,
                monitorResize : true,
                layout : "fit",
                bodyStyle : 'background: none;border-style:none;overflow:auto;margin-top:0px;'
            }, this.itemConfig.objConfig));
        }
    });
    return CenterPanel;
});