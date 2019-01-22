Vue.use(VueFormWizard);


const EvalFormWizard = Vue.component('eval-form', {
	template: '<form-wizard @on-complete="onComplete" \
	             subtitle="subtitulo" nextButtonText="Siguiente" \
	            backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" \
	            color="#3a5fab"  errorColor="#8b0000" shape="circle" transition="" \
	            > \
	             <h1 slot="title">Evaluación</h1> \
	             <tab-content title="Personal details" icon="" :before-change="beforeTabSwitch"> \
			        <first-form-step v-on:eval-type-change="setEvalType"></first-form-step>\
			        <p class="content"> \
					    <b>Selection:</b> \
					    {{ evaluation_type }} \
					</p> \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       	<second-form-step :bank_list="bank_list"></second-form-step> \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       <third-form-step></third-form-step> \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       <third-form-step></third-form-step> \
			     </tab-content> \
			     <tab-content title="Last step"> \
			       <third-form-step></third-form-step> \
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
    data () {
    	return {
    		evaluation_type: "account_statements",
    		solicitation_number: null,
    		account_statements: [
    			{
    				bank_name: null,
    				statements: [
    					{
    						month: null,
    						deposits: null,
    						balance: null
    					}
    				]
    			}
    		],
    		// static, must be loaded from backend
    		bank_list: [
    			"Banregio",
    			"Scotiabank",
    			"Bancomer",
    			"Banorte",
    			"Banamex"
    		]		   
        }
    },
    components : {
    	FirstFormStep,
    	SecondFormStep,
    	ThirdFormStep
    },  

    methods: {
    	onComplete: function(){
          alert('Yay. Done!');
        },
        saveForm: function(){
          alert('Saving form!');
        },
        beforeTabSwitch: function(){
           //alert("This is called before switchind tabs")
           return true;
        },
        setEvalType: function(val) {
        	this.evaluation_type = val;
        }     
    }
});

// title="Evaluacion" subtitle="subtitulo" nextButtonText="Siguiente" backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" 