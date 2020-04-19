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
    {"value":"Start","hex":"#c0c0c0","leather":["kip","steer"]},
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
 const positionsDB = [ 
    { name: 'inf', webType:'infield', fullName: 'Infielder', id: 'be17a3e20675205a77d639bff21aa861', x: 268.8, y: 184.7, img: ['http://placehold.it/300?text=1','http://placehold.it/300?text=2'], sliderMin:'11.00',sliderMax:'12.00', handSliderStep:.25 },
    { name: 'fbase',webType:'first base', fullName: 'First Base', id: 'd3e010d441ce466adf810ebda8c8b055', x: 290, y: 275, img: ['http://placehold.it/300?text=1'], sliderMin:'12.50',sliderMax:'13.00', handSliderStep:.25 },
    { name: 'pitcher', webType:'pitcher',fullName: 'Pitcher', id: 'b2f09f9cbef030087ab73be43851968f', x: 186.5, y: 276.5, img: ['http://placehold.it/300?text=1'], sliderMin:'11.00',sliderMax:'12.50',handSliderStep:.25 },
    { name: 'of', webType:'outfield',fullName: 'Outfielder', id: 'c2976213880a305b3a7a87e651944a40', x: 186.5, y: 20.5, img: ['http://www.w3schools.com/images/w3schools_green.jpg'], sliderMin:'12.00',sliderMax:'13.00',handSliderStep:.25  },
    { name: 'cm',webType:'catcher', fullName: 'Catcher', id: '6ec26012c6e2ca0f7ee69a825f639e8b', x: 186.5, y: 370, img: ['../../../assets/images/9P_catcher_back_view.png','../../../assets/images/9P_catcher_side_view.png','../../../assets/images/9P_catcher_inside_view.png'], sliderMin:'32.50',sliderMax:'34.00',handSliderStep: .50 }
];
