const Results = Vue.component('results', {
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<div class="card results">
			<header class="card-header">
				<p class="card-header-title">Resultado capacidad de pago</p>
			</header>
			<div class="card-content">	
				<div class="content columns">
					<div class="card column" style="margin: 5px;">
						<header class="header-sec-card">
							<p class="card-header-title title-color">Simples</p>
						</header>
						<div class="card-content">	
							<div class="content columns">
								<table class="column table  " style="width:100%">
									<tr>
										<td class="alinea_text">Monto solicitado</td>
										<td>{{monto_solicitado.simple | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Capacidad de pago por flujo mensual</td>
										<td>{{capacidad_pago.simple | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Diferencia entre ingreso anual y deuda actual</td>
										<td>{{ingreso_vs_deuda.simple | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Razón entre flujo y factor recuperación de capital</td>
										<td>{{razon_flujo_rec_capital | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Monto máximo por buró</td>
										<td>{{ monto_maximo.simple| redondeo_cantidad}}</td>
									</tr>
 										<td class="alinea_text">Monto</td>
										<td>{{ linea.simple | redondeo_cantidad }}</td>
									</tr>
								</table>
							</div> 
						</div>
					</div>
					<div class="card column" style="margin: 5px;">
						<header class="header-sec-card">
							<p class="card-header-title title-color">Revolventes</p>
						</header> 
						<div class="card-content">	
							<div class="content columns">
								<table class="column table " style="width:100%">
									<tr>
										<td class="alinea_text">Monto solicitado</td>
										<td>{{monto_solicitado.revolvente | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Capacidad de pago por ingreso mensual</td>
										<td>{{capacidad_pago.revolvente | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Diferencia entre ingreso anual y deuda actual</td>
										<td>{{ingreso_vs_deuda.revolvente | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Razón entre flujo y tasa anual</td>
										<td>{{razon_flujo_tasa | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Monto máximo por buró:</td>
										<td >{{ monto_maximo.revolvente | redondeo_cantidad}}</td>
									</tr>
									<tr>
										<td class="alinea_text">Línea</td>
										<td>{{ linea.revolvente | redondeo_cantidad }}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="columns">
					<label style="color:#3a5fab;" class="column"><b>*</b>Cantidades en Miles</label>
				</div>
			</div>
		</div>
	`,
	filters:{
		redondeo_cantidad: function(value){
			//var c = Math.pow(10 , 2);
			value = Math.round(value * 100) / 100;
			value += '';
                   var splitStr = value.split(',');
                   var splitLeft = splitStr[0];
                   var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
                   var regx = /(\d+)(\d{3})/;
                   while (regx.test(splitLeft)) {
                      splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
                   }
            return '$ ' + splitLeft + splitRight;

		}
	}
}

);