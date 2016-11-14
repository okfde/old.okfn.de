(function () {
	'use strict';

	var animate = function (logo) {
		var width = logo.width;
		var height = logo.height;
		var offset = [40 / 75 * width, 38 / 75 * height];
		var radius = 25 / 75 * height;
		var angleOffset = -Math.PI / 180 * 3.6;
		var animAngle = 0;
		var animAngleSpeed = 0.01;
		var lineWidth = 2;
		var lineCount = 35;
		var minLineHeight = 1;
		var maxLineHeight = height / 6;
		var minLineSpeed = 1;
		var maxLineSpeed = 10;
		var lineSpeedDiv = 250;
		var lineColor = '#fff';
		if (logo.className.indexOf('black-logo') !== -1) {
			lineColor = '#000';
		}

		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.className = 'logo-canvas';

		var ctx = canvas.getContext('2d');
		ctx.drawImage(logo, 0, 0, width, height);
		ctx.fillStyle = lineColor;

		var parent = logo.parentNode;

		parent.insertBefore(canvas, logo);
		logo.style.visibility = "hidden";
		//parent.replaceChild(canvas, logo);

		var getRandomMinMax = function (min, max, div) {
			div = div || 1;
			return (min + Math.ceil(Math.random() * (max - min))) / div;
		};

		var setRandom = function (min, max, div) {
			var data = [];
			for (var i = 0; i < lineCount; i += 1) {
				data.push(getRandomMinMax(min, max, div));
			}
			return data;
		};
		var lineHeights = setRandom(minLineHeight, maxLineHeight);
		var targetLineHeights = setRandom(minLineHeight, maxLineHeight);
		var lineSpeeds = setRandom(minLineSpeed, maxLineSpeed, lineSpeedDiv);

		var drawAura = function () {
			ctx.clearRect(0, 0, radius * 3, offset[1] - radius * 4 / 5 + 1);
			ctx.clearRect(0, 0, offset[0] - radius * 4 / 5 + 3, radius * 3);
			ctx.clearRect(0, height - radius * 4 / 5, radius * 3, radius * 4 / 5);
			ctx.clearRect(offset[0] + radius * 2 / 3, 0, radius, radius * 3);
			for (var i = 0; i < lineCount; i += 1) {
				var angle = Math.PI * 2 * i / lineCount;
				angle = angle + angleOffset + (Math.PI / 180 * animAngle);
				var x = radius * Math.cos(angle);
				var y = radius * Math.sin(angle);
				var lineHeight = lineHeights[i];
				ctx.save();

				ctx.translate(offset[0] + x, offset[1] + y);
				ctx.rotate(angle);

				ctx.beginPath();
				ctx.rect(0, 0, lineHeight, lineWidth);
				ctx.fill();

				ctx.restore();
			}
		};

		var adjust = function (lineHeights, targetLineHeights) {
			for (var i = 0; i < lineCount; i += 1) {
				if ((lineHeights[i] < targetLineHeights[i] && lineHeights[i] + lineSpeeds[i] > targetLineHeights[i]) ||
					(lineHeights[i] > targetLineHeights[i] && lineHeights[i] - lineSpeeds[i] < targetLineHeights[i])) {
					targetLineHeights[i] = getRandomMinMax(minLineHeight, maxLineHeight);
					lineSpeeds[i] = getRandomMinMax(minLineSpeed, maxLineSpeed, lineSpeedDiv);
				} else if (lineHeights[i] < targetLineHeights[i]) {
					lineHeights[i] += lineSpeeds[i];
				} else if (lineHeights[i] > targetLineHeights[i]) {
					lineHeights[i] -= lineSpeeds[i];
				}
			}
		};

		var animate = function () {
			animAngle = (animAngle + animAngleSpeed) % 360;
			adjust(lineHeights, targetLineHeights);
			drawAura();
			window.requestAnimationFrame(animate);
		};

		window.requestAnimationFrame(animate);
		return canvas;
	};

	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout(timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	var animateLogo = function (logo) {
		var canvas = animate(logo);
		$(window).on("resize", function () {
			waitForFinalEvent(function () {
				logo.parentNode.removeChild(canvas);
				canvas = animate(logo);
			}, 400, "resize-event-id");
		});
	};

	var animateThis = function (logo) {
		return function () {
			logo.onload = null;
			animateLogo(logo);
		};
	};

	var animateLogos = function () {
		var logos = document.getElementsByClassName('logo');
		for (var i = 0; i < logos.length; i += 1) {
			if (logos[i].naturalWidth !== 0) {
				animateLogo(logos[i]);
			} else {
				logos[i].onload = animateThis(logos[i]);
			}
		}
	};

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
	animateLogos();

	$(window).on("resize", function () {
		fix_window();
	});

}());
