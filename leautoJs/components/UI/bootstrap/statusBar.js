/**
 * bootstrap状态栏组件
 * @module statusBar
 */
define(["publicUtils"],function(util){

	/**
	 * 创建statusbar组件对象
	 * @method createComponent
	 * @return {[Object]}     statusbar组件dom对象
	 */
	function createComponent(){
		var username = util.getCookie("login.username");
		var statusbarObj = util.createDom('div',{
			'className' : 'navbar navbar-default navbar-fixed-bottom',
			'innerHTML' : '<span class="navbar-brand" style="color:red";>' + username +',欢迎回来！</span>'
		});
		return statusbarObj;
	}

	return {
		name : 'statusbar',
		getComponent:function(parent){
			var statusbarObj = createComponent();
			parent.appendChild(statusbarObj);
		}
	}
});
