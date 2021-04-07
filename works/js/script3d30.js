//////////////////////////////////
//初期処理
//////////////////////////////////

$(window).on("load", function() {
  $(".index-gallery").isotope({
    // options
    itemSelector: ".index-gallery .item",
    // layoutMode: 'fitRows'
    masonry: {
      columnWidth: ".index-gallery .grid-item"
    }
  });

  $(".bookmark-gallery").isotope({
    // options
    itemSelector: ".bookmark-gallery .item",
    // layoutMode: 'fitRows'
    masonry: {
      columnWidth: ".bookmark-gallery .grid-item"
    }
  });

  var userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('msie') == -1 && userAgent.indexOf('trident') == -1) {
    $("img.lazy").lazyload({
      threshold: 1,
      effect: 'fadeIn',
      effect_speed: 1000,
      failure_limit: 1,
    });
  }

  // if ($(".index-gallery.container").length) {
  //   var $container = $(".container").isotope();
  //   $(".filter a").click(function() {
  //     $(".filter .current").removeClass("current");
  //     $(this).addClass("current");
  //     var selector = $(this).attr("data-filter");
  //     $container.isotope({
  //       filter: selector,
  //       animationOptions: {
  //         duration: 1000,
  //         easing: "swing",
  //         queue: false
  //       }
  //     });
  //     return false;
  //   });
  // }


  $('.theme-nav li:not(:first-child) a').each(function() {
    var $href = $(this).attr('href');
    var url = location.href.split('?');
    url = url[0] + '/';
    if (url.match($href)) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  if ($('.theme-nav li .active').length === 0) {
    $('.theme-nav li:first-child a').addClass('active');
  }

});

$(function() {
  //メインスライダー
  if ($('.main-gallery').length) {
    $('.main-gallery').slick({
      dots: false,
      arrows: false,
      autoplay: true,
      fade: true,
      pauseOnHover: false,
      swipe: false,
      autoplaySpeed: 3000,
      speed: 1000,
    });
  }

});




// トースト通知クラス(コピーボタン用)
var Toast = (function() {
  var timer;
  var speed;

  function Toast() {
    this.speed = 3000;
  }
  // メッセージを表示。表示時間(speed)はデフォルトで3秒
  Toast.prototype.show = function(message, speed) {
    if (speed === undefined) speed = this.speed;
    $('.toast').remove();
    clearTimeout(this.timer);
    $('body').append('<div class="toast">' + message + '</div>');
    var leftpos = $('body').width() / 2 - $('.toast').outerWidth() / 2;
    $('.toast').css('left', leftpos).hide().fadeIn('fast');

    this.timer = setTimeout(function() {
      $('.toast').fadeOut('slow', function() {
        $(this).remove();
      });
    }, speed);
  };
  // 明示的にメッセージを消したい場合は使う
  Toast.prototype.hide = function() {
    $('.toast').fadeOut('slow', function() {
      $(this).remove();
    });
  }
  return Toast;
})();


// //コンテンツを囲む要素をidで指定
// var index = document.querySelector('.index-gallery');
//
// //すべての画像を読み込み終わった後に関数を実行
// imagesLoaded(index, function() {
//   var msnry = new Masonry(index, {
//     itemSelector: '.item', //コンテンツのclass名
//     columnWidth: '.grid-item',
//   });
// });
//
//
// //コンテンツを囲む要素をidで指定
// var bookmark = document.querySelector('.bookmark-gallery');
//
// //すべての画像を読み込み終わった後に関数を実行
// imagesLoaded(bookmark, function() {
//   var msnry = new Masonry(bookmark, {
//     itemSelector: '.item', //コンテンツのclass名
//     columnWidth: '.grid-item',
//   });
// });

$(function() {
  var $modal_text = $(".detail-cap");
  var $modal_image = $(".detail-img img");
  var $modal_favorite_btn = $(".btn-favo a");
  var $favorite_btn_addclass = 'add';
  var $favorite_btn_delclass = 'del';
  var $cookie_path = "../index.html";
  //20200522_Cookieの有効期限を3年に変更
  var $cookie_maxage = 94608000; //Cookieの有効期限の秒数。Ex.1ヶ月なら2592000(60*60*24*30)。
  var $bookmark_base_url = "../bookmark5445.html?id=";
  var $bookmark_length = 50; //お気に入り個数制限
  var $bookmark_alert_message = 'お気に入りの数は' + $bookmark_length + '個までです';

  //お気に入り件数_初期値
  var start_cookieArray = new Array();
  $.each(favorite_json, function(index, val) {
    start_cookieArray.push(index);
  });
  //お気に入り件数を動的表示
  $("#bookmark > h3 > span.num").html(start_cookieArray.length);
  //お気に入りサムネイルを動的表示
  $.each(start_cookieArray, function(i, val) {
    $(".gallery.bookmark-gallery.fade-over").append('<div class="item" data-id="' + val + '" data-favorite="' + val + '"><a href="#" class="btn-detail" ><img src="' + favorite_json[val]["image"] + '" alt=""></a></div><!-- .item -->');
  });

  //ブックマークURLの生成
  var $bookmark_url = domain + $bookmark_base_url + start_cookieArray.join(',');
  $('.bookmark-url').html($bookmark_url);
  $('.bookmark-url').data('clipboard-text', $bookmark_url);

  //ブックマークURLのコピーボタン処理
  var clipboard = new ClipboardJS('.bookmark-btn > button');
  clipboard.on('success', function(e) {
    e.clearSelection();
    //コピー完了のメッセージ
    var toast = new Toast();
    toast.show('コピー完了');
  });
  clipboard.on('error', function(e) {
    //console.error('Action:', e.action);
    //console.error('Trigger:', e.trigger);
  });

  // モーダルを閉じる処理
  var closeModal = function() {
    $(".modal").removeClass("open fist last");
  };
  var winFix = function() {
    $("html, body").addClass("open");
  };
  var winCrear = function() {
    $("html, body").removeClass("open");
  };

  //お気に入り
  $(".bookmark-ttl , .bookmark-btn-sp").on("click", function() {
    $("#bookmark").toggleClass("open");
    $(".bookmark-overlay").toggleClass("open");
    $("html, body").toggleClass("open");
  });
  $(".bookmark-overlay").on("click", function() {
    $("#bookmark").removeClass("open");
    $(".bookmark-overlay").removeClass("open");
    winCrear();
  });

  //場所で絞り込むモーダル
  $(".btn-refine a").on("click", function() {
    $("#refine").addClass("open");
    winFix();
    return false;
  });
  $(".refine-overlay").on("click", function() {
    closeModal();
    winCrear();
  });
  $("#refine .modal-close").on("click", function() {
    closeModal();
    winCrear();
  });


  //////////////////////////////////
  //詳細モーダル
  //////////////////////////////////

  var elm;
  var id;
  var id_prev;
  var id_next;
  var favorite_flg;
  var pickup_flg;
  var data;
  var data_json = Object.assign(img_json, pickup_json, favorite_json);

  var showModal = function() {

    data = data_json[id];

    $(".modal").removeClass("first last modal-pickup");
    if (favorite_flg > 0) {
      elm = $(".gallery .item[data-favorite='" + id + "']");
    } else if (pickup_flg > 0) {
      elm = $("#index-main .pickup[data-pickup='" + id + "']");
      $(".modal").addClass("modal-pickup");
    } else {
      elm = $(".gallery .item[data-id='" + id + "']");
    }

    // テキスト表示
    $modal_text.html(data["caption"]);
    // 画像を表示
    $modal_image.prop("src", data["image"]);
    // お気に入りボタン
    $modal_favorite_btn.attr("href", "#?=" + id);
    if (elm.prev().attr('data-id') === undefined && elm.next().attr('data-id') === undefined) {
      $(".modal").addClass("first last");
    } else if (elm.prev().attr('data-id') === undefined) {
      $(".modal").addClass("first");
    } else if (elm.next().attr('data-id') === undefined) {
      $(".modal").addClass("last");
    } else {
      $(".modal").removeClass("first last");
    }

    //お気に入りボタン_ステータス
    //cookie取得&カンマ区切りを配列に
    var cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)works_list\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (cookieValue == "") {
      var cookieArray = new Array();
    } else {
      var cookieArray = cookieValue.split(",");
    }
    $("#detail > div > div > p > a").removeClass();
    if (cookieArray.indexOf(id) >= 0) {
      //いてる
      $("#detail > div > div > p > a").addClass($favorite_btn_delclass);
    } else {
      //いてない
      $("#detail > div > div > p > a").addClass($favorite_btn_addclass);
    }
  };

  $(document).on("click", ".btn-detail", function() {
    $("#detail").addClass("open");

    elm = $(this).parent();
    favorite_flg = $(this).closest('.item').data('favorite');
    pickup_flg = $(this).parent().data('pickup');

    if (favorite_flg > 0) {
      id = elm.attr("data-favorite");
    } else if (pickup_flg > 0) {
      id = elm.attr("data-pickup");
    } else {
      id = elm.attr("data-id");
    }
    //モーダル表示
    showModal();

    winFix();
    return false;
  });


  //モーダル次へ
  $(document).on("click", ".arrow.next", function() {
    id = elm.next().attr("data-id");


    if (id === undefined) {
      closeModal();
      winCrear();
    } else{
      //モーダル表示
      showModal();
    }

  });

  //モーダル前へ
  $(document).on("click", ".arrow.prev", function() {
    id = elm.prev().attr("data-id");
    if (id === undefined) {
      closeModal();
      winCrear();
    } else{
      //モーダル表示
      showModal();
    }
  });


  //モーダルキーボード操作
  $('html').keyup(function(e) {
    switch (e.which) {
      case 39: // Key[→]
        if (elm.next().attr('data-id') !== undefined) {
          id = elm.next().attr("data-id");
          showModal();
        }
        break;
      case 37: // Key[←]
        if (elm.prev().attr('data-id') !== undefined) {
          id = elm.prev().attr("data-id");
          showModal();
        }
        break;
      case 32: // Key[space]
        if (elm.attr('data-id') !== undefined) {
          closeModal();
          winCrear();
        }
        break;
    }
  });



  //モーダルフリック操作
  $('.detail-img').on('touchstart', onTouchStart); //指が触れたか検知
  $('.detail-img').on('touchmove', onTouchMove); //指が動いたか検知
  $('.detail-img').on('touchend', onTouchEnd); //指が離れたか検知

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
      if (elm.next().attr('data-id') !== undefined) {
        id = elm.next().attr("data-id");
        showModal();
      }
    } else if (direction == 'right') {
      if (elm.prev().attr('data-id') !== undefined) {
        id = elm.prev().attr("data-id");
        showModal();
      }
    }
  }

  //横方向の座標を取得
  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }

  //モーダル外クリック
  $(".detail-overlay").on("click", function() {
    closeModal();
    winCrear();
  });

  //closeボタンクリック
  $("#detail .modal-close").on("click", function() {
    closeModal();
    winCrear();
  });


  //////////////////////////////////
  //お気に入りボタン
  //////////////////////////////////

  //お気に入りボタン cookie名：works_list
  $modal_favorite_btn.on("click", function() {
    //リンクのクエリストリング取得
    var link = $(this).attr("href");
    var favorite_id = link.match(/(?!#|\?|=).+$/)[0]; //id
    var favorite_data = img_json[favorite_id];
    //cookie取得&カンマ区切りを配列に
    var cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)works_list\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (cookieValue == "") {
      var cookieArray = new Array();
    } else {
      var cookieArray = cookieValue.split(",");
    }

    //値を比較し、cookieにいない場合は追加 or cookieにいる場合はcookieから削除
    if (cookieArray.indexOf(favorite_id) >= 0) {
      //cookieにいてる、要素削除
      cookieArray.some(function(v, i) {
        if (v == favorite_id) cookieArray.splice(i, 1);
      });
      $("#detail > div > div > p > a").addClass($favorite_btn_addclass).removeClass($favorite_btn_delclass);

      // remove clicked element
      var $bookmark = $(".bookmark-gallery").isotope({
        // options
        itemSelector: ".bookmark-gallery .item",
        // layoutMode: 'fitRows'
        masonry: {
          columnWidth: ".bookmark-gallery .grid-item"
        }
      });
      var $grid = $('[data-favorite="' + favorite_id + '"]');
      $bookmark.isotope("remove", $grid).isotope("layout");

      //ブックマークURLの生成
      var $bookmark_url = domain + $bookmark_base_url + cookieArray.join(',');
      $('.bookmark-url').html($bookmark_url);

      closeModal();
      winCrear();

    } else {

      // お気に入り上限の場合はアラート表示
      if (cookieArray.length >= $bookmark_length) {
        alert($bookmark_alert_message);
        return false;
      }

      //cookieにいてない、要素追加
      cookieArray.push(favorite_id);
      $content = $('<div class="item" data-id="' + favorite_id + '" data-favorite="' + favorite_id + '"><a href="#" class="btn-detail" ><img src="' + favorite_data["image"] + '" alt=""></a></div><!-- .item -->');
      $(".gallery.bookmark-gallery").append($content)
        .isotope("appended", $content);
      $("#detail > div > div > p > a").addClass($favorite_btn_delclass).removeClass($favorite_btn_addclass);

      //ブックマークURLの生成
      var $bookmark_url = domain + $bookmark_base_url + cookieArray.join(',');
      $('.bookmark-url').html($bookmark_url);
    }

    //フォント再読み込み
    //FONTPLUS.reload();

    //配列をカンマ区切りに&cookieセット
    var resultArray = cookieArray.join(",");
    document.cookie = "works_list=" + resultArray + ";max-age=" + $cookie_maxage + ";path=" + $cookie_path;

    //お気に入り件数を変更
    $("#bookmark > h3 > span.num").html(cookieArray.length);

    //お気に入り件数を変更
    $(".bookmark-gallery").isotope({
      // options
      itemSelector: ".bookmark-gallery .item",
      // layoutMode: 'fitRows'
      masonry: {
        columnWidth: ".bookmark-gallery .grid-item"
      }
    });

    return false;
  });
});
