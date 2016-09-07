 /**
  * Ext组件父类
  * @module ExtComponent
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'publicUtils'], function(componentController, initComponent, publicUtils) {
    function ExtComponent(itemConfig) {
    }
    componentController.addProperties(ExtComponent.prototype, {
        init: function(itemConfig, innerComponents) {
            var innerItems = [];
            this.itemConfig = itemConfig;
            if (itemConfig.events) {
                this.events = itemConfig.events;
            }
            //对内部组件进行处理
            if (innerComponents) {
                for (var i = 0; i < innerComponents.length; i++) {
                    var innerComponent = innerComponents[i];
                    innerComponent.parent = this;
                    if (!this.children) {
                        this.children = {};
                    }
                    this.children[innerComponent.id] = innerComponent;
                    innerItems.push(innerComponent.obj);
                };
            }
            this.obj = this.getComponent(innerItems);
        },
        renderComponent: function() {
            var parent = this.parent.obj, component = this.obj||{};
            if (parent.appendChild && component.appendChild) {//Dom + Dom
                parent.appendChild(component);
            } else if (parent.appendChild && component.render) {//Dom + Ext
                component.render(parent);
            } else if (parent.add && component.render) {//Ext + Ext
                parent.add(component);
                parent.doLayout();
            }
        },
        addEvent: function(type, fn) {
            this.obj.on(type, fn, this);
        },
        destory: function() {
            var link = this.id, findObj = this;
            while(findObj.parent) {
                link = findObj.parent.id + "." + link;
                findObj = findObj.parent;
            }
            eval("delete " + link + ".obj.destroy()");
            eval("delete " + link);

        }
    });
    return ExtComponent;
});