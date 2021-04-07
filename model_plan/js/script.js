$(function() {

/**
 * 縦文字中央寄せ
 */

 if($('.vertical-width-wrap').length > 0){
   
 var $targetWrap = $('.vertical-width-wrap');
 var $target = $('.vertical-width');
 var targetWrapWid;
 var targetWid;
$(window).breakPoint({
  smartPhoneWidth: 768,
  tabletWidth: 0,
  pcMediumWidth: 0,
  onSmartPhoneEnter: function() {
  },
  onPcEnter: function() {
      targetWrapWid = $targetWrap.width();
      targetWid = $target.width();
      $target.css('margin-left',(targetWrapWid - targetWid) / 2);
  },
  onSmartPhoneLeave: function() {
    targetWrapWid = $targetWrap.width();
    targetWid = $target.width();
  },
  onPcLeave: function() {
    targetWrapWid = $targetWrap.width();
    targetWid = $target.width();
      $target.css('margin-left','0');
    }
});
}


/**
 * アコーディオン
 */

 if($('.btn-accordion').length > 0){

   var $btn = $(".btn-accordion");
   var $target = $(".accordion-target");

$(window).breakPoint({
  smartPhoneWidth: 768,
  tabletWidth: 0,
  pcMediumWidth: 0,
  onSmartPhoneEnter: function() {
    $target.hide();
  },
  onPcEnter: function() {
    $target.show();
    $btn.removeClass("active");
  },
  onSmartPhoneLeave: function() {
    $target.show();
    $btn.removeClass("active");
  },
  onPcLeave: function() {
    $target.hide();
  }
});
}



});
