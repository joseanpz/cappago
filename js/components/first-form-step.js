Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);

const FirstFormStep = Vue.component('first-form-step', {
	template: ' <section>\
					<h2 class="title is-2">¿Cómo se desea comprobar los ingresos y flujos mensuales de la solicitud?</h2> \
					<div class="field"> \
					    <b-radio v-model="evaluation_type" size="is-medium" \
					        native-value="account_statements"> \
					        Estados de Cuenta \
					    </b-radio> \
					</div> \
					<div class="field"> \
					    <b-radio v-model="evaluation_type" size="is-medium" \
					        native-value="financial_statements"> \
					        Estados Financieros  \
					    </b-radio> \
					</div> \
					<p class="content"> \
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
	}
});
