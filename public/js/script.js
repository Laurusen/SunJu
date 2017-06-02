(function($, undefined){

$(document).ready(function(){

	$.ajax({
		url: '/ajax',
		dataType: 'JSON',
		success: function(data){
			if (data.login) {
				$('header').append('<h2>Hello ' + data.login + '</h2>');
			}
		}
	});
	
});

})(jQuery);