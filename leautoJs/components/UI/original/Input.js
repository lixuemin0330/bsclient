 /**
  * 原生输入框
  * @module Input
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, OriginalComponent, publicUtils) {
    function Input(itemConfig) {
        this.init(itemConfig);  
    }
    componentController.extend(Input, OriginalComponent);
    componentController.addProperties(Input.prototype, {
        tagName: "input",
        setValue: function() {
            this.obj.value = "sdfsf";
        }
    });
    return Input;
});