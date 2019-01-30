var SolicitudStep = Vue.component('solicitud-step',{
	template: `
		<section class="container">
			<div class="columns">
				<div class="column">
					<label class="label">Numero solicitud: </label>
					<input type="text" v-model="numero_solicitud" class="input" id="numero_solicitud"/>
				</div>
			</div>
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