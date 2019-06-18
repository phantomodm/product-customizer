import { Component, OnInit } from '@angular/core';
import { GloveApiService } from 'src/app/shared/services/glove-api.service';


@Component({
  selector: 'quick-order-input-elements',
  templateUrl: './quick-order-input-elements.component.html',
  styleUrls: ['./quick-order-input-elements.component.css']
})
export class QuickOrderInputElementsComponent implements OnInit {

  gloveData = {
    "gloveSeries":[{
        "label": "Glove Series",
        "id":"wccf_product_field_glove_series",
        "options":[{"html": "Rise", "id": "wccf_product_field_glove_series", "name": "attribute[1195]", "value": "rise_series"}, {"html": "Elite", "id": "wccf_product_field_glove_series", "name": "attribute[1195]", "value": "elite_japanese_steer"}, {"html": "Elite Kip", "id": "wccf_product_field_glove_series", "name": "attribute[1195]", "value": "elite_kip"}]
    }],
    "gloveBody":[{
        "label": "Glove Body Color",
        "id":"wccf_product_field_glove_body_color",
        "options":[{"color": "Black", "hex": "#000000", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "black"}, {"color": "Mocha", "hex": "#863615", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "mocha"}, {"color": "Navy Blue", "hex": "#000080", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "navy_blue"}, {"color": "Royal Blue", "hex": "#4169e1", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "royal_blue"}, {"color": "Red", "hex": "#e60000", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "red"}, {"color": "Orange", "hex": "#f95a01", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "orange"}, {"color": "Camel", "hex": "#ffe87a", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "camel"}, {"color": "Tan", "hex": "#ba5900", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "tan"}, {"color": "Lemon Yellow", "hex": "#edef53", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "lemon_yellow"}, {"color": "White", "hex": "#ffffff", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "white"}, {"color": "Grey", "hex": "#606060", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "grey"}, {"color": "Yellow", "hex": "#fbdb01", "html": "body", "id": "wccf_product_field_glove_body_color_qo", "name": "attribute[1255]", "value": "yellow"}]
    }],
    "gloveAccent":[{
        "label": "Glove Accent Color",
        "id":"wccf_product_field_glove_accent_color",
        "options":[{"color": "Black", "hex": "#000000", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "black"}, {"color": "Mocha", "hex": "#863615", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "mocha"}, {"color": "Navy Blue", "hex": "#000080", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "navy_blue"}, {"color": "Royal Blue", "hex": "#4169e1", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "royal_blue"}, {"color": "Red", "hex": "#e60000", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "red"}, {"color": "Orange", "hex": "#f95a01", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "orange"}, {"color": "Camel", "hex": "#ffe87a", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "camel"}, {"color": "Tan", "hex": "#ba5900", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "tan"}, {"color": "Lemon Yellow", "hex": "#edef53", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "lemon_yellow"}, {"color": "White", "hex": "#ffffff", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "white"}, {"color": "Grey", "hex": "#606060", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "grey"}, {"color": "Yellow", "hex": "#fbdb01", "html": "accent", "id": "wccf_product_field_glove_accent_color", "name": "attribute[1256]", "value": "yellow"}]
    }],
    "gloveTrim":[{
        "label": "Glove Trim Color",
        "id": "wccf_product_field_glove_trim_color_qo",
        "options":[{"color": "Black", "hex": "#000000", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "black"}, {"color": "Mocha", "hex": "#863615", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "mocha"}, {"color": "Navy Blue", "hex": "#000080", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "navy_blue"}, {"color": "Royal Blue", "hex": "#4169e1", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "royal_blue"}, {"color": "Red", "hex": "#e60000", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "red"}, {"color": "Orange", "hex": "#f95a01", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "orange"}, {"color": "Camel", "hex": "#ffe87a", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "camel"}, {"color": "Tan", "hex": "#ba5900", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "tan"}, {"color": "Lemon Yellow", "hex": "#edef53", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "lemon_yellow"}, {"color": "White", "hex": "#ffffff", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "white"}, {"color": "Grey", "hex": "#606060", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "grey"}, {"color": "Yellow", "hex": "#fbdb01", "html": "trim", "id": "wccf_product_field_glove_trim_color_qo", "name": "attribute[1257]", "value": "yellow"}]
    }],
    "gloveLogo":[{
        "label": "Glove Logo Color",
        "id": "wccf_product_field_glovelogocolor",
        "options":[{"color": "Black", "hex": "#000000", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "black"}, {"color": "Grey", "hex": "#505050", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "grey"}, {"color": "Brown", "hex": "#863615", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "brown"}, {"color": "Navy Blue", "hex": "#000080", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "navy_blue"}, {"color": "Royal Blue", "hex": "#004d98", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "royal_blue"}, {"color": "Sky Blue", "hex": "#1daff2", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "sky_blue"}, {"color": "Green", "hex": "#5dc993", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "green"}, {"color": "Red", "hex": "#ff0000", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "red"}, {"color": "Orange", "hex": "#FFA500", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "orange"}, {"color": "Pink", "hex": "#FFC0CB", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "pink"}, {"color": "Camel", "hex": "#ffe87a", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "camel"}, {"color": "Yellow Gold", "hex": "#FFDF00", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "yellow_gold"}, {"color": "Vegas Gold", "hex": "#c5b358", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "vegas_gold"}, {"color": "White", "hex": "#ffffff", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "white"}, {"color": "Silver", "hex": "#C0C0C0", "html": "logo", "id": "wccf_product_field_glovelogocolor", "name": "attribute[1201]", "value": "silver"}]
    }]
}

  constructor(private gloveApi:GloveApiService) { }

  ngOnInit() {
   
  }

  test(event){
    console.log(event)
  }

  applyFill(event,fill){
    console.log(event)
    this.gloveApi.getHexIdFromDomSelection(event,fill)
  }

}
