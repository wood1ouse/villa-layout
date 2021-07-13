

/*************************************************************************
 *Set title, delete percent if need
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

var sendObject = { title: 'Test message', value: 5000};

var createLGWGElement = window.top.createLGWGElement;
var isMobile = window.top.LeadCore.isMobile;
var LeadWidgets = window.top.LeadWidgets;
var LeadCore = window.top.LeadCore;
var LeadCoreExt = window.top.LeadCoreExt;
var LGWGService = window.top.LGWGService;


var thankShowTimeout = null;
var urlLabelADVLGWG = "https://leadgenic.ru/create_widget/?utm_source="+document.domain+"&utm_campaign=widget_create_offer_button";

var visualObjNewPopup = LeadCore.visit.guiprops,
	autoInviteObjNewDot = LeadCore.visit.autoinvite,
	restrDotNewDot = LeadCore.visit.restrictions,
	jsInfo = {},
	abtestInfo,
	metrikaId,
	widgetLGWGDotName,
	widgetLGWGDotId,
	soundBeepNewDot,
	labelPositionNew,
	cssPath;

var openWidgetDetect;
var isInitCouponClick = false;

var onShowScript,
	onTargetScript;

var isVideo = false,
	isSocial = false,
	isCloseLink = false;

var videoPlayers = [];
var isBGVideo = false;
var mobileOpen;
var pageX = 0,
	pageY = 0;

// for (var i = 0; i < LeadWidgets.list.length; i++) {
// 	if (LeadWidgets.list[i].type.code == 'optindot') {
// 		visualObjNewPopup = LeadWidgets.list[i].guiprops;
// 		autoInviteObjNewDot = LeadWidgets.list[i].autoinvite;
// 		restrDotNewDot = LeadWidgets.list[i].restrictions;
// 		widgetLGWGDotName = LeadWidgets.list[i].name;
// 		widgetLGWGDotId = LeadWidgets.list[i].id;
// 		soundBeepNewDotUrl = LeadWidgets.list[i].template.sound;
// 		cssPath = LeadWidgets.list[i].template.css;
// 		if (LeadWidgets.list[i].abtestInfo) {
// 			abtestInfo = LeadWidgets.list[i].abtestInfo;
// 		}
// 		if (LeadWidgets.list[i].jsInfo) {
// 			jsInfo = LeadWidgets.list[i].jsInfo;
// 		}
// 	}
// }

if (visualObjNewPopup.bg.bgStyle) {
	visualObjNewPopup.bg.colorBg = visualObjNewPopup.bg.bgStyle;
}

var idForSetUniqueLock;
idForSetUniqueLock = abtestInfo ? abtestInfo.id : widgetLGWGDotId;
metrikaId = abtestInfo && abtestInfo.superWidgetId ? abtestInfo.superWidgetId : widgetLGWGDotId;


for (var i = 0; i < LeadWidgets.list.length; i++) {
	if (LeadWidgets.list[i].type.code == 'label_widget') {
		labelPositionNew = LeadWidgets.list[i].guiprops.labelMain.place;
		labelHeightNew   = LeadWidgets.list[i].guiprops.labelMain.height;
	}
}

(function () {
	if (isMobile.any()) {
		var lgwgClickEvent = 'touchend';
	}
	else {
		var lgwgClickEvent = 'click';
	}

	/*************************************************************************
	 *Create Dom for non mobile
	 */
	function createDomDH() { 

		function setMobileClass() {
			if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
				return "widget-visual-block-mobile";
			} else {
				return "";
			}
		}

		function getBGColorPod() {
			return visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable ? visualObjNewPopup.formExt.model.mainSettings.colorPod.rgbaColorPod : visualObjNewPopup.form.colorPod.rgbaColorPod;
		}
		
		var hlSmall = 
		createLGWGElement( 'div', { id: 'visualBlockWidgetLGWG' , class: 'widget-visual-block visual-block-widget-lgwg-dot lgwg-op-hid-st '+setMobileClass(), style:'opacity:0'},
			createLGWGElement( 'iframe', { id: 'testIframe', width: '100%', height: '100%', style: 'position:absolute;z-index:-1;opacity:0'}),

			createLGWGElement( 'div', { id: 'LGWGWidgetAndCloseBlock', class: 'lgwgnew-widget-start widget-global-close-dot lgwgnew-widget-anim-start'},
				createLGWGElement( 'div', { id:'LGWGNewCloseBtn', class: 'close-btn-x-new-dot lgwg-op-hid click-lgwg-dot-close-lock animClass03'},
					createLGWGElement( 'span', {})
				),
				createLGWGElement( 'a', {id: 'clickBannerLGWGDot', class: 'click-class-banner'},
					createLGWGElement( 'div', { id: 'mainBlockWidgetLGWG' , class: 'widget1 block-widget-show', style:'border:'+LGWGService.getBorderStyle(visualObjNewPopup.bg)+';box-shadow:'+LGWGService.getBoxShadowStyle(visualObjNewPopup.bg)+';border-radius:'+visualObjNewPopup.bg.borderRadius+'px'+';width:'+visualObjNewPopup.dhVisual.widget_width_all},
						createLGWGElement( 'div', { id: 'widgetBGContentLGWG'+widgetLGWGDotId, class: 'widget-bg-content animClass01', style:'border-radius:'+LGWGService.getInnerBorderStyle(visualObjNewPopup.bg)+';background:'+visualObjNewPopup.bg.colorBg+';opacity:'+LGWGService.setOpacityForBg(visualObjNewPopup.bg)}),
						createLGWGElement( 'div', { id: 'widgetMaskWholeLGWG', class: 'widget-mask-whole lgwg-none animClass01'}),
						createLGWGElement( 'div', { id: 'widgetImageLGWG', class: 'widget-image lgwg-op-hid lgwg-none animClass01'}),
						createLGWGElement( 'div', { id: 'colorFormPod', class: 'color-bg-on-form lgwg-none animClass01', style:'background:'+getBGColorPod()}),
						createLGWGElement( 'div', { id: 'widgetMainWr', class: 'wigdet-main-wr lgwg-op-hid animClass01'})
					)
				),
				createLGWGElement( 'div', { id: 'lgwgBlockLinkF', class: 'lgwg-block-link-f lgwg-op-hid animClass03'},
					createLGWGElement( 'div', { id: 'lgwgNewDotLinkFooter', class: 'lgwgnew-dot-footer lgwgnew-dot-footer-hid'},
						createLGWGElement( 'a', { href: 'http://leadgenic.ru', class: 'lgwg-new-dot-btn-f', id: 'lgwgnewDotBtnF', target: 'blank' }, LeadCore.constants.lgLinkStatic)
					)
				),
				createLGWGElement( 'div', { id: 'thankBlockDotLGWG', class: 'block-widget-show block-thank lgwg-none lgwg-op-hid', style:'border:'+LGWGService.getBorderStyle(visualObjNewPopup.bg)+';box-shadow:'+LGWGService.getBoxShadowStyle(visualObjNewPopup.bg)+';border-radius:'+visualObjNewPopup.bg.borderRadius+'px'+';width:'+visualObjNewPopup.dhVisual.widget_width_all+';height:'+visualObjNewPopup.dhVisual.widget_height_all},
					createLGWGElement( 'div', { id: 'widgetThankBGContentLGWG'+widgetLGWGDotId, class: 'widget-bg-content animClass01', style:'border-radius:'+LGWGService.getInnerBorderStyle(visualObjNewPopup.bg)+';background:'+visualObjNewPopup.bg.colorBg+';opacity:'+LGWGService.setOpacityForBg(visualObjNewPopup.bg)}),
					createLGWGElement( 'div', { id: 'widgetThankMaskWholeLGWG', class: 'widget-mask-whole lgwg-none animClass01'}),
					createLGWGElement( 'div', { id: 'widgetThankWr', class: 'editor-font-thank'},
						createLGWGElement( 'div', { id: 'widgetThankIncWrPop', class: 'editor-font-thank-inc'},
							createLGWGElement( 'div', { id: 'title2NewDotElLGWG', class: 'title-main-th-new-dot', style:'font-size:'+visualObjNewPopup.title.fontSize+'px'+';font-family:'+visualObjNewPopup.title.font.fontFamily}, visualObjNewPopup.thank.textSummer),
							createLGWGElement( 'div', { id: 'desc2NewDotElLGWG', class: 'description-th-new-dot', style:'font-size:'+visualObjNewPopup.desc.fontSize+'px'+';font-family:'+visualObjNewPopup.desc.font.fontFamily}, visualObjNewPopup.thank2.textSummer)
						)
					)
				),
				createLGWGElement( 'div', { id: 'thankBlockPopAdvLGWG'+widgetLGWGDotId, class: 'block-thank-adv block-widget-show block-thank lgwg-none lgwg-op-hid', style:'border:'+LGWGService.getBorderStyle(visualObjNewPopup.bg)+';box-shadow:'+LGWGService.getBoxShadowStyle(visualObjNewPopup.bg)+';border-radius:'+visualObjNewPopup.bg.borderRadius+'px'+';width:'+visualObjNewPopup.dhVisual.widget_width_all+';height:'+visualObjNewPopup.dhVisual.widget_height_all},
					createLGWGElement( 'div', { id: 'thankBlockPopInAdvLGWG'+widgetLGWGDotId, class: 'thank-block-pop-adv-lgwg'},
						createLGWGElement( 'div', {class: 'thank-adv-icon'}),
						createLGWGElement( 'h1', {}, 'Форма успешно отправлена!'),
						createLGWGElement( 'h2', {}, 'А сейчас вы можете'),
						createLGWGElement( 'a', { id: 'thank-btn-on-adv'+widgetLGWGDotId, class: 'thank-btn-on-adv', href: urlLabelADVLGWG, target: 'blank'}, 'Создать такой же виджет для своего сайта'),
						createLGWGElement( 'span', {}, 'или'),
						createLGWGElement( 'div', { id: 'thank-close-btn-adv'+widgetLGWGDotId, class: 'thank-close-btn-adv'}, 'закрыть это окно')
					)
				),
				createLGWGElement('div', {class: 'point__promo'},
					createLGWGElement('div', {class: 'point__promo__container'},
						createLGWGElement('div', {class: 'point__promo__logo'}),
						createLGWGElement('div', {class: 'point__promo__text'}, 'Хотите такой же виджет на сайт?'),
					)
				)
			)
		);

		document.getElementsByTagName("body")[0].appendChild(hlSmall);

		var template = "<div id=\"widgetMaskContentLGWG\" class=\"widget-mask-content lgwg-none\"></div><ul class=\"wigdet-dot-main-wr "+LGWGService.classNameVerticalOrient(visualObjNewPopup.dhVisual)+"\" style=\"height:"+(((visualObjNewPopup.dhVisual.widget_content_heightpx*1)-60).toString())+"px\">"+buildDynamicWidget() + '<div class="point__modal__container"> <div class="point__modal"> <div class="point__modal__banner"> <div class="point__modal__banner__ico"> <div class="point__modal__banner__ico__content"></div></div></div><div class="point__modal__title" data-type="title">Подписывайтесь и читайте нас в Twitter</div><div class="point__modal__form"> <input type="text" placeholder="Введите телефон"> <button>Отправить</button> </div></div></div></div> ' + "</ul>";
		
		document.getElementById("widgetMainWr").innerHTML = template;
	}
