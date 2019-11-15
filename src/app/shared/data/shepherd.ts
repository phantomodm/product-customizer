export const defaultStepOptions = {
    scrollTo: false,
    cancelIcon: {
        enabled: true
    }
}

export const steps = [{
    id: 'intro',
    options: {
        attachTo:'mOutside',
        beforeShowPromise: function() {
            return new Promise(function(resolve){
                setTimeout(function(){
                    window.scrollTo(0,0);
                    resolve();
                }, 500)
            })
        },
        buttons: [{
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        cancelIcon: {
            enabled: true
        },
        title: 'Welcome to NYStix Glove Customizer',
        text: [`Customizing a NYStix custom glove is simple and fun. 
                This short tour will guide on how to use our tool to customize your order.`
        ],
        when: {
            show: () => { console.log('show step') },
            hide: () => { console.log('hide step')}
        }
    }
},{

}]