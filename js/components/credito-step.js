var CreditoStep = Vue.component('credito-step',{
	props:['id_solicitud'],
	template: `		
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">Datos del crédito</p>
			</header>
			<div class="card-content">				
				<div class="content">					
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
					<div class="columns">
						<div class="column">
							<div v-if="revolving_credits.length" v-for="credit in revolving_credits" :key="credit.id_local">
							<div class="card" style="margin-top:15px; margin-bottom:20px;">																			
								<div class="card-content">                     
		                			<div class="content columns">
		                				<table class="column">
		                					<tr>
		                						<td colspan="3"><p class="card-header-title title-color">Crédito Revolvente</p> </td>
		                						<td><a style="float:right;" class="btn-delete is-outlined tooltip is-tooltip-right" data-tooltip="Eliminar" @click="deleteCredit(credit.id_local, 'revolvente')"><i class="fas fa-times fa-2x"></i></a></td>
		                					</tr>
		                					<tr>
		                						<td><label class="label titulos">Monto: </label></td>
		                						<td><input type="text" v-model="credit.monto" class="input" id="numero_solicitud"/></td>
		                						<td><label class="label titulos">Destino: </label></td>
		                						<td><input type="text" v-model="credit.destino" class="input" /></td>
		                					</tr>
		                					<tr>
		                						<td><label class="label titulos">Periodo de Gracia </label></td>
		                						<td>
		                							<div class="select is-fullwidth">
														<select v-model="credit.periodo_gracia"  id="periodo_gracia" class="select">
															<option value selected>-- Seleccione--</option>
															<option value="1">Si</option>
															<option value="2">No</option>								
															<option value="3">No aplica</option>													
														</select>
													</div>
		                						</td>
		                						<td><label class="label titulos">SHC: </label></td>
		                						<td>
		                							<div class="select is-fullwidth">
														<select v-model="credit.hsc"  id="hsc" class="select">
															<option value selected>-- Seleccione--</option>
															<option value="1">Si</option>
															<option value="2">No</option>								
															<option value="3">No aplica</option>													
														</select>
													</div>
		                						</td>
		                					</tr>
		                					<tr>
		                						<td><label class="label titulos">Garantía Fondos: </label></td>
		                						<td>
		                							<div class="select is-fullwidth">
														<select v-model="credit.garantia_fondos"  id="garantia" class="select">
															<option value selected>-- Seleccione--</option>
															<option value="1">Hipotecaria</option>
															<option value="2">Líquida</option>								
															<option value="3">Prendaria</option>
															<option value="4">Otras</option>
															<option value="5">No tiene</option>
														</select>
													</div>
		                						</td>
		                						<td><label class="label titulos">Clasificación B6: </label></td>
		                						<td>
		                							<div class="select is-fullwidth">
														<select v-model="credit.clasif_b6"  id="clasif_b6" class="select">
															<option value selected>-- Seleccione--</option>
															<option value="1">N/A</option>
															<option value="2">B-6</option>								
															<option value="3">RE</option>													
															<option value="4">REV</option>													
															<option value="5">RV</option>													
														</select>
													</div>
		                						</td>
		                					</tr>
		                					<tr>
		                						<td><label class="label titulos">Empresa: </label></td>
		                						<td colspan="3"><input type="text" v-model="credit.empresa" class="input" /></td>
		                					</tr>

		                				</table>		                													
			                		</div>								
								</div>
							</div>	
							</div> 
						</div>
						<div class="column" >
							<div style="margin:10px;" class=" card " v-if="simple_credits.length" v-for="credit in simple_credits" :key="credit.id_local">
								<header class="header-sec-card columns" >
		                			<p class="column card-header-title title-color">Crédito Simple</p>
		                			<a class="column is-1 btn-delete is-outlined tooltip is-tooltip-right" data-tooltip="Eliminar" @click="deleteCredit(credit.id_local, 'revolvente')"><i class="fas fa-times fa-2x"></i></a>				                					
		              			</header>
								<div class="card-content">                     
		                			<div class="content">

		                				<div class="columns">
											<div class="column is-2">
												<label class="label titulos">Monto: </label>
											</div>
											<div class="column is-4" > 
												<input type="text" v-model="credit.monto" class="input" id="numero_solicitud"/>
											</div>
											<div class="column is-2">
												<label class="label titulos">Plazo: </label>
											</div>
											<div class="column is-4" style="text-align:left;">
												<input type="text"  v-model="credit.plazo" class="input" id="fecha_solicitud"/>
											</div>
										</div>
										<div class="columns">
											<div class="column is-2">
												<label class="label titulos">Periodo de Gracia </label>
											</div>
											<div class="column is-4" > 												
												<div class="select is-fullwidth">
													<select v-model="credit.periodo_gracia"  id="periodo_gracia" class="select">
														<option value selected>-- Seleccione--</option>
														<option value="1">Si</option>
														<option value="2">No</option>								
														<option value="3">No aplica</option>													
													</select>
												</div>
											</div>
											<div class="column is-2">
												<label class="label titulos">SHC: </label>
											</div>
											<div class="column is-4" style="text-align:left;">												
												<div class="select is-fullwidth">
													<select v-model="credit.hsc"  id="hsc" class="select">
														<option value selected>-- Seleccione--</option>
														<option value="1">Si</option>
														<option value="2">No</option>								
														<option value="3">No aplica</option>													
													</select>
												</div>
											</div>
										</div>
										<div class="columns">
											<div class="column is-2">
												<label class="label titulos">Destino: </label>
											</div>
											<div class="column is-4" > 
												<input type="text" v-model="credit.destino" class="input" />
											</div>
											<div class="column is-2">
												<label class="label titulos">Clasificación B6: </label>
											</div>
											<div class="column is-4" style="text-align:left;">											
												<div class="select is-fullwidth">
													<select v-model="credit.clasif_b6"  id="clasif_b6" class="select">
														<option value selected>-- Seleccione--</option>
														<option value="1">N/A</option>
														<option value="2">B-6</option>								
														<option value="3">RE</option>													
														<option value="4">REV</option>													
														<option value="5">RV</option>													
													</select>
												</div>
											</div>
										</div>
										<div class="columns">
											<div class="column is-2">
												<label class="label titulos">Garantía Fondos: </label>
											</div>
											<div class="column is-4" > 										
												<div class="select is-fullwidth">
													<select v-model="credit.garantia_fondos"  id="garantia" class="select">
														<option value selected>-- Seleccione--</option>
														<option value="1">Hipotecaria</option>
														<option value="2">Líquida</option>								
														<option value="3">Prendaria</option>
														<option value="4">Otras</option>
														<option value="5">No tiene</option>
													</select>
												</div>
											</div>
											<div class="column is-2">
												<label class="label titulos">Empresa: </label>
											</div>
											<div class="column is-4" > 
												<input type="text" v-model="credit.empresa" class="input" />
											</div>
										</div>	
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
			simple_credits: [],
			revolving_credits: [],
		}
	},

	created: function () {
		if (typeof this.id_solicitud != 'undefined' && !!this.id_solicitud) {
			this.readCredits();	
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
	    			periodo_gracia: null,
	    			hsc: null,
	    			destino: null,
	    			clasif_b6: null,
	    			garantia_fondos: null,
	    			empresa: null,
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
	    			periodo_gracia: null,
	    			hsc: null,
	    			destino: null,
	    			clasif_b6: null,
	    			garantia_fondos: null,
	    			empresa: null,
	    			saved: false
	    		});	  
			}
			// console.log(this.selected_type);
			// console.log(this.revolving_credits);
			// console.log(this.simple_credits);
			  	
	    	this.credits_count++;
		},

		readCredits: function () {
			var self = this;
	        google.script.run
	        .withSuccessHandler(function(response){
	          console.log('Reading creditos');
	          console.log(response);
	          self.setCreditos(response.records);  // solicitud.numero_solicitud = response.numero_solicitud;
	        })
	        .withFailureHandler(function(err){
	          console.log('An error ocurred while reading creditos');
	          console.log(err);
	        })
	        .readFKRelation('credito_solicitado', 'id_solicitud', this.id_solicitud);
		},

		setCreditos: function (records) {
			this.credits_count = records.length;
			if (this.credits_count > 0) {
				for (var i=0; i < this.credits_count; i++) {
					var record = records[i];
					record.saved = true;
					if (record.tipo === "1") {
						this.simple_credits.push(record)
					} else if (record.tipo === "2") {
						this.revolving_credits.push(record)
					}
				}
			}
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

		saveCredits: function () {

			var params = {
				incr: 0,
				simple: this.simple_credits.length,
				revolving: this.revolving_credits.length
			}
			this.future(this, this.saveCreditFuture, 3000, params, this.conditionFuture, this.mutate);
		},

		deleteCredit: function(id, crd_type) {
			// TODO: delete in  database

			var self = this;

			if (crd_type === 'simple') {
				var credit = this.simple_credits.find(elm => elm.id_local == id);
				var index = this.simple_credits.indexOf(credit);
	        	if (index >= 0){
	        		this.simple_credits.splice(index, 1);
	        	} 
				 
			} else if (crd_type === 'revolvente') {
				var credit = this.revolving_credits.find(elm => elm.id_local == id)
				var index = this.revolving_credits.indexOf(credit);
	        	if (index >= 0) this.revolving_credits.splice(index, 1);
			}
			console.log('before delete credito_solicitado');
			console.log(credit);
			if (!!credit.id) {
				google.script.run
				.withSuccessHandler(function(response){
					console.log('Deleting credito_solicitado response!')
					// todo: reindex (id_local)
					console.log(response);
					//self.solicitud.id = response.id;
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while deleting credito')
					console.log(err);
					alert("Ha ocurrido un error al intentar borrar el registro. Por favor intente de nuevo.");
					if (crd_type === 'simple') {
						self.simple_credits.push(credit);								 
					} else if (crd_type === 'revolvente') {
			        	self.revolving_credits.push(credit);
				}
				})
				.deleteId('credito_solicitado', credit.id);
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