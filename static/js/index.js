(function () {
	'use strict';

	$('#sidebar').toggleClass('active');
	//open-close lateral menu clicking on the menu icon
	$('#sidebar-trigger').on('click', function (event) {
		event.preventDefault();
		$('#sidebar-trigger').toggleClass('is-clicked');
		$('header').toggleClass('lateral-menu-is-open');
		$('#main-content').toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the transition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#sidebar').toggleClass('lateral-menu-is-open');
		//check if transitions are not supported - i.e. in IE9
		if ($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	var fix_window = function () {
		var h = $('.navbar-okfn').height() //if any
			+ $('footer').height()
			+ $('header').height() +
			30; //footer margin-top
		$('#main-container').css('min-height', (window.innerHeight - h) + 'px');
	};

	fix_window();

	$(window).on("resize", function () {
		fix_window();
	});

}());
