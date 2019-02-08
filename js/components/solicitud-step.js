var SolicitudStep = Vue.component('solicitud-step',{
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<section class="container">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">Datos de la solicitud</p>
				</header>
				<div class="card-content">			
					<div class="content">
						<div class="columns">
							<div class="column is-2">
								<label class="label titulos">Numero solicitud: </label>
							</div>
							<div class="column is-4" > 
								<input type="text" v-model="numero_solicitud" class="input" id="numero_solicitud"/>
							</div>
							<div class="column is-2">
								<label class="label titulos">Fecha solicitud: </label>
							</div>
							<div class="column is-4" style="text-align:left;">
								<input type="text"  class="input" id="fecha_solicitud"/>
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
			numero_solicitud: null,

		}
	},
	components: {
		Results,
	},

	watch: {
		numero_solicitud: function (val) {
			this.$emit('sol-number-change', val);
		},

	}
});