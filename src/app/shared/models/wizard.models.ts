export const STEPS = 
    {
        sportPlayed: 'sportPlayed',
        gloveType:  'gloveType',
        gloveHand:  'gloveHand',
        handSize: 'handSize',
        gloveSize:  'gloveSize',
        glovePadding: 'glovePadding',
        gloveBreaking:  'gloveBreaking',
        gloveFont:'gloveFont',
        gloveName: 'gloveName',
        gloveSeries: 'gloveSeries',
        gloveWeb:'gloveWeb'
    }

    export interface Glove{
        gloveType?: string;
        imageType?: string;
        currModel?: string;
        gloveSeries?: {
            series?: any;
            value?: string
        };formValues:{
            sportPlayed?: string;
            gloveType?:  string;
            gloveHand?:  string;
            handSize?: string;
            gloveSize?: string;
            glovePadding?: string;
            gloveBreaking?:  string;
            gloveFont?: string;
            glovePersonalization?: string;
            gloveSeries?: string;
            gloveWeb?:string
        };
        gloveBody: {
            thumbOuter?: string;
            thumbInner?: string;
            indexOuter?: string;
            indexInner?: string;
            middleFinger?: string;
            ringOuter?: string;
            ringInner?: string;
            pinkyInner?: string;
            pinkyOuter?: string;
            personalization?: string;
            backFinger?: string;
            thumbFinger?: string;
            palmColor?: string;
            webSelected?: string;
            webColor?: string;
            utoeColor?: string;
            weltColor?: string; 
            wristColor?: string; 
            laceColor?: string; 
            targetColor?: string; 
            liningColor?: string;
            bindingColor?: string; 
            stitchingColor?: string;
            logoColor?: string; 
            embroideryColor?: string;
            embroideryFont?: string;
            seriesLogo?: string;
            seriesColor?: string;
            gloveSize?: string;
            gloveHand?: string;
            handSize?: string;
        };
        gloveDescription?: string;
        isYouthGlove?: boolean;
        indicatorCanvasMap: Array<any>;
        slider?: {
            handSliderMax?: string; 
            handSliderMin?: string; 
            handSliderStep?: number; 
            handSliderVertical?: boolean; 
            handSliderLabel?: boolean; 
            handSliderValue?: string; 
            tickInterval?: number
        }    
        shoWebType?: string;
        
        
    }
    
    export interface WebFilter{
        id: string;
        imageURL: string;
        formName: string;
        name: string;
        value: string;
        valueString: string;
    
    
    }
    
    export interface GloveSpecs{
        name:string;
        fullName:string;
        id:string;
        x:number;
        y:number;
        sliderMin:string;
        sliderMax:string;
    }