var ResultadoPerfiladorStep = Vue.component('resultado-perfilador-step',{
	props: ['linea', 'capacidad_pago', 'ingreso_vs_deuda', 'razon_flujo_tasa', 'razon_flujo_rec_capital'],
	template: `
		<section class="container">
				<div class="card">
					<header class="card-header">
						<p class="card-header-title">Resultado perfilador</p>
					</header>
					<div class="card-content">	
						<div class="content">
							<div class="columns">
								<div class="column is-2"><label class="label">Decreto:</label></div>
								<div class="column is-4">
									<b-select placeholder="Select a name" v-model="decreto" expanded>	                			
										<option value selected>-- seleccione -- </option>
										<option value="1">ESTUDIO</option>
										<option value="2">DENEGADO</option>
										<option value="3">PRE-APROBADO</option>
									</b-select>									
								</div>
								<div class="column is-2"><label>Nivel de riesgo:</label></div>
								<div class="column is-4">
									<b-select placeholder="Select a name" v-model="id_nivel_riesgo" expanded>	                			
										<option v-for="risk_level in risk_levels" :value="risk_level.id">{{ risk_level.nombre }} </option>
									</b-select>
								</div>
							</div>
						</div>
						<div class="content">
							<div class="columns">
								<div class="column is-2"><label>Score:</label></div>
								<div class="column is-4">
									<input type="text" v-model="score" class="input" />
								</div>
								<div class="column is-2"><label>Tipo evaluacion del perfilador:</label></div>
								<div class="column is-4">
									<b-select placeholder="Select a name" v-model="tipo_evaluacion_perfilador" expanded>	                			
										<option value selected>-- seleccione -- </option>
										<option value="1">EXT</option>
										<option value="2">NVO</option>										
									</b-select>									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<header class="card-header">
						<p class="card-header-title">Resultado capacidad de pago</p>
					</header>
					<div class="card-content">	
						<div class="content columns">
							<div class="column">Linea simple:</div>
							<div class="column">{{linea.simple}}</div>
							<div class="column">Linea revolvente:</div>
							<div class="column">{{linea.revolvente}}</div>					
						</div>
					</div>
				</div>
		</section>
	`,
	data () {
		return {
			tipo_evaluacion_perfilador: null,
			decreto: null,
			score: null,
			id_nivel_riesgo: null,
			risk_levels: []
		}
	},

	created: function() {
		this.readRiskLevels();
	},

	methods: {
		readRiskLevels: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
              console.log(response);
              self.risk_levels = response.records;
            })
            .withFailureHandler(function(err){
              console.log(err);
            })
            .readCatalog('nivel_riesgo')
        },
	},

	watch: {
		decreto: function (val) {
			this.$emit('decree-change', val);
		},
		score: function (val) {
			this.$emit('score-change', val);
		},
		tipo_evaluacion_perfilador: function (val) {
			this.$emit('eval-type-prfl-change', val);
		},
		id_nivel_riesgo: function (val) {
			this.$emit('risk-level-change', val);
		}
		
	}
});