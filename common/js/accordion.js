$(function(){

  var $btn = $(".btn-accordion");
  var $target = $(".accordion-target");
  $target.hide();
  $btn.click(function(){
      $(this).toggleClass("active").next('.accordion-target').slideToggle(300);
  });


    // $(window).breakPoint({
    //   smartPhoneWidth: 768,
    //   tabletWidth: 0,
    //   pcMediumWidth: 0,
    //   onSmartPhoneEnter: function() {
    //     $target.hide();
    //   },
    //   onPcEnter: function() {
    //     $target.show();
    //     $btn.removeClass("active");
    //   },
    //   onSmartPhoneLeave: function() {
    //     $target.show();
    //     $btn.removeClass("active");
    //   },
    //   onPcLeave: function() {
    //     $target.hide();
    //   }
    // });


});
