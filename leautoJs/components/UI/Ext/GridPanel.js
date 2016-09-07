/**
 * Created by hywanliyuan on 16/3/18.
 */
/**
 * border布局panel
 * @module BorderPanel
 * @dateTime 2016-01-29
 * @author lixuemin
 */
define(['componentController', 'initComponent', 'ExtComponent', 'bindEvent', 'publicUtils'], function(componentController, initComponent, ExtComponent, bindEvent, publicUtils) {
    function GridPanel(itemConfig, innerComponents) {
        this.init(itemConfig, innerComponents);
        this.addSelfEvent();
    }
    componentController.extend(GridPanel, ExtComponent);
    componentController.addProperties(GridPanel.prototype, {
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
            //var container = new Ext.Panel(Ext.apply({
            //    items: innerItems,
            //    layout: 'border'
            //}, this.itemConfig.objConfig));
            var xg = Ext.grid;
            var reader = new Ext.data.ArrayReader({}, [
                {name: 'company'},
                {name: 'price', type: 'float'},
                {name: 'change', type: 'float'},
                {name: 'pctChange', type: 'float'},
                {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'},
                {name: 'industry'},
                {name: 'desc'}
            ]);
            Ext.grid.dummyData = [
                ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
                ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
                ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
                ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
                ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
                ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
                ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
                ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
                ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
                ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
                ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
                ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
                ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
                ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
                ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
                ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
                ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am']
            ];
            var sm = new xg.CheckboxSelectionModel();
            var container = new xg.GridPanel(Ext.apply({
                store: new Ext.data.Store({
                    reader: reader,
                    data: xg.dummyData
                }),
                flex:true,
                layout:'fit',
                cm: new xg.ColumnModel({
                    defaults: {
                        //width: 120,
                        sortable: true
                    },
                    columns: [new xg.RowNumberer(),
                        sm,
                        {id:'company',header: "Company", dataIndex: 'company'},
                        {header: "Price", renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
                        {header: "Change", dataIndex: 'change'},
                        {header: "% Change", dataIndex: 'pctChange'},
                        {header: "Last Updated", renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
                    ]
                }),
                sm: sm,
                columnLines: true,
                tbar: [
                    new Ext.Toolbar.TextItem('新建专辑'),
                    {xtype:"tbfill"},
                    {
                        text: '添加',
                        iconCls: 'add'
                        //,handler: onAdd
                    },'-',{
                      text:'修改',
                      iconCls:'edit'
                    },
                    '-', {
                        text: 'Delete',
                        iconCls: 'remove'
                        //,handler: onDelete
                    }, '-'],
                width:600,
                height:300,
                frame:true,
                title:'Framed with Checkbox Selection and Horizontal Scrolling',
                iconCls:'icon-grid',
                viewConfig:{
                    stripeRows:true,//在表格中显示斑马线
                    enableTextSelection:true, //可以复制单元格文字
                    forceFit: true
                },
                renderTo: document.body
            },this.itemConfig.objConfig));
            return container;
        }
    });
    return GridPanel;
});