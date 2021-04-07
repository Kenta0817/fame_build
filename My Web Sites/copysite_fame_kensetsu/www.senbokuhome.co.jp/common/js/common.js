/* ==========================================================================
デバイス判定
========================================================================== */

var ua = navigator.userAgent.toLowerCase(),
  $win = $(window),
  spFlag,
  pcFlag;

$(window).breakPoint({
  smartPhoneWidth: 768,
  tabletWidth: 0,
  pcMediumWidth: 0,
  onSmartPhoneEnter: function() {
    // スマホモード時の処理を書く
    spFlag = true;
  },
  onPcEnter: function() {
    // PCモード時の処理を書く
    spFlag = false;
    pcFlag = true;
  },
  onSmartPhoneLeave: function() {
    // スマホモード解除時の処理を書く
    spFlag = false;
  },
  onPcLeave: function() {
    // PCモード解除時の処理を書く
    spFlag = true;
    pcFlag = false;
  }
});


/**
 * Android4
 */


document.addEventListener("DOMContentLoaded", function() {
  var ua = navigator.userAgent;
  if (ua.indexOf("Android 4.") > 0) {
    $("body").addClass("ad4");
  }
});




$(function() {

  /**
   * SP Menu
   */

  var $spMenu = $('#sp-head-menu');
  var $headNavi = $('#head-nav');
  var $overlay = $('body > .overlay');


  $spMenu.on('click', function() {
    $spMenu.toggleClass('close');
    $headNavi.toggleClass('show');
    $('body').toggleClass('show');
  });


  $overlay.on('click', function() {
    $spMenu.removeClass('close');
    $headNavi.removeClass('show');
    $('body').removeClass('show');
  });






  /**
   * FIX nav
   */
  $(window).breakPoint({
    smartPhoneWidth: 768,
    tabletWidth: 0,
    pcMediumWidth: 0,
    onSmartPhoneEnter: function() {
      var fixNav = $('.fix-nav');
      //スクロールが100に達したらボタン表示
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          fixNav.addClass('fix');
        } else {
          fixNav.removeClass('fix');
        }
      });

    },
    onPcEnter: function() {},
    onSmartPhoneLeave: function() {},
    onPcLeave: function() {}
  });


  /**
   * objectFitImages
   */
  window.onload = function() {
    objectFitImages('img.ofi');
  };




  /**
   * Tel link
   */
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 &&
    ua.indexOf('iPod') === -1 ||
    ua.indexOf('Android') > 0 &&
    ua.indexOf('Mobile') > 0 &&
    ua.indexOf('SC-01C') === -1 &&
    ua.indexOf('A1_07') === -1) {
    // 画像
    $('.tel-link img').each(function() {
      var alt = $(this).attr('alt');
      $(this).wrap($('<a>').attr('href', 'tel:' + alt.replace(/-/g, '')));
    });
    // デバイステキスト
    $('.tel-linktext').each(function() {
      var str = $(this).text();
      $(this).addClass('sp-tel-linktext');
      $(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
    });
  }



  /**
   * Navigation
   */

  $('#head-nav li, .snav-list li').navigation();

  //クラス名activeParentにクラス名activeを追加
  $('.snav-list li').navigation({
    activeParentClass: 'active'
  });



  /**
   * ページトップへ
   */


  var topBtn = $('.btn-gotop');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      topBtn.addClass('show');
    } else {
      topBtn.removeClass('show');
    }
  });

  topBtn.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 350);
    return false;
  });


  /**
   * smoothLink
   */

  $('.smooth a').smoothLink();


  /**
   * footer-voice-banner-slide
   */

  $('.footer-voice-banner-slide').slick({
    autoplay: true,
    autoplaySpeed: 10000,
    dots: false,
  });


  /**
   * fixedMenu
   */

  var $fixedMenu = $('.fixed-menu-wrap'),
    $bgSky = $('.bg-sky'),
    bgSkyH,
    fixedMenuH,
    fixedMenuTop,
    bgSkyTop;

  if ($fixedMenu.length) {

    $(window).on('load scroll', function() {

      fixedMenuH = $fixedMenu.innerHeight();
      fixedMenuTop = $fixedMenu.offset().top;

      bgSkyH = $bgSky.innerHeight();
      bgSkyTop = $bgSky.offset().top;

      //スクロール量
      var value = $(this).scrollTop();

      var value1 = value >= bgSkyTop && value <= bgSkyTop + bgSkyH - fixedMenuH;
      var value2 = value >= bgSkyTop + bgSkyH - fixedMenuH;

      if (value1) {
        $fixedMenu.addClass('fixed');
        $fixedMenu.removeClass('bottom');
      } else if (value2) {
        $fixedMenu.addClass('bottom');
      } else {
        $fixedMenu.removeClass('fixed');
      }

    });
  }



  /**
   * 家ラボ
   * ランダムで滑らかな猫登場
   */


  if ($(".mado > .elem3").length) {



    var rand;
    var randFlag = false;



    if (pcFlag) {

      $(".mado > .elem3").each(function() {
        rand = Math.floor(Math.random() * 10); // 1/10の確率
        if (rand == 0) {
          $(this).html('<i class="anime"><img src="/labo/img/anime01.gif" class="h-img"></i>');
        }
      });

      $(".mado > .elem3").mouseleave(function() {
        var target = $(this);
        rand = Math.floor(Math.random() * 10); // 1/10の確率
        console.log(rand);
        setTimeout(function() {
          if (rand == 0) {
            target.html('<i class="anime"><img src="/labo/img/anime01.gif" class="h-img"></i>');
          } else {
            target.html('<i><img src="/labo/img/hover.gif" class="h-img"></i>');
          }
        }, 300);
      });

    } else {

      var tagetWrapOffset = $('.building-inner').offset().top;
      var tagetWrapH = $('.building-inner').innerHeight();

      $(window).on('load scroll', function() {
        //スクロール量
        var value = $(this).scrollTop();
        if (value < tagetWrapOffset || value > tagetWrapOffset + tagetWrapH) {
          if (!randFlag) {
            randFlag = true;
            $(".mado > .elem3").each(function() {
              rand = Math.floor(Math.random() * 5); // 1/10の確率

              if (rand == 0) {
                $(this).html('<i class="anime"><img src="/labo/img/anime01.gif" class="h-img"></i>');
              } else {
                $(this).html('<i><img src="/labo/img/hover.gif" class="h-img"></i>');
              }

            });
          }
        } else {
          randFlag = false;
        }
        $(".mado > .elem3").each(function() {
          var tagetOffset = $(this).offset().top - $(this).innerHeight();
          if (value > tagetOffset - 100 && value < tagetOffset + 250) {
            $(this).addClass('on');
          } else {
            $(this).removeClass('on');
          }
        });
      });
    }

  }

});
