 /**
  * 查询表格面板
  * @module QueryGridPanel
  * @dateTime 2016-03-18
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'ExtComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, ExtComponent, publicUtils) {
    function QueryGridPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(QueryGridPanel, ExtComponent);
    componentController.addProperties(QueryGridPanel.prototype, {
      getPageSize:function(){
            return new Ext.form.ComboBox({
                mode : "local",
                displayField : "text",
                valueField : "value",
                width : 50,
                editable : false,
                value: 10,
                triggerAction : "all",
                store : new Ext.data.SimpleStore({
                    fields : ["value", "text"],
                    data : [
                        [-1,"自适应"],
                        [10, "10"],
                        [20, "20"], 
                        [30, "30"], 
                        [40, "40"], 
                        [50, "50"], 
                        [100, "100"],
                        [300, "300"],
                        [500, "500"],
                        [1000, "1000"],
                        [5000, "5000"]
                      ]
                })
            })
        },
        /**
         * 获得底部工具栏
         */
        getPageBar : function() {
          return new Ext.PagingToolbar({
              pageSize : 10,
              store : this.store,
              //displayInfo : true,
              //prependButtons: false, 
              items:[
                '-',"<font color='#FFFFFF'>"+'每页显示'+"</font>",
                this.getPageSize(),
                "<font color='#FFFFFF'>"+'条'+"</font>"
              ],
              displayMsg:"<font color='#FFFFFF'>"+'共 {2} 条'+"</font>"//对数据信息的描述
            });
        },
        getToolBar : function() {
            return new Ext.Toolbar({
                style : " margin-top:-1px;",
                //cls:"x-toolbar1",
                enableOverflow : true, // 如果tbar溢出自动显示下三角
                items : [
                    "<b style='color:#15428b;'>"
                    + "新建音频"+ "</b>",
                    "->", this.getCollapsibleButton(),'-']
                    .concat(this.getButtons("button",
                          true))
            });
        },
        /**
         * 创建高级查询按钮
         */
        getCollapsibleButton : function() { // 设置可折叠按钮
            return new Ext.Button({
                text : '显示查询',
                scope : this,
                iconCls : "seniorSearch",
                selectmodel : "none"
            });

        },
        getButtons : function(type, s) {
            var btnItem = [ {
                text : '添加',
                iconCls : "icon-add"
            }, '-', {
                text : '修改',
                iconCls : "icon-order-s-signIn"
            }, '-', {
                text : '删除',
                iconCls : "icon-remove"
            }, '-', {
                text : '发布',
                iconCls : "icon-detail"
            }];
            return btnItem;
        },
        getSM : function(){
            return new Ext.grid.CheckboxSelectionModel({
                sortable: true
            });
        },
        /**
         * 获得表格的列
         */
        getColumn : function() {
            return new Ext.grid.ColumnModel({
                columns : [ new Ext.grid.RowNumberer({
                        width : 40
                    }),
                    this.getSM(),
                    {header:'编号',dataIndex:'id',width:50}, //sortable:true 可设置是否为该列进行排序  
                    {header:'名称',dataIndex:'name',width:80},  
                    {header:'描述',dataIndex:'descn',width:80},  
                    {header:'状态',dataIndex:'status',width:80}
                ],
                defaults : {
                    sortable : true
                }
            });
        },
        getRigthMenu : function() {
              if (!this.menu) {
                var menus = this.getButtons("menu");
                if (!menus || menus.length == 0)
                  return;
                this.menu = new Ext.menu.Menu({
                  scope : this,
                  items : menus
                });
              }
              return this.menu;
        },
        /**
         *控制右键按钮的禁用启用
         */
        setButtonByRightClick : function (grid, rowIndex){
            var record = grid.getStore().getAt(rowIndex);
            //var menus=this.getRigthMenu().items;
        },
        getComponent: function () {
            var data = [  
                ['111','小王','描述01','可用'],  
                ['222','李四','描述02','禁用']
            ];  
            this.store = new Ext.data.ArrayStore({  
                data:data,  
                fields:[  
                    {name:'id'}, //mapping:0 这样的可以指定列显示的位置，0代表第1列，可以随意设置列显示的位置  
                    {name:'name'},  
                    {name:'descn'},  
                    {name:'status'}  
                ]
            });
            return new Ext.grid.GridPanel(Ext.apply({
                  cm : this.getColumn(),
                  store: this.store,
                  sm : this.getSM(),
                  tbar : this.getToolBar(),
                  bbar : this.getPageBar(),
                  viewConfig : {
                      autoFill : true
                  },
                  region : "center",
                  border : true,
                  bodyBorder : true,
                  stripeRows : true,
                  listeners : {
                      scope : this,
                      "rowcontextmenu" : function (store, rowIndex){
                          this.setButtonByRightClick(store, rowIndex);
                      }
                  }
            }, this.itemConfig.objConfig));
        }
    });
    return QueryGridPanel;
});