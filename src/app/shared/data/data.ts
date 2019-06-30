export const gloveColor = ["#010101", "#863615", "#000080", "#4169e1", "#e60000", "#f95a01", "#ffe87a", "#ba5900", "#edef53", "#ffffff", "#606060", "#fbdb01"]
export const qoData = [{
    "id": "gloveSeries",
    "elementId": "wccf_product_field_glove_series",
    "elementLabel": "Glove Series",
    "elementHelpTitle":"",
    "elementHelp": "Pick the best glove quality for you.",
    "elementSort": 0,
    "elementType": "select",
    "domVisibility": "required",
    "elementOptions": [{
        "innerHtml": "Pro Cowhide",
        "id": "wccf_product_field_glove_series",
        "glove_section":"logo",  
        "value": "cowhide"
    }, {
        "innerHtml": "Rise",
        "id": "wccf_product_field_glove_series",
        "glove_section":"logo",   
        "value": "rise_series"
    }, {
        "innerHtml": "Elite",
        "id": "wccf_product_field_glove_series",
        "glove_section":"logo",
        "value": "elite_japanese_steer"
    }, {
        "innerHtml": "Elite Kip",
        "id": "wccf_product_field_glove_series",
        "glove_section":"logo",
        "value": "elite_kip"
    }]
}, {
    "id": "gloveCondition",
    "elementId": "wccf_product_field_glove_condition",
    "elementLabel": "Glove Condition",
    "elementHelpTitle":"",
    "elementHelp": "Stiff: All gloves are stiff after construction. If you want to control the break-in process of your glove, choose Stiff.    Soften: To get in the game faster, we start the break-in process.",
    "elementSort": 0,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": false,
    "elementOptions": [{
        "innerHtml": "Stiff",
        "value": "Stiff"
    }, {
        "innerHtml": "Soften",
        "value": "soften"
    }]
}, {
    "id": "gloveGloveHand",
    "elementId": "wccf_product_field_glove_hand",
    "elementLabel": "Catching Hand",
    "elementHelpTitle":"",
    "elementHelp": "Pick the best glove quality for you.",
    "elementSort": 0,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": false,
    "elementOptions": [{
        "innerHtml": "Left Hand",
        "value": "left_hand"
    }, {
        "innerHtml": "Right Hand",
        "value": "right_hand"
    }]
}, {
    "id": "palmStrength",
    "elementId": "wccf_product_field_palm_protection",
    "elementLabel": "Palm Protection",
    "elementHelpTitle":"",
    "elementHelp": "Pick the best glove quality for you.",
    "elementSort": 2,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": false,
    "elementOptions": [{
        "innerHtml": "No Padding",
        "value": "no_padding"
    }, {
        "innerHtml": "Padding",
        "value": "padding"
    }]
}, {
    "id": "gloveWeb", 
    "elementId": "",
    "elementLabel": "Glove Web",
    "elementHelpTitle":"",
    "elementHelp": "Pick the best glove quality for you.",
    "elementSort": 1,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "uri": "https:\/\/media.9positions.com\/",
    "elementOptions":[{
            "innerHtml": "Triple Bar F",
            "file": "wp-content\/uploads\/2019\/05\/26202314\/F.png",
            "gloveType": ['outfield','firstbase'],
            "value": ""
        }, {
            "innerHtml": "FX-1865 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202316\/FX-_1865.png",
            "gloveType": ['outfield','firstbase'],
            "value": ""
        }, {
            "innerHtml": "F Wide Bar",
            "file": "wp-content\/uploads\/2019\/05\/26202317\/FX-1865.png",
            "gloveType": ['outfield','firstbase'],
            "value": ""
        }, {
            "innerHtml": "H Web",
            "file": "wp-content\/uploads\/2019\/05\/26202318\/H-548.png",
            "gloveType": ['outfield','firstbase',"infield"],
            "value": ""
        }, {
            "innerHtml": "T Diamond Web",
            "file": "wp-content\/uploads\/2019\/05\/26202326\/T-Diamond-1854.png",
            "gloveType": ['outfield','firstbase'],
            "value": ""
        }, {
            "innerHtml": "TV Single Lace",
            "file": "wp-content\/uploads\/2019\/05\/26202334\/TV-single-lace-572.png",
            "gloveType": ['outfield','firstbase'],
            "value": ""
        }, {
            "innerHtml": "TV Triple Lace",
            "file": "wp-content\/uploads\/2019\/05\/26202335\/TV-Triple-lace-1863.png",
            "gloveType": ['outfield','firstbase'],
            "value": ""
        },{
            "innerHtml": "Trapeze Web",
            "file": "wp-content\/uploads\/2019\/05\/26202327\/T.png",
            "gloveType": ['outfield','infield','firstbase','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Buzzsaw Web",
            "file": "wp-content\/uploads\/2019\/05\/26202304\/Buzzsaw.png",
            "gloveType": ['outfield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Blank Web",
            "file": "wp-content\/uploads\/2019\/05\/26202257\/Blank.png",
            "gloveType": ['outfield','infield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Basket XV Web",
            "file": "wp-content\/uploads\/2019\/05\/26202256\/Basket-XV-1926.png",
            "gloveType": ['outfield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Basket Volcano Web",
            "file": "wp-content\/uploads\/2019\/05\/26202254\/Basket-Volcano.png",
            "gloveType": ['outfield','infield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Basket Single Lace",
            "file": "wp-content\/uploads\/2019\/05\/26202252\/Basket-Single-lace-585.png",
            "gloveType": ['outfield','infield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Basket Web",
            "file": "wp-content\/uploads\/2019\/05\/26202251\/Basket-II.png",
            "gloveType": ['outfield','infield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Baseball 1890 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202250\/Baseball-1890.png",
            "gloveType": ['outfield','infield','pitcher'],
            "value": ""
        }, {
            "innerHtml": "Baseball 1856 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202249\/Baseball-1856.png",
            "gloveType": ['pitcher','infield'],
            "value": ""
        }, {
            "innerHtml": "2 Spiral Web",
            "file": "wp-content\/uploads\/2019\/05\/26202247\/2-Spiral-294.png",
            "gloveType": ['pitcher'],
            "value": ""
        }, {
            "innerHtml": "2 Piece Web",
            "file": "wp-content\/uploads\/2019\/05\/26202245\/2-piece-1853.png",
            "gloveType": ['infield','pitcher'],
            "value": ""
        },  {
            "innerHtml": "W Single Lace",
            "file": "wp-content\/uploads\/2019\/05\/26202240\/W-Single-lace.png",
            "gloveType": ['outfield','pitcher'],
            "value":""
        }, {
            "innerHtml": "W Double Lace",
            "file": "wp-content\/uploads\/2019\/05\/26202239\/W-Double-lace-1899.png",
            "gloveType": ['outfield','pitcher'],
            "value":""
        },  {
            "innerHtml": "6 Finger Web",
            "file": "wp-content\/uploads\/2019\/05\/26202241\/Wide-Trap-1860.png",
            "gloveType": ['outfield','pitcher','infield'],
            "value":""
        },  {
            "innerHtml": "V 5581 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202613\/V-5581.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "V1919 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202337\/V-1919.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Trap-II Web",
            "file": "wp-content\/uploads\/2019\/05\/26202331\/Trap-II-1858.png",
            "gloveType": ['infield'],
            "value": ""
        }, {
            "innerHtml": "Trap-I2 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202329\/Trap-12-551.png",
            "gloveType": ['infield'],
            "value": ""
        },  {
            "innerHtml": "Sunray Web",
            "file": "wp-content\/uploads\/2019\/05\/26202325\/Sunray.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Roman V Web",
            "file": "wp-content\/uploads\/2019\/05\/26202323\/Roman-V-510.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "I Web",
            "file": "wp-content\/uploads\/2019\/05\/26202320\/I-1921.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Hinge Web",
            "file": "wp-content\/uploads\/2019\/05\/26202319\/Hinge.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "F-Chev",
            "file": "wp-content\/uploads\/2019\/05\/26202313\/F-CHEV-1875.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Diagonal Tread Web",
            "file": "wp-content\/uploads\/2019\/05\/26202312\/Diagonal-Tread.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Cross 1898 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202311\/Cross-1898.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Buckle Web",
            "file": "wp-content\/uploads\/2019\/05\/26202302\/Buckle-1864.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Box Web",
            "file": "wp-content\/uploads\/2019\/05\/26202259\/Box-1918.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "3 Cross Web",
            "file": "wp-content\/uploads\/2019\/05\/26202247\/3-Cross-1-.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "2 Cross Web",
            "file": "wp-content\/uploads\/2019\/05\/26202244\/2-Cross-1-293.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Y 1862 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202243\/Y-1862.png",
            "gloveType": ['infield'],
            "value": ""
        },
        {
            "innerHtml": "Y 1852 Web",
            "file": "wp-content\/uploads\/2019\/05\/26202242\/Y-1852.png",
            "gloveType": ['infield'],
            "value": ""
    }]

}, {
    "id": "gloveBody",
    "elementId": "wccf_product_field_glove_body_color_qo",
    "elementLabel": "Glove Body Color",
    "elementHelpTitle":"",
    "elementHelp": "Pick the best glove quality for you.",
    "elementSort": 1,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{
        "innerHtml": "Black",
        "hex": "#000000",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["kip","steer"],
        "value": "black"
    }, {
        "innerHtml": "Mocha",
        "hex": "#863615",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["kip","steer"],
        "value": "mocha"
    }, {
        "innerHtml": "Navy Blue",
        "hex": "#000080",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "navy_blue"
    }, {
        "innerHtml": "Royal Blue",
        "hex": "#4169e1",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "royal_blue"
    }, {
        "innerHtml": "Red",
        "hex": "#e60000",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["kip","steer"],
        "value": "red"
    }, {
        "innerHtml": "Orange",
        "hex": "#f95a01",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["kip","steer"],
        "value": "orange"
    }, {
        "innerHtml": "Camel",
        "hex": "#ffe87a",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "camel"
    }, {
        "innerHtml": "Tan",
        "hex": "#ba5900",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["kip","steer"],
        "value": "tan"
    }, {
        "innerHtml": "Lemon Yellow",
        "hex": "#edef53",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "lemon_yellow"
    }, {
        "innerHtml": "White",
        "hex": "#ffffff",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "white"
    }, {
        "innerHtml": "Grey",
        "hex": "#606060",
        "gloveSection": "body", 
        "id":"wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "grey"
    }, {
        "innerHtml": "Yellow",
        "hex": "#fbdb01",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "leather": ["steer"],
        "value": "yellow"
    }
    ]
}, {
    "id": "gloveAccent",
    "elementId": "wccf_product_field_glove_accent_color",
    "elementLabel": "Glove Accent Color",
    "elementSort": 1,
    "elementType": "radio",
    "domVisibility": "conditional",
    "colorPalette": true,
    "elementOptions": [{
        "innerHtml": "Black",
        "hex": "#000000",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["kip","steer"],
        "value": "black"
    }, {
        "innerHtml": "Mocha",
        "hex": "#863615",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["kip","steer"],
        "value": "mocha"
    }, {
        "innerHtml": "Navy Blue",
        "hex": "#000080",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "navy_blue"
    }, {
        "innerHtml": "Royal Blue",
        "hex": "#4169e1",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "royal_blue"
    }, {
        "innerHtml": "Red",
        "hex": "#e60000",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["kip","steer"],
        "value": "red"
    }, {
        "innerHtml": "Orange",
        "hex": "#f95a01",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["kip","steer"],
        "value": "orange"
    }, {
        "innerHtml": "Camel",
        "hex": "#ffe87a",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "camel"
    }, {
        "innerHtml": "Tan",
        "hex": "#ba5900",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["kip","steer"],
        "value": "tan"
    }, {
        "innerHtml": "Lemon Yellow",
        "hex": "#edef53",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "lemon_yellow"
    }, {
        "innerHtml": "White",
        "hex": "#ffffff",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "white"
    }, {
        "innerHtml": "Grey",
        "hex": "#606060",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "grey"
    }, {
        "innerHtml": "Yellow",
        "hex": "#fbdb01",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "leather": ["steer"],
        "value": "yellow"
    }]
}, {
    "id": "gloveTrim",
    "elementId": "wccf_product_field_glove_trim_color_qo",
    "elementLabel": "Glove Trim Color",
    "elementSort": 1,
    "elementType": "radio",
    "domVisibility": "conditional",
    "colorPalette": true,
    "elementOptions": [{ "innerHtml": "Black", "hex": "#000000", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["kip","steer"], "value": "black" }, { "innerHtml": "Mocha", "hex": "#863615", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["kip","steer"],  "value": "mocha" }, { "innerHtml": "Navy Blue", "hex": "#000080", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "navy_blue" }, { "innerHtml": "Royal Blue", "hex": "#4169e1", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "royal_blue" }, { "innerHtml": "Red", "hex": "#e60000", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["kip","steer"],  "value": "red" }, { "innerHtml": "Orange", "hex": "#f95a01", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["kip","steer"],  "value": "orange" }, { "innerHtml": "Camel", "hex": "#ffe87a", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "camel" }, { "innerHtml": "Tan", "hex": "#ba5900", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["kip","steer"],  "value": "tan" }, { "innerHtml": "Lemon Yellow", "hex": "#edef53", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "lemon_yellow" }, { "innerHtml": "White", "hex": "#ffffff", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "white" }, { "innerHtml": "Grey", "hex": "#606060", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "grey" }, { "innerHtml": "Yellow", "hex": "#fbdb01", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "leather": ["steer"],  "value": "yellow" }]
}, {
    "id": "gloveLogo",
    "elementId": "wccf_product_field_glovelogocolor",
    "elementLabel": "Glove Logo Color",
    "elementSort": 2,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{ "innerHtml": "Black", "hex": "#000000", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor","leather":["steer","kip"],"value": "black" }, { "innerHtml": "Grey", "hex": "#505050", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "grey" }, { "innerHtml": "Brown", "hex": "#863615", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "brown" }, { "innerHtml": "Navy Blue", "hex": "#000080", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "navy_blue" }, { "innerHtml": "Royal Blue", "hex": "#004d98", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "royal_blue" }, { "innerHtml": "Sky Blue", "hex": "#1daff2", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "sky_blue" }, { "innerHtml": "Green", "hex": "#5dc993", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "green" }, { "innerHtml": "Red", "hex": "#ff0000", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "red" }, { "innerHtml": "Orange", "hex": "#FFA500", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "orange" }, { "innerHtml": "Pink", "hex": "#FFC0CB", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "pink" }, { "innerHtml": "Camel", "hex": "#ffe87a", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "camel" }, { "innerHtml": "Yellow Gold", "hex": "#FFDF00", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "yellow_gold" }, { "innerHtml": "Vegas Gold", "hex": "#c5b358", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "vegas_gold" }, { "innerHtml": "White", "hex": "#ffffff", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "white" }, { "innerHtml": "Silver", "hex": "#C0C0C0", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "leather":["steer","kip"],"value": "silver" }]
}, {
    "id": "embroideryColor",
    "elementId": "wccf_product_field_embroidery_color",
    "elementLabel": "Glove Embroidery Color",
    "elementSort": 2,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{ "innerHtml": "Black", "hex": "#000000", "gloveSection": "personalization", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "black" }, { "innerHtml": "Grey", "hex": "#505050", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "grey" }, { "innerHtml": "Brown", "hex": "#863615", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "brown" }, { "innerHtml": "Navy Blue", "hex": "#000080", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "navy_blue" }, { "innerHtml": "Royal Blue", "hex": "#004d98", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "royal_blue" }, { "innerHtml": "Sky Blue", "hex": "#1daff2", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "sky_blue" }, { "innerHtml": "Green", "hex": "#5dc993", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "green" }, { "innerHtml": "Red", "hex": "#ff0000", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "red" }, { "innerHtml": "Orange", "hex": "#FFA500", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "orange" }, { "innerHtml": "Pink", "hex": "#FFC0CB", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "pink" }, { "innerHtml": "Camel", "hex": "#ffe87a", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "camel" }, { "innerHtml": "Yellow Gold", "hex": "#FFDF00", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "yellow_gold" }, { "innerHtml": "Vegas Gold", "hex": "#c5b358", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "vegas_gold" }, { "innerHtml": "White", "hex": "#ffffff", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "white" }, { "innerHtml": "Silver", "hex": "#C0C0C0", "gloveSection": "logo", "id": "wccf_product_field_embroidery_color","leather":["steer","kip"],"value": "silver" }]
}, {
    "id": "personalizationStyle",
    "elementId": "wccf_product_field_personalization_style",
    "elementLabel": "Personalization Style",
    "elementHelpTitle":"",
    "elementHelp": "Pick the best glove quality for you.",
    "elementSort": 2,
    "elementType": "input",
    "domVisibility": "required",
    "elementOptions": [{
        "innerHtml": "Block Font",
        "value": "block_font"
    }, {
        "innerHtml": "Script Font",
        "value": "script_font"
    }]
}]
export const gloveDesignData = [
    {"value":"Start","hex":null,"leather":["kip","steer"]},
    {"value": "Black","hex": "#010101","leather":["kip","steer"]},
    {"value": "Mocha","hex": "#863615","leather":["steer"]},
    {"value": "Navy Blue","hex": "#000080","leather":["steer"]},
    {"value": "Carolina Blue","hex": "#4169e1","leather":["steer"]},
    {"value": "Red","hex": "#e60000", "leather":["kip","steer"]}, 
    {"value": "Orange","hex": "#f95a01","leather":["kip","steer"]}, 
    {"value": "Camel","hex": "#ffe87a","leather":["steer"]},
    {"value": "Tan","hex": "#ba5900","leather":["kip","steer"]},
    {"value": "Lemon Yellow","hex": "#edef53","leather":["steer"]},
    {"value": "White","hex": "#ffffff","leather":["steer"]},
    {"value": "Grey","hex": "#606060","leather":["steer"]},
    {"value": "Yellow","hex": "#fbdb01","leather":["steer"]}
]
export const webImagess = [{
    "glove": "infield",
    "id": "wccf_product_field_infield_glove_webs",
    "uri": "https:\/\/media.9positions.com\/",
    "options": [{
        "innerHtml": "V 5581 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202613\/V-5581.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "V1919 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202337\/V-1919.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Trap-II Web",
        "file": "wp-content\/uploads\/2019\/05\/26202331\/Trap-II-1858.png",
        "gloveType": ['infield'],
        "value": ""
    }, {
        "innerHtml": "Trap-I2 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202329\/Trap-12-551.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Trapeze Web",
        "file": "wp-content\/uploads\/2019\/05\/26202327\/T.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Sunray Web",
        "file": "wp-content\/uploads\/2019\/05\/26202325\/Sunray.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Roman V Web",
        "file": "wp-content\/uploads\/2019\/05\/26202323\/Roman-V-510.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "I Web",
        "file": "wp-content\/uploads\/2019\/05\/26202320\/I-1921.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Hinge Web",
        "file": "wp-content\/uploads\/2019\/05\/26202319\/Hinge.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "H Web",
        "file": "wp-content\/uploads\/2019\/05\/26202318\/H-548.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "F-Chev",
        "file": "wp-content\/uploads\/2019\/05\/26202313\/F-CHEV-1875.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Diagonal Tread Web",
        "file": "wp-content\/uploads\/2019\/05\/26202312\/Diagonal-Tread.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Cross 1898 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202311\/Cross-1898.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Buckle Web",
        "file": "wp-content\/uploads\/2019\/05\/26202302\/Buckle-1864.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Box Web",
        "file": "wp-content\/uploads\/2019\/05\/26202259\/Box-1918.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Basket Web",
        "file": "wp-content\/uploads\/2019\/05\/26202251\/Basket-II.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Baseball 1890 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202250\/Baseball-1890.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "3 Cross Web",
        "file": "wp-content\/uploads\/2019\/05\/26202247\/3-Cross-1-.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "2 Spiral Web",
        "file": "wp-content\/uploads\/2019\/05\/26202247\/2-Spiral-294.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "2 Piece Web",
        "file": "wp-content\/uploads\/2019\/05\/26202245\/2-piece-1853.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "2 Cross Web",
        "file": "wp-content\/uploads\/2019\/05\/26202244\/2-Cross-1-293.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Y 1862 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202243\/Y-1862.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Y 1852 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202242\/Y-1852.png",
        "gloveType": ['infield'],
        "value": ""
    }]
}, {
    "glove": "catcher",
    "id": "",
    "uri": "https:\/\/media.9positions.com\/",
    "options": [
        {
            "innerHtml": "Two Piece Web",
            "file": "wp-content\/uploads\/2019\/05\/26202305\/CF.png"
        }
    ]
}, {
    "glove": "outfield",
    "id": "wccf_product_field_outfield_glove_webs",
    "uri": "https:\/\/media.9positions.com\/",
    "options": [{
        "innerHtml": "Trapeze Web",
        "file": "wp-content\/uploads\/2019\/05\/26202327\/T.png"
    }, {
        "innerHtml": "Basket Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202252\/Basket-Single-lace-585.png"
    }, {
        "innerHtml": "6 Finger Web",
        "file": "wp-content\/uploads\/2019\/05\/26202241\/Wide-Trap-1860.png",
        "gloveType": ['outfield'],
        "value":""
    }, {
        "innerHtml": "Triple Bar F",
        "file": "wp-content\/uploads\/2019\/05\/26202314\/F.png",
        "gloveType": ['outfield'],
        "value":""
    }, {
        "innerHtml": "H Web",
        "file": "wp-content\/uploads\/2019\/05\/26202318\/H-548.png"
    }, {
        "innerHtml": "FX-1865 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202316\/FX-_1865.png"
    }, {
        "innerHtml": "F Wide Bar",
        "file": "wp-content\/uploads\/2019\/05\/26202317\/FX-1865.png"
    }, {
        "innerHtml": "W Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202240\/W-Single-lace.png",
        "gloveType": ['outfield'],
        "value":""
    }, {
        "innerHtml": "W Double Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202239\/W-Double-lace-1899.png",
        "gloveType": ['outfield'],
        "value":""
    }, {
        "innerHtml": "T Diamond Web",
        "file": "wp-content\/uploads\/2019\/05\/26202326\/T-Diamond-1854.png"
    }, {
        "innerHtml": "TV Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202334\/TV-single-lace-572.png"
    }, {
        "innerHtml": "TV Triple Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202335\/TV-Triple-lace-1863.png"
    }]
}, {
    "glove": "pitcher",
    "id": "",
    "uri": "https:\/\/media.9positions.com\/",
    "options": [{
        "innerHtml": "Trapeze Web",
        "file": "wp-content\/uploads\/2019\/05\/26202327\/T.png"
    }, {
        "innerHtml": "Buzzsaw Web",
        "file": "wp-content\/uploads\/2019\/05\/26202304\/Buzzsaw.png"
    }, {
        "innerHtml": "Blank Web",
        "file": "wp-content\/uploads\/2019\/05\/26202257\/Blank.png"
    }, {
        "innerHtml": "Basket XV Web",
        "file": "wp-content\/uploads\/2019\/05\/26202256\/Basket-XV-1926.png"
    }, {
        "innerHtml": "Basket Volcano Web",
        "file": "wp-content\/uploads\/2019\/05\/26202254\/Basket-Volcano.png"
    }, {
        "innerHtml": "Basket Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202252\/Basket-Single-lace-585.png"
    }, {
        "innerHtml": "Basket Web",
        "file": "wp-content\/uploads\/2019\/05\/26202251\/Basket-II.png"
    }, {
        "innerHtml": "Baseball 1890 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202250\/Baseball-1890.png"
    }, {
        "innerHtml": "Baseball 1856 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202249\/Baseball-1856.png"
    }, {
        "innerHtml": "2 Spiral Web",
        "file": "wp-content\/uploads\/2019\/05\/26202247\/2-Spiral-294.png"
    }, {
        "innerHtml": "2 Piece Web",
        "file": "wp-content\/uploads\/2019\/05\/26202245\/2-piece-1853.png"
    }]
}, {
    "glove": "first_base",
    "id": "wccf_product_field_first_base_mitt_size",
    "uri": "https:\/\/media.9positions.com\/",
    "options": [{
        "innerHtml": "Triple Bar F",
        "file": "wp-content\/uploads\/2019\/05\/26202314\/F.png"
    }, {
        "innerHtml": "FX-1865 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202316\/FX-_1865.png"
    }, {
        "innerHtml": "F Wide Bar",
        "file": "wp-content\/uploads\/2019\/05\/26202317\/FX-1865.png"
    }, {
        "innerHtml": "H Web",
        "file": "wp-content\/uploads\/2019\/05\/26202318\/H-548.png"
    }, {
        "innerHtml": "T Diamond Web",
        "file": "wp-content\/uploads\/2019\/05\/26202326\/T-Diamond-1854.png"
    }, {
        "innerHtml": "TV Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202334\/TV-single-lace-572.png"
    }, {
        "innerHtml": "TV Triple Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202335\/TV-Triple-lace-1863.png"
    }]
}]

export const webImages = [{
        "innerHtml": "Triple Bar F",
        "file": "wp-content\/uploads\/2019\/05\/26202314\/F.png",
        "gloveType": ['outfield','firstbase'],
        "value": ""
    }, {
        "innerHtml": "FX-1865 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202316\/FX-_1865.png",
        "gloveType": ['outfield','firstbase'],
        "value": ""
    }, {
        "innerHtml": "F Wide Bar",
        "file": "wp-content\/uploads\/2019\/05\/26202317\/FX-1865.png",
        "gloveType": ['outfield','firstbase'],
        "value": ""
    }, {
        "innerHtml": "H Web",
        "file": "wp-content\/uploads\/2019\/05\/26202318\/H-548.png",
        "gloveType": ['outfield','firstbase',"infield"],
        "value": ""
    }, {
        "innerHtml": "T Diamond Web",
        "file": "wp-content\/uploads\/2019\/05\/26202326\/T-Diamond-1854.png",
        "gloveType": ['outfield','firstbase'],
        "value": ""
    }, {
        "innerHtml": "TV Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202334\/TV-single-lace-572.png",
        "gloveType": ['outfield','firstbase'],
        "value": ""
    }, {
        "innerHtml": "TV Triple Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202335\/TV-Triple-lace-1863.png",
        "gloveType": ['outfield','firstbase'],
        "value": ""
    },{
        "innerHtml": "Trapeze Web",
        "file": "wp-content\/uploads\/2019\/05\/26202327\/T.png",
        "gloveType": ['outfield','infield','firstbase','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Buzzsaw Web",
        "file": "wp-content\/uploads\/2019\/05\/26202304\/Buzzsaw.png",
        "gloveType": ['outfield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Blank Web",
        "file": "wp-content\/uploads\/2019\/05\/26202257\/Blank.png",
        "gloveType": ['outfield','infield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Basket XV Web",
        "file": "wp-content\/uploads\/2019\/05\/26202256\/Basket-XV-1926.png",
        "gloveType": ['outfield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Basket Volcano Web",
        "file": "wp-content\/uploads\/2019\/05\/26202254\/Basket-Volcano.png",
        "gloveType": ['outfield','infield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Basket Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202252\/Basket-Single-lace-585.png",
        "gloveType": ['outfield','infield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Basket Web",
        "file": "wp-content\/uploads\/2019\/05\/26202251\/Basket-II.png",
        "gloveType": ['outfield','infield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Baseball 1890 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202250\/Baseball-1890.png",
        "gloveType": ['outfield','infield','pitcher'],
        "value": ""
    }, {
        "innerHtml": "Baseball 1856 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202249\/Baseball-1856.png",
        "gloveType": ['pitcher','infield'],
        "value": ""
    }, {
        "innerHtml": "2 Spiral Web",
        "file": "wp-content\/uploads\/2019\/05\/26202247\/2-Spiral-294.png",
        "gloveType": ['pitcher'],
        "value": ""
    }, {
        "innerHtml": "2 Piece Web",
        "file": "wp-content\/uploads\/2019\/05\/26202245\/2-piece-1853.png",
        "gloveType": ['infield','pitcher'],
        "value": ""
    },  {
        "innerHtml": "W Single Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202240\/W-Single-lace.png",
        "gloveType": ['outfield','pitcher'],
        "value":""
    }, {
        "innerHtml": "W Double Lace",
        "file": "wp-content\/uploads\/2019\/05\/26202239\/W-Double-lace-1899.png",
        "gloveType": ['outfield','pitcher'],
        "value":""
    },  {
        "innerHtml": "6 Finger Web",
        "file": "wp-content\/uploads\/2019\/05\/26202241\/Wide-Trap-1860.png",
        "gloveType": ['outfield','pitcher','infield'],
        "value":""
    }, {
        "innerHtml": "V 5581 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202613\/V-5581.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "V1919 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202337\/V-1919.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Trap-II Web",
        "file": "wp-content\/uploads\/2019\/05\/26202331\/Trap-II-1858.png",
        "gloveType": ['infield'],
        "value": ""
    }, {
        "innerHtml": "Trap-I2 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202329\/Trap-12-551.png",
        "gloveType": ['infield'],
        "value": ""
    },  {
        "innerHtml": "Sunray Web",
        "file": "wp-content\/uploads\/2019\/05\/26202325\/Sunray.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Roman V Web",
        "file": "wp-content\/uploads\/2019\/05\/26202323\/Roman-V-510.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "I Web",
        "file": "wp-content\/uploads\/2019\/05\/26202320\/I-1921.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Hinge Web",
        "file": "wp-content\/uploads\/2019\/05\/26202319\/Hinge.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "F-Chev",
        "file": "wp-content\/uploads\/2019\/05\/26202313\/F-CHEV-1875.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Diagonal Tread Web",
        "file": "wp-content\/uploads\/2019\/05\/26202312\/Diagonal-Tread.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Cross 1898 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202311\/Cross-1898.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Buckle Web",
        "file": "wp-content\/uploads\/2019\/05\/26202302\/Buckle-1864.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Box Web",
        "file": "wp-content\/uploads\/2019\/05\/26202259\/Box-1918.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "3 Cross Web",
        "file": "wp-content\/uploads\/2019\/05\/26202247\/3-Cross-1-.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "2 Cross Web",
        "file": "wp-content\/uploads\/2019\/05\/26202244\/2-Cross-1-293.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Y 1862 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202243\/Y-1862.png",
        "gloveType": ['infield'],
        "value": ""
    },
    {
        "innerHtml": "Y 1852 Web",
        "file": "wp-content\/uploads\/2019\/05\/26202242\/Y-1852.png",
        "gloveType": ['infield'],
        "value": ""
}];