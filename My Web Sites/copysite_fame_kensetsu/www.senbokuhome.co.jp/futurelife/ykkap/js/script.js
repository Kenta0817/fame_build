$(function () {

  var $mainWrap = $("#main-wrap");
  var $biography = $("#biography");
  var $biographyH;
  var $profile = $(".profile");
  var profileOpen;
  var offsetTop;
  var wW, wH, scTop;


  var isHtmlScrollable = (function () {
    var html = $('html'), top = html.scrollTop();
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


  function adjust() {
    wW = window.innerWidth;
    $biographyH = $biography.outerHeight();
    offsetTop = $mainWrap.offset().top + $mainWrap.outerHeight();

    if (!profileOpen) {
      $biography.css("margin-top", "-" + $biographyH + "px");
    }
  }



  $profile.click(function () {
    if (!profileOpen) {
      $biography.animate({ "margin-top": 0 }, 500, function () {
        $(bodyHtml).animate({ scrollTop: offsetTop }, 500);
      });
      profileOpen = true;
    } else {
      $biography.animate({ "margin-top": "-" + $biographyH + "px" }, 500);
      profileOpen = false;
    }
    return false;
  });



  var resizeTimer = false;
  $(window).resize(function () {
    if (resizeTimer !== false) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function () {
      if (wW == window.innerWidth) { return; }//スマホ用
      //
      adjust();
    }, 200);

  });


  adjust();

});
