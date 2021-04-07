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



  //==================================================
  //  gallery slide
  //==================================================
  ;(function(){


    var $sect = $('.leadSect');
    var $slideBlock = $sect.find('.slideBlock');

    $slideBlock.find('.itemList').each(function(index){

      var $itemList = $(this);
      var $items = $itemList.children('li');
      var itemLength= $items.length;
      var itemW = 0;
      var newItemW = 0;
      var resizeTm = null;
      var duration = 3;

      $(win).on('load.gallery' + index + ' resize.gallery' + index,function(){

        clearTimeout(resizeTm);

        resizeTm = setTimeout(function(){

         $itemList.children('li').removeAttr('style');

          newItemW = $items.eq(0).innerWidth();

          if(newItemW==itemW){
            return false;
          }

          itemW = newItemW;

          $($itemList).removeClass('active').removeAttr('style');


          $itemList.children('li').detach();
          $itemList.append($items);

          if(MYAPP.winLayout=='sp'){
            return false;
          }

          if(itemW*$itemList.children('li').length<$(win).width()){
            $itemList.append($items.clone(true));
          }

          $itemList.append($itemList.children('li').clone(true));

          $itemList.width(itemW*$itemList.children('li').length);

          $itemList.css({
            'animation-duration':$itemList.children('li').length*duration+'s'
          });

          setTimeout(function(){
            $itemList.addClass('active');
          },10);

        },(itemW==0)?0:50);

      });


    });


  })();



});
})(jQuery, window, document);
