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
								<div class="columns card">									
									<div class="column">
										<header class="header-sec-card">
											<p class="card-header-title title-color">Segmento califica</p>
										</header>
										<div class="card-content">	
											<div class="content">
												<table class="table ">
													<tr>
														<td><label class="label">Indicadora de Acreditados Sin Atraso (<b>BK12_CLEAN</b>): </label></td>
														<td style="width:25%;"><input type="number" step="0.001" v-model="BK12_CLEAN" class="input" /> </td>
													</tr>
													<tr>
														<td><label class="label">Monto máximo de crédito otorgado por instituciones financieras bancarias en los últimos 12 meses. (<b>BK12_MAX_CREDIT_AMT</b>): </label></td>
														<td><input type="number" step="0.001" v-model="BK12_MAX_CREDIT_AMT" class="input" /> </td>
													</tr>
													<tr>
														<td><label class="label">Deuda Total de Acreditado (<b>DEUDA_TOT</b>): </label></td>
														<td><input type="number" step="0.001" v-model="deuda_total" class="input" /> </td>
													</tr>
													<tr>
														<td><label class="label">Antigüedad en sociedad de información crediticia (<b>MONTHS_ON_FILE_BANKING</b>): </label></td>
														<td><input type="number" step="0.001" v-model="MONTHS_ON_FILE_BANKING" class="input" /> </td>
													</tr>
													<tr>
														<td><label class="label">Deuda a Corto Plazo Total: </label></td>
														<td><input type="number" step="0.001" v-model="deuda_cortoplazo" class="input" /></td>
													</tr>
												</table>
											</div>
										</div>
									</div>									
								</div>
								<div class="columns card">
									<div class="column">										
										<header class="header-sec-card">
											<p class="card-header-title title-color"> Experiencia crediticia</p>
										</header>
										<div class="card-content">	
											<div class="content">								
												<table class="table">												
													<tbody>
														<tr>
															<td>
																<div class="field">
																  <input class="is-checkradio" v-model="exp_creditos_largos" id="exp_creditos_largos" type="checkbox" name="exp_creditos_largos">
																  <label for="exp_creditos_largos"><b>Tiene experiencia con créditos simples > 48 meses?</b></label>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="column">
								<div class="columns card">		
									<div class="column">										
										<header class="header-sec-card">
											<p class="card-header-title title-color">Reporte de buró de crédito (Resumen)</p>
										</header>
										<div class="card-content">	
											<div class="content">								
												<table class="table ">
													<thead>
														<tr>
															<th >Tipo de crédito</th>
															<th >Número de créditos</th>
															<th >Monto original</th>
															<th >Monto vigente</th>
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
								<div class="columns card">						
									<div class="column">										
										<header class="header-sec-card">
											<p class="card-header-title title-color">Generales</p>
										</header>
										<div class="card-content">	
											<div class="content">								
												<table class="table">												
													<tbody>
														<tr>
															<td><label class="label">Fecha consulta de buró: </label></td>
															<td><input type="date" v-model="fecha_consulta" class="input" /></td>
														</tr>
														<tr>
															<td><label class="label">Calificación buro: </label></td>
															<td><input type="text"  v-model="calif_buro" class="input" /></td>
														</tr>
														<tr>
															<td><label class="label">Línea más alta: </label></td>
															<td><input type="number" step="1"  v-model="linea_mas_alta" class="input" /></td>
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
			deuda_cortoplazo: null,
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
			sal_orig_cred_act_simp: null,
			exp_creditos_largos: null,
			calif_buro: null,
			fecha_consulta: null,
			linea_mas_alta: null
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
		deuda_cortoplazo: function (val) {
			this.$emit('short-term-debt-change', val);
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
		exp_creditos_largos: function (val) {
			this.$emit('large-credit-experience-change', val);
		},
		calif_buro: function (val) {
			this.$emit('buro-calif-change', val);
		},
		fecha_consulta: function (val) {
			this.$emit('deuda-date-change', val);
		},
		linea_mas_alta: function (val) {
			this.$emit('higher-line-change', val);
		},
		
	}
});