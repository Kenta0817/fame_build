$(document).ready(function () {


 var wW=$(window).width();


  /* ==========================================================================
     googlemap
     ========================================================================== */

  var $googlrmapWrap = $(".googlemap-wrap");
  var googlemapScaleAry = [17];
  var googlemapScale = googlemapScaleAry[0];
  var lating=[34.5367899,135.4928306];

  function initMap() {

    // 座標を指定
    var latLng = new google.maps.LatLng(lating[0],lating[1]);


    var map = new google.maps.Map(
      document.getElementById("googlemap"), {
        zoom: googlemapScale, // 拡大率
        center: latLng, // 座標を設定
        scrollwheel: false, // マウスホイール
        mapTypeControl: false,
        //zoomControl:false,
        streetViewControl: false
      }
    );


    var Pin = {
      url : '/common/img/icon_pin.png',
      scaledSize: new google.maps.Size(45, 58) //サイズ指定
    }


    var makerArry=[];
    var windowArry=[];
    makerArry[0] = new google.maps.Marker({
      position: new google.maps.LatLng(lating[0],lating[1]),
      map: map,
      icon: Pin
    });






for (var i = 0; i < makerArry.length; i++) {
 (function(n) {
      google.maps.event.addListener(makerArry[n],'click',function () {
      gCloseWindow();
      makerArry[n].setVisible(false);
      windowArry[n].open(map, makerArry[n]);
      gmAddClass(makerArry[n]);
    });
   })(i);
}


    function gCloseWindow() {
      for (var i = 0; i < makerArry.length; i++) {
      windowArry[i].close();
        makerArry[i].setVisible(true);
      }
    }



  }


initMap();



});
