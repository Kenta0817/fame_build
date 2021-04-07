$(window).load(function() {

  var $googlrmapWrap = $(".googlemap-wrap");
  var disableUi;

  $(window).breakPoint({
    smartPhoneWidth: 768,
    tabletWidth: 0,
    pcMediumWidth: 0,
    onSmartPhoneEnter: function() {
      googlemapScaleAry = [9, 9];
      pinSize = new google.maps.Size(21, 27);
      disableUi = true;
    },
    onPcEnter: function() {
      googlemapScaleAry = [10, 10];
      pinSize = new google.maps.Size(42, 53);
      disableUi = false;
    }
  });

  function initMap() {

    // 座標を指定
    var latLng = new google.maps.LatLng(34.5801646, 135.2600000);

    var map = new google.maps.Map(
      document.getElementById("map"), {
        zoom: googlemapScaleAry[0], // 拡大率
        center: latLng, // 座標を設定
        scrollwheel: false, // マウスホイール
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: disableUi, //trueにするとコントローラーが全部消える
      }
    );


    var makerArry = [];
    var windowArry = [];

    var Pin_a = {
      url: '/showroom/css/img/icon_pin_showroom.png',
      scaledSize: pinSize, //サイズ指定
      class: 'map-showroom'
    }

    var Pin_b = {
      url: '/showroom/css/img/icon_pin_modelhouse.png',
      scaledSize: pinSize, //サイズ指定
      class: 'map-modelhouse'
    }


    /** ふかい本社**/

    makerArry[0] = new google.maps.Marker({
      position: new google.maps.LatLng(34.5367899, 135.4928306),
      map: map,
      icon: Pin_a,


    });
    windowArry[0] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">本社メインショールーム</p><p class="btn-cmn btn-more"><a href="fukai"><span>詳細を見る</span></a></p></div>'
    });


    /** 高槻**/

    makerArry[1] = new google.maps.Marker({
      position: new google.maps.LatLng(34.833741, 135.629829),
      map: map,
      icon: Pin_a
    });
    windowArry[1] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">高槻ショールーム</p><p class="btn-cmn btn-more"><a href="takatsuki"><span>詳細を見る</span></a></p></div>'
    });


    /** 瓢箪山**/

    makerArry[2] = new google.maps.Marker({
      position: new google.maps.LatLng(34.670451, 135.634915),
      map: map,
      icon: Pin_a
    });
    windowArry[2] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">外環東大阪ショールーム</p><p class="btn-cmn btn-more"><a href="hyotanyama"><span>詳細を見る</span></a></p></div>'
    });


    /** たかいし**/

    makerArry[3] = new google.maps.Marker({
      position: new google.maps.LatLng(34.519898, 135.446472),
      map: map,
      icon: Pin_a
    });
    windowArry[3] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">高石ショールーム</p><p class="btn-cmn btn-more"><a href="takaishi"><span>詳細を見る</span></a></p></div>'
    });
	  
	  



    /** 近鉄八尾**/

    // makerArry[4] = new google.maps.Marker({
    //   position: new google.maps.LatLng(34.6329, 135.606),
    //   map: map,
    //   icon: Pin_a
    // });
    // windowArry[4] = new google.maps.InfoWindow({
    //   content: ' <div class="gm-style-iw-inner"><p class="name">近鉄八尾店</p><p class="btn-cmn btn-more"><a href="yao"><span>詳細を見る</span></a></p></div>'
    // });



    /** 花博モデルハウス**/


    makerArry[4] = new google.maps.Marker({
      position: new google.maps.LatLng(34.713165, 135.584008),
      map: map,
      icon: Pin_b
    });
    windowArry[4] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">花博モデルハウス</p><div class="wrap-btn-more"><p class="btn-cmn btn-more"><a href="hanahaku1"><span>壱号館</span></a></p><p class="btn-cmn btn-more"><a href="hanahaku2"><span>弐号館</span></a></p><p class="btn-cmn btn-more"><a href="hanahaku3"><span>参号館</span></a></p></div></div>'
    });


    /** なんばモデルハウス**/

    makerArry[5] = new google.maps.Marker({
      position: new google.maps.LatLng(34.658106, 135.501902),
      map: map,
      icon: Pin_b
    });
    windowArry[5] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">なんばモデルハウス</p><p class="btn-cmn btn-more"><a href="namba"><span>詳細を見る</span></a></p></div>'
    });


    /** なかもずモデルハウス**/

    makerArry[6] = new google.maps.Marker({
      position: new google.maps.LatLng(34.554635, 135.5072491),
      map: map,
      icon: Pin_b
    });
    windowArry[6] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">なかもずモデルハウス</p><p class="btn-cmn btn-more"><a href="nakamozu"><span>詳細を見る</span></a></p></div>'
    });






    /** 美原モデルハウス**/

    makerArry[8] = new google.maps.Marker({
      position: new google.maps.LatLng(34.515186, 135.570987),
      map: map,
      icon: Pin_b
    });
    windowArry[8] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">美原モデルハウス</p><p class="btn-cmn btn-more"><a href="mihara"><span>詳細を見る</span></a></p></div>'
    });


    /** 和泉モデルハウス**/

    makerArry[9] = new google.maps.Marker({
      position: new google.maps.LatLng(34.508399, 135.4351),
      map: map,
      icon: Pin_b
    });
    windowArry[9] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">和泉モデルハウス</p><p class="btn-cmn btn-more"><a href="izumi"><span>詳細を見る</span></a></p></div>'
    });



    /** 泉佐野モデルハウス**/

    makerArry[10] = new google.maps.Marker({
      position: new google.maps.LatLng(34.394413, 135.335554),
      map: map,
      icon: Pin_b
    });
    windowArry[10] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">泉佐野モデルハウス</p><p class="btn-cmn btn-more"><a href="izumisano"><span>詳細を見る</span></a></p></div>'
    });
	  
	  
	  
	     /** 伊丹市役所前**/

    makerArry[11] = new google.maps.Marker({
      position: new google.maps.LatLng(34.7854271, 135.3984046),
      map: map,
      icon: Pin_a
    });
    windowArry[11] = new google.maps.InfoWindow({
      content: ' <div class="gm-style-iw-inner"><p class="name">伊丹市役所前ショールーム</p><p class="btn-cmn btn-more"><a href="itami"><span>詳細を見る</span></a></p></div>'
    }); 
	  
	  
	  


    function gCloseWindow() {
      for (var i = 0; i < makerArry.length; i++) {
        windowArry[i].close();
        makerArry[i].setVisible(true);
      }
    }

    // infowindowにクラス追加
    // function gmAddClass(target) {
    //   $(".gm-style-iw").addClass("open");
    //   $(".gm-style-iw").addClass(cl);
    //   $(".gm-style-iw").prev().addClass("gm-style-iw-dummy");
    //   $(".gm-style-iw").next().addClass("gm-close");
    //   $(".gm-style-iw").parent().addClass("gm-style-iw-wrap");
    //   $(".gm-close").click(function() {
    //     target.setVisible(true);
    //   });
    // }
    //
    // var flug = 0;
    // var cl ;
    // for (var i = 0; i < makerArry.length; i++) {
    //   (function(n) {
    //     google.maps.event.addListener(makerArry[n], 'click', function() {
    //       gCloseWindow();
    //       makerArry[n].setVisible(false);
    //       windowArry[n].open(map, makerArry[n]);
    //
    //       $("#map").removeClass(cl);
    //       cl = makerArry[n].icon.class;
    //       $("#map").addClass(cl);
    //
    //
    //       if (flug == 0) {
    //         setTimeout(function() {
    //           gmAddClass(makerArry[n]);
    //           FONTPLUS.reload(false);
    //         }, 0);
    //         flug = 1;
    //       } else {
    //         gmAddClass(makerArry[n]);
    //         FONTPLUS.reload(false);
    //       }
    //
    //     });
    //   })(i);
    // }



    var mapStyle = [{
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "stylers": [{
            "hue": "#00aaff"
          },
          {
            "saturation": -100
          },
          {
            "gamma": 2.15
          },
          {
            "lightness": 12
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
            "visibility": "on"
          },
          {
            "lightness": 24
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "lightness": 57
        }]
      }
    ]

    var mapType = new google.maps.StyledMapType(mapStyle);
    map.mapTypes.set('GrayScaleMap', mapType);
    map.setMapTypeId('GrayScaleMap');

    var wW = $(window).width();
    var resizeTimer = false;

    $(window).resize(function() {
      if (resizeTimer !== false) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function() {
        if (wW == window.innerWidth) {
          return;
        } //スマホ用
        map.panTo(latLng);
      }, 200);
    });

  }

  initMap();

});
