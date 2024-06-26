if(!createLGWGElement) {
	var createLGWGElement = LeadCore.createLGWGElement;
}

var LGWGPathBaseUrlDot = "dev/";
//var LGWGPathBaseUrlDot = "https://cdn.leadgenic.ru/dev/lg_widgets_l11/";
//var LGWGPathBaseUrlDot = "https://cdn.leadgenic.ru/production/lg_widgets_l11/";

var LGWGPathForDevelopmentDot = LGWGPathBaseUrlDot + "dot/";

var visualObjNewDot = LeadCore.visit.guiprops,
	autoInviteObjNewDot = LeadCore.visit.autoinvite,
	restrDotNewDot = LeadCore.visit.restrictions,
	widgetLGWGDotName = "TEST_DOT",
	widgetLGWGDotId = "0001",
	soundBeepNewDot,
	labelPositionNew,
	cssPath;

// for (var i = 0; i < LeadWidgets.list.length; i++) {
// 	if (LeadWidgets.list[i].type.code == 'optindot') {
// 		visualObjNewDot = LeadWidgets.list[i].guiprops;
// 		autoInviteObjNewDot = LeadWidgets.list[i].autoinvite;
// 		restrDotNewDot = LeadWidgets.list[i].restrictions;
// 		widgetLGWGDotName = LeadWidgets.list[i].name;
// 		widgetLGWGDotId = LeadWidgets.list[i].id;
// 		soundBeepNewDotUrl = LeadWidgets.list[i].template.sound;
// 		cssPath = LeadWidgets.list[i].template.css;
// 	}
// }

var divForFrameDot = document.createElement("div");

/*************************************************************************
 *Create Dom for non mobile
 */
(function () { 

	function setMobileClass() {
		if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
			return "visual-block-widget-lgwg-label-mobile";
		} else {
			return "";
		}
	}

	function getDotIcon() {
		if (visualObjNewDot.dhVisual.selectedIcon) {
			return "f30s-awesome lgwg-none-imp " + visualObjNewDot.dhVisual.selectedIcon;
		} else {
			return "f30s lgwg-none-imp lgiconfont-" + visualObjNewDot.dhVisual.selectIcon;
		}
	}
	
	var dotWidget = 
		createLGWGElement( 'div', { id: 'widgetVisualDotCircle', class: 'widget-visual-block-dot start-position-lgwg-dot animClass05 '+setMobileClass(), style:'opacity:0;bottom:'+ (10+widgetDivPositionDotBottom()) +'px'},
		
			createLGWGElement( 'div', { id: 'widget2MainBlDot'+widgetLGWGDotId, class: 'widget2-main-bl'},
				createLGWGElement('div', {class: 'point__signal first', style: 'color: ' + visualObjNewDot.dhVisual.rgbaShadowForm1}),
				createLGWGElement('div', {class: 'point__signal second', style: 'color: ' + visualObjNewDot.dhVisual.rgbaShadowForm2}),
				createLGWGElement('div', {class: 'point__signal third', style: 'color: ' + visualObjNewDot.dhVisual.rgbaShadowForm2}),
				
				createLGWGElement( 'div', { class: 'widget2-plashka widget2-plash-start animClass02 lgwg-op-hid', style:'width: 230px; word-break: break-all; line-height: 0px;'},
					createLGWGElement( 'span', { class: 'widget2-plashka-text lgwg-op-hid'}, visualObjNewDot.dhVisual.title)
				),
				// createLGWGElement( 'div', { class: 'lg-wg-w2-pulse1 lg-wg-pulse-el lg-wg-pulse-sh', style: 'box-shadow:inset 0px 0px 15px 10px '+visualObjNewDot.dhVisual.rgbaShadowForm1}),
				// createLGWGElement( 'div', { class: 'lg-wg-w2-pulse2 lg-wg-pulse-el lg-wg-pulse-sh', style: 'box-shadow:inset 0px 0px 12px 5px '+visualObjNewDot.dhVisual.rgbaShadowForm2}),
				
				createLGWGElement( 'div', { class: 'widget2', style: 'background:'+visualObjNewDot.dhVisual.colorMain},
				
					// createLGWGElement( 'div', { id: 'lgwgW2DotCircleFill1', class: 'lg-wg-w2-dot-circle-fill1 lg-wg-pulse-el', style: 'background:'+visualObjNewDot.dhVisual.colorBg}),
					// createLGWGElement( 'div', { id: 'lgwgW2DotCircleFill2', class: 'lg-wg-w2-dot-circle-fill2 lg-wg-pulse-el', style: 'background:'+visualObjNewDot.dhVisual.colorMain}),
					createLGWGElement( 'i', { id: 'lgWgIconFont', class: getDotIcon(), style: 'color:'+visualObjNewDot.dhVisual.colorBg}),
					createLGWGElement( 'div', { id:'lgWgDotCircleImg', class: 'lgwg-none-imp lg-wg-dot-circle-img'})
				)
			)
		);

	//Append div to body
	document.getElementsByTagName("body")[0].appendChild(dotWidget);

	var dotCircleCl = document.getElementById('widgetVisualDotCircle');

	dotWidgetStyle();



	function dotWidgetStyle() {


		



		//Placement for widget
		if (visualObjNewDot.dhVisual.place === LeadCore.constants.leftBottomCorner) {
			dotCircleCl.classList.add('wv-bd-left');
		}
		if (visualObjNewDot.dhVisual.place === LeadCore.constants.rightBottomCorner) {
			dotCircleCl.classList.add('wv-bd-right');
		}

		if (visualObjNewDot.dhVisual.iconOrImage && visualObjNewDot.dhVisual.iconOrImage === 'useImg') {
			var lgWgDotCircleImg = document.getElementById('lgWgDotCircleImg');
			lgWgDotCircleImg.classList.remove('lgwg-none-imp');
			lgWgDotCircleImg.style.backgroundImage = "url("+visualObjNewDot.dhVisual.url+")";

			// var lgwgW2DotCircleFill1 = document.getElementById('lgwgW2DotCircleFill1');
			var lgwgW2DotCircleFill2 = document.getElementById('lgwgW2DotCircleFill2');
			lgwgW2DotCircleFill1.classList.add('lgwg-none-imp');
			lgwgW2DotCircleFill2.classList.add('lgwg-none-imp');
		} else {
			var lgWgIconFont = document.getElementById('lgWgIconFont');
			lgWgIconFont.classList.remove('lgwg-none-imp');
		}
	}

	

})();

