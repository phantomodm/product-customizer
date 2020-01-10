export interface GloveColors {
    hex: string;
    value: string;
    gloveSections?: string[];
}

export interface ProductAttributes{
    formName:string;
    id:string;
    name: string;
    value: string;
    valueString: string;
}

export interface WizardPrompts {
    formName?: string;
    horizontal?: string;
    vertical?: string;
    label?: string;
    options?: ProductAttributes[];
}

export interface GloveWebs {
    gloveType?:[];
    id?: string;
    name?: string;
    value?: string;
    valueString?: string;
    imageURL?: string;
}

export interface GloveSlider {
    value:string;
    hex:string;
    embroidery:boolean;
    leather:string[];
}

export interface GloveSize {
    size?:string;
    content?:any;
    img?: string;
}

export interface GloveSizeContent {
    infielder?: string;
    oufielder?: string;
    catcher?: string;
    pitcher?: string;
}

export interface HtmlInputValue {
    id: string;
    value: string;
}

export interface NavFormControl { 
    sportPlayed: string; 
    gloveType: string; 
    gloveHand: string; 
    handSize: string; 
    gloveSize: string; 
    glovePadding: string; 
    gloveBreaking: string; 
    gloveFont: string; 
    glovePersonalization: string; 
    gloveSeries: string; 
    gloveWeb: string; }