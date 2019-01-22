Vue.use(VueFormWizard);

const EvalFormWizard = Vue.component('eval-form', {
	template: '<form-wizard @on-complete="onComplete" \
	             subtitle="subtitulo" nextButtonText="Siguiente" \
	            backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" \
	            color="#3a5fab"  errorColor="#8b0000" shape="circle" transition="" \
	            > \
	             <h1 slot="title">Evaluación</h1> \
	             <tab-content title="Personal details" icon="" :before-change="beforeTabSwitch"> \
			       My first tab content \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       My second tab content \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       My second tab content \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       My second tab content \
			     </tab-content> \
			     <tab-content title="Last step"> \
			       Yuhuuu! This seems pretty damn simple \
			     </tab-content> \
			     <template slot="footer" slot-scope="props"> \
                   <div class="wizard-footer-left"> \
                     <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle">Atras</wizard-button> \
                   </div> \
                   <div class="wizard-footer-right"> \
                     <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Siguiente</wizard-button> \
                     <wizard-button v-else @click.native="alert(`Done`)" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">Finalizar</wizard-button> \
                   </div> \
                   <div class="wizard-footer-right" style = "padding-right: 10px;"> \
                     <wizard-button @click.native="saveForm" class="wizard-footer-right" :style="props.fillButtonStyle">Guardar</wizard-button> \
                   </div> \
                 </template> \
			   </form-wizard>',
    methods: {
    	onComplete: function(){
          alert('Yay. Done!');
        },
        saveForm: function(){
          alert('Saving form!');
        },
        beforeTabSwitch: function(){
           alert("This is called before switchind tabs")
           return true;
        }      
    }
});

// title="Evaluacion" subtitle="subtitulo" nextButtonText="Siguiente" backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" 