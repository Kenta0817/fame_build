$(function() {
  var $btnRecruitMenu = $('.sp-recruit-menu .btn-menu');
  var $contRecruitMenu = $('.sp-recruit-menu-cont');
  var $closeRecruitMenu = $('.sp-recruit-menu-cont .btn-close');

  $btnRecruitMenu.on('click', function() {
    $contRecruitMenu.toggleClass('show');
    $('body').toggleClass('recruit-cont-show');
  });

  $closeRecruitMenu.on('click', function() {
    $contRecruitMenu.removeClass('show');
    $('body').toggleClass('recruit-cont-show');
  });


  /**
   * Navigation
   */
  $('.recruit-nav li').navigation({
    exParentPath: '/company/recruit/'
  });


  /**
   * Navigation Fix
   */

  var $win = $(window),
    fixedClass = 'fixed';

  $(window).breakPoint({
    smartPhoneWidth: 768,
    tabletWidth: 0,
    pcMediumWidth: 0,
    onSmartPhoneEnter: function() {

      var $nav = $('.sp-recruit-menu'),
      navPos = $nav.offset().top;

      $win.on('load scroll', function() {
        var value = $(this).scrollTop();
        if ((value + 63) > navPos) {
          $nav.addClass(fixedClass);
        } else {
          $nav.removeClass(fixedClass);
        }
      });

    },
    onPcEnter: function() {

      var $btnEntry = $('.btn-entry'),
        btnPos = $btnEntry.offset().top,
        fixedClass = 'fixed';

      $win.on('load scroll', function() {
        var value = $(this).scrollTop();
        if ((value + 100) > btnPos) {
          $btnEntry.addClass(fixedClass);
        } else {
          $btnEntry.removeClass(fixedClass);
        }
      });


    },
    onSmartPhoneLeave: function() {},
    onPcLeave: function() {}
  });





});


$(window).on('load', function() {
  $('body').addClass('loaded');
});
