var margin = 100,   //ウインドウ上部からどれぐらいの位置で変化させるか
  sectionTop = new Array, //sectionのTop位置格納用
  current = -1;   //現在のカレント位置

$(window).on('load', function () {
  //(1)各sectionの縦位置を取得
  $('.featureDetail__sct').each(function (i) {
    sectionTop[i] = $(this).offset().top;
  });
});

//init
changeNavCurrent(0);

//スクロールした時の処理
$(window).scroll(function () {
  scrollY = $(window).scrollTop();

  //(2)各セクションの位置とスクロール位置を比較して、条件にあったらchangeNavCurrentを実行
  for (var i = sectionTop.length - 1; i >= 0; i--) {
    if (scrollY > sectionTop[i] - margin) {
      changeNavCurrent(i);
      break;
    }
  };
});
//(3)ナビの処理
function changeNavCurrent(curNum) {
  if (curNum != current) {
    current = curNum;
    curNum2 = curNum + 1;//HTML順序用
    $('.featureDetail__containerNaviListItem').removeClass('active');
    $('.featureDetail__containerNaviListItem:nth-child(' + curNum2 + ')').addClass('active');
  }
};


$(document).ready(function () {
  if ($('.gallery').length > 0) {
    $('.gallery').featherlightGallery();
  }
});



var $btn = $(".btn-accordion");
var $target = $(".accordion-target");
$target.hide();
$btn.click(function () {
  $(this).toggleClass("active").next('.accordion-target').slideToggle(300);

  setTimeout(function () {
    $('.featureDetail__sct').each(function (i) {
      sectionTop[i] = $(this).offset().top;
    });
  }, 300);

});



$(function () {
  $('.inview').on('inview', function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass('is-inview');
    }
  });
});





$('.slide-top').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 18000,
  arrows: false,
  cssEase: 'linear'
})



$('.slide-bottom').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 18000,
  arrows: false,
  cssEase: 'linear',
  rtl: true
})




// Variables

const $Target = $('.slider-inview')

const $Target_array = Array.prototype.slice.call($Target, 0);
const Option = {
  root: null,
  rootMargin: "0px -50%",
  threshold: 0
};

// Functions
const doWhenIntersect = function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("-inviewActive");
      Observer.unobserve(entry.target);
    }
  });
};

// Triggers
const Observer = new IntersectionObserver(doWhenIntersect, Option);
$Target_array.forEach(function (item) {
  Observer.observe(item);
});







$(document).on("click", ".featureDetail__containerNaviMenuBtn", function () {
  $(this).toggleClass("close").next('.featureDetail__containerNavi').slideToggle(300);

  setTimeout(function () {
    $('.featureDetail__sct').each(function (i) {
      sectionTop[i] = $(this).offset().top;
    });
  }, 300);

});



$('.featureDetail__containerNaviWrap').clone().insertAfter('.featureDetail__containerNaviWrap').addClass('fixed');

var sctOffset = $('#link01').offset().top;


$(window).scroll(function () {

  if ($(window).scrollTop() > sctOffset) {
    $('body').addClass('menu-show');
  } else {
    $('body').removeClass('menu-show');
  }

});


$(document).on("click", ".featureDetail__containerNaviListItemLink", function () {
  var speed = 500;
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);

  if (spFlag) {
    var position = target.offset().top - $('.head-menu').innerHeight();
  } else {
    var position = target.offset().top;
  }

  $(this).parents('.fixed').find('.featureDetail__containerNavi').slideUp(300);

  $("html, body").animate({ scrollTop: position }, speed, "swing");
  return false;
});
