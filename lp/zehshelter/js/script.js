$(function () {

  var modalFlag = false;
  var CurrentScrollY;

  $('.modal-btn').click(function () {

    if (!modalFlag) {
      CurrentScrollY = $(window).scrollTop();
      $('body').css({
        position: 'fixed',
        width: '100%',
        top: -1 * CurrentScrollY
      });
      modalFlag = true;
    }

    $('#Wrapper').addClass('is-hide');


    if ($(this).hasClass('normal')) {
      $('.normal-modal').addClass('is-open');
      $('.about-wrap').addClass('-normal');
      $('.modal-backBtnWrapper.-normal').addClass('is-show');
    } else {
      $('.disaster-modal').addClass('is-open');
      $('.about-wrap').addClass('-disaster');
      $('.modal-backBtnWrapper.-disaster').addClass('is-show');
    }

    return false;

  });

  $('.modal-backBtn').click(function () {
    if (modalFlag) {
      $('body').attr({
        style: ''
      });
      $('html, body').prop({
        scrollTop: CurrentScrollY
      });
      modalFlag = false;
    }

    $('#Wrapper').removeClass('is-hide');
    $('.normal-modal').removeClass('is-open');
    $('.disaster-modal').removeClass('is-open');
    $('.about-wrap').removeClass('-normal');
    $('.about-wrap').removeClass('-disaster');
    $('.modal-backBtnWrapper').removeClass('is-show');

    return false;
  });

});
