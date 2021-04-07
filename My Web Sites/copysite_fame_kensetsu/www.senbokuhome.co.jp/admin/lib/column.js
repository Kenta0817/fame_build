$(document).ready(function(){

//各コラム
var data = 'div.col3.rsp-col.mado-wrap a';

//総数取得
var mass = $('div.col3.rsp-col.mado-wrap a').length;

//n個ずつの変数指定
var Num = 9;

//一旦全部hide
$(data+":gt(8)").hide();


//もしhiddenがいなくなったら、MOREボタンを消す
hide_total = $(data).filter(':hidden').length;
if(hide_total == 0){
    $("div.more-wrap").hide();
}
if(mass < 10){
    $("div.more-wrap").hide();
}


//MOREボタンを押したら、n個ずつ、ゆっくりshowする
$("div.more-wrap a.more.box-btn").click(function(){
        // クリックするごとにn個表示
        //console.log(Num);
        Num +=9;
        // list+n個以前を表示
	$(data+":lt("+Num+")").show();

        // MOREボタン非表示
        if(mass <= Num){
            //$("p.message").text("おしまい");
            $("div.more-wrap").hide();
            
        }

})

});

   


    