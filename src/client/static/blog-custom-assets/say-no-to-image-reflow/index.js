/**
 * Animate images and spacers inside demo figures by toggling their properties every 2 seconds:
 * * toggle images [src]'s between blank pixel and source provided as [data-demo-image].
 * * toggle spacers [hidden]'s to keep demo figure sizes consistent.
 */
(function(){
	'use strict';

	var ALT_SRC_ATTR = 'data-demo-image';
	var IMAGE_SELECTOR = '[data-demo-image]';
	var SPACER_ATTR = 'data-demo-spacer';
	var SPACER_SELECTOR = '[data-demo-spacer]';
	var TOGGLE_INTERVAL = 2000;
	var BLANK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

	var images = listElements(IMAGE_SELECTOR);
	var spacers = listElements(SPACER_SELECTOR);

	animateImages();

	function listElements(selector) {
		return [].slice.call(document.querySelectorAll(selector));
	}

	function animateImages() {
		var isLoaded = false;
		setInterval(function(){
			images.forEach(function(image){ toggleImageSrc(image, isLoaded); });
			spacers.forEach(function(elem){ toggleSpacer(elem, isLoaded); });
			isLoaded = !isLoaded;
		}, TOGGLE_INTERVAL);
	}

	function toggleImageSrc(image, isLoaded) {
		image.src = (isLoaded) ? BLANK_PIXEL : image.getAttribute(ALT_SRC_ATTR);
	}

	function toggleSpacer(element, show) {
		element.setAttribute(SPACER_ATTR, show ? 'on' : 'off');
	}

}());
