var LaboralStep = Vue.component('laboral-step',{
	template: `
		<section class="container formulario">
			<div class="columns">
				<div class="column">
					<label class="label">Tipo de comprobantes de ingresos: </label>
					<b-radio v-model="tipo_comprobante" size="is-normal"  native-value="account_statements"> 
			        	Estados de Cuenta 
		    		</b-radio>
					<b-radio v-model="tipo_comprobante" size="is-normal" class="form-color" native-value="financial_statements"> 
			        	Estados Financieros  
			    	</b-radio>
				</div>
				<div class="column">
					<label class="label">Actividad: </label>
					<b-select placeholder="Select a name" v-model="id_actividad" expanded>
                        <option v-for="activity in activities" :value="activity.id">{{ activity.nombre }} </option>
        			</b-select>
				</div>
				<div class="column">
					<label class="label">Antiguedad actividad: </label>
					<input type="text" v-model="antiguedad_actividad" class="input" />

				</div>
				<div class="column">
				<label class="label">Antiguedad operacion: </label>
					<input type="text" v-model="antiguedad_operacion" class="input" />

				</div>
			</div>
		</section>
	`,
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