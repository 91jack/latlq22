layui.config({
    base : "../js/"
}).use(['jquery','http','layer', 'config'],function() {
    var $ = layui.jquery,
        $layer = layui.layer,
        $cfg = layui.config(),
        $http = layui.http();
    var codes = '';

    $("#code").click(function () {
        yzm();
    });

    yzm();
    function yzm() {
        var arrays = [ '1','2','3','4','5','6','7','8','9','0',
            'a','b','c','d','e','f','g','h','i','j',
            'k','l','m','n','o','p','q','r','s','t',
            'u','v','w','x','y','z',
            'A','B','C','D','E','F','G','H','I','J',
            'K','L','M','N','O','P','Q','R','S','T',
            'U','V','W','X','Y','Z'];
        codes='';// 重新初始化验证码
        for(var i = 0; i<4; i++){
            // 随机获取一个数组的下标
            var r = parseInt(Math.random() * arrays.length);
            codes += arrays[r];
        }
        $("#code").text(codes);
    }

    $("#btn-login").click(function () {
        var yzm = $("#yzm").val(),
            account = $("#userName").val(),
            password = $("#password").val();

        if(!yzm || !account || !password){
            $layer.msg("请输入用户名和密码！");
            return;
        }
        if(yzm.toUpperCase()!=codes.toUpperCase()){
            $layer.msg("验证码输入错误!请重新输入",{time: 1000}); //则弹出验证码输入错误
            yzm();//刷新验证码
            $("#yzm").val("");//清空文本框
            return;
        }
        var data = $http.request("acp/login.json",{account:account, password: password});
        if(data && data.status==0){
            window.location = $cfg.config.baseUrl + "acp/index.html";
        }else{
            $layer.msg(data.msg);
        }
    });

    document.onkeydown = function (e) {
        if (!e) e = window.event;
        if ((e.keyCode || e.which) == 13) {
            var yzm = $("#yzm").val();
            var account =document.getElementById("userName").value;
            var password =document.getElementById("password").value;

            if(!yzm || !account || !password){
                $layer.msg("请输入用户名和密码！");
                return;
            }
            if(yzm.toUpperCase()!= codes.toUpperCase()){
                $layer.msg("验证码输入错误!请重新输入",{time: 1000}); //则弹出验证码输入错误
                yzm();//刷新验证码
                $("#yzm").val("");//清空文本框
                return;
            }
            var data = $http.request("acp/login.json",{account:account, password: password});
            if(data && data.status==0){
                window.location = $cfg.config.baseUrl + "acp/index.html";
            }else{
                $layer.msg(data.msg);
            }
        }
    };
});
