var SolicitudStep = Vue.component('solicitud-step',{
	template: `
		<section class="container formulario">
			<div class="columns">
				<div class="column is-3">
					<label class="label">Numero solicitud: </label>
				</div>
				<div class="column is-3">
					<input type="text" v-model="numero_solicitud" class="input" id="numero_solicitud"/>
				</div>
				<div class="column is-3">
					<label class="label">Fecha solicitud: </label>
				</div>
				<div class="column is-3">
					<input type="text"  class="input" id="fecha_solicitud"/>
				</div>
			</div>
			</br>
		</section>
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