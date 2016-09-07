/**
 * semanticUi
 * @module uiButton
 * @dateTime 2016-03-21
 * @author wanliyuan
 */
define(['componentController', 'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, OriginalComponent, publicUtils) {
    function uiButton(itemConfig) {
        this.init(itemConfig);
        var param = {e:""};
        this.bindFn = this.closureFn(param);
        this.addEvent('click', this.bindFn);
    }
    componentController.extend(uiButton, OriginalComponent);
    componentController.addProperties(uiButton.prototype, {
        tagName : "button",
        setButton1:function(){
            //this.obj.innerText = "button";
            alert("button");
        },
        setButton2:function(){
            //this.obj.innerText = "button";
            alert("button2");
        }
    });
    return uiButton;
});