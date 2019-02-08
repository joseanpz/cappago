var EstadoGeneralStep = Vue.component('estado-general-step',{
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<section class="container">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">Información de estados financieros</p>
				</header>
				<div class="card-content">	
					<div class="content">
						<div class="columns">
							<div class="column is-2">
								<label class="label">Ventas anuales: </label>
							</div>
							<div class="column is-4">					
								<input type="number" step="0.001" v-model="ventas_anuales" class="input" />
							</div>
							<div class="column is-2">
								<label class="label">Uafir: </label>
							</div>
							<div class="column">					
								<input type="number" step="0.001" v-model="uafir" class="input" />
							</div>
						</div>
						<div class="columns">
							<div class="column is-2">
								<label class="label">Capital contable: </label>
							</div>
							<div class="column is-4">
								<input type="number" step="0.001" v-model="capital_contable" class="input" />
							</div>
							<div class="column is-2">
								<label class="label">Calificacion deudor: </label>
							</div>
							<div class="column is-4">		
								<input type="text" v-model="calificacion_deudor" class="input" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<results v-bind="$props"></results>
		</section>
	`,
	data () {
		return {
			uafir: null,
			capital_contable: null,
			ventas_anuales: null,
			calificacion_deudor: null,

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
		calificacion_deudor: function (val) {
			this.$emit('debtor-qual-change', val);
		},
		
	}
});