 /**
  * 树形组件
  * @module TreePanel
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'publicUtils', 'ExtComponent', 'bindEvent'], function(componentController, initComponent, publicUtils, ExtComponent, bindEvent) {
    function TreePanel(itemConfig) {
        this.init(itemConfig);
        this.addSelfEvent();    
    }
    componentController.extend(TreePanel, ExtComponent);
    componentController.addProperties(TreePanel.prototype, {
        addSelfEvent: function(){
            this.obj.on('click',function(node, e){
                bindEvent.listenFn(this, e, node)
            }, this, {});
            this.obj.enableBubble('click');
        },
        getComponent: function () {
            var data = {
                expanded: true,
                children: [{
                    text: 'Menu Option 11',
                    leaf: true
                }, {
                    text: 'Menu Option 12',
                    leaf: true
                }, {
                    text: 'Menu Option 13',
                    leaf: true
                }]
            };
            var treePanel = new Ext.tree.TreePanel(Ext.apply({
                name: "treePanel",
                width: 200,
                autoScroll: true,
                split: true,
                loader: new Ext.tree.TreeLoader(),
                root: new Ext.tree.AsyncTreeNode(data),
                contextMenu: new Ext.menu.Menu({
                    items: [{
                        id: 'delete-node',
                        text: 'Delete Node'
                    }]
                })
            }, this.itemConfig.objConfig)); 
            //事件
            return treePanel;
        }
    });
    return TreePanel;
});