// parallax handler
$(function() {

  'use strict';
  var set = false;

  if ($("#js-parallax-window").length > 0) {
    parallax();
  }

  $(window).on('scroll', $.throttle(parallax, 50));

  setTimeout(function() {
    $(window).trigger('scroll');
  }, 100);

  function parallax() {
    function _par() {
      var plxBackground = $("#js-parallax-background");
      var plxWindow = $("#js-parallax-window");

      var plxWindowTopToPageTop = $(plxWindow).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

      var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
      var windowInnerHeight = window.innerHeight;
      var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
      var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
      var plxSpeed = 0.35;

      plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
    }

    if( $("#js-parallax-window").length > 0 ) {

      if (!set) {
        set = true;
        _par();
         $('.parallax-background').backstretch([
              "http://chrisdonham.com/venues/2.jpg"
            , "http://chrisdonham.com/venues/3.jpg"
            , "http://chrisdonham.com/venues/4.jpg"
            , "http://chrisdonham.com/venues/5.jpg"
            , "http://chrisdonham.com/venues/6.jpg"
          ], {duration: 6000, fade: 100});

      } else {
        _par();
      }
    }
  }
});