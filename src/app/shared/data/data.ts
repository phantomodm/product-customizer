export const gloveColor = ["#010101","#863615","#000080", "#4169e1","#e60000","#f95a01","#ffe87a","#ba5900","#edef53","#ffffff","#606060","#fbdb01"]
export const qoData = [{
    "id":"gloveSeries",
    "elementId": "wccf_product_field_glove_series",
    "elementLabel": "Glove Series",
    "elementSort": 0,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{
        "innerHtml": "Pro Cowhide",
        "id": "wccf_product_field_glove_series",
        "name": "attribute[1195]",
        "value": "cowhide"
    },{
        "innerHtml": "Rise",
        "id": "wccf_product_field_glove_series",
        "name": "attribute[1195]",
        "value": "rise_series"
    }, {
        "innerHtml": "Elite",
        "id": "wccf_product_field_glove_series",
        "name": "attribute[1195]",
        "value": "elite_japanese_steer"
    }, {
        "innerHtml": "Elite Kip",
        "id": "wccf_product_field_glove_series",
        "name": "attribute[1195]",
        "value": "elite_kip"
    }]
},{
    "id":"gloveCondition",
    "elementId": "wccf_product_field_glove_condition",
    "elementLabel": "Glove Condition",
    "elementSort": 0,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": false,
    "elementOptions":[{
        "innerHtml":"Stiff",
        "value": "Stiff" 
    },{
        "innerHtml": "Soften",
        "value":"soften"
    }]
},{
    "id":"gloveGloveHand",
    "elementId": "wccf_product_field_glove_hand",
    "elementLabel": "Catching Hand",
    "elementSort": 0,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": false,
    "elementOptions":[{
        "innerHtml":"Left Hand",
        "value": "left_hand"
    },{
        "innerHtml":"Right Hand",
        "value": "right_hand"
    }]
},{
    "id":"palmStrength",
    "elementId": "wccf_product_field_palm_protection",
    "elementLabel": "Palm Protection",
    "elementSort": 2,
    "elementType": "select",
    "domVisibility": "required",
    "colorPalette": false,
    "elementOptions":[{
        "innerHtml":"No Padding",
        "value": "no_padding"
    },{
        "innerHtml": "Padding",
        "value": "padding"
    }]
},{
    "id":"gloveBody",
    "elementId": "wccf_product_field_glove_body_color_qo",
    "elementLabel": "Glove Body Color",
    "elementSort": 1,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{
        "innerHtml": "Black",
        "hex": "#000000",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "black"
    }, {
        "innerHtml": "Mocha",
        "hex": "#863615",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "mocha"
    }, {
        "innerHtml": "Navy Blue",
        "hex": "#000080",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "navy_blue"
    }, {
        "innerHtml": "Royal Blue",
        "hex": "#4169e1",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "royal_blue"
    }, {
        "innerHtml": "Red",
        "hex": "#e60000",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "red"
    }, {
        "innerHtml": "Orange",
        "hex": "#f95a01",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "orange"
    }, {
        "innerHtml": "Camel",
        "hex": "#ffe87a",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "camel"
    }, {
        "innerHtml": "Tan",
        "hex": "#ba5900",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "tan"
    }, {
        "innerHtml": "Lemon Yellow",
        "hex": "#edef53",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "lemon_yellow"
    }, {
        "innerHtml": "White",
        "hex": "#ffffff",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "white"
    }, {
        "innerHtml": "Grey",
        "hex": "#606060",
        "gloveSection": "body", "id":
            "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "grey"
    }, {
        "innerHtml": "Yellow",
        "hex": "#fbdb01",
        "gloveSection": "body",
        "id": "wccf_product_field_glove_body_color_qo",
        "name": "attribute[1255]",
        "value": "yellow"
    }
    ]
},{
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
        "name": "attribute[1256]",
        "value": "black"
    }, {
        "innerHtml": "Mocha",
        "hex": "#863615",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "mocha"
    }, {
        "innerHtml": "Navy Blue",
        "hex": "#000080",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "navy_blue"
    }, {
        "innerHtml": "Royal Blue",
        "hex": "#4169e1",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "royal_blue"
    }, {
        "innerHtml": "Red",
        "hex": "#e60000",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "red"
    }, {
        "innerHtml": "Orange",
        "hex": "#f95a01",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "orange"
    }, {
        "innerHtml": "Camel",
        "hex": "#ffe87a",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "camel"
    }, {
        "innerHtml": "Tan",
        "hex": "#ba5900",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "tan"
    }, {
        "innerHtml": "Lemon Yellow",
        "hex": "#edef53",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "lemon_yellow"
    }, {
        "innerHtml": "White",
        "hex": "#ffffff",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "white"
    }, {
        "innerHtml": "Grey",
        "hex": "#606060",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "grey"
    }, {
        "innerHtml": "Yellow",
        "hex": "#fbdb01",
        "gloveSection": "accent",
        "id": "wccf_product_field_glove_accent_color",
        "name": "attribute[1256]",
        "value": "yellow"
    }]
},{
    "id":"gloveTrim",
    "elementId": "wccf_product_field_glove_trim_color_qo",
    "elementLabel": "Glove Trim Color",
    "elementSort": 1,
    "elementType": "radio",
    "domVisibility": "conditional",
    "colorPalette": true,
    "elementOptions": [{ "innerHtml": "Black", "hex": "#000000", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "black" }, { "innerHtml": "Mocha", "hex": "#863615", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "mocha" }, { "innerHtml": "Navy Blue", "hex": "#000080", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "navy_blue" }, { "innerHtml": "Royal Blue", "hex": "#4169e1", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "royal_blue" }, { "innerHtml": "Red", "hex": "#e60000", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "red" }, { "innerHtml": "Orange", "hex": "#f95a01", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "orange" }, { "innerHtml": "Camel", "hex": "#ffe87a", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "camel" }, { "innerHtml": "Tan", "hex": "#ba5900", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "tan" }, { "innerHtml": "Lemon Yellow", "hex": "#edef53", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "lemon_yellow" }, { "innerHtml": "White", "hex": "#ffffff", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "white" }, { "innerHtml": "Grey", "hex": "#606060", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "grey" }, { "innerHtml": "Yellow", "hex": "#fbdb01", "gloveSection": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "yellow" }]
},{
    "id":"gloveLogo",
    "elementId": "wccf_product_field_glovelogocolor",
    "elementLabel": "Glove Logo Color",
    "elementSort": 2,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{ "innerHtml": "Black", "hex": "#000000", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "black" }, { "innerHtml": "Grey", "hex": "#505050", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "grey" }, { "innerHtml": "Brown", "hex": "#863615", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "brown" }, { "innerHtml": "Navy Blue", "hex": "#000080", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "navy_blue" }, { "innerHtml": "Royal Blue", "hex": "#004d98", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "royal_blue" }, { "innerHtml": "Sky Blue", "hex": "#1daff2", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "sky_blue" }, { "innerHtml": "Green", "hex": "#5dc993", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "green" }, { "innerHtml": "Red", "hex": "#ff0000", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "red" }, { "innerHtml": "Orange", "hex": "#FFA500", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "orange" }, { "innerHtml": "Pink", "hex": "#FFC0CB", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "pink" }, { "innerHtml": "Camel", "hex": "#ffe87a", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "camel" }, { "innerHtml": "Yellow Gold", "hex": "#FFDF00", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "yellow_gold" }, { "innerHtml": "Vegas Gold", "hex": "#c5b358", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "vegas_gold" }, { "innerHtml": "White", "hex": "#ffffff", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "white" }, { "innerHtml": "Silver", "hex": "#C0C0C0", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "silver" }]
},{
    "id":"embroideryColor",
    "elementId": "wccf_product_field_embroidery_color",
    "elementLabel": "Glove Embroidery Color",
    "elementSort": 2,
    "elementType": "radio",
    "domVisibility": "required",
    "colorPalette": true,
    "elementOptions": [{ "innerHtml": "Black", "hex": "#000000", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "black" }, { "innerHtml": "Grey", "hex": "#505050", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "grey" }, { "innerHtml": "Brown", "hex": "#863615", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "brown" }, { "innerHtml": "Navy Blue", "hex": "#000080", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "navy_blue" }, { "innerHtml": "Royal Blue", "hex": "#004d98", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "royal_blue" }, { "innerHtml": "Sky Blue", "hex": "#1daff2", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "sky_blue" }, { "innerHtml": "Green", "hex": "#5dc993", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "green" }, { "innerHtml": "Red", "hex": "#ff0000", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "red" }, { "innerHtml": "Orange", "hex": "#FFA500", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "orange" }, { "innerHtml": "Pink", "hex": "#FFC0CB", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "pink" }, { "innerHtml": "Camel", "hex": "#ffe87a", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "camel" }, { "innerHtml": "Yellow Gold", "hex": "#FFDF00", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "yellow_gold" }, { "innerHtml": "Vegas Gold", "hex": "#c5b358", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "vegas_gold" }, { "innerHtml": "White", "hex": "#ffffff", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "white" }, { "innerHtml": "Silver", "hex": "#C0C0C0", "gloveSection": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "silver" }]
},{
    "id": "personalizationStyle",
    "elementId": "wccf_product_field_personalization_style",
    "elementLabel": "Personalization Style",
    "elementSort": 2,
    "elementType": "input",
    "domVisibility": "required",
    "elementOptions":[{
        "innerHtml":"Block Font",
        "value":"block_font"
    },{
        "innerHtml":"Script Font",
        "value":"script_font"
    }]
}]
// export const gloveDesignData = [
//     {"value":'Start',"hex":null},
//     {"value": "Black","hex": "#010101"},
//     {"value": "Mocha","hex": "#863615"},
//     {"value": "Navy Blue","hex": "#000080"},
//     {"value": "Carolina Blue","hex": "#4169e1"},
//     {"value": "Red","hex": "#e60000"}, 
//     {"value": "Orange","hex": "#f95a01"}, 
//     {"value": "Camel","hex": "#ffe87a"},
//     {"value": "Tan","hex": "#ba5900"},
//     {"value": "Lemon Yellow","hex": "#edef53"},
//     {"value": "White","hex": "#ffffff"},
//     {"value": "Grey","hex": "#606060"},
//     {"value": "Yellow","hex": "#fbdb01"}
// ]
