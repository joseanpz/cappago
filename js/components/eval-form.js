Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);


const EvalFormWizard = Vue.component('eval-form', {
	template: `
    <form-wizard @on-complete="onComplete" \
      subtitle="subtitulo" nextButtonText="Siguiente" \
      backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" \
      color="#3a5fab"  errorColor="#8b0000" shape="circle" transition="" \
    > \
      <h1 slot="title">Evaluación</h1> \
        <tab-content>
          <solicitud-step 
          @sol-number-change="setSolNumber" 
          > 
          </solicitud-step>
        </tab-content>

        <tab-content>
          <credito-step
          @credit-dest-change="setCreditDest"
          @guarantee-change="setGuarantee"
          @smpl-credits-change="setSimpleCredits" 
          @rvlg-credits-change="setRevolvingCredits"
          > 
          </credito-step>
        </tab-content>

        <tab-content>
          <laboral-step
          @act-seniority-change="setActSeniority"
          @oper-seniority-change="setOperSeniority"
          @activity-change="setActivity"
          @eval-type-change="setEvalType"
          > 
          </laboral-step>
        </tab-content>

        <tab-content>
          <saldos-depositos-step
          :bank_list="bank_list"
          @acc-statements-change="setAccountStatements"
          > 
          </saldos-depositos-step>
        </tab-content>

        <tab-content>
          <buro-credito-step
          @total-debt-change="setTotalDebt"
          @monfile-banking-change="setMonfileBanking"
          @bk12-clean-change="setBk12Clean"
          @bk12maxcred-amt-change="setBk12maxcredAmt"
          > 
          </buro-credito-step>
        </tab-content>

        <tab-content>
          <estado-general-step
          @uafir-change="setUafir"
          @acc-capital-change="setAccCapital"
          @debtor-qual-change="setDebtorQual"
          @annual-sales-change="setAnnualSales"
          > 
          </estado-general-step>
        </tab-content>

        <tab-content>
          <resultado-perfilador-step
          @decree-change="setDecree"
          @risk-level-change="setRiskLevel"
          @score-change="setScore"
          @eval-type-prfl-change="setPrfEvalType"
          > 
          </resultado-perfilador-step>
        </tab-content>

         

			     <pre>{{ data | pretty }}</pre>

           <template slot="footer" slot-scope="props"> \
                   <div class="wizard-footer-left"> \
                     <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle">Atras</wizard-button> \
                   </div> \
                   <div class="wizard-footer-right"> \
                     <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Siguiente</wizard-button> \
                     <wizard-button v-else @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">Finalizar</wizard-button> \
                   </div> \
                   <div class="wizard-footer-right" style = "padding-right: 10px;"> \
                     <wizard-button @click.native="saveForm" class="wizard-footer-right" :style="props.fillButtonStyle">Guardar</wizard-button> \
                   </div> \
           </template> \
			   </form-wizard>`,
    data () {
    	return {

        solicitud : {
          id: null,
          id_actividad: null,
          id_nivel_riesgo: null,
          numero_solicitud: null,
          tipo_comprobante: "account_statements",
          garantia_hipotecaria: null,
          tipo_evaluacion_perfilador: null,
          decreto: null,
          score: null,
          ventas_anuales: null,
          // flujo_disponible_mensual : null,  
          uafir: null,
          capital_contable: null,
          destino_credito: null,
          antiguedad_actividad: null,
          antiguedad_operacion: null,
          calificacion_deudor: null,
          deuda_total: null,
          MONTHS_ON_FILE_BANKING: null,
          BK12_CLEAN: null,
          BK12_MAX_CREDIT_AMT: null
        },        
    		account_statements: [],
    		simple_credits: [],
    		revolving_credits: [],
    		//solicited_credits: [],
    		
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
      SolicitudStep,
      CreditoStep,
      LaboralStep,
      SaldosDepositosStep,
      BuroCreditoStep,
      EstadoGeneralStep,
      ResultadoPerfiladorStep

    	/*FirstFormStep,
    	SecondFormStep,
    	ThirdFormStep,
      FourthFormStep]*/
    },

    computed: {
    	solicited_credits: function () {
    		return this.simple_credits.concat(this.revolving_credits);
    	},
      data: function() {
        return {
          solicitud: this.solicitud,
          account_statements: this.account_statements,
          solicited_credits: this.solicited_credits
        }
      },
      saved: function() {
        return this.solicitud.id != null;
      }
    },

    filters: {
    	pretty: function(value) {
    		console.log('pretty');
    		console.log(value);
      		return JSON.stringify(value, null, 2);
    	}
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
          var self = this;
          if (!this.saved) {
            google.script.run
            .withSuccessHandler(function(response){
              console.log(response);
              self.solicitud.id = response.id;
            })
            .withFailureHandler(function(err){
              console.log('An error ocurred while saving a "solicitud"!')
              console.log(err);
            })
            .create('solicitud', this.solicitud)
          } else {
            google.script.run
            .withSuccessHandler(function(response){
              console.log('Updating response!')
              console.log(response);
              //self.solicitud.id = response.id;
            })
            .withFailureHandler(function(err){
              console.log('An error ocurred while updating')
              console.log(err);
            })
            .update('solicitud', this.solicitud)

          }
          
          return true;
        },
        setActivity: function(val) {
          this.solicitud.id_actividad = val;
        },
        setRiskLevel: function(val) {
          this.solicitud.id_nivel_riesgo = val;
        },
        setSolNumber: function(val) {
          this.solicitud.numero_solicitud = val;
        },
        setEvalType: function(val) {
          this.solicitud.tipo_comprobante = val;
        },
        setGuarantee: function(val) {
          this.solicitud.garantia_hipotecaria = val;
        },
        setPrfEvalType: function(val) {
          this.solicitud.tipo_evaluacion_perfilador = val;
        },
        setDecree: function(val) {
          this.solicitud.decreto = val;
        },
        setScore: function(val) {
          this.solicitud.score = val;
        },
        setAnnualSales: function(val) {
          this.solicitud.ventas_anuales = val;
        },
        setUafir: function(val) {
          this.solicitud.uafir = val;
        },
        setAccCapital: function(val) {
          this.solicitud.capital_contable = val;
        },
        setCreditDest: function(val) {
          this.solicitud.destino_credito = val;
        },
        setActSeniority: function(val) {
          this.solicitud.antiguedad_actividad = val;
        },
        setOperSeniority: function(val) {
          this.solicitud.antiguedad_operacion = val;
        },
        setDebtorQual: function(val) {
        	this.solicitud.calificacion_deudor = val;
        },
        setTotalDebt: function(val) {
          this.solicitud.deuda_total = val;
        },
        setMonfileBanking: function(val) {
          this.solicitud.MONTHS_ON_FILE_BANKING = val;
        },
        setBk12Clean: function(val) {
          this.solicitud.BK12_CLEAN = val;
        },
        setBk12maxcredAmt: function(val) {
          this.solicitud.BK12_MAX_CREDIT_AMT = val;
        },
        setAccountStatements: function(val) {
        	this.account_statements = val;
        },
        setSimpleCredits: function(val) {
        	this.simple_credits = val;
        },
        setRevolvingCredits: function(val) {
        	this.revolving_credits = val;
        } 
    }
});

// title="Evaluacion" subtitle="subtitulo" nextButtonText="Siguiente" backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" 