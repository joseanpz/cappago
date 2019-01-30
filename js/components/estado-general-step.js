var EstadoGeneralStep = Vue.component('estado-general-step',{
	template: `
		<section class="container">
			<div class="columns">
				<div class="column">
					<label class="label">Ventas anuales: </label>
					<input type="text" v-model="ventas_anuales" class="input" />
				</div>
				<div class="column">
					<label class="label">Uafir: </label>
					<input type="text" v-model="uafir" class="input" />
				</div>
				<div class="column">
					<label class="label">Capital contable: </label>
					<input type="text" v-model="capital_contable" class="input" />
				</div>
				<div class="column">
					<label class="label">Calificacion deudor: </label>
					<input type="text" v-model="calificacion_deudor" class="input" />
				</div>
			</div>
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