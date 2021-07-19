const widgetModel = {
    "guiprops":{
        "elementsList":[
            {
                "name":"title-element",
                "textSummer":"<p>Вы можете редактировать этот текст. Если вы хотите<br>изменить цвет, позиционирование или стиль текста,<br>то выделите фрагмент для появления окна редактора.<br>Размер и шрифт изменяются слева в блоке настроек элемента.</p>",
                "font":{
                    "name":"Arial",
                    "fontFamily":"Arial, sans-serif"
                },
                "fontType":"systemFont",
                "fontName":"",
                "fontSize":12,
                "counter":1,
                "textShadow":{
                    "enable":false,
                    "color":"#000000",
                    "opacity":"1",
                    "rgbaColor":"rgba(255, 255, 255, 1)",
                    "horiz":0,
                    "vertical":0,
                    "blur":0
                }
            },
            {
                "name":"social-element"
            }
        ],
        "selected":null,
        "title":{
            "enable":false,
            "textSummer":"<p>Заголовок (выделите для редактирования)</p>",
            "font":{
                "name":"Arial",
                "fontFamily":"Arial, sans-serif"
            },
            "fontType":"systemFont",
            "fontName":"",
            "fontSize":22
        },
        "exit":{
            "enable":false,
            "textSummer":"<span>Закрыть окно (выделите, что бы редактировать)</span>",
            "font":{
                "name":"Arial",
                "fontFamily":"Arial, sans-serif"
            },
            "fontType":"systemFont",
            "fontName":"",
            "position":"Слева",
            "fontSize":14,
            "button":{
                "enable":false,
                "textSummer":"<span>Закрыть окно</span>",
                "font":{
                    "name":"Arial",
                    "fontFamily":"Arial, sans-serif"
                },
                "fontType":"systemFont",
                "fontName":"",
                "fontSize":20,
                "colorBtn":"#000000",
                "colorTextBtn":"#FFFFFF",
                "borderRadiusBtn":0,
                "btn_width":"Авто",
                "btn_widthpx":200,
                "position":"Слева",
                "styleType":"Default"
            },
            "couponCallback":{
                "enable":false,
                "elementType":"closeBtn",
                "coupon":{
                    "name":"coupon-element",
                    "coupon":{
                        "id":null,
                        "name":"Какой купон хотите использовать?"
                    },
                    "font":{
                        "name":"Arial",
                        "fontFamily":"Arial, sans-serif"
                    },
                    "fontType":"systemFont",
                    "fontName":"",
                    "fontSize":18,
                    "colorText":"#262626",
                    "color":"#BEBECC",
                    "opacity":"1",
                    "borderRadius":5,
                    "rgbaColor":"rgba(190, 190, 204, 1)",
                    "hoverText":"Скопировать",
                    "clickText":"Скопировано",
                    "actionText":"Кликните, чтобы скопировать ваш купон на скидку",
                    "manualText":"Вы можете использовать данный купон при оформлении заказа",
                    "width_type":"От края до края",
                    "widthpx":100,
                    "counter":0,
                    "position":"По центру",
                    "positionPopup":"По центру окна браузера",
                    "closeAfter":false,
                    "isCopyAction":false,
                    "title":{
                        "enable":false,
                        "textSummer":"<p>Вы можете редактировать этот текст. Если вы хотите<br>изменить цвет, позиционирование или стиль текста,<br>то выделите фрагмент для появления окна редактора.<br>Размер и шрифт изменяются слева в блоке настроек элемента.</p>",
                        "font":{
                            "name":"Arial",
                            "fontFamily":"Arial, sans-serif"
                        },
                        "fontType":"systemFont",
                        "fontName":"",
                        "fontSize":12,
                        "textShadow":{
                            "enable":false,
                            "color":"#262626",
                            "opacity":"1",
                            "rgbaColor":"rgba(38, 38, 38, 1)",
                            "horiz":0,
                            "vertical":0,
                            "blur":0
                        }
                    }
                }
            }
        },
        "thank":{
            "enable":false,
            "textSummer":"<p>Спасибо!</p>",
            "font":{
                "name":"Arial",
                "fontFamily":"Arial, sans-serif"
            },
            "fontType":"systemFont",
            "fontName":"",
            "fontSize":20
        },
        "thank2":{
            "textSummer":"<p>Форма успешно отправлена.</p>"
        },
        "desc":{
            "enable":false,
            "textSummer":"<p>Описание (выделите для редактирования)</p>",
            "font":{
                "name":"Arial",
                "fontFamily":"Arial, sans-serif"
            },
            "fontType":"systemFont",
            "fontName":"",
            "fontSize":18
        },
        "form":{
            "enable":false,
            "colorTitleInputForm":"#000000",
            "bgInputForm":"#FFFFFF",
            "opacityBgInputForm":"1",
            "borderRadiusInputForm":"0",
            "rgbaInputForm":"rgba(255, 255, 255, 1)",
            "orient":"Вертикальная",
            "visual":"Под контентом",
            "border":{
                "enable":false,
                "color":"#000000"
            },
            "colorPod":{
                "enable":false,
                "color":"#000000",
                "opacityColorPod":"1",
                "rgbaColorPod":"transparent!important"
            },
            "width_type":"От края до края",
            "position":"Слева",
            "form_width_type":"От края до края",
            "form_position":"Слева",
            "form_widthpx":200,
            "widthpx":100,
            "couponCallback":{
                "enable":false,
                "elementType":"form",
                "coupon":{
                    "name":"coupon-element",
                    "coupon":{
                        "id":null,
                        "name":"Какой купон хотите использовать?"
                    },
                    "font":{
                        "name":"Arial",
                        "fontFamily":"Arial, sans-serif"
                    },
                    "fontType":"systemFont",
                    "fontName":"",
                    "fontSize":18,
                    "colorText":"#262626",
                    "color":"#BEBECC",
                    "opacity":"1",
                    "borderRadius":5,
                    "rgbaColor":"rgba(190, 190, 204, 1)",
                    "hoverText":"Скопировать",
                    "clickText":"Скопировано",
                    "actionText":"Кликните, чтобы скопировать ваш купон на скидку",
                    "manualText":"Вы можете использовать данный купон при оформлении заказа",
                    "width_type":"От края до края",
                    "widthpx":100,
                    "counter":0,
                    "position":"По центру",
                    "positionPopup":"По центру окна браузера",
                    "closeAfter":false,
                    "isCopyAction":false,
                    "title":{
                        "enable":false,
                        "textSummer":"<p>Вы можете редактировать этот текст. Если вы хотите<br>изменить цвет, позиционирование или стиль текста,<br>то выделите фрагмент для появления окна редактора.<br>Размер и шрифт изменяются слева в блоке настроек элемента.</p>",
                        "font":{
                            "name":"Arial",
                            "fontFamily":"Arial, sans-serif"
                        },
                        "fontType":"systemFont",
                        "fontName":"",
                        "fontSize":12,
                        "textShadow":{
                            "enable":false,
                            "color":"#262626",
                            "opacity":"1",
                            "rgbaColor":"rgba(38, 38, 38, 1)",
                            "horiz":0,
                            "vertical":0,
                            "blur":0
                        }
                    }
                }
            }
        },
        "button":{
            "enable":false,
            "textSummer":"<span>Отправить</span>",
            "font":{
                "name":"Arial",
                "fontFamily":"Arial, sans-serif"
            },
            "fontType":"systemFont",
            "fontName":"",
            "fontSize":20,
            "colorBtn":"#000000",
            "colorTextBtn":"#FFFFFF",
            "borderRadiusBtn":0,
            "btn_width":"Авто",
            "btn_widthpx":200,
            "position":"Слева",
            "styleType":"Default"
        },
        "image":{
            "enable":false,
            "type":"От края до края",
            "place":"Слева",
            "img_width":"Авто",
            "img_widthpx":100,
            "img_height":"Авто",
            "img_heightpx":100,
            "width":33,
            "height":100,
            "url":"https://static.leadgenic.com/lg_widgets_l11/img/image_def.jpg",
            "typeBl":"imageBl",
            "img_item_widthpx":100,
            "img_item_heightpx":100,
            "img_item_type":"Растянуть по ширине и высоте блока",
            "img_item_align":"По центру",
            "videoUrl":"https://",
            "videoId":"",
            "videoType":"youtube",
            "autoplay":false
        },
        "bg":{
            "fillorImg":"fill",
            "colorBg":"#FBFBFB",
            "bgStyle":"#fff",
            "fillorContentImg":"fill",
            "colorContentBg":"#FFFFFF",
            "borderRadius":"10",
            "border":{
                "enable":false,
                "style":"0px solid transparent",
                "color":"#000000",
                "thickness":"1"
            },
            "shadow":{
                "enable":true,
                "style":"0px 1px 5px rgba(0, 0, 0, 0.3)",
                "color":"#000000",
                "opacity":"0.3",
                "rgbaColor":"rgba(0, 0, 0, 0.3)",
                "horiz":0,
                "vertical":1,
                "blur":5
            },
            "mask":{
                "enable":false,
                "area":"Вся площадь виджета",
                "color":"#000000",
                "rgbaColor":"transparent!important",
                "opacity":"1"
            },
            "positionType":"Растянуть",
            "tiles":"Замостить по X",
            "url":"https://static.leadgenic.com/lg_widgets_l11/img/image_def.jpg",
            "opacity":"1",
            "video":{
                "videoUrl":"https://",
                "videoId":"",
                "videoType":"youtube",
                "isVideoBG":true
            }
        },
        "formSet":{
            "items":[
                {
                    "state":0,
                    "type":"email",
                    "required":false,
                    "placeholder":"Введите Ваш email"
                }
            ],
            "phoneMask":{
                "enable":false,
                "maskValue":"+7 (***) ***-**-**"
            },
            "redirect":{
                "enable":false,
                "url":"",
                "blank":false
            }
        },
        "dhVisual":{
            "enable":true,
            "enableBlink":false,
            "title":"Подписывайтесь на нас в Twitter!",
            "colorMain":"rgba(255, 255, 255, 1);",
            "place":"Правый нижний угол",
            "colorBg":"rgba(65, 171, 225, 0.6)",
            "rgbaShadowForm1":"rgba(65, 171, 225, 0.6);",
            "rgbaShadowForm2":"rgba(65, 171, 225, 0.8);",
            "widget_width":"Собственная",
            "widget_widthpx":800,
            "widget_heightpx":800,
            "widget_content_width":"Собственная",
            "widget_content_widthpx":400,
            "widget_content_height":"Авто",
            "widget_content_heightpx":300,
            "widget_content_height_orient":"От верхней границы",
            "selectedIcon":"",
            "iconOrImage":"useIcon",
            "url":"https://static.leadgenic.com/lg_widgets_l11/img/image_def.jpg",
            "widget_width_all":"377px",
            "widget_height_all":"156px",
            "widget_plash_width":"auto",
            "widget_width_nopx":377,
            "widget_height_nopx":156,
            "widget_ul_width_nopx":341,
            "CP_width":436,
            "CP_offset_top":"auto",
            "showAddButtonOnWidget":true,
            "selectIcon":null,
            "lastModifiedDate":"2021-07-01T11:31:38.239Z"
        },
        "popupMain":{
            "place":"По центру окна браузера",
            "shadow":{
                "enable":false,
                "color":"#000000",
                "opacityColor":"0.5",
                "rgbaColor":"transparent!important"
            }
        },
        "staticMain":{
            "position":"По центру"
        },
        "social":{
            "vkontakte":false,
            "facebook":"facebook",
            "googleplus":"googleplus",
            "digg":"digg",
            "twitter":"twitter",
            "pinterest":"pinterest",
            "buffer":false,
            "pocket":false,
            "odnoklassniki":false,
            "stumbleupon":false,
            "reddit":"reddit",
            "linkedid":false,
            "items":[
                {
                    "name":"facebook"
                },
                {
                    "name":"googleplus"
                },
                {
                    "name":"digg"
                },
                {
                    "name":"pinterest"
                },
                {
                    "name":"twitter"
                },
                {
                    "name":"reddit"
                }
            ],
            "position":"По центру",
            "sizeBtn":"Большой",
            "type":"style-2",
            "linkForShare":"site",
            "couponCallback":{
                "enable":false,
                "elementType":"social",
                "coupon":{
                    "name":"coupon-element",
                    "coupon":{
                        "id":null,
                        "name":"Какой купон хотите использовать?"
                    },
                    "font":{
                        "name":"Arial",
                        "fontFamily":"Arial, sans-serif"
                    },
                    "fontType":"systemFont",
                    "fontName":"",
                    "fontSize":18,
                    "colorText":"#262626",
                    "color":"#BEBECC",
                    "opacity":"1",
                    "borderRadius":5,
                    "rgbaColor":"rgba(190, 190, 204, 1)",
                    "hoverText":"Скопировать",
                    "clickText":"Скопировано",
                    "actionText":"Кликните, чтобы скопировать ваш купон на скидку",
                    "manualText":"Вы можете использовать данный купон при оформлении заказа",
                    "width_type":"От края до края",
                    "widthpx":100,
                    "counter":0,
                    "position":"По центру",
                    "positionPopup":"По центру окна браузера",
                    "closeAfter":false,
                    "isCopyAction":false,
                    "title":{
                        "enable":false,
                        "textSummer":"<p>Вы можете редактировать этот текст. Если вы хотите<br>изменить цвет, позиционирование или стиль текста,<br>то выделите фрагмент для появления окна редактора.<br>Размер и шрифт изменяются слева в блоке настроек элемента.</p>",
                        "font":{
                            "name":"Arial",
                            "fontFamily":"Arial, sans-serif"
                        },
                        "fontType":"systemFont",
                        "fontName":"",
                        "fontSize":12,
                        "textShadow":{
                            "enable":false,
                            "color":"#262626",
                            "opacity":"1",
                            "rgbaColor":"rgba(38, 38, 38, 1)",
                            "horiz":0,
                            "vertical":0,
                            "blur":0
                        }
                    }
                }
            },
            "tumblr":false,
            "mail":false,
            "xing":false,
            "print":false,
            "linkedin":false,
            "blogger":false,
            "yummly":false
        },
        "labelMain":{
            "place":"Нижний левый угол",
            "width":1,
            "height":1,
            "text":"Подпишитесь на нашу рассылку!",
            "font":{
                "name":"Arial",
                "fontFamily":"Arial, sans-serif"
            },
            "fontType":"systemFont",
            "fontName":"",
            "fontSize":16,
            "colorLabel":"#000000",
            "colorText":"#FFFFFF",
            "opacityBgLabel":"1",
            "borderRadiusLabel":"0",
            "rgbaLabel":"rgba(0, 0, 0, 1)",
            "icon":{
                "enable":false,
                "color":"#FFFFFF",
                "selectedIcon":"fas fa-circle"
            },
            "iconOrImage":"useIcon",
            "url":"https://static.leadgenic.com/lg_widgets_l11/img/image_def.jpg"
        },
        "formExt":{
            "enable":false,
            "model":{
                "list":[
                    
                ],
                "mainSettings":{
                    "colorTitleInputForm":"#000000",
                    "bgInputForm":"#EFEFEF",
                    "opacityBgInputForm":"1",
                    "borderRadiusInputForm":"0",
                    "rgbaInputForm":"",
                    "orientation":{
                        "type":0,
                        "label":"По левому краю"
                    },
                    "visual":{
                        "type":0,
                        "label":"Под контентом"
                    },
                    "border":{
                        "enable":false,
                        "color":"#000000"
                    },
                    "colorPod":{
                        "enable":false,
                        "color":"#000000",
                        "opacityColorPod":"1",
                        "rgbaColorPod":""
                    },
                    "form_width_type":{
                        "type":0,
                        "label":"От края до края"
                    },
                    "form_width_orientation_type":{
                        "type":0,
                        "label":"Слева"
                    },
                    "form_widthpx":200
                }
            },
            "couponCallback":{
                "enable":false,
                "elementType":"form",
                "coupon":{
                    "name":"coupon-element",
                    "coupon":{
                        "id":null,
                        "name":"Какой купон хотите использовать?"
                    },
                    "font":{
                        "name":"Arial",
                        "fontFamily":"Arial, sans-serif"
                    },
                    "fontType":"systemFont",
                    "fontName":"",
                    "fontSize":18,
                    "colorText":"#262626",
                    "color":"#BEBECC",
                    "opacity":"1",
                    "borderRadius":5,
                    "rgbaColor":"rgba(190, 190, 204, 1)",
                    "hoverText":"Скопировать",
                    "clickText":"Скопировано",
                    "actionText":"Кликните, чтобы скопировать ваш купон на скидку",
                    "manualText":"Вы можете использовать данный купон при оформлении заказа",
                    "width_type":"От края до края",
                    "widthpx":100,
                    "counter":0,
                    "position":"По центру",
                    "positionPopup":"По центру окна браузера",
                    "closeAfter":false,
                    "isCopyAction":false,
                    "title":{
                        "enable":false,
                        "textSummer":"<p>Вы можете редактировать этот текст. Если вы хотите<br>изменить цвет, позиционирование или стиль текста,<br>то выделите фрагмент для появления окна редактора.<br>Размер и шрифт изменяются слева в блоке настроек элемента.</p>",
                        "font":{
                            "name":"Arial",
                            "fontFamily":"Arial, sans-serif"
                        },
                        "fontType":"systemFont",
                        "fontName":"",
                        "fontSize":12,
                        "textShadow":{
                            "enable":false,
                            "color":"#262626",
                            "opacity":"1",
                            "rgbaColor":"rgba(38, 38, 38, 1)",
                            "horiz":0,
                            "vertical":0,
                            "blur":0
                        }
                    }
                }
            }
        }
    },
    "autoinvite":{
        "pages":{
            "enable":false,
            "value":1
        },
        "seconds":{
            "enabled":false,
            "value":1
        },
        "inactive":{
            "enabled":false,
            "value":1
        },
        "percent":{
            "enable":false,
            "value":1
        },
        "click":{
            "enable":false,
            "value":""
        },
        "exit":{
            "enabled":false
        },
        "sound":{
            "enabled":false
        },
        "ruleLogic":"при соблюдении ВСЕХ активированных правил"
    },
    "autoresponder":{
        
    },
    "restrictions":{
        "autoinvite":{
            "enable":false,
            "gap":24
        },
        "target":{
            "mode":1,
            "gap":48
        },
        "unique":{
            "enable":false,
            "gap":24
        },
        "count":{
            "enable":false,
            "count":1,
            "unit":"SEC",
            "interval":1
        },
        "action":{
            "enable":false,
            "gap":24
        }
    },
    "rules":{
        "pageNo":{
            "enable":false,
            "items":[
                
            ]
        },
        "time":{
            "enable":false,
            "items":[
                {
                    "startTime":0,
                    "endTime":0
                }
            ]
        },
        "days":{
            "enable":false,
            "items":[
                
            ]
        },
        "period":{
            "enable":false,
            "startDate":"01.07.2021",
            "endDate":"01.07.2021"
        },
        "prevPages":{
            "enable":false,
            "items":[
                {
                    "compare":0,
                    "type":0,
                    "value":""
                }
            ]
        },
        "pages":{
            "enable":false,
            "items":[
                {
                    "state":0,
                    "compare":0,
                    "type":0,
                    "value":""
                }
            ]
        }
    },
    "audiencesEnabled":false,
    "sendCrm":false,
    "coupons":[
        
    ],
    "integrations":[
        
    ],
    "useCustomIntegrationsList":false,
    "customFields":[
        
    ],
    "jsInfo":{
        "onShowScript":{
            "enable":false,
            "script":null
        },
        "onTargetScript":{
            "enable":false,
            "script":null
        },
        "enablePlaceholding":false
    }
};