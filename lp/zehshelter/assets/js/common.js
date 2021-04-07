/*!--------------------------------------------------------------------------*
 *
 *  common.js
 *
 *--------------------------------------------------------------------------*/
;
(function($, win, doc) {


  $(function() {

    //FUTAPPS有効化
    window.MYAPP = new FUTAPPS({
      focusInfo: {
        disabled: true
      },
      winInfo: {}
    });


    //==================================================
    //   utility
    //==================================================
    ;
    (function() {

      $('a.scroll[href^="#"]').futSmoothScroll({
        fixAdjustTarget: '#GHead'
      });

      $('img.ovImg').futHoverImg();
      $('.imgToBg').futImgToBg();

    })();

    //==================================================
    //   sp menu open
    //==================================================

    ;
    (function() {

      var $GHead = $('#GHead');
      var $MenuBtn = $('#MenuBtn');
      var $MenuWrap = $('#MenuWrap');

      $MenuBtn.on('click', function() {
        $('body').toggleClass('is-menuOpen');
      });

      $MenuWrap.on('touchmove', function(e) {
        if (MYAPP.winLayout == 'sp') {
          e.preventDefault();
        }
      });

      $MenuWrap.find('a').on('click', function() {
        $('body').removeClass('is-menuOpen');
      });

    })();



    //==================================================
    //   pc/sp menu appear
    //==================================================
    ;
    (function() {

      var winT = 100;

      $(win).on('scroll.menu layoutchange', function() {

        if (MYAPP.winLayout == 'sp') {

          if (MYAPP.winT > winT) {
            $('body').removeClass('is-headActive');
          } else {
            $('body').addClass('is-headActive');
          }

          if (MYAPP.winT == 0) {
            $('body').addClass('is-top');
          } else {
            $('body').removeClass('is-top');
          }

        } else {
          if (MYAPP.winT > 0) {
            $('body').addClass('is-headActive');
          } else {
            $('body').removeClass('is-headActive');
          }
        }

        winT = MYAPP.winT;

      }).trigger('scroll.menu');
    })();


    //==================================================
    //   pc FixedScroll
    //==================================================
    ;
    (function() {
      var $GHead = $('#GHead');
      $GHead.futFixedScroll();
    })();


    //==================================================
    //   navigation position Set
    //==================================================
    ;
    (function() {

      var $GHead = $('#GHead');
      var $headInner = $GHead.find('.headInner');
      var $InfoNav = $('#InfoNav');
      var $MenuWrap = $('#MenuWrap');

      $(win).on('layoutchange.navset', function() {

        if (MYAPP.winLayout == 'sp') {
          $InfoNav.insertAfter($GHead);
          $MenuWrap.insertAfter($GHead);
        } else {
          $InfoNav.appendTo($GHead);
          $MenuWrap.appendTo($headInner);

        }

      }).trigger('layoutchange.navset');


    })();





    //==================================================
    //   GFoot gallery
    //==================================================
    ;
    (function() {


    })();


    //==================================================
    //   tab
    //==================================================
    ;
    (function() {



      /**
       * Tab
       */
      $('.sct-menu-contents-tab li a').click(function() {
        $('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        $('.is-opened').removeClass('is-opened');
        const index = $(this).index();
        $('.sct-menu-contents-panel').eq(index).addClass('is-opened');

        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;

        var navH = $('.sct-menu-contents-tab').height();

        $('body,html').animate({
          scrollTop: position - navH + 1
        }, 400, 'swing');

        return false;

      });

    })();



    //==================================================
    //   詳しい情報を見る
    //==================================================
    ;
    (function() {

      /**
       * 詳しい情報を見る
       */
      $('#more-btn').click(function() {

        $(this).addClass('is-active');

        $('.sct-menu-contents').slideDown();

        var position = $('.sct-menu-contents-tab').offset().top;
        var offset = $('.sct-menu-contents-tab').offset();
        var navH = $('.sct-menu-contents-tab').height();

        $('body,html').animate({
          scrollTop: position
        }, 400, 'swing');

        $('img[usemap]').rwdImageMaps();



        // ナビゲーションのリンクを指定
        var navLink = $('.sct-menu-contents-tab li a');

        // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
        var contentsArr = new Array();
        for (var i = 0; i < navLink.length; i++) {
          // コンテンツのIDを取得
          var targetContents = navLink.eq(i).attr('href');
          // ページ内リンクでないナビゲーションが含まれている場合は除外する
          if (targetContents.charAt(0) == '#') {
            // ページ上部からコンテンツの開始位置までの距離を取得
            var targetContentsTop = $(targetContents).offset().top;
            // ページ上部からコンテンツの終了位置までの距離を取得
            var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
            // 配列に格納
            contentsArr[i] = [targetContentsTop, targetContentsBottom]
          }
        };

        // 現在地をチェックする
        function currentCheck() {

          var navH = $('.sct-menu-contents-tab').height();

          // 現在のスクロール位置を取得
          var windowScrolltop = $(window).scrollTop() + navH;
          for (var i = 0; i < contentsArr.length; i++) {
            // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
            if (contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
              // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
              navLink.removeClass('is-active');
              navLink.eq(i).addClass('is-active');
              i == contentsArr.length;
            }
          };
        }

        // ページ読み込み時とスクロール時に、現在地をチェックする
        $(window).on('load scroll', function() {
          currentCheck();
        });




        $(window).scroll(function() {

          var h = $('.sct-menu-contents').offset().top + $('.sct-menu-contents').height() - $('.sct-menu-contents-tab').height();

          if ($(window).scrollTop() > offset.top) {
            $('body').addClass('menuFix');
          } else {
            $('body').removeClass('menuFix');
          }

          if ($(window).scrollTop() > h) {
            $('body').addClass('menuOut');
          } else {
            $('body').removeClass('menuOut');
          }

          // console.log($(window).scrollTop());
        });

        return false;

      });




    })();


  });




})(jQuery, window, document);
