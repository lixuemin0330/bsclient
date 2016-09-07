 /**
  * 组件初始化
  * @module initComponent
  * @dateTime 2016-01-06
  * @author lixuemin
  */
define(function() {
    return {
        /**
         * 组装内部组件
         * @dateTime 2016-03-02
         * @param {Object} parentConfig 父组件配置
         */
        getInnerComponents: function(parentConfig) {
            var comConfig, nextItem, comName, nextClass, innerComponents = [], inner2Components = [], newCom;
            if (parentConfig && parentConfig.items) {
                comConfig = parentConfig.items;
                for (var i = 0; i < comConfig.length; i++) {
                    nextItem = comConfig[i];
                    comName = nextItem.name;
                    nextClass = require(comName);
                    if (nextClass.prototype.lazy) {
                        inner2Components = this.getInnerComponents(nextItem);
                        newCom = new nextClass(nextItem, inner2Components);
                    } else {
                        newCom = new nextClass(nextItem);
                    }
                    newCom.id = newCom.obj.id;
                    innerComponents.push(newCom); 
                }
                return innerComponents;
            }
        },
        /**
         * 初始化内部模块
         * @dateTime 2016-01-06
         * @param {Object} parent 父组件
         */
        addComponents: function(parent) {
            var itemConfig = parent.itemConfig, comConfig, comName, components = [], nextItem, nextClass, innerComponents;
            if (itemConfig && itemConfig.items) {
                comConfig = itemConfig.items;
                for (var i = 0; i < comConfig.length; i++) {
                    nextItem = comConfig[i];
                    comName = nextItem.name;
                    nextClass = require(comName);
                    if (nextClass) {
                        if (!document.getElementById(nextItem.objConfig.id)) {
                            //调用内部模块的初始化方法
                            if (nextClass.prototype.lazy) {
                                innerComponents = this.getInnerComponents(nextItem);
                            }
                            var newCom = new nextClass(nextItem, innerComponents);
                            newCom.parent = parent;
                            newCom.renderComponent();
                            if (!parent.children) {
                                parent.children = {};
                            }
                            if (newCom.obj) {
                                newCom.id = newCom.obj.id;
                                parent.children[newCom.obj.id] = newCom;
                            } else {
                                setTimeout(function () {
                                  if (newCom.obj) {
                                      newCom.id = newCom.obj.id;
                                      parent.children[newCom.obj.id] = newCom;
                                  }
                                }, 500);
                            };
                            components.push(newCom);
                        }
                        
                    } 
                }
            }
            //子组件初始化
            for (var j = 0; j < components.length; j++) {
                this.addComponents(components[j]);
            }
        },
        /**
         * 创建dom对象
         * @DateTime 2016-01-11
         * @param    {String}     tag     标签名
         * @param    {Object}     attrMap 属性对象
         * @return   {Object}             dom对象
         */
        createDom: function(tag, attrMap){
            var domObj = document.createElement(tag);    
            for(var attr in attrMap) {
                if(domObj[attr]!= undefined){
                  domObj[attr] = attrMap[attr];
                }else{
                  domObj.setAttribute(attr,attrMap[attr]);
                }
            }
            return domObj;
        }
    };
});