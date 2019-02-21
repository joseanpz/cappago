var LaboralStep = Vue.component('laboral-step',{
	props: ['id_solicitud', 'linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<section class="container">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">Características PyME</p>
				</header>
				<div class="card-content">		
					<div class="content">				
						<div class="columns">
							<div class="column is-2">
								<label class="label titulos">Antigüedad operación: </label>
							</div>
							<div class="column is-4">
								<input type="date" v-model="antiguedad_operacion" class="input" />
							</div>
							<div class="column is-2">
								<label class="label titulos">Antigüedad actividad: </label>
							</div>
							<div class="column is-4">							
								<div class="select is-fullwidth">
									<select v-model="antiguedad_actividad" class="select">
							            <option value="0">Menor 1 año</option>
							            <option value="1">1</option>
							            <option value="2">2</option>
							            <option value="3">3</option>
							            <option value="4">4</option>
							            <option value="5">5</option>
							            <option value="6">6</option>
							            <option value="7">7</option>
							            <option value="8">8</option>
							            <option value="9">9</option>
							            <option value="10">10</option>
							            <option value="11">Más de 10 años</option>
							         </select>
						        </div>
							</div>
						</div>

						<div class="columns">	
							<div class="column is-6">	
								<div class="columns">
								<div class="column"><label class="label">Tipo de comprobantes de ingresos: </label></div>
								</div>
								<div class="columns">
									<div class="column">
										<b-radio class="label titulos" v-model="tipo_comprobante" size="is-normal"  native-value="account_statements"> 
								        	Estados de Cuenta 
							    		</b-radio>
									</div>
									<div class="column">
										<b-radio class="label titulos" v-model="tipo_comprobante" size="is-normal"  native-value="financial_statements"> 
								        	Estados Financieros  
								    	</b-radio>
									</div>
								</div>																										
							</div>
							<div class="column is-2">
								<label class="label titulos">Sector: </label>
							</div>
							<div class="column">
								<b-select placeholder="Select a name" v-model="id_actividad" expanded>
			                        <option v-for="activity in activities" :value="activity.id">{{ activity.nombre }} </option>
			        			</b-select>
							</div>														
						</div>			
					</div>
				</div>
			</div>
			<div class="card" v-if="tipo_comprobante=='account_statements'">	
				<header class="card-header">
					<p class="card-header-title">Saldos y depositos</p>
				</header>
				<div class="card-content">		
					<div class="content">
						<saldos-depositos-step
						:id_solicitud="id_solicitud"
						@acc-statements-change="emmitAccountStatements"
						ref="saldo_deposito"> 
						</saldos-depositos-step>
					</div>
				</div>
			</div>
			<results v-bind="$props"></results>
		</section>
	`,

	components: {
		SaldosDepositosStep,
		Results, 
	},

	data () {
		return {
			id_actividad: null,
			tipo_comprobante: "account_statements",
			antiguedad_actividad: null,
			antiguedad_operacion: null,
			activities: [],
		}
	},

	created: function () {
		this.readActivities();
	},

	methods: {
		emmitAccountStatements: function (val) {
			console.log("updating from child");
			this.$emit('acc-statements-change', val);
		},
		readActivities: function () {
			var self = this;
			google.script.run
			.withSuccessHandler(function(response){
				console.log('Reading activities');
				console.log(response);
				self.activities = response.records;
			})
			.withFailureHandler(function(err){
				console.log('An error ocurred while reading activities');
				console.log(err);
			})
			.readCatalog('actividad')
        },
        saveBalancesDeposits: function () {
        	if(typeof this.$refs.saldo_deposito === 'undefined') return;
        	this.$refs.saldo_deposito.save();
        },

	},

	watch: {
		id_actividad: function (val) {
			this.$emit('activity-change', val);
		},
		tipo_comprobante: function (val) {
			this.$emit('eval-type-change', val);
		},
		antiguedad_actividad: function (val) {
			this.$emit('act-seniority-change', val);
		},
		antiguedad_operacion: function (val) {
			this.$emit('oper-seniority-change', val);
		},		
	}
});