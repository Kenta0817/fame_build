$(function(){
    $("#WestArea").on("click", function() {
				$("#tab_menu").addClass("westAreaBG");
				$("#tab_menu").removeClass("eastAreaBG");
				$("#tab_menu").removeClass("centralAreaBG");
				$("#tab_menu").removeClass("kyusyuAreaBG");

        $("#tab_eastArea").hide();
				$("#tab_centralArea").hide();
				$("#tab_kyusyuArea").hide();
        $("#tab_westArea").fadeIn();
    });

    $("#EastArea").on("click", function() {
				$("#tab_menu").addClass("eastAreaBG");
				$("#tab_menu").removeClass("westAreaBG");
				$("#tab_menu").removeClass("centralAreaBG");
				$("#tab_menu").removeClass("kyusyuAreaBG");

        $("#tab_westArea").hide();
				$("#tab_centralArea").hide();
				$("#tab_kyusyuArea").hide();
        $("#tab_eastArea").fadeIn();
    });
	
		$("#CentralArea").on("click", function() {
				$("#tab_menu").addClass("centralAreaBG");
				$("#tab_menu").removeClass("westAreaBG");
				$("#tab_menu").removeClass("eastAreaBG");
				$("#tab_menu").removeClass("kyusyuAreaBG");

        $("#tab_westArea").hide();
				$("#tab_eastArea").hide();
				$("#tab_kyusyuArea").hide();
        $("#tab_centralArea").fadeIn();
    });
	
		$("#KyusyuArea").on("click", function() {
				$("#tab_menu").addClass("kyusyuAreaBG");
				$("#tab_menu").removeClass("westAreaBG");
				$("#tab_menu").removeClass("eastAreaBG");
				$("#tab_menu").removeClass("centralAreaBG");

        $("#tab_westArea").hide();
				$("#tab_eastArea").hide();
				$("#tab_centralArea").hide();
				$("#tab_kyusyuArea").fadeIn();
    });
});