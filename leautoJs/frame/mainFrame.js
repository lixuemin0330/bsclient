 /**
  * 主界面
  * @module mainFrame
  * @dateTime 2016-01-19
  * @author lixuemin
  */
define(['serviceManager', 'initComponent', 'ext', 'TSPPanel', 'Div'], function(serviceManager, initComponent, ext) {
    window.body = null;
    return {
        createComponents: function(parent, config) {
            var services = {
                serviceName : "sendRequest",
                filterList :{
                    "send" : ["validaterFilter","privateFilter"],
                    "receive" : ["validaterFilter"]                    
                }
            }
            var metaData = {
                url: "../../leauto/frame_tb.json",
                method: "GET",
                async: true,
                tag: "tag1",
                modulename: "frame",
                operation: "init",
                tokenid: "11111111",
                type: "single",
                fn: initCallback
            };           
            var data = {};
            function initCallback(result) {
                if (result["success"]) {
                    var config = result["data"];
                    body = {
                        obj: document.getElementsByTagName("body")[0],
                        itemConfig: config
                    }; 
                    initComponent.addComponents(body);       
                }
            }
            serviceManager.send(services, metaData, data);
        }
    }
});