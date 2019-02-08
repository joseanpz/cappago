const Results = Vue.component('results', {
	props: ['linea', 'capacidad_pago', 'monto_solicitado', 'monto_maximo', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<div class="card results">
			<header class="card-header">
				<p class="card-header-title">Resultado capacidad de pago</p>
			</header>
			<div class="card-content">	
				<div class="content columns">
					<div class="column title-color" style="border:1px solid #3a5fab;">Simple:</div>
					<div class="column title-color" style="border:1px solid #3a5fab;">Revolvente</div>
				</div> 
				<div class="content columns">
					<div class="column alinea_text">Monto solicitado</div>
					<div class="column">{{monto_solicitado.simple}}</div>
					<div class="column alinea_text">Monto solicitado</div>
					<div class="column">{{monto_solicitado.revolvente}}</div>					
				</div>
				<div class="content columns">
					<div class="column alinea_text">Capacidad de pago por flujo mensual</div>
					<div class="column">{{capacidad_pago.simple}}</div>
					<div class="column alinea_text">Capacidad de pago por ingreso mensual</div>
					<div class="column">{{capacidad_pago.revolvente}}</div>					
				</div>
				<div class="content columns">
					<div class="column alinea_text">Diferencia entre ingreso anual y deuda actual</div>
					<div class="column">{{ingreso_vs_deuda.simple}}</div>
					<div class="column alinea_text">Diferencia entre ingreso anual y deuda actual</div>
					<div class="column">{{ingreso_vs_deuda.revolvente}}</div>					
				</div>
				<div class="content columns">
					<div class="column alinea_text">Razon entre flujo y factor recuperacion de capital</div>
					<div class="column">{{razon_flujo_rec_capital}}</div>
					<div class="column alinea_text">Razon entre flujo y tasa anual</div>
					<div class="column">{{razon_flujo_tasa}}</div>					
				</div>
				<div class="content columns">
					<div class="column alinea_text">Monto maximo</div>
					<div class="column">{{monto_maximo.simple}}</div>
					<div class="column alinea_text">Monto maximo</div>
					<div class="column">{{monto_maximo.revolvente}}</div>					
				</div>
				<div class="content columns">
					<div class="column alinea_text">Linea</div>
					<div class="column">{{linea.simple}}</div>
					<div class="column alinea_text">Linea</div>
					<div class="column">{{linea.revolvente}}</div>					
				</div>
			</div>
		</div>
	`
});