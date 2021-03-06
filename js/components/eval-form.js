Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);


const EvalFormWizard = Vue.component('eval-form', {
  props: ['id_solicitud'],
	template: `
    <form-wizard @on-complete="onComplete" ref="form_wizard"
      subtitle="subtitulo" nextButtonText="Siguiente"
      backButtonText="Atras" finishButtonText="Guardar" stepSize="sm"
      color="#3a5fab"  errorColor="#8b0000" shape="circle" transition=""   
    >
      <h1 slot="title">Proceso de cálculo de capacidad de pago</h1>
      <tab-content :before-change="saveSolicitude" title="Datos de la solicitud">
        <solicitud-step 
          @sol-number-change="setSolNumber"
          @sol-date-change="setSolDate"
          @ced-prosp-change="setCedProspect"
          @promoter-change="setPromoter"
          @subdiretor-change="setSubdirector"
          @analyst-change="setAnalyst"
          @shareholder-change="setShareholder"
          @checks-date-change="setChecksdate"
          @credit-date-change="setCreditDate"

          ref="solicitud" 
          :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
          :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
          :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
          :razon_flujo_tasa="razon_FDA_tasa_rev"
          :razon_flujo_rec_capital="razon_FDA_FRC_smp"
          :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
          :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"        
        > 
        </solicitud-step>
      </tab-content>

      <tab-content :before-change="saveSolicitudeCredit" title="Datos del crédito">
        
        <section class="container">
          <credito-step
            @credit-dest-change="setCreditDest"
            @guarantee-change="setGuarantee"
            @smpl-credits-change="setSimpleCredits" 
            @rvlg-credits-change="setRevolvingCredits"

            :id_solicitud="solicitud.id"
            :linea_revolvente="linea_revolvente"
            :linea_simple="linea_simple"
            ref="credito"
          > 
          </credito-step>
          <results 
            :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
            :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
            :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
            :razon_flujo_tasa="razon_FDA_tasa_rev"
            :razon_flujo_rec_capital="razon_FDA_FRC_smp"
            :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
            :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"
          >
          </results>
        </section>

      </tab-content>

      <tab-content :before-change="saveSolicitudeBalDep" title="Características PyME">
        <section class="container">
          <laboral-step
            @act-seniority-change="setActSeniority"
            @oper-seniority-change="setOperSeniority"
            @activity-change="setActivity"
            @eval-type-change="setEvalType"
            @spec-activity-change="setSpecActivity"
            @num-employees-change="setNumEmployees"
            @avg-annual-sales-change="setAvgAnnualSales"        
            

            :tipo_comprobante="solicitud.tipo_comprobante"
            :id_solicitud="solicitud.id"
            :fecha_solicitud="solicitud.fecha_solicitud"
            ref="laboral"
            :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
            :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
            :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
            :razon_flujo_tasa="razon_FDA_tasa_rev"
            :razon_flujo_rec_capital="razon_FDA_FRC_smp"
            :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
            :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"        
          > 
          </laboral-step>

          
          <saldos-depositos-step  v-if="tipo_comprobante=='account_statements'"
            :id_solicitud="solicitud.id"
            :fecha_solicitud="solicitud.fecha_solicitud"
            @acc-statements-change="setAccountStatements"
            ref="saldo_deposito"
          > 
          
          </saldos-depositos-step>
              

          <estado-financiero-card
            @uafir-change="setUafir"
            @acc-capital-change="setAccCapital"            
            @annual-sales-change="setAnnualSales"        
            @finantial-passive-change="setFinantialPassive"

            ref="estado_financiero"
            :tipo_comprobante="solicitud.tipo_comprobante"                    
          >
          </estado-financiero-card>       

          <results 
            :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
            :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
            :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
            :razon_flujo_tasa="razon_FDA_tasa_rev"
            :razon_flujo_rec_capital="razon_FDA_FRC_smp"
            :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
            :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"
          >
          </results>
        </section>
      </tab-content>

      <tab-content :before-change="saveSolicitude" title="Buró">
        <buro-credito-step
          @total-debt-change="setTotalDebt"
          @monfile-banking-change="setMonfileBanking"
          @bk12-clean-change="setBk12Clean"
          @bk12maxcred-amt-change="setBk12maxcredAmt"
          @short-term-debt-change="setShortTermDebt"
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
          @large-credit-experience-change="setLargeExpCredit"
          @buro-calif-change="setBuroCalif"
          @deuda-date-change="setDeudaDate"
          @higher-line-change="setHigherLine"

          ref="buro_credito"
          :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
          :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
          :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
          :razon_flujo_tasa="razon_FDA_tasa_rev"
          :razon_flujo_rec_capital="razon_FDA_FRC_smp"
          :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
          :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"

        
        > 
        </buro-credito-step>
      </tab-content>

      <tab-content :before-change="saveSolicitude" title="Perfilador">
        <section class="container">
          

          <resultado-perfilador-card
            :cambia_decreto="cambia_decreto"
            @decree-change="setDecree"
            @risk-level-change="setRiskLevel"
            @score-change="setScore"
            @eval-type-prfl-change="setPrfEvalType"
            @debtor-qual-change="setDebtorQual"
            @internal-calif="setInternalCalif"
            @calif-pre="setCalifPre"
            ref="resultado_perfilador"            
          >

          </resultado-perfilador-card>

          <results 
            :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
            :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
            :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
            :razon_flujo_tasa="razon_FDA_tasa_rev"
            :razon_flujo_rec_capital="razon_FDA_FRC_smp"
            :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
            :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"
          >
          </results>

        </section>
      </tab-content>

      <tab-content title="Asignación Crédito">
        <section class="container">
          <asignacion-step ref="asignacion"
            @potential-risk-change="setPotentialRisk"
            :id_solicitud="solicitud.id"
            :initial_simple_credits="simple_credits"
            :initial_revolving_credits="revolving_credits"
          >

          </asignacion-step>
          <results 
            :linea="{'simple':linea_simple, 'revolvente':linea_revolvente}"
            :capacidad_pago="{'simple':capacidad_pago_smp, 'revolvente':capacidad_pago_rev}"
            :ingreso_vs_deuda="{'simple':dif_deuda_ingreso_smp, 'revolvente':dif_deuda_ingreso_rev}"
            :razon_flujo_tasa="razon_FDA_tasa_rev"
            :razon_flujo_rec_capital="razon_FDA_FRC_smp"
            :monto_solicitado="{'simple':monto_simple, 'revolvente':monto_revolvente}"
            :monto_maximo="{'simple':monto_maximo, 'revolvente':monto_maximo}"
          >
          </results>
        </section>
      </tab-content>  

      <!--<pre>{{ data | pretty }}</pre>-->

      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wizard-button v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Atrás</wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Guardar y Continuar</wizard-button>
          <wizard-button v-else @click.native="onComplete()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">Finalizar y Guardar</wizard-button>
        </div>
        <!--
        <div class="wizard-footer-right" style = "padding-right: 10px;">
          <wizard-button @click.native="saveForm" class="wizard-footer-right" :style="props.fillButtonStyle">Guardar</wizard-button>
        </div>
        -->
      </template>
    </form-wizard>
  `,
  data () {
  	return {

      solicitud : {
        id: null,
        id_actividad: null,
        id_nivel_riesgo: null,
        numero_solicitud: null,
        fecha_solicitud: null,
        tipo_comprobante: "account_statements",
        linea_simple_sugerida: null,
        plazo_simple: null,
        linea_revolvente_sugerida: null,
        garantia: null,
        tipo_evaluacion_perfilador: null,
        decreto: null,
        score: null,
        ventas_anuales: null,
        // flujo_disponible_mensual : null,  
        uafir: null,
        deuda_cortoplazo: null,
        pasivo_financiero_corto: null,
        capital_contable: null,
        destino_credito: null,
        antiguedad_actividad: null,
        antiguedad_operacion: null,
        actividad_especifica: null,
        numero_empleados: null,
        promedio_venta_anual: null,
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
        sal_orig_cred_act_simp: null,
        exp_creditos_largos: null,
        fecha_consulta: null,
        calif_buro: null,
        calificacion_interna: null,
        pre_calif: null,
        cedente_prosp: null,
        promotor: null,
        subdirector: null,
        analista: null,
        accionistas: null,
        cheques_fecha: null,
        credito_fecha: null,
        riesgo_potencial: null,
        linea_mas_alta: null,
      },        
  		account_statements: [],
  		simple_credits: [],
  		revolving_credits: [],
      config: null,
      niveles_riesgo: [],
      tab_titles: {
        estado_general: "Perfilador"
      },
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
    ResultadoPerfiladorStep,
    AsignacionStep
  },

  created: function () {
    this.readConfig();
    this.readNivelesRiesgo();
    if (!!this.id_solicitud) {
      this.solicitud.id = this.id_solicitud
      this.readSolicitud();
    }  
  },

  mounted: function () {
    if (!!this.id_solicitud) {
      this.$refs.form_wizard.activateAll();
      //this.$refs.credito.setSimpleLine(this.linea_simple);
      //this.$refs.credito.setRevolvingLine(this.linea_revolvente);
    } 
  },  

  computed: {
  	
    solicited_credits: function () {
  		return this.simple_credits.concat(this.revolving_credits);
  	},
    
    data: function() {
      return {
        //solicitud: this.solicitud,
        //id_solicitud: this.id_solicitud,
        //account_statements: this.account_statements,
        solicited_credits: this.solicited_credits,
        //balances_sum: this.balances_sum,
        //deposits_sum: this.deposits_sum,
        //max_balance: this.max_balance,
        //min_balance: this.min_balance,
        //max_deposit: this.max_deposit,
        //min_deposit: this.min_deposit,
        //simple_credits: this.simple_credits,
        //revolving_credits: this.revolving_credits,
        //id_nivel_riesgo: this.solicitud.id_nivel_riesgo,
        //niveles_riesgo: this.niveles_riesgo,  
        //tipo_comprobante: this.solicitud.tipo_comprobante,
        /*monto_simple: this.monto_simple,
        monto_revolvente: this.monto_revolvente,
        linea_simple: this.linea_simple,
        linea_revolvente: this.linea_revolvente, 
        linea_simple_sugerida: this.solicitud.linea_simple_sugerida,
        linea_revolvente_sugerida: this.solicitud.linea_revolvente_sugerida,     

        //deposits_month_avg: this.deposits_month_avg,
        //balances_month_avg: this.balances_month_avg,
        //deposits_tendency: this.deposits_tendency,
        //config: this.config,*/
        /*monto_total_rev: this.monto_total_rev,
        valor_actual: this.valor_actual,
        deuda_cortoplazo: this.deuda_cortoplazo,
        capital_contable: this.solicitud.capital_contable,
        guarantee_factor: this.guarantee_factor,
        INGRESO_MENSUAL: this.INGRESO_MENSUAL,
        INGRESO_ANUAL: this.INGRESO_ANUAL,
        factor_uafir: this.factor_uafir,
        FLUJO_MENSUAL: this.FLUJO_MENSUAL,
        FLUJO_ANUAL: this.FLUJO_ANUAL,
        pasivo_financiero_corto: this.solicitud.pasivo_financiero_corto,
        deuda_cortoplazo: this.solicitud.deuda_cortoplazo,
        uafir: this.solicitud.uafir,
        ventas_anuales: this.solicitud.ventas_anuales,
        nivel_riesgo: this.nivel_riesgo,
        exp_creditos_largos: this.solicitud.exp_creditos_largos,
        factor_monto_maximo: this.factor_monto_maximo,
        monto_simple_buro: this.monto_simple_buro,
        monto_revolvente_buro: this.monto_revolvente_buro,
        monto_factoraje_buro: this.monto_factoraje_buro,
        monto_arrendamiento_buro: this.monto_arrendamiento_buro,
        BK12_MAX_CREDIT_AMT: this.solicitud.BK12_MAX_CREDIT_AMT,
        linea_mas_alta: this.solicitud.linea_mas_alta,
        monto_maximo: this.monto_maximo,*/
        // linea_revolvente_sugerida: this.solicitud.linea_revolvente_sugerida
        VENTAS: this.VENTAS,
        cambia_decreto: this.cambia_decreto,
        linea_simple_prev: this.linea_simple_prev,
        linea_revolvente_prev: this.linea_revolvente_prev,
        linea_revolvente_sin_ventas: this.linea_revolvente_sin_ventas,
        linea_revolvente_prev_sin_ventas: this.linea_revolvente_prev_sin_ventas,
        linea_simple: this.linea_simple,
        plazo_simple: this.plazo_simple,
        linea_revolvente: this.linea_revolvente,
        dif_deuda_ingreso_rev: this.dif_deuda_ingreso_rev,
        dif_deuda_ingreso_smp: this.dif_deuda_ingreso_smp,
        razon_FDA_FRC_smp: this.razon_FDA_FRC_smp,
        razon_FDA_tasa_rev: this.razon_FDA_tasa_rev,
        tope_capital_contable_smp_rev: this.tope_capital_contable_smp_rev,
        valor_actual: this.valor_actual,
        pasivo_financiero_corto: this.solicitud.pasivo_financiero_corto, 
        deuda_cortoplazo: this.solicitud.deuda_cortoplazo,
        capacidad_pago_smp: this.capacidad_pago_smp,
        capacidad_pago_rev: this.capacidad_pago_rev,
        monto_simple: this.monto_simple,
        monto_revolvente: this.monto_revolvente,
        dif_deuda_ingreso: this.dif_deuda_ingreso,
        //deposits_movil_means: this.deposits_movil_means,
        //balances_movil_means: this.balances_movil_means,
        //deposits_polynomial_tendency: this.deposits_polynomial_tendency,
        //balances_polynomial_tendency: this.balances_polynomial_tendency,
        //balances_projection: this.balances_projection,
        //deposits_projection: this.deposits_projection,
        //bal_proj_standard_deviation: this.bal_proj_standard_deviation,
        //dep_proj_standard_deviation: this.dep_proj_standard_deviation,
        //balances_tendency_factor: this.balances_tendency_factor,
        //deposits_tendency_factor: this.deposits_tendency_factor


        /*factor_monto_maximo: this.factor_monto_maximo,
        factor_recuperacion_capital: this.factor_recuperacion_capital,
        monto_simple: this.monto_simple,
        monto_revolvente: this.monto_revolvente,
        plazo_simple: this.plazo_simple,
        deuda_total: this.solicitud.deuda_total,
        MONTHS_ON_FILE_BANKING: this.solicitud.MONTHS_ON_FILE_BANKING,
        BK12_CLEAN: this.solicitud.BK12_CLEAN,
        
        num_cred_act_arren: this.solicitud.num_cred_act_arren,
        num_cred_act_fact: this.solicitud.num_cred_act_fact,
        num_cred_act_revol: this.solicitud.num_cred_act_revol,
        num_cred_act_simp: this.solicitud.num_cred_act_simp,
        sal_vig_cred_act_arren: this.solicitud.sal_vig_cred_act_arren,
        sal_vig_cred_act_fact: this.solicitud.sal_vig_cred_act_fact,
        sal_vig_cred_act_revol: this.solicitud.sal_vig_cred_act_revol,
        sal_vig_cred_act_simp: this.solicitud.sal_vig_cred_act_simp,
        sal_orig_cred_act_arren: this.solicitud.sal_orig_cred_act_arren,
        sal_orig_cred_act_fact: this.solicitud.sal_orig_cred_act_fact,
        sal_orig_cred_act_revol: this.solicitud.sal_orig_cred_act_revol,
        sal_orig_cred_act_simp: this.solicitud.sal_orig_cred_act_simp,
        exp_creditos_largos: this.solicitud.exp_creditos_largos,
        monto_simple_buro: this.monto_simple_buro,
        monto_revolvente_buro: this.monto_revolvente_buro,
        monto_maximo_smp: this.monto_maximo_smp,
        monto_maximo_rev: this.monto_maximo_rev,          
        dif_deuda_ingreso_rev: this.dif_deuda_ingreso_rev,
        dif_deuda_ingreso_smp: this.dif_deuda_ingreso_smp,
        razon_FDA_FRC_smp: this.razon_FDA_FRC_smp,
        razon_FDA_tasa_rev: this.razon_FDA_tasa_rev,
        tope_capital_contable_smp_rev: this.tope_capital_contable_smp_rev,
        capacidad_pago_smp: this.capacidad_pago_smp,
        capacidad_pago_rev: this.capacidad_pago_rev,
        linea_simple: this.linea_simple,
        linea_revolvente: this.linea_revolvente*/
      }
    },

    tipo_comprobante: function () {
      return this.solicitud.tipo_comprobante;
    },
    
    saved: function() {
      return this.solicitud.id != null;
    },

    balances_sum: function() {
      if (this.account_statements.length > 0) {
        var balances = new Array(12).fill(0);
        for (var i=0; i<this.account_statements.length; i++) {
          balances = balances.map((balance, idx) => parseFloat(balance) + parseFloat(this.account_statements[i].statements[idx].saldo))
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
          deposits = deposits.map((deposit, idx) => parseFloat(deposit) + parseFloat(this.account_statements[i].statements[idx].deposito))
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
      return val_deposits.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / val_deposits.length;
    },

    deposits_movil_means: function () {
      if (this.deposits_sum.length === 0) return [];
      var self = this;
      var first_mm = [], second_mm = [];

      for (var i=0; i<11; i++) {
        //continue
        var tmp = (this.deposits_sum[i] + this.deposits_sum[i+1]) / 2;
        first_mm.push(tmp);
      }
      console.log(first_mm)
      for (var i=0; i<10; i++) {
        //continue
        var tmp = (first_mm[i] + first_mm[i+1]) / 2;
        second_mm.push(tmp);
      }
      console.log(second_mm);
      return second_mm.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / 10;
    },

    deposits_polynomial_tendency: function () {
      if (this.deposits_sum.length == 0) return null;
      var deposit_sum_pond = [];
      for (var i=0; i<12; i++) {
        var elm = 0;
        for (var j=i; j>=0; j--) {
          elm += this.deposits_sum[j] * (j+1) / ((i+1)*(i+2)/2) ;
        }
        deposit_sum_pond.push(elm);
      }
      var quadratic_interpolation = this.polynomial(deposit_sum_pond.map(function(item, index){
        return [index+1, item];
      }), 2, {precision: 3});
      var cubic_interpolation = this.polynomial(deposit_sum_pond.map(function(item, index){
        return [index+1, item];
      }), 3, {precision: 3});
      return [quadratic_interpolation, cubic_interpolation];
    },

    deposits_projection: function () {
      var projection = this.deposits_quadratic_cubic_projections(14);
      return (projection[0] + projection[1]) / 2; 
    },

    dep_proj_standard_deviation: function () {
      var x = [1,2,3,4,5,6,7,8,9,10,11,12],
      projections = x.map((item) => (this.deposits_quadratic_cubic_projections(item)[0] + this.deposits_quadratic_cubic_projections(item)[1]) / 2);
      var projection_mean = projections.reduce((a,b) => a + b) / 12;
      var variance = projections.map((item) => Math.pow(item - projection_mean, 2)).reduce((a,b) => a+b) / (11);
      return Math.sqrt(variance);
    },

    deposits_tendency_factor: function () {
      if (this.dep_proj_standard_deviation === 0 || !this.nivel_riesgo) return null;
      var dep_quad_cub_12 = this.deposits_quadratic_cubic_projections(12)
      var dep_quot_proj_sd =  (-this.deposits_projection + (dep_quad_cub_12[0]+dep_quad_cub_12[1])/2) / this.dep_proj_standard_deviation;
      if (dep_quot_proj_sd <= 1.25) {
        return this.nivel_riesgo.factor_tendencia_negativa_0;
      } else if (dep_quot_proj_sd<=2) {
        return this.nivel_riesgo.factor_tendencia_negativa_1;
      } else if (dep_quot_proj_sd>2) {
        return this.nivel_riesgo.factor_tendencia_negativa_2;
      } else {
        return null;
      }
    },

    deposits_tendency: function () {
      if (this.deposits_sum.length == 0) return null;
      var y_values = this.deposits_sum.slice(8), x_values = [0, 1, 2, 3];
      var line = this.findLineByLeastSquares(x_values, y_values);
      //console.log('testing!!!');
      //console.log(line);
      return line[0];
    },

    balances_month_avg: function () {      
      var self = this;      
      if (this.deposits_tendency < 0) {
        return this.balances_sum.slice(8).reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / 4
      } else {
        var val_balances = this.balances_sum.filter((a, idx) => a != self.max_balance && a != self.min_balance && (a/this.deposits_sum[idx] <= 0.3));
        if (typeof val_balances === "undefinded") return 0;
        //console.log('var_valances');
        //console.log(val_balances);
        return val_balances.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / val_balances.length;
      }
    },

    balances_movil_means: function () {
      if (this.balances_sum.length === 0) return [];
      var self = this;
      var first_mm = [], second_mm = [];
      for (var i=0; i<11; i++) {
        first_mm.push((this.balances_sum[i] + this.balances_sum[i+1]) / 2)
      }
      for (var i=0; i<10; i++) {
        second_mm.push((first_mm[i] + first_mm[i+1]) / 2)
      }
      return second_mm.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / 10;
    },

    balances_polynomial_tendency: function () {
      if (this.balances_sum.length == 0) return null;
      var balances_sum_pond = [];
      for (var i=0; i<12; i++) {
        var elm = 0;
        for (var j=i; j>=0; j--) {
          elm += this.balances_sum[j] * (j+1) / ((i+1)*(i+2)/2) ;
        }
        balances_sum_pond.push(elm);
      }
      var quadratic_interpolation = this.polynomial(balances_sum_pond.map(function(item, index){
        return [index+1, item];
      }), 2, {precision: 3});
      var cubic_interpolation = this.polynomial(balances_sum_pond.map(function(item, index){
        return [index+1, item];
      }), 3, {precision: 3});
      return [quadratic_interpolation, cubic_interpolation];
    },

    balances_projection: function () {
      var projection = this.balances_quadratic_cubic_projections(14);
      return (projection[0] + projection[1]) / 2; 
    },

    bal_proj_standard_deviation: function () {
      var x = [1,2,3,4,5,6,7,8,9,10,11,12],
      projections = x.map((item) => (this.balances_quadratic_cubic_projections(item)[0] + this.balances_quadratic_cubic_projections(item)[1]) / 2);
      var projection_mean = projections.reduce((a,b) => a + b) / 12;
      var variance = projections.map((item) => Math.pow(item - projection_mean, 2)).reduce((a,b) => a+b) / 11;
      return Math.sqrt(variance);
    },

    balances_tendency_factor: function () {
      if (this.bal_proj_standard_deviation === 0 || !this.nivel_riesgo) return null;
      var bal_quad_cub_12 = this.balances_quadratic_cubic_projections(12)
      var bal_quot_proj_sd = (-this.balances_projection + (bal_quad_cub_12[0]+bal_quad_cub_12[1])/2) / this.bal_proj_standard_deviation;
      if (bal_quot_proj_sd <= 1.25) {
        return this.nivel_riesgo.factor_tendencia_negativa_0;
      } else if (bal_quot_proj_sd<=2) {
        return this.nivel_riesgo.factor_tendencia_negativa_1;
      } else if (bal_quot_proj_sd>2) {
        return this.nivel_riesgo.factor_tendencia_negativa_2;
      } else {
        return null;
      }
    },

    guarantee_factor: function () {
      if (!this.solicitud.garantia) {
        return 1;
      } else if (this.solicitud.garantia === "1" || this.solicitud.garantia === "2" || this.solicitud.garantia === "3") {
        return 1;
      } else if (this.solicitud.garantia === "4" || this.solicitud.garantia === "5") {
        return 1;
      }
    },

    INGRESO_MENSUAL: function () {        
      if (this.solicitud.tipo_comprobante === "account_statements" ) {
        if (this.deposits_movil_means.length === 0 || !this.deposits_tendency_factor || !this.solicitud.id_nivel_riesgo) return null;
        var comparatives = [this.deposits_movil_means, this.deposits_projection * this.deposits_tendency_factor];
        var id_nr = parseInt(this.solicitud.id_nivel_riesgo);
        if (id_nr < 4) {           
          return Math.max(comparatives[0], comparatives[1]) ; 
        } else if (id_nr < 6) {
          return (parseFloat(comparatives[0]) + parseFloat(comparatives[1])) / 2 ; 
        } else if (id_nr >= 6) {
          return Math.min(comparatives[0], comparatives[1]) ;   
        } else {
          return null;
        }     
      } else {
        if (!this.solicitud.ventas_anuales) return null;
        console.log('ingreso mensual estado financieros');
        return this.solicitud.ventas_anuales / 12;
      }        
    },

    INGRESO_ANUAL: function () {
      if (!this.INGRESO_MENSUAL) return null;
      return 12 * this.INGRESO_MENSUAL;
    },

    factor_uafir: function () {
      if (!this.solicitud.id_actividad) return null;
      var selected_activity = this.$refs.laboral.activities.find( act => act.id === this.solicitud.id_actividad);
      if (typeof selected_activity != "undefined"){
        return selected_activity.factor_uafir;
      }
      return null;
    },

    FLUJO_MENSUAL: function () {
      if (!this.solicitud.id_nivel_riesgo || !this.factor_uafir || !this.INGRESO_MENSUAL) return null;
      var id_nr = parseInt(this.solicitud.id_nivel_riesgo);
      var uafir_mensual = null;

      if (this.solicitud.tipo_comprobante === "account_statements" ) {
        if (this.balances_movil_means.length === 0 || !this.balances_tendency_factor) return null;
        var comparatives = [this.balances_movil_means, this.balances_projection * this.balances_tendency_factor];

        if (id_nr < 4) {           
          uafir_mensual = Math.max(comparatives[0], comparatives[1]) ; 
        } else if (id_nr < 6) {
          uafir_mensual = (parseFloat(comparatives[0]) + parseFloat(comparatives[1])) / 2 ; 
        } else {
          uafir_mensual = Math.min(comparatives[0], comparatives[1]) ;   
        }      
      } else {
        if (!this.solicitud.uafir) return null;
        uafir_mensual = this.solicitud.uafir/12;        
      }       
      
      if (id_nr < 5 ) {
        console.log('flujo mensual preaprobado');
        return Math.min(this.INGRESO_MENSUAL*this.factor_uafir*1.2, uafir_mensual);
      } else {
        console.log('flujo mensual estudio o denegado');
        return Math.min(this.INGRESO_MENSUAL*this.factor_uafir, uafir_mensual);
      }
    },

    FLUJO_ANUAL: function () {
      if (!this.FLUJO_MENSUAL) return null;
      return   12 * this.FLUJO_MENSUAL;
    },

    nivel_riesgo: function () {
      if (!this.solicitud.id_nivel_riesgo) return null;
      return this.niveles_riesgo.find( nivrie => nivrie.id === this.solicitud.id_nivel_riesgo);
    },

    factor_monto_maximo: function () {
      if (!this.solicitud.score || this.solicitud.score < 0) return null;

      if (this.solicitud.score <= 600) {
        return 0.5;
      } else if (this.solicitud.score <= 743) {
        return Math.min(0.034244095 * Math.exp( 0.004467184 * this.solicitud.score  ), 1.5);
      } else if (this.solicitud.score <= 835) {
        return Math.min(3.971645403 * Math.log( this.solicitud.score  ) - 25.22004859, 1.5);
      } else {
        return 1.5;
      }
    },

    monto_simple: function () {
      if (this.simple_credits.length === 0) return null;
      var ret = 0;
      for(var i=0; i<this.simple_credits.length; i++) {
        if (this.simple_credits[i].tipo_operacion === "3") {
          ret += parseFloat(this.simple_credits[i].monto);  
        }        
      }
      return ret;
    },

    plazo_simple: function () {
      if (!this.config) return null;
      if (this.simple_credits.length === 0) return parseFloat(this.config.plazo); // default 36 o null?
      var ret = 0;
      for(var i=0; i<this.simple_credits.length; i++) {
        if (this.simple_credits[i].tipo_operacion === "3") {
          ret += parseFloat(this.simple_credits[i].plazo) * parseFloat(this.simple_credits[i].monto);
        }
      }
      if (ret === 0) return this.config.plazo; // default 36 o null?
      return Math.ceil((ret / this.monto_simple) / 6) * 6;
    },

    monto_revolvente: function () {
      if (this.revolving_credits.length === 0) return null;
      var ret = 0;
      for(var i=0; i<this.revolving_credits.length; i++) {
        if (this.revolving_credits[i].tipo_operacion === "2" || this.revolving_credits[i].tipo_operacion === "3") {
          ret += parseFloat(this.revolving_credits[i].monto);
        }
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

    monto_simple_buro: function () {

      if (!this.solicitud.sal_orig_cred_act_simp || !this.solicitud.num_cred_act_simp || this.solicitud.num_cred_act_simp == 0) return 0;
      var ret = parseFloat(this.solicitud.sal_orig_cred_act_simp) /  parseFloat(this.solicitud.num_cred_act_simp) ;
      // console.log('in monto simple buro');
      // console.log(ret);
      return ret;
    },

    monto_arrendamiento_buro: function () {

      if (!this.solicitud.sal_orig_cred_act_arren || !this.solicitud.num_cred_act_arren || this.solicitud.num_cred_act_arren == 0) return 0;
      var ret = parseFloat(this.solicitud.sal_orig_cred_act_arren)  / parseFloat(this.solicitud.num_cred_act_arren) ;
      // console.log('in monto simple buro');
      // console.log(ret);
      return ret;
    },

    monto_revolvente_buro: function () {
      if (!this.solicitud.sal_orig_cred_act_revol || !this.solicitud.num_cred_act_revol || this.solicitud.num_cred_act_revol == 0 ) return 0;
      var ret = parseFloat(this.solicitud.sal_orig_cred_act_revol) / parseFloat(this.solicitud.num_cred_act_revol);
      // console.log('in monto revolvente buro');
      // console.log(ret);
      return ret;
    },

    monto_factoraje_buro: function () {
      if (!this.solicitud.sal_orig_cred_act_fact || !this.solicitud.num_cred_act_fact || this.solicitud.num_cred_act_fact == 0 ) return 0;
      var ret = parseFloat(this.solicitud.sal_orig_cred_act_fact)  /  parseFloat(this.solicitud.num_cred_act_fact) ;
      // console.log('in monto revolvente buro');
      // console.log(ret);
      return ret;
    },

    //  restricciones  //
    monto_maximo_smp: function () {
      if (!this.monto_simple_buro  || !this.factor_monto_maximo) return null;
      return this.monto_simple_buro * this.factor_monto_maximo;
    },

    monto_maximo_rev: function () {
      if (!this.linea_mas_alta || !this.factor_monto_maximo) return 0;
      return this.linea_mas_alta * this.factor_monto_maximo;
    },

    monto_total_rev: function () {
      return !this.solicitud.sal_orig_cred_act_fact? 0:this.solicitud.sal_orig_cred_act_fact  + !this.solicitud.sal_orig_cred_act_revol? 0:this.solicitud.sal_orig_cred_act_revol;
    },

    //  restricciones  //
    monto_maximo: function () {
       if (!this.solicitud.linea_mas_alta || !this.factor_monto_maximo) return 0;
      //if (this.monto_simple_buro === null  || this.monto_revolvente_buro === null || this.monto_factoraje_buro === null || this.monto_arrendamiento_buro === null || this.solicitud.BK12_MAX_CREDIT_AMT === null || this.factor_monto_maximo === null) return null;
      //var ret = Math.max(this.solicitud.BK12_MAX_CREDIT_AMT, this.monto_simple_buro, this.monto_revolvente_buro, this.monto_factoraje_buro, this.monto_arrendamiento_buro) * this.factor_monto_maximo;
      var ret = parseFloat(this.solicitud.linea_mas_alta) * this.factor_monto_maximo;
      return ret;
    },

    VENTAS: function () {
      if (!this.nivel_riesgo || !this.INGRESO_MENSUAL) return null;
      return this.nivel_riesgo.factor_veces_ventas * this.INGRESO_MENSUAL;
    },

    dif_deuda_ingreso_rev: function () {
      if (!this.nivel_riesgo || !this.INGRESO_ANUAL || !this.solicitud.deuda_total) return null;
      return this.nivel_riesgo.rev_factor * this.INGRESO_ANUAL - this.solicitud.deuda_total;
    },

    dif_deuda_ingreso_smp: function () {
      if (!this.nivel_riesgo || !this.INGRESO_ANUAL || !this.solicitud.deuda_total) return null;
      return this.nivel_riesgo.smp_factor * this.INGRESO_ANUAL - this.solicitud.deuda_total;
    },

    dif_deuda_ingreso: function () {
      if (!this.nivel_riesgo || !this.INGRESO_ANUAL || !this.solicitud.deuda_total) return null;
      return this.nivel_riesgo.smp_factor * this.INGRESO_ANUAL - this.solicitud.deuda_total;
    },

    razon_FDA_FRC_smp: function () {  // razon entre el flujo anual disponible y el factor de recuperacion de capital
      if (!this.FLUJO_ANUAL || !this.factor_recuperacion_capital) return null;
      return this.FLUJO_ANUAL / (12 * this.factor_recuperacion_capital);
    },

    razon_FDA_tasa_rev: function () {
      if (!this.FLUJO_ANUAL || !this.nivel_riesgo) return null;
      console.log('in razon_FDA_tasa_rev');
      return this.FLUJO_ANUAL / ( 0.2 + parseFloat(this.nivel_riesgo.tasa));
    },

    tope_capital_contable_smp_rev: function () {
      if (!this.solicitud.capital_contable || this.solicitud.tipo_comprobante === "account_statements") return null;
      return this.solicitud.capital_contable / 4;
    },

    // capacidad de pago
    capacidad_pago_rev: function () {
      if (!this.nivel_riesgo || !this.INGRESO_MENSUAL) return null;
      return this.INGRESO_MENSUAL * this.nivel_riesgo.n_veces_riesgo;
    },
    valor_actual: function () {
      if (!this.FLUJO_MENSUAL || !this.nivel_riesgo || !this.config || !this.solicitud.deuda_cortoplazo) return null;
      var deuda_cp_mensual = null
      if (this.solicitud.tipo_comprobante === "account_statements"){
        deuda_cp_mensual = this.solicitud.deuda_cortoplazo;
      } else {
        if (!this.solicitud.pasivo_financiero_corto ) return null;
        deuda_cp_mensual = Math.max( this.solicitud.pasivo_financiero_corto, this.solicitud.deuda_cortoplazo);  
      }

      return (this.FLUJO_MENSUAL - deuda_cp_mensual / 12) * this.config.factor2 * (1 - Math.pow(1 + this.tasa_mensual_iva, -this.plazo_simple)) / this.tasa_mensual_iva;       
    },

    capacidad_pago_smp: function () {
      if (!this.valor_actual) return null;
      return this.valor_actual;       
    },

    // lineas de credito
    linea_simple_prev: function () {
      if (this.solicitud.tipo_comprobante === "account_statements"){
        if (!this.capacidad_pago_smp || !this.dif_deuda_ingreso_smp || !this.razon_FDA_FRC_smp  ) return 0;
        return Math.max(0, Math.min(this.monto_simple, this.capacidad_pago_smp, this.razon_FDA_FRC_smp));
      } else {
        if (!this.capacidad_pago_smp || !this.dif_deuda_ingreso_smp || !this.razon_FDA_FRC_smp || this.solicitud.capital_contable === null ) return 0;
        return Math.max(0, Math.min(this.monto_simple, this.capacidad_pago_smp, this.razon_FDA_FRC_smp, 0.25*parseFloat(this.solicitud.capital_contable)));
      }        
    },

    linea_revolvente_prev: function () {
      if (this.solicitud.tipo_comprobante === "account_statements"){
        if (!this.monto_revolvente || !this.capacidad_pago_rev || !this.razon_FDA_tasa_rev || !this.VENTAS || this.monto_maximo === null) return 0;
        return Math.max(0, Math.min(this.monto_revolvente, this.capacidad_pago_rev, this.razon_FDA_tasa_rev, Math.max(this.VENTAS, this.monto_maximo)));
      } else {
        if (!this.capacidad_pago_rev || !this.dif_deuda_ingreso_rev || !this.razon_FDA_tasa_rev  || !this.VENTAS || this.monto_maximo === null || this.solicitud.capital_contable === null) return 0;
        return Math.max(0, Math.min(this.monto_revolvente, this.capacidad_pago_rev, this.razon_FDA_tasa_rev, 0.25*parseFloat(this.solicitud.capital_contable), Math.max(this.VENTAS, this.monto_maximo)));
      }
    },


    linea_revolvente_prev_sin_ventas: function () {
      if (this.solicitud.tipo_comprobante === "account_statements"){
        if (!this.monto_revolvente || !this.capacidad_pago_rev || !this.razon_FDA_tasa_rev || !this.monto_maximo) return 0;
        return Math.min(this.monto_revolvente, this.capacidad_pago_rev, this.razon_FDA_tasa_rev, this.monto_maximo);
      } else {
        if (!this.capacidad_pago_rev || !this.dif_deuda_ingreso_rev || !this.razon_FDA_tasa_rev || !this.monto_maximo || this.solicitud.capital_contable === null) return 0;
        return Math.min(this.monto_revolvente, this.capacidad_pago_rev, this.razon_FDA_tasa_rev, this.monto_maximo, 0.25*parseFloat(this.solicitud.capital_contable));
      }
    },

    // TODO: Ajustar lógica para multiples créditos
    linea_simple: function () {
      if (!this.linea_simple_prev || (!this.monto_simple && !this.monto_revolvente)) return 0;
      //if (!this.linea_revolvente_prev) return Math.max(0, Math.ceil(this.linea_simple_prev / 10) * 10);
      var offset = parseFloat(this.linea_simple_prev) + parseFloat(this.linea_revolvente_prev) - parseFloat(this.dif_deuda_ingreso);
      if (offset > 0) {
        // return  Math.max(0, Math.ceil((this.linea_simple_prev - offset * (this.monto_simple / (this.monto_simple + this.monto_revolvente))) / 10 ) * 10);
        return  Math.max(0, Math.ceil((parseFloat(this.dif_deuda_ingreso) * (this.linea_simple_prev / (this.linea_simple_prev + this.linea_revolvente_prev))) / 10 ) * 10);
      } else {
        return Math.max(0, Math.ceil(this.linea_simple_prev / 10) * 10);
      }
    },

    linea_revolvente: function () {
      if (!this.linea_revolvente_prev || (!this.monto_simple && !this.monto_revolvente)) return 0;
      //if (!this.linea_simple_prev) return Math.max(0,  Math.ceil(this.linea_revolvente_prev / 10) * 10);
      var offset = parseFloat(this.linea_simple_prev) + parseFloat(this.linea_revolvente_prev) - parseFloat(this.dif_deuda_ingreso);
      if (offset > 0) {
        // return  Math.max(0, Math.ceil((this.linea_revolvente_prev - offset * (this.monto_revolvente / (this.monto_simple + this.monto_revolvente))) / 10) * 10);
        return  Math.max(0, Math.ceil((parseFloat(this.dif_deuda_ingreso) * (this.linea_revolvente_prev / (this.linea_simple_prev + this.linea_revolvente_prev))) / 10) * 10);
      } else {
        return Math.max(0, Math.ceil(this.linea_revolvente_prev / 10) * 10);
      }
    },

    linea_revolvente_sin_ventas: function () {
      if (!this.linea_revolvente_prev_sin_ventas || (!this.monto_simple && !this.monto_revolvente)) return 0;
      //if (!this.linea_simple_prev) return Math.max(0, Math.ceil(this.linea_revolvente_prev_sin_ventas / 10) * 10);
      var offset = parseFloat(this.linea_simple_prev) + parseFloat(this.linea_revolvente_prev_sin_ventas) - parseFloat(this.dif_deuda_ingreso);
      if (offset > 0) {
        // return  Math.max(0, Math.ceil((this.linea_revolvente_prev_sin_ventas - offset * (this.monto_revolvente / (this.monto_simple + this.monto_revolvente))) / 10) * 10);
        return  Math.max(0, Math.ceil((parseFloat(this.dif_deuda_ingreso) * (this.linea_revolvente_prev_sin_ventas / (this.linea_simple_prev + this.linea_revolvente_prev_sin_ventas))) / 10) * 10);
      } else {
        return Math.max(0, Math.ceil(this.linea_revolvente_prev_sin_ventas / 10) * 10);
      }
    },

    cambia_decreto: function () {
      if (!this.linea_revolvente_sin_ventas && !!this.monto_revolvente ) return true;

      if (!!this.plazo_simple && parseInt(this.plazo_simple) >= 48 && !this.solicitud.exp_creditos_largos) return true;
      
      
      var a = this.linea_revolvente / this.linea_revolvente_sin_ventas;      
      if (a > 2.5) return true;
      
      if (!this.linea_revolvente || !this.solicitud.sal_orig_cred_act_revol || !this.solicitud.sal_orig_cred_act_fact || !this.nivel_riesgo || !this.INGRESO_MENSUAL ) return false;
      var b = this.linea_revolvente + parseFloat(this.solicitud.sal_orig_cred_act_revol) + parseFloat(this.solicitud.sal_orig_cred_act_fact)
      if (b / this.INGRESO_MENSUAL > this.nivel_riesgo.factor_veces_linea_revolvente) return true;
      return false;
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
      this.$refs.credito.saveCredits();
      this.saveSolicitude();
      this.$emit('move-to-success-route');
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

    balances_quadratic_cubic_projections: function (value) {
      if(this.balances_polynomial_tendency === null) return [0,0];
      var quadratic_equation = this.balances_polynomial_tendency[0].equation;
      var cubic_equation = this.balances_polynomial_tendency[1].equation;
      var quadratic_value = quadratic_equation[0] + quadratic_equation[1]*value + quadratic_equation[2]*value*value;
      var cubic_value = cubic_equation[0] + cubic_equation[1]*value + cubic_equation[2]*value*value + cubic_equation[3]*value*value*value;
      return [quadratic_value, cubic_value]
    },

    deposits_quadratic_cubic_projections: function (value) {
      if(this.deposits_polynomial_tendency === null) return [0,0];
      var quadratic_equation = this.deposits_polynomial_tendency[0].equation;
      var cubic_equation = this.deposits_polynomial_tendency[1].equation;
      var quadratic_value = quadratic_equation[0] + quadratic_equation[1]*value + quadratic_equation[2]*value*value;
      var cubic_value = cubic_equation[0] + cubic_equation[1]*value + cubic_equation[2]*value*value + cubic_equation[3]*value*value*value;
      return [quadratic_value, cubic_value]
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

    readSolicitud: function () {
      var self = this;
      google.script.run
      .withSuccessHandler(function(response){
        console.log('Reading solicitud');
        console.log(response);
        self.setSolicitud(response);  // solicitud.numero_solicitud = response.numero_solicitud;
      })
      .withFailureHandler(function(err){
        console.log('An error ocurred while reading solicitud');
        console.log(err);
      })
      .readId('solicitud', this.id_solicitud)
    },

    setSolicitud: function (response) {
      this.$refs.solicitud.numero_solicitud = response.numero_solicitud;
      this.$refs.solicitud.fecha_solicitud = response.fecha_solicitud;
      this.$refs.solicitud.cedente_prosp = response.cedente_prosp;
      this.$refs.solicitud.promotor = response.promotor;
      this.$refs.solicitud.subdirector = response.subdirector;
      this.$refs.solicitud.analista = response.analista;
      this.$refs.solicitud.accionistas = response.accionistas;
      this.$refs.solicitud.cheques_fecha = response.cheques_fecha;
      this.$refs.solicitud.credito_fecha = response.credito_fecha;
      this.$refs.credito.destino_credito = response.destino_credito;
      this.$refs.credito.garantia = response.garantia;
      this.$refs.laboral.id_actividad = response.id_actividad;
      this.$refs.laboral.tipo_comprobante = response.tipo_comprobante;
      this.$refs.laboral.antiguedad_actividad = response.antiguedad_actividad;
      this.$refs.laboral.antiguedad_operacion = response.antiguedad_operacion;
      this.$refs.laboral.actividad_especifica = response.actividad_especifica;
      this.$refs.laboral.numero_empleados = response.numero_empleados;
      this.$refs.laboral.promedio_venta_anual = response.promedio_venta_anual;
      this.$refs.buro_credito.deuda_total = response.deuda_total;
      this.$refs.buro_credito.MONTHS_ON_FILE_BANKING = response.MONTHS_ON_FILE_BANKING;
      this.$refs.buro_credito.BK12_CLEAN = response.BK12_CLEAN;
      this.$refs.buro_credito.BK12_MAX_CREDIT_AMT = response.BK12_MAX_CREDIT_AMT;
      this.$refs.buro_credito.deuda_cortoplazo = response.deuda_cortoplazo;
      this.$refs.buro_credito.fecha_consulta = response.fecha_consulta;
      this.$refs.buro_credito.calif_buro = response.calif_buro; 
      this.$refs.buro_credito.linea_mas_alta = response.linea_mas_alta;   
      this.$refs.buro_credito.num_cred_act_arren = response.num_cred_act_arren;
      this.$refs.buro_credito.num_cred_act_fact = response.num_cred_act_fact;
      this.$refs.buro_credito.num_cred_act_revol = response.num_cred_act_revol;
      this.$refs.buro_credito.num_cred_act_simp = response.num_cred_act_simp;
      this.$refs.buro_credito.sal_vig_cred_act_arren = response.sal_vig_cred_act_arren;
      this.$refs.buro_credito.sal_vig_cred_act_fact = response.sal_vig_cred_act_fact;
      this.$refs.buro_credito.sal_vig_cred_act_revol = response.sal_vig_cred_act_revol;
      this.$refs.buro_credito.sal_vig_cred_act_simp = response.sal_vig_cred_act_simp;
      this.$refs.buro_credito.sal_orig_cred_act_arren = response.sal_orig_cred_act_arren;
      this.$refs.buro_credito.sal_orig_cred_act_fact = response.sal_orig_cred_act_fact;
      this.$refs.buro_credito.sal_orig_cred_act_revol = response.sal_orig_cred_act_revol;
      this.$refs.buro_credito.sal_orig_cred_act_simp = response.sal_orig_cred_act_simp;
      this.$refs.buro_credito.exp_creditos_largos = (response.exp_creditos_largos === "true"); 
      this.$refs.estado_financiero.uafir = response.uafir;
      this.$refs.estado_financiero.capital_contable = response.capital_contable;
      this.$refs.estado_financiero.ventas_anuales = response.ventas_anuales;      
      this.$refs.estado_financiero.pasivo_financiero_corto = response.pasivo_financiero_corto;
      this.$refs.resultado_perfilador.calificacion_deudor = response.calificacion_deudor;
      this.$refs.resultado_perfilador.tipo_evaluacion_perfilador = response.tipo_evaluacion_perfilador;
      this.$refs.resultado_perfilador.decreto = response.decreto;
      this.$refs.resultado_perfilador.score = response.score;
      this.$refs.resultado_perfilador.id_nivel_riesgo = response.id_nivel_riesgo;      
      this.$refs.resultado_perfilador.calificacion_interna = response.calificacion_interna; 
      this.$refs.resultado_perfilador.pre_calif = response.pre_calif;
      this.$refs.asignacion.riesgo_potencial = response.riesgo_potencial;
    },

    saveSolicitudeCredit: function () {
      this.saveSolicitude();
      this.$refs.credito.saveCredits();
      return true;
    },

    saveSolicitudeBalDep: function () {
      this.saveSolicitude(); 
      if(typeof this.$refs.saldo_deposito != 'undefined') {
        this.$refs.saldo_deposito.save();
      } 
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

      return [m, b]
    },

    a: function (a, b) {
        var c = a.reduce(function(a, b) {
                return a + b[1]
            }, 0),
            d = c / a.length,
            e = a.reduce(function(a, b) {
                var c = b[1] - d;
                return a + c * c
            }, 0),
            f = a.reduce(function(a, c, d) {
                var e = b[d],
                    f = c[1] - e[1];
                return a + f * f
            }, 0);
        return 1 - f / e
    },

    b: function (a, b) {
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = a.length - 1,
          i = new Array(b);
      for (c = 0; h > c; c++) {
          for (f = c, d = c + 1; h > d; d++) Math.abs(a[c][d]) > Math.abs(a[c][f]) && (f = d);
          for (e = c; h + 1 > e; e++) g = a[e][c], a[e][c] = a[e][f], a[e][f] = g;
          for (d = c + 1; h > d; d++)
              for (e = h; e >= c; e--) a[e][d] -= a[e][c] * a[c][d] / a[c][c]
      }
      for (d = h - 1; d >= 0; d--) {
          for (g = 0, e = d + 1; h > e; e++) g += a[e][d] * i[e];
          i[d] = (a[h][d] - g) / a[d][d]
      }
      return i
    },

    c: function (a, b) {
      var c = Math.pow(10, b);
      return Math.round(a * c) / c
    },

    polynomial: function(d, e, f) { // data, grade, conf.precision
      var g, h, i, j, k, l, m, n, o = [],
          p = [],
          q = 0,
          r = 0,
          s = d.length;
      for (h = "undefined" == typeof e ? 3 : e + 1, i = 0; h > i; i++) {
          for (k = 0; s > k; k++) null !== d[k][1] && (q += Math.pow(d[k][0], i) * d[k][1]);
          for (o.push(q), q = 0, g = [], j = 0; h > j; j++) {
              for (k = 0; s > k; k++) null !== d[k][1] && (r += Math.pow(d[k][0], i + j));
              g.push(r), r = 0
          }
          p.push(g)
      }
      for (p.push(o), m = this.b(p, h), l = d.map(function(a) {
              var b = a[0],
                  c = m.reduce(function(a, c, d) {
                      return a + c * Math.pow(b, d)
                  }, 0);
              return [b, c]
          }), n = "y = ", i = m.length - 1; i >= 0; i--) n += i > 1 ? this.c(m[i], f.precision) + "x^" + i + " + " : 1 === i ? this.c(m[i], f.precision) + "x + " : this.c(m[i], f.precision);
      return {
          r2: this.a(d, l),
          equation: m,
          points: l,
          string: n
      }
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
    setSolDate: function(val) {
      this.solicitud.fecha_solicitud = val;
    },
    setCedProspect: function(val) {
      this.solicitud.cedente_prosp = val;
    },
    setPromoter: function(val) {
      this.solicitud.promotor = val;
    },
    setSubdirector: function(val) {
      this.solicitud.subdirector = val;
    },
    setAnalyst: function(val) {
      this.solicitud.analista = val;
    },
    setShareholder: function(val) {
      this.solicitud.accionistas = val;
    },
    setChecksdate: function(val) {
      this.solicitud.cheques_fecha = val;
    },
    setCreditDate: function(val) {
      this.solicitud.credito_fecha = val;
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
    setSpecActivity: function(val) {
      this.solicitud.actividad_especifica = val;
    },
    setNumEmployees: function(val) {
      this.solicitud.numero_empleados = val;
    },
    setAvgAnnualSales: function(val) {
      this.solicitud.promedio_venta_anual = val;
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
    setLargeExpCredit: function(val) {
      this.solicitud.exp_creditos_largos = val;
    },  
    setBuroCalif: function(val) {
      this.solicitud.calif_buro = val;
    },  
    setDeudaDate: function(val) {
      this.solicitud.fecha_consulta = val;
    },
    setInternalCalif: function(val) {
      this.solicitud.calificacion_interna = val;
    },
    setPotentialRisk: function(val) {
      this.solicitud.riesgo_potencial = val;
    },
    setCalifPre: function(val) {
      this.solicitud.pre_calif = val;
    },
    setAccountStatements: function(val) {
      console.log("updating");
      console.log(val);
    	this.account_statements = val;
    },
    setSimpleCredits: function(val) {
      this.$refs.asignacion.simple_credits = val;
      // this.$refs.credito.setSimpleLine("");
    	this.simple_credits = val;
    },
    setRevolvingCredits: function(val) {
      console.log('setting revo creds after change emit');
      this.$refs.asignacion.revolving_credits = val;
      // this.$refs.credito.setRevolvingLine("");
    	this.revolving_credits = val;
    },
    setShortTermDebt: function(val) {
      this.solicitud.deuda_cortoplazo = val;      
    },
    setFinantialPassive: function(val) {
      this.solicitud.pasivo_financiero_corto = val;      
    },
    setHigherLine: function(val) {
      this.solicitud.linea_mas_alta = val;      
    },
  },

  watch: {
    tipo_comprobante: function (val) {
      if(val === "account_statements") {
        this.tab_titles.estado_general = "Perfilador"
      } else if (val === "financial_statements") {
        this.tab_titles.estado_general = "Perfilador/Estados Financieros"
      }
    },

    monto_simple: function (val) {
      this.$refs.credito.setSimpleLine("");
    },

    monto_revolvente: function (val) {
      this.$refs.credito.setRevolvingLine("");       
    },

    linea_simple: function(val) {
      if (val === null) {
        this.$refs.credito.setSimpleLine("");
        this.solicitud.linea_simple_sugerida = "";
      } else {
        this.$refs.credito.setSimpleLine(val);
        this.solicitud.linea_simple_sugerida = val;  
      }
      
    },

    linea_revolvente: function(val) {
      if (val === null) {
        this.$refs.credito.setRevolvingLine("");
        this.solicitud.linea_revolvente_sugerida = "";
      } else {
        this.$refs.credito.setRevolvingLine(val);
        this.solicitud.linea_revolvente_sugerida = val;  
      }

    },

    plazo_simple: function(val) {
      if (val === null) {
        this.solicitud.plazo_simple = "";
      } else {
        this.solicitud.plazo_simple = val;  
      }
    }
  }
});

// title="Evaluacion" subtitle="subtitulo" nextButtonText="Siguiente" backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" 