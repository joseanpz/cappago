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
        <tab-content :before-change="saveSolicitude">
          <solicitud-step 
          @sol-number-change="setSolNumber"          
          > 
          </solicitud-step>
        </tab-content>

        <tab-content :before-change="saveSolicitudeCredit">
          <credito-step
          @credit-dest-change="setCreditDest"
          @guarantee-change="setGuarantee"
          @smpl-credits-change="setSimpleCredits" 
          @rvlg-credits-change="setRevolvingCredits"

          :id_solicitud="solicitud.id"
          ref="credito"
          > 
          </credito-step>
        </tab-content>

        <tab-content :before-change="saveSolicitude">
          <laboral-step
          @act-seniority-change="setActSeniority"
          @oper-seniority-change="setOperSeniority"
          @activity-change="setActivity"
          @eval-type-change="setEvalType"          
          @acc-statements-change="setAccountStatements"

          :id_solicitud="solicitud.id"
          ref="laboral"          
          > 
          </laboral-step>
        </tab-content>

        <tab-content :before-change="saveSolicitude">
          <buro-credito-step
          @total-debt-change="setTotalDebt"
          @monfile-banking-change="setMonfileBanking"
          @bk12-clean-change="setBk12Clean"
          @bk12maxcred-amt-change="setBk12maxcredAmt"
          @num-arren-change="setNumArren"
          @num-fact-change="setNumFact"
          @num-revol-change="setNumRevol"
          @num-simp-change="setNumSimp"
          @sal-vig-arren-change="setSalVigArren"
          @sal-vig-fact-change="setSalVigFact"
          @sal-vig-revol-change="setSalVigRevol"
          @sal-vig-simp-change="setSalVigSimp"
          @sal-orig-arren-change="setSalOrigArren"
          @sal-orig-fact-change="setSalOrigFact"
          @sal-orig-revol-change="setSalOrigRevol"
          @sal-orig-simp-change="setSalOrigSimp"

          
          > 
          </buro-credito-step>
        </tab-content>

        <tab-content :before-change="saveSolicitude">
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

         

			    <!--<pre>{{ data | pretty }}</pre>-->
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
          garantia: null,
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
          BK12_MAX_CREDIT_AMT: null,
          num_cred_act_arren: null,
          num_cred_act_fact: null,
          num_cred_act_revol: null,
          num_cred_act_simp: null,
          sal_vig_cred_act_arren: null,
          sal_vig_cred_act_fact: null,
          sal_vig_cred_act_revol: null,
          sal_vig_cred_act_simp: null,
          sal_orig_cred_act_arren: null,
          sal_orig_cred_act_fact: null,
          sal_orig_cred_act_revol: null,
          sal_orig_cred_act_simp: null
        },        
    		account_statements: [],
    		simple_credits: [],
    		revolving_credits: [],
        config: null,
        niveles_riesgo: [],
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

    created: function () {
      this.readConfig();
      this.readNivelesRiesgo();
    },

    computed: {
    	
      solicited_credits: function () {
    		return this.simple_credits.concat(this.revolving_credits);
    	},
      
      data: function() {
        return {
          // solicitud: this.solicitud,
          //account_statements: this.account_statements,
          // solicited_credits: this.solicited_credits,
          // balances_sum: this.balances_sum,
          // deposits_sum: this.deposits_sum,
          // max_balance: this.max_balance,
          // min_balance: this.min_balance,
          // max_deposit: this.max_deposit,
          // min_deposit: this.min_deposit,
          simple_credits: this.simple_credits,
          revolving_credits: this.revolving_credits,
          id_nivel_riesgo: this.solicitud.id_nivel_riesgo,
          //niveles_riesgo: this.niveles_riesgo,
          

          deposits_month_avg: this.deposits_month_avg,
          balances_month_avg: this.balances_month_avg,
          deposits_tendency: this.deposits_tendency,
          config: this.config,
          guarantee_factor: this.guarantee_factor,
          INGRESO_MENSUAL: this.INGRESO_MENSUAL,
          INGRESO_ANUAL: this.INGRESO_ANUAL,
          factor_uafir: this.factor_uafir,
          FLUJO_MENSUAL: this.FLUJO_MENSUAL,
          FLUJO_ANUAL: this.FLUJO_ANUAL,
          nivel_riesgo: this.nivel_riesgo,
          factor_monto_maximo: this.factor_monto_maximo,
          monto_simple: this.monto_simple,
          monto_revolvente: this.monto_revolvente,
          plazo_simple: this.plazo_simple,
          monto_maximo_smp: this.monto_maximo_smp,
          monto_maximo_rev: this.monto_maximo_rev,
          deuda_total: this.solicitud.deuda_total,
          dif_deuda_ingreso_rev: this.dif_deuda_ingreso_rev,
          dif_deuda_ingreso_smp: this.dif_deuda_ingreso_smp,
          razon_FDA_FRC_smp: this.razon_FDA_FRC_smp,
          razon_FDA_FRC_rev: this.razon_FDA_FRC_rev,
          tope_capital_contable_smp_rev: this.tope_capital_contable_smp_rev,
          capacidad_pago_smp: this.capacidad_pago_smp,
          capacidad_pago_rev: this.capacidad_pago_rev,
          linea_simple: this.linea_simple,
          linea_revolvente: this.linea_revolvente


        }
      },
      
      saved: function() {
        return this.solicitud.id != null;
      },

      balances_sum: function() {
        if (this.account_statements.length > 0) {
          var balances = new Array(12).fill(0);
          for (var i=0; i<this.account_statements.length; i++) {
            balances = balances.map((balance, idx) => parseInt(balance, 10) + parseInt(this.account_statements[i].statements[idx].saldo, 10))
          }
          return balances;
        } else {
          return [];
        }
      },

      deposits_sum: function() {
        if (this.account_statements.length > 0) {
          var deposits = new Array(12).fill(0);
          for (var i=0; i<this.account_statements.length; i++) {
            deposits = deposits.map((deposit, idx) => parseInt(deposit, 10) + parseInt(this.account_statements[i].statements[idx].deposito, 10))
          }
          return deposits;
        } else {
          return [];
        }
      },

      max_balance: function () {
        return Math.max.apply(null, this.balances_sum);  // return this.balances_sum.reduce((a,b) => Math.max(a,b), 0);
      },

      min_balance: function () {
        return Math.min.apply(null, this.balances_sum);  // this.balances_sum.reduce((a,b) => Math.min(a,b), 0);
      },

      max_deposit: function () {
        return Math.max.apply(null, this.deposits_sum);  // return this.deposits_sum.reduce((a,b) => Math.max(a,b), 0);
      },

      min_deposit: function () {
        return Math.min.apply(null, this.deposits_sum);  // return this.deposits_sum.reduce((a,b) => Math.min(a,b), 0);
      },

      deposits_month_avg: function () {
        var self = this;
        var val_deposits = this.deposits_sum.filter(a => a != self.max_deposit && a != self.min_deposit);
        console.log(val_deposits);
        if (typeof val_deposits === "undefined" ) return 0;
        return val_deposits.reduce((a,b) => parseInt(a, 10) + parseInt(b, 10), 0) / val_deposits.length;
      },

      deposits_tendency: function () {
        if (this.deposits_sum.length == 0) return null;
        var y_values = this.deposits_sum.slice(8), x_values = [0, 1, 2, 3];
        var line = this.findLineByLeastSquares(x_values, y_values);
        console.log('testing!!!');
        console.log(line);
        return line[0];
      },

      balances_month_avg: function () {
        var self = this;
        
        if (this.deposits_tendency < 0) {
          return this.balances_sum.reduce((a,b) => parseInt(a, 10) + parseInt(b, 10), 0) / 12
        } else {
          var val_balances = this.balances_sum.filter((a, idx) => a != self.max_deposit && a != self.min_deposit && (a/this.deposits_sum[idx] <= 0.3));
          if (typeof val_balances === "undefinded") return 0;
          return val_balances.reduce((a,b) => parseInt(a, 10) + parseInt(b, 10), 0) / val_balances.length;
        }
      },

      guarantee_factor: function () {
        if (!this.solicitud.garantia) {
          return null;
        } else if (this.solicitud.garantia === "1" || this.solicitud.garantia === "2" || this.solicitud.garantia === "3") {
          return 1;
        } else if (this.solicitud.garantia === "4" || this.solicitud.garantia === "5") {
          return 0.8;
        }
      },

      INGRESO_MENSUAL: function () {        
        if (this.solicitud.tipo_comprobante === "account_statements" ) {
          if (!this.deposits_month_avg || !this.balances_month_avg) return null;
          return Math.min(this.deposits_month_avg * this.guarantee_factor, this.balances_month_avg * this.guarantee_factor / this.config.factor1) ; 
        } else {
          return null;
        }        
      },

      INGRESO_ANUAL: function () {
        if (this.solicitud.tipo_comprobante === "account_statements" ) {
          if (!this.deposits_month_avg || !this.balances_month_avg) return null;
          return 12 * this.INGRESO_MENSUAL;
        } else {
          return null;          
        } 
      },

      factor_uafir: function () {
        if (!this.solicitud.id_actividad) return null;
        var selected_activity = this.$refs.laboral.activities.find( act => act.id === this.solicitud.id_actividad);
        return selected_activity.factor_uafir
      },

      FLUJO_MENSUAL: function () {
        if (this.solicitud.tipo_comprobante === "account_statements" ) {
          if (!this.deposits_month_avg || !this.balances_month_avg) return null;
          return Math.min(this.deposits_month_avg * this.factor_uafir, this.balances_month_avg * this.guarantee_factor) ; 
        } else {
          return null;
        } 
      },

      FLUJO_ANUAL: function () {
        if (this.solicitud.tipo_comprobante === "account_statements" ) {
          if (!this.deposits_month_avg || !this.balances_month_avg) return null;
          return   12 * this.FLUJO_MENSUAL;
        } else {
          return null;          
        } 
      },

      nivel_riesgo: function () {
        if (!this.solicitud.id_nivel_riesgo) return null;
        return this.niveles_riesgo.find( nivrie => nivrie.id === this.solicitud.id_nivel_riesgo);
      },

      factor_monto_maximo: function () {
        if (!this.solicitud.score || this.solicitud.score < 0) return null;

        if (this.solicitud.score <= 450) {
          return 0.5;
        } else if (this.solicitud.score >= 900) {
          return 1.5
        } else {
          return 0.00523910480286183 * 0.000126666 * Math.exp( 0.016576983 * this.solicitud.score  ) + 0.5;
        }
      },
      monto_simple: function () {
        if (this.simple_credits.length === 0) return null;
        var ret = 0;
        for(var i=0; i<this.simple_credits.length; i++) {
          ret += parseInt(this.simple_credits[i].monto, 10);
        }
        return ret;
      },
      plazo_simple: function () {
        if (this.simple_credits.length === 0) return null;
        var ret = 0;
        for(var i=0; i<this.simple_credits.length; i++) {
          ret += parseInt(this.simple_credits[i].plazo, 10) * parseInt(this.simple_credits[i].monto, 10);
        }
        return Math.ceil((ret / this.monto_simple) / 6) * 6;
      },
      monto_revolvente: function () {
        if (this.revolving_credits.length === 0) return null;
        var ret = 0;
        for(var i=0; i<this.revolving_credits.length; i++) {
          ret += parseInt(this.revolving_credits[i].monto, 10);
        }
        return ret;
      },
      tasa_mensual_iva: function () {
        if (!this.nivel_riesgo) return null;
        return (this.nivel_riesgo.tasa / 12) * 1.16;
      },
      factor_recuperacion_capital: function () {
        if (!this.plazo_simple || !this.nivel_riesgo) return null;
        var tmi = this.tasa_mensual_iva;
        return tmi * Math.pow(1+tmi, this.plazo_simple) / (Math.pow( 1+tmi, this.plazo_simple) - 1)
      },
      //  restricciones  //
      monto_maximo_smp: function () {
        if (!this.monto_simple || !this.factor_monto_maximo) return null;
        return this.monto_simple * this.factor_monto_maximo;
      },
      monto_maximo_rev: function () {
        if (!this.monto_revolvente || !this.factor_monto_maximo) return null;
        return this.monto_revolvente * this.factor_monto_maximo;
      },
      dif_deuda_ingreso_rev: function () {
        if (!this.nivel_riesgo || !this.INGRESO_ANUAL || !this.solicitud.deuda_total) return null;
        return this.nivel_riesgo.rev_factor * this.INGRESO_ANUAL - this.solicitud.deuda_total;
      },
      dif_deuda_ingreso_smp: function () {
        if (!this.nivel_riesgo || !this.INGRESO_ANUAL || !this.solicitud.deuda_total) return null;
        return this.nivel_riesgo.smp_factor * this.INGRESO_ANUAL - this.solicitud.deuda_total;
      },
      razon_FDA_FRC_smp: function () {  // razon entre el flujo anual disponible y el factor de recuperacion de capital
        if (!this.FLUJO_ANUAL || !this.factor_recuperacion_capital) return null;
        return this.FLUJO_ANUAL / this.factor_recuperacion_capital;
      },
      razon_FDA_tasa_rev: function () {
        if (!this.FLUJO_ANUAL || !this.nivel_riesgo) return null;
        return this.FLUJO_ANUAL / ( 0.2 + this.nivel_riesgo.tasa);
      },
      tope_capital_contable_smp_rev: function () {
        if (!this.solicitud.capital_contable || this.solicitud.tipo_comprobante === "account_statements") return null;
        return this.solicitud.capital_contable / 4;
      },
      // capacidad de pago
      capacidad_pago_rev: function () {
        if (!this.nivel_riesgo || !this.INGRESO_MENSUAL) return null;
        return this.INGRESO_MENSUAL * this.nivel_riesgo.n_vences_riesgo;
      },
      capacidad_pago_smp: function () {
        if (!this.FLUJO_MENSUAL || !this.nivel_riesgo) return null;
        return this.FLUJO_MENSUAL * this.config.factor2 * (1 - Math.pow(1 + this.tasa_mensual_iva, this.nivel_riesgo.plazo))
      },

      // lineas de credito
      linea_simple: function () {
        if (this.solicitud.tipo_comprobante === "account_statements"){
          if (!this.capacidad_pago_smp || !this.dif_deuda_ingreso_smp || this.razon_FDA_FRC_smp || !this.monto_maximo_smp || !this.tope_capital_contable_smp_rev) return null;
          return Math.min(this.capacidad_pago_smp, this.dif_deuda_ingreso_smp, 
            this.razon_FDA_FRC_smp, this.monto_maximo_smp, this.tope_capital_contable_smp_rev);
        } else {
          if (!this.capacidad_pago_smp || !this.dif_deuda_ingreso_smp || this.razon_FDA_FRC_smp || !this.monto_maximo_smp) return null;
          return Math.min(this.capacidad_pago_smp, this.dif_deuda_ingreso_smp, 
            this.razon_FDA_FRC_smp, this.monto_maximo_smp);
        }        
      },
      linea_revolvente: function () {
        if (this.solicitud.tipo_comprobante === "account_statements"){
          if (!this.capacidad_pago_rev || !this.dif_deuda_ingreso_rev || this.razon_FDA_FRC_rev || !this.monto_maximo_rev || !this.tope_capital_contable_smp_rev) return null;
          return Math.min(this.capacidad_pago_rev, this.dif_deuda_ingreso_rev, 
            this.razon_FDA_FRC_rev, this.monto_maximo_rev, this.tope_capital_contable_smp_rev);
        } else {
          if (!this.capacidad_pago_rev || !this.dif_deuda_ingreso_rev || this.razon_FDA_FRC_rev || !this.monto_maximo_rev) return null;
          return Math.min(this.capacidad_pago_rev, this.dif_deuda_ingreso_rev, 
            this.razon_FDA_FRC_rev, this.monto_maximo_rev);
        }

      },




    },

    filters: {
    	pretty: function(value) {
    		//console.log('pretty');
    		//console.log(value);
      		return JSON.stringify(value, null, 2);
    	}
  	},

    methods: {
    	onComplete: function(){
        this.saveSolicitude();
        alert('Yay. Done!');
      },
      saveForm: function(){
        alert('Saving form!');
      },
      readConfig: function () {
        var self = this;
        google.script.run
        .withSuccessHandler(function(response){
          console.log('Reading config');
          console.log(response);
          self.config = response.records[0];
        })
        .withFailureHandler(function(err){
          console.log('An error ocurred while reading config');
          console.log(err);
        })
        .readCatalog('config')
      },
      readNivelesRiesgo: function () {
        var self = this;
        google.script.run
        .withSuccessHandler(function(response){
          console.log('Reading nivel_riesgo');
          console.log(response);
          self.niveles_riesgo = response.records;
        })
        .withFailureHandler(function(err){
          console.log('An error ocurred while reading nivel_riesgo');
          console.log(err);
        })
        .readCatalog('nivel_riesgo')
      },

      saveSolicitudeCredit: function () {
        this.saveSolicitude();
        this.$refs.credito.saveCredits();
        return true;
      },

      saveSolicitude: function(){
        //alert("This is called before switchind tabs")
        var self = this;
        console.log('saveSolicitude')
        if (!this.saved) {
          google.script.run
          .withSuccessHandler(function(response){
            // TODO: handle different success response
            console.log('Creating "solicitud"!')
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
      findLineByLeastSquares: function(values_x, values_y) {
      var sum_x = 0;
      var sum_y = 0;
      var sum_xy = 0;
      var sum_xx = 0;
      var count = 0;

      /*
       * We'll use those variables for faster read/write access.
       */
      var x = 0;
      var y = 0;
      var values_length = values_x.length;

      if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
      }

      /*
      * Nothing to do.
      */
      if (values_length === 0) {
        return [ [], [] ];
      }

      /*
       * Calculate the sum for each of the parts necessary.
       */
      for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
      }

      /*
       * Calculate m and b for the formular:
       * y = x * m + b
       */
      var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
      var b = (sum_y/count) - (m*sum_x)/count;

      /*
       * We will make the x and y result line now
       */
      /*var result_values_x = [];
      var result_values_y = [];

      for (var v = 0; v &lt; values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
      }

      return [result_values_x, result_values_y];*/
      return [m, b]
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
        this.solicitud.garantia = val;
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
      setNumArren: function(val) {
        this.solicitud.num_cred_act_arren = val;
      },
      setNumFact: function(val) {
        this.solicitud.num_cred_act_fact = val;
      },
      setNumRevol: function(val) {
        this.solicitud.num_cred_act_revol = val;
      },
      setNumSimp: function(val) {
        this.solicitud.num_cred_act_simp = val;
      },
      setSalVigArren: function(val) {
        this.solicitud.sal_vig_cred_act_arren = val;
      },
      setSalVigFact: function(val) {
        this.solicitud.sal_vig_cred_act_fact = val;
      },
      setSalVigRevol: function(val) {
        this.solicitud.sal_vig_cred_act_revol = val;
      },
      setSalVigSimp: function(val) {
        this.solicitud.sal_vig_cred_act_simp = val;
      },
      setSalOrigArren: function(val) {
        this.solicitud.sal_orig_cred_act_arren = val;
      },
      setSalOrigFact: function(val) {
        this.solicitud.sal_orig_cred_act_fact = val;
      },
      setSalOrigRevol: function(val) {
        this.solicitud.sal_orig_cred_act_revol = val;
      },
      setSalOrigSimp: function(val) {
        this.solicitud.sal_orig_cred_act_simp = val;
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