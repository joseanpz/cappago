var LaboralStep = Vue.component('laboral-step',{
	props: ['bank_list'],
	template: `
		<section class="container card">
			<header class="card-header">
				<p class="card-header-title">Información laboral</p>
			</header>
			<div class="card-content">
			<br/>
				<div class="content">
					<section>
						<div class="columns">
							<div class="column is-2">
								<label class="label titulos">Antiguedad operacion: </label>
							</div>
							<div class="column is-4">
								<input type="date" v-model="antiguedad_operacion" class="input" />
							</div>
							<div class="column is-2">
								<label class="label titulos">Antiguedad actividad: </label>
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
							            <option value="11">Mas de 10 años</option>
							         </select>
						        </div>
							</div>
						</div>

						<div class="columns">	
							<div class="column is-6">						
								<label class="label">Tipo de comprobantes de ingresos: </label>
								<b-radio v-model="tipo_comprobante" size="is-normal"  native-value="account_statements"> 
						        	Estados de Cuenta 
					    		</b-radio>
								<b-radio v-model="tipo_comprobante" size="is-normal" class="form-color" native-value="financial_statements"> 
						        	Estados Financieros  
						    	</b-radio>
							</div>
							<div class="column is-2">
								<label class="label titulos">Actividad: </label>
							</div>
							<div class="column">
								<b-select placeholder="Select a name" v-model="id_actividad" expanded>
			                        <option v-for="activity in activities" :value="activity.id">{{ activity.nombre }} </option>
			        			</b-select>
							</div>														
						</div>
					</section>

					<saldos-depositos-step
					:bank_list="bank_list"
					@acc-statements-change="emmitAccountStatements"> 
					</saldos-depositos-step>
				</div>
			</div>
		</section>
		<br/>
	`,

	components: {
		SaldosDepositosStep,
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