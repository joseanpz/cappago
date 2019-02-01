var SolicitudStep = Vue.component('solicitud-step',{
	template: `
		<section class="container card">
			<header class="card-header">
				<p class="card-header-title">Datos de la solicitud</p>
			</header>
			<div class="card-content">
			<br/>
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
				<br/>
			</div>
		</section>
		<br/>
	`,
	data () {
		return {
			numero_solicitud: null,

		}
	},

	watch: {
		numero_solicitud: function (val) {
			this.$emit('sol-number-change', val);
		},

	}
});