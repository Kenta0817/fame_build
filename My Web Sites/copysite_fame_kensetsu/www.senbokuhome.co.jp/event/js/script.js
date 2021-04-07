$(function() {


  $(window).load(function() {
    $('body').addClass('load');
  });


  //matchHeight
  $('.event-list-event a').matchHeight();


  //tabpager
  $('#event-tab').tabpager({
    items: 6,
    contents: 'event-contents',
    //time: 300,
    previous: '',
    next: '',
    //start: 1,
    position: 'bottom',
    scroll: true
  });


  //jquery-tab-pager-navi

  if($('.current .no-event').length){
    $('#contents').addClass('no-pager');
  }
  $(document).on('click', '#jquery-tab-pager-navi a', function(){
    $('.event-list-event a').matchHeight();
    $('body,html').animate({
			scrollTop: 0
		}, 300);
		return false;
  });

  //tab
  $(document).on('click', '#tab li', function(){
    var targetId = $(this).attr("id");
    location.hash = targetId;
    // console.log(target);
    $('.event-list-event a').matchHeight();
    $('#contents').removeClass('no-pager');
    if($('.current .no-event').length){
      $('#contents').addClass('no-pager');
    }
  });


  //アクセス時のurlでタブ切り替え
  var urlHash = location.hash;
  if (urlHash) {
    var targetTabHash = $('#event-tab li[id$="' + urlHash + '"]');
    if (targetTabHash.parent().length > 0) {
      targetTabHash.click();
    }
  }
  
});