(function () {

	function prepareFrame() {
		var bgForMain = visualObjNewDot.bg.colorBg;
		//Use img for widget or set colorBg
		if (visualObjNewDot.bg.fillorImg === 'useImg') {
			bgForMain = "url('" + visualObjNewDot.bg.url + "') center center / cover no-repeat";
		}

		divForFrameDot.setAttribute("id", "lgwgDivIframeDot");
		divForFrameDot.setAttribute("style", "position:fixed!important;bottom:"+ (60+widgetDivPositionDotBottom()) +"px;"+widgetDivPositionDotLR()+";width:0;height:0;z-index:9999998;transition:width 100ms ease-in-out,height 100ms ease-in-out");
		document.getElementsByTagName("body")[0].appendChild(divForFrameDot);

		if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
			var shadowBlock = document.createElement("div");
			shadowBlock.setAttribute("id", "LGWGDotShadow");
			shadowBlock.setAttribute("class", "lgwg-new-dot-shadow");
			shadowBlock.setAttribute("style", "background:rgba(0, 0, 0, 0.4)");
			document.getElementById("lgwgDivIframeDot").appendChild(shadowBlock);
		}

	    var ifrm = document.createElement("iframe");
	 
	    ifrm.setAttribute("src", "about:blank");
	    ifrm.setAttribute("frameBorder", "0");
	    ifrm.setAttribute("id", "lgwgIframeDot");
	    ifrm.setAttribute("name", "lgwgIframeDot");
	    ifrm.setAttribute("style", "display:block!important;position:relative!important;width:100%!important;height:100%!important;border:none!important;background:none!important");
	    ifrm.addEventListener('load', function () {
	    	injectCode();
	    }, false);
	    document.getElementById("lgwgDivIframeDot").appendChild(ifrm);

	    function injectCode() {
	    	var cssLinkGeneric = document.createElement("link");
				cssLinkGeneric.href = LGWGPathBaseUrlDot + "generic_frame.css";
				cssLinkGeneric.rel  = "stylesheet";
				cssLinkGeneric.type = "text/css";

			var cssLink = document.createElement("link");
				cssLink.href = LGWGPathForDevelopmentDot + "dot_hunter_frame.css";
				cssLink.rel  = "stylesheet";
				cssLink.type = "text/css";

			var cssDPLink = document.createElement("link");
				cssDPLink.href = LGWGPathBaseUrlDot + "/datepicker/datepicker.css";
				cssDPLink.rel  = "stylesheet";
				cssDPLink.type = "text/css";

			ifrm.contentWindow.document.getElementsByTagName("head")[0].appendChild(cssLinkGeneric);
			ifrm.contentWindow.document.getElementsByTagName("head")[0].appendChild(cssLink);
			//ifrm.contentWindow.document.getElementsByTagName("head")[0].appendChild(cssDPLink);
			loadSecondaryFuncLGWGDot();
			//Appear widget
			
			
		}

	    var doc = ifrm.contentWindow.document;
	    var jsUrl = LGWGPathForDevelopmentDot + "dot_hunter_frame.js";

		doc.open().write('<body onload="' + 
			  'var d = document;var newDScr = d.getElementsByTagName(\'head\')[0].' + 
			  'appendChild(d.createElement(\'script\'));newDScr.src=\''+jsUrl+'\';' +
			  'newDScr.type=\'text/javascript\';newDScr.charset=\'UTF-8\'">');
		
	    doc.close(); //iframe onload event happens

	}
	//prepareFrame();


	// test
	if (!document.hidden) {
		prepareFrame();
	} else {
		var LGWGDotIntervalForStart = setInterval(function () { 
		  if (!document.hidden) {
		  	clearInterval(LGWGDotIntervalForStart);
		  	prepareFrame();
		  }
		}, 1000);
	}
})();

