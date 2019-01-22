Vue.use(VueFormWizard);


const EvalFormWizard = Vue.component('eval-form', {
	template: '<form-wizard @on-complete="onComplete" \
	             subtitle="subtitulo" nextButtonText="Siguiente" \
	            backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" \
	            color="#3a5fab"  errorColor="#8b0000" shape="circle" transition="" \
	            > \
	             <h1 slot="title">Evaluación</h1> \
	             <tab-content title="Personal details" icon="" :before-change="beforeTabSwitch"> \
			        <first-form-step></first-form-step>\
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       	<second-form-step></second-form-step> \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       <second-form-step></second-form-step> \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       <second-form-step></second-form-step> \
			     </tab-content> \
			     <tab-content title="Last step"> \
			       <second-form-step></second-form-step> \
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
    		radio: "Jack",
		   model:{
			    firstName:'',
			    lastName:'',
			    email:'',
			    streetName:'',
			    streetNumber:'',
			    city:'',
			    country:''
		   },
		   formOptions: {
			    validationErrorClass: "has-error",
			    validationSuccessClass: "has-success",
			    validateAfterChanged: true
		   },
		   firstTabSchema:{
			     fields:[
				     {
				        type: "input",
								inputType: "text",
				        label: "First name",
				        model: "firstName",
				        required:true,
				        validator:VueFormGenerator.validators.string,
				        styleClasses:'col-xs-6'
				     },
				     {
				        type: "input",
								inputType: "text",
				        label: "Last name",
				        model: "lastName",
				        required:true,
				        validator:VueFormGenerator.validators.string,
				        styleClasses:'col-xs-6'
				     },
				      {
				        type: "input",
								inputType: "text",
				        label: "Email",
				        model: "email",
				        required:true,
				        validator:VueFormGenerator.validators.email,
				        styleClasses:'col-xs-12'
				     }
			     ]
		   },
		   secondTabSchema:{
		     fields:[
			     {
			        type: "input",
							inputType: "text",
			        label: "Street name",
			        model: "streetName",
			        required:true,
			        validator:VueFormGenerator.validators.string,
			        styleClasses:'col-xs-9'
			     },
			      {
			        type: "input",
							inputType: "text",
			        label: "Street number",
			        model: "streetNumber",
			        required:true,
			        validator:VueFormGenerator.validators.string,
			        styleClasses:'col-xs-3'
			      },
			      {
			        type: "input",
							inputType: "text",
			        label: "City",
			        model: "city",
			        required:true,
			        validator:VueFormGenerator.validators.string,
			        styleClasses:'col-xs-6'
			      },
			      {
			        type: "select",
			        label: "Country",
			        model: "country",
			        required:true,
			        validator:VueFormGenerator.validators.string,
			        values:['United Kingdom','Romania','Germany'],
			        styleClasses:'col-xs-6'
			      },
		     ]
		   }
 
        }
    },
    components : {
    	FirstFormStep,
    	SecondFormStep,
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
        }      
    }
});

// title="Evaluacion" subtitle="subtitulo" nextButtonText="Siguiente" backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" 