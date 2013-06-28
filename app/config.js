seajs.config({
  // 加载 shim 插件
  plugins: ['shim'],
  // 配置 shim 信息，这样我们就可以通过 require('jquery') 来获取 jQuery
  shim: {
    // for jquery
    'jquery': {
        src: '../jquery/jquery-1.10',
        exports: 'jQuery'
    }
    ,'jquery.easing' : {
        src: '../jquery-plugin/easing/jquery.easing.1.3',
        deps: ['jquery']
    }
    ,'jquery.slider' : {
        src: '../jquery-plugin/slider/jquery.bxslider',
        deps: ['jquery','../slider/jquery.bxslider.css']
    }
    ,"jquery.mousewheel" : {
        src: '../jquery-plugin/jquery.mousewheel',
        deps: ['jquery']
    }
    ,"jquery.bgstretcher" : {
        src: '../jquery-plugin/bgstretcher-2/bgstretcher',
        deps: ['jquery' , '../bgstretcher-2/bgstretcher.css']
    }
      ,"jquery.fancybox" : {
          src: '../jquery-plugin/slider/jquery.fancybox.pack'
      }
      ,"jquery.cloudzoom" : {
          src: '../cloudzoom/cloudzoom'
      }
  }
  ,
  alias : {
  }
});