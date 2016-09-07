 /**
  * 查询表单面板
  * @module QueryFormPanel
  * @dateTime 2016-03-17
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'ExtComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, ExtComponent, publicUtils) {
    function QueryFormPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(QueryFormPanel, ExtComponent);
    componentController.addProperties(QueryFormPanel.prototype, {
        getButtonsArray : function (config){
            var b1 = new Ext.Button({
                text : '查询',
                iconCls : "icon-order-s-search",
                //style : config ? config.style : "",
                width : 80
            });
            var b2 = new Ext.Button({
                text : '重置',
                //style : config ? config.style : "",
                //style: "padding-left: 5px",
                width : 80
            });
            var btnItem = [ b1, b2 ];
            return btnItem;
        },
        getChildButtonPanel: function (config){
            return new Ext.Panel({
                baseCls : 'x-plain',
                region : 'center',
                layout: {
                    type :'hbox',//config?config.layoutType || 'vbox' : 'vbox',
                    align : 'middle',
                    pack: "center"
                },
                width : 180,
                items : this.getButtonsArray(config)
            });
        },
        getButtonPanel : function() {
            return new Ext.Panel({
                xtype : "button",
                baseCls : 'x-plain',
                layout : "fit",
                items : [this.getChildButtonPanel()]
            });
        },
        getFormItems : function() {
            var items = [];
            var field = {
                fieldLabel: "条目名称",
                fieldname: "NAME",
                text: "条目名称",
                title: "条目名称",
                type: "string",
                xtype: "textfield",
                width: 220

            };
            field.anchor = "100%";
            var config = {
                xtype : "container",
                layout : "form",
                autoHeight : true,
                width : 240,
                bodyStyle : "background:none;",
                border : false,
                labelWidth : 80,
                style : "padding-left:5px;padding-top:5px;",
                items : [ field ]
            };
            items.push(config);
            return new Ext.Container({
                border : false,
                autoHeight : true,
                layout : "column",
                width : 1000,
                items : items
            });
        },
        getComponent: function () {
            var queryFormPanel = new Ext.FormPanel(Ext.apply({
                autoHeight : true,
                border : false,
                bodyBorder : false,
                bodyStyle : "background:none;",
                layout : "column",
                items : [this.getFormItems(),this.getButtonPanel()],
                listeners : {
                    afterrender : function() {
                        var id =  this.layoutId;
                        Ext.getCmp(this.layoutId).doLayout();
                    }
                }
            }, this.itemConfig.objConfig));
            return queryFormPanel;
        }
    });
    return QueryFormPanel;
});