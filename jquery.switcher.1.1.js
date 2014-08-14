// JavaScript Document
( function($){

	$.fn.switcher = function(options) {
		
		var settings = $.extend({
				switcher_on_Off : true,
				on_label        : "ON",
				off_label    	: "OFF"
		}, options);

		var input_name = $(this).attr("name");

		var template = "<div class='checkbox_switcher' id="+$(this).attr("id")+">\
			<div class='inline_container";
			if (settings.switcher_on_Off)
				template += " on";
			template += "'>\
				<div class='label on_option'>"+settings.on_label+"</div>\
				<div class='middle_space'></div>\
				<div class='label off_option'>"+settings.off_label+"</div>\
			</div>\
			<input type='hidden' value='";
			if (settings.switcher_on_Off) {
				template += "0";
			} else {
				template += "1";
			}
			template += "' name='"+input_name+"'>\
		</div>";
		$(template).replaceAll(this);
		var labels_cont = $(".checkbox_switcher");
		var maxwidth = getMaxChildWidth(labels_cont);
		labels_cont.innerWidth(maxwidth+28)
			.find(".inline_container").innerWidth(maxwidth*2+30)
			.find(".label").innerWidth(maxwidth);
		
		var animateWidth = labels_cont.find(".label").innerWidth()+2;
		
		if (!settings.switcher_on_Off)
			labels_cont.find(".inline_container").css({ 'margin-left' : -animateWidth });
		
		labels_cont.find(".inline_container").bind("click", function(){
			if ($(this).hasClass("on")) {
				$(this).animate({ 
					'margin-left' : -animateWidth
				}, 500, function(){
					$(this).removeClass("on");
					$("input[name="+input_name+"]").val(1);
				});
			} else {
				$(this).animate({ 
					'margin-left' : 0
				}, 500, function(){
					$(this).addClass("on");
					$("input[name="+input_name+"]").val(0);
				});
			}
		});
	};

})(jQuery);

function getMaxChildWidth(sel) {
	max = 0;
	$(sel).find(".label").each(function(){
			c_width = parseInt($(this).innerWidth());
			if (c_width > max) {
					max = c_width;
			}
	});
	return max;
}