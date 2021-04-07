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


    //==================================================
    //   utility
    //==================================================
    ;(function() {

      $('a.scroll[href^="#"]').futSmoothScroll();

      $('img.ovImg').futHoverImg();

      $('.shareFb').futShare({ type: 'facebook' });
      $('.shareTw').futShare({ type: 'twitter' });
      $('.shareLine').futShare({ type: 'line' });
      $('.shareIn').futShare({ type: 'linkedin' });

    })();



    //==================================================
    //   GFoot gallery
    //==================================================
    ;(function(){

      var $Slide = $('#GallerySlide');
      var $itemList = $Slide.find('.itemList');
      var $items = $itemList.children('li');
      var itemLength= $items.length;
      var itemW = 0;

      $(win).on('load.gallery layoutchange.gallery',function(){

        $Slide.removeClass('active').removeAttr('style');

        itemW = $items.eq(0).width();

        $itemList.html($items);

        if(itemW*$itemList.children('li').length<MYAPP.winW){
          $itemList.append($items.clone());
        }

        $itemList.append($itemList.html());
        $itemList.width($items.eq(0).width()*$itemList.children('li').length);

        setTimeout(function(){
          $Slide.addClass('active');
        },200);

      });


    })();


  });




})(jQuery, window, document);
