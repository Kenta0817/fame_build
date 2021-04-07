/**
 * lazysizes
 */
window.lazySizesConfig = window.lazySizesConfig || {};

// 設定
window.lazySizesConfig.lazyClass = 'lazyload';
lazySizesConfig.srcAttr = 'data-src';

// 読み込みタイミングの調整
lazySizesConfig.loadMode = 1;
lazySizesConfig.expFactor = 3;




/**
 * ページ読み込み
 */

$(window).on('load', function () {

  $('body').addClass('-load');

  setTimeout(function () {
    $('body').addClass('-loaded');
  }, 4000);
});


// $(window).on('load', function () {
//   $('body').addClass('-load');
//   $('body').addClass('-loaded');
// });




$(function () {
  $('.inview').on('inview', function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass('is-inview');
    }
  });
});
