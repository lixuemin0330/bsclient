 /**
  * 原生组件父类
  * @module OriginalComponent
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'publicUtils', 'bindEvent'], function(componentController, initComponent, publicUtils, bindEvent) {
    function OriginalComponent(itemConfig) {
    }
    componentController.addProperties(OriginalComponent.prototype, {
        init: function(itemConfig) {
            this.itemConfig = itemConfig;
            if (itemConfig.events) {
                this.events = itemConfig.events;
            }
            this.obj = this.getComponent();
        },
        getComponent:  function() {
            var obj = initComponent.createDom(this.tagName, this.itemConfig.objConfig);
            return obj;
        },
        renderComponent: function() {
            var parent = this.parent.obj, component = this.obj;
            if (parent.appendChild && component.appendChild) {
                parent.appendChild(component);
            }
        },
        addEvent: function(type, fn, capture) {
            var el = this.obj;
            if (window.addEventListener) {
                el.addEventListener(type, function(e) {
                    fn.call(el, e);
                }, capture);
            } else if (window.attachEvent) {
                el.attachEvent("on" + type, function(e) {
                    fn.call(el, e);
                });
            } 
        },
        closureFn: function(param) {
            var me = this;
            return function(e) {
                bindEvent.listenFn(me, e);
            }
        },
        destory: function() {
            var link = this.id, findObj = this;
            while(findObj.parent) {
                link = findObj.parent.id + "." + link;
                findObj = findObj.parent;
            }
            eval(link + ".obj.parentNode.removeChild(" + link + ".obj)");
            eval("delete " + link);
        }
    });
    return OriginalComponent;
});