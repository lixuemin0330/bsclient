 /**
  * 原生按钮
  * @module Button
  * @dateTime 2016-01-21
  * @author lixuemin
  */
define(['componentController', 'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, OriginalComponent, publicUtils) {
    function Button(itemConfig) {
        this.init(itemConfig);
        var param = {e:""};
        this.bindFn = this.closureFn(param);
        this.addEvent('click', this.bindFn);
    }
    componentController.extend(Button, OriginalComponent);
    componentController.addProperties(Button.prototype, {
        tagName : "input"
    });
    return Button;
});