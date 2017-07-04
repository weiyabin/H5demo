$(function) {
    var status = true;

    var touchController = {
        _options: {
            targetEl: $('body html'),
            threshold: 15
        },

        _beginY: 0,
        _endY: 0,
        _upCallback: $.noop,
        _downCallback: $.noop,

        _recordStart: function(e){
            this._beginY = e.originalEvent.touches[0].pageY;
        },
        _recordStop: function(e){
            this._endY = e.originalEvent.touches[0].pageY;
        },
        _dispatch: function(){
            this._endY - this._beginY + this._options.threshold < 0
                && this._upCallback();
            this._endY - this.
        },
        init: function(opts) {

            var that = this;
            opts && opts.scrollUp && (this._upCallback = opts.scrollUp);
            opts && opts.scrollDown && (this._downCallback = opts.scrollDown);

            this._options.targetEl.bind('touchstart', function(e) {
                that._recordStart(e);
            }).bind('touchmove', function(e){
                that._recordStop(e);
                that._dispatch();
            });
        }
    };

    touchController.init({
        scrollUp: function() {
            if(status){
                $('homepage').hide();
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
            this._createDOW();
        },
        _createPwd: function() {
            var pwd = [],
                i = 0,
                l = 5;
            this.pwd = [1, 7, 3, 5, 2];
        },
        _createDOW: function() {
            var pwd = this.pwd,
                qinArray = [],
                diziArray = [],
                audioArray1 = [],
                yinArray = [1, 7, 3, 5, 2],
                val = null;
            for(var i = 0; i < pwd.length; i++) {
                val = pwd[i];
                qinArray.push(this._createDotted(val, 'qin', i));
                diziArray.push(this._createDotted(val, 'dizi', i));
                audioArray.push(this._createAudio(yinArray[i], 'qin', i));
                audioArray1.push(this._createAudio(yinArray[i], 'dizi', i));

            }
        },
        _createDotted: function(val, type, index) {
            if(type == 'qin') {
                var tList = [],
                    left = Math.randow()90,
                    top = tList[Math.floor(Math.randow()*10)];
                return
            }else {
                var vList = [],
                    top1 = vList[Math.floor(Math.randow()*5)];
                    temp = index == 0? 'cur' : '';
                return
            }
        },
        _createAudio: function(val, type, index) {

        },
        bind: function() {
            var self = this;
            $('#qin .g-center, #dizi .g-center').click(function(event) {
                var target = $(event.target);

                if(target.hasClass('u-dotted')) {
                    var index = target.attr('data-index'),

                }
            })
        }
    }
}