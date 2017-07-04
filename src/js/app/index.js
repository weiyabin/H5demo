$(function() {
    setTimeout(function() {
        $('.line-top, .line-bottom').addClass('active');
    }, 1000);


    var status = true;
    $('.arrow').click(function() {
        $('#homepage').hide();
        status = false;
        $('#qin').show();
    });


    var touchController = {

        _options : {
            targetEl  : $('body, html'),
            threshold : 15
        },

        _beginY       : 0,
        _endY         : 0,
        _upCallback   : $.noop,
        _downCallback : $.noop,

        _recordStart  : function(e){
            this._beginY = e.originalEvent.touches[0].pageY;
        },
        _recordStop   : function(e){
            this._endY   = e.originalEvent.touches[0].pageY;
        },
        _dispatch     : function(){
            this._endY - this._beginY + this._options.threshold < 0
                    && this._upCallback();
            this._endY - this._beginY - this._options.threshold > 0
                    && this._downCallback();
        },

        init: function(opts){

            var that = this;

            opts && opts.scrollUp   && (this._upCallback   = opts.scrollUp   );
            opts && opts.scrollDown && (this._downCallback = opts.scrollDown );

            this._options.targetEl.bind('touchstart', function(e){
                that._recordStart(e);
            }).bind('touchmove', function(e){
                that._recordStop(e);
                that._dispatch();
            });
        }
    };

    touchController.init({
        scrollUp : function(){
            if(status){
                $('#homepage').hide();
                status = false;
                $('#qin').show();
            }
        }
    })
    function App(config) {
        this.bind();
    }

    App.prototype = {
        pwd: [],
        init: function() {
            this._createPwd();
            this._createDOM();
        },
        _createPwd: function() {
            var pwd = [],
                i = 0,
                l = 5;

           /* for(; i < l ; i ++) {
                pwd.push(Math.ceil(Math.random()*7));
            }*/

            this.pwd = [1, 7, 3, 5, 2];
        },
        _createDOM: function() {
            var pwd = this.pwd,
                qinArray = [],
                diziArray = [],
                audioArray = [],
                audioArray1 = [],
                yinArray = [1, 7, 3, 5, 2],
                val = null;

            for(var i = 0; i < pwd.length; i++) {
                val = pwd[i];
                qinArray.push(this._createDotted(val, 'qin',i));
                diziArray.push(this._createDotted(val, 'dizi',i));
                audioArray.push(this._createAudio(yinArray[i], 'qin', i));
                audioArray1.push(this._createAudio(yinArray[i], 'dizi', i));

            }
            $('#qin .g-center').append(qinArray.join(''));
            $('#dizi .g-center').append(diziArray.join(''));
            $(document.body).append(audioArray.join(''));
            $(document.body).append(audioArray1.join(''));
        },
        //创建点
        _createDotted: function(val, type , index) {
            if(type == 'qin') {

                // top固定数组，left随机
                var tlist = [16,37,60,83,105,127,150,172,195,217],
                    left = Math.random()*90,
                    top = tlist[Math.floor(Math.random()*10)];


                return '<div data-type="qin" class="u-dotted '+(index == 0 ? 'cur' : '')+'" style="left:'+left+'%;top:'+top+'px;" data-i="'+ index +'" data-index="'+val+'"><div class="num">'+val+'</div></div>';
                // return '<div style="position:absolute;left:' + Math.random()*10 + 'px;top:' + Math.random()*10 + 'px;"></div>';
            }else {
                //left固定值，top随机
                var vList = [20,62,136,182,224];
                    top1 = vList[Math.floor(Math.random()*5)];
                var temp = index == 0 ? 'cur' : '';
                return '<div data-type="dizi" class="u-dotted '+temp+'" style="left:146px;top:'+top1+'px;" data-i="'+ index +'" data-index="'+val+'"><div class="num">'+val+'</div></div>';

            }
        },
        //创建音频
        _createAudio: function(val,type,index) {
            if(type == 'qin') {
                return '<audio id="audio_'+type+'_'+index+'" src="https://weiyabin.github.io/H5demo/src/data/qin/'+val+'.mp3" preload="preload"></audio>';
            } else {
                return '<audio id="audio_'+type+'_'+index+'" src="https://weiyabin.github.io/H5demo/src/data/dizi/'+val+'.mp3" preload="preload"></audio>';
            }

        },
        bind: function() {
            var self = this;
            $('#qin .g-center, #dizi .g-center').click(function(event){
                var target = $(event.target);

                if(target.hasClass('u-dotted')) {
                    var index = target.attr('data-index'),
                        type = target.attr('data-type'),
                        i = target.attr('data-i');

                    $('#audio_'+type+'_'+ i)[0].play();

                    target.find('.num').show();

                    clearTimeout();
                    setTimeout(function() {
                        if(i == 4) {
                            if(type == "qin") {
                                $('#qin').hide();
                                $('#dizi').show();
                            }else{
                                $('#dizi').hide();
                                $('#input').show();
                            }
                        }
                        target.hide().next().show();
                    }, 2000);
                }
            });
        },
        check: function(rs) {
            var pwd = this.pwd,
                index = $('li').attr('data-index');

            //对比pwd与rs
            // return pwd.toString() == rs.toString();

            for(var i = 0 ; i < pwd.length ; i ++){
                if(rs[i] != pwd[i]){
                    // alert([i,rs[i],pwd[i]].join(' '));
                    return false;
                }
            }
            return true;
        },
        clear: function() {
            // $('.num').html('');
            $('#qin .g-center').html('');
            $('#dizi .g-center').html('');
            $('audio').html('');
            $('#input').find('input').val('');
        }
    }

    var app = new App({

    });
    app.init();

    //绑定5个input
    var pwdNodes = $('.pwd-input');

    pwdNodes.change(function(){
        var self = this;
        var rs =[],
            item = null;


        for(var i = 0 ; i < 5 ; i ++){
            item = $(pwdNodes[i]);

            if(item.val() == ''){
                break;
                // return;
            }else{
                rs.push($(item).val());
            }
        }

        if(rs.length == 5){
            if(app.check(rs)){
                // 跳转到成功界面
                $('#input').hide();
                $('#success').show();
                info.setStatus('share');
                //朋友圈
                wx.onMenuShareTimeline({
                    title   : info.share.shareTimeTitle,
                    link    : info.share.lineLink,
                    imgUrl  : info.share.imgUrl,
                    success : function() {},
                    cancel  : function() {}
                });
                //发送给好友
                wx.onMenuShareAppMessage({
                    title   : info.share.shareTitle,
                    desc    : info.share.descContent,
                    link    : info.share.lineLink,
                    imgUrl  : info.share.imgUrl,
                    success : function() {},
                    cancel  : function() {}
                });
            }else{
                app.clear();
                $('#input').hide();
                $('#fail').show();
                app.init();
                info.setStatus('shareFailed');
                //朋友圈
                wx.onMenuShareTimeline({
                    title   : info.share.shareTimeTitle,
                    link    : info.share.lineLink,
                    imgUrl  : info.share.imgUrl,
                    success : function() {},
                    cancel  : function() {}
                });
                //发送给好友
                wx.onMenuShareAppMessage({
                    title   : info.share.shareTitle,
                    desc    : info.share.descContent,
                    link    : info.share.lineLink,
                    imgUrl  : info.share.imgUrl,
                    success : function() {},
                    cancel  : function() {}
                });
            }
        }
    }).blur(function() {
    });

    $('.again').click(function() {
        $('#fail').hide();
        $('#qin').show();
    });

    $('.share, .share-btn').click(function() {
        $('#share').show();
    });
    $('.shadow').click(function() {
        $('#share').hide();
    });


    //获取验证码接口
    $('.get-code').click(function(e) {

        var phoneNum = $('.phone').val(),
        regexp = /^1[34578]\d{9}$/;

        e.preventDefault();
        e.stopPropagation();

        if (!phoneNum || !regexp.test(phoneNum)) {
            alert('请输入正确的手机号码');
            return false;
        }

        $.ajax({
            url: 'http://mobile-game-appoint.webapp.163.com/appoint/txhd-apple/' + phoneNum + '/other/',
            type: 'GET',
            dataType: 'jsonp',
            scriptCharset: 'utf-8'
        }).done(function(resp) {
            if (resp.status === 'ok') {
            alert('验证码已发送到手机，请注意查收');
            } else {
            alert('获取验证码失败');
            }
        }).fail(function() {
            alert('获取验证码失败');
        });

        return false;
    });
    //提交接口
    $('.submit').click(function(e) {
        document.getElementById('EndAudio').play();

        var phoneNum = $('.phone').val(),
        regexp = /^1[34578]\d{9}$/,
        verify = $('.code').val();

        e.preventDefault();
        e.stopPropagation();

        if (!phoneNum || !regexp.test(phoneNum)) {
            alert('请输入正确的手机号码');
            return false;
        }

        if (!verify) {
            alert('验证码不能为空');
            return false;
        }

        $.ajax({
            url: 'http://mobile-game-appoint.webapp.163.com/appoint_submit_authcode/txhd-apple/' + phoneNum + '/other/',
            type: 'GET',
            dataType: 'jsonp',
            scriptCharset: 'utf-8',
            data: {
                auth_code : verify
            }
        }).done(function(resp) {
            $('#success').hide();
            $('#success-share').show();


            // document.getElementById('EndAudio').play();
        }).fail(function() {
            alert('报名失败');
        });

        return false;
    });

//微信分享
/*var shareInfo = {
          title:$("#share_title").html(),//分享标题
          desc:$("#share_desc").html(),//分享正文
          url:$("#share_url").html(),//分享URL
          webImg:$('#share_pic').attr('data-src'),
          imgurl:$('#share_pic').attr('data-src')
}
nie.use(["nie.util.mobiShare"],function(){
    $(function(){
      MobileShare.setting({//设置分享文案
          title: shareInfo.title,//分享标题
          desc: shareInfo.desc,//分享正文
          url: shareInfo.url,//分享URL
          imgurl: shareInfo.imgurl//分享图片
      });
    });
});*/
var info = {
    share: {
        imgUrl: 'https://weiyabin.github.io/H5demo/src/data/share.jpg',
        shareTimeTitle: '天下HD！！！——中国原创游戏首次登陆苹果旗舰店！',
        descContent: '我报名了《天下HD》西湖 Apple Store 零售店活动，和我一起去玩吧！',
        shareTitle: '天下HD！！！——中国原创游戏首次登陆苹果旗舰店！',
        lineLink: window.location.href
    },
    shareSuccess: {
        // imgurl: 'http://txhd.163.com/2015/yqh/m/data/share.jpg',
        shareTimeTitle: '天下HD！！！——中国原创游戏首次登陆苹果旗舰店',
        descContent: '我报名了《天下HD》西湖 Apple Store 零售店活动，和我一起去玩吧！',
        shareTitle: '天下HD！！！——中国原创游戏首次登陆苹果旗舰店',
    },
    shareFailed: {
        // imgurl: 'http://txhd.163.com/2015/yqh/m/data/share.jpg',
        shareTimeTitle: '听音符破译密码！求音乐达人好友帮忙~',
        descContent: '听音符破译密码！求音乐达人好友帮忙~',
        shareTitle: '听音符破译密码！求音乐达人好友帮忙~',
    },

    setStatus: function(name) {

        var target = this[name];

        if (target) {
            for (var i in target) {
                this.share[i] = target[i];
            }
        }

        return this;
    }
};

// Share weixin
wx_conf.jsApiList = [
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
];

wx.config(wx_conf);

wx.ready(function() {

});

});