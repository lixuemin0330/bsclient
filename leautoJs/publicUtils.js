define(function() {

	/**
	 * 判断对象类型是否为函数
	 * @DateTime 2016-01-07
	 * @param    {Object}     obj 待判断对象
	 * @return   {Boolean}        布尔型
	 */
	function isFunction(obj) {
		return Object.prototype.toString.call(obj) === '[object Function]';
	}
    /**
     * 获取指定的cookie值
     * @DateTime 2016-01-12
     * @param    {String}     cookieName cookie名称
     * @return   {String}                cookie值
     */
    function getCookie(cookieName) {
	    var aCookie = document.cookie.split("; ");

	    for(var i = 0; i < aCookie.length; i++){
	        var arr = aCookie[i].split("=");
	        if(cookieName == arr[0]){
	            return arr[1];
	        }
	    }
	    return "";
	}

	/**
	 * 对象的深复制
	 * @method deepClone
	 * @param  {Object}     obj 源对象
	 * @return {Object}         新对象
	 */
	function deepClone(obj){
		var result = {};
		for(var key in obj){
			if (typeof obj[key] === 'object') {
				deepClone(obj[key]);
			} else {
				result[key] = obj[key];
			}		
		}
		return result;
	}
	function getChildren(parent, link){
		var linkArray = link.split("."), item = parent.children;
		for (var i = 0; i < linkArray.length; i++) {
			if (item[linkArray[i]]) {
				item = item[linkArray[i]];
				if (item.children) {
					item = item.children;
				}
			}
		}
		return item;
	}
	return {
		isFunction: isFunction,
		getCookie: getCookie,
		deepClone: deepClone,
		getChildren: getChildren
	}

});