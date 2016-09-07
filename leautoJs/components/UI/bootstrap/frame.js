/**
 * 主界面组件
 * @module frame
 */
define(['bindEvent', 'initComponent', 'publicUtils', 'menu','bootstrapContainer','statusBar'], function(bindEvent, initComponent, util) {

    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     * @param  {[type]}     config [description]
     * @return {[Array]}     组件对象数组
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     * @return {[Object]}     dom对象
     */
    function createComponent(config) {
        var com = util.createDom('div', config);
        return com;
    }

    /**
     * 注册事件
     * @method bindEvents
     * @param  {[Object]}     component  事件注册对象
     */
    function bindEvents(component) {
        //请求到的事件参数
        var eventConfig = ['menu_click'];
        bindEvent.bindEvents(component, eventConfig);
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            bindEvents(com);
            parent.appendChild(com);
            createChildren(com, config);
            return com;
        }
    }
});