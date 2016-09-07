/**
 * semanticUi 的按钮组
 * @module uiButtons
 * @dateTime 2016-03-21
 * @author wanliyuan
 */
define(['componentController','serviceManager',  'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils','semanticUI'], function(componentController, serviceManager,bindEvent, initComponent, OriginalComponent, publicUtils) {
    function uiModal(itemConfig) {
        this.init(itemConfig);
        var param = {e:""};
        this.bindFn = this.closureFn(param);
        //this.addEvent('click', this.bindFn);
    }
    componentController.extend(uiModal, OriginalComponent);
    componentController.addProperties(uiModal.prototype, {
        tagName : "div",
        getComponent: function () {
            var objCon = this.itemConfig.objConfig;
            var container = initComponent.createDom(this.tagName, objCon);
            container.innerHTML = '<i class="close icon"></i><div class="header">修改信息</div>' +
                '<div class="ui form"><div class="field"><label>First name</label><input type="text" placeholder="First Name">' +
                '</div></div>';
            return container;
        },
        setModal:function(){
            $(this.obj).modal('show');
        }
    })
    return uiModal;
});