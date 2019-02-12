var BuroCreditoStep = Vue.component('buro-credito-step', {
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<section class="container">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">Información de buro</p>
				</header>
				<div class="card-content">	
					<div class="content">
						<div class="columns">
							<div class="column">
								<div class="card">
									<header class="card-header">
										<p class="card-header-title">Segmento califica</p>
									</header>
									<div class="card-content">	
										<div class="content">
											<table class="table is-bordered">
												<tr>
													<td><label class="label">Indicadora de Acreditados Sin Atraso (<b>BK12_CLEAN</b>): </label></td>
													<td><input type="number" step="0.001" v-model="BK12_CLEAN" class="input" /> </td>
												</tr>
												<tr>
													<td><label class="label">Monto máximo de crédito otorgado por instituciones financieras bancarias en los ultimos 12 meses. (<b>BK12_MAX_CREDIT_AMT</b>): </label></td>
													<td><input type="number" step="0.001" v-model="BK12_MAX_CREDIT_AMT" class="input" /> </td>
												</tr>
												<tr>
													<td><label class="label">Deuda Total de Acreditado (<b>BK_DEUDA_TOT</b>): </label></td>
													<td><input type="number" step="0.001" v-model="deuda_total" class="input" /> </td>
												</tr>
												<tr>
													<td><label class="label">Antigüedad en sociedad de informacion crediticia (<b>MONTHS_ON_FILE_BANKING</b>): </label></td>
													<td><input type="number" step="0.001" v-model="MONTHS_ON_FILE_BANKING" class="input" /> </td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="column">
								<div class="card">
									<header class="card-header">
										<p class="card-header-title">Reporte de buro de credito (Resumen)</p>
									</header>
									<div class="card-content">	
										<div class="content">								
											<table class="table is-bordered">
												<thead>
													<tr>
														<th style="border: 1px solid #3a5fab;">Tipo de credito</th>
														<th style="border: 1px solid #3a5fab;">Numero de creditos</th>
														<th style="border: 1px solid #3a5fab;">Original</th>
														<th style="border: 1px solid #3a5fab;">Vigente</th>
													</tr>								
												</thead>
												<tbody>
													<tr>
														<td><b>Revolvente</b></td>
														<td><input type="number"  v-model="num_cred_act_revol" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_orig_cred_act_revol" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_vig_cred_act_revol" class="input" /></td>
													</tr>
													<tr>
														<td><b>Factorajes</b></td>
														<td><input type="number"  v-model="num_cred_act_fact" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_orig_cred_act_fact" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_vig_cred_act_fact" class="input" /></td>
													</tr>
													<tr>
														<td><b>Arrendamientos</b></td>
														<td><input type="number"  v-model="num_cred_act_arren" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_orig_cred_act_arren" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_vig_cred_act_arren" class="input" /></td>
													</tr>
													<tr>
														<td><b>Simples</b></td>
														<td><input type="number"  v-model="num_cred_act_simp" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_orig_cred_act_simp" class="input" /></td>
														<td><input type="number" step="0.001" v-model="sal_vig_cred_act_simp" class="input" /></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
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

	components: {
		Results,
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