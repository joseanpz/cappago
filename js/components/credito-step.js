var CreditoStep = Vue.component('credito-step',{
	props:['id_solicitud'],
	template: `
		<section class="container card">
			<header class="card-header">
				<p class="card-header-title">Datos del credito</p>
			</header>
			<div class="card-content">				
				<div class="content">
					<div class="columns">
						<div class="column is-2">
							<label class="label titulos">Destino credito: </label>
						</div>
						<div class="column is-4">
							<input type="text" v-model="destino_credito" class="input" />
						</div>
						<div class="column is-2">
							<label class="label titulos">Garantia: </label>
						</div>
						<div class="column is-4">
							<div class="select is-fullwidth">
								<select v-model="garantia"  id="garantia" class="select">
									<option value selected>-- Seleccione--</option>
									<option value="1">Hipotecaria</option>
									<option value="2">Líquida</option>								
									<option value="3">Prendaria</option>
									<option value="4">Otras</option>
									<option value="5">No tiene</option>
								</select>
							</div>
						</div>				
					</div>
					<div class="columns">
		              	<div  class="column is-2">
		                  <label class="label titulos">Tipo de crédito</label>
		              	</div>
		              	<div class="column is-2">
			                <b-select class="select" placeholder="-- Selecione --" v-model="selected_type">
			        			<option value="1" > Simple </option> 
			        			<option value="2" > Revolvente </option>
			    			</b-select>                  
		              	</div>
		              	<div class="column is-2">
			              	<a class="button is-info is-outlined" @click="addCredit">
								<span class="icon is-small">
								<i class="fas fa-check"></i>
								</span>
								<span>Agregar Cr&eacute;dito</span>
			              	</a>
		              	</div>
			        </div>
			        
			        <div class="columns" >
						<div v-if="revolving_credits.length" class="column is-5">
							<div class="column card ">
								<header class="header-sec-card" >
		                			<p class="card-header-title title-color">Créditos Revolvente</p>
		              			</header>
							<div class="card-content">                     
		                		<div class="content">
		                			<div class="columns">
		                				<div class="column">
		                					<label class="label_color" >Monto Solicitado</label>
		                				</div>
		                			</div>		            				
									<b-field v-for="credit in revolving_credits" :key="credit.id_local"> 
		  								<div class="columns">
			                				<div class="column is-9">
			                				<b-input type="number" step="0.01" v-model="credit.monto"></b-input>
			                				</div>
			                				<div class="column">
			                					<a class="button is-danger is-outlined "  style="justify-content: center;" @click="deleteCredit(credit.id_local, 'revolvente')">
											    <span>Borrar</span>
											    <span class="icon is-small">
											      <i class="fas fa-times"></i>
											    </span>
											 </a>
			                				</div>
			                			</div>			  							
									</b-field>
									</div>	 	
								</div>	 			
							</div> 
						</div>

						<div v-if="simple_credits.length" class="column is-7">
							<div class="column card"> 
								<header class="header-sec-card" >
									<p class="card-header-title title-color">Créditos Simple </p>
								</header>
								 <div class="card-content">                     
		                		<div class="content"> 	
		                		<div class="columns">
		                			<label class="label_color column is-5"  >Monto solicitado</label>
		            				<label class="label_color column is-5" >Plazo</label>
		            				<label class="column"></label>					
		                		</div>                		
		  							<b-field v-for="credit in simple_credits"  :key="credit.id_local"> 
		  								<div class="columns">
		  									<div class="column is-5">
		  										<b-input type="number" step="0.01"  v-model="credit.monto"></b-input>
		  									</div>
			  								<div class="column is-5">
		  										<b-input type="number" step="0.01"  v-model="credit.plazo"></b-input>
		  									</div>
		  									<div class="column is-5">
		  										<a class="button is-danger is-outlined"  @click="deleteCredit(credit.id_local, 'simple')">
											    <span >Borrar</span>
											    <span class="icon is-small">
											      <i class="fas fa-times"></i>
											    </span>
											</a>
		  									</div>			  											  							
										</div>
		  							</b-field> 
		  						</div>	 	
								</div>	  							
							</div>
						</div>
					</div>
				</div>
			</div>			
		</section>
	`,
	data () {
		return {
			destino_credito: null,
			garantia: null,
			credits_count: 0,
			selected_type: null,
			simple_credits: [],
			revolving_credits: [],

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
		addCredit: function () {
			if (this.selected_type === "1") {
				this.simple_credits.push({
					id: null,
		    		id_local: this.credits_count,
		    		id_solicitud: this.id_solicitud,
	    			tipo: this.selected_type,
	    			monto: null,
	    			plazo: null,
	    			saved: false
	    		});	 
			} else if (this.selected_type === "2") {
				this.revolving_credits.push({
					id: null,
		    		id_local: this.credits_count,
	    			id_solicitud: this.id_solicitud,
	    			tipo: this.selected_type,
	    			monto: null,
	    			plazo: null,
	    			saved: false
	    		});	  
			}
			// console.log(this.selected_type);
			// console.log(this.revolving_credits);
			// console.log(this.simple_credits);
			  	
	    	this.credits_count++;
		},

		saveCreditFuture: function(instance, params) {
			//var that = self;
			console.log('saveCredit')
			console.log(params);


			if (params.incr < params.simple) {
				console.log('incr < simple');
				var credit = instance.simple_credits[params.incr];
			} else {
				var credit = instance.revolving_credits[params.incr-params.simple];
			}	
			console.log(credit);		

			if (!credit.saved) {
				google.script.run
				.withSuccessHandler(function(response){
					// TODO: handle different success response
					console.log('Creating "credit"!')
					console.log(response);
					credit.id = response.id;
					credit.saved = true;
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while saving a "credit"!')
					console.log(err);
				})
				.create('credito_solicitado', credit);
			} else {
				google.script.run
				.withSuccessHandler(function(response){
					console.log('Updating credito_solicitado response!')
					console.log(response);
					//self.solicitud.id = response.id;
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while updating')
					console.log(err);
				})
				.update('credito_solicitado', credit);
			}
		},

		mutate: function (params) {
			params.incr +=1;
			return params;

		},

		conditionFuture: function (params) {
			return params.incr < params.simple + params.revolving;
		},

		future: function (instance, fn, delay, params, condition, mutation) {
			var self = this;
			// execute function
			fn(instance, params);


			// mutate parameters
			params = mutation(params);

			// exchedule next execution
			if (condition(params)) {
				setTimeout(function(){self.future(instance, fn, delay, params, condition, mutation)}, delay);
			}

		},

		saveCredit: function (self, k, delay, m, n) {

			var that = self;
			console.log('saveCredit');

			if (k<m) {
				var credit = self.simple_credits[k];
			} else {
				var credit = self.revolving_credits[k-m];
			}			

			if (!credit.saved) {
				google.script.run
				.withSuccessHandler(function(response){
					// TODO: handle different success response
					console.log('Creating "credit"!')
					console.log(response);
					credit.id = response.id;
					credit.saved = true;
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while saving a "credit"!')
					console.log(err);
				})
				.create('credito_solicitado', credit);
			} else {
				google.script.run
				.withSuccessHandler(function(response){
					console.log('Updating credito_solicitado response!')
					console.log(response);
					//self.solicitud.id = response.id;
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while updating')
					console.log(err);
				})
				.update('credito_solicitado', credit)
			}

			k +=1;

			if (k < m+n) {
				console.log('inside recurrence');
				// console.log(k);				
				setTimeout(function() {self.saveCredit(self, k, delay, m, n);}, delay);
			}

		},



		saveCredits: function () {
			/*var self = this;
			var m = self.simple_credits.length;
			var n = self.revolving_credits.length
			
			setTimeout(function(){self.saveCredit(self, 0, 5000, m, n);}, 1000);  // 500 ms no data corruption*/

			var params = {
				incr: 0,
				simple: this.simple_credits.length,
				revolving: this.revolving_credits.length
			}
			this.future(this, this.saveCreditFuture, 3000, params, this.conditionFuture, this.mutate);
		},

		deleteCredit: function(id, crd_type) {
			// TODO: delete in  database

			if (crd_type === 'simple') {
				var index = this.simple_credits.indexOf(this.simple_credits.find(elm => elm.id_local == id));
	        	if (index >= 0) this.simple_credits.splice(index, 1);
				 
			} else if (crd_type === 'revolvente') {
				var index = this.revolving_credits.indexOf(this.revolving_credits.find(elm => elm.id_local == id));
	        	if (index >= 0) this.revolving_credits.splice(index, 1);
			}
	    },
	},

	watch: {
		garantia: function (val) {
			this.$emit('guarantee-change', val);
		},
		destino_credito: function (val) {
			this.$emit('credit-dest-change', val);
		},
		simple_credits: function(val) {
			this.$emit('smpl-credits-change', val);
		},
		revolving_credits: function(val) {
			this.$emit('rvlg-credits-change', val);
		}
		
	}
});