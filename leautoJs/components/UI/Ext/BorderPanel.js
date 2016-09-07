 /**
  * border布局panel
  * @module BorderPanel
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'ExtComponent', 'bindEvent', 'publicUtils', 'TreePanel', 'TextField', 'NorthPanel', 'TabPanel', 'StatusPanel'], function(componentController, initComponent, ExtComponent, bindEvent, publicUtils) {
    function BorderPanel(itemConfig, innerComponents) {
        this.init(itemConfig, innerComponents);
        this.addSelfEvent();
    }
    componentController.extend(BorderPanel, ExtComponent);
    componentController.addProperties(BorderPanel.prototype, {
        lazy: true,
        addSelfEvent: function() {
            if (this.events) {
                var events = this.events;
                for (var i = 0; i < events.length; i++) {
                    var name = events[i].eventName;
                    this.addEvent(name ,function(node, e){
                        bindEvent.listenFn(this, e, node)
                    }, this, {});
                    this.obj.enableBubble(name);
                }
            }
        },
        getComponent: function (innerItems) {
            var container = new Ext.Panel(Ext.apply({
                items: innerItems,
                layout: 'border'
            }, this.itemConfig.objConfig));
            return container;
        }
    });
    return BorderPanel;
});