const pointIco = document.querySelector('#lgWgIconFont')
const signal1 = document.querySelector('.point__signal__1')
const signal2 = document.querySelector('.point__signal__2')
const signal3 = document.querySelector('.point__signal__3')


 

	function buildDynamicWidget() {
		var widgetDynamic = "";

		for(var i = 0; i < visualObjNewPopup.elementsList.length; i++) {
			var element = visualObjNewPopup.elementsList[i];
			if (element) {

				if (element.name) {
					// if (element.name === "social-element") {
					// 	var socialMarkup = "";
					// 	for (var j = 0; j < visualObjNewPopup.social.items.length; j++) {
					// 		socialMarkup += "<div class=\"webicon large "+visualObjNewPopup.social.type+" "+visualObjNewPopup.social.items[j].name+"\" data=\""+getLinkForSocBtn(visualObjNewPopup.social.items[j].name)+"\"></div>";
					// 	}
					// 	widgetDynamic += "<li><div class=\"social-block-pd m-b-n-sm m-r-n-xs "+LGWGService.hrPosSel(visualObjNewPopup.social)+"\"><div id=\"socialBlockAction\" class=\"center-mode-social\">"+socialMarkup+"</div></div></li>";
					// }

					if (element.name === "timer-element") {
						var timerMarkup = LGWGService.getTimerMarkup(element);
						widgetDynamic += "<li><div class=\"social-block-pd\">"+timerMarkup+"</div></li>";
					}

					if (element.name === "closelink-element") {
						if (visualObjNewPopup.exit.button && visualObjNewPopup.exit.button.enable) {
							widgetDynamic += "<li><div><div class=\"widget1-btn-exit-btn widget1-btn-bl "+LGWGService.btnExitPosSel(visualObjNewPopup.exit.button, visualObjNewPopup.dhVisual.place)+"\"><button id=\"btnExitButtonLGWG\" class=\"button-send "+LGWGService.btnStyleSel(visualObjNewPopup.exit.button)+" "+LGWGService.btnWidthSel(visualObjNewPopup.exit.button)+"\" style=\"font-size:"+visualObjNewPopup.exit.button.fontSize+"px;font-family:"+visualObjNewPopup.exit.button.font.fontFamily+";background:"+visualObjNewPopup.exit.button.colorBtn+";border-color:"+visualObjNewPopup.exit.button.colorBtn+"!important;color:"+visualObjNewPopup.exit.button.colorTextBtn+";border-radius:"+visualObjNewPopup.exit.button.borderRadiusBtn+"px;width:"+visualObjNewPopup.exit.button.btn_widthpx+"px\"><div>"+visualObjNewPopup.exit.button.textSummer+"</div></button></div></div></li>";
						} else {
							widgetDynamic += "<li><div><div class=\"widget1-btn-exit widget1-btn-exit-new-dot "+LGWGService.getAlignOfCloseLink(visualObjNewPopup.exit)+"\"><button id=\"btnExitLGWG\" class=\"click-edit-cl click-lgwg-dot-close-lock button-link-close\" style=\"font-size:"+visualObjNewPopup.exit.fontSize+"px;font-family:"+visualObjNewPopup.exit.font.fontFamily+"\"><div>"+visualObjNewPopup.exit.textSummer+"</div></button></div></div></li>";
						}
					}

					// if (element.name === "title-element") {
					// 	widgetDynamic += "<li><div class=\"title-main-new-dot "+LGWGService.isTextShadow(element)+"\" style=\"font-size:"+element.fontSize+"px;font-family:"+element.font.fontFamily+";text-shadow:"+element.textShadow.horiz+"px "+element.textShadow.vertical+"px "+element.textShadow.blur+"px "+LGWGService.getRGBAColor(element)+"\">"+element.textSummer+"</div></li>";
					// }

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
			var LGWGWidgetBGContentLGWG = document.getElementById('widgetBGContentLGWG'+widgetLGWGDotId);
			var LGWGWidgetThankBGContentLGWG = document.getElementById('widgetThankBGContentLGWG'+widgetLGWGDotId);
			LGWGWidgetBGContentLGWG.classList.add("widget-transp-bg-imp");
			LGWGWidgetThankBGContentLGWG.classList.add("widget-transp-bg-imp");
			isBGVideo = true;
			var bgVideoTemplate,
				bgThankVideoTemplate;

			if (isMobile.any() && bgSettings.video && bgSettings.video.videoPreview) {
				bgVideoTemplate = "<div class=\"video-bg\"><div class=\"video-bg-preview "+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\" style=\"background-image:url("+bgSettings.video.videoPreview+")\"></div></div>";
					bgThankVideoTemplate = "<div class=\"video-bg\"><div class=\"video-bg-preview "+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\" style=\"background-image:url("+bgSettings.video.videoPreview+")\"></div></div>";
			} else {
				bgVideoTemplate = "<div class=\"video-bg\"><div class=\""+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\"><iframe id=\"videoBGIfrm"+widgetLGWGDotId+"\" src=\"\" frameborder=\"0\" allowfullscreen></iframe></div></div>";
				bgThankVideoTemplate = "<div class=\"video-bg\"><div class=\""+LGWGService.setWideOrNarrowBgStyle(visualObjNewPopup.dhVisual)+"\"><iframe id=\"videoThankBGIfrm"+widgetLGWGDotId+"\" src=\"\" frameborder=\"0\" allowfullscreen></iframe></div></div>";
			}
			
			LGWGWidgetBGContentLGWG.innerHTML = bgVideoTemplate;
			LGWGWidgetThankBGContentLGWG.innerHTML = bgThankVideoTemplate;
		}
	}

	function initBGVideo() {
		if(isBGVideo && !isMobile.any()) {
			var videoBGElement = document.getElementById('videoBGIfrm'+widgetLGWGDotId);
			videoBGElement.src = visualObjNewPopup.bg.video.videoUrl;
		}
	}

	function initBGThankVideo() {
		if(isBGVideo && !isMobile.any()) {
			var videoThankBGElement = document.getElementById('videoThankBGIfrm'+widgetLGWGDotId);
			videoThankBGElement.src = visualObjNewPopup.bg.video.videoUrl;
		}
	}

	function stopInitBgVideo() {
		if(isBGVideo && !isMobile.any()) {
			var videoBGElement = document.getElementById('videoBGIfrm'+widgetLGWGDotId);
			var videoThankBGElement = document.getElementById('videoThankBGIfrm'+widgetLGWGDotId);
			videoBGElement.src = visualObjNewPopup.bg.video.videoUrl;
			videoThankBGElement.src = visualObjNewPopup.bg.video.videoUrl;
			videoBGElement.removeAttribute("src");
			videoThankBGElement.removeAttribute("src");
		}
	}

	if(isVideo) {
		fillVideoArray();
	}

	function fillVideoArray() {
		var videoArray = document.getElementsByClassName("video-element-ifrm");
		for (var i=0; i < videoArray.length; i++) {
	        videoPlayers.push(videoArray[i]);
	    }
	}

	function setAutoOrNotForVideo() {
		for (var i=0; i < videoPlayers.length; i++) {
			if(videoPlayers[i].getAttribute("data-auto") == "true") {
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

	var LGmainBlockDot             = document.getElementById('mainBlockWidgetLGWG');
	var LGWGWidgetAndCloseBlock    = document.getElementById('LGWGWidgetAndCloseBlock');
	var dotCircleCl                = window.top.document.getElementById('widgetVisualDotCircle');
	var LGbtnFormSub               = document.getElementById('btnFormSubLGWG');
	var LGVisualMainBlock          = document.getElementById('visualBlockWidgetLGWG');
	var LGWGNewCloseBtn            = document.getElementById('LGWGNewCloseBtn');
	var LGWGbtnExitButtonLGWG      = document.getElementById('btnExitButtonLGWG');
	var LGWGbtnExitLGWG            = document.getElementById('btnExitLGWG');
	var LGWGNewDotformBlock        = document.getElementById('widgetFormBlockM');
	var LGWGNewDotButtonBlock      = document.getElementById('widgetButtonBlockM');
	var LGWGNewDotFormExtBlock     = document.getElementById('widgetFormExtBlockM');
	var LGWGNewDotThankBlock       = document.getElementById('thankBlockDotLGWG');
	var LGWGNewDotBanner           = document.getElementById('clickBannerLGWGDot');
	var LGWGNewColorPod            = document.getElementById('colorFormPod');
	var LGWGNewBlockLinkF          = document.getElementById('lgwgBlockLinkF');
	var LGWGNewDotBtnF             = document.getElementById('lgwgnewDotBtnF');
	var LGWGNewDotWidgetImage      = document.getElementById('widgetImageLGWG');
	var LGWGNewDotWidgetMainWr     = document.getElementById('widgetMainWr');
	var LGWGNewDotWidgetThankWr    = document.getElementById('widgetThankWr');
	var LGWGNewDotFill1            = window.top.document.getElementById('lgwgW2DotCircleFill1');
	var LGWGNewDotFill2            = window.top.document.getElementById('lgwgW2DotCircleFill2');
	var LGWGLiFormBtn              = document.getElementById('liLGWGFormBtn');
	var LGWGSocialBlockAction      = document.getElementById('socialBlockAction');

	var widgetMaskWholeLGWG        = document.getElementById('widgetMaskWholeLGWG');
	var widgetThankMaskWholeLGWG   = document.getElementById('widgetThankMaskWholeLGWG');
	var widgetMaskContentLGWG      = document.getElementById('widgetMaskContentLGWG');

	var LGWGNewDotThankAdvBlock    = document.getElementById('thankBlockPopAdvLGWG'+widgetLGWGDotId);
	var LGWGNewDotThankAdvBlockIn  = document.getElementById('thankBlockPopInAdvLGWG'+widgetLGWGDotId);
	var thankBtnOnAdv              = document.getElementById('thank-btn-on-adv'+widgetLGWGDotId);
	var thankCloseBtnAdv           = document.getElementById('thank-close-btn-adv'+widgetLGWGDotId);


	var mainBodyElement = window.top.document.getElementsByTagName("body")[0];
	var mainHTMLElement = window.top.document.getElementsByTagName("html")[0];
	var bodyElement = document.getElementsByTagName("body")[0];
	var divElementForH = window.top.document.getElementById('lgwgDivIframeDot');

	//FORM EXT
	var formExtWR = document.getElementById('liLGWGFormExt');

	var LGWGIframeLabelDiv = window.top.document.getElementById("lgwgDivIframeDot");

	var ratings = document.getElementsByClassName('rating-container-in');
	LGWGService.ratingInitProcess(ratings);

	var datePickers = document.getElementsByClassName('w-datepicker-input');
	LGWGService.datePickerInitProcess(datePickers, LGWGIframeLabelDiv, widgetLGWGDotId, window, 'float');

	var dropDowners = document.getElementsByClassName('w-dropdown-input');
	LGWGService.dropDownInitProcess(dropDowners, LGWGIframeLabelDiv, visualObjNewPopup, widgetLGWGDotId, window, 'float');

	var LGWGNewPulseCBDetect = false;

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
			var LGWGOutsideDiv = window.top.document.getElementById("widget2MainBlDot"+widgetLGWGDotId);
			
			LGWGOutsideDiv.style.zoom = zoomValue;

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
		}
		else {
			window.top.window.location = LGWGService.redirectParams(data, visualObjNewPopup.formSet.redirect.url);
			return false;
		}
	}

	/*************************************************************************
	 *Appear widget dot
	 */
	function appearWidgetDot () {
		setTimeout(function() {
			LGVisualMainBlock.style.removeProperty('opacity');
			LGVisualMainBlock.classList.remove('lgwg-op-hid-st');
			dotCircleCl.classList.remove('start-position-lgwg-dot');
		}, 1500);
	}

	if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
		setMaskStyles();
	} else {
		checkTopValueInit();
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
	 *Widget Dot On animation
	 */
	function WidgetDotOnAnim (noTarget) {
		initAllTimerCountdowns();
		if (onShowScript) {
			LeadCoreExt.buildWidgetScript(onShowScript);
		} else {
			loadShowTargetWidgets();
		}
		
		WidgetDotAnimOpen(noTarget);
		if (typeof jsInfo.onTargetScript === "undefined" || (typeof jsInfo.onTargetScript !== "undefined" && !jsInfo.onTargetScript.enable)) {
			initCouponClick();
		}

		//Set unique lock
		if (restrDotNewDot.unique && restrDotNewDot.unique.enable) {
			LeadCore.setCookie('newDotLGWGCloseLock'+idForSetUniqueLock, LeadCore.siteId, (restrDotNewDot.unique.gap / 24));
		}

		//Set count shows lock
		if (restrDotNewDot.count && restrDotNewDot.count.enable) {
			var counterShowsWidget = (LeadCore.getCookie('newDotLGWGCountShowsCloseLock'+idForSetUniqueLock).length != 0) ? ((parseInt(LeadCore.getCookie('newDotLGWGCountShowsCloseLock'+idForSetUniqueLock), 10)) + 1) : 1;
			LeadCore.setCookie('newDotLGWGCountShowsCloseLock'+idForSetUniqueLock, counterShowsWidget, 360);
			LeadCore.setCookie('newDotLGWGCountTimeCloseLock'+idForSetUniqueLock, LeadCore.siteId, LeadCore.setCorrectIntervalForCookie(restrDotNewDot.count.unit, restrDotNewDot.count.interval));
		}
	}

	function WidgetDotAnimOpen(noTarget) {
		openWidgetDetect = true;
		LGWGNewDotWidgetImage.classList.remove('lgwg-op-hid');
		LGWGNewDotWidgetMainWr.classList.remove('lgwg-op-hid');
		LGWGNewColorPod.classList.remove('lgwg-op-hid');

		bodyElement.classList.add('once-to-set-s');
		setTimeout(function() {
			bodyElement.classList.remove('once-to-set-s');
		}, 50);
		
		if(!noTarget) {
			setAutoOrNotForVideo();
			initBGVideo();
		}
			

		LGWGWidgetAndCloseBlock.classList.remove('lgwgnew-widget-start');
		LGWGWidgetAndCloseBlock.classList.remove('lgwgnew-widget-anim-start');
		LGWGWidgetAndCloseBlock.classList.add('active');
		dotCircleCl.classList.add('dot-lgwg-is-active');
		divElementForH.classList.add('active');

		LGWGNewCloseBtn.classList.remove('lgwg-op-hid');
		LGmainBlockDot.classList.remove('widget1-start-n');
		setTimeout(function() {
			LGWGNewBlockLinkF.classList.remove('lgwg-op-hid');
		}, 300);

		if (isMobile.any()) {
			setTimeout(function() {
				LGmainBlockDot.classList.add('widget1-resp-class');
			}, 500);
		}
		document.body.classList.add('dot-hunter-open-more-z');

		if (!noTarget) {
			window.top.LeadCore.isWidgetActive.push("active");
		}

		if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
			pageY = window.top.pageYOffset;
			pageX = window.top.pageXOffset;
			mobileOpen = true;
			mainHTMLElement.classList.add('mobile-lgwg-active-w');
		}
	}

	function checkTopValueInit () {
		bodyElement.classList.add('lgwg-op-hid-imp-body');
		WidgetDotAnimOpen(true);
		setTimeout(function(){
			var widgetImageLGWG  = document.getElementById('widgetImageLGWG');
			LGWGService.setImageHeight(visualObjNewPopup, widgetImageLGWG, LGWGNewDotformBlock, LGWGNewDotButtonBlock, LGWGNewDotFormExtBlock);
			getTopOfColorPod();
			setMaskStyles();
			WidgetDotOffAnim(true);
		}, 700);
		setTimeout(function(){
			bodyElement.classList.remove('lgwg-op-hid-imp-body');
		}, 800);
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
	 *Widget Dot Off animation
	 */
	function WidgetDotOffAnim (noTarget) {
		if (mobileOpen) {
			mainHTMLElement.classList.remove('mobile-lgwg-active-w');
			mobileOpen = false;
		}

		openWidgetDetect = false;
		mainBodyElement.classList.remove('mobile-non-scroll-main-position');
		LGWGNewCloseBtn.classList.add('lgwg-op-hid');
		LGWGNewBlockLinkF.classList.add('lgwg-op-hid');
		dotCircleCl.classList.remove('dot-lgwg-is-active');
		LGWGWidgetAndCloseBlock.classList.remove('active');
		divElementForH.classList.remove('active');
		LGWGWidgetAndCloseBlock.classList.add('lgwgnew-widget-anim-start');
		setTimeout(function() {
			LGWGWidgetAndCloseBlock.classList.add('lgwgnew-widget-start');
			LGmainBlockDot.classList.add('widget1-start-n');

			LGWGNewDotWidgetImage.classList.add('lgwg-op-hid');
			LGWGNewDotWidgetMainWr.classList.add('lgwg-op-hid');
			LGWGNewColorPod.classList.add('lgwg-op-hid');
		}, 500);
		

		if (isMobile.any()) {
			LGmainBlockDot.classList.remove('widget1-resp-class');
		}

		document.body.classList.remove('dot-hunter-open-more-z');

		//loop through each Youtube player instance and call stopVideo()
	    setTimeout(function() {
		    for (var i in videoPlayers) {
		        var player = videoPlayers[i];
		        var iframeSrc = player.src;
	        	player.src = iframeSrc.replace('?autoplay=1&rel=0', '');
		    }
		    stopInitBgVideo();
	    }, 1000);

	    if (!noTarget) {
	    	window.top.LeadCore.isWidgetActive.pop();
		}

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
		thankBlockToOpen.classList.remove('lgwg-none');
		thankBlockToOpen.classList.remove('lgwg-op-hid');

		LGmainBlockDot.classList.add('lgwg-op-hid');
		LGWGNewCloseBtn.classList.add('lgwg-none-imp');

		initBGThankVideo();

		thankShowTimeout = setTimeout(function() {
			LGWGNewPulseCBDetect = false;
	 		// addPulse();
			WidgetDotOffAnim();
			closeThankCallback();
		}, thankTInterval);
	}

	function closeThankCallback() {
		thankBlockToOpen.classList.add('block-thank-small');
		setTimeout(function() {
			thankBlockToOpen.classList.add('lgwg-none');
			thankBlockToOpen.classList.add('lgwg-op-hid');
			LGmainBlockDot.classList.remove('lgwg-op-hid');
			thankBlockToOpen.classList.remove('block-thank-small');
		}, 500);
		setTimeout(function() {
			LGWGNewCloseBtn.classList.remove('lgwg-none-imp');
		}, 800);
	}


	/*************************************************************************
	 *Widget Dot off and show Thank
	 */
	function WidgetDotOffandNoShowThank() {
		LGWGNewCloseBtn.classList.add('lgwg-none-imp');
		WidgetDotOffAnim();
		setTimeout(function() {
			LGWGNewCloseBtn.classList.remove('lgwg-none-imp');
		}, 800);
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
				LGWGService.showHideDigits(item.design.nullData, daysWR, hoursWR, minutesWR);
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
    		WidgetDotOffAnim();
    	}
    }


	/*************************************************************************
	 *pulseDefDot function
	 */
	// function pulseDotNewW() {

	//     function pulseGreen() {
	//         LGWGNewDotFill1.classList.toggle('lg-wg-w2-dot-circle-fill1-animate');
	//     }
	//     function pulseWhite() {
	//         LGWGNewDotFill2.classList.toggle('lg-wg-w2-dot-circle-fill2-animate');
	//     }

	//     setTimeout(pulseGreen, 500);
	//     setTimeout(pulseGreen, 1550);
	//     setTimeout(pulseWhite, 1000);
	//     setTimeout(pulseWhite, 2050);
	// }
	// var setIntervalIDPulse = setInterval(pulseDotNewW, 5000);


	function openDotIfMobile() {
		var LGwidgetPlashka     = document.querySelector('.widget2-plashka');
		var LGwidgetPlashkaText = document.querySelector('.widget2-plashka-text');
	    LGWGNewPulseCBDetect = true;
	    // removePulse();
	    if(LGwidgetPlashkaText) {
	    	LGwidgetPlashkaText.classList.add('lgwg-op-hid');
		}
		setTimeout(function() {
			if(LGwidgetPlashka) {
				LGwidgetPlashka.classList.add('lgwg-op-hid');
				LGwidgetPlashka.classList.add('widget2-plash-start');
			}
		}, 100);
	    WidgetDotOnAnim();
	    LeadCore.pushTargetAction(0, widgetLGWGDotId);
	    document.body.classList.add('dot-hunter-open-more-z');
	} 

	/*************************************************************************
	 *Dot circle and main set widget Block
	 */
	function dotCircleWidgetStyle () {

		var LGwidgetPlashka     = window.top.document.querySelector('.widget2-plashka');
		var LGwidgetPlashkaText = window.top.document.querySelector('.widget2-plashka-text');
		var LGelementCallCircleNew = window.top.document.querySelector('.widget2');

		//Placement for widget
		if (visualObjNewPopup.dhVisual.place === LeadCore.constants.leftBottomCorner) {
			LGVisualMainBlock.classList.add('wv-b-left');
		}
		if (visualObjNewPopup.dhVisual.place === LeadCore.constants.rightBottomCorner) {
			LGVisualMainBlock.classList.add('wv-b-right');
		}

		if (typeof labelPositionNew !== "undefined") {
			if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
				LGVisualMainBlock.style.bottom = 0 + 'px';
			}
		}

		//Show or hidden tooltip
		if (visualObjNewPopup.dhVisual.enable === false) {
			LGwidgetPlashka.classList.add('lgwg-none');
		}

		//Pulse or not animation for dot circle
		if (visualObjNewPopup.dhVisual.enableBlink === true) {
			var pulseElementsArray = window.top.document.getElementsByClassName('lg-wg-pulse-el');
			for (var i=0; i < pulseElementsArray.length; i++) {
				pulseElementsArray[i].classList.add('lgwg-none-imp');
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


		thankBtnOnAdv.addEventListener(lgwgClickEvent, function() {
			clearTimeout(thankShowTimeout);
			LGWGNewPulseCBDetect = false;
			// addPulse();
			WidgetDotOffAnim();
			closeThankCallback();
			event.stopPropagation();
		});

		thankCloseBtnAdv.addEventListener(lgwgClickEvent, function() {
			clearTimeout(thankShowTimeout);
			LGWGNewPulseCBDetect = false;
			// addPulse();
			WidgetDotOffAnim();
			closeThankCallback();
			event.stopPropagation();
			event.preventDefault();
		});

	

		/********************************************************************
		 *Open or hide widget
		 */


		let isOpened = false
		let rot = 90
		const icon = LGelementCallCircleNew.childNodes[0]

		const changeIco = (ico) => {
			icon.style.background = `url("dev/resources/${ico}.svg") no-repeat`
			icon.style.marginTop = isOpened ? '0' : '10px'
		
		}

		const modal = document.querySelector('.point__modal')
		const promo = document.querySelector('.point__promo')
		const modalNodes = []

		modal.childNodes.forEach(node => {
			if (node.tagName !== undefined && node.hasChildNodes()) {
					modalNodes.push(node)
					modalNodes.push(...node.querySelectorAll('*'));
			}
	
		})

		modalNodes.push(promo)


		LGelementCallCircleNew.addEventListener(lgwgClickEvent, function() {
			isOpened = !isOpened
			LGelementCallCircleNew.style.transform = `rotate(${rot}deg)`
			rot = isOpened ? 0 : rot + 90

			modalNodes.forEach(node => {
				node.style.opacity = isOpened ? '1' : '0'
			})
			if (isOpened) {				
				LGWGNewPulseCBDetect = true;
				changeIco('delete')
		    // removePulse();
		    LGwidgetPlashkaText.classList.add('lgwg-op-hid');
			setTimeout(function() {
	    		LGwidgetPlashka.classList.add('lgwg-op-hid');
	    		LGwidgetPlashka.classList.add('widget2-plash-start');
	    	}, 100);
		    WidgetDotOnAnim();

			



		
			

		    //LeadCore.pushTargetAction(0, widgetLGWGDotId);
			} else {
				changeIco('twitter')
				LGWGNewCloseBtn.classList.add('lgwg-op-hid-imp');
				LGWGNewPulseCBDetect = false;
				// addPulse();
				WidgetDotOffAnim();
				setTimeout(function() {
					LGWGNewCloseBtn.classList.remove('lgwg-op-hid-imp');
				}, 1000)
			}
		    
		});


		// LGWGNewCloseBtn.addEventListener(lgwgClickEvent, function() {
			
		// });

		if (LGWGbtnExitLGWG) {
			LGWGNewCloseBtn.classList.add("lgwg-none-imp-forever");
			LGWGbtnExitLGWG.addEventListener('click', function(event) {
				LGWGNewPulseCBDetect = false;
				// addPulse();
				WidgetDotOffAnim();
				event.stopPropagation();
				LeadCoreExt.openCouponCallback(widgetLGWGDotId, visualObjNewPopup.exit, "exit", null, metrikaId, onTargetScript);
			});
		}

		if (LGWGbtnExitButtonLGWG) {
			LGWGNewCloseBtn.classList.add("lgwg-none-imp-forever");
			LGWGbtnExitButtonLGWG.addEventListener('click', function(event) {
				LGWGNewPulseCBDetect = false;
				// addPulse();
				WidgetDotOffAnim();
				event.stopPropagation();
				LeadCoreExt.openCouponCallback(widgetLGWGDotId, visualObjNewPopup.exit, "exit", null, metrikaId, onTargetScript);
			});
		}
		
		if (typeof LeadCore.smartParams !== "undefined") {
			var urlDot;
			if (LeadCore.smartParams.logo) {
				LGWGNewBlockLinkF.classList.add('lgwg-none-imp');
				LGVisualMainBlock.classList.add('lgwg-none-leadlink');
			}
			else {
				urlDot = "https://leadgenic.ru/welcome/?utm_source="+document.domain+"&utm_campaign=widget_dotHunter";
				LGWGNewDotBtnF.setAttribute("href", urlDot);
				if (LeadCore.smartParams.refLink) {
					urlDot = "https://leadgenic.ru/welcome?refid="+LeadCore.smartParams.refId+"&utm_source="+document.domain+"&utm_campaign=widget_dotHunter";
					LGWGNewDotBtnF.setAttribute("href", urlDot);
				}
			}
		}
		else {
			LGWGNewBlockLinkF.classList.add('lgwg-none-imp');
			LGVisualMainBlock.classList.add('lgwg-none-leadlink');
		}
	}

	/********************************************************************
	 *Tooltip show or hide
	 */
	function plashkaSetupStart() {
		var LGwidgetPlashka        = window.top.document.querySelector('.widget2-plashka');
		var LGwidgetPlashkaText    = window.top.document.querySelector('.widget2-plashka-text');
		var LGelementCallCircleNew = window.top.document.querySelector('.widget2');
		
		if (!isMobile.any()) {

			//Autoshow plashka
			if (visualObjNewPopup.dhVisual.enable && !LeadCore.getCookie('newDotLGWGPlashkaLock').length) {
				(function () {
					setTimeout(function() {
						if (!LGWGWidgetAndCloseBlock.classList.contains('active')) {
							LeadCore.setCookie('newDotLGWGPlashkaLock', LeadCore.siteId, 0.5); //12 hours
							showPlashka();
						    // removePulse();

						    LGwidgetPlashka.addEventListener('mouseleave', function() {
								hidePlashka();
							});
							LGwidgetPlashka.addEventListener('click', function() {
								LGWGNewDotCallCircle.click();
							});
						}
				    }, 5000);
				})();
			}

			
			LGelementCallCircleNew.addEventListener('mouseenter', function() {
				if (!LGWGWidgetAndCloseBlock.classList.contains('active')) {
			    	showPlashka();
			    }
			    // removePulse();
			});

			LGelementCallCircleNew.addEventListener('mouseleave', function() {
				hidePlashka();
			});

			function showPlashka() {
				LGwidgetPlashka.classList.remove('lgwg-op-hid');
		    	LGwidgetPlashka.classList.remove('widget2-plash-start');
		    	setTimeout(function() {
		    		LGwidgetPlashkaText.classList.remove('lgwg-op-hid');
		    	}, 100);
			}

			function hidePlashka() {
				LGwidgetPlashkaText.classList.add('lgwg-op-hid');
				setTimeout(function() {
		    		LGwidgetPlashka.classList.add('lgwg-op-hid');
		    		LGwidgetPlashka.classList.add('widget2-plash-start');
		    	}, 50);
				
			    if (!LGWGNewPulseCBDetect) {
			    	// addPulse();
				}
			}
		}
	}

	function removePulse () {
		var LGWGPulseSh = window.top.document.getElementsByClassName('lg-wg-pulse-sh');
		clearInterval(setIntervalIDPulse);
		for (var i=0; i < LGWGPulseSh.length; i++) {
			LGWGPulseSh[i].classList.add('lgwg-none');
		}
	}
	function addPulse () {
		var LGWGPulseSh = window.top.document.getElementsByClassName('lg-wg-pulse-sh');
		setIntervalIDPulse = setInterval(pulseDotNewW, 5000);
	    for (var i=0; i < LGWGPulseSh.length; i++) {
			LGWGPulseSh[i].classList.remove('lgwg-none');
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
							this.onkeypress = function (e) {
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
					title: "Заявка с сайта (" + widgetLGWGDotName + ")",
					pageTitle: docTitle,
					widgetId: widgetLGWGDotId
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
						widgetLGWGNewPopupId: widgetLGWGDotId,
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
						if(LGWGNewCloseBtn) {
							LGWGNewCloseBtn.classList.add('lgwg-op-hid-imp');
							setTimeout(function() {
								LGWGNewCloseBtn.classList.remove('lgwg-op-hid-imp');
							}, 1000);
						}
						if (btn.classList.contains('form-ext-button-target-action-true')) {
							LeadCore.pushTargetAction(1, widgetLGWGDotId);
							LeadCore.sendAnalyticGlobal(metrikaId);
						}

						closeWidget();
					} else if (btn.classList.contains('form-ext-button-type3')) {
						// Redirect

						if (btn.classList.contains('form-ext-button-target-action-true')) {
							LeadCore.pushTargetAction(1, widgetLGWGDotId);
							LeadCore.sendAnalyticGlobal(metrikaId);
						}
						
						LGWGService.redirectIfOn(null, btn.classList.contains('form-ext-button-redirect-blank-true'), btn.getAttribute('data-url'));
					}
				});
			}
		})();

		function sendForm(btn, redirectData) {
			var paramsToSend = {
				title: "Заявка с сайта (" + widgetLGWGDotName + ")",
				pageTitle: docTitle,
				widgetId: widgetLGWGDotId,
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
					widgetLGWGNewPopupId: widgetLGWGDotId,
					widgetObj: visualObjNewPopup,
					redirectData: redirectData,
					WidgetDotOffandNoShowThank: WidgetDotOffandNoShowThank,
					WidgetDotOffandShowThank: WidgetDotOffandShowThank
				};
				LGWGService.sendRequestForm(paramsToSend, serviceData, "formExt", btn);
			}
		}

		function closeWidget() {
			WidgetDotOffAnim();
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
				LeadCore.pushTargetAction(1, widgetLGWGDotId);
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
				LeadCore.pushTargetAction(1, widgetLGWGDotId);
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
	function soundBeepNewDot() {
		if (autoInviteObjNewDot.sound.enable) {
			var audio = new Audio(); 
			audio.src = soundBeepNewDotUrl; 
			audio.autoplay = true; 
		}
	}

	var LGWGNewDotCallCircle = window.top.document.querySelector('.widget2');

	if (isMobile.any()) {
		autoInviteObjNewDot.inactive.enabled = false;
	}

	if (!restrDotNewDot.unique) {
		restrDotNewDot.unique = {
			enable: false
		}
	}
	if (!restrDotNewDot.action) {
		restrDotNewDot.action = {
			enable: false
		}
	}

	if (typeof restrDotNewDot.count === "undefined") {
		restrDotNewDot.count = {
	        enable: false,
	        count: 1,
	        unit: 'SEC',
	        interval: 1
	    }
	}

	if (typeof autoInviteObjNewDot.ruleLogic === "undefined") {
		autoInviteObjNewDot.ruleLogic = LeadCore.constants.autoinviteAND;
	}

	var LGWGNewDotDetect = {pages: false, seconds: false, percent: false, inactive: false, exit: false};

	var cookies = {
		countShowsCloseLock: 'newDotLGWGCountShowsCloseLock'+idForSetUniqueLock,
		countTimeCloseLock: 'newDotLGWGCountTimeCloseLock'+idForSetUniqueLock,
		closeLockUnique: 'newDotLGWGCloseLock'+idForSetUniqueLock,
		closeLock: 'newDotLGWGCloseLock',
		targetLock: 'newDotLGWGTargetLock',
		actionLock: 'LGWGActionLock'
	};

	setTimeout(function() {
		if (isMobile.any() && autoInviteObjNewDot.exit.enable && autoInviteObjNewDot.ruleLogic === LeadCore.constants.autoinviteAND) {
			// TODO: Check https://gitlab.com/LeadGenic/leadgeniccore/-/issues/1519
			//return false;
		}
		newLink200();
		initThankBlockSize();
		appearWidgetDot();
		plashkaSetupStart();
		fireAutoStartWidgets();
	}, 1000);

	function getRuleSpecification(autoInviteParams) {
		return autoInviteParams.pages.enable || autoInviteParams.seconds.enable || autoInviteParams.percent.enable || autoInviteParams.inactive.enabled || LeadCoreExt.isExitIntent(autoInviteObjNewDot.exit);
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
		restrictions: restrDotNewDot,
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
			    if( e.clientY <= 0 && LeadCoreExt.isExitIntentReadyToShow(LGWGNewDotDetect.exit)) {
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
				if (autoInviteObjNewDot.pages.enable) {

					if ((LeadCore.visit.visitInfo.actionsCount >= (autoInviteObjNewDot.pages.value - 1)) && !window.top.LeadCore.isWidgetActive.length) {
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
				if (isMobile.any() && autoInviteObjNewDot.ruleLogic === LeadCore.constants.autoinviteOR) {
					LGWGNewDotDetect.exit = true;
					return false;
				}
				if (isMobile.any() && LeadCoreExt.isExitIntentMobile(autoInviteObjNewDot.exit)) {
					mobileExitIntentHanler();
				} else if (LeadCoreExt.isExitIntentDesktop(autoInviteObjNewDot.exit)) {
					desktopExitIntentHanler()
				} else {
					LGWGNewDotDetect.exit = true;
				}
			})();


			/*************************************************************************
			 *Autoinvite if seconds
			 */
			(function () {
				if (autoInviteObjNewDot.seconds.enable) {
					
					LGWGNewDotDetect.seconds = false;
					setTimeout(function() {
						LGWGNewDotDetect.seconds = true;
						ruleForAutoInviteNotDelay();
					}, autoInviteObjNewDot.seconds.value*1000);
				}
				else {
					LGWGNewDotDetect.seconds = true;
				}
			})();


			/*************************************************************************
			 *Autoinvite if percent
			 */
			(function () {
				if (autoInviteObjNewDot.percent.enable) {
					
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
						
						var percentPageValue = (getDocumentHeight() / 100) * autoInviteObjNewDot.percent.value;
						
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
				if (autoInviteObjNewDot.inactive.enabled) {
					
					var autoInviteNewDotInAct = false;
					var timeFirstInAct = setTimeout(function() {
						autoInviteNewDotInAct = true;
						LGWGNewDotDetect.inactive = true;
						ruleForAutoInviteNotDelay();
					}, autoInviteObjNewDot.inactive.value * 1000); 

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
							}, autoInviteObjNewDot.inactive.value * 1000); 
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
				if (isMobile.any() && LeadCoreExt.isExitIntentMobile(autoInviteObjNewDot.exit)) {
					mobileExitIntentHanler();
				} else if (LeadCoreExt.isExitIntentDesktop(autoInviteObjNewDot.exit)) {
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
						soundBeepNewDot();
						if (!isMobile.any()) {
							LGWGNewDotCallCircle.click();
						} else {
							openDotIfMobile();
						}
					}
				}
			}, 100);

			function checkAllParamsForStart(params) {
				if (autoInviteObjNewDot.ruleLogic === LeadCore.constants.autoinviteAND) {
					return params.percent && params.pages && params.seconds && params.inactive && params.exit;
				} else if (autoInviteObjNewDot.ruleLogic === LeadCore.constants.autoinviteOR) {
					return params.percent || params.pages || params.seconds || params.inactive || params.exit;
				}
			}
		}

		function ifOneAutoEnable() {
			return !window.top.LeadCore.isWidgetActive.length && restrictionWidget.checkAllRestrictions() && getRuleSpecification(autoInviteObjNewDot); 
		}
	}

	/*************************************************************************
	 *Click on element action
	 */
	(function () {
		if(autoInviteObjNewDot.click && autoInviteObjNewDot.click.enable) {
			var selectorToClick = autoInviteObjNewDot.click.value;

			if(selectorToClick) {
				var elementsToClick = window.top.document.querySelectorAll(selectorToClick);
				for (var i = 0; i < elementsToClick.length; i++) {
				    elementsToClick[i].addEventListener('click', function(event) {
				    	if(window.top.LeadCore.isWidgetActive.length == 0) {
				    		soundBeepNewDot();
					    	if (!isMobile.any()) {
								LGWGNewDotCallCircle.click();
							} else {
								openDotIfMobile();
							}
						}
				    });
			  	}
			}
		}
	})();

	/*************************************************************************
	 *Target action
	 */
	(function () {
		var clickTargetAct = LGVisualMainBlock.querySelectorAll('.click-lgwg-dot-target');

		for (var i = 0; i < clickTargetAct.length; i++) {
			var clickTargetActCur = clickTargetAct[i];

			clickTargetActCur.addEventListener('click', function(e) {
				if (restrDotNewDot.target.mode == 2) {
					LeadCore.setCookie('newDotLGWGTargetLock', LeadCore.siteId, 7);
				}
				if (restrDotNewDot.target.mode == 0) {
					LeadCore.setCookie('newDotLGWGTargetLock', LeadCore.siteId, (restrDotNewDot.target.gap / 24));
				}
			});
		} 
	})();

	/*************************************************************************
	 *Close widget Lock
	 */
	(function () {
		var clickCloseLock = LGVisualMainBlock.querySelectorAll('.click-lgwg-dot-close-lock');

		for (var i = 0; i < clickCloseLock.length; i++) {
			var clickCloseLockCur = clickCloseLock[i];

			clickCloseLockCur.addEventListener('click', function(e) {
				if (restrDotNewDot.autoinvite.enable) {
					LeadCore.setCookie('newDotLGWGCloseLock', LeadCore.siteId, (restrDotNewDot.autoinvite.gap / 24));
				}
			});
		} 
	})();

	/*************************************************************************
	 *Get link for social buttons
	 */
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
				w: LGWGWidgetAndCloseBlock.classList.contains("active") ? LGWGWidgetAndCloseBlock.offsetWidth : "0", 
				h: LGWGWidgetAndCloseBlock.classList.contains("active") ? LGWGWidgetAndCloseBlock.offsetHeight  : "0"
			}; 
		
			window.top.postMessage(dataSend, window.top.location);
		};
		var f1000 = throttle(funcSend, 1000);

		document.getElementById("testIframe").contentWindow.addEventListener('resize', function() {
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

		    	func.apply(this, arguments); // (1)

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
				
				LeadCore.pushTargetAction(1, widgetLGWGDotId);
				if (onTargetScript) {
					LeadCoreExt.buildWidgetScript(onTargetScript);
				}
				LeadCore.sendAnalyticGlobal(metrikaId);
				event.preventDefault();
				event.stopPropagation();

				if(event.target.getAttribute("data") == "pinterest") {
					window.top.PinUtils.pinAny();
					setTimeout(function() {
						LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
						LeadCoreExt.openCouponCallback(widgetLGWGDotId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
					}, 500);
					return;
				}
				
				if(event.target.getAttribute("data") == "print") {
					window.top.print();
					setTimeout(function() {
						LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
						LeadCoreExt.openCouponCallback(widgetLGWGDotId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
					}, 500);
					return;
				}
				if (event.target.className.indexOf("mail") >= 0) {
					window.top.location.href = event.target.getAttribute("data");
					setTimeout(function() {
						LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOff() : closeWidgetOnMobileAfterSharing();
						LeadCoreExt.openCouponCallback(widgetLGWGDotId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
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
		// Fixes dual-screen position                         Most browsers      Firefox
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
			        LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup.social) ? WidgetDotOffAnim() : closeWidgetOnMobileAfterSharing();
			        LeadCoreExt.openCouponCallback(widgetLGWGDotId, visualObjNewPopup.social, "social", null, metrikaId, onTargetScript);
			    }
			}, 1000);
		}
	};

	function closeWidgetOnMobileAfterSharing() {
		if ((window.top.screen.availWidth <= 760) && isMobile.any()) {
			WidgetDotOffAnim();
		}
	}

	/*************************************************************************
	 *Responsive block
	 */

	function responseNewDot() {
		var LGWGNewDotWWidth = LGWGWidgetAndCloseBlock.offsetWidth;
		var inputFormArray = document.getElementsByClassName('widget-inp-bl-new-dot');
		var windowH80 = (window.innerHeight/100)*70;
		
		if ((visualObjNewPopup.dhVisual.widget_width_nopx + 80) > document.body.offsetWidth) {
			document.body.classList.add('responsive-lgwg-dot');
			LGmainBlockDot.style.width = (document.body.offsetWidth - 30) + 'px';
			LGWGNewDotThankBlock.style.width = (document.body.offsetWidth - 30) + 'px';

			for (var i=0; i < inputFormArray.length; i++) {
				inputFormArray[i].classList.remove('widget-input-gorizontal');
				if (inputFormArray[i].classList.contains('widget-input-vert-textar')) {
					//inputFormArray[i].classList.add('widget-input-gorizontal');
					inputFormArray[i].classList.remove('widget-input-gorizontal-textar');
				}
			}
			
		} else {
			document.body.classList.remove('responsive-lgwg-dot');
			//Orient form
			if (visualObjNewPopup.form.orient === LeadCore.constants.horizontal) {
				for (var i=0; i < inputFormArray.length; i++) {
					inputFormArray[i].classList.add('widget-input-gorizontal');
					if (inputFormArray[i].classList.contains('widget-input-vert-textar')) {
						inputFormArray[i].classList.remove('widget-input-gorizontal');
						inputFormArray[i].classList.add('widget-input-gorizontal-textar');
					}
				}
			}
		}
		
		LGmainBlockDot.classList.add('widget1-start-auto-test');

		var startScale = 1;
		while ((LGmainBlockDot.offsetHeight * startScale) > windowH80) {
			document.body.classList.add('responsive-lgwg-dot-l400');
			
			LGWGWidgetAndCloseBlock.style.zoom = startScale;
			startScale = startScale - 0.05;
		}
		
		LGmainBlockDot.classList.remove('widget1-start-auto-test');
	};

	
	/*************************************************************************
	 *LeadGenic link if width < 200
	 */
	function newLink200() {
		if (!isMobile.any() && (((visualObjNewPopup.dhVisual.widget_width_nopx + 80) > window.top.screen.availWidth) || (visualObjNewPopup.dhVisual.widget_width_nopx < 200))) {
			LGWGNewBlockLinkF.classList.add('lgwg-block-link-f-60');
			LGWGNewDotBtnF.innerHTML = LeadCore.constants.lgLink60;
		}
	}

	var LGWGIframeDotDiv = window.top.document.getElementById("lgwgDivIframeDot");
	if (isMobile.any()) {
		document.getElementsByTagName("body")[0].classList.add("touches-versions");
		
		if (window.top.screen.availWidth <= 760) {
			document.getElementsByTagName("body")[0].classList.add("mobile-version");
			LGWGIframeDotDiv.classList.add("lgwg-div-iframe-dot-mobile");
		}
	}

	
	
})();
