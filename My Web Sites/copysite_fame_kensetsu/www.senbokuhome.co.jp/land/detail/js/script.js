$(function() {

  /**
   * main-slide
   */

  if ($('.wrap-box-plan .box-plan').length >= 2) {

    $('.wrap-box-plan').slick({
      // autoplay: true,
      // autoplaySpeed: 2500,
      speed: 800,
      dots: true,
      arrows: false,
      centerMode: true,
      centerPadding: '10.5%',
      dotsClass: 'pager-num',
      adaptiveHeight: true,
      arrows: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          centerMode: false,
        }
      }]
    });
  } else {
    $('.wrap-box-plan .box-plan').addClass('length1');
  }


  /**
   * スマホ時のテーブル
   */


  $(window).breakPoint({
    smartPhoneWidth: 768,
    tabletWidth: 0,
    pcMediumWidth: 0,
    onSmartPhoneEnter: function() {

      $('.tbl-data2').clone().appendTo('.wrap-tbl-data2');


    },
    onPcEnter: function() {},
    onSmartPhoneLeave: function() {
      $('.tbl-data2:nth-child(2)').remove();
    },
    onPcLeave: function() {}
  });



  //featherlightGallery
  if ($('.gallery').length > 0) {
    $('.gallery').featherlightGallery();
  }


});
