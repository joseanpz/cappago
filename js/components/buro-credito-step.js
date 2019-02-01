var BuroCreditoStep = Vue.component('buro-credito-step',{
	template: `
		<section class="container card">
			<header class="card-header">
				<p class="card-header-title">Información de buro <b> - Creditos activos</b></p>
			</header>
			<div class="card-content">	
				<div class="content">
					<div class="columns">
						<div class="column">
							<table>
								<tr>
									<td><label class="label">Indicadora de Acreditados Sin Atraso(<b>BK12_CLEAN</b>): </label></td>
									<td><input type="text" v-model="BK12_CLEAN" class="input" /> </td>
								</tr>
							</table>
							<div class="columns">
								<div class="column">
									<label class="label">Deuda total: </label>
									<input type="text" v-model="deuda_total" class="input" />
								</div>
								<div class="column">
									<label class="label">MONTHS_ON_FILE_CREDIT_AMT: </label>
									<input type="text" v-model="MONTHS_ON_FILE_BANKING" class="input" />
								</div>
								<div class="column">
									<label class="label">BK12_CLEAN: </label>
									<input type="text" v-model="BK12_CLEAN" class="input" />
								</div>
								<div class="column">
									<label class="label">BK12_MAX_CREDIT_AMT: </label>
									<input type="text" v-model="BK12_MAX_CREDIT_AMT" class="input" />
								</div>
							</div>
						</div>
						<div class="column">
						<table class="column table is-bordered">
							<thead>
								<tr>
									<th>Tipo de credito</th>
									<th>Numero de creditos</th>
									<th>Original</th>
									<th>Vigente</th>
								</tr>								
							</thead>
							<tbody>
								<tr>
									<td><b>Revolvente</b></td>
									<td><input type="text" v-model="num_cred_act_revol" class="input" /></td>
									<td><input type="text" v-model="sal_vig_cred_act_revol" class="input" /></td>
									<td><input type="text" v-model="sal_orig_cred_act_revol" class="input" /></td>
								</tr>
								<tr>
									<td><b>Factorajes</b></td>
									<td><input type="text" v-model="num_cred_act_fact" class="input" /></td>
									<td><input type="text" v-model="sal_vig_cred_act_fact" class="input" /></td>
									<td><input type="text" v-model="sal_orig_cred_act_fact" class="input" /></td>
								</tr>
								<tr>
									<td><b>Arrendamientos</b></td>
									<td><input type="text" v-model="num_cred_act_arren" class="input" /></td>
									<td><input type="text" v-model="sal_vig_cred_act_arren" class="input" /></td>
									<td><input type="text" v-model="sal_orig_cred_act_arren" class="input" /></td>
								</tr>
								<tr>
									<td><b>Simples</b></td>
									<td><input type="text" v-model="num_cred_act_simp" class="input" /></td>
									<td><input type="text" v-model="sal_vig_cred_act_simp" class="input" /></td>
									<td><input type="text" v-model="sal_orig_cred_act_simp" class="input" /></td>
								</tr>
							</tbody>
						</table>
						</div>
					</div>					
				</div>
			</div>			
		</section>	
	`,
	data () {
		return {
			deuda_total: null,
			MONTHS_ON_FILE_BANKING: null,
			BK12_CLEAN: null,
			BK12_MAX_CREDIT_AMT: null,
			num_cred_act_arren: null,
			num_cred_act_fact: null,
			num_cred_act_revol: null,
			num_cred_act_simp: null,
			sal_vig_cred_act_arren: null,
			sal_vig_cred_act_fact: null,
			sal_vig_cred_act_revol: null,
			sal_vig_cred_act_simp: null,
			sal_orig_cred_act_arren: null,
			sal_orig_cred_act_fact: null,
			sal_orig_cred_act_revol: null,
			sal_orig_cred_act_simp: null
		}
	},

	watch: {
		deuda_total: function (val) {
			this.$emit('total-debt-change', val);
		},
		MONTHS_ON_FILE_BANKING: function (val) {
			this.$emit('monfile-banking-change', val);
		},
		BK12_CLEAN: function (val) {
			this.$emit('bk12-clean-change', val);
		},
		BK12_MAX_CREDIT_AMT: function (val) {
			this.$emit('bk12maxcred-amt-change', val);
		},
		num_cred_act_arren: function (val) {
			this.$emit('num-arren-change', val);
		},
		num_cred_act_fact: function (val) {
			this.$emit('num-fact-change', val);
		},
		num_cred_act_revol: function (val) {
			this.$emit('num-revol-change', val);
		},
		num_cred_act_simp: function (val) {
			this.$emit('num-simp-change', val);
		},
		sal_vig_cred_act_arren: function (val) {
			this.$emit('sal-vig-arren-change', val);
		},
		sal_vig_cred_act_fact: function (val) {
			this.$emit('sal-vig-fact-change', val);
		},
		sal_vig_cred_act_revol: function (val) {
			this.$emit('sal-vig-revol-change', val);
		},
		sal_vig_cred_act_simp: function (val) {
			this.$emit('sal-vig-simp-change', val);
		},
		sal_orig_cred_act_arren: function (val) {
			this.$emit('sal-orig-arren-change', val);
		},
		sal_orig_cred_act_fact: function (val) {
			this.$emit('sal-orig-fact-change', val);
		},
		sal_orig_cred_act_revol: function (val) {
			this.$emit('sal-orig-revol-change', val);
		},
		sal_orig_cred_act_simp: function (val) {
			this.$emit('sal-orig-simp-change', val);
		},
		
	}
});