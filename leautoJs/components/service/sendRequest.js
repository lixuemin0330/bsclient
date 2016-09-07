/**
  * 发送请求服务
  * @module sendRequest
  * @dataTime 2016-02-17
  * @author yanglin
  */
define(['AOP'],function(AOP){
	var innerCallback = null,
		filterListAfter = null;
	return {
		/**
		 * 发送请求服务入口函数
		 * @method doService
		 * @param  {Object}     metaData   请求基础数据
		 * @param  {Object}     data       请求参数
		 * @param  {Object}     filterList 服务过滤器
		 * @return {[type]}                [description]
		 */
		doService : function(metaData, data, filterList){
			innerCallback = metaData['fn'];
			filterListAfter = filterList["receive"];
			AOP.send(metaData, data, this.callback);
		},
		callback : function(result){

			require("serviceManager").doFilter(filterListAfter,null,null,result); // 该服务中发送请求之后filter处理数据
			var resultNew = result;

			innerCallback(resultNew);
		}
	}
});