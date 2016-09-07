 /**
  * container模块
  * @module Container
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'ExtComponent', 'publicUtils', 'TreePanel', 'TextField'], function(componentController, initComponent, ExtComponent, publicUtils) {
    function Container(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(Container, ExtComponent);
    componentController.addProperties(Container.prototype, {
        getComponent: function () {
            var container = new Ext.Container(Ext.apply({
                name: "container",
                width: 200
            }, this.itemConfig.objConfig));
            return container;
        }
    });
    return Container;
});