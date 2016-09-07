 /**
  * 状态行
  * @module StatusPanel
  * @dateTime 2016-01-29
  * @author lixuemin
  */
define(['componentController', 'initComponent', 'publicUtils', 'ExtComponent'], function(componentController, initComponent, publicUtils, ExtComponent) {
    function StatusPanel(itemConfig) {
        this.init(itemConfig);
    }
    componentController.extend(StatusPanel, ExtComponent);
    componentController.addProperties(StatusPanel.prototype, {
        getComponent: function () {
            var UserInfoFrame = "<div class='x-status-text-panel'>" + "<span style='color:red;'>" + Cookies.get("login.username") + "</span>" + "<span><font color='#FFFFFF'>，欢迎回来！</font></span>" + "<span><a href='#'><img onclick='window.pocTalkOperator.login();' alt='语音登录'  src='images/voicelogoin.png'/></a></span>" + "</div>";
            var statusBar = new Ext.Toolbar({
                style: 'border-top:none;',
                items: [UserInfoFrame, " ",
                //this.getSound(),
                '->', "<div id='alarmbox'></div>" //,
                //this.getSetMsgWindowImg()
                ]
            });
            return new Ext.Panel(Ext.apply({
                region: 'south',
                frame: false,
                border: false,
                bbar: statusBar
            }, this.itemConfig.objConfig));
        }
    });
    return StatusPanel;
});