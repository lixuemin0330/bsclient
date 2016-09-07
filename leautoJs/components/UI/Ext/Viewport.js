 /**
  * Viewort
  * @module Viewort
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'ExtComponent', 'publicUtils', 'TreePanel', 'TextField', 'NorthPanel', 'TabPanel', 'StatusPanel', 'BorderPanel', 'TabCloseMenu'], function(componentController, initComponent, ExtComponent, publicUtils) {
    function Viewport(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(Viewport, ExtComponent);
    componentController.addProperties(Viewport.prototype, {
        getComponent: function () {
            return new Ext.Viewport(Ext.apply({
                layout: 'fit'
            }, this.itemConfig.objConfig));
        }
    });
    return Viewport;
});