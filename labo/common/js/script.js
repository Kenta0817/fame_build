document.addEventListener("DOMContentLoaded", function() {
  var ua = navigator.userAgent;
  if (ua.indexOf("Android 4.") > 0) {
    $("body").addClass("ad4");
  }
});


var isHtmlScrollable = (function() {
  var html = $('html'),
    top = html.scrollTop();
  var elm = $('<div/>').height(10000).prependTo('body');
  html.scrollTop(10000);
  var rs = !!html.scrollTop();
  html.scrollTop(top);
  elm.remove();
  return rs;
})();

var bodyHtml = "body";
if (isHtmlScrollable) {
  bodyHtml = "html";
}

$(function() {

  var scTop;

  $('#sp-open').click(function() {
    scTop = $(window).scrollTop();
    $("html").addClass("sp-active").css("top", -scTop);
  });

  $('#sp-close').click(function() {
    $("html").removeClass("sp-active").css("top", 0);
    $(window).scrollTop(scTop);
  });


  $('.gotop').click(function(e) {
    e.preventDefault();
    $(bodyHtml).animate({
      scrollTop: 0
    });
  });


});


if ($('#menu').length) {
  var A = location.pathname;
  $('#menu').find("li").each(function() {
    var href = $(this).find("a").attr("href");
    if (href == A) {
      $(this).addClass("active");
    }
  });
}
