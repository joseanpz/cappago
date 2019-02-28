var AsignacionStep = Vue.component('asignacion-step',{
	props:['id_solicitud', 'initial_simple_credits', 'initial_revolving_credits'],
	template: `		
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">Asignación de créditos</p>
			</header>
			<div class="card-content">				
				<div class="columns">
					<div class="column is-2"><label class="label titulos">Riesgo potencial: </label></div>
					<div class="column is-4">
						<input type="text" v-model="riesgo_potencial" class="input">
					</div>
				</div>
				<div class="content columns">					
					<div style="margin:10px;" class="column card " v-if="revolving_credits.length" v-for="credit in revolving_credits" :key="credit.id_local">
						<header class="header-sec-card" >
                			<p class="card-header-title title-color">Crédito Revolvente</p>
              			</header>
						<div class="card-content">                     
                			<div class="content">
                				<div class="columns">
									<div class="column is-2">
										<label class="label titulos">Monto Solicitado: </label>
									</div>
									<div class="column is-4" > 
										<input type="text" v-model="credit.monto" class="input"  disabled/>
									</div>									
								</div>	
								<div class="columns">
									<div class="column is-2">
										<label class="label titulos">Monto sugerido: </label>
									</div>
									<div class="column is-4" > 
										<input type="text" v-model="credit.sugerido" class="input" disabled/>
									</div>
									<div class="column is-2">
										<label class="label titulos">Monto Autorizado: </label>
									</div>
									<div class="column is-4" > 
										<input type="text" v-model="credit.autorizado" class="input"/>
									</div>
								</div>
                				
	                		</div>								
						</div>	 		 			
					</div> 

					<div style="margin:10px;" class="column card " v-if="simple_credits.length" v-for="credit in simple_credits" :key="credit.id_local">
						<header class="header-sec-card" >
                			<p class="card-header-title title-color">Crédito Simple</p>
              			</header>
						<div class="card-content">                     
                			<div class="content">

                				<div class="columns">
									<div class="column is-2">
										<label class="label titulos">Monto Solicitado: </label>
									</div>
									<div class="column is-4" > 
										<input type="text" v-model="credit.monto" class="input" disabled/>
									</div>
									<div class="column is-2">
										<label class="label titulos">Plazo: </label>
									</div>
									<div class="column is-4" style="text-align:left;">
										<input type="text"  v-model="credit.plazo" class="input" disabled/>
									</div>
								</div>
								<div class="columns">
									<div class="column is-2">
										<label class="label titulos">Monto sugerido: </label>
									</div>
									<div class="column is-4" > 
										<input type="text" v-model="credit.sugerido" class="input" disabled/>
									</div>
									<div class="column is-2">
										<label class="label titulos">Monto Autorizado: </label>
									</div>
									<div class="column is-4" > 
										<input type="text" v-model="credit.autorizado" class="input"/>
									</div>
								</div>
	                		</div>								
						</div>	 		 			
					</div> 				
				</div>
			</div>
		</div>			
	`,

	data () {
		return {
			destino_credito: null,
			garantia: null,
			credits_count: 0,
			selected_type: null,
			riesgo_potencial: null,
			simple_credits: this.initial_simple_credits,
			revolving_credits: this.initial_revolving_credits,
		}
	},
	

	computed: {
		solicited_credits: function () {
    		return this.simple_credits.concat(this.revolving_credits);
    	},
    	tempdelay : function() {
    		return parseInt(this.garantia);
    	},
	},

	methods: {
		
	},

	watch: {
		/*garantia: function (val) {
			this.$emit('guarantee-change', val);
		},
		destino_credito: function (val) {
			this.$emit('credit-dest-change', val);
		},*/
		riesgo_potencial: function(val) {
			this.$emit('potential-risk-change', val);
		},
		simple_credits: function(val) {
			this.$emit('smpl-credits-authoz-change', val);
		},
		revolving_credits: function(val) {
			this.$emit('rvlg-credits-authoz-change', val);
		}
		
	}
});