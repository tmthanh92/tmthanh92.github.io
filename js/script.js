/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;

  function privateMethod1() {
    // todo
  }

  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    publicMethod1: privateMethod1
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod1();
});

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'carousel-responsive';
  var win = $(window);
  var imgMaxHeightIdx = 0;
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function getBiggestHeight(imgs) {
    var biggestHeightSize = 0;
    for (var i = 0, len = imgs.length; i < len; i++) {
      var imgHeight = imgs.eq(i).height();
      biggestHeightSize = Math.max(imgHeight, biggestHeightSize);
    }
    return biggestHeightSize;
  }

  function setWrapperSize(that) {
    var biggestHeight = 0;
    var counter = 0;
    that.imgs.each(function(index) {
      $(this).on('load', function() {
        var imgHeight = $(this).height();
        if(imgHeight > biggestHeight){
          biggestHeight = imgHeight;
          imgMaxHeightIdx = index;
        }
        counter++;
        if (counter === that.imgs.length) {
          console.log(biggestHeight);
          that.element.height(biggestHeight);
        }
      });
    });
  }
  Plugin.prototype = {
    init: function() {
      var that = this;
      this.imgs = this.element.find('img');
      setWrapperSize(this);
      win.on('resize', function() {
        that.element.height(that.imgs.eq(imgMaxHeightIdx).height());
      });
    },

    destroy: function() {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });
  });

}(jQuery, window));
