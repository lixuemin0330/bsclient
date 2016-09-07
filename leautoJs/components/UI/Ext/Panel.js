 /**
  * panel
  * @module Panel
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'ExtComponent', 'publicUtils', 'TreePanel', 'TextField', 'NorthPanel', 'TabPanel', 'StatusPanel', 'BorderPanel', 'TabCloseMenu', 'Viewport'], function(componentController, initComponent, ExtComponent, publicUtils) {
    function Panel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(Panel, ExtComponent);
    componentController.addProperties(Panel.prototype, {
        getComponent: function () {
            var container = new Ext.Panel(Ext.apply({
                layout: "fit",
                boxMinWidth : 680,
                boxMinHeight : 500
            }, this.itemConfig.objConfig));
            return container;
        }
    });
    return Panel;
});