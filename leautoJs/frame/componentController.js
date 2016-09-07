 /**
  * 组件控制类
  * @module componentController
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(function() {
    return {
        /**
         * 继承方法
         * @DateTime 2016-01-29
         * @param    {Object}     Child 子类
         * @param    {Object}     Parent 父类
         * @return 
         */
        extend: function (Child, Parent) {
            var F = function(){};
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.uber = Parent.prototype;
    　　},
        /**
         * 为对象添加属性
         * @DateTime 2016-01-29
         * @param    {Object}     obj 待修改对象
         * @param    {Object}     source 配置对象
         * @return   {Object}     修改后的对象
         */
        addProperties: function (obj, source) {
            for (var property in source) {
                obj[property] = source[property];
            }
            return obj;
        }
    };
});