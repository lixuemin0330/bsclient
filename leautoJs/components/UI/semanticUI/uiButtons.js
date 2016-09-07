/**
 * semanticUi
 * @module uiButton
 * @dateTime 2016-03-21
 * @author wanliyuan
 */
define(['componentController', 'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils'], function(componentController, bindEvent, initComponent, OriginalComponent, publicUtils) {
    function uiButtons(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(uiButtons, OriginalComponent);
    componentController.addProperties(uiButtons.prototype, {
        tagName : "div",
        getComponent: function () {
            var objCon = this.itemConfig.objConfig;
            var container = initComponent.createDom(this.tagName, objCon);
            var uiButtons = initComponent.createDom(this.tagName, {"className":"ui small basic icon buttons"});
            //console.log(objCon.para);
            var arrName = ["添加","修改","查看","删除"];
            for(var i=0;i<objCon.para.length;i++){
                var uiButton = initComponent.createDom("button", {"className":"ui button"});
                uiButton.id = objCon.para[i];
                uiButton.innerText = arrName[i];
                uiButtons.appendChild(uiButton);
                var me = this;
                $(uiButton).bind("click",function(event){
                    var event = event ? event : window.event;
                    var target = event.srcElement ? event.srcElement : event.target;
                    bindEvent.listenFn(me,event,target);
                });
            }
            container.appendChild(uiButtons);
            return container;
        }
    });
    return uiButtons;
});