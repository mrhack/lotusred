/*
 * @desc    : main model
 * @author  : hdg
 * @data    : 2013-06-18
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    /*Browser detection patch*/
    jQuery.browser = jQuery.browser || {};
    jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

    require('jquery.easing');
    require('jquery.slider');
    require('jquery.mousewheel');
    // for hash load
    !!(function(){
        var supportHashChangeEvent = false;
        $(window).bind('hashchange' , function(){
            supportHashChangeEvent = true;
            renderHash( location.hash );
        });
        var $navs = $('nav a')
            .click(function(){
                setTimeout(function(){
                    if( !supportHashChangeEvent )
                        renderHash(this.getAttribute('href'));
                } , 100);
            });
        var renderHash = function( hash ){
            hash = hash || '#index';
            // fix nav
            hash = hash.replace('#' , '');
            $navs
                .removeClass('selected')
                .filter(function(){
                    return !!$(this).attr('href')
                        .match( new RegExp('#' + hash , 'i') );
                })
                .addClass('selected');
            var $main = $('.main')
                .children()
                .filter(':visible')
                .hide()
                .end()
                .end()
                .find('.main-' + hash )
                .fadeIn();

            // init page js
            if( pageInit[hash] ){
                pageInit[hash]( $main );
                pageInit[hash] = null;
            }
        }

        var initSlider = function( $main ){
            $main.find('.slider')
                .bxSlider({
                    useCSS: false,
                    easing: 'easeOutQuart',
                    auto: false,
                    speed: 800,
                    "onSliderLoad": function(){
                    }
                });
        }
        var pageInit = {
            events: initSlider,
            photos: initSlider,
            press: initSlider,
            index: function( $main ){
                // init slider
                var initSliderBtn = function( $slider , $list , min , max ){
                    $slider// when start to drag
                        .on('mousedown' , function( ev ){
                            _slideMousedown.call( this , $slider , $list , min , max , ev );
                        })
                        .on('touchstart' , function( ev ){
                            _slideMousedown.call( this , $slider , $list , min , max , ev );
                        });

                    $list
                        .mousewheel(function(event, delta, deltaX, deltaY){
                            var $con = $(this);
                            var scrollTop = $con.scrollTop();
                            var height = $list.height();
                            var conHeight = $list[0].scrollHeight;
                            if( delta > 0 ) {// up
                                scrollTop -= height * 5 / 10;
                            } else { //down
                                scrollTop += height * 5 / 10;
                            }
                            var top = min + ( ( conHeight - height <= 0 ) ? 0 : ( max - min ) * scrollTop / ( conHeight - height ) );
                            $slider
                                .stop( true , false )
                                .animate({
                                    'top': Math.max( Math.min( top , max ) , min )
                                } , 500 );
                            // change the scroll value
                            $con.stop( true , false )
                                .animate({
                                    scrollTop: scrollTop
                                } , 500 );
                        });
                }
                var _slideMousedown = function( $slider , $list , min , max , ev ){
                    var slider = this
                     , off = $slider.offsetParent().offset();
                    var $con = $list;
                    var height = $con.height();
                    var conHeight = 0;
                    $con.children().each(function(){
                        conHeight += $(this).height();
                    });
                    var moveEvent = function( pageY ){
                        var value = Math.max( Math.min( pageY - off.top , max ) , min );
                        slider.style.top = value + 'px';
                        // change the scroll value
                        $con.scrollTop( ( conHeight - height ) * ( value - min ) / ( max - min )  );
                    }
                    var endEvent = function(ev){
                            $(this)
                                .off('.slide-drag');
                        }
                    // bind mouse move event
                    $(document)
                        .on('mousemove.slide-drag', function( ev ){
                            moveEvent( ev.pageY );
                        })
                        .on('touchmove.slide-drag', function( ev ){
                            moveEvent( ev.originalEvent.pageY );
                        })
                        .on('touchend.slide-drag', endEvent )
                        .on('mouseup.slide-drag', endEvent );
                }

                // init here
                initSliderBtn($main.find('.slider-btn') , $main.find('.amet-list') , 0 , 211);
            }
        }
        renderHash( location.hash );
    })();


    // init bgslider
    require('jquery.bgstretcher');
    $(document).ready(function(){
    //  Initialize Backgound Stretcher
        $('body').bgStretcher({
            images: ['img/bg.jpg', 'img/bg1.jpg']
            , imageWidth: 1024
            , imageHeight: 768
        });
    });
});