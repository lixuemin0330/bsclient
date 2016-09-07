/**
 * bootstrap菜单组件
 * @module menu
 */
define(['jquery','bootstrap','initComponent','serviceManager','bindEvent','publicUtils'],function($,bootstrap,initComponent,serviceManager,bindEvent,util){

    /**
     * 生成菜单
     * @DateTime 2016-01-11
     * @param    {Array}     datas 菜单返回数据
     * @return {[Object]}     menu的dom对象
     */
    function loadMenu(datas) {
        var oNav = util.createDom('nav',{'className':'navbar navbar-default'});
        var oDiv = util.createDom('div',{
            'className':'dropdown',
            'innerHTML': '<div class="navbar-header"><a class="navbar-brand" href="/">CMS管理平台</a></div>'
        });
        var oUlRight = util.createDom('ul',{
            'className':'navbar nav navbar-nav navbar-right',
            'innerHTML': '<li id="user"><a tabindex="-1" href="javascript:void(0);">注销用户</a></li>'
        });  
        var oUlLeft = util.createDom('ul',{'className':'navbar nav navbar-nav navbar-left'});
        var menuLiArr = assembleTopMenu(datas);//生成一级菜单
        for(var i=0;i<menuLiArr.length;i++){
             oUlLeft.appendChild(menuLiArr[i]);
        }    
        oDiv.appendChild(oUlLeft);
        oDiv.appendChild(oUlRight);
        oNav.appendChild(oDiv);
        return oNav;
    }

    /**
     *  生成一级菜单-私有方法
     * @DateTime 2016-01-11
     * @param    {Array}     datas 一级菜单数组
     * @return   {Array}           dom对象数组
     */
    function assembleTopMenu(datas){
        var liArray = [];
        for(var i=0;i<datas.length;i++){
            var oLi = util.createDom('li',{
                'className':'dropdown',
                'innerHTML': '<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">'+ datas[i]["displayname"] +'<b class="caret"></b></a>'
            });
            if(datas[i].children.length > 0){//有孩子节点，调用生成子菜单函数
                var topMenuUl = util.createDom('ul',{'className':'dropdown-menu menu-top'});
                var childLi = assembleChildMenu(datas[i].children);
                for(var j=0;j<childLi.length;j++){
                    topMenuUl.appendChild(childLi[j]);
                }               
            }
            oLi.appendChild(topMenuUl);
            liArray.push(oLi);
        }
        return liArray;
    }

    /**
     * 生成子菜单-私有方法
     * @DateTime 2016-01-11
     * @param    {Array}     datas 子菜单数组
     * @return   {Array}          dom对象数组
     */
    function assembleChildMenu(datas){
        var childMenuLi = [];
        for (var i = 0; i < datas.length; i++) { 
            var oLi = util.createDom('li',{             
                'innerHTML': '<a tabindex="-1" href="javascript:void(0);">'+ datas[i].displayname+'</a>',
                'id' : datas[i].name
            });                
            if(datas[i].children.length > 0){
                oLi.className = 'dropdown-submenu';
                var oUl = util.createDom('ul',{'className':'dropdown-menu menu-right'});

                var ochildLi = assembleChildMenu(datas[i].children);              
                for(var j=0;j<ochildLi.length;j++){
                    oUl.appendChild(ochildLi[j]);
                } 
                oLi.appendChild(oUl);
                childMenuLi.push(oLi);
            }else{
                childMenuLi.push(oLi);
                addEvent(oLi); //li添加监听事件
            }
        }
        return childMenuLi;
    }

    /**
     * menu菜单绑定menu_click
     * @method addEvent
     * @param  {Object}     domObj 绑定事件对象
     */
    function addEvent(domObj){
        $(domObj).bind('click',function(target) {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent('menu_click', true, false);
                domObj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                domObj.fireEvent('menu_click');
            }
        });
    }

	return {
        name: 'menu',
        getComponent: function(parent,config) {

            function menuCallback(result) {
                if(result["success"]){
                    var menuDatas = result["data"];
                    var navObj = loadMenu(menuDatas);
                    parent.appendChild(navObj);
                }
            }

            //设置Ajax请求参数，需设置成同步
            var option = {
                url: "../../leauto/menu.json",
                method: "GET",
                async: false
            };
            var metaData = {
                modulename: "menu",
                operation: "query",
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
            serviceManager.send(servicesList, option, metaData, param, menuCallback);
        }
    }
});
