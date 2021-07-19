/*************************************************************************
 *Delete procent
 */
var docTitle;
(function () {
	var docTitOld = window.top.document.title;
	if (docTitOld) {
		docTitle = docTitOld.replace(/%/, "");
	} else {
		docTitle = "No title";
	}
})();

var createLGWGElement = window.top.createLGWGElement;
var isMobile = window.top.LeadCore.isMobile;
var LeadWidgets = window.top.LeadWidgets;
var LeadCore = window.top.LeadCore;
var LeadCoreExt = window.top.LeadCoreExt;
var LGWGService = window.top.LGWGService;
var openWidgetDetect;
var isVideo = false;
var videoPlayers = [];
var isBGVideo = false;
var isInitCouponClick = false;

var onShowScript,
	onTargetScript;

var thankShowTimeout = null;

var urlLabelADVLGWG = "https://leadgenic.ru/create_widget/?utm_source="+document.domain+"&utm_campaign=widget_create_offer_button";

var mobileOpen;
var pageX = 0,
	pageY = 0;

var timerArray = [];

for (var i = 0; i < LeadWidgets.list.length; i++) {
	if (LeadWidgets.list[i].type.code == 'label_widget') {
		idLabelSampleNew(LeadWidgets.list[i]);
	}
}


function idLabelSampleNew(popupObj) {

	var visualObjNewPopup = {},
		autoInviteObjNewPopup = {},
		restrNewPopup = {},
		jsInfo = {},
		widgetLGWGNewPopupName,
		widgetLGWGNewPopupId,
		abtestInfo,
		metrikaId,
		soundBeepNewPopup;

		visualObjNewPopup = popupObj.guiprops;
		autoInviteObjNewPopup = popupObj.autoinvite;
		restrNewPopup = popupObj.restrictions;
		widgetLGWGNewPopupName = popupObj.name;
		widgetLGWGNewPopupId = popupObj.id;
		soundBeepNewPopupUrl = popupObj.template.sound;

	if (visualObjNewPopup.bg.bgStyle) {
		visualObjNewPopup.bg.colorBg = visualObjNewPopup.bg.bgStyle;
	}

	if (popupObj.abtestInfo) {
		abtestInfo = popupObj.abtestInfo;
	}

	if (popupObj.jsInfo) {
		jsInfo = popupObj.jsInfo;
	}

	var idForSetUniqueLock;
	idForSetUniqueLock = abtestInfo ? abtestInfo.id : widgetLGWGNewPopupId;
	metrikaId = abtestInfo && abtestInfo.superWidgetId ? abtestInfo.superWidgetId : widgetLGWGNewPopupId;

	(function () {
		if (isMobile.any()) {
			var lgwgClickEvent = 'touchend';
		}
		else {
			var lgwgClickEvent = 'click';
		}

		if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
			if (visualObjNewPopup.labelMain.fontSize > 18) {
				visualObjNewPopup.labelMain.fontSize = 18;
			}
		}

		/*************************************************************************
		 *Create Dom
		 */
		function createDomDH() {

			function setMobileClass() {
				if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
					return "visual-block-widget-lgwg-label-mobile";
				} else {
					return "";
				}
			}

			function getBGColorPod() {
				return visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable ? visualObjNewPopup.formExt.model.mainSettings.colorPod.rgbaColorPod : visualObjNewPopup.form.colorPod.rgbaColorPod;
			}

			var hlSmall = createLGWGElement( 'div', { id: 'visualBlockWidgetLGWGPop'+widgetLGWGNewPopupId, class: 'widget-visual-block visual-block-widget-lgwg-label lgwg-op-hid-st '+setMobileClass(), style:'opacity:0'},
				createLGWGElement( 'iframe', { id: 'testIframe', width: '100%', height: '100%', style: 'position:absolute;z-index:-1;opacity:0'}),

				createLGWGElement( 'div', { id: 'LGWGWidgetAndCloseBlockPop'+widgetLGWGNewPopupId, class: 'animClass10 widget-global-close-label'},
					createLGWGElement( 'div', { id:'LGWGNewCloseBtnPop'+widgetLGWGNewPopupId, class: 'close-btn-x-new-dot click-lgwg-dot-close-lock lgwg-op-hid animClass03'},
						createLGWGElement( 'span', {})
					),
					createLGWGElement( 'a', {id: 'clickBannerLGWGPop'+widgetLGWGNewPopupId, class: 'click-banner-lgwg-pop'},
						createLGWGElement( 'div', { id: 'mainBlockWidgetLGWGPop'+widgetLGWGNewPopupId, class: 'widget1 block-widget-show animClass03', style:'border:'+LGWGService.getBorderStyle(visualObjNewPopup.bg)+';box-shadow:'+LGWGService.getBoxShadowStyle(visualObjNewPopup.bg)+';border-radius:'+visualObjNewPopup.bg.borderRadius+'px'+';width:'+visualObjNewPopup.dhVisual.widget_width_all},
							createLGWGElement( 'div', { id: 'widgetBGContentLGWG'+widgetLGWGNewPopupId, class: 'widget-bg-content animClass01', style:'border-radius:'+LGWGService.getInnerBorderStyle(visualObjNewPopup.bg)+';background:'+visualObjNewPopup.bg.colorBg+';opacity:'+LGWGService.setOpacityForBg(visualObjNewPopup.bg)}),
							createLGWGElement( 'div', { id: 'widgetMaskWholeLGWG'+widgetLGWGNewPopupId, class: 'widget-mask-whole lgwg-none animClass01'}),
							createLGWGElement( 'div', { id: 'widgetImageLGWG', class: 'widget-image lgwg-none animClass01'}),
							createLGWGElement( 'div', { id: 'colorFormPod', class: 'color-bg-on-form lgwg-none animClass01', style:'background:'+getBGColorPod()}),
							createLGWGElement( 'div', { id: 'widgetMainWr', class: 'wigdet-main-wr animClass01'})
						)
					),
					createLGWGElement( 'div', { id: 'lgwgBlockLinkFPop'+widgetLGWGNewPopupId, class: 'lgwg-block-link-f animClass03'},
						createLGWGElement( 'div', { class: 'lgwgnew-dot-footer lgwgnew-dot-footer-hid'},
							createLGWGElement( 'a', { href: 'http://leadgenic.ru', id: 'lgwgnewPopBtnF'+widgetLGWGNewPopupId, class: 'lgwg-new-pop-btn-f', target: 'blank' }, LeadCore.constants.lgLinkStatic)
						)
					),
					createLGWGElement( 'div', { id: 'thankBlockPopLGWG'+widgetLGWGNewPopupId, class: 'thank-block-pop-lgwg block-widget-show block-thank lgwg-none lgwg-op-hid animClass03', style:'border:'+LGWGService.getBorderStyle(visualObjNewPopup.bg)+';box-shadow:'+LGWGService.getBoxShadowStyle(visualObjNewPopup.bg)+';border-radius:'+visualObjNewPopup.bg.borderRadius+'px'+';width:'+visualObjNewPopup.dhVisual.widget_width_all+';height:'+visualObjNewPopup.dhVisual.widget_height_all},
						createLGWGElement( 'div', { id: 'widgetThankBGContentLGWG'+widgetLGWGNewPopupId, class: 'widget-bg-content animClass01', style:'border-radius:'+LGWGService.getInnerBorderStyle(visualObjNewPopup.bg)+';background:'+visualObjNewPopup.bg.colorBg+';opacity:'+LGWGService.setOpacityForBg(visualObjNewPopup.bg)}),
						createLGWGElement( 'div', { id: 'widgetThankMaskWholeLGWG'+widgetLGWGNewPopupId, class: 'widget-mask-whole lgwg-none animClass01'}),
						createLGWGElement( 'div', { id: 'widgetThankWrPop'+widgetLGWGNewPopupId, class: 'editor-font-thank'},
							createLGWGElement( 'div', { id: 'widgetThankIncWrPop'+widgetLGWGNewPopupId, class: 'editor-font-thank-inc'},
								createLGWGElement( 'div', { id: 'title2PopElLGWG'+widgetLGWGNewPopupId, class: 'title-main-th-new-popup', style:'font-size:'+visualObjNewPopup.title.fontSize+'px'+';font-family:'+visualObjNewPopup.title.font.fontFamily}, visualObjNewPopup.thank.textSummer),
								createLGWGElement( 'div', { id: 'desc2PopElLGWG'+widgetLGWGNewPopupId, class: 'description-th-new-popup', style:'font-size:'+visualObjNewPopup.desc.fontSize+'px'+';font-family:'+visualObjNewPopup.desc.font.fontFamily}, visualObjNewPopup.thank2.textSummer)
							)
						)
					),
					createLGWGElement( 'div', { id: 'thankBlockPopAdvLGWG'+widgetLGWGNewPopupId, class: 'block-thank-adv block-widget-show block-thank lgwg-none lgwg-op-hid animClass03', style:'border:'+LGWGService.getBorderStyle(visualObjNewPopup.bg)+';box-shadow:'+LGWGService.getBoxShadowStyle(visualObjNewPopup.bg)+';border-radius:'+visualObjNewPopup.bg.borderRadius+'px'+';width:'+visualObjNewPopup.dhVisual.widget_width_all+';height:'+visualObjNewPopup.dhVisual.widget_height_all},
						createLGWGElement( 'div', { id: 'thankBlockPopInAdvLGWG'+widgetLGWGNewPopupId, class: 'thank-block-pop-adv-lgwg'},
							createLGWGElement( 'div', {class: 'thank-adv-icon'}),
							createLGWGElement( 'h1', {}, 'Форма успешно отправлена!'),
							createLGWGElement( 'h2', {}, 'А сейчас вы можете'),
							createLGWGElement( 'a', { id: 'thank-btn-on-adv'+widgetLGWGNewPopupId, class: 'thank-btn-on-adv', href: urlLabelADVLGWG, target: 'blank'}, 'Создать такой же виджет для своего сайта'),
							createLGWGElement( 'span', {}, 'или'),
							createLGWGElement( 'div', { id: 'thank-close-btn-adv'+widgetLGWGNewPopupId, class: 'thank-close-btn-adv'}, 'закрыть это окно')
						)
					)
				)
			);

			//Append div to body
			document.getElementsByTagName("body")[0].appendChild(hlSmall);
			var template = "<div id=\"widgetMaskContentLGWG"+widgetLGWGNewPopupId+"\" class=\"widget-mask-content lgwg-none\"></div><ul class=\"wigdet-dot-main-wr "+LGWGService.classNameVerticalOrient(visualObjNewPopup.dhVisual)+"\" style=\"height:"+(((visualObjNewPopup.dhVisual.widget_content_heightpx*1)-60).toString())+"px\">"+buildDynamicWidget()+"</ul>";
			document.getElementById("widgetMainWr").innerHTML = template;
		}

		function buildDynamicWidget() {
			var widgetDynamic = "";

			for(var i = 0; i < visualObjNewPopup.elementsList.length; i++) {
				var element = visualObjNewPopup.elementsList[i];
				if (element) {
					if (element.name) {
						if (element.name === "social-element") {
							var socialMarkup = "";
							for (var j = 0; j < visualObjNewPopup.social.items.length; j++) {
								socialMarkup += "<div class=\"webicon large "+visualObjNewPopup.social.type+" "+visualObjNewPopup.social.items[j].name+"\" data=\""+getLinkForSocBtn(visualObjNewPopup.social.items[j].name)+"\"></div>";
							}
							widgetDynamic += "<li><div class=\"social-block-pd m-b-n-sm m-r-n-xs "+LGWGService.hrPosSel(visualObjNewPopup.social)+"\"><div id=\"socialBlockAction\" class=\"center-mode-social\">"+socialMarkup+"</div></div></li>";
						}

						if (element.name === "timer-element") {
							var timerMarkup = LGWGService.getTimerMarkup(element);
							widgetDynamic += "<li><div class=\"social-block-pd\">"+timerMarkup+"</div></li>";
						}

						if (element.name === "closelink-element") {
							if (visualObjNewPopup.exit.button && visualObjNewPopup.exit.button.enable) {
								widgetDynamic += "<li><div><div class=\"widget1-btn-exit-btn widget1-btn-bl "+LGWGService.btnExitPosSel(visualObjNewPopup.exit.button, visualObjNewPopup.dhVisual.place)+"\"><button id=\"btnExitButtonLGWG\" class=\"button-send "+LGWGService.btnStyleSel(visualObjNewPopup.exit.button)+" "+LGWGService.btnWidthSel(visualObjNewPopup.exit.button)+"\" style=\"font-size:"+visualObjNewPopup.exit.button.fontSize+"px;font-family:"+visualObjNewPopup.exit.button.font.fontFamily+";background:"+visualObjNewPopup.exit.button.colorBtn+";border-color:"+visualObjNewPopup.exit.button.colorBtn+"!important;color:"+visualObjNewPopup.exit.button.colorTextBtn+";border-radius:"+visualObjNewPopup.exit.button.borderRadiusBtn+"px;width:"+visualObjNewPopup.exit.button.btn_widthpx+"px\"><div>"+visualObjNewPopup.exit.button.textSummer+"</div></button></div></div></li>";
							} else {
								widgetDynamic += "<li><div><div class=\"widget1-btn-exit widget1-btn-exit-new-dot "+LGWGService.getAlignOfCloseLink(visualObjNewPopup.exit)+"\"><button id=\"btnExitLGWGPop\" class=\"click-edit-cl button-link-close click-lgwg-dot-close-lock\" style=\"font-size:"+visualObjNewPopup.exit.fontSize+"px;font-family:"+visualObjNewPopup.exit.font.fontFamily+"\"><div>"+visualObjNewPopup.exit.textSummer+"</div></button></div></div></li>";
							}
						}

						if (element.name === "title-element") {
							widgetDynamic += "<li><div class=\"title-main-new-dot "+LGWGService.isTextShadow(element)+"\" style=\"font-size:"+element.fontSize+"px;font-family:"+element.font.fontFamily+";text-shadow:"+element.textShadow.horiz+"px "+element.textShadow.vertical+"px "+element.textShadow.blur+"px "+LGWGService.getRGBAColor(element)+"\">"+element.textSummer+"</div></li>";
						}

						if (element.name === "coupon-element") {
							widgetDynamic += "<li><div class=\"title-main-new-dot title-main-new-dot-coupon "+LGWGService.isTextShadow(element.title)+LGWGService.isTextEnable(element.title)+"\" style=\"font-size:"+element.title.fontSize+"px;font-family:"+element.title.font.fontFamily+";text-shadow:"+element.title.textShadow.horiz+"px "+element.title.textShadow.vertical+"px "+element.title.textShadow.blur+"px "+LGWGService.getRGBAColor(element.title)+"\">"+element.title.textSummer+"</div>"+
							"<div class=\"social-block-pd social-block-coupon-add-marg\"><div class=\"element-coupon-block "+LGWGService.hrPosSel(element)+"\"><div class=\"element-coupon-wr non-coupon-value\" style=\"font-size:"+element.fontSize+"px;font-family:"+element.font.fontFamily+";background-color:"+LGWGService.getCouponRGBABG(element)+";color:"+element.colorText+";border-radius:"+element.borderRadius+"px;width:"+element.widthpx+"px\">"+
							"<div class=\"element-coupon-loader\"></div><div data-ccounter=\""+element.counter+"\" data-ccode=\""+element.coupon.code+"\" class=\"element-coupon-name\"></div><div class=\"element-coupon-hover\">"+element.hoverText+"</div><div class=\"element-coupon-click\">"+element.clickText+"</div></div></div></div></li>";
						}

						if (element.name === "image-element") {
							widgetDynamic += "<li><div class=\"social-block-pd\"><div class=\"element-image-block "+LGWGService.hrPosSel(element)+"\"><img class=\"element-image-block-img\" style=\"width:"+LGWGService.getVideoImageWidth(element)+"\" src=\""+element.imageUrl+"\"></div></div></li>";
						}

						if (element.name === "iframe-element") {
							widgetDynamic += "<li><div class=\"social-block-pd iframe-block-el\"><div class=\""+LGWGService.hrPosSel(element)+"\"><div class=\""+LGWGService.heightIfrmPosSel(element)+"\"><div class=\"element-iframe-block\" id=\"elementIframeBlock"+element.counter+"\" style=\"width:"+LGWGService.getVideoImageWidth(element)+";height:"+element.heightpx+"px\"><iframe id=\"idFrame"+element.counter+"\" onload=\""+fillIframeElement(element)+"\"><!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"</head><body></body></html></iframe></div></div></div></div></li>";
						}

						if (element.name === "split-element") {
							widgetDynamic += "<li><div class=\"social-block-pd\"><div class=\"split-element-block "+LGWGService.hrPosSel(element)+"\"><hr class=\"style"+element.type+"\" style=\"border-color:"+element.color+";width:"+element.widthpx+"px\"></hr></div></div></li>";
						}

						if (element.name === "padding-element") {
							widgetDynamic += "<li><div><div class=\"padding-element-block\" style=\"height:"+(element.padding - 15)+"px\"></div></div></li>";
						}

						if (element.name === "video-element") {
							isVideo = true;
							widgetDynamic += "<li><div class=\"social-block-pd\"><div class=\"element-image-block "+LGWGService.hrPosSel(element)+"\"><iframe data-auto=\""+element.autoplay+"\" allow=\"autoplay; encrypted-media\" class=\"video-element-ifrm\" style=\"width:"+LGWGService.getVideoImageWidth(element)+";height:"+LGWGService.getVideoHeight(element, visualObjNewPopup.dhVisual)+"px\" src=\""+element.videoUrl+"\" frameborder=\"0\" allowfullscreen></iframe></div></div></li>";
						}

						if (element.name === "button-element") {
							widgetDynamic += "<li id=\"liLGWGFormBtn\"><div><div id=\"widgetButtonBlockM\" class=\"widget1-btn-bl "+LGWGService.btnPosSel(visualObjNewPopup)+"\"><button id=\"btnFormSubLGWG\" class=\"click-edit-cl click-lgwg-dot-target button-send button-alone "+LGWGService.btnStyleSel(visualObjNewPopup.button)+" "+LGWGService.btnWidthSel(visualObjNewPopup.button)+"\" style=\"font-size:"+visualObjNewPopup.button.fontSize+"px;font-family:"+visualObjNewPopup.button.font.fontFamily+";background:"+visualObjNewPopup.button.colorBtn+";border-color:"+visualObjNewPopup.button.colorBtn+"!important;color:"+visualObjNewPopup.button.colorTextBtn+";border-radius:"+visualObjNewPopup.button.borderRadiusBtn+"px;width:"+visualObjNewPopup.button.btn_widthpx+"px\"><div>"+visualObjNewPopup.button.textSummer+"</div></button></div></div></li>";
						}

						if (element.name === "form-ext-element") {
							widgetDynamic += "<li id=\"liLGWGFormExt\">"+
												"<div class=\"color-pod form-ext-main-wr "+LGWGService.formExtHrPosSelWholeForm(visualObjNewPopup.formExt.model.mainSettings)+"\">"+
													"<div class=\"widget-form-ext-wrapper\" style=\"width:"+visualObjNewPopup.formExt.model.mainSettings.form_widthpx+"px\">"+
														"<div id=\"widgetFormExtBlockM\" class=\"widget1-form-ext-bl "+LGWGService.formExtGlobalAlignmentClass(visualObjNewPopup.formExt.model.mainSettings)+"\">"+LGWGService.getFormExtListMarkup(visualObjNewPopup.formExt.model)+"<div>"+
													"</div>"+
												"</div>"+
											"</li>";
						}

						if (element.name === "form-element") {
							var formMarkup = "";
							for (var f = 0; f < visualObjNewPopup.formSet.items.length; f++) {
								if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
									if (visualObjNewPopup.formSet.items[f].type === 'message') {
										formMarkup += "<div class=\"widget-inp-bl "+LGWGService.classNameInputItem(visualObjNewPopup.formSet.items[f], visualObjNewPopup.form.orient)+"\" style=\"width:"+visualObjNewPopup.form.widthpx+"px\">"+ 
													  "<div class=\"text-input-class text-input-area-class\">"+
														"<textarea id=\"elementid"+visualObjNewPopup.formSet.items[f].type+"\" type=\"text\" class=\"form-control form-widget-cntrl form-control-new-dot form-label-for-change form-cntrl-message form-req-"+visualObjNewPopup.formSet.items[f].required+" "+LGWGService.isFormBorder(visualObjNewPopup.form)+"\" placeholder=\""+visualObjNewPopup.formSet.items[f].placeholder+"\" style=\"background:"+visualObjNewPopup.form.rgbaInputForm+";color:"+visualObjNewPopup.form.colorTitleInputForm+";border-radius:"+visualObjNewPopup.form.borderRadiusInputForm+"px;border-color:"+visualObjNewPopup.form.border.color+"\"></textarea>"+
													  "</div></div>";
									} else {
										var inputType = (visualObjNewPopup.formSet.items[f].type === "phone" && visualObjNewPopup.formSet.phoneMask && visualObjNewPopup.formSet.phoneMask.enable) ? "tel" : "text";
										
										formMarkup += "<div class=\"widget-inp-bl "+LGWGService.classNameInputItem(visualObjNewPopup.formSet.items[f], visualObjNewPopup.form.orient)+"\" style=\"width:"+visualObjNewPopup.form.widthpx+"px\">"+
													  "<div class=\"text-input-class "+LGWGService.classNameFormInputMask(visualObjNewPopup.formSet.items[f].type, visualObjNewPopup.formSet.phoneMask)+"\">"+
														"<input id=\"elementid"+visualObjNewPopup.formSet.items[f].type+"\" type=\""+inputType+"\" class=\"form-control form-widget-cntrl form-control-new-dot form-label-for-change form-cntrl-"+visualObjNewPopup.formSet.items[f].type+" form-req-"+visualObjNewPopup.formSet.items[f].required+" "+LGWGService.isFormBorder(visualObjNewPopup.form)+"\" placeholder=\""+visualObjNewPopup.formSet.items[f].placeholder+"\" style=\"background:"+visualObjNewPopup.form.rgbaInputForm+";color:"+visualObjNewPopup.form.colorTitleInputForm+";border-radius:"+visualObjNewPopup.form.borderRadiusInputForm+"px;border-color:"+visualObjNewPopup.form.border.color+"\">"+
													  "</div></div>";
									}
								} else {
									if (visualObjNewPopup.formSet.items[f].type === 'message') {
										formMarkup += "<div class=\"widget-inp-bl "+LGWGService.classNameInputItem(visualObjNewPopup.formSet.items[f], visualObjNewPopup.form.orient)+"\" style=\"width:"+visualObjNewPopup.form.widthpx+"px\">"+ 
													  "<div class=\"text-input-class text-input-area-class\">"+
														"<textarea id=\"elementid"+visualObjNewPopup.formSet.items[f].type+"\" type=\"text\" class=\"form-control form-widget-cntrl form-control-new-dot form-label-for-change form-cntrl-message form-req-"+visualObjNewPopup.formSet.items[f].required+" "+LGWGService.isFormBorder(visualObjNewPopup.form)+"\" style=\"background:"+visualObjNewPopup.form.rgbaInputForm+";color:"+visualObjNewPopup.form.colorTitleInputForm+";border-radius:"+visualObjNewPopup.form.borderRadiusInputForm+"px;border-color:"+visualObjNewPopup.form.border.color+"\"></textarea>"+
														"<label for=\"elementid"+visualObjNewPopup.formSet.items[f].type+"\" class=\"form-widget-cntrl-label\" style=\"color:"+visualObjNewPopup.form.colorTitleInputForm+"\">"+visualObjNewPopup.formSet.items[f].placeholder+"</label>"+
													  "</div></div>";
									} else {
										formMarkup += "<div class=\"widget-inp-bl "+LGWGService.classNameInputItem(visualObjNewPopup.formSet.items[f], visualObjNewPopup.form.orient)+"\" style=\"width:"+visualObjNewPopup.form.widthpx+"px\">"+
													  "<div class=\"text-input-class "+LGWGService.classNameFormInputMask(visualObjNewPopup.formSet.items[f].type, visualObjNewPopup.formSet.phoneMask)+"\">"+
														"<input id=\"elementid"+visualObjNewPopup.formSet.items[f].type+"\" type=\"text\" class=\"form-control form-widget-cntrl form-control-new-dot form-label-for-change form-cntrl-"+visualObjNewPopup.formSet.items[f].type+" form-req-"+visualObjNewPopup.formSet.items[f].required+" "+LGWGService.isFormBorder(visualObjNewPopup.form)+"\" style=\"background:"+visualObjNewPopup.form.rgbaInputForm+";color:"+visualObjNewPopup.form.colorTitleInputForm+";border-radius:"+visualObjNewPopup.form.borderRadiusInputForm+"px;border-color:"+visualObjNewPopup.form.border.color+"\">"+
														"<label for=\"elementid"+visualObjNewPopup.formSet.items[f].type+"\" class=\"form-widget-cntrl-label\" style=\"color:"+visualObjNewPopup.form.colorTitleInputForm+"\">"+visualObjNewPopup.formSet.items[f].placeholder+"</label>"+
													  "</div></div>";
									}
								}
							}
							widgetDynamic += "<li id=\"liLGWGFormBtn\">"+
												"<div class=\"color-pod "+LGWGService.hrPosSelWholeForm(visualObjNewPopup.form)+"\">"+
													"<div class=\"form-whole-bl\" style=\"width:"+LGWGService.getWholeFormWidth(visualObjNewPopup.form)+"px\">"+
														"<div id=\"widgetFormBlockM\" class=\"widget1-form-bl "+LGWGService.hrPosSelForm(visualObjNewPopup.form)+"\">"+
															"<div>"+formMarkup+"</div>"+
														"</div>"+
														"<div><div class=\"widget1-btn-bl widget1-btn-bl-marg-min "+LGWGService.btnPosSel(visualObjNewPopup)+"\"><button id=\"btnFormSubLGWG\" class=\"click-edit-cl click-lgwg-dot-target button-send-form button-send "+LGWGService.btnStyleSel(visualObjNewPopup.button)+" "+LGWGService.btnWidthSel(visualObjNewPopup.button)+"\" style=\"font-size:"+visualObjNewPopup.button.fontSize+"px;font-family:"+visualObjNewPopup.button.font.fontFamily+";background:"+visualObjNewPopup.button.colorBtn+";border-color:"+visualObjNewPopup.button.colorBtn+"!important;color:"+visualObjNewPopup.button.colorTextBtn+";border-radius:"+visualObjNewPopup.button.borderRadiusBtn+"px;width:"+visualObjNewPopup.button.btn_widthpx+"px\"><div>"+visualObjNewPopup.button.textSummer+"</div></button></div></div>"+
													"</div>"+
												"</div>"+
											 "</li>";
						}
					}
				}
			}
			return widgetDynamic;
		}

		function fillIframeElement(item) {
			setTimeout(function() {
				var elementToRemove = document.getElementById("idFrame"+item.counter);

		        var ifrm = document.createElement("iframe");
		        ifrm.setAttribute("src", "about:blank");
		        ifrm.setAttribute("frameBorder", "0");
		        ifrm.setAttribute("id", "idFrame"+item.counter);
		        ifrm.setAttribute("style", "position:relative!important;width:100%!important;height:100%!important;border:none!important");
		        
		        document.getElementById("elementIframeBlock"+item.counter).replaceChild(ifrm, elementToRemove);

		        var doc = ifrm.contentWindow.document;
		        doc.open().write('<body>'+'<style>body{margin:0!important;}' + item.css_value + '</style>'+item.html_value+'</body>');
		        doc.close();
			}, 0);
		}

		createDomDH();

		function setVideoBG(bgSettings) {
			if (bgSettings.fillorImg === 'useVideo') {
				var LGWGWidgetBGContentLGWG = document.getElementById('widgetBGContentLGWG'+widgetLGWGNewPopupId);
				var LGWGWidgetThankBGContentLGWG = document.getElementById('widgetThankBGContentLGWG'+widgetLGWGNewPopupId);
				LGWGWidgetBGContentLGWG.classList.add("widget-transp-bg-imp");
				LGWGWidgetThankBGContentLGWG.classList.add("widget-transp-bg-imp");
				isBGVideo = true;
				var bgVideoTemplate,
					bgThankVideoTemplate;

				if (isMobile.any() && bgSettings.video && bgSettings.video.videoPreview) {
					bgVideoTemplate = "<div class=\"video-bg\"><div class=\"video-bg-preview "+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\" style=\"background-image:url("+bgSettings.video.videoPreview+")\"></div></div>";
					bgThankVideoTemplate = "<div class=\"video-bg\"><div class=\"video-bg-preview "+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\" style=\"background-image:url("+bgSettings.video.videoPreview+")\"></div></div>";
				} else {
					bgVideoTemplate = "<div class=\"video-bg\"><div class=\""+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\"><iframe id=\"videoBGIfrm"+widgetLGWGNewPopupId+"\" src=\"\" frameborder=\"0\" allowfullscreen></iframe></div></div>";
					bgThankVideoTemplate = "<div class=\"video-bg\"><div class=\""+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\"><iframe id=\"videoThankBGIfrm"+widgetLGWGNewPopupId+"\" src=\"\" frameborder=\"0\" allowfullscreen></iframe></div></div>";
				}
				
				LGWGWidgetBGContentLGWG.innerHTML = bgVideoTemplate;
				LGWGWidgetThankBGContentLGWG.innerHTML = bgThankVideoTemplate;
			}
		}

		function initBGVideo() {
			if(isBGVideo && !isMobile.any()) {
				var videoBGElement = document.getElementById('videoBGIfrm'+widgetLGWGNewPopupId);
				videoBGElement.src = visualObjNewPopup.bg.video.videoUrl;
			}
		}

		function initBGThankVideo() {
			if(isBGVideo && !isMobile.any()) {
				var videoThankBGElement = document.getElementById('videoThankBGIfrm'+widgetLGWGNewPopupId);
				videoThankBGElement.src = visualObjNewPopup.bg.video.videoUrl;
			}
		}

		function stopInitBgVideo() {
			if (isBGVideo && !isMobile.any()) {
				var videoBGElement = document.getElementById('videoBGIfrm'+widgetLGWGNewPopupId);
				var videoThankBGElement = document.getElementById('videoThankBGIfrm'+widgetLGWGNewPopupId);
				videoBGElement.src = visualObjNewPopup.bg.video.videoUrl;
				videoThankBGElement.src = visualObjNewPopup.bg.video.videoUrl;
				videoBGElement.removeAttribute("src");
				videoThankBGElement.removeAttribute("src");
			}
		}

		if (isVideo) {
			fillVideoArray();
		}

		function fillVideoArray() {
			videoPlayers = [];
			var videoArray = document.getElementsByClassName("video-element-ifrm");
			for (var i=0; i < videoArray.length; i++) {
		        videoPlayers.push(videoArray[i]);
		    }
		}

		function setAutoOrNotForVideo() {
			for (var i=0; i < videoPlayers.length; i++) {
				if (videoPlayers[i].getAttribute("data-auto") == "true") {
					var player = videoPlayers[i];
			        var iframeSrc = player.src;
			        if(iframeSrc.indexOf("?autoplay=1&rel=0")  > -1) {
			        	player.src = iframeSrc;	
			        } else {
			        	player.src = iframeSrc + "?autoplay=1&rel=0";	
			        }
				}
		    }
		}
		
		setVideoBG(visualObjNewPopup.bg);

		var LGmainBlockDot               = document.getElementById('mainBlockWidgetLGWGPop'+widgetLGWGNewPopupId);
		var LGWGWidgetAndCloseBlock      = document.getElementById('LGWGWidgetAndCloseBlockPop'+widgetLGWGNewPopupId);
		var dotCircleCl                  = document.getElementById('widgetVisualDotCircle'+widgetLGWGNewPopupId);
		var LGbtnFormSub                 = document.getElementById('btnFormSubLGWG');
		var LGVisualMainBlock            = document.getElementById('visualBlockWidgetLGWGPop'+widgetLGWGNewPopupId);
		var LGWGNewCloseBtn              = document.getElementById('LGWGNewCloseBtnPop'+widgetLGWGNewPopupId);
		var LGWGbtnExitLGWG              = document.getElementById('btnExitLGWGPop');
		var LGWGbtnExitButtonLGWG        = document.getElementById('btnExitButtonLGWG');
		var LGWGNewDotformBlock          = document.getElementById('widgetFormBlockM');
		var LGWGNewDotButtonBlock        = document.getElementById('widgetButtonBlockM');
		var LGWGNewDotFormExtBlock       = document.getElementById('widgetFormExtBlockM');
		var LGWGNewDotThankBlock         = document.getElementById('thankBlockPopLGWG'+widgetLGWGNewPopupId);
		var LGWGNewDotBanner             = document.getElementById('clickBannerLGWGPop'+widgetLGWGNewPopupId);
		var LGWGNewColorPod           = document.getElementById('colorFormPod');
		var LGWGNewBlockLinkF            = document.getElementById('lgwgBlockLinkFPop'+widgetLGWGNewPopupId);
		var LGWGNewPopBtnF               = document.getElementById('lgwgnewPopBtnF'+widgetLGWGNewPopupId);
		var LGWGNewDotWidgetImage      = document.getElementById('widgetImageLGWG');
		var LGWGNewDotWidgetMainWr     = document.getElementById('widgetMainWr');
		var LGWGNewDotWidgetThankWr    = document.getElementById('widgetThankWr');
		var LGWGNewDotFill1            = window.top.document.getElementById('lgwgW2DotCircleFill1');
		var LGWGNewDotFill2            = window.top.document.getElementById('lgwgW2DotCircleFill2');
		var LGWGLiFormBtn              = document.getElementById('liLGWGFormBtn');
		var LGWGSocialBlockAction      = document.getElementById('socialBlockAction');
		var LGWGlLabelLine             = window.top.document.getElementById('widgetVisualLabel'+widgetLGWGNewPopupId);
		var hideLabelMobileButton      = window.top.document.getElementById('hideLabelMobileButton'+widgetLGWGNewPopupId);

		var widgetMaskWholeLGWG        = document.getElementById('widgetMaskWholeLGWG'+widgetLGWGNewPopupId);
		var widgetThankMaskWholeLGWG   = document.getElementById('widgetThankMaskWholeLGWG'+widgetLGWGNewPopupId);
		var widgetMaskContentLGWG      = document.getElementById('widgetMaskContentLGWG'+widgetLGWGNewPopupId);

		var LGWGNewDotThankAdvBlock    = document.getElementById('thankBlockPopAdvLGWG'+widgetLGWGNewPopupId);
		var LGWGNewDotThankAdvBlockIn  = document.getElementById('thankBlockPopInAdvLGWG'+widgetLGWGNewPopupId);
		var thankBtnOnAdv              = document.getElementById('thank-btn-on-adv'+widgetLGWGNewPopupId);
		var thankCloseBtnAdv           = document.getElementById('thank-close-btn-adv'+widgetLGWGNewPopupId);

		//FORM EXT
		var formExtWR = document.getElementById('liLGWGFormExt');

		var LGWGIframeLabelDiv = window.top.document.getElementById("lgwgDivIframeLabel");
		var LGWGLineLabelDiv = window.top.document.getElementById('visualBlockWidgetLGWGPop'+widgetLGWGNewPopupId);
		var mainBodyElement = window.top.document.getElementsByTagName("body")[0];
		var mainHTMLElement = window.top.document.getElementsByTagName("html")[0];
		var bodyElement = document.getElementsByTagName("body")[0];
		var LGWGNewPulseCBDetect = false;

		var ratings = document.getElementsByClassName('rating-container-in');
		LGWGService.ratingInitProcess(ratings);

		var datePickers = document.getElementsByClassName('w-datepicker-input');
		LGWGService.datePickerInitProcess(datePickers, LGWGIframeLabelDiv, widgetLGWGNewPopupId, window, 'float');

		var dropDowners = document.getElementsByClassName('w-dropdown-input');
		LGWGService.dropDownInitProcess(dropDowners, LGWGIframeLabelDiv, visualObjNewPopup, widgetLGWGNewPopupId, window, 'float');

		dotCircleWidgetStyle();
		if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
			startAdaptiveIfNeed();
		} else {
			var widgetImageLGWG  = document.getElementById('widgetImageLGWG');
			var widgetMainWRLGWG = document.getElementById('widgetMainWr');
			var colorPodLGWG     = document.getElementById('colorPod');
			LGWGService.imageStyle(visualObjNewPopup, LGWGLiFormBtn, formExtWR, LGWGNewColorPod, widgetImageLGWG, widgetMainWRLGWG, colorPodLGWG, isVideo, fillVideoArray);

			if (navigator.userAgent.match(/Edge/i)) {
				document.getElementsByTagName("html")[0].style.overflow = "hidden";
			}
		}


		function startAdaptiveIfNeed() {
			setTimeout(function() {
				if (visualObjNewPopup.dhVisual.widget_content_height === LeadCore.constants.ownValue) {
					var amountHeightOfElements = 0;
					var contentElementsLi = document.querySelectorAll('ul li');
					for (var i = 0; i < contentElementsLi.length; i++) {
					    amountHeightOfElements += contentElementsLi[i].offsetHeight;
				  	}
				  	if (amountHeightOfElements > ((visualObjNewPopup.dhVisual.widget_content_heightpx*1)-60).toString()) {
				  		LGWGNewDotWidgetMainWr.classList.add("height-auto-elements-content");
				  	}
				}
			}, 1000);
			
			if(window.top.document.documentElement.clientWidth != window.top.screen.availWidth) {
				var zoomValue = window.top.document.documentElement.clientWidth/window.top.screen.availWidth;
				var LGWGLabelLineInDiv = window.top.document.getElementById("lgwgLabelLineIn"+widgetLGWGNewPopupId);
				
				LGWGLabelLineInDiv.style.zoom = zoomValue;
				hideLabelMobileButton.style.zoom = zoomValue;

				LGmainBlockDot.style.zoom = zoomValue;
				LGWGNewBlockLinkF.style.zoom = zoomValue;
				LGWGNewDotThankBlock.style.zoom = zoomValue;
				LGWGNewCloseBtn.style.zoom = zoomValue;
			}
		}

		/*************************************************************************
		 *Relocation function
		 */
		function relocateIfOn(data) {
			WidgetDotOffandNoShowThank();
			if (visualObjNewPopup.formSet.redirect.blank) {
				window.top.window.open(LGWGService.redirectParams(data, visualObjNewPopup.formSet.redirect.url), '_blank');
				return false;
			} else {
				window.top.window.location = LGWGService.redirectParams(data, visualObjNewPopup.formSet.redirect.url);
				return false;
			}
		}

		/*************************************************************************
		 *Appear widget dot
		 */
		function appearWidgetPop () {
			var needClass = widgetDetectNeedClass();
			bodyElement.classList.add('once-to-set-s');
			setTimeout(function() {
				bodyElement.classList.remove('once-to-set-s');
			}, 50);
			setTimeout(function() {
				LGVisualMainBlock.style.removeProperty('opacity');
				LGVisualMainBlock.classList.remove('lgwg-op-hid-st');
			}, 100);

			setTimeout(function() {
				LGWGLineLabelDiv.classList.remove(needClass);
			}, 900);
		}

		function loadShowTargetWidgets() {
			if (typeof jsInfo.onShowScript !== "undefined") {
				if (jsInfo.onShowScript.enable) {
					LeadCoreExt.getWidgetScript(jsInfo.onShowScript.link).then(function(response) {
						onShowScript = LeadCoreExt.parseWidgetScript(response);
						LeadCoreExt.buildWidgetScript(onShowScript);
					});
				}
				if (jsInfo.onTargetScript.enable) {
					LeadCoreExt.getWidgetScript(jsInfo.onTargetScript.link).then(function(response) {
						onTargetScript = LeadCoreExt.parseWidgetScript(response);
						initCouponClick();
					});
				}
			}
		}

		/*************************************************************************
		 *Widget Dot On
		 */
		function WidgetDotOn () {
			initAllTimerCountdowns();
			if (onShowScript) {
				LeadCoreExt.buildWidgetScript(onShowScript);
			} else {
				loadShowTargetWidgets();
			}

			openWidgetDetect = true;
			if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
		
			} else {
				var widgetImageLGWG  = document.getElementById('widgetImageLGWG');
				LGWGService.setImageHeight(visualObjNewPopup, widgetImageLGWG, LGWGNewDotformBlock, LGWGNewDotButtonBlock, LGWGNewDotFormExtBlock);
				getTopOfColorPod();
			}
			setMaskStyles();
			setAutoOrNotForVideo();
			initBGVideo();
			
			LGWGNewCloseBtn.classList.remove('lgwg-op-hid-imp');
			var needClass = widgetDetectNeedClass();
			LGWGLineLabelDiv.classList.add(needClass);
			LGWGIframeLabelDiv.classList.remove(needClass);
			window.top.LeadCore.isWidgetActive.push("active");
			LGWGIframeLabelDiv.classList.add('active');
			LeadCore.pushTargetAction(0, widgetLGWGNewPopupId);

			if (typeof jsInfo.onTargetScript === "undefined" || (typeof jsInfo.onTargetScript !== "undefined" && !jsInfo.onTargetScript.enable)) {
				initCouponClick();
			}

			if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
				pageY = window.top.pageYOffset;
				pageX = window.top.pageXOffset;
				mobileOpen = true;
				
				mainHTMLElement.classList.add('mobile-lgwg-active-w');
			}

			//Set unique lock
			if (restrNewPopup.unique && restrNewPopup.unique.enable) {
				LeadCore.setCookie('newLabelLGWGCloseLock'+idForSetUniqueLock, LeadCore.siteId, (restrNewPopup.unique.gap / 24));
			}

			//Set count shows lock
			if (restrNewPopup.count && restrNewPopup.count.enable) {
				var counterShowsWidget = (LeadCore.getCookie('newLabelLGWGCountShowsCloseLock'+idForSetUniqueLock).length != 0) ? ((parseInt(LeadCore.getCookie('newLabelLGWGCountShowsCloseLock'+idForSetUniqueLock), 10)) + 1) : 1;
				LeadCore.setCookie('newLabelLGWGCountShowsCloseLock'+idForSetUniqueLock, counterShowsWidget, 360);
				LeadCore.setCookie('newLabelLGWGCountTimeCloseLock'+idForSetUniqueLock, LeadCore.siteId, LeadCore.setCorrectIntervalForCookie(restrNewPopup.count.unit, restrNewPopup.count.interval));
			}
			setTimeout(function() {
				document.body.classList.add('dot-hunter-open-more-z');
			}, 750);
		}

		function getTopOfColorPod() {
			LGWGNewColorPod.style.top = LGWGService.getTopValueOfColorPod(LGWGNewDotformBlock, LGWGNewDotButtonBlock, visualObjNewPopup, LGWGNewDotFormExtBlock) + "px";
		}

	 	function setMaskStyles() {
	 		if ((visualObjNewPopup.bg.fillorImg !== 'fill') && visualObjNewPopup.bg.mask && visualObjNewPopup.bg.mask.enable) {
	 			if (visualObjNewPopup.bg.mask.area === LeadCore.constants.fullWidgetArea) {
	 				widgetMaskWholeLGWG.classList.remove("lgwg-none");
	 				widgetMaskWholeLGWG.style.background = visualObjNewPopup.bg.mask.rgbaColor;
	 			} else if (visualObjNewPopup.bg.mask.area === LeadCore.constants.onlyContentWidgetArea || visualObjNewPopup.bg.mask.area === LeadCore.constants.onlyContentWidgetAreaUnder) {
	 				widgetMaskContentLGWG.classList.remove("lgwg-none");
	 				widgetMaskContentLGWG.style.background = visualObjNewPopup.bg.mask.rgbaColor;
	 				if (visualObjNewPopup.image.enable) {
	 					if (visualObjNewPopup.image.place === LeadCore.constants.fromLeft) {
	 						widgetMaskContentLGWG.style.left = "-3px";
	 					}
	 					if (visualObjNewPopup.image.place === LeadCore.constants.fromRight) {
	 						widgetMaskContentLGWG.style.right = "-3px";
	 					}
	 				}
	 			}

	 			widgetThankMaskWholeLGWG.classList.remove("lgwg-none");
				widgetThankMaskWholeLGWG.style.background = visualObjNewPopup.bg.mask.rgbaColor;
	 		}
	 	}

		/*************************************************************************
		 *Widget Dot Off
		 */
		function WidgetDotOff() {
			document.body.classList.remove('dot-hunter-open-more-z');
			if (mobileOpen) {
				mainHTMLElement.classList.remove('mobile-lgwg-active-w');
				mobileOpen = false;
			}

			openWidgetDetect = false;
			var needClass = widgetDetectNeedClass();
			LGWGLineLabelDiv.classList.remove(needClass);
			LGWGIframeLabelDiv.classList.add(needClass);
			LGWGIframeLabelDiv.classList.remove('active');

			//loop through each Youtube player instance and call stopVideo()
			setTimeout(function() {
			    for (var i in videoPlayers) {
			        var player = videoPlayers[i];
			        var iframeSrc = player.src;
		        	player.src = iframeSrc.replace('?autoplay=1&rel=0', '');
			    }
			    stopInitBgVideo();
		    }, 1000);

		    window.top.LeadCore.isWidgetActive.pop();

			visualObjNewPopup.elementsList.forEach(function(item) {
	        	if (item.name !== "timer-element") {
	        		return;
	        	}
	        	const timerIDS = "LGWG_timer_" + item.id + item.counter;
	        	const loopIDS = "LGWG_loop_" + item.id + item.counter;

				window.clearInterval(window[timerIDS]);
				window.clearInterval(window[loopIDS]);
	        });     
		}

		var thankTInterval = 5000;
		var thankBlockToOpen = LGWGNewDotThankBlock;
		
		// Issue #1260, commented for testing
		// if (typeof LeadCore.smartParams !== "undefined") {
		// 	if (!LeadCore.smartParams.logo) {
		// 		thankTInterval = 15000;
		// 		thankBlockToOpen = LGWGNewDotThankAdvBlock;
		// 	}
		// }

		/*************************************************************************
		 *Widget Dot off and show Thank
		 */
		function WidgetDotOffandShowThank() {
			openWidgetDetect = false;

			thankBlockToOpen.classList.remove('lgwg-none');
			thankBlockToOpen.classList.remove('lgwg-op-hid');

			LGmainBlockDot.classList.add('lgwg-op-hid');
			LGWGNewCloseBtn.classList.add('lgwg-none-imp');

			initBGThankVideo();

			thankShowTimeout = setTimeout(function() {
				WidgetDotOff();
				closeThankCallback();
			}, thankTInterval);
		}

		thankBtnOnAdv.addEventListener(lgwgClickEvent, function() {
			clearTimeout(thankShowTimeout);
			WidgetDotOff();
			closeThankCallback();
			event.stopPropagation();
		});

		thankCloseBtnAdv.addEventListener(lgwgClickEvent, function() {
			clearTimeout(thankShowTimeout);
			WidgetDotOff();
			closeThankCallback();
			event.stopPropagation();
			event.preventDefault();
		});

		function closeThankCallback() {
			setTimeout(function() {
				thankBlockToOpen.classList.add('lgwg-none');
				thankBlockToOpen.classList.add('lgwg-op-hid');

				LGmainBlockDot.classList.remove('lgwg-op-hid');
				LGWGNewCloseBtn.classList.remove('lgwg-none-imp');
			}, 300);
		}

		/*************************************************************************
		 *Widget Dot off and show Thank
		 */
		function WidgetDotOffandNoShowThank() {
			WidgetDotOff();
		}

		function initThankBlockSize() {
			var WIDTH_LEVEL = 390;
			var HEIGHT_LEVEL = 245;
			
			if (visualObjNewPopup.dhVisual.widget_width_nopx < WIDTH_LEVEL && visualObjNewPopup.dhVisual.widget_height_nopx < HEIGHT_LEVEL) {
				var scaleWSizeThank = visualObjNewPopup.dhVisual.widget_width_nopx / WIDTH_LEVEL;
				var scaleHSizeThank = visualObjNewPopup.dhVisual.widget_height_nopx / HEIGHT_LEVEL;
				var deltaWH = Math.abs((scaleWSizeThank - scaleHSizeThank) * 100);
				LGWGNewDotThankAdvBlockIn.classList.add("need-to-scale-thank-by-width-and-height");
				if (scaleHSizeThank < scaleWSizeThank) {
					LGWGNewDotThankAdvBlockIn.style.transformOrigin = deltaWH + "% 0";
					LGWGNewDotThankAdvBlockIn.style.transform = "scale(" + scaleHSizeThank + ")";
				} else {
					LGWGNewDotThankAdvBlockIn.style.transformOrigin = "0 " + deltaWH + "%";
					LGWGNewDotThankAdvBlockIn.style.transform = "scale(" + scaleWSizeThank + ")";
				}
				return;
			}
			
			if (visualObjNewPopup.dhVisual.widget_width_nopx < WIDTH_LEVEL) {
				var scaleSizeThank = visualObjNewPopup.dhVisual.widget_width_nopx / WIDTH_LEVEL;
				LGWGNewDotThankAdvBlockIn.classList.add("need-to-scale-thank-by-width");
				LGWGNewDotThankAdvBlockIn.style.transform = "scale(" + scaleSizeThank + ")";

			} else if (visualObjNewPopup.dhVisual.widget_height_nopx < HEIGHT_LEVEL) {
				var scaleSizeThank = visualObjNewPopup.dhVisual.widget_height_nopx / HEIGHT_LEVEL;
				LGWGNewDotThankAdvBlockIn.classList.add("need-to-scale-thank-by-height");
				LGWGNewDotThankAdvBlockIn.style.transform = "scale(" + scaleSizeThank + ")";
			}
		}

		/*************************************************************************
		 *Widget class for position
		 */
		function widgetDetectNeedClass() {
			if ((window.top.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
				return "lgwg-label-start-position-mobile-only";
			} else {
				if (visualObjNewPopup.labelMain.place === LeadCore.constants.bottomLeftCorner) {
					return "lgwg-label-start-position-lb";
				}
				else if (visualObjNewPopup.labelMain.place === LeadCore.constants.bottomRightCorner) {
					return "lgwg-label-start-position-rb";
				}
				else if (visualObjNewPopup.labelMain.place === LeadCore.constants.leftBrowserSide) {
					return "lgwg-label-start-position-lm";
				}
				else if (visualObjNewPopup.labelMain.place === LeadCore.constants.rightBrowserSide) {
					return "lgwg-label-start-position-rm";
				}
			}
		}

		/*************************************************************************
		 *Coupon Click
		 */
		function initCouponClick() {
			if (isInitCouponClick) return;

			var LGWGCouponWrappers = document.querySelectorAll(".element-coupon-wr");

			var couponElements = visualObjNewPopup.elementsList.filter(function(el) {
	        	return el.name === "coupon-element";
	        });

			var dParams = {
				base: LeadCore.base,
				visitId: LeadCore.currentVisitId,
				siteId: LeadCore.siteId
			};

			var couponCopyAction = {
				isCouponCopyAction: null,
				couponElements: couponElements,
				metrikaId: metrikaId,
				onTargetScript: onTargetScript
			};

			isInitCouponClick = true;
			LeadCoreExt.initCouponClickOperation(LGWGCouponWrappers, lgwgClickEvent, dParams, couponCopyAction);
		}

		/*************************************************************************
		 *Timer Countdown
		 */
	    var LG_TIMER = {
		    initializeClock: function(item, widgetDOC) {
				const timerId = item.ids;
				const timerCounter = item.counter;
				const cDate = new Date();
				let currentTime;
				let endtime;
				let isLoop = false;
				let onInit = true;
				let currentTimeZoneOffsetInMS = 0;

				const daysWR    = widgetDOC.getElementById(timerId + "_" + timerCounter + "_days");
				const hoursWR   = widgetDOC.getElementById(timerId + "_" + timerCounter + "_hours");
				const minutesWR = widgetDOC.getElementById(timerId + "_" + timerCounter + "_mins");
				const secondsWR = widgetDOC.getElementById(timerId + "_" + timerCounter + "_secs");

				const daysSpans    = daysWR.querySelectorAll("span");
				const hoursSpans   = hoursWR.querySelectorAll("span");
				const minutesSpans = minutesWR.querySelectorAll("span");
				const secondsSpans = secondsWR.querySelectorAll("span");

				daysSpans[0].innerHTML = '0';
				daysSpans[1].innerHTML = '0';

				hoursSpans[0].innerHTML = '0';
				hoursSpans[1].innerHTML = '0';

				minutesSpans[0].innerHTML = '0';
				minutesSpans[1].innerHTML = '0';

				secondsSpans[0].innerHTML = '0';
				secondsSpans[1].innerHTML = '0';

				if (item.type.type === 0) {
					const dDate = new Date(item.date);
					currentTime = cDate;
					endtime = dDate;
					currentTimeZoneOffsetInMS = item.timezoneType === 'gmt' ? (cDate.getTimezoneOffset() * 60000) : 0;
				} else {
					currentTime = cDate;
					const countMS = LGWGService.getCountDownMS(item.type1Model);
					const cookieName = "LGWG_" + item.id;
					const timerCookieType1 = LeadCore.getCookie(cookieName);
					
					if (timerCookieType1.length) {
						const currentMS = Date.parse(cDate);
						const currentParsed = countMS - (currentMS - Date.parse(timerCookieType1));
						if (currentParsed < 0 && item.loop.enable) {
							if (onInit) {
								LGWGService.showHideDigits(item.design.nullData, daysWR, hoursWR, minutesWR);
							}
							this.initLoopTimer(item, widgetDOC, timerCallback);
							return;
						}
						endtime = new Date(currentMS + currentParsed);
					} else {
						LeadCore.setCookie(cookieName, cDate, 365);
						endtime = new Date(Date.now() + countMS);
					}
				}

				const diffTime = endtime.getTime() - currentTime.getTime() - currentTimeZoneOffsetInMS;
				
				if (diffTime < 0) {
					LGWGService.showHideDigits(item.design.nullData, daysWR);
					return;
				}

				function updateClock() {
					const offsetTZ = LGWGService.isGMT(item) ? ((new Date().getTimezoneOffset()) * 60000) : 0;
					const t = LGWGService.getTimeRemaining(endtime, offsetTZ);
					
					if (onInit) {
						if (!item.design.nullData.d && t.days === 0) {
							daysWR.classList.add("hide-current-type");
						}
						if (!item.design.nullData.h && t.hours === 0) {
							hoursWR.classList.add("hide-current-type");
						}
						if (!item.design.nullData.m && t.minutes === 0) {
							minutesWR.classList.add("hide-current-type");
						}
					}
					onInit = false;

					if (t.total <= 0) {
		      			window.clearInterval(window["LGWG_timer_" + item.id + item.counter]);
		      			timerCallback(item);
		      			return;
				    }
					
					daysSpans[0].innerHTML = LGWGService.prepareItemTime(t.days)[0];
					daysSpans[1].innerHTML = LGWGService.prepareItemTime(t.days)[1];

					hoursSpans[0].innerHTML = LGWGService.prepareItemTime(t.hours)[0];
					hoursSpans[1].innerHTML = LGWGService.prepareItemTime(t.hours)[1];

					minutesSpans[0].innerHTML = LGWGService.prepareItemTime(t.minutes)[0];
					minutesSpans[1].innerHTML = LGWGService.prepareItemTime(t.minutes)[1];

					secondsSpans[0].innerHTML = LGWGService.prepareItemTime(t.seconds)[0];
					secondsSpans[1].innerHTML = LGWGService.prepareItemTime(t.seconds)[1];
			  	}
			  	updateClock();
				
				window["LGWG_timer_" + item.id + item.counter] = setInterval(updateClock, 1000);
			},
			initLoopTimer: function(item, widgetDOC, timerCallback) {
		    	let endtime;
		    	const countMS = LGWGService.getCountDownMS(item.type1Model);
				const cookieName = "LGWG_" + item.id;
				const timerCookieType1 = LeadCore.getCookie(cookieName);
				
				if (timerCookieType1.length) {
					const currentMS = Date.parse(new Date());
					const currentParsed = countMS - (currentMS - Date.parse(timerCookieType1));
					const loopMS = LGWGService.getCountDownMS(item.loop.model);
					
					endtime = new Date(currentMS + currentParsed + loopMS);

					const diffTime = endtime.getTime() - currentMS;
					
					if (diffTime < 0) {
						window.clearInterval(window["LGWG_loop_" + item.id + item.counter]);
		      			
		      			LeadCore.removeCookie(cookieName);
		      			LG_TIMER.initializeClock(item, widgetDOC);
		      			return;
					}
				} else {
					return;
				}

		    	function updateLoopClock() {
					const t = LGWGService.getTimeRemaining(endtime, 0);
					
					if (t.total <= 0) {
		      			window.clearInterval(window["LGWG_loop_" + item.id + item.counter]);
		      			LeadCore.removeCookie(cookieName);
		      			LG_TIMER.initializeClock(item, widgetDOC);
				    }
			  	}
			  	
				window["LGWG_loop_" + item.id + item.counter] = setInterval(updateLoopClock, 1000);
		    }
	    }

	    function initAllTimerCountdowns() {
	        visualObjNewPopup.elementsList.forEach(function(item) {
	        	if (item.name !== "timer-element") {
	        		return;
	        	}

				LG_TIMER.initializeClock(item, document);
	        });
		}

	    function timerCallback(item) {
	    	if (item.loop.enable) {
	    		LG_TIMER.initLoopTimer(item, document);
	    	}
	    	if (item.expType.type === 0) {
	    		return;
	    	} else if (item.expType.type === 1) {
	    		window.top.window.location = LGWGService.redirectParams(null, item.expUrl);
	    	} else if (item.expType.type === 2) {
	    		WidgetDotOff();
	    	}
	    }

		/*************************************************************************
		 *Dot circle and main set widget Block
		 */
		function dotCircleWidgetStyle () {
			
			//Placement for widget
			if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
				if ((visualObjNewPopup.labelMain.place === LeadCore.constants.bottomLeftCorner) || (visualObjNewPopup.labelMain.place === LeadCore.constants.leftBrowserSide)) {
					LGVisualMainBlock.classList.add('wv-b-bottom-left-pop');
				}
				if ((visualObjNewPopup.labelMain.place === LeadCore.constants.bottomRightCorner) || (visualObjNewPopup.labelMain.place === LeadCore.constants.rightBrowserSide)) {
					LGVisualMainBlock.classList.add('wv-b-bottom-right-pop');
				}
			} else {
				if (visualObjNewPopup.labelMain.place === LeadCore.constants.bottomLeftCorner) {
					LGVisualMainBlock.classList.add('wv-b-bottom-left-pop');
				}
				if (visualObjNewPopup.labelMain.place === LeadCore.constants.bottomRightCorner) {
					LGVisualMainBlock.classList.add('wv-b-bottom-right-pop');
				}
				if (visualObjNewPopup.labelMain.place === LeadCore.constants.leftBrowserSide) {
					LGVisualMainBlock.classList.add('wv-b-mid-left-pop');
				}
				if (visualObjNewPopup.labelMain.place === LeadCore.constants.rightBrowserSide) {
					LGVisualMainBlock.classList.add('wv-b-mid-right-pop');
				}
			}

			//Use img for widget or set colorBg
			if (visualObjNewPopup.bg.fillorImg === 'useImg') {
				LGmainBlockDot.classList.add('block-widget-bg');
				LGWGNewDotThankBlock.classList.add('block-widget-bg');
				if(!visualObjNewPopup.bg.bgStyle) {
					LGmainBlockDot.style.background = "url('" + visualObjNewPopup.bg.url + "') center center / cover no-repeat";
					LGWGNewDotThankBlock.style.background = "url('" + visualObjNewPopup.bg.url + "') center center / cover no-repeat";
				}
			}


			/********************************************************************
			 *Open or hide widget
			 */

			//Hide just a label
			if (hideLabelMobileButton) {
				hideLabelMobileButton.addEventListener(lgwgClickEvent, function(event) {
			    	event.stopPropagation();
				    LGWGLineLabelDiv.classList.add("label-just-hide-on-mobile");
				});
			}

			LGWGlLabelLine.addEventListener(lgwgClickEvent, function() {
			    WidgetDotOn();
			});

			LGWGNewCloseBtn.addEventListener(lgwgClickEvent, function() {
				this.classList.add('lgwg-op-hid-imp');
				WidgetDotOff();
				event.stopPropagation();
				event.preventDefault();
			});

			if (LGWGbtnExitLGWG) {
				LGWGNewCloseBtn.classList.add("lgwg-none-imp-forever");
				LGWGbtnExitLGWG.addEventListener('click', function(event) {
					WidgetDotOff();
					event.stopPropagation();
					LeadCoreExt.openCouponCallback(widgetLGWGNewPopupId, visualObjNewPopup.exit, "exit", null, metrikaId, onTargetScript);
				});
			}

			if (LGWGbtnExitButtonLGWG) {
				LGWGNewCloseBtn.classList.add("lgwg-none-imp-forever");
				LGWGbtnExitButtonLGWG.addEventListener('click', function(event) {
					WidgetDotOff();
					event.stopPropagation();
					LeadCoreExt.openCouponCallback(widgetLGWGNewPopupId, visualObjNewPopup.exit, "exit", null, metrikaId, onTargetScript);
				});
			}

			if (typeof LeadCore.smartParams !== "undefined") {
				var urlDot;
				if (LeadCore.smartParams.logo) {
					LGWGNewBlockLinkF.classList.add('lgwg-none-imp');
				}
				else {
					LGVisualMainBlock.classList.add('lgwg-link-act');
					urlDot = "https://leadgenic.ru/welcome/?utm_source="+document.domain+"&utm_campaign=widget_label";
					LGWGNewPopBtnF.setAttribute("href", urlDot);
					if (LeadCore.smartParams.refLink) {
						urlDot = "https://leadgenic.ru/welcome?refid="+LeadCore.smartParams.refId+"&utm_source="+document.domain+"&utm_campaign=widget_label";
						LGWGNewPopBtnF.setAttribute("href", urlDot);
					}
				}
			}
			else {
				LGWGNewBlockLinkF.classList.add('lgwg-none-imp');
			}

		}

		/*************************************************************************
		 *Detect input for labels
		 */
		if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
			if (visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable) {
				detectInputForLabels(true);
			}
		} else {
			if (visualObjNewPopup.form.enable || (visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable)) {
				detectInputForLabels(visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable);
			}
		}
		
		function detectInputForLabels(isFormExt) {
			var inputsForLabel = isFormExt ? LGWGNewDotFormExtBlock.querySelectorAll('.form-label-for-change') : LGWGNewDotformBlock.querySelectorAll('.form-label-for-change');

			for (var i = 0; i < inputsForLabel.length; i++) {
				var inputsArrForLabel = inputsForLabel[i];
				inputsArrForLabel.addEventListener('change', function() {
					if (this.value !== '') {
						this.classList.add('filled');
					} else {
						this.classList.remove('filled');
					}
				});
			}
		}

		/*************************************************************************
		 *Detect input
		 */
		if (visualObjNewPopup.form.enable) {
			(function () {
				var inputsF = LGWGNewDotformBlock.querySelectorAll('.form-control-new-dot');

				for (var i = 0; i < inputsF.length; i++) {
					var inputsArrF = inputsF[i];

					if (inputsArrF.classList.contains('form-cntrl-phone')) {

						if (visualObjNewPopup.formSet.phoneMask && visualObjNewPopup.formSet.phoneMask.enable) {
							new window.top.phoneMaskFieldClass(inputsArrF, visualObjNewPopup.formSet.phoneMask.maskValue.replace(/\*/g,'_'));
						} else {
							inputsArrF.addEventListener('focus', function() {
								this.classList.remove('form-control-error');
								this.onkeypress = function(e) {
									if (e.keyCode == 8) {
										return true;
									}
									return !(/[^+0-9---() ]/.test(String.fromCharCode(e.charCode)));
								}
							});
						}
					}
					else {
						inputsArrF.addEventListener('focus', function() {
							this.classList.remove('form-control-error');
						});
					}
				} 
			})();

			/*************************************************************************
			 *Click send button
			 */
			(function () {
				var inputs = LGWGNewDotformBlock.querySelectorAll('.form-control-new-dot');
				LGbtnFormSub.addEventListener('click', function() {
					var btn = this;
					var paramsToSend = {
						title: "Заявка с сайта (" + widgetLGWGNewPopupName + ")",
						pageTitle: docTitle,
						widgetId: widgetLGWGNewPopupId
					};
					var hasError = false;
					var sendValue = '';
					for (var i = 0; i < inputs.length; i++) {
						var inputsArr = inputs[i];
						inputsArr.classList.remove('form-control-error');
						if (visualObjNewPopup.form.enable) {
							//Valip Phone input
							if (inputsArr.classList.contains('form-cntrl-phone')) {
								if (inputsArr.classList.contains('form-req-true') || inputsArr.value !== '') {
									paramsToSend.phone = LGWGService.validPhoneInputAuto(inputsArr);
								}
							}

							//Valid Email input
							if (inputsArr.classList.contains('form-cntrl-email')) {
								if (inputsArr.classList.contains('form-req-true') || inputsArr.value !== '') {
									paramsToSend.email = LGWGService.validEmailInputAuto(inputsArr);
								}
							}

							//Valid Message input
							if (inputsArr.classList.contains('form-cntrl-message')) {
								paramsToSend.comment = inputsArr.classList.contains('form-req-true') ? LGWGService.validNMInputAuto(inputsArr) : LGWGService.validNMNInputAuto(inputsArr);
							}

							//Valid Name input
							if (inputsArr.classList.contains('form-cntrl-name')) {
								paramsToSend.firstName = inputsArr.classList.contains('form-req-true') ? LGWGService.validNMInputAuto(inputsArr) : LGWGService.validNMNInputAuto(inputsArr);
							}

							if (inputsArr.classList.contains('form-control-error')) {
								hasError = true;
							}
						}
					}

					if (!hasError) {
						var serviceData = {
							onTargetScript: onTargetScript,
							jsInfo: jsInfo,
							metrikaId: metrikaId,
							widgetLGWGNewPopupId: widgetLGWGNewPopupId,
							widgetObj: visualObjNewPopup,
							WidgetDotOffandNoShowThank: WidgetDotOffandNoShowThank,
							WidgetDotOffandShowThank: WidgetDotOffandShowThank
						};
						if (visualObjNewPopup.formSet.redirect.enable) {
							serviceData.redirectData = {
								blank: visualObjNewPopup.formSet.redirect.blank,
								url: visualObjNewPopup.formSet.redirect.url
							};
						}
						LGWGService.sendRequestForm(paramsToSend, serviceData, "form", btn);
					}

				});
			})();
		}

		/*************************************************************************
		 *FORM EXT Detect input
		 */
		if (visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable) {
			var formExtInputFields = formExtWR.querySelectorAll('.form-ext-input-field');
			var formExtFields = formExtWR.querySelectorAll('.form-ext-field');
			var formExtButtons = formExtWR.querySelectorAll('.form-ext-button');
			var formExtSendFormOnAction = formExtWR.querySelectorAll('.form-ext-send-form-on-action-true');

			(function () {
				for (var i = 0; i < formExtInputFields.length; i++) {
					var inputs = formExtInputFields[i];

					if (inputs.classList.contains('form-cntrl-phone')) {
						var phoneInputModel = visualObjNewPopup.formExt.model.list.filter(function(item) {return item.type === 'phone'});

						if (phoneInputModel.length && phoneInputModel[0].mask && phoneInputModel[0].mask.enable) {
							new window.top.phoneMaskFieldClass(inputs, phoneInputModel[0].mask.value.replace(/\*/g,'_'));
						} else {
							inputs.addEventListener('focus', function() {
								this.classList.remove('form-control-error');
								this.closest('.form-ext-field').classList.remove('form-control-error');
								this.onkeypress = function(e) {
									if (e.keyCode == 8) {
										return true;
									}
									return !(/[^+0-9---() ]/.test(String.fromCharCode(e.charCode)));
								}
							});
						}
					}
					else {
						inputs.addEventListener('focus', function() {
							this.classList.remove('form-control-error');
							this.closest('.form-ext-field').classList.remove('form-control-error');
						});
					}
				} 
			})();

			(function () {
				if (!formExtSendFormOnAction.length) {
					return;
				}
				formExtSendFormOnAction.forEach(function(item) {
					//Rating action
					if (item.classList.contains('form-ext-type-rating')) {
						var ratingInput = item.querySelector('.rating-container-in');

						ratingInput.addEventListener('click', function() {
							item.classList.remove('form-control-error');
							sendForm(null);
						});
					}

					//Variants action
					if (item.classList.contains('form-ext-type-variants')) {
						var checkBoxInputs = item.querySelector('.form-ext-checkbox-wrapper');
						checkBoxInputs.addEventListener('click', function(e) {
							if (e.target && e.target.checked) {
								sendForm(null);
							}
						});
					}

					//DD action
					if (item.classList.contains('form-ext-type-dd')) {
						var ddInput = item.querySelector('.form-control');

						ddInput.addEventListener('change', function(e) {
							setTimeout(function() {
								if (e.target.value) {
									sendForm(null);
								}
							}, 100);
						});
					}
				});
			})();

			/*************************************************************************
			 *Click send button
			 */
			(function () {
				var inputs = formExtFields;
				for (var b = 0; b < formExtButtons.length; b++) {

					if (formExtButtons[b].classList.contains('form-ext-button-type2')) {
						LGWGNewCloseBtn.classList.add("lgwg-none-imp-forever");
					} 

					formExtButtons[b].addEventListener('click', function() {
						var btn = this;

						if (btn.classList.contains('form-ext-button-type0')) {
							// Send Form
							sendForm(btn);
						} else if (btn.classList.contains('form-ext-button-type1')) {
							// Send Form and Redirect
							var redirectData = {
								blank: btn.classList.contains('form-ext-button-redirect-blank-true'),
								url: btn.getAttribute('data-url')
							};
							sendForm(btn, redirectData);
						} else if (btn.classList.contains('form-ext-button-type2')) {
							// Close Widget
							if (btn.classList.contains('form-ext-button-target-action-true')) {
								LeadCore.pushTargetAction(1, widgetLGWGNewPopupId);
								LeadCore.sendAnalyticGlobal(metrikaId);
							}

							closeWidget();
						} else if (btn.classList.contains('form-ext-button-type3')) {
							// Redirect
							if (btn.classList.contains('form-ext-button-target-action-true')) {
								LeadCore.pushTargetAction(1, widgetLGWGNewPopupId);
								LeadCore.sendAnalyticGlobal(metrikaId);
							}
							LGWGService.redirectIfOn(null, btn.classList.contains('form-ext-button-redirect-blank-true'), btn.getAttribute('data-url'));
						}
					});
				}
			})();

			function sendForm(btn, redirectData) {
				var paramsToSend = {
					title: "Заявка с сайта (" + widgetLGWGNewPopupName + ")",
					pageTitle: docTitle,
					widgetId: widgetLGWGNewPopupId,
					error: false
				};
				var content = {};

				const hiddenFields = visualObjNewPopup.formExt.model.list.filter(item => item.type === 'hidden');

				if (hiddenFields.length) {
					LGWGService.prepareHiddenFields(hiddenFields, content);
				}

				LGWGService.checkFormExtFields(formExtFields, paramsToSend, content);
				
				if (!paramsToSend.error) {
					delete paramsToSend.error;
					paramsToSend.customFields = LGWGService.removeEmptyKeys(content);
					
					var serviceData = {
						onTargetScript: onTargetScript,
						jsInfo: jsInfo,
						metrikaId: metrikaId,
						widgetLGWGNewPopupId: widgetLGWGNewPopupId,
						widgetObj: visualObjNewPopup,
						redirectData: redirectData,
						WidgetDotOffandNoShowThank: WidgetDotOffandNoShowThank,
						WidgetDotOffandShowThank: WidgetDotOffandShowThank
					};
					LGWGService.sendRequestForm(paramsToSend, serviceData, "formExt", btn);
				}
			}

			function closeWidget() {
				WidgetDotOff();
				event.stopPropagation();
				event.preventDefault();
			}
		}

		/*************************************************************************
		 *Click on banner
		 */
		(function () {
			if (!visualObjNewPopup.button.enable && visualObjNewPopup.formSet.redirect.enable) {
				if (isVideo) {
					for (var i in videoPlayers) {
				        videoPlayers[i].addEventListener('click', function(event) {
				        	event.stopPropagation();
				        });	
				    }
				}

				LGWGNewDotBanner.classList.add('clickableBanner');
				LGWGNewDotBanner.classList.add('click-lgwg-dot-target');
				LGWGNewDotBanner.addEventListener('click', function(e) {
					LeadCore.pushTargetAction(1, widgetLGWGNewPopupId);
					if (onTargetScript) {
						LeadCoreExt.buildWidgetScript(onTargetScript);
					}
					LeadCore.sendAnalyticGlobal(metrikaId);
					e.preventDefault();
					relocateIfOn();
				});
			}
		})();


		/*************************************************************************
		 *Click on alone button
		 */
		(function () {
			var btnAlone = document.getElementsByClassName('button-alone')[0];
			if (btnAlone) {
				btnAlone.addEventListener('click', function(e) {
					LeadCore.pushTargetAction(1, widgetLGWGNewPopupId);
					if (onTargetScript) {
						LeadCoreExt.buildWidgetScript(onTargetScript);
					}
					LeadCore.sendAnalyticGlobal(metrikaId);
					e.preventDefault();
					relocateIfOn();
				});
			}
		})();


		/*************************************************************************
		 *Sound Beep
		 */
		function soundBeepNewPopup() {
			if (autoInviteObjNewPopup.sound.enable) {
				var audio = new Audio(); 
				audio.src = soundBeepNewPopupUrl; 
				audio.autoplay = true; 
			}
		}


		if (isMobile.any()) {
			autoInviteObjNewPopup.inactive.enabled = false;
		}
		if (!restrNewPopup.unique) {
			restrNewPopup.unique = {
				enable: false
			}
		}
		if (!restrNewPopup.action) {
			restrNewPopup.action = {
				enable: false
			}
		}
		
		var LGWGNewDotDetect = {pages: false, seconds: false, percent: false, inactive: false};

		var cookies = {
			countShowsCloseLock: 'newLabelLGWGCountShowsCloseLock'+idForSetUniqueLock,
			countTimeCloseLock: 'newLabelLGWGCountTimeCloseLock'+idForSetUniqueLock,
			closeLockUnique: 'newLabelLGWGCloseLock'+idForSetUniqueLock,
			closeLock: 'newLabelLGWGCloseLock',
			targetLock: 'newLabelLGWGTargetLock',
			actionLock: 'LGWGActionLock'
		};


		if (typeof restrNewPopup.count === "undefined") {
			restrNewPopup.count = {
	            enable: false,
	            count: 1,
	            unit: 'SEC',
	            interval: 1
	        }
		}

		if (typeof autoInviteObjNewPopup.ruleLogic === "undefined") {
			autoInviteObjNewPopup.ruleLogic = LeadCore.constants.autoinviteAND;
		}

		setTimeout(function() {
			newLink200();
			appearWidgetPop();
			initThankBlockSize();
			fireAutoStartWidgets();
		}, 1000);

		function getRuleSpecification(autoInviteParams) {
			return autoInviteParams.pages.enable || autoInviteParams.seconds.enable || autoInviteParams.percent.enable || autoInviteParams.inactive.enabled || LeadCoreExt.isExitIntent(autoInviteParams.exit);
		}
		
		function showWidgetIfCountBlock(restrictions) {
			var counterShowsWidgetCookie = LeadCore.getCookie(cookies.countShowsCloseLock);
			if (LeadCore.getCookie(cookies.countShowsCloseLock).length) {
				return (parseInt(LeadCore.getCookie(cookies.countShowsCloseLock), 10) < restrictions.count.count);
			} else if (!LeadCore.getCookie(cookies.countShowsCloseLock).length) {
				return true;
			}
		}

		var restrictionWidget = {
			restrictions: restrNewPopup,
			isAutoinviteShow: function() {
				return (this.restrictions.autoinvite.enable && !LeadCore.getCookie(cookies.closeLock).length) || (!this.restrictions.autoinvite.enable);
			},
			isUniqueLock: function() {
				return (this.restrictions.unique.enable && !LeadCore.getCookie(cookies.closeLockUnique).length) || (!this.restrictions.unique.enable);
			},
			isActionLock: function() {
				return (this.restrictions.action.enable && !LeadCore.isActionLockExpire(this.restrictions.action.gap, cookies.actionLock)) || (!this.restrictions.action.enable);
			},
			isCountLock: function() {
				return ((this.restrictions.count.enable && !LeadCore.getCookie(cookies.countTimeCloseLock).length) && showWidgetIfCountBlock(this.restrictions)) || (!this.restrictions.count.enable);
			},
			isTargetLock: function() {
				return ((this.restrictions.target.mode != 1) && !LeadCore.getCookie(cookies.targetLock).length) || (this.restrictions.target.mode == 1);
			},
			checkAllRestrictions: function() {
				return this.isAutoinviteShow() && this.isUniqueLock() && this.isCountLock() && this.isTargetLock() && this.isActionLock();
			}
		};
		
		function fireAutoStartWidgets() {
			function mobileExitIntentHanler() {
				
				window.top.onpageshow = function(event) {
				    if (event.persisted && LeadCoreExt.isExitIntentReadyToShow(LGWGNewDotDetect.exit)) {
				    	LGWGNewDotDetect.exit = true;
						ruleForAutoInviteNotDelay();
				    }
				};

				window.top.document.addEventListener('visibilitychange', function() {
				    if (LeadCoreExt.isExitIntentReadyToShow(LGWGNewDotDetect.exit)) {
						LGWGNewDotDetect.exit = true;
						ruleForAutoInviteNotDelay();
					}
				});

				function exitIntenTScrollDetect() {
					let scrollUpHappened = false;
					let orientationChanged = false;
					let sizeChanged = false;
					let touchProcess = false;
					let timeoutAfterResizing;
					let timeoutAfterTouching;

					function myScrollSpeedFunction() {
						if ((my_scroll() < 0) && sizeChanged && !touchProcess && LeadCoreExt.isExitIntentReadyToShow(LGWGNewDotDetect.exit)) {
							positiveHandler();
						}
				 	}

				 	window.top.document.addEventListener('touchstart', function() {
				 		clearTimeout(timeoutAfterTouching);
				 		touchProcess = true;
					});

					window.top.document.addEventListener('touchmove', function() {
						clearTimeout(timeoutAfterTouching);
				 		touchProcess = true;
					});

				 	window.top.document.addEventListener('touchend', function() {
				 		clearTimeout(timeoutAfterTouching);
				 		timeoutAfterTouching = setTimeout(function() {
				 			touchProcess = false;
				 		}, 50);
					});

					window.top.document.addEventListener('touchcancel', function() {
						clearTimeout(timeoutAfterTouching);
				 		timeoutAfterTouching = setTimeout(function() {
				 			touchProcess = false;
				 		}, 50);
					});

				 	window.top.addEventListener('resize', function() {
				 		clearTimeout(timeoutAfterResizing);
				 		sizeChanged = true;
				 		timeoutAfterResizing = setTimeout(function() {
							sizeChanged = false;
						}, 500);
					});

					function positiveHandler() {
						LGWGNewDotDetect.exit = true;
						ruleForAutoInviteNotDelay();
						scrollUpHappened = false;
					}

					window.top.addEventListener("orientationchange", function() {
					    orientationChanged = true;
					    setTimeout(() => {
					    	orientationChanged = false;
					    }, 500);
					});

				 	var my_scroll = (function() { //Function that checks the speed of scrolling
						 var last_position, new_position, timer, delta, delay = 500; 
						 
						 function clear() {
						     last_position = null;
						     delta = 0;
						 }

						 clear();

						 return function() {
						     new_position = window.top.scrollY;
						     if (last_position != null ) {
						         delta = new_position - last_position;
						     }
						     last_position = new_position;
						     clearTimeout(timer);
						     timer = setTimeout(clear, delay);
						     return delta;
						 };
					 })();

					 var windowIfrm = window.top;
					 windowIfrm.addEventListener('scroll', myScrollSpeedFunction);
				}

				exitIntenTScrollDetect();
			}

			function desktopExitIntentHanler() {
				window.top.document.addEventListener("mouseout", function(e){
				    if( e.clientY <= 0 && !LGWGNewDotDetect.exit && !window.top.LeadCore.isWidgetActive.length) {
				    	LGWGNewDotDetect.exit = true;
						ruleForAutoInviteNotDelay();
				    }
				}, false);
			}

			if (restrictionWidget.checkAllRestrictions()) {
			
				/*************************************************************************
				 *Autoinvite if page
				 */
				(function () {
					if (autoInviteObjNewPopup.pages.enable) {
						if ((LeadCore.visit.visitInfo.actionsCount >= (autoInviteObjNewPopup.pages.value - 1)) && !window.top.LeadCore.isWidgetActive.length) {
							LGWGNewDotDetect.pages = true;
							ruleForAutoInviteNotDelay();
						} else {
							LGWGNewDotDetect.pages = false;
							//ruleForAutoInviteNotDelay();
						}
					} else {
						LGWGNewDotDetect.pages = true;
					}
				})();


				/*************************************************************************
				 *Autoinvite if exit
				 */
				(function () {
					if (isMobile.any() && autoInviteObjNewPopup.ruleLogic === LeadCore.constants.autoinviteOR) {
						LGWGNewDotDetect.exit = true;
						return false;
					}
					if (isMobile.any() && LeadCoreExt.isExitIntentMobile(autoInviteObjNewPopup.exit)) {
						mobileExitIntentHanler();
					} else if (LeadCoreExt.isExitIntentDesktop(autoInviteObjNewPopup.exit)) {
						desktopExitIntentHanler()
					} else {
						LGWGNewDotDetect.exit = true;
					}
				})();

				/*************************************************************************
				 *Autoinvite if seconds
				 */
				(function () {
					if (autoInviteObjNewPopup.seconds.enable) {
						LGWGNewDotDetect.seconds = false;
						setTimeout(function() {
							LGWGNewDotDetect.seconds = true;
							ruleForAutoInviteNotDelay();
						}, autoInviteObjNewPopup.seconds.value*1000);
					}
					else {
						LGWGNewDotDetect.seconds = true;
					}
				})();


				/*************************************************************************
				 *Autoinvite if percent
				 */
				(function () {
					if (autoInviteObjNewPopup.percent.enable) {
						var documentIfrm = window.top.document;

						var ua = navigator.userAgent.toLowerCase();
						var isOpera = (ua.indexOf('opera')  > -1);
						var isIE = (!isOpera && ua.indexOf('msie') > -1);
						var autoInviteNewDotPercent = false;

						function getDocumentHeight() {
						  return Math.max(documentIfrm.compatMode != 'CSS1Compat' ? documentIfrm.body.scrollHeight : documentIfrm.documentElement.scrollHeight, getViewportHeight());
						}

						function getViewportHeight() {
						  return ((documentIfrm.compatMode || isIE) && !isOpera) ? (documentIfrm.compatMode == 'CSS1Compat') ? documentIfrm.documentElement.clientHeight : documentIfrm.body.clientHeight : (documentIfrm.parentWindow || documentIfrm.defaultView).innerHeight;
						}

						documentIfrm.addEventListener('scroll', function() {
							
							var percentPageValue = (getDocumentHeight() / 100) * autoInviteObjNewPopup.percent.value;
							
							if ((window.top.scrollY >= percentPageValue || documentIfrm.body.scrollTop >= percentPageValue) && !autoInviteNewDotPercent) {
								
								autoInviteNewDotPercent = true;
								LGWGNewDotDetect.percent = true;
								ruleForAutoInviteNotDelay();
							}
						});
					} else {
						LGWGNewDotDetect.percent = true;
					}
				})();


				/*************************************************************************
				 *Autoinvite if inactive
				 */
				(function () {
					if (autoInviteObjNewPopup.inactive.enabled) {
						
						var autoInviteNewDotInAct = false;
						var timeFirstInAct = setTimeout(function() {
							autoInviteNewDotInAct = true;
							LGWGNewDotDetect.inactive = true;
							ruleForAutoInviteNotDelay();
						}, autoInviteObjNewPopup.inactive.value * 1000); 

						window.top.document.onmousemove = initAct;
						var timeIdInAct = null;

						function initAct() {
							clearTimeout(timeFirstInAct);
							if (timeIdInAct) {
								clearTimeout(timeIdInAct);
								timeIdInAct = null;
							}
							if (!autoInviteNewDotInAct) {
								timeIdInAct = setTimeout(function() {
									autoInviteNewDotInAct = true;
									LGWGNewDotDetect.inactive = true;
									ruleForAutoInviteNotDelay();
								}, autoInviteObjNewPopup.inactive.value * 1000); 
							}
						}
					} else {
						LGWGNewDotDetect.inactive = true;
					}
				})();
			} else {
				/*************************************************************************
				 *Autoinvite if exit
				 */
				(function () {
					if (isMobile.any() && LeadCoreExt.isExitIntentMobile(autoInviteObjNewPopup.exit)) {
						mobileExitIntentHanler();
					} else if (LeadCoreExt.isExitIntentDesktop(autoInviteObjNewPopup.exit)) {
						desktopExitIntentHanler()
					} else {
						LGWGNewDotDetect.exit = true;
					}
				})();
			}

			/*************************************************************************
			 *start autoinvite
			 */
			function ruleForAutoInviteNotDelay() {
				setTimeout(function() {
					if (ifOneAutoEnable() && checkAllParamsForStart(LGWGNewDotDetect)) {
						if (!openWidgetDetect) {
							soundBeepNewPopup();
							WidgetDotOn();
						}
					}
				}, 100);

				function checkAllParamsForStart(params) {
					if (autoInviteObjNewPopup.ruleLogic === LeadCore.constants.autoinviteAND) {
						return params.percent && params.pages && params.seconds && params.inactive && params.exit;
					} else if (autoInviteObjNewPopup.ruleLogic === LeadCore.constants.autoinviteOR) {
						return params.percent || params.pages || params.seconds || params.inactive || params.exit;
					}
				}
			}

			function ifOneAutoEnable() {
				return !window.top.LeadCore.isWidgetActive.length && restrictionWidget.checkAllRestrictions() && getRuleSpecification(autoInviteObjNewPopup); 
			}
		}

		//Click on element action
		(function () {
			if(autoInviteObjNewPopup.click && autoInviteObjNewPopup.click.enable) {
				var selectorToClick = autoInviteObjNewPopup.click.value;

				if(selectorToClick) {
					var elementsToClick = window.top.document.querySelectorAll(selectorToClick);
					for (var i = 0; i < elementsToClick.length; i++) {
					    elementsToClick[i].addEventListener('click', function(event) {
					    	if(window.top.LeadCore.isWidgetActive.length == 0) {
						    	soundBeepNewPopup();
								WidgetDotOn();
							}
					    });
				  	}
				}
			}
		})();


		//Target Action
		(function () {
			var clickTargetAct = LGVisualMainBlock.querySelectorAll('.click-lgwg-dot-target');

			for (var i = 0; i < clickTargetAct.length; i++) {
				var clickTargetActCur = clickTargetAct[i];

				clickTargetActCur.addEventListener('click', function(e) {
					if (restrNewPopup.target.mode == 2) {
						LeadCore.setCookie('newLabelLGWGTargetLock', LeadCore.siteId, 7);
					}
					if (restrNewPopup.target.mode == 0) {
						LeadCore.setCookie('newLabelLGWGTargetLock', LeadCore.siteId, (restrNewPopup.target.gap / 24));
					}
				});
			} 
		})();

		//Close widget Lock
		(function () {
			var clickCloseLock = LGVisualMainBlock.querySelectorAll('.click-lgwg-dot-close-lock');

			for (var i = 0; i < clickCloseLock.length; i++) {
				var clickCloseLockCur = clickCloseLock[i];

				clickCloseLockCur.addEventListener('click', function(e) {
					if (restrNewPopup.autoinvite.enable) {
						LeadCore.setCookie('newLabelLGWGCloseLock', LeadCore.siteId, (restrNewPopup.autoinvite.gap / 24));
					}
				});
			} 
		})();

		function getLinkForSocBtn(name) {
			var urlToShare;
			var title;
			if(visualObjNewPopup.social.linkForShare && visualObjNewPopup.social.linkForShare == "own") {
				urlToShare = visualObjNewPopup.social.linkText;
				title = "";
			} else {
				urlToShare = window.top.location;
				title = docTitle
			}
			
			var socialLinks = {
				vkontakte: "http://vk.com/share.php?url="+urlToShare+"&title="+title+"&noparse=true",
				facebook: "https://www.facebook.com/sharer.php?u="+urlToShare+"&t="+title+"",
				googleplus: "https://plus.google.com/share?url="+urlToShare+"",
				digg: "http://digg.com/submit?url="+urlToShare+"&title="+title+"",
				twitter: "https://twitter.com/intent/tweet?url="+urlToShare+"&text="+encodeURI(title)+"&source=leadgenic.ru",
				buffer: "https://bufferapp.com/add?url="+urlToShare+"&title="+title+"&partner_source=sharexy",
				pocket: "https://getpocket.com/edit?url="+urlToShare+"",
				linkedin: "http://www.linkedin.com/shareArticle?mini=true&url="+urlToShare+"&source="+title+"&token=&isFramed=false",
				reddit: "http://en.reddit.com/submit?url="+urlToShare+"&title="+title+"",
				stumbleupon: "http://www.stumbleupon.com/submit?url="+urlToShare+"&title="+title+"",
				odnoklassniki: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl="+urlToShare+"",
				mail: "mailto:?subject="+LeadCore.constants.findForYouThisSite+"&body="+LeadCore.constants.lookAt+" "+urlToShare+"",
				yummly: "http://www.yummly.com/urb/verify?url="+urlToShare+"&title="+title+"",
				xing: "https://www.xing.com/spi/shares/new?url="+urlToShare+"",
				blogger: "https://www.blogger.com/blog-this.g?t&u="+urlToShare+"&n="+title+"",
				tumblr: "https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl=&url="+urlToShare+"&title="+title+"&_format=html",
				pinterest: "pinterest",
				print: "print"
			};

			return socialLinks[name];
		}

		//Get width and send it to main window
		(function () {
			var funcSend = function() {
				var dataSend = {
						name: "resize",
						w: LGWGWidgetAndCloseBlock.offsetWidth, 
						h: LGWGWidgetAndCloseBlock.offsetHeight
					};
			
				window.top.postMessage(dataSend, window.top.location);
			};

			var f1000 = throttle(funcSend, 1000);

			document.getElementById("testIframe").contentWindow.addEventListener('resize', function(){
				f1000();
			});

			function throttle(func, ms) {
				var isThrottled = false,
					savedArgs,
					savedThis;

				function wrapper() {

					if (isThrottled) { // (2)
						savedArgs = arguments;
						savedThis = this;
						return;
					}
					func.apply(this, arguments);

					isThrottled = true;

					setTimeout(function() {
						isThrottled = false; // (3)
						if (savedArgs) {
							wrapper.apply(savedThis, savedArgs);
							savedArgs = savedThis = null;
						}
					}, ms);
				}

				return wrapper;
			}
		})();

		(function () {
			if (LGWGSocialBlockAction) {
				LGWGSocialBlockAction.addEventListener('click', function(event) {
					if(!event.target.getAttribute("data")) {
						return;
					}
					
					LeadCore.pushTargetAction(1, widgetLGWGNewPopupId);
					if (onTargetScript) {
						LeadCoreExt.buildWidgetScript(onTargetScript);
					}
					LeadCore.sendAnalyticGlobal(metrikaId);
					event.preventDefault();
					event.stopPropagation();

					if (event.target.getAttribute("data") == "pinterest") {
						window.top.PinUtils.pinAny();
						setTimeout(function() {
							LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
							LeadCoreExt.openCouponCallback(widgetLGWGNewPopupId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
						}, 500);
						return;
					}

					if (event.target.getAttribute("data") == "print") {
						window.top.print();
						setTimeout(function() {
							LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
							LeadCoreExt.openCouponCallback(widgetLGWGNewPopupId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
						}, 500);
						return;
					}
					if (event.target.className.indexOf("mail") >= 0) {
						window.top.location.href = event.target.getAttribute("data");
						setTimeout(function() {
							LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
							LeadCoreExt.openCouponCallback(widgetLGWGNewPopupId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
						}, 500);
						return;
					}

					popupCenterLGWGSoc(event.target.getAttribute("data"), docTitle);
				});
			}
		})();

		var popupCenterLGWGSoc = function(url, title) {
			var w = 580;
			var h = 470;
			var newWindow;
			// Fixes dual-screen position
			var dualScreenLeft = window.top.screenLeft !== undefined ? window.top.screenLeft : screen.left;
			var dualScreenTop = window.top.screenTop !== undefined ? window.top.screenTop : screen.top;

			var width = window.top.innerWidth ? window.top.innerWidth : window.top.document.documentElement.clientWidth ? window.top.document.documentElement.clientWidth : screen.width;
			var height = window.top.innerHeight ? window.top.innerHeight : window.top.document.documentElement.clientHeight ? window.top.document.documentElement.clientHeight : screen.height;

			var left = ((width / 2) - (w / 2)) + dualScreenLeft;
			var top = ((height / 3) - (h / 3)) + dualScreenTop;

			if (isMobile.Firefox() || navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Safari/i)) {
				newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
			} else {
				newWindow = window.top.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
			}

			// Puts focus on the newWindow
			if (newWindow && newWindow.focus) {
				newWindow.focus();
			}

			if (LeadCoreExt.isItSocialCallbackCoupon(visualObjNewPopup.social)) {
				var timer = setInterval(function() { 
				    if(newWindow.closed) {
				        clearInterval(timer);
				        LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
				        LeadCoreExt.openCouponCallback(widgetLGWGNewPopupId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
				    }
				}, 1000);
			}
		};

		function closeWidgetOnMobileAfterSharing() {
			if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
				WidgetDotOff();
			}
		}

		/*************************************************************************
		 *Responsive block
		 */
		function responseNewLabel() {
			var windowH80 = (window.innerHeight/100)*70;
			
			var startScale = 1;
			var newMargLeft = 0;
			while (((LGWGlLabelLine.offsetWidth * startScale) + 45) > window.top.screen.availWidth) {
				LGWGlLabelLine.style.zoom = startScale;
				startScale = startScale - 0.05;
			}
		};

		/*************************************************************************
		 *LeadGenic link if width < 200
		 */
		function newLink200() {
			if (!isMobile.any() && (((visualObjNewPopup.dhVisual.widget_width_nopx + 80) > window.top.screen.availWidth) || (visualObjNewPopup.dhVisual.widget_width_nopx < 200))) {
				LGWGNewBlockLinkF.classList.add('lgwg-block-link-f-60');
				LGWGNewPopBtnF.innerHTML = LeadCore.constants.lgLink60;
			}
		}
	
		var LGWGIframeDotDiv = window.top.document.getElementById("lgwgDivIframeLabel");
		if (isMobile.any()) {
			document.getElementsByTagName("body")[0].classList.add("touches-versions");

			if (window.top.screen.availWidth <= 760) {
				document.getElementsByTagName("body")[0].classList.add("mobile-version");
				LGWGIframeDotDiv.classList.add("lgwg-div-iframe-label-mobile");
				setTimeout(function() {
					document.getElementsByTagName("body")[0].classList.add("mobile-set-block-s");
				}, 1000);
			}
		}
	})();
}
