Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);

const FirstFormStep = Vue.component('first-form-step', {
	template: `
				<section>
					<div class="columns">
						<div class="column is-3">
							<label class="label">Numero solicitud: </label>
							<input type="text" v-model="numero_solicitud" class="input" id="numero_solicitud"/>
						</div>
						<div class="column is-5">
							<label class="label">Tipo de comprobantes de ingresos: </label>
								<b-radio v-model="tipo_comprobante" size="is-normal" 
						        native-value="account_statements"> 
						        Estados de Cuenta 
					    		</b-radio>
							<b-radio v-model="tipo_comprobante" size="is-normal" class="form-color" 
					        native-value="financial_statements"> 
					        Estados Financieros  
					    	</b-radio>
						</div>
						<div class="column">
							<label class="label">Garantia hipotecaria: </label>
							<input type="text" v-model="garantia_hipotecaria" id="garantia_hipotecaria"  class="input"/>
						</div>
					</div>
					<div class="columns">
						<div class="column is-3">
							<label class="label">Tipo evaluacion del perfilador: </label>
							<input type="text" v-model="tipo_evaluacion_perfilador" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Decreto: </label>
							<input type="text" v-model="decreto" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Score: </label>
							<input type="text" v-model="score" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Ventas anuales: </label>
							<input type="text" v-model="ventas_anuales" class="input" />
						</div>

					</div>

					<div class="columns">
						<div class="column is-3">
							<label class="label">Flujo disponible mensual: </label>
							<input type="text" name="flujo_mesual" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Uafir: </label>
							<input type="text" v-model="uafir" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Capital contable: </label>
							<input type="text" v-model="capital_contable" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Destino credito: </label>
							<input type="text" v-model="destino_credito" class="input" />
						</div>
					</div>
					<div class="columns">
						<div class="column is-3">
							<label class="label">Antiguedad actividad: </label>
							<input type="text" v-model="antiguedad_actividad" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Antiguedad operacion: </label>
							<input type="text" v-model="aniguedad_operacion" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Calificacion deudor: </label>
							<input type="text" v-model="calificacion_deudor" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Deuda total: </label>
							<input type="text" v-model="deuda_total" class="input" />
						</div>
					</div>

					<div class="columns">
						<div class="column is-4">
							<label class="label">MONTHS_ON_FILE_CREDIT_AMT: </label>
							<input type="text" v-model="MONTHS_ON_FILE_BANKING" class="input" />
						</div>
						<div class="column is-4">
							<label class="label">BK12_CLEAN: </label>
							<input type="text" v-model="BK12_CLEAN" class="input" />
						</div>
						<div class="column is-4">
							<label class="label">BK12_MAX_CREDIT_AMT: </label>
							<input type="text" v-model="BK12_MAX_CREDIT_AMT" class="input" />
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<label class="label">Actividad: </label>
							<b-select placeholder="Select a name" v-model="id_actividad" expanded>
                                <option v-for="activity in activities" :value="activity.id">{{ activity.nombre }} </option>
	            			</b-select>
						</div>
						<div class="column">
							<label class="label">Nivel de Riesgo: </label>
							<b-select placeholder="Select a name" v-model="id_nivel_riesgo" expanded>	                			
                                <option v-for="risk_level in risk_levels" :value="risk_level.id">{{ risk_level.nombre }} </option>
	            			</b-select>
						</div>
					</div>
				</section> `,
	data () {
		return {		
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
			aniguedad_operacion: null,
			calificacion_deudor: null,
			deuda_total: null,
			MONTHS_ON_FILE_BANKING: null,
			BK12_CLEAN: null,
			BK12_MAX_CREDIT_AMT: null,
			activities: [],
			risk_levels: []
		}
	},

	watch: {
		id_actividad: function (val) {
			this.$emit('activity-change', val);
		},
		id_nivel_riesgo: function (val) {
			this.$emit('risk-level-change', val);
		},
		numero_solicitud: function (val) {
			this.$emit('sol-number-change', val);
		},
		tipo_comprobante: function (val) {
			this.$emit('eval-type-change', val);
		},
		garantia_hipotecaria: function (val) {
			this.$emit('guarantee-change', val);
		},
		tipo_evaluacion_perfilador: function (val) {
			this.$emit('eval-type-prfl-change', val);
		},
		decreto: function (val) {
			this.$emit('decree-change', val);
		},
		score: function (val) {
			this.$emit('score-change', val);
		},
		ventas_anuales: function (val) {
			this.$emit('annual-sales-change', val);
		},
		uafir: function (val) {
			this.$emit('uafir-change', val);
		},
		capital_contable: function (val) {
			this.$emit('acc-capital-change', val);
		},
		destino_credito: function (val) {
			this.$emit('credit-dest-change', val);
		},
		antiguedad_actividad: function (val) {
			this.$emit('act-seniority-change', val);
		},
		aniguedad_operacion: function (val) {
			this.$emit('oper-seniority-change', val);
		},
		calificacion_deudor: function (val) {
			this.$emit('debtor-qual-change', val);
		},
		deuda_total: function (val) {
			this.$emit('total-debt-change', val);
		},
		MONTHS_ON_FILE_BANKING: function (val) {
			this.$emit('monfile-banking-change', val);
		},
		BK12_CLEAN: function (val) {
			this.$emit('bk12-clean-change', val);
		},
		BK12_MAX_CREDIT_AMT: function (val) {
			this.$emit('bk12maxcred-amt-change', val);
		},
	},

	created: function() {
		this.readActivities();
		this.readRiskLevels();
	},

	methods: {
		readActivities: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
              console.log(response);
              self.activities = response.records;
            })
            .withFailureHandler(function(err){
              console.log(err);
            })
            .readCatalog('actividad')
        },

        readRiskLevels: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
              console.log(response);
              self.risk_levels = response.records;
            })
            .withFailureHandler(function(err){
              console.log(err);
            })
            .readCatalog('nivel_riesgo')
        },
	}
});
