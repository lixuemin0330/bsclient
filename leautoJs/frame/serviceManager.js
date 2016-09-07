/**
  * 服务层管理模块
  * @module serviceManager
  * @dataTime 2016-02-17
  * @author yanglin
  */
define(['publicUtils',"AOP","asyncInfo","sendRequest"], function(utils, AOP, asyncInfo, sendRequest) {
    return {
        validaterFilter : function(metaData,data,result){
            return {
                filterName: "validaterFilter",
                success : true,
                exception : ""
            }
        },
        privateFilter : function(metaData,data,result){
            return {
                filterName: "privateFilter",                
                success : true,
                exception : ""
            }
        },
        send: function(services, metaData, data) {
            var filterList = services["filterList"];
            if(filterList && filterList["send"].length > 0){  //发送请求之前filter处理数据
                this.doFilter(filterList["send"],metaData,data);
            }
            require(services["serviceName"]).doService(metaData, data, filterList);//通过所有filter之后，调用服务的入口函数
        },
        doFilter: function(filterList,metaData,data,result){
            for(var i=0;i<filterList.length;i++){
                var fn = this[filterList[i]];  //filter函数名称
                if(utils.isFunction(fn)){   //当前filter是函数
                    var filterResult = fn.call(this,metaData,data,result); //调用当前filter函数
                    if(filterResult["success"]){
                        continue;
                    }else{
                        console.log(filterResult["exception"]);
                        return filterResult["exception"];     //返回异常信息
                    }                       
                }
            }
        }
    };
});