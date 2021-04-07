/*!--------------------------------------------------------------------------*
 *  
 *  common.js
 *  
 *--------------------------------------------------------------------------*/
;
(function($, win, doc) {
$(function(){




  //FUTAPPS有効化
  window.MYAPP = new FUTAPPS({
    focusInfo : {
      disabled:true
    },
    winInfo : {
    }
  });


  ;(function() {

    $('a.scroll[href^="#"]').futSmoothScroll();

    $('img.ovImg').futHoverImg();
    // $('img.ovImgFd').futHoverImg({ fade: true });

    $('.hovCls').futHoverClass();



    $('.shareFb').futShare({ type: 'facebook' });
    $('.shareTw').futShare({ type: 'twitter' });
    $('.shareLine').futShare({ type: 'line' });
    $('.shareIn').futShare({ type: 'linkedin' });

    $('a[href^="tel:"]').futPreventLink({type:'pc'});

    //$('.pagetop').futScrollAddClass({position:1000,cls:'active'});

    //$('.itemList li').futTile(3,{resize:true});

    //$('.slider')).children('li').futImgToBg();

    //$('#GHeadFix').futFixedScroll();

    //$('.tabSect').futTabCont({fade:true});

    //$('.acWrap').futAccordion();

    // $('body').futPreloader({
    //   before :function(){},
    //   progress:function(){},
    //   after:function(){}
    // });

  })();


  //==================================================
  //  browser check
  //==================================================
  ;(function() {

    if(MYAPP.browser.isIE){
      $('body').addClass('is-IE');
    } else if(MYAPP.browser.isTb){
      $('body').addClass('is-tablet');
    }

    if(MYAPP.browser.isTouch){
      $('body').addClass('is-touch');
    }

    if(MYAPP.browser.isAndroid){
      $('body').addClass('is-android');
    }

  })();


  /*
   * page top
   */
  ;(function() {
    $('#PageTop').futScrollAddClass({position:99,cls:'active',bottomAllActive:false});
  })();




});
})(jQuery, window, document);
