if (!createLGWGElement) {
	var createLGWGElement = LeadCore.createLGWGElement;
}

var LGWGPathBaseUrlLabel = "http://my-local-root.com/leadgenic/dev/";
//var LGWGPathBaseUrlLabel = "https://cdn.leadgenic.ru/dev/lg_widgets_l11/";
//var LGWGPathBaseUrlLabel = "https://cdn.leadgenic.ru/production/lg_widgets_l11/";

var LGWGPathForDevelopmentLabel = LGWGPathBaseUrlLabel + "label/";

var divForFrameLabel = document.createElement("div");
var widgetLabelPosition = {
	left: "auto",
	right: "auto",
	top: "auto",
	bottom: "auto",
	marginTop: "0px",
	class: "lgwg-label-start-position"
};

var LGWG_default_systemFonts = ["Arial", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Times New Roman", "Trebuchet MS", "Verdana"];

for (var i = 0; i < LeadWidgets.list.length; i++) {
	if (LeadWidgets.list[i].type.code == 'label_widget') {
		idLabelSampleNew(LeadWidgets.list[i]);
	}
}

function idLabelSampleNew(labelObj) {

	var visualObjNewLabel = labelObj.guiprops,
		autoInviteObjNewLabel = labelObj.autoinvite,
		restrNewLabel = labelObj.restrictions,
		widgetLGWGNewLabelName = labelObj.name,
		widgetLGWGNewLabelId = labelObj.id,
		soundBeepNewLabel = labelObj.template.sound;

	if (LGWG_default_systemFonts.indexOf(visualObjNewLabel.labelMain.font.name) === -1) {
		var urlFontLGWG;
		if (visualObjNewLabel.labelMain.font.name === "Open Sans Condensed") {
			urlFontLGWG = "https://fonts.googleapis.com/css?family="+encodeURIComponent(visualObjNewLabel.labelMain.font.name)+":300,700&amp;subset=latin,cyrillic";
		} else {
			urlFontLGWG = "https://fonts.googleapis.com/css?family="+encodeURIComponent(visualObjNewLabel.labelMain.font.name)+"&amp;subset=latin,cyrillic";
		}
        var linkFontLGWG = document.createElement('link');
        linkFontLGWG.rel = 'stylesheet';
        linkFontLGWG.href = urlFontLGWG;
        document.getElementsByTagName('head')[0].appendChild(linkFontLGWG);
	}
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

		function setBorderRadiusToLabel() {
			if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
				return "0!important";
			} else {
				return (visualObjNewLabel.labelMain.borderRadiusLabel + "px!important");
			}
		}

		function getLabelIcon() {
			if (visualObjNewLabel.labelMain.icon && visualObjNewLabel.labelMain.icon.selectedIcon) {
				return "font-awe " + visualObjNewLabel.labelMain.icon.selectedIcon;
			} else {
				return "flabels lgiconfont-" + visualObjNewLabel.labelMain.icon.selectIcon;
			}
		}
		
		var labelWidget = createLGWGElement( 'div', { id: 'visualBlockWidgetLGWGPop'+widgetLGWGNewLabelId, class: 'visual-block-widget-lgwg-label widget-visual-block wv-b-st-anim-pop lgwg-op-hid-st '+setMobileClass(), style:'opacity:0'},
			createLGWGElement( 'div', { id: 'widgetVisualLabel'+widgetLGWGNewLabelId, class: 'lgwg-label-line-small animClass05', style: 'background:'+visualObjNewLabel.labelMain.rgbaLabel+';border-top-right-radius:'+setBorderRadiusToLabel()+';border-top-left-radius:'+setBorderRadiusToLabel()+';width:'+visualObjNewLabel.labelMain.width+'px'},
				createLGWGElement( 'div', { id: 'lgwgLabelLineIn'+widgetLGWGNewLabelId, class: 'lgwg-label-line-in animClass02'},
					createLGWGElement( 'div', { id: 'lgiconfontImg'+widgetLGWGNewLabelId, class: 'lgiconfontImg lgwg-none-imp'}),
					createLGWGElement( 'span', { id: 'labelSpanForIconText', class: 'lgwg-label-line-text', style:'font-size:'+visualObjNewLabel.labelMain.fontSize+'px'+';font-family:'+visualObjNewLabel.labelMain.font.fontFamily+';color:'+visualObjNewLabel.labelMain.colorText}, 
						createLGWGElement( 'i', { id: 'flabels'+widgetLGWGNewLabelId, class: getLabelIcon(), style: 'color:'+visualObjNewLabel.labelMain.icon.color})
					),
					createLGWGElement( 'div', { id: 'labelLGWGLogoSmall'+widgetLGWGNewLabelId, class: 'label-lgwg-logo-small' },
						createLGWGElement( 'span', { id: 'labelLGWGLogoSmallSpan'+widgetLGWGNewLabelId, class: 'label-lgwg-logo-small-span'}),
						createLGWGElement( 'div', { id: 'labelNewLGWGLinkHover'+widgetLGWGNewLabelId, class: 'labelnew-lgwg-link-hover'},
							createLGWGElement( 'a', { id: 'labelNewLGWGSmLinkInc'+widgetLGWGNewLabelId, class: 'labelnew-lgwg-sm-link-inc', target: 'blank'},
								createLGWGElement( 'div', { class: 'labelnew-lgwg-link-str'}),
								createLGWGElement( 'h4', { class: 'labelnew-lgwg-text-link'}, LeadCore.constants.workOn,
									createLGWGElement( 'span', { class: ''}, 'Lead',
										createLGWGElement( 'b', { class: ''}, 'Genic')
									)
								)
							)
						)
					)
				)
			)
		);

		//Append div to body
		document.getElementsByTagName("body")[0].appendChild(labelWidget);
		document.getElementById("labelSpanForIconText").insertAdjacentHTML("beforeEnd", visualObjNewLabel.labelMain.text);

		if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
			var hideLabelMobileButton = createLGWGElement( 'div', { id: 'hideLabelMobileButton'+widgetLGWGNewLabelId, class: 'hide-label-mobile-button'},
				createLGWGElement( 'i', { class: 'lgiconfont-play', style: 'color:'+visualObjNewLabel.labelMain.icon.color}));
			
			document.getElementById("widgetVisualLabel"+widgetLGWGNewLabelId).appendChild(hideLabelMobileButton);
		}

		/*************************************************************************
		 *Appear widget label
		 */
		var LGWGFlabels            = document.getElementById('flabels'+widgetLGWGNewLabelId);
		var LGWGImgLabel           = document.getElementById('lgiconfontImg'+widgetLGWGNewLabelId);
		var LGWGLabelLineIn        = document.getElementById('lgwgLabelLineIn'+widgetLGWGNewLabelId);

		var LGWGlLabelLine         = document.getElementById('widgetVisualLabel'+widgetLGWGNewLabelId);
		var LGVisualMainBlock      = document.getElementById('visualBlockWidgetLGWGPop'+widgetLGWGNewLabelId);
	    var LGWGLabelLogoSmall     = document.getElementById('labelLGWGLogoSmall'+widgetLGWGNewLabelId);
	    var LGWGLabelNewSmLinkInc  = document.getElementById('labelNewLGWGSmLinkInc'+widgetLGWGNewLabelId);
	    var LGWGLabelNewLinkHover  = document.getElementById('labelNewLGWGLinkHover'+widgetLGWGNewLabelId);
	    var LGWGLabelSpanForIconText = document.getElementById('labelSpanForIconText');
	    
		labelWidgetStyle();
		/*************************************************************************
		 *Dot circle and main set widget Block
		 */
		function labelWidgetStyle () {

			//Detect light or not
			function detectLightOrDarkOfLabel() {
				var colorString = visualObjNewLabel.labelMain.rgbaLabel,
			    colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/),
			    components = {};
				components.red = colorsOnly[0];
				components.green = colorsOnly[1];
				components.blue = colorsOnly[2];
				components.opacity = colorsOnly[3];

				return (1 - (0.299 * components.red + 0.587 * components.green + 0.114 * components.blue) / 255 < 0.5);
			}
			LGVisualMainBlock.classList.add(detectLightOrDarkOfLabel() ? 'visual-block-widget-lgwg-label-islight' : 'visual-block-widget-lgwg-label-isdark');
			

			//Use icon in Label
			if (!visualObjNewLabel.labelMain.icon.enable) {
				LGWGFlabels.classList.add('lgwg-none');
				if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
					LGWGlLabelLine.classList.add('lgwg-padding-left20');
				}
			}

			if (visualObjNewLabel.labelMain.iconOrImage) {
				LGWGFlabels.classList.remove('lgwg-none');
				if (visualObjNewLabel.labelMain.iconOrImage !== "useIcon") {
					LGWGFlabels.classList.add('lgwg-none');
				}
				if (visualObjNewLabel.labelMain.iconOrImage === "useImg" && visualObjNewLabel.labelMain.url && visualObjNewLabel.labelMain.imgWidth) {
					LGWGImgLabel.classList.remove('lgwg-none-imp');
					LGWGImgLabel.style.backgroundImage = "url("+visualObjNewLabel.labelMain.url+")";
					LGWGImgLabel.style.width = visualObjNewLabel.labelMain.imgWidth + "px";
					LGWGImgLabel.style.height = visualObjNewLabel.labelMain.imgWidth + "px";
					LGWGImgLabel.style.marginTop = - visualObjNewLabel.labelMain.imgMargTop + "px";
					LGWGLabelLineIn.style.paddingLeft = (visualObjNewLabel.labelMain.imgWidth + 10) + "px";
				}
			}
			
			//Placement for widget
			if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
				widgetLabelPosition.class = "lgwg-label-start-position-mobile-only";
				if ((visualObjNewLabel.labelMain.place === LeadCore.constants.bottomLeftCorner) || (visualObjNewLabel.labelMain.place === LeadCore.constants.leftBrowserSide)) {
					LGVisualMainBlock.classList.add('wv-b-bottom-left-pop');
				}
				if ((visualObjNewLabel.labelMain.place === LeadCore.constants.bottomRightCorner) || (visualObjNewLabel.labelMain.place === LeadCore.constants.rightBrowserSide)) {
					LGVisualMainBlock.classList.add('wv-b-bottom-right-pop');
				}

				setTimeout(function() {
					if (LGWGLabelSpanForIconText.scrollWidth > LGWGLabelSpanForIconText.clientWidth) {
						LGWGLabelLineIn.classList.add("lgwg-margue-text");
					}
				}, 700);
				
			} else {
				if (visualObjNewLabel.labelMain.place === LeadCore.constants.bottomLeftCorner) {
					LGVisualMainBlock.classList.add('lgwg-label-start-position-lb');
					LGVisualMainBlock.classList.add('wv-b-bottom-left-pop');
					widgetLabelPosition.bottom = "0";
					widgetLabelPosition.left = "0";
					widgetLabelPosition.class = "lgwg-label-start-position-lb"; 
				}
				if (visualObjNewLabel.labelMain.place === LeadCore.constants.bottomRightCorner) {
					LGVisualMainBlock.classList.add('lgwg-label-start-position-rb');
					LGVisualMainBlock.classList.add('wv-b-bottom-right-pop');
					widgetLabelPosition.bottom = "0";
					widgetLabelPosition.right = "0"; 
					widgetLabelPosition.class = "lgwg-label-start-position-rb";
				}
				if (visualObjNewLabel.labelMain.place === LeadCore.constants.leftBrowserSide) {
					LGVisualMainBlock.classList.add('lgwg-label-start-position-lm');
					LGVisualMainBlock.classList.add('wv-b-mid-left-pop');
					LGVisualMainBlock.style.marginTop = - (visualObjNewLabel.dhVisual.widget_height_nopx / 2) + 'px'; 
					LGWGlLabelLine.style.marginLeft = - ((visualObjNewLabel.labelMain.width/2) - (visualObjNewLabel.labelMain.height/2)) + 'px';
					LGWGlLabelLine.style.top = (visualObjNewLabel.dhVisual.widget_height_nopx / 2) + 'px';
					widgetLabelPosition.top = "50%";
					widgetLabelPosition.left = "0";
					widgetLabelPosition.class = "lgwg-label-start-position-lm";
					widgetLabelPosition.marginTop = - (visualObjNewLabel.dhVisual.widget_height_nopx / 2) + 'px';
				}
				if (visualObjNewLabel.labelMain.place === LeadCore.constants.rightBrowserSide) {
					LGVisualMainBlock.classList.add('lgwg-label-start-position-rm');
					LGVisualMainBlock.classList.add('wv-b-mid-right-pop');
					LGVisualMainBlock.style.marginTop = - (visualObjNewLabel.dhVisual.widget_height_nopx / 2) + 'px';
					LGWGlLabelLine.style.marginRight = - ((visualObjNewLabel.labelMain.width/2) - (visualObjNewLabel.labelMain.height/2)) + 1 + "px"; 
					LGWGlLabelLine.style.top = (visualObjNewLabel.dhVisual.widget_height_nopx / 2) + 'px';
					widgetLabelPosition.top = "50%";
					widgetLabelPosition.right = "0";
					widgetLabelPosition.class = "lgwg-label-start-position-rm";
					widgetLabelPosition.marginTop = - (visualObjNewLabel.dhVisual.widget_height_nopx / 2) + 'px';
				}
			}

			if (typeof LeadCore.smartParams !== "undefined") {
				LGWGLabelLogoSmall.classList.add('lgwg-none-imp');
			}
		}
	})();

	(function () {

		function prepareFrame() {
			console.log("SHOW LABEL");
			var bgForMain = visualObjNewLabel.bg.colorBg;
			//Use img for widget or set colorBg
			if (visualObjNewLabel.bg.fillorImg === 'useImg') {
				bgForMain = "url('" + visualObjNewLabel.bg.url + "') center center / cover no-repeat";
			}
			
			divForFrameLabel.setAttribute("id", "lgwgDivIframeLabel");
			divForFrameLabel.setAttribute("class", "lgwg-label-start-position " + widgetLabelPosition.class);
			divForFrameLabel.setAttribute("style", "position:fixed!important;left:"+widgetLabelPosition.left+";right:"+widgetLabelPosition.right+";top:"+widgetLabelPosition.top+";bottom:"+widgetLabelPosition.bottom+";margin-top:"+widgetLabelPosition.marginTop+";width:0;height:0;z-index:99999998");
			document.getElementsByTagName("body")[0].appendChild(divForFrameLabel);

			if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
				var shadowBlock = document.createElement("div");
				shadowBlock.setAttribute("id", "LGWGLabelShadow");
				shadowBlock.setAttribute("class", "lgwg-new-label-shadow");
				shadowBlock.setAttribute("style", "background:rgba(0, 0, 0, 0.4)");
				document.getElementById("lgwgDivIframeLabel").appendChild(shadowBlock);
			}

		    var ifrm = document.createElement("iframe");
		    ifrm.setAttribute("src", "about:blank");
		    ifrm.setAttribute("frameBorder", "0");
		    ifrm.setAttribute("id", widgetLGWGNewLabelId);
		    ifrm.setAttribute("name", "lgwgIframeLabel");
		    ifrm.setAttribute("style", "display:block!important;position:relative!important;width:100%!important;height:100%!important;border:none!important;background:none!important");
		    
		    ifrm.addEventListener('load', function () {
		    	injectCode();
		    }, false);
		    document.getElementById("lgwgDivIframeLabel").appendChild(ifrm);

		    function injectCode() {
		    	var cssLinkGeneric = document.createElement("link");
				cssLinkGeneric.href = LGWGPathBaseUrlLabel + "generic_frame.css";
				cssLinkGeneric.rel  = "stylesheet";
				cssLinkGeneric.type = "text/css";

				var cssLink = document.createElement("link");
				cssLink.href = LGWGPathForDevelopmentLabel + "lgwg_label_frame.css";
				cssLink.rel  = "stylesheet";
				cssLink.type = "text/css";

				var cssDPLink = document.createElement("link");
				cssDPLink.href = LGWGPathBaseUrlLabel + "/datepicker/datepicker.css";
				cssDPLink.rel  = "stylesheet";
				cssDPLink.type = "text/css";

				ifrm.contentWindow.document.getElementsByTagName("head")[0].appendChild(cssLinkGeneric);
				ifrm.contentWindow.document.getElementsByTagName("head")[0].appendChild(cssLink);
				ifrm.contentWindow.document.getElementsByTagName("head")[0].appendChild(cssDPLink);

				loadSecondaryFuncLGWGLabel();
				//Appear widget
				setTimeout(function() {
					document.getElementById('visualBlockWidgetLGWGPop'+widgetLGWGNewLabelId).style.removeProperty('opacity');
					document.getElementById('visualBlockWidgetLGWGPop'+widgetLGWGNewLabelId).classList.remove('lgwg-op-hid-st');
				}, 2000);
			}

			var doc = ifrm.contentWindow.document;
			var jsUrl = LGWGPathForDevelopmentLabel + "lgwg_label_frame.js";

			doc.open().write('<body onload="' + 
				'var d = document;var newDScr = d.getElementsByTagName(\'head\')[0].' + 
				'appendChild(d.createElement(\'script\'));newDScr.src=\''+jsUrl+'\';' +
				'newDScr.type=\'text/javascript\';newDScr.charset=\'UTF-8\'">');
			  
		    doc.close(); //iframe onload event happens
		}
		
		// test
		if (!document.hidden) {
			prepareFrame();
		} else {
			var LGWGLabelIntervalForStart = setInterval(function () { 
			  if (!document.hidden) {
			  	clearInterval(LGWGLabelIntervalForStart);
			  	prepareFrame();
			  }
			}, 1000);
		}
	})();
}

function loadSecondaryFuncLGWGLabel() {

	if(!popupCenterLGWGSoc) {
		var popupCenterLGWGSoc = function(url, title, w, h) {
			// Fixes dual-screen position                         Most browsers      Firefox
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

	if(!popUpLGWGSoc) {
		var popUpLGWGSoc = function(link, title) {
			popupCenterLGWGSoc(link, title, 580, 470);
		};
	}

	if(!firstCalc) {
		var firstCalc;
	}

	if(!onmessageLGWG) {
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