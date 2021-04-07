/**
 * ページ読み込み
 */

$(function () {

$(window).on('load', function () {
  $('body').addClass('-loaded');
});




  $('.inview').on('inview', function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass('is-inview');
    }
  });
});
