const Results = Vue.component('results', {
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<div class="card results">
			<header class="card-header">
				<p class="card-header-title">Resultado capacidad de pago</p>
			</header>
			<div class="card-content">	
				<div class="content columns">
					<div class="card column">
						<header class="header-sec-card">
							<p class="card-header-title title-color">Simples</p>
						</header>
						<div class="card-content">	
							<div class="content columns">
								<table class="column table is-bordered is-striped" style="width:100%">
									<tr>
										<td class="alinea_text">Monto solicitado</td>
										<td>{{monto_solicitado.simple}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Capacidad de pago por flujo mensual</td>
										<td>{{capacidad_pago.simple}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Diferencia entre ingreso anual y deuda actual</td>
										<td>{{ingreso_vs_deuda.simple}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Razon entre flujo y factor recuperacion de capital</td>
										<td>{{razon_flujo_rec_capital}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Monto maximo por buró</td>
										<td>{{monto_maximo.simple}}</td>
									</tr>
 										<td class="alinea_text">Monto</td>
										<td>{{linea.simple}}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="card column">
						<header class="header-sec-card">
							<p class="card-header-title title-color">Revolventes</p>
						</header>
						<div class="card-content">	
							<div class="content columns">
								<table class="column table is-bordered is-striped" style="width:100%">
									<tr>
										<td class="alinea_text">Monto solicitado</td>
										<td>{{monto_solicitado.revolvente}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Capacidad de pago por ingreso mensual</td>
										<td>{{capacidad_pago.revolvente}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Diferencia entre ingreso anual y deuda actual</td>
										<td>{{ingreso_vs_deuda.revolvente}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Razon entre flujo y tasa anual</td>
										<td>{{razon_flujo_tasa}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Monto maximo por buró:</td>
										<td>{{monto_maximo.revolvente}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Linea</td>
										<td>{{linea.revolvente}}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>

				</div> 							
			</div>
		</div>
	`
});