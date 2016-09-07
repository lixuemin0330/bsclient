 /**
  * 原生div
  * @module Div
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils', 'Input', 'Button','uiTable','uiButton','uiModal'], function(componentController, bindEvent, initComponent, OriginalComponent, publicUtils) {
    function Div(itemConfig) {
        this.init(itemConfig);
        this.addSelfEvent();
    }
    componentController.extend(Div, OriginalComponent);
    componentController.addProperties(Div.prototype, {
        tagName: "div",
        addSelfEvent: function(){
            if (this.events) {
                var param = {e: ""}, events = this.events;
                this.bindFn = this.closureFn(param);
                for (var i = 0; i < events.length; i++) {
                    var name = events[i].eventName;
                    this.addEvent(name, this.bindFn);
                }
            }
        }
    });
    return Div;
});