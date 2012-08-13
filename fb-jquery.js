/*!
 * jQuery plugin for the Facebook Javascript SDK
 * http://github.com/rudimk/fb-jquery
 *
 * Copyright 2012, Rudi MK
 */

(function( $ ) {
	$.fn.fb = function(appId, options) {

		var settings = $.extend({
				appId      : appId,
				status     : true, 
				cookie     : true,
				xfbml      : true,
				oauth      : true
		}, options);

		window.fbInit = window.fbInit || false;
		if (window.fbInit) {
			$(document).trigger('fb:initialized');
			if (settings.xfbml) {
				FB.XFBML.parse();
			}
			return;
		}

		// Async Init
		window.fbAsyncInit = function() {
			window.fbInit = true;
			$(document).trigger('fb:initializing');
			FB.init(settings);
			$(document).trigger('fb:initialized');
		};

		// Append fb-root
		var fbRoot = 'fb-root';
		if (!document.getElementById(fbRoot)) {
			var element = document.createElement('div');
			element.id = fbRoot;
			document.body.appendChild(element);
		}

		// Add Facebook Javascript SDK
		var js, id = 'facebook-jssdk'; 
		if (!document.getElementById(id)) {
			js = document.createElement('script'); 
			js.id = id; 
			js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			document.getElementsByTagName('head')[0].appendChild(js);
		}
	};
})( jQuery );