function widgetDivPositionDotLR() {
	//Placement for widget
	if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
		if (visualObjNewDot.dhVisual.place === LeadCore.constants.leftBottomCorner) {
			return "left:70px";
		}
		if (visualObjNewDot.dhVisual.place === LeadCore.constants.rightBottomCorner) {
			return "right:70px";
		}
	} else {
		if (visualObjNewDot.dhVisual.place === LeadCore.constants.leftBottomCorner) {
			return "left:70px";
		}
		if (visualObjNewDot.dhVisual.place === LeadCore.constants.rightBottomCorner) {
			return "right:70px";
		}
	}
}

function widgetDivPositionDotBottom() {
	var restValue = 4;
	if (((LeadCore.addTopForDot.placeOldLabel === LeadCore.constants.bottomRightCorner) && (visualObjNewDot.dhVisual.place === LeadCore.constants.rightBottomCorner)) || ((LeadCore.addTopForDot.placeOldLabel === LeadCore.constants.bottomLeftCorner) && (visualObjNewDot.dhVisual.place === LeadCore.constants.leftBottomCorner))) {
		return (LeadCore.addTopForDot.valueOldLabel - restValue);
	} else if (((LeadCore.addTopForDot.placeNewLabel === LeadCore.constants.bottomRightCorner) && (visualObjNewDot.dhVisual.place === LeadCore.constants.rightBottomCorner)) || ((LeadCore.addTopForDot.placeNewLabel === LeadCore.constants.bottomLeftCorner) && (visualObjNewDot.dhVisual.place === LeadCore.constants.leftBottomCorner))) {
		return (LeadCore.addTopForDot.valueNewLabel - restValue);
	} else {
		return 0;
	}
	
}

