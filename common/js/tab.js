$(function() {
  $('.tab-box:first').show();
  $('#tab li:first').addClass('active');
  $('#tab li').click(function() {
    $('#tab li').removeClass('active');
    $(this).addClass('active');
    $('.tab-box').hide();
    $($(this).find('a').attr('href')).fadeIn();
    return false;
  });

  var urlHash = location.hash;
  if (urlHash) {
    // タブの<a>タグのhref属性の値にアンカーの値と同じ値が含まれている要素を選択
    var targetTabHash = $('#tab li a[href$="' + urlHash + '"]');

    // var idx = targetTabHash.index(this);
    // $('.tab-box').eq(idx).fadeIn();

    if (targetTabHash.parent().length > 0) {
      // HTML側でデフォルトで設定している'active'というクラスを削除する
      $('#tab li').removeClass('active');
      // <a>タグのhref属性の値とアンカーが同じだった場合、そのタブの<a>タグに'active'というクラスを付与する
      targetTabHash.parent().addClass('active');
      $('.tab-box').hide();
      $(targetTabHash.attr('href')).fadeIn();
      // targetTabHash.parent().addClass('active').click();
    }
  }



  // swipe検知
  var direction, position;
  var $swipeBox = $('.swipe-box');
    if ($swipeBox.length > 0) {

  $swipeBox.on('touchstart', onTouchStart); //指が触れたか検知
  $swipeBox.on('touchmove', onTouchMove); //指が動いたか検知
  $swipeBox.on('touchend', onTouchEnd); //指が離れたか検知



    //スワイプ開始時の横方向の座標を格納
    function onTouchStart(event) {
      position = getPosition(event);
      direction = ''; //一度リセットする
    }

    //スワイプの方向（left／right）を取得
    function onTouchMove(event) {
      if (position - getPosition(event) > 200) {
        direction = 'left'; //左と検知
      } else if (position - getPosition(event) < -200) {
        direction = 'right'; //右と検知
      }
    }

    function onTouchEnd(event) {
      // 前のタブへ
      if (direction == 'right') {
        $('#tab > .active').prev().click();
      }
      // 次のタブへ
      else if (direction == 'left') {
        $('#tab > .active').next().click();
      }
    }

    //横方向の座標を取得
    function getPosition(event) {
      return event.originalEvent.touches[0].pageX;
    }

  }



});



// $('.news-tab li').on('click', function() {
// 	 $('.news-tab li').removeClass('active');
// 	 $(this).addClass('active');
// 	 var idx = $('.news-tab li').index(this);
// 	 $('.news-list').removeClass('active');
// 	 $('.news-list').eq(idx).addClass('active');
//  });
//  return false;
