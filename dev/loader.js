
(function () {

	if (typeof LeadCore !== 'undefined') {
		return;
	}

	LeadWidgets = {
		list : {}
	};

	LeadCoreExt = {
		hiddenFieldCoupons: {},
        isOS: function() {
			return navigator.userAgent.match(/ipad|ipod|iphone/i);
		},
		buildWidgetScript: function(script) {
			var newScript  = document.createElement("script");
			newScript.type = "text/javascript";
			newScript.textContent = script;
			document.getElementsByTagName("body")[0].appendChild(newScript);
		},
		getWidgetScript: function(url) {
			return new Promise(function(resolve, reject) {

				var xhr = new XMLHttpRequest();
				xhr.open("GET", url, true);
                
				xhr.onload = function() {
					if (this.status == 200 && this.response) {
						resolve(this.response);
					} else {
						var error = new Error(this.statusText);
						error.code = this.status;
						reject(error);
					}
				};

				xhr.onerror = function() {
					reject(new Error("Network Error"));
				};

				xhr.send();
			});
		},
		parseWidgetScript: function(response) {
			var onScript = response;
			onScript = onScript.replace(/<script[^>]*>/gi, '');
    		onScript = onScript.replace(/<\/script>/gi, '');
    		//onScript = onScript.replace(/ /g, ''); 
    		return onScript;
		},
		parseFieldsForWidgetScript: function(script, data) {
			var targetScript = script;
    		if (data.email) {
    			targetScript = targetScript.replace(/{__email__}/g, data.email);
    		}
    		if (data.firstName) {
    			targetScript = targetScript.replace(/{__name__}/g, data.firstName);
    		}
    		if (data.phone) {
    			targetScript = targetScript.replace(/{__phone__}/g, data.phone);
    		}
    		if (data.comment) {
    			targetScript = targetScript.replace(/{__message__}/g, data.comment);
    		}
    		return targetScript;
		},
        getPromise: function(url) {
			return new Promise(function(resolve, reject) {

				var xhr = new XMLHttpRequest();
				xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

				xhr.onload = function() {
					if (this.status == 200 && this.response) {
						resolve(this.response);
					} else {
						var error = new Error(this.statusText);
						error.code = this.status;
						reject(error);
					}
				};

				xhr.onerror = function() {
					reject(new Error("Network Error"));
				};

				xhr.send();
			});

		},
		isExitIntent: function(exitData) {
			return ((exitData.enable || exitData.enabled) && typeof exitData.desktopEnable === 'undefined' && typeof exitData.mobileEnable === 'undefined') || 
				((exitData.enable || exitData.enabled) && (((typeof exitData.desktopEnable !== 'undefined') && exitData.desktopEnable) || ((typeof exitData.mobileEnable !== 'undefined') && exitData.mobileEnable)));
		},
		isExitIntentDesktop: function(exitData) {
			return ((exitData.enable || exitData.enabled) && typeof exitData.desktopEnable === 'undefined' && typeof exitData.mobileEnable === 'undefined') || 
				((exitData.enable || exitData.enabled) && ((typeof exitData.desktopEnable !== 'undefined') && exitData.desktopEnable));
		},
		isExitIntentMobile: function(exitData) {
			return ((exitData.enable || exitData.enabled) && typeof exitData.desktopEnable === 'undefined' && typeof exitData.mobileEnable === 'undefined') || 
				((exitData.enable || exitData.enabled) && ((typeof exitData.mobileEnable !== 'undefined') && exitData.mobileEnable));
		},
		isExitIntentReadyToShow: function(exit) {
			return !exit && !LeadCore.isWidgetActive.length;
		},
		setCouponBtnHandler: function(btn, couponValue, lgwgClickEvent, couponCopyAction) {
            btn.addEventListener(lgwgClickEvent, function(event) {
                var _this = this;
                event.stopPropagation();

                if (!couponValue) return;
                LeadCoreExt.LGWGCopyToClipboard(couponValue, function() {
                    _this.classList.add("element-coupon-copied");
                    setTimeout(function() {
                        _this.classList.remove("element-coupon-copied");
                    }, 3000);
                    if (couponCopyAction.isCouponCopyAction && couponCopyAction.metrikaId) {
                    	if (!LeadCore.getCookie('LGWGCouponCopyActionLock'+couponCopyAction.metrikaId).length) {
                    		LeadCore.setCookie('LGWGCouponCopyActionLock'+couponCopyAction.metrikaId, LeadCore.siteId, 0.007);
	                    	LeadCore.pushTargetAction(1, couponCopyAction.metrikaId);
	                    	if (couponCopyAction.onTargetScript) {
	                    		LeadCoreExt.buildWidgetScript(couponCopyAction.onTargetScript);
	                    	}
	                    	LeadCore.sendAnalyticGlobal(couponCopyAction.metrikaId);
                    	}
                    }
                });
            });
		},
        getCoupon: function(dParams, btn, couponEl, lgwgClickEvent, couponCopyAction) {
            var EMPTY_COUPON = "&nbsp;";
            var couponElLoader = btn.querySelector(".element-coupon-loader");
			var targetUrl = dParams.base + "/api/gate/sites/" + dParams.siteId + "/visits/" + dParams.visitId + "/coupons/" + dParams.couponCode;

            couponEl.innerHTML = EMPTY_COUPON;

			LeadCoreExt.getPromise(targetUrl).then(function(response) {
				var result = JSON.parse(response).data;
				if (result) {
                    couponEl.innerHTML = result.value;
                    btn.classList.remove("non-coupon-value");
                    couponElLoader.classList.add("lgwg-none");

                    if (!LeadCoreExt.hiddenFieldCoupons[couponCopyAction.metrikaId]) {
                    	LeadCoreExt.hiddenFieldCoupons[couponCopyAction.metrikaId] = [];
                    }
                    LeadCoreExt.hiddenFieldCoupons[couponCopyAction.metrikaId].push(result.value);
                    LeadCoreExt.setCouponBtnHandler(btn, result.value, lgwgClickEvent, couponCopyAction);
				} else {
                    couponEl.innerHTML = EMPTY_COUPON;
                    couponElLoader.classList.add("lgwg-none");
				}
			}, function(error) {
                couponEl.innerHTML = EMPTY_COUPON;
                couponElLoader.classList.add("lgwg-none");
			});
		},
        LGWGCopyToClipboard: function(str, callback) {
            var el = document.createElement("textarea");
            el.value = str;
            el.setAttribute("readonly", "");
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);

            var selected;
            // handle iOS as a special case
            if (LeadCoreExt.isOS()) {
                // save current contentEditable/readOnly status
                var editable = el.contentEditable;
                var readOnly = el.readOnly;

                // convert to editable with readonly to stop iOS keyboard opening
                el.contentEditable = true;
                el.readOnly = true;

                // create a selectable range
                var range = document.createRange();
                range.selectNodeContents(el);

                // select the range
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                el.setSelectionRange(0, 999999);

                // restore contentEditable/readOnly to original state
                el.contentEditable = editable;
                el.readOnly = readOnly;
            } else {
                selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
                el.select();
            }

            document.execCommand("copy");
            document.body.removeChild(el);

            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
            callback();
		},
        initCouponClickOperation: function(LGWGCouponWrappers, lgwgClickEvent, dParam, couponCopyAction) {
            for (var i = 0; i < LGWGCouponWrappers.length; i++) {
                var btn = LGWGCouponWrappers[i];

                var couponEl = btn.querySelector(".element-coupon-name");
				if (!dParam) return;
                dParam["couponCode"] = couponEl.getAttribute("data-ccode");

                if (!couponCopyAction.isCouponCopyAction && couponCopyAction.couponElements && couponCopyAction.couponElements.length) {
                	var couponModel = couponCopyAction.couponElements.filter(function(el) {
			        	return el.counter == couponEl.getAttribute("data-ccounter");
			        });
			        couponCopyAction.isCouponCopyAction = couponModel[0].isCopyAction;
                }

                LeadCoreExt.getCoupon(dParam, btn, couponEl, lgwgClickEvent, couponCopyAction);
            }
		},
        initFormCouponClickOperation: function(LGWGCouponWrappers, lgwgClickEvent, couponValue, couponCopyAction) {
            var EMPTY_COUPON = "&nbsp;";
            for (var i = 0; i < LGWGCouponWrappers.length; i++) {
                var btn = LGWGCouponWrappers[i];

                var couponEl = btn.querySelector(".element-coupon-name");
                couponEl.innerHTML = couponValue;
                var couponElLoader = btn.querySelector(".element-coupon-loader");
                couponElLoader.classList.add("lgwg-none");

                if (couponValue !== EMPTY_COUPON) {
                    btn.classList.remove("non-coupon-value");
                    LeadCoreExt.setCouponBtnHandler(btn, couponValue, lgwgClickEvent, couponCopyAction);
                }
            }
        },
        isItSocialCallbackCoupon: function(_) {
            return _.couponCallback && _.couponCallback.enable;
		},
        isItExitCallbackCoupon: function(_) {
            return _.couponCallback && _.couponCallback.enable;
        },
        isItFormCallbackCoupon: function(_) {
            return _.enable && _.couponCallback && _.couponCallback.enable;
        },
        openCouponCallback: function(widgetId, couponModel, type, couponValue, metrikaId, onTargetScript) {
            if (couponModel.couponCallback && couponModel.couponCallback.enable) {
                var iframeCC = document.getElementById(widgetId + "__iframe__" + type);
                iframeCC.contentWindow.showCC(widgetId, couponModel, couponValue, metrikaId, onTargetScript);

                var divElementCC = document.getElementById(widgetId + "__div__" + type);
                divElementCC.classList.remove("wv-cc-none-start-pop");
			}
        },
        startCouponCallbackInit: function(widgetSettings, widgetId, type) {
            if ((type === "exit" && LeadCoreExt.isItExitCallbackCoupon(widgetSettings.exit)) ||
                (type === "form" && LeadCoreExt.isItFormCallbackCoupon(widgetSettings.form)) ||
                (type === "formExt" && LeadCoreExt.isItFormCallbackCoupon(widgetSettings.formExt)) ||
                (type === "social" && LeadCoreExt.isItSocialCallbackCoupon(widgetSettings.social))) {
                LeadCoreExt.openCouponCallback(widgetId, type);
			}
		},
		isCouponAndPossibleToCloseWidget: function(widgetElementSettings) {
			return (typeof widgetElementSettings.couponCallback !== "undefined") && 
				   (typeof widgetElementSettings.couponCallback.coupon !== "undefined") &&
				   widgetElementSettings.couponCallback.enable &&
				   widgetElementSettings.couponCallback.coupon.closeAfter;
		},
		isCouponAndPossibleToCopyAction: function(widgetElementSettings) {
			return (typeof widgetElementSettings.couponCallback !== "undefined") && 
				   (typeof widgetElementSettings.couponCallback.coupon !== "undefined") &&
				   widgetElementSettings.couponCallback.coupon.isCopyAction;
		}
	};

	LeadCoreDEV = {
		scriptTagUrl: {
			dev: "localhost:9999/getscript",
			labs: "labs.leadgenic.ru/getscript",
			production: "gate.leadgenic.ru/getscript",
		},
		baseUrl: {
			dev: "http://localhost:9999",
			labs: "https://labs.leadgenic.ru",
			production: "https://gate.leadgenic.ru"
		},
		currentMode: "dev" 
	};

	getLGSiteIdFromScript = function() {
	  var scripts = document.getElementsByTagName("script");

	  for (var i=0; i<scripts.length; i++) {
	  	var matchUrl = LeadCoreDEV.scriptTagUrl[LeadCoreDEV.currentMode];
	  	if (LeadCoreDEV.currentMode === "production") {
	  		var matchUrl2 = "gate.leadgenic.com/getscript";
	  	}
	    if ((scripts[i].src.indexOf("/" + matchUrl) > -1) || (matchUrl2 && scripts[i].src.indexOf("/" + matchUrl2) > -1)) {
	      var pa = scripts[i].src.split("?").pop().split("&");

	      var p = {};
	      for(var j=0; j<pa.length; j++) {
	        var kv = pa[j].split("=");
	        p[kv[0]] = kv[1];
	      }
	      return p.site || null;
	    }
	  }
	  // No scripts match
	  return {};
	};

	LeadCore = {
	    getUserTime: function() {
	        var udate = new Date();
	        return udate.getHours() * 3600000 + udate.getMinutes() * 60000 + udate.getSeconds() * 1000;
	    },
		constants: {
            lgLinkStatic: "Хотите такой же виджет на свой сайт?",
			lgLink: "Хотите такой же виджет на свой сайт?",
			workOn: "Работает на ",
			workOnLg: "Работает на LeadGenic",
			lgLink60: "LeadGenic",
			fromStoS: "От края до края",
			onCenter: "По центру",
			fromRight: "Справа",
			fromLeft: "Слева",
			fromBottom: "Снизу",
			fromTop: "Сверху",
			ownValue: "Собственная",
			auto: "Авто",
			horizontal: "Горизонтальная",
			vertical: "Вертикальная",
			fromBottomBorder: "От нижней границы",
			onCenterWidget: "По центру виджета",
			underContent: "Под контентом",
			toAllWidth: "На всю ширину",
			leftBottomCorner: "Левый нижний угол",
			rightBottomCorner: "Правый нижний угол",
			leftBrowserSide: "Левая сторона браузера",
			rightBrowserSide: "Правая сторона браузера",
			topLeftCorner: "Верхний левый угол",
			topCenterCorner: "Сверху по центру",
			topRightCorner: "Верхний правый угол",
			centerLeftCorner: "Слева по центру",
			centerCenterCorner: "По центру окна браузера",
			centerRightCorner: "Справа по центру",
			bottomLeftCorner: "Нижний левый угол",
			bottomCenterCorner: "Снизу по центру",
			bottomRightCorner: "Нижний правый угол",
			orderFromSite: "Заявка с сайта",
			findForYouThisSite: "Нашел для тебя этот сайт",
			lookAt: "Посмотри:",
			alignOnCenter: "По центру",
			alignOnTop: "По верхнему краю",
			alignOnBottom: "По нижнему краю",
			alignToAllSize: "Растянуть по ширине и высоте блока",
			alignToUserSize: "Установить произвольные габариты",
			fullWidgetArea: "Вся площадь виджета",
            onlyContentWidgetArea: "Только над контентом",
            onlyContentWidgetAreaUnder: "Только под контентом",
			autoinviteAND: "при соблюдении ВСЕХ активированных правил",
			autoinviteOR: "при соблюдении ЛЮБОГО ИЗ активированных правил"
		},
		isMobile: {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			Firefox: function() {
				return navigator.userAgent.match(/Firefox/i);
			},
			Edge: function() {
				return navigator.userAgent.match(/Edge/i);
			},
			any: function() {
				return (LeadCore.isMobile.Android() || LeadCore.isMobile.BlackBerry() || LeadCore.isMobile.iOS() || LeadCore.isMobile.Opera() || LeadCore.isMobile.Windows());
			}
		},
		createLGWGElement: function(name, attributes ) {
			var el = document.createElement(name);
			if (typeof attributes == 'object') {
				for (var i in attributes) {
					el.setAttribute(i, attributes[i]);

					if ( i.toLowerCase() == 'class' ) {
						el.className = attributes[i]; // for IE

					} else if ( i.toLowerCase() == 'style' ) {
						el.style.cssText = attributes[i]; // for IE
					}
				}
			}
			for (var i = 2; i < arguments.length; i++) {
				var val = arguments[i];
				if (typeof val == 'string') {
					el.innerHTML = val;
					val = document.createTextNode('');
				};
				el.appendChild(val);
			}
			return el;
		},
		server: {
			protocol        : null,
			domain          : null,
			port            : null,
			iframe          : null,
			getIframePath   : function() {
				return this.protocol + "://" + this.domain + ((this.port.length > 0 && this.port !== "80")?this.port:"") + "/" + this.iframe;
			},
			getDomainPath   : function() {
				return this.protocol + "://" + this.domain + ((this.port.length > 0 && this.port !== "80")?this.port:"");
			},
			getPushLeadPath : function() {
				return LeadCore.base + "/pushLead";
			},
			getPushInfoPath : function() {
				return LeadCore.base + "/pushInfo";
			}

		},
		siteId    : getLGSiteIdFromScript(),
		baseLGURL : LeadCoreDEV.baseUrl[LeadCoreDEV.currentMode],
		base      : LeadCoreDEV.baseUrl[LeadCoreDEV.currentMode],
		visit     : null,
		isWidgetActive: [],
		addTopForDot: {
			placeNewLabel: "default",
			placeOldLabel: "default"
		},
		mouse: {
			posX: 0,
			posY: 0
		},
		addScriptItem: function(url) {
			var newScript  = document.createElement("script");
			newScript.src  = url;
			document.getElementsByTagName("body")[0].appendChild(newScript);
		},
		getCookie: function (cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for ( var i=0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
			}
			return "";
		},
		eventFire: function(el, etype){
			if (el.fireEvent) {
				(el.fireEvent('on' + etype));
			} else {
				var evObj = document.createEvent('Events');
				evObj.initEvent(etype, true, false);
				el.dispatchEvent(evObj);
			}
		},
		setCookie: function(cname, cvalue, exdays) {
			var exp = 0;
			var d = new Date();

			if (exdays > 0) {
				exp = d.setTime(d.getTime() + (exdays*24*60*60*1000));
				exp = d.toUTCString();
			}

			var expires = "expires="+exp;
			document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
		},
		eraseCookie: function (cname) {
		    document.cookie = cname + '=; max-age=0';
		},
		removeCookie: function (cname) {
			document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},
		setActionLockCookie: function() {
			var d = new Date();
			LeadCore.setCookie("LGWGActionLock", d.getTime(), 365);
		},
		isActionLockExpire: function(gap, cookieName) {
			var currentD = new Date();
			var actionLockTime = LeadCore.getCookie(cookieName);
			if (actionLockTime.length) {
				var hours = Math.abs(currentD.getTime() - actionLockTime) / 3600000;
				if (hours > gap) {
					LeadCore.eraseCookie('LGWGActionLock');
					return false;
				} else {
					return true;
				}
			}
			
			return false;
		},
		sendAnalyticGlobal: function (widgetID) {
			if (typeof LeadCore.analyticsParams !== "undefined") {
				var analParams = LeadCore.analyticsParams;

				for (var i = 0; i < analParams.length; i++) {
					var analyticsParamsObj = analParams[i];
					if (analyticsParamsObj.type == "ymetrika") {
						if (typeof window['yaCounter'+analyticsParamsObj.counter+''] != 'undefined') {
							window['yaCounter'+analyticsParamsObj.counter+''].reachGoal('leadgenic_lead_send');
							window['yaCounter'+analyticsParamsObj.counter+''].reachGoal('leadgenic_widget_lead_'+widgetID);
						}
					}
					if (analyticsParamsObj.type == "ganalytics") {
						if (typeof window.dataLayer != 'undefined' && window.dataLayer.length) {
							window.dataLayer.push({'event': 'leadgenic_lead_send'});
							window.dataLayer.push({'event': 'leadgenic_widget_lead_'+widgetID});
						}
						if (analyticsParamsObj.service === "UNIVERSAL" && (typeof window.ga != 'undefined')) {
							window.ga('send', 'event', 'lg_click', 'leadgenic_lead_send');
							window.ga('send', 'event', 'lg_click', 'leadgenic_widget_lead_'+widgetID);
							console.log("MA sending UAnalytics");
						}
						if ((analyticsParamsObj.service === "GTAG") && (typeof window.gtag != 'undefined')) {
							window.gtag('event', 'leadgenic_lead_send', {'event_category': 'lg_click'});
							window.gtag('event', 'leadgenic_widget_lead_'+widgetID, {'event_category': 'lg_click'});
							console.log("MA sending GTAGAnalytics");
						}
					}
				}
			}
		},
		setCorrectIntervalForCookie: function(intervalType, value) {
			if (intervalType == "DAY") {
				return value;
			} else if (intervalType == "HOU") {
				return value/24;
			} else if (intervalType == "MIN") {
				return (value/(24*60));
			} else if (intervalType == "SEC") {
				return (value/(24*60*60));
			}
		},
		loadSocTracking: function() {
            LeadCore.server.domain   = LeadCore.visit.domainInfo.domain;
            LeadCore.server.iframe   = LeadCore.visit.domainInfo.iframe;
            LeadCore.server.port 	 = LeadCore.visit.domainInfo.port;
            LeadCore.server.protocol = LeadCore.visit.domainInfo.protocol;
			this.addScriptItem("${base}/socTracking?site=${site.id}");
		},
		loadWidgets: function(widgets, i, isTemplate) {
			var pointsStyle = document.createElement('link');
			var pointsScript = document.createElement('script');
			if(isTemplate) {
				pointsStyle.href = widgets[i].template.css;
				pointsScript.src = widgets[i].template.js;
			} else {
				pointsStyle.href  = widgets[i].css;
				pointsScript.src  = widgets[i].js;
			}
			pointsScript.setAttribute("type", "text/javascript");
			pointsScript.setAttribute("charset", "UTF-8");
            //pointsScript.setAttribute("async", "false");
            pointsScript.setAttribute("defer", "");
			pointsStyle.setAttribute("rel", "stylesheet");
			document.getElementsByTagName("head")[0].appendChild(pointsStyle);
			document.getElementsByTagName("body")[0].appendChild(pointsScript);
		},
        addGeneralWidgetToSite: function(type, fileName) {
        	var LGWGPathForDevGeneral = "http://my-local-root.com/leadgenic/dev/" + type + "/";
			//var LGWGPathForDevGeneral = "https://cdn.leadgenic.ru/dev/lg_widgets_l11/" + type + "/";
			//var LGWGPathForDevGeneral = "https://cdn.leadgenic.ru/production/lg_widgets_l11/" + type + "/";

			var ccStyle = document.createElement('link');
			var ccScript = document.createElement('script');
            ccStyle.href = LGWGPathForDevGeneral + fileName + ".css";
            ccScript.src = LGWGPathForDevGeneral + fileName + ".js";
            ccScript.setAttribute("async", "");
            ccScript.setAttribute("defer", "");
            ccStyle.setAttribute("rel", "stylesheet");
            document.getElementsByTagName("head")[0].appendChild(ccStyle);
            document.getElementsByTagName("body")[0].appendChild(ccScript);
        },
        loadCouponCallbackGeneralScript: function() {
			LeadCore.addGeneralWidgetToSite('coupon-callback', 'lgwg_coupon_callback');
        },
		loadWidgetsCheck: function(widgets, isTemplate) {
			var popupLoad = false;
            var containerizedLoad = false;
			var isPinterestLoad = false;
			var isCouponCallbackGeneral = false;
			var isExtraScriptsGeneral = false;
			for (var j = 0; j < widgets.length; j++) {

				if (widgets[j].guiprops) {
				    if (!isCouponCallbackGeneral) {
                        isCouponCallbackGeneral = true;
				        LeadCore.loadCouponCallbackGeneralScript();
                    }
					if (widgets[j].type.code === 'label_widget' && (widgets[j].guiprops.labelMain.place === "Нижний левый угол" || widgets[j].guiprops.labelMain.place === "Нижний правый угол")) {
						LeadCore.addTopForDot.placeNewLabel = widgets[j].guiprops.labelMain.place;
						LeadCore.addTopForDot.valueNewLabel = widgets[j].guiprops.labelMain.height;
					}

					for (var g = 0; g < widgets[j].guiprops.social.items.length; g++) {
						if(widgets[j].guiprops.social.items[g].name == "pinterest") {
							if(!isPinterestLoad) {
								var pinScript = document.createElement('script');
								pinScript.src = "//assets.pinterest.com/js/pinit.js";
								pinScript.setAttribute("async", "");
								pinScript.setAttribute("defer", "");
								document.getElementsByTagName("body")[0].appendChild(pinScript);
								isPinterestLoad = true;
							}
						}
					}

					if (widgets[j].guiprops.formExt && widgets[j].guiprops.formExt.enable && !isExtraScriptsGeneral) {
						isExtraScriptsGeneral = true;
						LeadCore.addGeneralWidgetToSite('datepicker', 'lgwg_date_picker');
						LeadCore.addGeneralWidgetToSite('dropdown', 'lgwg_dropdown');
					}
				} else {
					if (widgets[j].type === 1) {
						if (widgets[j].position === 0) {
							LeadCore.addTopForDot.placeOldLabel = "Нижний правый угол";
							LeadCore.addTopForDot.valueOldLabel = 34;
						}
						if (widgets[j].position === 2) {
							LeadCore.addTopForDot.placeOldLabel = "Нижний левый угол";
							LeadCore.addTopForDot.valueOldLabel = 34;
						}
					}
				}

				if (widgets[j].type.code !== "popup" && widgets[j].type.code !== "containerized") {
					LeadCore.loadWidgets(widgets, j, isTemplate);
				} else {
					if (!popupLoad && widgets[j].type.code === "popup") {
						LeadCore.loadWidgets(widgets, j, isTemplate);
						popupLoad = true;
					}
                    if (!containerizedLoad && widgets[j].type.code === "containerized") {
                        LeadCore.loadWidgets(widgets, j, isTemplate);
                        containerizedLoad = true;
                    }
				}
			}
		},
		checkUrlTags: function() {
			const utmSource   = LGWGService.getURLTag('utm_source');
			const utmMedium   = LGWGService.getURLTag('utm_medium');
			const utmCampaign = LGWGService.getURLTag('utm_campaign');
			const utmTerm     = LGWGService.getURLTag('utm_term');
			const utmContent  = LGWGService.getURLTag('utm_content');
			const referrer    = document.referrer;
			
			if (!!utmSource) {
				LeadCore.setCookie('utm_sourceURL', utmSource, 1);
			}

			if (!!utmMedium) {
				LeadCore.setCookie('utm_mediumURL', utmMedium, 1);
			}

			if (!!utmCampaign) {
				LeadCore.setCookie('utm_campaignURL', utmCampaign, 1);
			}

			if (!!utmTerm) {
				LeadCore.setCookie('utm_termURL', utmTerm, 1);
			}

			if (!!utmContent) {
				LeadCore.setCookie('utm_contentURL', utmContent, 1);
			}

			if (!!referrer) {
				LeadCore.setCookie('referrerURL', referrer, 1);
			}
		},
		loadVisit: function() {
			var url = LeadCore.baseLGURL+"/api/gate/sites/"+LeadCore.siteId+"/visits";
			var visitId;

			var key = LeadCore.getCookie("lgkey");
			var usr = LeadCore.getCookie("lgusr");

			var uTime = new Date();
			uTime = uTime.getTime();

			var titleOfPage = document.title;
			if(!titleOfPage) {
				titleOfPage = "No title";
			}

			var data = {
				utime: LeadCore.getUserTime(),
				url: window.location.href || document.URL,
				title: titleOfPage,
				userAgent: navigator.userAgent,
				refer: document.referrer
			};

			if (key.length > 0 && key !== "undefined") {
				data.key = key;
			}

			var oReq = new XMLHttpRequest();
			oReq.onreadystatechange = function() {
				if (oReq.readyState==4 && oReq.status==200) {
					var response = JSON.parse(oReq.responseText).data;
					if (!response) {
						return;
					}

					LeadCore.visit = response;
					
					visitId = response.visitInfo.visitId;
                    LeadCore.currentVisitId = visitId;
                    LeadCore.smartParams = response.smartParams;

                    if (response.visitInfo.actionsCount === 0) {
                    	LeadCore.checkUrlTags();
                    }

					LeadCore.setCookie("lgvid", visitId, 0);

					if (key === "undefined" || key.length === 0) {
						if (response.visitInfo.key) {
							LeadCore.setCookie("lgkey", response.visitInfo.key, 1000);
						}
					}

					LeadCore.getPushLeadPath = function(actionId) {
						return LeadCore.baseLGURL + "/api/gate/sites/" + LeadCore.siteId + "/visits/" + visitId + "/leads";
					};

					LeadCore.pushCreateLead = function(dParams, sync, callbackGood, callbackError) {
						var oReq = new XMLHttpRequest();

						var targetUrl = LeadCore.baseLGURL + "/api/gate/sites/" + LeadCore.siteId + "/visits/" + visitId + "/leads";

						oReq.open("POST", targetUrl, sync);
						oReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

						oReq.onload = function() {
							LeadCore.setActionLockCookie();
							callbackGood();
						};

						oReq.onerror = function() {
							callbackError();
						};
						dParams.pageUrl = window.location.href;

						oReq.send(JSON.stringify(dParams));
					};

					LeadCore.pushTargetAction = function(type, widgetId, callbackFunction) {
						var oReq  = new XMLHttpRequest();
						var uTime = new Date();
						uTime = uTime.getTime();
						var targetUrl = LeadCore.base+"/api/gate/sites/"+LeadCore.siteId+"/visits/"+visitId+"/statistics/";

						var typeSend;
						if (type === 0 || !type) {
							typeSend = "EVENT_OPEN";
						} else if (type === 1) {
							typeSend = "EVENT_TARGET";
							LeadCore.setActionLockCookie();
						}
						var params = {
							type: typeSend,
							timestamp: uTime,
							widgetId: widgetId
						};

						oReq.open("POST", targetUrl, true);
						oReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
						if (typeof callbackFunction !== "undefined") {
							oReq.onreadystatechange = callbackFunction;
						}
						oReq.send(JSON.stringify(params));
					};


					if (LeadCore.visit.socTrackingEnabled) {
						LeadCore.loadSocTracking();
					}

					LeadCore.analyticsParams = LeadCore.visit.analyticsParams;

					if (LeadCore.visit.smartPoints.length > 0) {
						LeadCore.activeWidget = 0;
						LeadCore.visit.actions = [];//HardCode
						LeadCore.widgets = LeadCore.visit.smartPoints;
						LeadCore.loadWidgetsCheck(LeadCore.visit.smartPoints);
					}

					if (LeadCore.visit.widgets.length > 0) {
						LeadWidgets.list = LeadCore.visit.widgets;
						LeadCore.loadWidgetsCheck(LeadCore.visit.widgets, true);
					}
				}
			};

			//oReq.open("POST", url, true);
			//oReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			//oReq.send(JSON.stringify(data));
		}
	};

	//LeadCore.loadVisit();
	LeadCore.visit = widgetModel;
	//LeadCore.loadWidgetsCheck(LeadCore.visit.widgets, true);


})();


