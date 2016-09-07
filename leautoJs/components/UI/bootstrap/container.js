/**
 * bootstrap容器组件，承载每个页面的容器
 * @module container
 */
define(['jquery','initComponent','bindEvent','serviceManager','publicUtils'],function($,initComponent,bindEvent,serviceManager,util){

	var container = null;

	/**
	 * 创建组件-私有方法
	 * @method createComponent
	 * @return {[Object]}     container的dom对象
	 */
	function createComponent(){
		var oContainer = util.createDom('div',{
			'className':'container-fluid'
		});
		oContainer.initChild = function(event){
			if($(container).children().length>0){//清除container中元素，用于重新加载
				$(container).empty();
			}
			//id作为modulename发请求
			var paramObj = assembleParam(event.target);
            serviceManager.send(paramObj.servicesList, paramObj.option, paramObj.metaData, paramObj.param, queryItemCallback);
		}
		return oContainer;
	}

	function assembleParam(obj){
		var option = {
            url: "../../leauto/" + obj.id + ".json",
            method: "GET",
            async: true
        };
        var metaData = {
            modulename: obj.id,
            operation: "init",
            tokenid: "11111111"
        };
        var servicesList = {
            "before": [
                "safeValidater",
                "validater"
            ],
            "after": [
                "dataAdapter",
                "validater"
            ]
        };
        var param = {};
        return {
        	option:option,
        	metaData:metaData,
        	servicesList:servicesList,
        	param:param
        }
	}

	function queryItemCallback(result){
		if (result["success"]) {
            var config = result["data"];
            var com = initComponent.checkComponent(container, config); 
        }
	}

	function createChildren(config) {
        return initComponent.checkComponent(config);
    }

    /**
     * 添加事件监听
     * @method bindListener
     * @param  {[Object]}     component  事件接受对象
     */
    function bindListener(component) {
        //请求到的事件配置数据
        var eventConfig = [{
            parent: "frame",
            senderEvent: "menu_click",
            receiverFn: "initChild"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

	return {
		name : 'container',
		getComponent: function(parent,config){
			var oContainer = createComponent();
			bindListener(oContainer);
			$(parent).append(oContainer);
			createChildren(config);
			container = oContainer;
			return container;
		}
	}
});