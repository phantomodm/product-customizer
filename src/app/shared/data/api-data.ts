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

export const gloveDesignData =[
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


export const embroiderySliderData = [
    {"value":'Start',"hex":null},
    {"value": "Black","hex": "#010101"}, 
    {"value": "Mocha", "hex": "#863615"},
    {"value": "Navy Blue","hex": "#000080"}, 
    {"value": "Carolina Blue","hex": "#1daff2"},
    {"value": "Red","hex": "#e60000"},
    {"value": "Pink","hex": "#FF1493"},
    {"value": "Orange","hex": "#f95a01"},
    {"value": "Camel","hex": "#ffe87a"},
    {"value": "Vegas Gold","hex": "#c5b358"},
    {"value": "Silver","hex": "#c0c0c0"},
    {"value": "White","hex": "#ffffff"},
    {"value": "Bright Gold","hex": "#ffdf00"} 
];

export const gloveCanvas = [
    { "element": "gloveMainHorizontal", "svgBase": "_x5F_vw3" },
    { "element": "gloveMainVertical", "svgBase": "_x5F_vw3" },
    { "element": "gloveInsideHorizontal", "svgBase": "_x5F_vw2" },
    { "element": "gloveInsideVertical", "svgBase": "_x5F_vw2" },
    { "element": "gloveSideHorizontal", "svgBase": "_x5F_vw1" },
    { "element": "gloveSideVertical", "svgBase": "_x5F_vw1" }
];

export const positionsDB = [ 
    { name: 'inf', webType:'infield', fullName: 'Infielder', id: 'be17a3e20675205a77d639bff21aa861', x: 268.8, y: 184.7, img: ['http://placehold.it/300?text=1','http://placehold.it/300?text=2'], sliderMin:'11.00',sliderMax:'12.00', handSliderStep:.25 },
    { name: 'fbase',webType:'first base', fullName: 'First Base', id: 'd3e010d441ce466adf810ebda8c8b055', x: 290, y: 275, img: ['http://placehold.it/300?text=1'], sliderMin:'12.50',sliderMax:'13.00', handSliderStep:.25 },
    { name: 'pitcher', webType:'pitcher',fullName: 'Pitcher', id: 'b2f09f9cbef030087ab73be43851968f', x: 186.5, y: 276.5, img: ['http://placehold.it/300?text=1'], sliderMin:'11.00',sliderMax:'12.50',handSliderStep:.25 },
    { name: 'of', webType:'outfield',fullName: 'Outfielder', id: 'c2976213880a305b3a7a87e651944a40', x: 186.5, y: 20.5, img: ['http://www.w3schools.com/images/w3schools_green.jpg'], sliderMin:'12.00',sliderMax:'13.00',handSliderStep:.25  },
    { name: 'cm',webType:'catcher', fullName: 'Catcher', id: '6ec26012c6e2ca0f7ee69a825f639e8b', x: 186.5, y: 370, img: ['../../../assets/images/9P_catcher_back_view.png','../../../assets/images/9P_catcher_side_view.png','../../../assets/images/9P_catcher_inside_view.png'], sliderMin:'32.50',sliderMax:'34.00',handSliderStep: .50 }
];

export const gloveWebOptions = [{
    "label": 'Choose the web for your glove ?',
    "formName":'gloveWeb',
    "options":[{
        "value":"800",
        "valueString":"I Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"../../../assets/images/800.preview.jpg",
        "formName":'gloveWeb'

    },
    {
        "value":"801",
        "valueString":"1 Piece",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/801.preview.png?t=1428964184",
        "formName":'gloveWeb'
    },
    {
        "value":"802",
        "valueString":"2 Cross I",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/802.preview.png?t=1483285587",
        "formName":'gloveWeb'
    },
    {
        "value":"803",
        "valueString":"2 Spiral",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/803.preview.png?t=1428964186",
        "formName":'gloveWeb'
    },
    {
        "value":"804",
        "valueString":"2 Piece",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/804.preview.png?t=1428964186",
        "formName":'gloveWeb'
    },
    {
        "value":"805",
        "valueString":"3 Cross I",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/805.preview.png?t=1428964186",
        "formName":'gloveWeb'
    },
    {
        "value":"815",
        "valueString":"Cross D",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/815.preview.png?t=1428964188"

    },
    {
        "value":"819",
        "valueString":"H Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/819.preview.png?t=1428964189",
        "formName":'gloveWeb'
    },
    {
        "value":"821",
        "valueString":"Trap I1",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/821.preview.png?t=1428964198",
        "formName":'gloveWeb'
    },
    {
        "value":"822",
        "valueString":"Trap I2",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/822.preview.png?t=1428964200",
        "formName":'gloveWeb'
    },
    {
        "value":"824",
        "valueString":"V 1919",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","outfield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/824.preview.png?t=1428964202",
        "formName":'gloveWeb'
    },
    {
        "value":"825",
        "valueString":"V Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/825.preview.png?t=1428964202",
        "formName":'gloveWeb'
    },
    {
        "value":"813",
        "valueString":"Buckle",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/813.preview.png?t=1428964208",
        "formName":'gloveWeb'
    },
    {
        "value":"806",
        "valueString":"Basket",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/806.preview.png?t=1428964209",
        "formName":'gloveWeb'
    },
    {
        "value":"807",
        "valueString":"Basket Single Lace",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/807.preview.png?t=1428964209",
        "formName":'gloveWeb'
    },
    {
        "value":"808",
        "valueString":"Basket Volcano",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/808.preview.png?t=1428964213",
    },
    {
        "value":"809",
        "valueString":"Baseball 1865",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/809.preview.png?t=1428964213",
        "formName":'gloveWeb'
    },
    {
        "value":"810",
        "valueString":"Baseball II",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/810.preview.png?t=1428964214",
        "formName":'gloveWeb'
    },
    {
        "value":"811",
        "valueString":"Blank",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/811.preview.png?t=1428964214",
        "formName":'gloveWeb'
    },
    {
        "value":"812",
        "valueString":"Braid",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/812.preview.png?t=1428964216",
        "formName":'gloveWeb'
    },
    {
        "value":"823",
        "valueString":"V 588",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/823.preview.png?t=1428964395",
        "formName":'gloveWeb'
    },
    {
        "value":"827",
        "valueString":"Y 1862",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","infield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/827.preview.png?t=1428964395",
        "formName":'gloveWeb'
    },
    {
        "value":"459",
        "valueString":"8V Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/459.preview.png?t=1413764692",
        "formName":'gloveWeb'
    },
    {
        "value":"463",
        "valueString":"Basket SV",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","pitcher"],
        "imageURL": 'http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/463.thumbnail.png?t=1413766552',
        "formName":'gloveWeb'

    },
    {
        "value":"469",
        "valueString":"Buzzsaw",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/469.preview.png?t=1413764690",
    },
    {
        "value":"470",
        "valueString":"Coinslot",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/470.preview.png?t=1413764689",
    },
    {
        "value":"472",
        "valueString":"Diagonal Tread",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","pitcher"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/472.preview.png?t=1413764691",
        "formName":'gloveWeb'
    },
    {
        "value":"473",
        "valueString":"F Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","first base"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/473.preview.png?t=1413764687",
        "formName":'gloveWeb'
    },
    {
        "value":"492",
        "valueString":"8V Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","first base"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/492.preview.png?t=1413764691",
        "formName":'gloveWeb'
    },
    {
        "value":"474",
        "valueString":"FV Web",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","first base"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/474.preview.png?t=1413764693",
        "formName":'gloveWeb'
    },
    {
        "value":"475",
        "valueString":"FX 1865",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","first base"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/475.preview.png?t=1413764695",
        "formName":'gloveWeb'
    },
    {
        "value":"476",
        "valueString":"Hinge",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/476.preview.png?t=1413764692",
        "formName":'gloveWeb'
    },
    {
        "value":"478",
        "valueString":"Net",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/478.preview.png?t=1413764690",
        "formName":'gloveWeb'
    },
    {
        "value":"479",
        "valueString":"Wide Trap 1865",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/479.preview.png?t=1413764691",
        "formName":'gloveWeb'
    },
    {
        "value":"480",
        "valueString":"Sunray",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/480.preview.png?t=1413764693",
        "formName":'gloveWeb'
    },
    {
        "value":"481",
        "valueString":"Trapeze",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield","first base"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/481.preview.png?t=1413764690",
        "formName":'gloveWeb'
    },
    {
        "value":"482",
        "valueString":"Trapeze Diamond",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/482.preview.png?t=1413764692",
        "formName":'gloveWeb'
    },
    {
        "value":"485",
        "valueString":"TV Triple Lace",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/485.preview.png?t=1413764689",
        "formName":'gloveWeb'
    },
    {
        "value":"486",
        "valueString":"V 588",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":'',
        "formName":'gloveWeb'
    },
    {
        "value":"489",
        "valueString":"W Single Lace",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/489.preview.png?t=1413764688",
        "formName":'gloveWeb'
    },
    {
        "value":"494",
        "valueString":"Y Single Lace",
        "name": "attribute[770]",
        "id": "attribute-770",
        "gloveType":["glove","outfield"],
        "imageURL":"http://cdn2.bigcommerce.com/server1700/ihhhlpo/product_images/attribute_value_images/494.preview.png?t=1413764688",
        "formName":'gloveWeb'
    }

]
}]