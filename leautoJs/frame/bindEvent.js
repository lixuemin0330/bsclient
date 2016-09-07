 /**
  * 事件管理模块
  * @module bindEvent
  * @dateTime 2016-01-06
  * @author lixuemin
  */
define(['publicUtils'], function(publicUtils) {
    return {
        /**
         * 事件触发
         * @method listenFn
         * @param  {Object}     target 目标组件
         * @param  {Object}     e  事件对象
         * @param  {Object}     opt  其他参数   
         */
        listenFn: function(target, e, opt) {
            if (target.events) {
                for (var i = 0; i < target.events.length; i++) {
                    var event = target.events[i];
                    if ("undefined" != typeof event &&  e.type == event.eventName) {
                        var fromComponent = publicUtils.getChildren(target, event.fromComponent);
                        var toComponent = publicUtils.getChildren(target, event.toComponent);
                        var targetId = e.target?e.target.id:e.srcElement.id;
                        if ((fromComponent.id == targetId || event.owner && opt[event.owner].id && opt[event.owner].id == fromComponent.id) && toComponent[event.componentFn]) {
                            toComponent[event.componentFn](opt);
                        }
                    }
                }
            }
        }
    };
});