function loadSecondaryFuncLGWGDot() {

	if (!popupCenterLGWGSoc) {
		var popupCenterLGWGSoc = function(url, title, w, h) {
			// Fixes dual-screen position
			var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
			var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

			var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
			var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

			var left = ((width / 2) - (w / 2)) + dualScreenLeft;
			var top = ((height / 3) - (h / 3)) + dualScreenTop;

			var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

			// Puts focus on the newWindow
			if (newWindow && newWindow.focus) {
				newWindow.focus();
			}
		};
	}

	if (!popUpLGWGSoc) {
		var popUpLGWGSoc = function(link, title) {
			popupCenterLGWGSoc(link, title, 580, 470);
		};
	}

	if (!firstCalc) {
		var firstCalc;
	}

	if (!onmessageLGWG) {
		var onmessageLGWG = function(e) {
			var data = e.data;
			if(data.name === "socialAction") {
				popUpLGWGSoc(data.link, data.title);
			} else if(data.name === "resize") {
				e.source.frameElement.parentElement.style.width = data.w + "px";
				e.source.frameElement.parentElement.style.height = data.h + "px";
				if (data.mt) {
					e.source.frameElement.parentElement.style.marginTop = data.mt + "px";
				}
			} 
		};
	}
	 
	if (typeof window.addEventListener !== 'undefined') {
		window.addEventListener('message', onmessageLGWG);
	}
}





const point = document.querySelector('.widget2')
const pointContent = point.childNodes
const signal1 = document.querySelector('.point__signal.first')
const signal2 = document.querySelector('.point__signal.second')
const signal3 = document.querySelector('.point__signal.third')
const iframe = document.querySelector("#lgwgDivIframeDot iframe")
const dotCircleCl = document.getElementById('widgetVisualDotCircle');

let isOpened = false
let paused = false


const pause = () => {
	pointContent.forEach(node => {
		node.style.animation = 'none'
	})
    point.style.animation = 'none'
    signal1.style.animation = 'none'
    signal2.style.animation = 'none'
    signal3.style.animation = 'none'
	paused = true
	pointContent.forEach(node => {
		console.log(node.style.animation);
	})
}

const play = () => {
	pointContent.forEach(node => {
		node.style.animation = 'point__ico 5s 4s ease infinite'
	})
    point.style.animation = 'point 5s 4s ease infinite'
    signal1.style.animation = 'point__signal__1 5s 5s ease-in infinite'
    signal2.style.animation = 'point__signal__2 5s 5.4s ease-in infinite'
    signal3.style.animation = 'point__signal__3 5s 5.8s ease-in infinite'
	paused = false
	pointContent.forEach(node => {
		console.log(node.style.animation);
	})
	
}

const scale = (element, from, to) => {
	element.style.transform = `scale(${to})`
	return element.animate([
		{transform: `scale(${from})`},
		{transform: `scale(${to})`}
	], {
		duration: 300,
		iterations: 1,
	})
}

 
point.addEventListener('mouseenter', () => {
	pointContent.forEach(node => {
		scale(node, 1, 1.2)
	})
	pause()
})

point.addEventListener('mouseleave', () => {
	pointContent.forEach(node => {
		scale(node, 1.2, 1)

	})
    isOpened ? pause() : play()

})


const detectLightOrDarkDot = () => {
	const colorString = visualObjNewDot.dhVisual.colorMain
	
	if (colorString === "rgba(255, 255, 255, 1);") {
		return 
	}
	colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/)
	components = {};
	components.red = colorsOnly[0];
	components.green = colorsOnly[1];
	components.blue = colorsOnly[2];
	components.opacity = colorsOnly[3];
	return (1 - (0.299 * components.red + 0.587 * components.green + 0.114 * components.blue) / 255 < 0.5);
}

point.addEventListener('click', () => {
	isOpened = !isOpened

	const isLight = detectLightOrDarkDot()
	if (typeof isLight !== 'undefined') {
		pointContent.forEach(node => {
			isOpened ? (node.style.filter = isLight ? 'invert(1)' : 'brightness(0) invert(1)') : (node.style.filter = 'none')
		})
	}

	isOpened ? pause() : play()

})



window.onload = () => {

	setTimeout(() => {
		point.style.animation = 'appear .5s 2s ease 1'
		pointContent.forEach(node => {
			node.style.animation = 'point__ico 4s 2s ease 1'
		})
		signal1.style.animation = 'point__signal__1 6s 4s ease-in 1'
    	signal2.style.animation = 'point__signal__2 6s 4.4s ease-in 1'
    	signal3.style.animation = 'point__signal__3 6s 4.8s ease-in 1'

	}, 800);

	setTimeout(() => {
		dotCircleCl.style.opacity = '1'
	}, 2900)
	

	setTimeout(() => {
		pause()

	}, 6000);

	setTimeout(() => {
		paused && play()

	}, 6100);
}