/*************************************************************************
 *Smart load event
 */
function addLoadEventForLGWidgets(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

/*************************************************************************
 *Waves active btn
 */
function waveActBtnB(block) {
	block.classList.add('lg-wg-an-wave-white');
	setTimeout(function() {
		block.classList.add('lg-wg-an-wave-blue-2');
	}, 300);
	setTimeout(function() {
		block.classList.remove('lg-wg-an-wave-white');
		block.classList.remove('lg-wg-an-wave-blue-2');
	}, 350);
}
function waveActBtnG(block) {
	block.classList.add('lg-wg-an-wave-white');
	setTimeout(function() {
		block.classList.add('lg-wg-an-wave-green-2');
	}, 300);
	setTimeout(function() {
		block.classList.remove('lg-wg-an-wave-white');
		block.classList.remove('lg-wg-an-wave-green-2');
	}, 350);
}


/*************************************************************************
 *Validate phone input
 */
function validPhoneInput(input) {
	var re = /^[\d\+\(\)\ -]{4,17}\d$/;
	var valid = re.test(input);
	return valid;
}

/*************************************************************************
 *Validate email input
 */
function validEmailInput(input) {
	var r = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
	var valid = r.test(input);
	return valid;
}


/*************************************************************************
 *Find closest tag
 */
function closest(el, selector) {
	var matches = el.webkitMatchesSelector ? 'webkitMatchesSelector' : (el.msMatchesSelector ? 'msMatchesSelector' : 'matches');

	while (el.parentElement) {
		if (el[matches](selector)) return el;

		el = el.parentElement;
	}

	return null;
}

/*************************************************************************
 *Send request
 */
function sendRequestLGWG(data, blockOpen, blockClose, btn, closeFunc, interval) {
	var roistatIdNew = LeadCore.getCookie("roistat_visit");
	if(roistatIdNew) {
		data.roistatId = roistatIdNew;
	}
	var tInterval = interval || 5000;

	var xhr = new XMLHttpRequest();

	btn.classList.remove('lg-wg-an-wave-ef-b');
	btn.classList.remove('lg-wg-an-wave-ef-g');
	btn.classList.add('lg-wg-sub-go');
	xhr.open("POST", LeadCore.getPushLeadPath("sendWidgetForm"));

	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	xhr.onload = function() {
		LeadCore.setActionLockCookie();
		blockClose.classList.add('lg-wg-form-none');
		setTimeout(function () {
			blockOpen.classList.remove('lg-wg-form-none');
		}, 500);
		setTimeout(function () {
			blockOpen.classList.add('lg-wg-visib');
		}, 550);
		btn.classList.add('lg-wg-an-wave-ef-b');
		btn.classList.remove('lg-wg-sub-go');
		LeadCore.setCookie('lg-wg-sended', LeadCore.siteId, 7);
		setTimeout(closeFunc, tInterval);
	};

	data.pageUrl = window.location.href;
	xhr.send(JSON.stringify(data));

}


function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var phoneMaskFieldClass =
/*#__PURE__*/
function () {
	/***
	 handler = the DOM object
	 mask = any preferrable phone mask
	 placeholder = character used to fill the space when char is deleted
	 start = the position of the first num character user can enter
	 ***/
	//mask = '+7(___)___-____'
	function PhoneMaskField(handler, mask) {
		var _this = this;

		var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_';

		_classCallCheck(this, PhoneMaskField);

		this.handler = handler;
		this.mask = mask;
		this.placeholder = placeholder;
		this.placeholderPos = 1; //set the length

		this.setLength(); //set value to placeholder

		this.setValue(); //check where is the first enerable character index

		this.start = this.placeHolderPosition() - 1; //focused - move carette to the first placeholder

		this.handler.addEventListener('focusin', function () {
			_this.focused();
		});
		this.handler.addEventListener('focusout', function () {
			if (_this.mask === _this.handler.value) {
				_this.removeValue();

				_this.handler.classList.remove("masked");
			}
		}); //keydown - check key/remove placeholder/push numbers further or do nothing

		this.handler.addEventListener('keydown', function (e) {
			_this.input(e);
		});
		this.removeValue();
	}

	_createClass(PhoneMaskField, [{
		key: "focused",
		value: function focused() {
			if (this.mask === this.handler.value || !this.handler.value) {
				this.setValue();
				this.handler.classList.add("masked");
			}

			this.placeholderPos = this.placeHolderPosition();
			var el = this.handler;
			var pos = this.placeholderPos;
			setTimeout(function () {
				if (el.setSelectionRange) {
					el.setSelectionRange(pos, pos);
				} else {
					// IE
					var range = el.createTextRange();
					range.collapse(true);
					range.moveEnd("character", pos);
					range.moveStart("character", pos);
					range.select();
				}
			}, 10);
		}
	}, {
		key: "input",
		value: function input(e) {
			//unless it is a tab, prevent action
			if (!this.isDirectionKey(e.key)) {
				e.preventDefault();
			} //if integer, enter it


			if (this.isNum(e.key)) {
				this.changeChar(e.key);
			} //if user deletes, delete a number
			else if (this.isDeletionKey(e.key)) {
				if (e.key === 'Backspace') {
					var index = this.start;
					var dir = -1;
					this.changeChar(this.placeholder, dir, index);
				} else {
					this.changeChar(this.placeholder);
				}
			}
		} //put max length to the length of the mask

	}, {
		key: "setLength",
		value: function setLength() {
			this.handler.maxLength = this.mask.length;
		} //set initial value

	}, {
		key: "setValue",
		value: function setValue() {
			this.handler.value = this.mask;
		}
	}, {
		key: "removeValue",
		value: function removeValue() {
			this.handler.value = "";
		} //check if input is number

	}, {
		key: "isNum",
		value: function isNum(i) {
			return !isNaN(i) && parseInt(Number(i)) == i && !isNaN(parseInt(i, 10));
		} //check if it is a button to delete stuff

	}, {
		key: "isDeletionKey",
		value: function isDeletionKey(i) {
			return i === 'Delete' || i === 'Backspace';
		} //check if direction arrow

	}, {
		key: "isDirectionKey",
		value: function isDirectionKey(i) {
			return i === 'ArrowUp' || i === 'ArrowDown' || i === 'ArrowRight' || i === 'ArrowLeft' || i === 'Tab';
		} //check if value is placeholder

	}, {
		key: "isPlaceholder",
		value: function isPlaceholder(i) {
			return i == this.placeholder;
		} //check index of closest placeholder

	}, {
		key: "placeHolderPosition",
		value: function placeHolderPosition() {
			return this.handler.value.indexOf(this.placeholder);
		}
	}, {
		key: "changeChar",
		value: function changeChar(i) {
			var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
			var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.mask.length;
			var val = this.handler.value;
			var pos = this.placeholderPos > -1 ? this.placeholderPos : this.handler.selectionStart;

			if (dir === -1) {
				pos = this.handler.selectionStart - 1;
			}
			/**
			 *  if direction is forward, character to be changed is before the caret
			 *  else it is behind, so we move position one char back
			 */
				//dir > 0 ? pos = this.handler.selectionStart : pos = this.handler.selectionStart - 1;


			var newVal = ''; //if cursor at end, do nothing

			if (pos === max) {
				return false;
			}
			/**check if char to be replaced is placeholder or number
			 if it is placeholder, change it, if it is number
			 push it, if it is neither, move cursor
			 **/


			if (!this.isNum(val[pos]) && !this.isPlaceholder(val[pos])) {
				do {
					pos += dir; //if cursor at end, do nothing

					if (pos === max) {
						return false;
					}
				} while (!this.isNum(val[pos]) && !this.isPlaceholder(val[pos]));
			} //replace char at index


			newVal = this.replaceAt(val, pos, i); //update the value in the field

			this.handler.value = newVal; //move the caret if direction is forward

			if (dir > 0) pos += dir;
			this.placeholderPos = this.placeHolderPosition();
			this.handler.selectionStart = pos;
			this.handler.selectionEnd = pos;
		}
	}, {
		key: "replaceAt",
		value: function replaceAt(str, pos, val) {
			return str.substring(0, pos) + val + str.substring(++pos);
		}
	}]);

	return PhoneMaskField;
}();


(function () {
	LGWGService = {
		setOpacityForBg: function(bgSettings) {
			return typeof bgSettings.opacity !== 'undefined' ? bgSettings.opacity : '1';
		},
		getBorderStyle: function(bgSettings) {
			if(bgSettings.border && bgSettings.border.enable && bgSettings.border.style) {
				return bgSettings.border.style;
			} else {
				return '0px solid transparent';
			}
		},
		getInnerBorderStyle: function(bgSettings) {
			if(bgSettings.border && bgSettings.border.enable && bgSettings.border.style && bgSettings.border.thickness && bgSettings.borderRadius) {
				return (bgSettings.borderRadius - bgSettings.border.thickness + 1) + 'px';
			} else {
				return '0';
			}
		},
		getBoxShadowStyle: function(bgSettings) {
			if (!bgSettings.shadow) {
				return "0px 1px 5px 0px rgba(0,0,0,0.25)";
			}
			if (bgSettings.shadow && bgSettings.shadow.enable && bgSettings.shadow.style) {
				return bgSettings.shadow.style;
			}
			if (bgSettings.shadow && !bgSettings.shadow.enable) {
				return "0px 1px 5px 0px rgba(0,0,0,0)";
			}
		},
		isFormBorder: function(item) {
			return item.border.enable ? 'widget-input-border' : '';
		},
		getVideoImageWidth: function(item) {
			if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
				if (item.width_type === LeadCore.constants.fromStoS) {
					return item.widthpx + "px";
				} else {
					if (item.widthpx > (window.screen.availWidth - 38)) {
						return "100%";
					} else {
						return item.widthpx + "px";
					}
				}
			} else {
				return item.widthpx + "px";
			}
		},
		getVideoHeight: function(item, dhVisual) {
			if ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) {
				if (item.width_type === LeadCore.constants.fromStoS) {
					return ((window.screen.availWidth - 38)/1.666);
				} else {
					if (item.widthpx > (window.screen.availWidth - 38)) {
						return ((window.screen.availWidth - 38)/1.666);
					} else {
						return (item.widthpx/1.666);
					}
				}
			} else {
				if (item.width_type === LeadCore.constants.fromStoS) {
					return ((dhVisual.widget_ul_width_nopx - 1)/1.666);
				} else {
					return (item.widthpx/1.666);
				}
			}
		},
		hrPosSel: function(item) {
		    var className = '';

		    if (item.position === LeadCore.constants.onCenter)
		        className = 'widget1-hr-center';

		    if (item.position === LeadCore.constants.fromRight)
		        className = 'widget1-hr-right';

		    if (item.position === LeadCore.constants.fromLeft)
		        className = 'widget1-hr-left';

		    if (item.width_type === LeadCore.constants.fromStoS)
		        className += ' widget1-hr-full-w';

		    if (item.width_type === LeadCore.constants.ownValue)
		        className += ' widget1-hr-user-w';

		    if (item.width_type === LeadCore.constants.auto)
		        className += ' widget1-hr-auto-w';

		    return className;
		},
		getAlignOfCloseLink: function(item) {
			return !item.position ? 'widget1-hr-center' : LGWGService.hrPosSel(item);
		},
		getWholeFormWidth: function(item) {
			return item.form_widthpx || 200;
		},
		hrPosSelWholeForm: function(item) {
		    var className = '';
		    if (!item.form_position || !item.form_width_type) {
		    	return 'widget1-w-hr-left widget1-w-hr-full-w';
		    }

		    if (item.form_position === LeadCore.constants.onCenter)
		        className = 'widget1-w-hr-center';

		    if (item.form_position === LeadCore.constants.fromRight)
		        className = 'widget1-w-hr-right';

		    if (item.form_position === LeadCore.constants.fromLeft)
		        className = 'widget1-w-hr-left';

		    if (item.form_width_type === LeadCore.constants.fromStoS)
		        className += ' widget1-w-hr-full-w';

		    if (item.form_width_type === LeadCore.constants.ownValue)
		        className += ' widget1-w-hr-user-w';

		    return className;
		},
		heightIfrmPosSel: function(item) {
		    var className = '';

		    if (item.height_type === LeadCore.constants.auto)
		        className += ' widget1-hrh-full-w';

		    if (item.height_type === LeadCore.constants.ownValue)
		        className += ' widget1-hrh-user-w';

		    return className;
		},
		classNameFormInputMask: function(type, mask) {
			return (type === "phone" && mask && mask.enable) ? '' : '';
		},
		classNameInputItem: function(item, orient) {
		    var className = '';

		    if (orient === LeadCore.constants.horizontal) {
		        if (item.type === 'message') {
		            className = 'widget-input-gorizontal-textar';
		        }
		        else {
		            className = 'widget-input-gorizontal';
		        }
		    }
		    else {
		       if (item.type === 'message') {
		            className = 'widget-input-vert-textar';
		        }
		    }

		    return className;
		},
		classNameVerticalOrient: function(dhVisual) {
		    var className = '';

		    if (dhVisual.widget_content_height === LeadCore.constants.ownValue) {
		        if (dhVisual.widget_content_height_orient === LeadCore.constants.fromBottomBorder)
		            className = 'widget-main-ul-bottom';

		        if (dhVisual.widget_content_height_orient === LeadCore.constants.onCenterWidget)
		            className = 'widget-main-ul-center';
		    } else {
		    	className = 'widget-main-ul-auto';
		    }

		    return className;
		},
		hrPosSelForm: function(item) {
		    var className = '';

		    if (item.width_type === LeadCore.constants.fromStoS)
		        className += ' widget1-hr-full-w';

		    if (item.width_type === LeadCore.constants.ownValue)
		        className += ' widget1-hr-user-w';

		    return className;
		},
		btnWidthSel: function(item) {
		    var className = '';

		    if (item.btn_width === LeadCore.constants.fromStoS)
		        className = 'button-full-width';

		    if (item.btn_width === LeadCore.constants.ownValue)
		        className = 'button-user-width';

		    if (item.btn_width === LeadCore.constants.auto)
		        className = 'button-auto-width';

		    return className;
		},
		btnPosSel: function(visualObj) {
		    var className = '';

		    if (visualObj.button.position === LeadCore.constants.onCenter)
		        className = 'widget1-btn-bl-center';

		    if (visualObj.button.position === LeadCore.constants.fromRight)
		        className = 'widget1-btn-bl-right';

		    if (visualObj.dhVisual.place === LeadCore.constants.fromLeft)
		        className = 'widget1-btn-bl';

		    return className;
		},
		btnExitPosSel: function(item, place) {
		    var className = '';

		    if (item.position === LeadCore.constants.onCenter)
		        className = 'widget1-btn-bl-center';

		    if (item.position === LeadCore.constants.fromRight)
		        className = 'widget1-btn-bl-right';

		    if (place === LeadCore.constants.fromLeft)
		        className = 'widget1-btn-bl';

		    return className;
		},
		btnStyleSel: function(item) {
		    var className = '';

		    if(item.styleType) {
			    if (item.styleType === 'Border Style')
			        className = 'widget-btn-border-style-none-bg';

			    if (item.styleType === 'Material')
			        className = 'widget-btn-style__material widget-btn-border-style-none-border';

			    if (item.styleType === 'Flat')
			        className = 'widget-btn-style__flat widget-btn-border-style-none-border';

			    if (item.styleType === 'Default')
			        className = 'widget-btn-border-style-none-border';
		    }

		    return className;
		},
		classNameImg: function(imageObj) {
		    var className = '';

		    if (imageObj.enable) {
		        if (imageObj.place === LeadCore.constants.fromLeft)
		            className = 'widget-image-left';

		        if (imageObj.place === LeadCore.constants.fromRight)
		            className = 'widget-image-right';

		        if (imageObj.place === LeadCore.constants.fromBottom)
		            className = 'widget-image-bottom';

		        if (imageObj.place === LeadCore.constants.fromTop)
		            className = 'widget-image-top';

		        if (imageObj.visual === LeadCore.constants.toAllWidth && imageObj.place === LeadCore.constants.fromLeft)
		            className = 'widget-image-left-all'

		        if (imageObj.visual === LeadCore.constants.toAllWidth && imageObj.place === LeadCore.constants.fromRight)
		            className = 'widget-image-right-all'
		    } else {
		    	className = 'lgwg-none';
		    }

		    return className;
		},
		classNameImgMain: function(imageObj) {
		    var className = '';

		    if (imageObj.enable) {
		        if (imageObj.place === LeadCore.constants.fromLeft)
		            className = 'widget-main-img-left';

		        if (imageObj.place === LeadCore.constants.fromRight)
		            className = 'widget-main-img-right';

		        if (imageObj.place === LeadCore.constants.fromBottom)
		            className = 'widget-main-img-bottom';

		        if (imageObj.place === LeadCore.constants.fromTop)
		            className = 'widget-main-img-top';
		    }

		    return className;
		},
		imgSetupUrl: function(imageObj) {
			return imageObj.enable ? "url('" + imageObj.url + "') center center / cover no-repeat #fff" : "";
		},
		imgSetupSize: function(imageObj) {
			var style = '';

			if (imageObj.enable) {
				style = "width:" + imageObj.width + "px;height:" + imageObj.height + "px;";

				if (imageObj.place === LeadCore.constants.fromTop) {
					style = "width:100%;height:" + imageObj.height + "px;";
				}

				if (imageObj.image.place === LeadCore.constants.fromBottom) {
					style = "width:100%;height:" + imageObj.height + "px;";
				}
			}
			return style;
		},
		isTextEnable: function(item) {
			return !item.enable ? " lgwg-none" : "";
		},
		isTextShadow: function(item) {
			return !item.textShadow.enable ? 'no-text-shadow-imp' : '';
		},
		hexToRgb: function(r,t) {
			var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)
		},
		getRGBAColor: function(item) {
		    return (LGWGService.hexToRgb(item.textShadow.color, item.textShadow.opacity)).toString();
		},
		getRGBAColorItems: function(color, opacity) {
		    return (LGWGService.hexToRgb(color, opacity)).toString();
		},
		getCouponRGBABG: function(item) {
		    return (LGWGService.hexToRgb(item.color, item.opacity)).toString();
		},
		setWideOrNarrowBgStyle: function(dhVisual) {
			if ((dhVisual.widget_width_nopx !== 0) && (dhVisual.widget_height_nopx !== 0)) {
		        if ((dhVisual.widget_width_nopx/dhVisual.widget_height_nopx) >= (16/9)) {
		            return "wide-video-bg-ext";
		        } else {
		            return "narrow-video-bg-ext"; 
		        }
		    }

		    return "";
		},
		redirectParams: function(data, redirectUrl) {
			var EMAIL_CONST = '{email}',
			    PHONE_CONST = '{phone}',
			    NAME_CONST = '{name}',
			    MESSAGE_CONST = '{message}';

			var url = redirectUrl;

			if(!data) {
				if(url.indexOf('?') !== -1 && (url.indexOf(EMAIL_CONST)!== -1 || url.indexOf(PHONE_CONST) !== -1 || url.indexOf(NAME_CONST) !== -1 || url.indexOf(MESSAGE_CONST) !== -1)) {
					url = url.substr(0, url.indexOf('?'));
				}
				return url;
			}

			if(url.indexOf(EMAIL_CONST) !== -1 && data.email) {
				url = url.replace(EMAIL_CONST, data.email);
			}

			if(url.indexOf(PHONE_CONST) !== -1 && data.phone) {
				url = url.replace(PHONE_CONST, data.phone);
			}

			if(url.indexOf(NAME_CONST) !== -1 && data.firstName) {
				url = url.replace(NAME_CONST, data.firstName);
			}

			if(url.indexOf(MESSAGE_CONST) !== -1 && data.comment) {
				url = url.replace(MESSAGE_CONST, data.comment);
			}

			return url;
		},
		getTopValueOfColorPod: function(LGWGNewDotformBlock, LGWGNewDotButtonBlock, visualObj, LGWGNewDotFormExtBlock) {
			var offsetPadding = 6;
		    var topOfColorPod = 0;

			if (LGWGNewDotformBlock) {
				if (visualObj.form.orient === LeadCore.constants.vertical) {
		            offsetPadding = - 8;
		        }
		        topOfColorPod = (LGWGNewDotformBlock.getBoundingClientRect().top - 20 + offsetPadding);
			} else if (LGWGNewDotButtonBlock) {
				offsetPadding = 8;
				topOfColorPod = (LGWGNewDotButtonBlock.getBoundingClientRect().top - 20 - offsetPadding);
			} else if (LGWGNewDotFormExtBlock) {
				topOfColorPod = (LGWGNewDotFormExtBlock.getBoundingClientRect().top - 8 - offsetPadding);
			}

			if (visualObj.bg.border && visualObj.bg.border.enable) {
		        topOfColorPod = topOfColorPod - visualObj.bg.border.thickness;
		    }
			
			return topOfColorPod;
		},
		// Rating
        getPosition: function(e, offsetLeft) {
        	var WIDGET_PADDING = 0;
            return e.pageX - WIDGET_PADDING - offsetLeft;
        },
        getDecimalPlaces: function(num) {
            var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
        },
        applyPrecision: function(val, precision) {
            return parseFloat(val.toFixed(precision));
        },
        getValueFromPosition: function(pos, target, maxStars) {
            var self = {
                min: 0,
                step: 1
            };
            var precision = LGWGService.getDecimalPlaces(self.step),
                val, factor, maxWidth = target.offsetWidth - 2;
            
            factor = ((maxStars - self.min) * pos) / (maxWidth * self.step);
            factor = Math.ceil(factor);
            
            val = LGWGService.applyPrecision(parseFloat(self.min + factor * self.step), precision);
            val = Math.max(Math.min(val, maxStars), self.min);
           
            return val;
        },
        getWidthFromValue: function(val, maxStars) {
            if (val >= maxStars) {
                return 100;
            }
            return val * 100 / maxStars;
        },
        calculate: function(pos, target, maxStars) {
            var val = LGWGService.getValueFromPosition(pos, target, maxStars);
            var width = LGWGService.getWidthFromValue(val, maxStars);
            
            width += "%";
            return { width: width, value: val };
        },
        setStars: function(pos, target, item) {
            var out = LGWGService.calculate(pos, target, target.dataset.content.length);
            if (target.nextElementSibling) {
            	target.nextElementSibling.style.width = out.width;
            }
            target.dataset.cacheWidth = out.width;
            target.dataset.cacheValue = out.value;
        },
        hoverStars: function(w, target) {
        	if (!target) return;
            target.style.width = w;
        },
        ratingStarClicked: function(e) {
        	var viewPortParent = e.target.parentElement.getBoundingClientRect();
            var pos = LGWGService.getPosition(e, viewPortParent.left);
            LGWGService.setStars(pos, e.target);
            e.target.dataset['starClicked'] = true;
        },
        ratingStarMoved: function(e) {
            e.target.dataset['starClicked'] = false;
            var viewPortParent = e.target.parentElement.getBoundingClientRect();
            
            var pos = LGWGService.getPosition(e, viewPortParent.left);
            var out = LGWGService.calculate(pos, e.target, e.target.dataset.content.length);
            
            LGWGService.hoverStars(out.width, e.target.nextElementSibling);
        },
        ratingStarLeaved: function(e) {
            if (e.target.dataset['starClicked'] && e.target.dataset['starClicked'] === 'true') return;

            var cacheW = e.target.dataset.cacheWidth || "0%";
            LGWGService.hoverStars(cacheW, e.target.nextElementSibling);
        },
		ratingStars: function(item) {
            var content = "";
            var star = "\ue819";
            for (var i = 1; i <= item.numberOfStars; i++) {
                content += star;
            }
            return content;
        },
        getBGColor: function(formSettings) {
        	return formSettings.border.enable ? formSettings.border.color : formSettings.colorTitleInputForm;
        },
        // END Rating
        getVariantsMarkup: function(elementModel, formSettings) {
        	var variantsMarkup = "";
        	var variantInputM = elementModel.multiEnable ? "<input type=\"checkbox\">" : "<input type=\"radio\" name=\"radio-"+elementModel.id+"\">";
        	var variantLabelM = elementModel.multiEnable ? 
	        	"<span class=\"form-ext-checkbox-checkmark\" style=\"background-color:"+formSettings.rgbaInputForm+";border-color:"+(formSettings.border.enable ? formSettings.border.color : 'transparent')+"\"></span>" : 
	        	"<span class=\"form-ext-checkbox-checkmark-radio\" style=\"background-color:"+formSettings.rgbaInputForm+";border-color:"+(formSettings.border.enable ? formSettings.border.color : 'transparent')+"\"></span>";
        	
        	for (var f = 0; f < elementModel.variants.length; f++) {
        		var fVariant = elementModel.variants[f];

        		variantsMarkup += "<label class=\"form-ext-checkbox-container\" style=\"font-size:"+elementModel.fontSize+"px;font-family:"+elementModel.font.fontFamily+";color:"+elementModel.colorText+"\">"+
        							fVariant+
        							"<div style=\"background-color:"+LGWGService.getBGColor(formSettings)+";border-color:"+LGWGService.getBGColor(formSettings)+"\">"+
        						  		variantInputM+
        						  		variantLabelM+
    						  		"</div>"+
    						  "</label>";
        	}
        	return variantsMarkup;
        },
        getFormExtButtonMarkup: function(elementModel) {
        	var buttonMarkup = "";
        	if (elementModel.bType.type === 1 || elementModel.bType.type === 2) {
        		buttonMarkup += "<i class=\""+elementModel.icon.selectedIcon+"\" style=\"color:"+elementModel.icon.color+"\"></i>";
        	}
        	if (elementModel.bType.type === 0 || elementModel.bType.type === 1) {
        		buttonMarkup += "<div>"+elementModel.textSummer+"</div>";
        	}
        	return buttonMarkup;
        },
        getDDListMarkup: function(elementModel) {
        	var variantsMarkup = "";
        	for (var f = 0; f < elementModel.variants.length; f++) {
        		var fVariant = elementModel.variants[f];

        		variantsMarkup += "<li>"+
        						  	  "<a tabindex=\"-1\" href=\"javascript:void(0)\">"+fVariant+"</a>"+
    						  	  "</li>";
        	}
        	return variantsMarkup;
        },
        getFormExtWidthElement: function(value, type) {
        	return "width: " + value + (type === 0 ? "%" : "px");
        },
        getFormExtNewLineClass: function(isNewLine, index) {
        	return index > 0 && isNewLine ? "widget1-form-ext-new-line-for-next" : "";
        },
        getFormExtPlaceholderMobile: function(placeholder) {
        	return ((window.screen.availWidth <= 760) && LeadCore.isMobile.any()) ? "" : "";
        },
        getFormExtInputType: function(fElement) {
        	return ((window.screen.availWidth <= 760) && LeadCore.isMobile.any() && fElement.type === "phone" && fElement.mask && fElement.mask.enable) ? "tel" : "text";
        },
		getFormExtListMarkup: function(visualFormObj) {
			var formMarkup = "";

			for (var f = 0; f < visualFormObj.list.length; f++) {
				var fElement = visualFormObj.list[f];

				formMarkup += "<div class=\"widget-form-ext-end-el "+LGWGService.getFormExtNewLineClass(fElement.newLine, f)+"\"></div>";

				if (fElement.type === "email" || fElement.type === "name" || fElement.type === "phone") {
					formMarkup += "<div class=\"widget-inp-bl\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"text-input-class form-ext-field form-ext-field-"+fElement.type+"\">"+
										"<input id=\""+fElement.type+"\" name=\""+fElement.type+"\" autocomplete=\""+fElement.type+"\" placeholder=\""+LGWGService.getFormExtPlaceholderMobile(fElement.placeholder)+"\" type=\""+LGWGService.getFormExtInputType(fElement)+"\" class=\"form-control form-widget-cntrl form-ext-input-field form-control-ext-def form-label-for-change form-cntrl-"+fElement.type+" form-req-"+fElement.required+" "+LGWGService.isFormBorder(visualFormObj.mainSettings)+"\" style=\"background:"+visualFormObj.mainSettings.rgbaInputForm+";color:"+visualFormObj.mainSettings.colorTitleInputForm+";border-radius:"+visualFormObj.mainSettings.borderRadiusInputForm+"px;border-color:"+visualFormObj.mainSettings.border.color+"\">"+
										"<label for=\""+fElement.type+"\" class=\"form-widget-cntrl-label\" style=\"color:"+visualFormObj.mainSettings.colorTitleInputForm+"\">"+fElement.placeholder+"</label>"+
								  "</div></div>";
				}

				if (fElement.type === "message") {
					formMarkup += "<div class=\"widget-inp-bl\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+ 
									  "<div class=\"text-input-class form-ext-field text-input-area-class form-ext-field-"+fElement.type+"\">"+
										"<textarea id=\"elementidmessage\" placeholder=\""+LGWGService.getFormExtPlaceholderMobile(fElement.placeholder)+"\" type=\"text\" class=\"form-control form-widget-cntrl form-ext-input-field form-control-ext-def form-label-for-change form-cntrl-message form-req-"+fElement.required+" "+LGWGService.isFormBorder(visualFormObj.mainSettings)+"\" style=\"background:"+visualFormObj.mainSettings.rgbaInputForm+";color:"+visualFormObj.mainSettings.colorTitleInputForm+";border-radius:"+visualFormObj.mainSettings.borderRadiusInputForm+"px;border-color:"+visualFormObj.mainSettings.border.color+"\"></textarea>"+
										"<label for=\"elementidmessage\" class=\"form-widget-cntrl-label\" style=\"color:"+visualFormObj.mainSettings.colorTitleInputForm+"\">"+fElement.placeholder+"</label>"+
								  "</div></div>";
				}

				if (fElement.type === "text") {
					formMarkup += "<div class=\"widget-inp-bl form-ext-field form-ext-unique form-ext-req-"+fElement.required+" form-ext-field-"+fElement.type+"\" data-id=\""+fElement.id+"\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"text-input-class text-input-class-ext-"+fElement.multiLine+"\">"+
									  	(fElement.multiLine ? "<textarea id=\"elementid"+fElement.idField+"\" type=\"text\" class=\"form-control form-ext-input-field form-widget-cntrl form-label-for-change form-cntrl-"+fElement.type+" "+LGWGService.isFormBorder(visualFormObj.mainSettings)+"\" style=\"background:"+visualFormObj.mainSettings.rgbaInputForm+";color:"+visualFormObj.mainSettings.colorTitleInputForm+";border-radius:"+visualFormObj.mainSettings.borderRadiusInputForm+"px;border-color:"+visualFormObj.mainSettings.border.color+"\"></textarea>" :
										"<input id=\"elementid"+fElement.idField+"\" placeholder=\""+LGWGService.getFormExtPlaceholderMobile(fElement.placeholder)+"\" type=\"text\" class=\"form-control form-widget-cntrl form-label-for-change form-cntrl-"+fElement.type+" "+LGWGService.isFormBorder(visualFormObj.mainSettings)+"\" style=\"background:"+visualFormObj.mainSettings.rgbaInputForm+";color:"+visualFormObj.mainSettings.colorTitleInputForm+";border-radius:"+visualFormObj.mainSettings.borderRadiusInputForm+"px;border-color:"+visualFormObj.mainSettings.border.color+"\">") +
										"<label for=\"elementid"+fElement.idField+"\" class=\"form-widget-cntrl-label\" style=\"color:"+visualFormObj.mainSettings.colorTitleInputForm+"\">"+fElement.placeholder+"</label>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "rating") {
					formMarkup += "<div class=\"widget-inp-bl form-ext-field form-ext-unique form-ext-type-"+fElement.type+" form-ext-req-"+fElement.required+" form-ext-send-form-on-action-"+fElement.sendFormIfAction+" form-ext-field-"+fElement.type+"\" data-id=\""+fElement.id+"\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"rating-input-class\">"+
										"<div class=\"rating-wrapper\">"+
											"<div class=\"rating-container\" data-content=\""+LGWGService.ratingStars(fElement)+"\" style=\"color:"+fElement.colorInactive+"\">"+
												"<div class=\"rating-container-in\" data-content=\""+LGWGService.ratingStars(fElement)+"\"></div>"+
												"<div class=\"rating-stars\" data-content=\""+LGWGService.ratingStars(fElement)+"\" style=\"color:"+fElement.colorActive+"\"></div>"+
											"</div>"+
										"</div>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "variants") {
					formMarkup += "<div class=\"widget-inp-bl form-ext-field form-ext-unique form-ext-type-"+fElement.type+" form-ext-req-"+fElement.required+" form-ext-send-form-on-action-"+fElement.sendFormIfAction+" form-ext-multi-"+fElement.multiEnable+" form-ext-field-"+fElement.type+"\" data-id=\""+fElement.id+"\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"checkbox-input-class\">"+
										"<div class=\"form-ext-checkbox-wrapper "+(fElement.everyNewLine && 'form-ext-checkbox-wrapper__wrapped')+"\">"+LGWGService.getVariantsMarkup(fElement, visualFormObj.mainSettings)+"</div>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "dd") {
					formMarkup += "<div class=\"widget-inp-bl form-ext-field form-ext-unique form-ext-type-"+fElement.type+" form-ext-req-"+fElement.required+" form-ext-send-form-on-action-"+fElement.sendFormIfAction+" form-ext-field-"+fElement.type+"\" data-id=\""+fElement.id+"\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"dd-input-class\">"+
										"<div class=\"form-ext-dropdown-wrapper\">"+
											"<div class=\"w-dropdown\" style=\"color:"+visualFormObj.mainSettings.colorTitleInputForm+"\">"+
												"<input readonly id=\"elementid"+fElement.id+"\" placeholder=\""+LGWGService.getFormExtPlaceholderMobile(fElement.placeholder)+"\" type=\"text\" data-number=\""+f+"\" class=\"form-control w-dropdown-input "+LGWGService.isFormBorder(visualFormObj.mainSettings)+"\" style=\"background:"+visualFormObj.mainSettings.rgbaInputForm+";color:"+visualFormObj.mainSettings.colorTitleInputForm+";border-radius:"+visualFormObj.mainSettings.borderRadiusInputForm+"px;border-color:"+visualFormObj.mainSettings.border.color+"\">"+
												"<label for=\"elementid"+fElement.id+"\" style=\"color:"+visualFormObj.mainSettings.colorTitleInputForm+"\">"+fElement.placeholder+"</label>"+
												"<span class=\"caret\"></span>"+
											"</div>"+
										"</div>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "date") {
					formMarkup += "<div class=\"widget-inp-bl form-ext-field form-ext-unique form-ext-type-"+fElement.type+" form-ext-req-"+fElement.required+" form-ext-field-"+fElement.type+"\" data-id=\""+fElement.id+"\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"date-f-input-class\">"+
										"<div class=\"form-ext-date-wrapper\">"+
											"<div class=\"w-datepicker\">"+
												"<input id=\"elementid"+fElement.id+"\" placeholder=\""+LGWGService.getFormExtPlaceholderMobile(fElement.placeholder)+"\" type=\"text\" data-number=\""+f+"\" data-format=\""+fElement.dateType.value+"\" class=\"form-control w-datepicker-input "+LGWGService.isFormBorder(visualFormObj.mainSettings)+"\" style=\"background:"+visualFormObj.mainSettings.rgbaInputForm+";color:"+visualFormObj.mainSettings.colorTitleInputForm+";border-radius:"+visualFormObj.mainSettings.borderRadiusInputForm+"px;border-color:"+visualFormObj.mainSettings.border.color+"\">"+
												"<label for=\"elementid"+fElement.id+"\" style=\"color:"+visualFormObj.mainSettings.colorTitleInputForm+"\">"+fElement.placeholder+"</label>"+
											"</div>"+
										"</div>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "title") {
					formMarkup += "<div class=\"widget-inp-bl\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"title-f-input-class\">"+
										"<div class=\"form-ext-title-wrapper\">"+
											"<div class=\"title-main-new-dot "+LGWGService.isTextShadow(fElement)+"\" style=\"font-size:"+fElement.fontSize+"px;font-family:"+fElement.font.fontFamily+";text-shadow:"+fElement.textShadow.horiz+"px "+fElement.textShadow.vertical+"px "+fElement.textShadow.blur+"px "+LGWGService.getRGBAColor(fElement)+"\">"+fElement.textSummer+"</div>"+
										"</div>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "term") {
					var termInputMarkup = function() {
			        	return fElement.checked ? "<input type=\"checkbox\" checked>" : "<input type=\"checkbox\">";
			        }
					formMarkup += "<div class=\"widget-inp-bl form-ext-field form-ext-field-term form-ext-req-"+fElement.required+"\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<div class=\"term-input-class\">"+
										"<div class=\"form-ext-term-wrapper\">"+
											"<div class=\"form-ext-term-error-help-box\"></div>"+
											"<label class=\"form-ext-term-checkbox-container\">"+
                                                "<div class=\"form-ext-term-checkbox-container-help-cl\" style=\"background-color:"+LGWGService.getBGColor(visualFormObj.mainSettings)+";border-color:"+LGWGService.getBGColor(visualFormObj.mainSettings)+"\">"+
	                                                termInputMarkup()+
	                                                "<span class=\"form-ext-term-checkbox-checkmark\" style=\"background-color:"+visualFormObj.mainSettings.rgbaInputForm+";border-color:"+(visualFormObj.mainSettings.border.enable ? visualFormObj.mainSettings.border.color : 'transparent')+"\"></span>"+
                                                "</div>"+
                                                "<div class=\"title-main-new-dot "+LGWGService.isTextShadow(fElement)+"\" style=\"font-size:"+fElement.fontSize+"px;font-family:"+fElement.font.fontFamily+";text-shadow:"+fElement.textShadow.horiz+"px "+fElement.textShadow.vertical+"px "+fElement.textShadow.blur+"px "+LGWGService.getRGBAColor(fElement)+"\">"+fElement.textSummer+"</div>"+
                                            "</label>"+
										"</div>"+
									  "</div>"+
								  "</div>";
				}

				if (fElement.type === "button") {
					formMarkup += "<div class=\"widget-inp-bl\" style=\""+LGWGService.getFormExtWidthElement(fElement.widthValue, fElement.widthType.type)+"\">"+
									  "<button class=\"click-edit-cl button-send form-ext-button "+LGWGService.btnStyleSel(fElement)+" form-ext-button-type"+fElement.redirect.type.type+" form-ext-button-redirect-blank-"+fElement.redirect.blank+" form-ext-button-target-action-"+fElement.targetAction+"\" data-url=\""+fElement.redirect.url+"\" style=\"font-size:"+fElement.fontSize+"px;font-family:"+fElement.font.fontFamily+";background:"+fElement.colorBtn+";border-color:"+fElement.colorBtn+"!important;color:"+fElement.colorTextBtn+";border-radius:"+fElement.borderRadiusBtn+"px\">"+
										"<div class=\"form-ext-btn-el-wr\"><div class=\"form-ext-btn-el-wr-cont\">"+LGWGService.getFormExtButtonMarkup(fElement)+"</div></div>"+
									  "</button>"+
								  "</div>";
				}
			}
			return formMarkup;
		},
		ratingInitProcess: function(ratings) {
			for (var i = 0; i < ratings.length; i++) {
			    var currentItem = ratings[i];
			    currentItem.onmousemove = function(e) {LGWGService.ratingStarMoved(e);};
			    currentItem.onmouseout = function(e) {LGWGService.ratingStarLeaved(e);};
			    currentItem.onclick = function(e) {LGWGService.ratingStarClicked(e);};
		  	}
		},
		datePickerInitProcess: function(datePickers, LGWGIframeLabelDiv, widgetLGWGNewPopupId, windowElement, widgetType) {
			var DP_HEIGHT = 245;
			var WIDGET_BOTTOM_PADDING = 40;
			
			for (var i = 0; i < datePickers.length; i++) {
			    var currentItem = datePickers[i];
			    currentItem.addEventListener('click', function(e) {
			    	var coordDP = e.target.getBoundingClientRect();
			    	var coordMainBL = LGWGIframeLabelDiv.getBoundingClientRect();

			    	var difH = coordMainBL.height - WIDGET_BOTTOM_PADDING - coordDP.bottom;

			    	var topPosition = (difH < DP_HEIGHT ? (coordMainBL.top + coordDP.bottom - DP_HEIGHT - coordDP.height) : (coordMainBL.top + coordDP.bottom));
  					var extraOffset = widgetType === 'float' ? 0 : (window.scrollY || document.body.scrollTop);
			    	
			    	// Datepicker request
					var dpData = {
						format: e.target.getAttribute('data-format'),
						dpTopPosition: topPosition + extraOffset + 'px',
						dpLeftPosition: coordMainBL.left + coordDP.left + 'px',
			    		wId: widgetLGWGNewPopupId,
			    		name: 'datepicker',
			    		dpItemNumber: e.target.getAttribute('data-number'),
			    		offset: 100,
			    		position: widgetType
			    	};
			    	
			    	window.postMessage(dpData, windowElement.top.location);
			    });
		  	}

		  	// Datepicker response
		  	var onmessageDPLGWG = function(e) {
			  var data = e.data;
			  if (data.name === 'datepickerChanged' && data.wId === widgetLGWGNewPopupId) {
				  var currentDP;

				  for (var i = 0; i < datePickers.length; i++) {
				  	if (datePickers[i].getAttribute('data-number') === data.dpItemNumber) {
				  		currentDP = datePickers[i];
				  	}
				  }

				  currentDP.value = data.formattedDate;
				  currentDP.classList.add('filled');
			  }
			};
	 
			window.addEventListener('message', onmessageDPLGWG);
			LGWGService.setOutsideClickHandler(windowElement);
		},
		dropDownInitProcess: function(dropDowners, LGWGIframeLabelDiv, visualObjNewPopup, widgetLGWGNewPopupId, windowElement, widgetType) {
			var WIDGET_BOTTOM_PADDING = 40;
			
			for (var i = 0; i < dropDowners.length; i++) {
			    var currentItem = dropDowners[i];

			    currentItem.addEventListener('click', function(e) {
			    	var numberOfList = e.target.getAttribute('data-number');
			    	var sameData;
			    	for (var j = 0; j < visualObjNewPopup.formExt.model.list.length; j++) {
			    		if ((numberOfList === j.toString()) && visualObjNewPopup.formExt.model.list[j].type === 'dd') {
			    			sameData = visualObjNewPopup.formExt.model.list[j];
			    		}
			    	}
			    	if (!sameData) return;

			    	var coordDD = e.target.getBoundingClientRect();
			    	var coordMainBL = LGWGIframeLabelDiv.getBoundingClientRect();

			    	var difH = coordMainBL.height - WIDGET_BOTTOM_PADDING - coordDD.bottom;
			    	
			    	// DropDown request
					var ddData = {
						variants: sameData.variants,
						difH: difH,
						coordDD: coordDD,
						coordMainBL: coordMainBL,
			    		wId: widgetLGWGNewPopupId,
			    		name: 'dropdown',
			    		ddItemNumber: numberOfList,
			    		position: widgetType
			    	};
			    	
			    	window.postMessage(ddData, windowElement.top.location);
			    });
		  	}

		  	// DropDown response
		  	var onmessageDDLGWG = function(e) {
			  var data = e.data;
			  if (data.name === 'dropdownChanged' && data.wId === widgetLGWGNewPopupId) {
				  var currentDD;

				  for (var i = 0; i < dropDowners.length; i++) {
				  	if (dropDowners[i].getAttribute('data-number') === data.ddItemNumber) {
				  		currentDD = dropDowners[i];
				  	}
				  }

				  currentDD.value = data.value;
				  currentDD.classList.add('filled');
				  if ("createEvent" in document) {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", false, true);
					currentDD.dispatchEvent(evt);
				  } else {
					currentDD.fireEvent("onchange");
				  }
			  }
			};
	 
			window.addEventListener('message', onmessageDDLGWG);
			LGWGService.setOutsideClickHandler(windowElement);
		},
		validPhoneInput: function (input) {
		    var re = /^[\d\+\(\)\ -]{4,20}\d$/;
		    var valid = re.test(input);
		    return valid;
		},
		validEmailInput: function(input) {
		    var r = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		    var valid = r.test(input);
		    return valid;
		},
		validNMInputAuto: function(inputsArr) {
			if (inputsArr.value !== '') {
				var newStr = inputsArr.value.replace(/&/g, '/&');
				return newStr;
			}
			else {
				inputsArr.classList.add('form-control-error');
				return '';
			}
		},
		validNMNInputAuto: function(inputsArr) {
			if (inputsArr.value !== '') {
				var newStr = inputsArr.value.replace(/&/g, '/&');
				return newStr;
			}
			else {
				return '';
			}
		},
		validPhoneInputAuto: function(inputsArr) {
			if (LGWGService.validPhoneInput(inputsArr.value)) {
				return inputsArr.value;
			}
			else {
				inputsArr.classList.add('form-control-error');
				return '';
			}
		},
		validEmailInputAuto: function(inputsArr) {
			if (LGWGService.validEmailInput(inputsArr.value)) {
				return inputsArr.value;
			}
			else {
				inputsArr.classList.add('form-control-error');
				return '';
			}
		},
		validPhoneFormExtInput: function(inputsArrF) {
			var inputsArr = inputsArrF.querySelector('.form-control');
			if (LGWGService.validPhoneInput(inputsArr.value)) {
				return inputsArr.value;
			}
			else {
				inputsArrF.classList.add('form-control-error');
				return '';
			}
		},
		validEmailFormExtInput: function(inputsArrF) {
			var inputsArr = inputsArrF.querySelector('.form-control');
			if (LGWGService.validEmailInput(inputsArr.value)) {
				return inputsArr.value;
			}
			else {
				inputsArrF.classList.add('form-control-error');
				return '';
			}
		},
		validNMFormExtInput: function(inputsArrF, isReturnNull) {
			var inputText = inputsArrF.querySelector('.form-control');
			if (inputText.value !== '') {
				var newStr = inputText.value.replace(/&/g, '/&');
				return newStr;
			}
			else {
				inputsArrF.classList.add('form-control-error');
				return isReturnNull ? null : '';
			}
		},
		validNMNFormExtInput: function(inputsArrF, isReturnNull) {
			var inputText = inputsArrF.querySelector('.form-control');
			if (inputText.value !== '') {
				var newStr = inputText.value.replace(/&/g, '/&');
				return newStr;
			}
			else {
				return isReturnNull ? null : '';
			}
		},
		isInputFieldValid: function(inputsArrF, func) {
			var input = inputsArrF.querySelector('input[type="text"]') || inputsArrF.querySelector('input[type="tel"]');
			if (input.classList.contains('form-req-true') || input.value !== '') {
				return func(inputsArrF);
			} else {
				return null;
			}
		},
		isFormExtFieldValid: function(inputsArrF) {
			var isInputFieldRequired = inputsArrF.classList.contains('form-ext-req-true');
			var input = inputsArrF.querySelector('input[type="text"]') || inputsArrF.querySelector('input[type="tel"]');
			if (isInputFieldRequired && input.value === '') {
				inputsArrF.classList.add('form-control-error');
				return null;
			} else {
				return input.value || null;
			}
		},
		isRatingFieldValid: function(inputsArrF) {
			var isInputFieldRequired = inputsArrF.classList.contains('form-ext-req-true');
			var ratingContainer = inputsArrF.querySelector('.rating-container-in');
			var ratingValue = ratingContainer.getAttribute('data-cache-value');
			if (isInputFieldRequired && !ratingValue) {
				inputsArrF.classList.add('form-control-error');
				return null;
			} else {
				return ratingValue || null;
			}
		},
		setRemoveErrorOnFocus: function(input) {
			input.addEventListener('focus', function() {
				this.closest('.form-ext-field').classList.remove('form-control-error');
			});
		},
		redirectIfOn: function(data, blank, url, closeWidget) {
			if (closeWidget) {
				closeWidget();
			}
			if (blank) {
				window.open(LGWGService.redirectParams(data, url), '_blank');
				return false;
			}
			else {
				window.location = LGWGService.redirectParams(data, url);
				return false;
			}
		},
		removeEmptyKeys: function(obj) {
			Object.keys(obj).forEach(function(k) {
				if(!obj[k] && obj[k] !== undefined) {
					delete obj[k];
				}
			});
			return obj;
		},
		checkFormExtFields: function(formExtFields, paramsToSend, content) {
			for (var i = 0; i < formExtFields.length; i++) {
				var inputsArrF = formExtFields[i];
				var currentId = inputsArrF.getAttribute("data-id");
				inputsArrF.classList.remove('form-control-error');

				var inputField = inputsArrF.querySelector('.form-control');
				if (inputField) {
					LGWGService.setRemoveErrorOnFocus(inputField);
				}

				var checkBoxesWr = inputsArrF.querySelector('.form-ext-checkbox-wrapper');
				if (checkBoxesWr) {
					var checkBoxInputs = checkBoxesWr.querySelectorAll('input');
					checkBoxInputs.forEach(function(item) {
						LGWGService.setRemoveErrorOnFocus(item);
					});
				}

				if (inputsArrF.classList.contains('form-ext-field-phone')) {
					paramsToSend.phone = LGWGService.isInputFieldValid(inputsArrF, LGWGService.validPhoneFormExtInput);
				}

				if (inputsArrF.classList.contains('form-ext-field-email')) {
					paramsToSend.email = LGWGService.isInputFieldValid(inputsArrF, LGWGService.validEmailFormExtInput);
				}

				if (inputsArrF.classList.contains('form-ext-field-name')) {
					var inputName = inputsArrF.querySelector('input[type="text"]');
					paramsToSend.firstName = inputName.classList.contains('form-req-true') ? LGWGService.validNMFormExtInput(inputsArrF, false) : LGWGService.validNMNFormExtInput(inputsArrF, false);
				}

				if (inputsArrF.classList.contains('form-ext-field-message')) {
					var inputComment = inputsArrF.querySelector('textarea[type="text"]');
					paramsToSend.comment = inputComment.classList.contains('form-req-true') ? LGWGService.validNMFormExtInput(inputsArrF, false) : LGWGService.validNMNFormExtInput(inputsArrF, false);
				}

				//Text input field
				if (inputsArrF.classList.contains('form-ext-field-text')) {
					var isTextInputFieldRequired = inputsArrF.classList.contains('form-ext-req-true');
					content[currentId] = isTextInputFieldRequired ? LGWGService.validNMFormExtInput(inputsArrF, true) : LGWGService.validNMNFormExtInput(inputsArrF, true);
				}

				if (inputsArrF.classList.contains('form-ext-field-variants')) {
					// Variants
					var isVariantInputFieldRequired = inputsArrF.classList.contains('form-ext-req-true');

					if (inputsArrF.classList.contains('form-ext-multi-true')) {
						//Checkboxes
						var checkboxInputs = inputsArrF.querySelectorAll('input[type="checkbox"]:checked');
						if (checkboxInputs.length) {
							var checkboxValues = '';
							checkboxInputs.forEach(function(v, index) {
								var closestContainer = v.closest('.form-ext-checkbox-container');
								checkboxValues += (index > 0 ? ", " : "") + (closestContainer.textContent || closestContainer.innerText);
							});
							content[currentId] = checkboxValues;
						} else if (isVariantInputFieldRequired) {
							inputsArrF.classList.add('form-control-error');
						}
					} else {
						//Radio
						var radioInputs = inputsArrF.querySelectorAll('input[type="radio"]:checked');
					
						if (radioInputs.length) {
							radioInputs.forEach(function(v) {
								var closestContainer = v.closest('.form-ext-checkbox-container');
								content[currentId] = closestContainer.textContent || closestContainer.innerText;
							});
						} else if (isVariantInputFieldRequired) {
							inputsArrF.classList.add('form-control-error');
						}
					}
				}

				if (inputsArrF.classList.contains('form-ext-field-dd')) {
					// DropDown list
					content[currentId] = LGWGService.isFormExtFieldValid(inputsArrF);
				}

				if (inputsArrF.classList.contains('form-ext-field-date')) {
					// Datepicker
					content[currentId] = LGWGService.isFormExtFieldValid(inputsArrF);
				}

				if (inputsArrF.classList.contains('form-ext-field-rating')) {
					// Rating
					content[currentId] = LGWGService.isRatingFieldValid(inputsArrF);
				}

				if (inputsArrF.classList.contains('form-ext-field-term')) {
					var isTermInputFieldRequired = inputsArrF.classList.contains('form-ext-req-true');
					var termCheckboxInput = inputsArrF.querySelectorAll('input[type="checkbox"]:checked');

					if (isTermInputFieldRequired && !termCheckboxInput.length) {
						inputsArrF.classList.add('form-control-error');
					}
				}

				if (inputsArrF.classList.contains('form-control-error')) {
					paramsToSend.error = true;
				}
			}
		},
		sendRequestForm: function(data, serviceData, formType, btn) {
			var visualObjNewPopup = serviceData.widgetObj;
			var currentCouponValue = null;
			var roistatIdNew = LeadCore.getCookie("roistat_visit");
			if (roistatIdNew) {
				data.roistatId = roistatIdNew;
			}
			
			function callbackGood() {
			    if (serviceData.onTargetScript) {
			    	var targetScript;
			    	if (serviceData.jsInfo.enablePlaceholding) {
			    		targetScript = LeadCoreExt.parseFieldsForWidgetScript(serviceData.onTargetScript, data);
			    	}
			    	LeadCoreExt.buildWidgetScript(targetScript || serviceData.onTargetScript);
			    }

		    	if (btn) {
		    		btn.classList.remove('load-stripped');
		    		btn.removeAttribute("disabled", "disabled");
		    	}
		    	if (serviceData.redirectData) {
		    		LGWGService.redirectIfOn(data, serviceData.redirectData.blank, serviceData.redirectData.url, serviceData.WidgetDotOffandNoShowThank);
		    	} else {
		    		LeadCoreExt.isCouponAndPossibleToCloseWidget(visualObjNewPopup[formType]) ? serviceData.WidgetDotOffandNoShowThank() : serviceData.WidgetDotOffandShowThank();
		    	}
		    	LeadCoreExt.openCouponCallback(serviceData.widgetLGWGNewPopupId, visualObjNewPopup[formType], formType, currentCouponValue, serviceData.metrikaId, serviceData.onTargetScript);
			}

			function callbackError() {
				if (btn) {
		    		btn.classList.remove('load-stripped');
		    		btn.removeAttribute("disabled", "disabled");
		    	}
			}

			LeadCore.sendAnalyticGlobal(serviceData.metrikaId);

			if (btn) {
				btn.classList.add('load-stripped');
				btn.setAttribute("disabled", "disabled");
			}

			function startCreationLead(couponCode, couponValue) {
				currentCouponValue = couponValue;
				if (couponCode && couponValue !== undefined) {
					data.coupons = { [couponCode]: couponValue };

					if (data.customFields) {
						for (const [key, value] of Object.entries(data.customFields)) {
							if (value === 'COUPON_LIST_LGWG') {
								// TODO: Maybe make sense to remove previous coupon and then add a new one from array if user wants to send form again with coupon callback
								if (!LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId]) {
			                    	LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId] = [];
			                    }
								LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId].push(couponValue);
								data.customFields[key] = LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId].join();
							}
						}
					}
				} else {
					if (data.customFields) {
						for (const [key, value] of Object.entries(data.customFields)) {
							if (value === 'COUPON_LIST_LGWG') {
								if (!LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId]) {
			                    	LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId] = [];
			                    }
								if (LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId].length) {
									data.customFields[key] = LeadCoreExt.hiddenFieldCoupons[serviceData.metrikaId].join();
								} else {
									delete data.customFields[key];
								}
							}
						}
					}
				}

				const serviceRedirect = serviceData.redirectData && serviceData.redirectData.blank;
				LeadCore.pushCreateLead(data, serviceRedirect, callbackGood, callbackError);
			}
			
			setTimeout(function() {
				if (LeadCoreExt.isItFormCallbackCoupon(visualObjNewPopup[formType])) {
					var couponCode = visualObjNewPopup[formType].couponCallback.coupon.coupon.code;
					var targetUrl = LeadCore.base + "/api/gate/sites/" + LeadCore.siteId + "/visits/" + LeadCore.currentVisitId + "/coupons/" + couponCode;
					
					
					LeadCoreExt.getPromise(targetUrl).then(function(response) {
						var result = JSON.parse(response).data;
						if (result) {
		                    startCreationLead(couponCode, result.value);
						} else {
		                    startCreationLead(null, "&nbsp;");
						}
					}, function(error) {
		                startCreationLead(null, "&nbsp;");
					});
				} else {
					startCreationLead(false, null);
				}
			}, 1000);	
		},
		formExtHrPosSelWholeForm: function(item) {
            var className = "";

            if (item.form_width_orientation_type.type === 0)
                className = "widget1-form-ext-w-hr-left";

            if (item.form_width_orientation_type.type === 1)
                className = "widget1-form-ext-w-hr-center";

            if (item.form_width_orientation_type.type === 2)
                className = "widget1-form-ext-w-hr-right";

            if (item.form_width_type.type === 0)
                className += " widget1-form-ext-w-hr-full-w";

            if (item.form_width_type.type === 1)
                className += " widget1-form-ext-w-hr-own";

            return className;
        },
        formExtGlobalAlignmentClass: function(item) {
            var className = "";

            if (item.orientation.type === 0) {
                className += " widget1-form-ext-bl-left";
            }

            if (item.orientation.type === 1) {
                className += " widget1-form-ext-bl-center";
            }

            if (item.orientation.type === 2) {
                className += " widget1-form-ext-bl-right";
            }

            return className;
        },
        setImageHeight: function(visualObjNewPopup, widgetImageLGWG, LGWGNewDotformBlock, LGWGNewDotButtonBlock, LGWGNewDotFormExtBlock) {
	 		if ((visualObjNewPopup.image.enable === true) && 
	 			(visualObjNewPopup.button.enable || visualObjNewPopup.form.enable || (visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable))) {

	 			var isFormToAllWidth = visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable ? 
									 visualObjNewPopup.formExt.model.mainSettings.visual.type === 1 :
									 visualObjNewPopup.form.visual === LeadCore.constants.toAllWidth;

	 			if (visualObjNewPopup.image.place === LeadCore.constants.fromLeft && isFormToAllWidth) {
					widgetImageLGWG.style.height = LGWGService.getTopValueOfColorPod(LGWGNewDotformBlock, LGWGNewDotButtonBlock, visualObjNewPopup, LGWGNewDotFormExtBlock) + 'px';
				}

				if (visualObjNewPopup.image.place === LeadCore.constants.fromRight && isFormToAllWidth) {
					widgetImageLGWG.style.height = LGWGService.getTopValueOfColorPod(LGWGNewDotformBlock, LGWGNewDotButtonBlock, visualObjNewPopup, LGWGNewDotFormExtBlock) + 'px';
				}
	 		}
	 	},
        imageStyle: function(visualObjNewPopup, LGWGLiFormBtn, LGWGLiFormExtBtn, LGWGNewColorPod, widgetImageLGWG, widgetMainWRLGWG, colorPodLGWG, isVideo, fillVideoArray) {
			if (visualObjNewPopup.form.enable || visualObjNewPopup.button.enable || (visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable)) {
				LGWGNewColorPod.classList.remove('lgwg-none');
			}

			var isFormUnderContent = visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable ? 
									 visualObjNewPopup.formExt.model.mainSettings.visual.type === 0 :
									 visualObjNewPopup.form.visual === LeadCore.constants.underContent;

			var isFormToAllWidth   = visualObjNewPopup.formExt && visualObjNewPopup.formExt.enable ? 
									 visualObjNewPopup.formExt.model.mainSettings.visual.type === 1 :
									 visualObjNewPopup.form.visual === LeadCore.constants.toAllWidth;

			if (visualObjNewPopup.image.enable === true) {
				widgetImageLGWG.classList.remove('lgwg-none');
				widgetImageLGWG.style.width = visualObjNewPopup.image.width + 'px';
				widgetImageLGWG.style.background = "url('" + visualObjNewPopup.image.url + "') center center / cover no-repeat";

				if(visualObjNewPopup.image.img_item_align) {
					widgetImageLGWG.style.background = "transparent";

					var imageTemplate = "";
					if (visualObjNewPopup.image.typeBl === 'imageBl') {
						imageTemplate = "<div class=\"widget-image-item-block\" style=\"background: url("+visualObjNewPopup.image.url+") center no-repeat;background-size: cover;width:"+visualObjNewPopup.image.img_item_widthpx+"px;height:"+visualObjNewPopup.image.img_item_heightpx+"px\"></div>";
					} else if (visualObjNewPopup.image.typeBl === 'videoBl') {
						imageTemplate = "<div class=\"widget-video-item-block\" style=\"width:"+visualObjNewPopup.image.img_item_widthpx+"px;height:"+visualObjNewPopup.image.img_item_heightpx+"px\"><iframe data-auto=\""+visualObjNewPopup.image.autoplay+"\" allow=\"autoplay; encrypted-media\" class=\"video-element-ifrm\" src=\""+visualObjNewPopup.image.videoUrl+"\" frameborder=\"0\" allowfullscreen></iframe></div>";
						isVideo = true;
					} else if (visualObjNewPopup.image.typeBl === 'paddingBl') {
						imageTemplate = "";
					}
			
					widgetImageLGWG.innerHTML = imageTemplate;

					if (visualObjNewPopup.image.img_item_type === LeadCore.constants.alignToAllSize) {
		                widgetImageLGWG.classList.add('widget-image-has-full-wh');
		            }

		            if (visualObjNewPopup.image.img_item_type === LeadCore.constants.alignToUserSize) {
		                if (visualObjNewPopup.image.img_item_align === LeadCore.constants.alignOnCenter)
		                	widgetImageLGWG.classList.add('widget-image-has-center-orient');

		                if (visualObjNewPopup.image.img_item_align === LeadCore.constants.alignOnTop)
		                	widgetImageLGWG.classList.add('widget-image-has-top-orient');

		                if (visualObjNewPopup.image.img_item_align === LeadCore.constants.alignOnBottom)
		                	widgetImageLGWG.classList.add('widget-image-has-bottom-orient');
		            }

		            if(isVideo) {
						fillVideoArray();
					}
				}


				if (visualObjNewPopup.image.place === LeadCore.constants.fromLeft && isFormUnderContent) {
					widgetImageLGWG.classList.add('widget-image-left');
					widgetMainWRLGWG.classList.add('widget-main-img-left');
					
					widgetMainWRLGWG.style.marginLeft  = visualObjNewPopup.image.width - 16 + 'px';
					widgetMainWRLGWG.style.marginRight = 0;
					
					var borderSlice = 0;
					if (visualObjNewPopup.bg.border && visualObjNewPopup.bg.border.enable && visualObjNewPopup.bg.border.thickness) {
						borderSlice = (2 * visualObjNewPopup.bg.border.thickness) - 1;
					}
					LGWGNewColorPod.style.width = (visualObjNewPopup.dhVisual.widget_width_nopx - visualObjNewPopup.image.width - borderSlice) + "px";
					LGWGNewColorPod.style.left = "auto";
					LGWGNewColorPod.style.right = "0";
				}

				if (visualObjNewPopup.image.place === LeadCore.constants.fromRight && isFormUnderContent) {
					widgetImageLGWG.classList.add('widget-image-right');
					widgetMainWRLGWG.classList.add('widget-main-img-right');
					
					widgetMainWRLGWG.style.marginRight  = visualObjNewPopup.image.width - 16 + 'px';
					widgetMainWRLGWG.style.marginLeft = 0;

					var borderSlice = 0;
					if (visualObjNewPopup.bg.border && visualObjNewPopup.bg.border.enable && visualObjNewPopup.bg.border.thickness) {
						borderSlice = (2 * visualObjNewPopup.bg.border.thickness) - 1;
					}

					LGWGNewColorPod.style.width = (visualObjNewPopup.dhVisual.widget_width_nopx - visualObjNewPopup.image.width - borderSlice) + "px";
					LGWGNewColorPod.style.left = "0";
					LGWGNewColorPod.style.right = "auto";
				}

				if (visualObjNewPopup.image.place === LeadCore.constants.fromTop) {
					widgetImageLGWG.classList.add('widget-image-top');
					widgetMainWRLGWG.classList.add('widget-main-img-top');
					
					widgetImageLGWG.style.width = '100%';
					widgetImageLGWG.style.height = visualObjNewPopup.image.height + 'px';
					widgetMainWRLGWG.style.marginLeft   = 0;
					widgetMainWRLGWG.style.marginRight  = 0;
					widgetMainWRLGWG.style.marginTop    = visualObjNewPopup.image.height + 'px';
					widgetMainWRLGWG.style.marginBottom = 0;
				}

				if (visualObjNewPopup.image.place === LeadCore.constants.fromBottom) {
					widgetImageLGWG.classList.add('widget-image-bottom');
					widgetMainWRLGWG.classList.add('widget-main-img-bottom');
					
					widgetImageLGWG.style.width = '100%';
					widgetImageLGWG.style.height = visualObjNewPopup.image.height + 'px';
					widgetMainWRLGWG.style.marginLeft   = 0;
					widgetMainWRLGWG.style.marginRight  = 0;
					widgetMainWRLGWG.style.marginTop    = 0;
					widgetMainWRLGWG.style.marginBottom = visualObjNewPopup.image.height + 'px';
				}

				if (visualObjNewPopup.image.place === LeadCore.constants.fromLeft && isFormToAllWidth) {
					widgetImageLGWG.classList.add('widget-image-left-all');
					widgetMainWRLGWG.classList.add('widget-main-img-left');
					
					widgetImageLGWG.style.height = visualObjNewPopup.image.height + 'px';
					widgetMainWRLGWG.style.marginLeft  = visualObjNewPopup.image.width - 16 + 'px';
					widgetMainWRLGWG.style.marginRight = 0;
					setStylesToFormBL(true);
					setStylesToFormExtBL(true);
				}

				if (visualObjNewPopup.image.place === LeadCore.constants.fromRight && isFormToAllWidth) {
					widgetImageLGWG.classList.add('widget-image-right-all');
					widgetMainWRLGWG.classList.add('widget-main-img-right');
					
					widgetImageLGWG.style.height = visualObjNewPopup.image.height + 'px';
					widgetMainWRLGWG.style.marginRight  = visualObjNewPopup.image.width - 16 + 'px';
					widgetMainWRLGWG.style.marginLeft = 0;
					setStylesToFormBL(false);
					setStylesToFormExtBL(false);
				}

				if ((!visualObjNewPopup.button.enable && !visualObjNewPopup.form.enable && (visualObjNewPopup.formExt && !visualObjNewPopup.formExt.enable)) && 
					(visualObjNewPopup.image.place === LeadCore.constants.fromRight || visualObjNewPopup.image.place === LeadCore.constants.fromLeft)) {
					
					widgetImageLGWG.style.height = "100%";
				}

				function getAllNextSiblings(element) {
				    var out = [];
				    while(element.nextSibling) {
				        out.push(element = element.nextSibling);
				    }

				    return out;
				}

				function setStylesToFormBL(isLeft) {
					if (LGWGLiFormBtn) {
						LGWGLiFormBtn.style.width = (visualObjNewPopup.dhVisual.CP_width - 95) + 'px';
						if (isLeft) {
							LGWGLiFormBtn.style.marginLeft = -visualObjNewPopup.image.width + 'px';
						} else {
							LGWGLiFormBtn.style.marginRight = -visualObjNewPopup.image.width + 'px';
						}

						var formSiblingsR = getAllNextSiblings(LGWGLiFormBtn);
						for(var i = 0; i < formSiblingsR.length; i++) {
							formSiblingsR[i].style.width = (visualObjNewPopup.dhVisual.CP_width - 95) + 'px';
							if (isLeft) {
								formSiblingsR[i].style.marginLeft = -visualObjNewPopup.image.width + 'px';
							} else {
								formSiblingsR[i].style.marginRight = -visualObjNewPopup.image.width + 'px';
							}
						}
					}
				}

				function setStylesToFormExtBL(isLeft) {
					if (LGWGLiFormExtBtn) {
						LGWGLiFormExtBtn.style.width = (visualObjNewPopup.dhVisual.CP_width - 95) + 'px';
						if (isLeft) {
							LGWGLiFormExtBtn.style.marginLeft = -visualObjNewPopup.image.width + 'px';
						} else {
							LGWGLiFormExtBtn.style.marginRight = -visualObjNewPopup.image.width + 'px';
						}

						var formSiblingsR = getAllNextSiblings(LGWGLiFormExtBtn);
						for(var i = 0; i < formSiblingsR.length; i++) {
							formSiblingsR[i].style.width = (visualObjNewPopup.dhVisual.CP_width - 95) + 'px';
							if (isLeft) {
								formSiblingsR[i].style.marginLeft = -visualObjNewPopup.image.width + 'px';
							} else {
								formSiblingsR[i].style.marginRight = -visualObjNewPopup.image.width + 'px';
							}
						}
					}
				}
			}
		},
		setOutsideClickHandler: function(windowElement, documentElement) {
			windowElement.onclick = function(event) {
				if(LGWGService.clearDatetime) {
					LGWGService.clearDatetime();
				}

				if(LGWGService.clearDropdown) {
					LGWGService.clearDropdown();
				}
			}
		},
		checkIfCSSAlreadyLoaded: function(url, sheets) {
			var flag = false;
		    var ss = document.styleSheets;
		    for (var i = 0, max = ss.length; i < max; i++) {
		        if (ss[i].href === url) {
		        	flag = true;
		        }
		    }
		    return flag;
		},
		prepareHiddenFields: function(hiddenList, content) {
			hiddenList.forEach(hiddenField => {
				content[hiddenField.id] = this.checkHiddenTypes(hiddenField, );
			});
		},
		checkHiddenTypes: function(field) {
			switch (field.fieldType.type) {
				case 'utm_source':
					return this.checkUtmTagRule('utm_source', !field.utmRefPage.currentPage);

				case 'utm_medium':
					return this.checkUtmTagRule('utm_medium', !field.utmRefPage.currentPage);

				case 'utm_campaign':
					return this.checkUtmTagRule('utm_campaign', !field.utmRefPage.currentPage);

				case 'utm_term':
					return this.checkUtmTagRule('utm_term', !field.utmRefPage.currentPage);

				case 'utm_content':
					return this.checkUtmTagRule('utm_content', !field.utmRefPage.currentPage);

				case 'referrer':
					return this.checkReferrerRule('referrer', !field.utmRefPage.currentPage);

				case 'page_url':
					return window.location.href;

				case 'custom_parameter':
					return this.getURLTag(field.customParamValue);

				case 'browser_language':
					return this.getBrowserLanguage();

				case 'device_type':
					return this.getDeviceType();

				case 'device_os':
					return this.getBrowserOS();

				case 'timezone':
					return this.getBrowserTimezone();

				case 'coupon':
					return 'COUPON_LIST_LGWG';

				case 'session_number':
					return '' + LeadCore.visit.visitInfo.visitNo;

				case 'pageviews':
					return '' + (LeadCore.visit.visitInfo.actionsCount + 1);

				case 'cookie':
					return this.getBrowserCookie(field.cookieValue);

				case 'user_value':
					return field.customUserValue;

				default:
            		return '';
			}
		},
		getDeviceType: function() {
			const ua = navigator.userAgent;
			if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
				return 'tablet';
			}
			if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
				return 'mobile';
			}

			return 'desktop';
		},
		getBrowserLanguage: function() {
			return navigator.language || navigator.userLanguage; 
		},
		getBrowserOS: function() {
			// This script sets OSName variable as follows:
			// "Windows"    for all versions of Windows
			// "MacOS"      for all versions of Macintosh OS
			// "Linux"      for all versions of Linux
			// "UNIX"       for all other UNIX flavors 
			// "Unknown OS" indicates failure to detect the OS
			let OSName="Unknown OS";
			if (navigator.appVersion.indexOf("Win") !== -1) OSName="Windows";
			if (navigator.appVersion.indexOf("Mac") !== -1) OSName="MacOS";
			if (navigator.appVersion.indexOf("X11") !== -1) OSName="UNIX";
			if (navigator.appVersion.indexOf("Linux") !== -1) OSName="Linux";

			return OSName;
		},
		getBrowserTimezone: function() {
			const offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    		return 'UTC' + (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
		},
		getBrowserCookie: function(cookieName) {
			return LeadCore.getCookie(cookieName);
		},
		checkReferrerRule: function(tag, isFirstPage) {
			if (isFirstPage) {
				const cookieName = tag + 'URL';
				return this.getBrowserCookie(cookieName);
			} else {
				return document.referrer;
			}
		},
		checkUtmTagRule: function(tag, isFirstPage) {
			if (isFirstPage) {
				const cookieName = tag + 'URL';
				return this.getBrowserCookie(cookieName);
			} else {
				return this.getURLTag(tag);
			}
		},
		getURLTag: function(tag) {
			const url = new URL(window.location.href);
			return url.searchParams.get(tag);
		},
		getHrFlexedPosSel: function(type) {
			var className = '';

            if (type === 0)
                className = 'align-flexed-pos-left';

            if (type === 1)
                className = 'align-flexed-pos-center';

            if (type === 2)
                className = 'align-flexed-pos-right';

            return className;
		},
		showHideDigits: function(nullData, daysWR, hoursWR, minutesWR) {
			if (!nullData.d) {
				daysWR.classList.add("hide-current-type");
			}
			if (!nullData.h) {
				hoursWR.classList.add("hide-current-type");
			}
			if (!nullData.m) {
				minutesWR.classList.add("hide-current-type");
			}
		},
		getTimerItemLabel: function(item, text) {
			return item.design.tempInterval.enable ? "<div class=\"timer-items_label\" style=\"width:"+((2 * item.design.bgWidth) + (item.design.bgWidth * 0.2))+"px;font-size:"+item.design.fontLabelSize+"px;font-family:"+item.design.fontLabel.fontFamily+";color:"+item.design.colorIntervalName+"\">"+text+"</div>" : "";
		},
		getTimerItemLabelSeconds: function(item, text) {
			return item.design.tempInterval.enable ? "<div class=\"timer-items_label\" style=\"font-size:"+item.design.fontLabelSize+"px;font-family:"+item.design.fontLabel.fontFamily+";color:"+item.design.colorIntervalName+"\">"+text+"</div>" : "";
		},
		getTimerItemBlock: function(item, text, type) {
			return  "<div id=\""+item.ids+"_"+item.counter+"_"+type+"\" class=\"timer-items_item\">"+
						"<div class=\"timer-items_item-bgs-wrapper\">"+
							"<div class=\"timer-items_item-bgs\" style=\"width:"+((2 * item.design.bgWidth) + (item.design.bgWidth * 0.2))+"px;font-size:"+item.design.fontNumberSize+"px;font-family:"+item.design.font.fontFamily+";color:"+item.design.colorText+"\">"+
								"<div class=\"timer-item-block\" style=\"width:"+item.design.bgWidth+"px;height:"+item.design.bgHeight+"px;background:"+LGWGService.getRGBAColorItems(item.design.colorBG, item.design.opacity)+";border-radius:"+item.design.radius+"px\">"+
									"<span style=\"line-height:"+item.design.bgHeight+"px\">0</span>"+
								"</div>"+
								"<div class=\"timer-item-block\" style=\"width:"+item.design.bgWidth+"px;height:"+item.design.bgHeight+"px;background:"+LGWGService.getRGBAColorItems(item.design.colorBG, item.design.opacity)+";border-radius:"+item.design.radius+"px\">"+
									"<span style=\"line-height:"+item.design.bgHeight+"px\">0</span>"+
								"</div>"+
							"</div>"+
							"<div class=\"timer-items_dots\" style=\"width:"+(0.5 * item.design.bgWidth)+"px; height:"+(0.5 * item.design.bgHeight)+"px\">"+
								"<div style=\"background:"+item.design.colorDevider+"\"></div>"+
								"<div style=\"background:"+item.design.colorDevider+"\"></div>"+
							"</div>"+
						"</div>"+
						this.getTimerItemLabel(item, text)+
					"</div>";
		},
		getTimerItemBlockSeconds: function(item, text) {
			return  "<div id=\""+item.ids+"_"+item.counter+"_secs\" class=\"timer-items_item\">"+
						"<div class=\"timer-items_item-bgs-wrapper\">"+
							"<div class=\"timer-items_item-bgs\" style=\"width:"+((2 * item.design.bgWidth) + (item.design.bgWidth * 0.2))+"px;font-size:"+item.design.fontNumberSize+"px;font-family:"+item.design.font.fontFamily+";color:"+item.design.colorText+"\">"+
								"<div class=\"timer-item-block\" style=\"width:"+item.design.bgWidth+"px;height:"+item.design.bgHeight+"px;background:"+LGWGService.getRGBAColorItems(item.design.colorBG, item.design.opacity)+";border-radius:"+item.design.radius+"px\">"+
									"<span style=\"line-height:"+item.design.bgHeight+"px\">0</span>"+
								"</div>"+
								"<div class=\"timer-item-block\" style=\"width:"+item.design.bgWidth+"px;height:"+item.design.bgHeight+"px;background:"+LGWGService.getRGBAColorItems(item.design.colorBG, item.design.opacity)+";border-radius:"+item.design.radius+"px\">"+
									"<span style=\"line-height:"+item.design.bgHeight+"px\">0</span>"+
								"</div>"+
							"</div>"+
						"</div>"+
						this.getTimerItemLabelSeconds(item, text)+
					"</div>";
		},
		//TIMER SERVICE
		getTimerMarkup: function(timerModel) {
			return "<div><div class=\"timer-wrapper "+this.getHrFlexedPosSel(timerModel.design.align.type)+"\">"+
						"<div class=\"timer-items\">"+
							this.getTimerItemBlock(timerModel, timerModel.design.tempInterval.dText, 'days')+
							this.getTimerItemBlock(timerModel, timerModel.design.tempInterval.hText, 'hours')+
							this.getTimerItemBlock(timerModel, timerModel.design.tempInterval.mText, 'mins')+
							this.getTimerItemBlockSeconds(timerModel, timerModel.design.tempInterval.sText)+
						"</div>"+
				  	"</div></div>";
		},
		isGMT: function(item) {
			return item.type.type === 0 && item.timezoneType === 'gmt';
		},
		getCountDownMS: function(model) {
			return (model.d * 86400000) + (model.h * 3600000) + (model.m * 60000) + (model.s * 1000);
		},
	    getTimeRemaining: function(endtime, offsetTZ) {
	    	const currentTime = new Date();
			const total = endtime.getTime() - currentTime.getTime() - offsetTZ;
			const seconds = Math.floor((total / 1000) % 60);
			const minutes = Math.floor((total / 1000 / 60) % 60);
			const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
			const days = Math.floor(total / (1000 * 60 * 60 * 24));

			return {
				total,
				days,
				hours,
				minutes,
				seconds
			};
		},
		prepareItemTime: function(data) {
	    	return ('0' + data).slice(-2);
	    }
	};
})();

LGWGService.setOutsideClickHandler(window);



