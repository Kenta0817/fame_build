$(function () {


  var modal = new Modal();

  function Modal() {
    var self = this;
    var $modal = $('.modal-voice');
    var $overlay = $('.modal-overlay');
    var $content = $('.modal-content');

    var $modal_category = $('.modal-voice-cat');
    var $modal_text = $('.modal-voice-txt');
    var $modal_image = $('.modal-voice-tegaki img');

    var target_selector = '.box-voice-tegaki';
    var $targets = $(target_selector);
    var $next_arrow = $('.arrow-next');
    var $prev_arrow = $('.arrow-prev');
    var $close = $('.modal-close');
    var arrow_anim_duration = 300;
    var show_anim_duration = 500;
    var switch_anim_duration = 300;
    var img_timeout = 1000;

    var $curr_elm = null;
    var $next_elm = null;
    var $prev_elm = null;
    var is_processing = false;
    var scrollPosition;

    this.init = function() {
      // オーバーレイのクリック
      $overlay.bind('click', function(ev) {
        if (ev.target == $overlay.get(0)) {
          self.closeModal(); // モーダルを閉じる
        }
        $('body').css({
          'position': 'static',
          'top': 0
        });
          window.scrollTo( 0 , scrollPosition );
        return false;
      });
      $close.bind('click', function() {
        self.closeModal(); // モーダルを閉じる
        $('body').css({
          'position': 'static',
          'top': 0
        });
          window.scrollTo( 0 , scrollPosition );
        return false;
      });
      // 要素のクリックイベント
      $targets.bind('click', function(ev) {
        is_processing = false;
        self.showModal($(this)); // 要素を表示
        scrollPosition = $(window).scrollTop();
        $('body').css({
          'width': '100%',
          'left':'0',
          'position': 'fixed',
          'top': -scrollPosition
        });
        return false;
      });

      // 次へクリック
      $next_arrow.bind('click', function(ev) {
        self.showModal($next_elm);
      });

      // 前へクリック
      $prev_arrow.bind('click', function(ev) {
        self.showModal($prev_elm);
      });

      //横方向の座標を取得
      function getPosition(event) {
        return event.originalEvent.touches[0].pageX;
      }

      //モーダルフリック操作
      $('.modal-content-inner').on('touchstart', onTouchStart); //指が触れたか検知
      $('.modal-content-inner').on('touchmove', onTouchMove); //指が動いたか検知
      $('.modal-content-inner').on('touchend', onTouchEnd); //指が離れたか検知

      var direction, position;

      //スワイプ開始時の横方向の座標を格納
      function onTouchStart(event) {
        position = getPosition(event);
        direction = ''; //一度リセットする
      }

      //スワイプの方向（left／right）を取得
      function onTouchMove(event) {
        if (position - getPosition(event) > 70) { // 70px以上移動しなければスワイプと判断しない
          direction = 'left'; //左と検知
        } else if (position - getPosition(event) < -70) { // 70px以上移動しなければスワイプと判断しない
          direction = 'right'; //右と検知
        }
      }

      function onTouchEnd(event) {
        if (direction == 'left') {
          self.showModal($next_elm);
        } else if (direction == 'right') {
          self.showModal($prev_elm);
        }
      }

    };

    // モーダルを閉じる
    this.closeModal = function() {
      $overlay.fadeOut(show_anim_duration);
    };

    // モーダルを表示
    this.showModal = function($elm) {

      if (is_processing) return false;
      if (!$elm || !$elm.length) return false;

      is_processing = true;

      var cat = $elm.attr('data-category');
      var id = $elm.attr('data-id');
      var target_data = data_json.filter(function(item, index) {
        if (item.id == id) return true;
      });
      var data = target_data[0];

      var curr_index = $targets.filter(':visible').index($elm);
      if(curr_index == '-1') return false; // 不具合対応
      $curr_elm = $elm;
      $next_elm = $targets.filter(':visible').eq(curr_index + 1);
      if (curr_index > 0) $prev_elm = $targets.filter(':visible').eq(curr_index - 1);
      else $prev_elm = $('');

      // 次・前ボタンの表示制御
      $next_elm.length ? $next_arrow.fadeIn(arrow_anim_duration) : $next_arrow.fadeOut(arrow_anim_duration);
      $prev_elm.length ? $prev_arrow.fadeIn(arrow_anim_duration) : $prev_arrow.fadeOut(arrow_anim_duration);

      (function() {
        var d = new $.Deferred;

        if ($overlay.is(':visible')) { // モーダル自体が表示されている場合
          // 一旦現在のコンテンツを非表示にする
          $content.fadeOut(switch_anim_duration, function() {
            d.resolve();
          });
        } else { // モーダル自体が表示されていない場合
          d.resolve();
        }
        return d.promise();
      })()
      .then(function() {
          var d = new $.Deferred;
          // 画像のプリロードを行う
          var timer = null;
          $('<img src="' + data['img'] + '">')
            .one('load', function() {
              clearTimeout(timer);
              d.resolve();
            });
          timer = setTimeout(function() {
            // 画像ロードのタイムアウト
            d.resolve();
          }, img_timeout);
          return d.promise();
        })
        .then(function() {
          var d = new $.Deferred;

          // カテゴリ表示
          $modal_category.html(categories[data['category']]);
          // テキスト表示
          $modal_text.html(data['text']);
          // 画像を表示
          $modal_image.attr('src', data['img']);

          $content.fadeIn(switch_anim_duration, function() {
            d.resolve();
          });

          if (!$overlay.is(':visible')) { // モーダルが表示されていない場合は表示
            $overlay.fadeIn(show_anim_duration);
          }

          return d.promise();
        })
        .then(function() {
          is_processing = false;

          // 前後の画像をプリロードする
          var arr = [$next_elm, $prev_elm];
          for (k in arr) {
            var $e = arr[k];
            if ($e.length) {
              var cat = $e.attr('data-category');
              var id = $e.attr('data-id');
              var target_data = data_json.filter(function(item, index) {
                if (item.id == id) return true;
              });
              var data = target_data[0];
              var img = new Image();
              img.src = data['img'];
            }
          }
        });
    };

    this.init();
  }

  //ホバーイメージをプリロード（できてない、というか優先順位が低いのかも。jsonの読み込みが優先されてる？）

  function preloadImg() {
    for (var i = 0; i < arguments.length; i++) {
      $("<img>").attr("src", arguments[i]);
    }
  }
  preloadImg(
    'css/img/snav01_on.png',
    'css/img/snav02_on.png',
    'css/img/snav03_on.png',
    'css/img/snav04_on.png',
    'css/img/snav05_on.png',
    'css/img/snav06_on.png'
  );


  /**
   * 絞り込みボタンクリック処理
   */
  $('#voice > div > nav > ul > li a').on('click', function (eo) {
    //いったんエリア非表示
    $('.box-voice-warp').hide();

    //なにかが選ばれている状態
    $('#voice > div > nav > ul').addClass('isFiltered');

    //ボタンが選択状態かどうか
    isSelected = $(this).hasClass('isSelected');
    //すべて非選択状態に
    $('#voice > div > nav > ul > li a').removeClass('isSelected');
    //ボタンが選択されていたなら全解除、そうでないならボタンを選択状態に
    (!isSelected) ? $(this).addClass('isSelected') : $('#voice > div > nav > ul').removeClass('isFiltered');

    category = $(this).data('category');
    //カテゴリ絞り込みON/OFFで処理変える
    if (isSelected) {
      next_url = [{
        'url': '/reason/voice/',
        'json': '/reason/voice/json'
      }];
      request(next_url);
    } else {
      next_url = [{
        'url': '/reason/voice/?' + $.param({ 'category': category }),
        'json': '/reason/voice/json?' + $.param({ 'category': category })
      }];
      request(next_url);
    }
  });

  /**
   * Ajax処理
   */
  function request(next_url) {
    //pushSearchBtn();
    $.ajax({
      url: next_url[0]['json'],
      type: "get",
      dataType: "json"
    }).done(function (result) {
      // データ入れ替え
      content = '';
      data_json = result;
      result.forEach(function (value) {
        content += '<p class="box-voice-tegaki fade-over" data-category="' + value.category + '" data-id="' + value.id + '">' +
          '<span class="cat">' + value.cat_img_info.name + '</span>' +
          '<a href="javascript:void(0);">' +
          '<img src="' + value.list_img + '" alt="">' +
          '</a>' +
          '</p>';
      })

      //モーダル初期化(Modal()のイベントを初期化したい為)
      var modal_source = $('.modal-overlay').prop('outerHTML');
      $('.modal-overlay').remove();
      $('#contents').after(modal_source);

      $('.box-voice-tegaki').remove();
      $('.wrap-box-voice-tegaki').append(content);

      //非表示にしたエリアを表示
      $('.box-voice-warp').show();

      // もっと見るボタンを表示
      var voice_count = $(".wrap-box-voice-tegaki > p").length;
      if (voice_count > 3) {
        $(".box-voice").removeClass("all");
      } else {
        $(".box-voice").addClass("all");
      }
      current_url = next_url[0]['url'];
      history.pushState(null, null, current_url);
      var modal = new Modal();
    }).fail(function () {
      console.log('There is an error in the system');
    });
  }


  var targetImage = $('.box-voice-sttl img,.box-step-img img,.voice-illust img,.voice-shape img');

  $(window).breakPoint({
    smartPhoneWidth: 768,
    tabletWidth: 0,
    pcMediumWidth: 0,
    onSmartPhoneEnter: function () {
      targetImage.each(function (i) {
        var imageW = $(this).attr('width');
        var imageH = $(this).attr('height');
        $(this).css({
          'width': imageW / 2,
          'height': imageH / 2
        });
      });
    },
    onPcEnter: function () {
      targetImage.removeAttr('style');
    },
    onSmartPhoneLeave: function () {
      targetImage.removeAttr('style');
    },
    onPcLeave: function () { }
  });


  /**
   * inview
   */

  $('.fadein').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('inview');
    } else {
      // $(this).removeClass('inview');
    }
  });


  /**
   * 開閉
   */

  var btn = $(".box-voice .btn-more");
  var speed = 400;
  btn.on('click', function () {
    var box = $(this).parents('.box-voice');
    var position = box.offset().top - 30;
    box.toggleClass('all');

    if (box.hasClass('all')) {
      $('body,html').animate({
        scrollTop: position
      }, speed, 'swing');
    }

    return false;
  });




  $(window).breakPoint({
    smartPhoneWidth: 768,
    tabletWidth: 0,
    pcMediumWidth: 0,
    onSmartPhoneEnter: function () { },
    onPcEnter: function () {
      var h = $(window).height();
      var x = 1080;
      var m = $('.modal-content');
      if (h <= x) {
        m.css('height', '100%');
      }
      $(window).resize(function () {
        h = $(window).height();
        if (h <= x) {
          m.css('height', '100%');
        } else {
          m.css('height', 'auto');
        }
      });
    },

    onSmartPhoneLeave: function () {
      $('.modal-content').css('height', 'auto');
    },
    onPcLeave: function () { }
  });


});
