Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);

const FirstFormStep = Vue.component('first-form-step', {
	template: `
				<section>
					<div class="columns">
						<div class="column is-3">
							<label class="label">Numero solicitud: </label>
							<input type="text" name="numero_solicitud" class="input" id="numero_solicitud"/>
						</div>
						<div class="column is-5">
							<label class="label">Tipo de comprobantes de ingresos: </label>
								<b-radio v-model="evaluation_type" size="is-normal" 
						        native-value="account_statements"> 
						        Estados de Cuenta 
					    		</b-radio>
							<b-radio v-model="evaluation_type" size="is-normal" class="form-color" 
					        native-value="financial_statements"> 
					        Estados Financieros  
					    	</b-radio>
						</div>
						<div class="column">
							<label class="label">Garantia hipotecaria: </label>
							<input type="text" name="garantia_hipotecaria" id="garantia_hipotecaria"  class="input"/>
						</div>
					</div>
					<div class="columns">
						<div class="column is-3">
							<label class="label">Tipo evaluacion: </label>
							<input type="text" name="tipo_evaluacion" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Decreto: </label>
							<input type="text" name="decreto" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Score: </label>
							<input type="text" name="score" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Ventas anuales: </label>
							<input type="text" name="ventas_anuales" class="input" />
						</div>

					</div>

					<div class="columns">
						<div class="column is-3">
							<label class="label">Flujo disponible mensual: </label>
							<input type="text" name="flujo_mesual" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Uafir: </label>
							<input type="text" name="uafir" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Capital contable: </label>
							<input type="text" name="capital_contable" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Destino credito: </label>
							<input type="text" name="destino_credito" class="input" />
						</div>
					</div>
					<div class="columns">
						<div class="column is-3">
							<label class="label">Antiguedad actividad: </label>
							<input type="text" name="antiguedad_actividad" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Antiguedad operacion: </label>
							<input type="text" name="antiguedad_operacion" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Calificacion deudor: </label>
							<input type="text" name="calificacion_deudor" class="input" />
						</div>
						<div class="column is-3">
							<label class="label">Deuda total: </label>
							<input type="text" name="deuda_total" class="input" />
						</div>
					</div>

					<div class="columns">
						<div class="column is-4">
							<label class="label">MONTHS_ON_FILE_CREDIT_AMT: </label>
							<input type="text" name="month_onfile" class="input" />
						</div>
						<div class="column is-4">
							<label class="label">BK12_CLEAN: </label>
							<input type="text" name="bk12_clean" class="input" />
						</div>
						<div class="column is-4">
							<label class="label">BK12_MAX_CREDIT_AMT: </label>
							<input type="text" name="bl12_max" class="input" />
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<label class="label">Actividad: </label>
							<b-select placeholder="Select a name" v-model="activity" expanded>
                                <option v-for="activity in activities" :value="sucursal.id_oficina_full">{{ activity }} </option>
	            			</b-select>
						</div>
						<div class="column">
							<label class="label">Nivel de Riesgo: </label>
							<b-select placeholder="Select a name" v-model="risk_level" expanded>	                			
                                <option v-for="risk_level in risk_levels" :value="risk_level.id">{{ risk_level.nombre }} </option>
	            			</b-select>
						</div>
					</div>
				</section> `,
	data () {
		return {		
			activity: null,
			risk_level: null,
			solicitude_number: null,
			evaluation_type: "account_statements",
			guarantee: null,
			evaluation_type_profiler: null,
			decree: null,
			score: null,
			annual_sales: null,
			// flujo_disponible_mensual : null,  
			uafir: null,
			accounting_capital: null,
			credit_destination: null,
			activity_seniority: null,
			operation_seniority: null,
			debtor_qualification: null,
			total_debt: null,
			months_on_file_banking: null,
			bk12_clean: null,
			bk12_max_credit_amt: null, 
			activities: [],
			risk_levels: []
		}
	},

	watch: {
		evaluation_type: function (val) {
			this.$emit('eval-type-change', val);
		}
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
            .read('actividad')
        },

        readRiskLevels: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
              console.log(response);
              self.risk_lavels = response.records;
            })
            .withFailureHandler(function(err){
              console.log(err);
            })
            .read('nivel_riesgo')
        },
	}
});
