/**
 * ie & edge
 */

document.addEventListener("DOMContentLoaded", function() {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var version;
  var isIE = (userAgent.indexOf('msie') >= 0 ||
    userAgent.indexOf('trident') >= 0);
  if (userAgent.indexOf('edge') > -1) {
    $("body").addClass("edge");
  } else if (isIE) {
    $("body").addClass("msie");
  }
});


$(function() {

  //matchHeight
  $('.event-list-event a,.info-inner,.box-showroom a').matchHeight();

  $('.bnr-land-num strong').children().andSelf().contents().each(function() {
      if (this.nodeType == 3) {
          $(this).replaceWith($(this).text().replace(/(.)/g, '<span>$&</span>'));
      }
  });

});


$(window).load(function() {

  //works-slide01
  $('#works-slide01 ul').simplyScroll({
    autoMode: 'loop',
    pauseOnHover: false,
    pauseOnTouch: false
  });
  //works-slide02
  $('#works-slide02 ul').simplyScroll({
    autoMode: 'loop',
    pauseOnHover: false,
    direction: 'backwards',
    pauseOnTouch: false
  });


  $('#works-slide01').addClass('load');
  $('#works-slide02').addClass('load');

  var sl01w = $('#works-slide01 ul').width();
  var sl02w = $('#works-slide02 ul').width();

  $('#works-slide01 ul').css({
    'width': sl01w + 1
  });

  $('#works-slide01 div.simply-scroll-list').css({
    'width': (sl01w * 2) + 2
  });

  $('#works-slide02 ul').css({
    'width': sl02w + 1
  });

  $('#works-slide02 div.simply-scroll-list').css({
    'width': (sl02w * 2) + 2
  });



});
