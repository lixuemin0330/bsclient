 /**
  * 文本框
  * @module TextField
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'ExtComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, ExtComponent, publicUtils) {
    function TextField(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(TextField, ExtComponent);
    componentController.addProperties(TextField.prototype, {
        getComponent: function () {
            var textfield = new Ext.form.TextField(Ext.apply({
                name: "textField",
                blankText: "请输入数据",
                emptyText: "Ext输入框"
            }, this.itemConfig.objConfig));
            return textfield;
        },
        setButtonValue: function(){
            this.obj.setValue("button_click");
        },
        setTreeValue: function(opt){
            this.obj.setValue(opt.text);
        }
    });
    return TextField;
});