$(document).ready(function() {


  if ($('.tab').length > 0) {
    var panel = $('.sp-panel');
    var tab = $('.tab li');
    $(window).breakPoint({
      smartPhoneWidth: 768,
      tabletWidth: 0,
      pcMediumWidth: 0,
      onSmartPhoneEnter: function() {

        panel.css('display', 'none');
        panel.eq(0).css('display', 'block');

        tab.each(function() {
          $(this).click(function() {

            var index = $(this).index();

            panel.eq(index).fadeIn();
            panel.eq(index).siblings().fadeOut();

            tab.removeClass('active');

            $('.tab').each(function() {
            $(this).find('li').eq(index).addClass('active');
            });

          });
        });

        $('.tab-btm li').click(function() {
          $('body,html').animate({
            scrollTop: 0
          }, 600);
          return false;
        });

      },
      onPcEnter: function() {

        panel.css('display', 'block');

        $('.tab').each(function() {

        $(this).find('li').removeClass('active');
        $(this).find('li').eq(0).addClass('active');

        });

      },
      onSmartPhoneLeave: function() {},
      onPcLeave: function() {}
    });

  }


  if ($('.gallery').length > 0) {
    $('.gallery').featherlightGallery();
  }

});
