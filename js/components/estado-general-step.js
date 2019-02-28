var EstadoGeneralStep = Vue.component('estado-financiero-card',{
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital', 'tipo_comprobante'],
	template: `		
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">Información de estados financieros</p>
			</header>
			<div class="card-content">	
				<div class="content" >
					<div class="columns">						
						<div class="column is-2">
							<label class="label">Ventas anuales: </label>
						</div>
						<div class="column is-4">					
							<input type="number" step="0.001" v-model="ventas_anuales" class="input" :disabled="tipo_comprobante=='account_statements'"/>
						</div>
						<div class="column is-2"> 
							<label class="label">Pasivo financiero corto plazo: </label>
						</div>
						<div class="column"> 					
							<input type="number" step="0.001" v-model="pasivo_financiero_corto" class="input" :disabled="tipo_comprobante=='account_statements'"/>
						</div>							
					</div>
					<div class="columns">
						<div class="column is-2">
							<label class="label">Uafir: </label>
						</div>
						<div class="column">					
							<input type="number" step="0.001" v-model="uafir" class="input" :disabled="tipo_comprobante=='account_statements'"/>
						</div>	
						<div class="column is-2">
							<label class="label">Capital contable: </label>
						</div>
						<div class="column is-4">
							<input type="number" step="0.001" v-model="capital_contable" class="input" :disabled="tipo_comprobante=='account_statements'"/>
						</div>												
					</div>
				</div>
			</div>
		</div>
	`,
	data () {
		return {
			uafir: null,
			capital_contable: null,
			ventas_anuales: null,						
			pasivo_financiero_corto: null
		}
	},

	components: {
		Results,
	},

	watch: {
		ventas_anuales: function (val) {
			this.$emit('annual-sales-change', val);
		},
		uafir: function (val) {
			this.$emit('uafir-change', val);
		},
		capital_contable: function (val) {
			this.$emit('acc-capital-change', val);
		},		
		pasivo_financiero_corto: function (val) {
			this.$emit('finantial-passive-change', val);
		}
		
	}
});