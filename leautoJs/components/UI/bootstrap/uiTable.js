/**
 * bootstrap 的表格
 * @module table
 * @dateTime 2016-03-21
 * @author wanliyuan
 */
define(['componentController','serviceManager',  'bindEvent', 'initComponent', 'OriginalComponent', 'publicUtils','bootstrap'], function(componentController, serviceManager,bindEvent, initComponent, OriginalComponent, publicUtils) {
    function uiTable(itemConfig) {
        this.init(itemConfig);
        var param = {e:""};
        //this.bindFn = this.closureFn(param);
        //this.addEvent('click', this.bindFn);
        var self = this;
    }
    componentController.extend(uiTable, OriginalComponent);
    componentController.addProperties(uiTable.prototype, {
        tagName : "div",
        getComponent: function () {
            var objCon = this.itemConfig.objConfig;
            var container = initComponent.createDom(this.tagName, objCon);
            var uiTb = initComponent.createDom("table", {"className":"table table-condensed"});
            var services = {
                serviceName : "sendRequest",
                filterList :{
                    "send" : ["validaterFilter","privateFilter"],
                    "receive" : ["validaterFilter"]
                }
            }
            var metaData = {
                url: "../../leauto/uiTable.json",
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
            serviceManager.send(services, metaData, data);
            var self = this;
            function initCallback(result) {
                if (result["success"]) {
                    var resultData = result["data"];
                    //container.innerHTML = self.tagName;
                    var thead = initComponent.createDom("thead", {
                        "innerHTML":"<tr><th></th><th>名称</th><th>上级专辑名称</th>" +
                        "<th>描述</th><th>图片途径</th><th>状态</th></tr>"
                    });
                    uiTb.appendChild(thead);
                    uiTb.appendChild(self.createTable(resultData));
                    container.appendChild(uiTb);
                }
            }
            //container.innerHTML = "<thead><tr><th>标题</th><th>标题</th> <th>标题</th> </tr></thead>" +
            //    "<tbody><tr><td>Cell</td> <td>Cell</td> <td>Cell</td></tr>" +
            //    "<tr><td>Cell</td><td>Cell</td> <td>Cell</td></tr>" +
            //    "<tr><td>Cell</td><td>Cell</td><td>Cell</td></tr></tbody>" +
            //    "<tfoot><tr><th colspan='3'><div class='ui right floated pagination menu'> <a class='icon item'><i class='left chevron icon'></i>" +
            //"</a><a class='item'>1</a><a class='item'>2</a><a class='item'>3</a><a class='item'>4</a>" +
            //    "<a class='icon item'><i class='right chevron icon'></i></a> </div> </th></tr></tfoot>";

            return container;
        },
        createTable:function(data){
            var tbody = initComponent.createDom("tbody", {});
            for(var i=0;i<data.length;i++){
                var tr = initComponent.createDom("tr", {});
                tr.innerHTML = "<td><input type='checkbox'></td>" +
                    "<td>"+data[i]["NAME"]+"</td>" +
                    "<td>"+data[i]["PARENT_CLASS_ID"]+"</td>"+
                    "<td>"+data[i]["DESCRIPTION"]+"</td>"+
                    "<td>"+data[i]["IMG_URL"]+"</td>"+
                    "<td>"+data[i]["STATUS"]+"</td>";
                tbody.appendChild(tr);
            }
            return tbody;
        },
        add:function(){

        }
    })
    return uiTable;
});