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
								<label class="label titulos">Número solicitud: </label>
							</div>
							<div class="column is-4" > 
								<input type="text" v-model="numero_solicitud" class="input" id="numero_solicitud"/>
							</div>
							<div class="column is-2">
								<label class="label titulos">Fecha solicitud: </label>
							</div>
							<div class="column is-4" style="text-align:left;">
								<input type="date"  v-model="fecha_solicitud" class="input" id="fecha_solicitud"/>
							</div>
						</div>
						<div class="columns">	
							<div class="column is-2">
								<label class="label titulos">Cedente/prosp: </label>
							</div>
							<div class="column is-4" > 
								<input type="text" v-model="cedente_prosp" class="input" />
							</div>						
							<div class="column is-2">
								<label class="label titulos">Accionistas: </label>
							</div>
							<div class="column is-4" style="text-align:left;">
								<input type="text"  v-model="accionistas" class="input" />
							</div>														
						</div>
						<div class="columns">
							<div class="column is-2">
								<label class="label titulos">Cheques desde: </label>
							</div>
							<div class="column is-4" > 
								<input type="date" v-model="cheques_fecha" class="input" />
							</div>
							<div class="column is-2">
								<label class="label titulos">Crédito desde: </label>
							</div>
							<div class="column is-4" style="text-align:left;">
								<input type="date"  v-model="credito_fecha" class="input" />
							</div>																				
						</div>
						<div class="columns">							
							<div class="column is-2">
								<label class="label titulos">Promotor: </label>
							</div>
							<div class="column is-4" > 
								<input type="text" v-model="promotor" class="input" />
							</div>
							<div class="column is-2">
								<label class="label titulos">Subdirector: </label>
							</div>
							<div class="column is-4" style="text-align:left;">
								<input type="text"  v-model="subdirector" class="input" />
							</div>						
						</div>
						<div class="columns">
							<div class="column is-2">
								<label class="label titulos">Analista: </label>
							</div>
							<div class="column is-4" > 
								<input type="text" v-model="analista" class="input" />
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
			fecha_solicitud: null,
			cedente_prosp: null,
	        promotor: null,
	        subdirector: null,
	        analista: null,
	        accionistas: null,
	        cheques_fecha: null,
	        credito_fecha: null,

		}
	},
	components: {
		Results,
	},

	watch: {
		numero_solicitud: function (val) {
			this.$emit('sol-number-change', val);
		},
		fecha_solicitud: function (val) {
			this.$emit('sol-date-change', val);
		},
		cedente_prosp: function (val) {
			this.$emit('ced-prosp-change', val);
		},
		promotor: function (val) {
			this.$emit('promoter-change', val);
		},
		subdirector: function (val) {
			this.$emit('subdiretor-change', val);
		},
		analista: function (val) {
			this.$emit('analyst-change', val);
		},
		accionistas: function (val) {
			this.$emit('shareholder-change', val);
		},
		cheques_fecha: function (val) {
			this.$emit('checks-date-change', val);
		},
		credito_fecha: function (val) {
			this.$emit('credit-date-change', val);
		},
	}
});
