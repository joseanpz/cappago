var ResultadoPerfiladorStep = Vue.component('resultado-perfilador-card',{
	props: ['cambia_decreto'],
	template: `		
		<div class="card card-subitem">
			<header class="card-header">
				<p class="card-header-title">Resultado perfilador</p>
			</header>
			<div class="card-content">	
				<div class="content">
					<div class="columns">
						<div class="column is-2"><label class="label titulos">Decreto:</label></div>
						<div class="column is-4">
							<b-select placeholder="Select a name" v-model="decreto" expanded>	                			
								<option value selected>-- seleccione -- </option>
								<option value="3" v-if="!cambia_decreto">PRE-APROBADO</option>
								<option value="1">ESTUDIO</option>
								<option value="2">DENEGADO</option>
								
							</b-select>									
						</div>
						<div class="column is-2"><label class="label titulos">Nivel de riesgo:</label></div>
						<div class="column is-4">
							<b-select placeholder="Capture score" v-model="id_nivel_riesgo" expanded disabled>	                			
								<option v-for="risk_level in risk_levels" :value="risk_level.id">{{ risk_level.nombre }} </option>
							</b-select>
						</div>
					</div>
				</div>
				<div class="content">
					<div class="columns">
						<div class="column is-2"><label class="label titulos">Score:</label></div>
						<div class="column is-4">
							<input type="number" step="1" v-model="score" class="input" />
						</div>
						<div class="column is-2"><label class="label titulos">Tipo evaluación del perfilador:</label></div>
						<div class="column is-4">
							<b-select placeholder="Select a name" v-model="tipo_evaluacion_perfilador" expanded>	                			
								<option value selected>-- seleccione -- </option>
								<option value="1">Cliente existente</option>
								<option value="2">Cliente nuevo</option>										
							</b-select>									
						</div>
					</div>
				</div>
				<div class="content">
					<div class="columns">							
						<div class="column is-2">
							<label class="label titulos">Pre-calif: </label>
						</div>
						<div class="column is-4">		
							<input type="text" v-model="calificacion_deudor" class="input" />
						</div>
						<div class="column is-2">
							<label class="label titulos">Calificación interna: </label>
						</div>
						<div class="column is-4">		
							<input type="text" v-model="calificacion_interna" class="input" />
						</div>						
					</div>	
				</div>				
			</div>
		</div>				
	`,
	data () {
		return {
			tipo_evaluacion_perfilador: null,
			decreto: null,
			score: null,
			id_nivel_riesgo: null,
			calificacion_deudor: null,
			calificacion_interna: null,
			pre_calif: null,			
			risk_levels: []
		}
	},

	created: function() {
		this.readRiskLevels();
	},

	components: {
		Results,
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

        scoreToRiskLevelId: function (score) {
        	var int_score = parseInt(score);
        	if (int_score >= 0 && int_score < 543){
        		return '9';
        	} else if (int_score >= 543 && int_score < 593) {
        		return '8';
        	} else if (int_score >= 593 && int_score < 643) {
        		return '7';
        	} else if (int_score >= 643 && int_score < 693) {
        		return '6';
        	} else if (int_score >= 693 && int_score < 743) {
        		return '5';
        	} else if (int_score >= 743 && int_score < 793) {
        		return '4';
        	} else if (int_score >= 793 && int_score < 843) {
        		return '3';
        	} else if (int_score >= 843 && int_score < 893) {
        		return '2';
        	} else if (int_score >= 893) {
        		return '1';
        	} else {
        		return null;
        	}
        },
	},

	watch: {
		cambia_decreto: function (val) {
			console.log('cambiando decreto en watch de cambia_decreto');
			if (val && this.decreto === "3") {
				this.decreto = "1";
			}
		},
		decreto: function (val) {			
			this.$emit('decree-change', val);			
		},
		score: function (val) {
			this.id_nivel_riesgo = this.scoreToRiskLevelId(val);
			this.$emit('score-change', val);
		},
		tipo_evaluacion_perfilador: function (val) {
			this.$emit('eval-type-prfl-change', val);
		},
		id_nivel_riesgo: function (val) {
			this.$emit('risk-level-change', val);
		},
		calificacion_deudor: function (val) {
			this.$emit('debtor-qual-change', val);
		},
		calificacion_interna: function (val) {
			this.$emit('internal-calif', val);
		},
		pre_calif: function (val) {
			this.$emit('calif-pre', val);
		},
		
	}
});