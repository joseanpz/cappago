Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);

const FirstFormStep = Vue.component('first-form-step', {
	template: ' <section>\
					<h4 class="title is-5">¿Cómo se desea comprobar los ingresos y flujos mensuales de la solicitud?</h4> \
					<div class="columns">\
					<div class="column is-half"> \
					    <b-radio v-model="evaluation_type" size="is-medium" \
					        native-value="account_statements"> \
					        Estados de Cuenta \
					    </b-radio> \
					</div> \
					<div class="column is-half"> \
					    <b-radio v-model="evaluation_type" size="is-medium" class="form-color" \
					        native-value="financial_statements"> \
					        Estados Financieros  \
					    </b-radio> \
					</div> \
					</div>\
					<p class="content"> \
					<br>\
					    <b>Selection:</b> \
					    {{ evaluation_type }} \
					</p> \
				</section> ',
	data () {
		return {
			evaluation_type: "account_statements",
			model: {
				radio: "Jack",
			}
		}
	},

	watch: {
		evaluation_type: function (val) {
			this.$emit('eval-type-change', val);
		}
	}
});
