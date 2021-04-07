$(function() {

  $('.information-area-num strong').children().andSelf().contents().each(function() {
      if (this.nodeType == 3) {
          $(this).replaceWith($(this).text().replace(/(.)/g, '<span>$&</span>'));
      }
  });

});
