var CreditoStep = Vue.component('credito-step',{
	props:['id_solicitud', 'linea_revolvente', 'linea_simple'],
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
		              	<div class="column"></div>
			        </div>		        
					<div class="columns" style="border:0px solid red;">
						<div class="column">
							<div v-if="revolving_credits.length" v-for="credit in revolving_credits" :key="credit.id_local">
								<div class="card" style="">																			
									<div class="card-content">                     
			                			<div class="content columns">
			                				<table class="column">
			                					<tr>
			                						<td colspan="3"><p class="card-header-title title-color">Crédito Revolvente</p> </td>
			                						<td>
			                							<a style="float:right;" class="btn-delete is-outlined tooltip is-tooltip-right" data-tooltip="Eliminar" @click="deleteCredit(credit.id_local, 'revolvente')">
			                								<i class="fas fa-times fa-2x"></i>
			                							</a>
			                						</td>
			                					</tr>		                					
				                				<tr>
			                						<td><label class="label titulos">Producto: </label></td>
			                						<td colspan="3">
			                							<div class="select is-fullwidth">
				                							<select placeholder="--Seleccione un producto--" v-model="credit.id_producto" class="select"> 
																<option 
																	v-for="product in revolving_products" 
																	:value="product.id" 
																	:key="product.id" 
																> 
																	{{product.tipo_producto}} 
																</option> 
															</select>
														</div>
			                						</td>
			                					</tr>
			                					<tr>
				                					<td><label class="label titulos">Tipo operación </label></td>
				                					<td>
				                						<div class="select is-fullwidth">
															<select v-model="credit.tipo_operacion"  class="select" @change="setRLFromOperType($event, credit.id_local)">
																<option value selected>--Seleccione--</option>
																<option value="1">Actual</option>
																<option value="2">Incremento</option>								
																<option value="3">Nuevo</option>													
															</select>
														</div>
				                					</td>
				                					<td><label class="label titulos">Empresa: </label></td>
				                					<td><input type="text" v-model="credit.empresa" class="input" /></td>			                					
				                				</tr>
				                				<tr>
			                						<td><label class="label titulos">Importe: </label></td>
			                						<td><input type="text" v-model="credit.importe" class="input"/></td>
			                						<td><label class="label titulos">Respons.: </label></td>
			                						<td><input type="text"  v-model="credit.responsabilidad" class="input"/></td>		                						
				                				</tr>
			                					<tr v-bind:class="{card: credit.tipo_operacion == '3' || credit.tipo_operacion == '2'} ">
			                						<!--<td><label class="label titulos">Monto: </label></td>
			                						<td colspan="3"><input type="text" v-model="credit.monto" class="input"/></td>-->
			                						<td><label class="label titulos">Monto: </label></td>
			                						<td><input type="text" v-model="credit.monto" class="input"/></td>
			                						<td><label class="label titulos">Plazo: </label></td>
			                						<td><input type="text"  v-model="credit.plazo" class="input"/></td>		                						
				                				</tr>
				                				<tr>
				                					<td><label class="label titulos">Vencimiento </label></td>
				                					<td><input placeholder="yyyy-mm-dd" type="text" v-model="credit.vencimiento" class="input" /></td>
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
																<option value="1">Si</option>
																<option value="2">No</option>								
																<option value="3">No aplica</option>
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
			                				</table>		                													
				                		</div>								
									</div>
								</div>	
							</div> 
						</div>
						<div class="column" >
							<div class="" v-if="simple_credits.length" v-for="credit in simple_credits" :key="credit.id_local">
								<div class="card">								
									<div class="card-content">                     
			                			<div class="content columns">
			                				<table class="column">
			                					<tr>
			                						<td colspan="3"><p class="card-header-title title-color">Crédito Simple</p> </td>
			                						<td>
			                							<a style="float:right;" class="btn-delete is-outlined tooltip is-tooltip-right" data-tooltip="Eliminar" @click="deleteCredit(credit.id_local, 'simple')">
			                								<i class="fas fa-times fa-2x"></i>
			                							</a>
			                						</td>
			                					</tr>
				                				<tr>
			                						<td><label class="label titulos">Producto: </label></td>
			                						<td colspan="3">
			                							<div class="select is-fullwidth">
				                							<select placeholder="--Seleccione un producto--" v-model="credit.id_producto" class="select"> 
																<option 
																	v-for="product in simple_products" 
																	:value="product.id" 
																	:key="product.id" 
																> 
																	{{product.tipo_producto}} 
																</option> 
															</select>
														</div>
			                						</td>
			                					</tr>
			                					<tr>
				                					<td><label class="label titulos">Tipo operación </label></td>
				                					<td>
				                						<div class="select is-fullwidth">
															<select v-model="credit.tipo_operacion"  class="select" @change="setSLFromOperType($event, credit.id_local)">
																<option value selected>--Seleccione--</option>
																<option value="1">Actual</option>																							
																<option value="3">Nuevo</option>													
															</select>
														</div>
				                					</td>
				                					<td><label class="label titulos">Empresa: </label></td>
				                					<td><input type="text" v-model="credit.empresa" class="input" /></td>			                					
				                				</tr>
				                				<tr>
			                						<td><label class="label titulos">Importe: </label></td>
			                						<td><input type="text" v-model="credit.importe" class="input"/></td>
			                						<td><label class="label titulos">Respons.: </label></td>
			                						<td><input type="text"  v-model="credit.responsabilidad" class="input"/></td>		                						
				                				</tr>
			                					<tr v-bind:class="{card: credit.tipo_operacion == '3'}">
			                						<td><label class="label titulos">Monto: </label></td>
			                						<td><input type="text" v-model="credit.monto" class="input"/></td>
			                						<td><label class="label titulos">Plazo: </label></td>
			                						<td><input type="text"  v-model="credit.plazo" class="input"/></td>		                						
				                				</tr>
				                				<tr>
				                					<td><label class="label titulos">Vencimiento </label></td>
				                					<td><input placeholder="yyyy-mm-dd" type="text" v-model="credit.vencimiento" class="input" /></td>
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
																<option value="1">Si</option>
																<option value="2">No</option>								
																<option value="3">No aplica</option>
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
	`,
	data () {
		return {
			destino_credito: null,
			garantia: null,
			credits_count: 0,
			selected_type: null,
			// selected_product: null,
			products: [],
			simple_credits: [],
			revolving_credits: [],
		}
	},

	created: function () {
		if (typeof this.id_solicitud != 'undefined' && !!this.id_solicitud) {
			this.readCredits();	
		}
		this.readProducts();		
	},	

	computed: {
		solicited_credits: function () {
    		return this.simple_credits.concat(this.revolving_credits);
    	},
    	tempdelay : function() {
    		return parseInt(this.garantia);
    	},
    	/*selected_type: function () {
    		if (this.products.length === 0 || this.selected_product === null) return null;
    		var selected_product = this.products.find(product => product.id === this.selected_product);
    		return selected_product.tipo_credito;
    	},*/
    	simple_products: function () {
    		if (this.products.length === 0) return [];
    		return this.products.filter(product => product.tipo_credito === "1");
    	},
    	revolving_products: function () {
    		if (this.products.length === 0) return [];
    		return this.products.filter(product => product.tipo_credito === "2");
    	},

    	next_local_id: function () {
    		return this.simple_credits.concat(this.revolving_credits).map(credit => credit.id_local).reduce((a,b) => Math.max(a,b),0) + 1;
    	},
	},

	methods: {
		readProducts: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
            	console.log('Reading products!')
              	console.log(response);
              	self.products = response.records;
              	/*if (typeof self.id_solicitud != 'undefined' && !!self.id_solicitud) {
					self.readCredits();	
				}*/
            })
            .withFailureHandler(function(err){
            	console.log('An error ocurred while fetching products!')
              	console.log(err);
            })
            .readCatalog('producto')
        },

		addCredit: function () {
			var new_credit = {
				id: null,
	    		id_local: this.next_local_id,
	    		id_solicitud: this.id_solicitud,
    			tipo: this.selected_type,
    			id_producto: null,
    			tipo_operacion: null,
    			importe: null,
    			responsabilidad: null,
    			vencimiento: null,
    			monto: null,
    			plazo: null,
    			periodo_gracia: null,
    			hsc: null,
    			destino: null,
    			clasif_b6: null,
    			garantia_fondos: null,
    			empresa: null,
    			sugerido: null,
    			autorizado: null,
    			saved: false
    		}
			if (this.selected_type === "1") {
				this.simple_credits.push(new_credit);	 
			} else if (this.selected_type === "2") {
				this.revolving_credits.push(new_credit);	  
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
	          self.setRevolvingLine();
	          self.setSimpleLine();
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

	    setRLFromOperType: function(event, id) {
	    	console.log('setRLFromOperType');
	    	console.log(event);  // event.target.value to get selected value
	    	console.log(id);
	    	if (event.target.value === "1") {
	    		this.revolving_credits.find(item => item.id_local === id).sugerido = 0;	
	    	}	    	
	    	this.setRevolvingLine("");
	    	
	    },

	    setSLFromOperType: function(event, id) {
	    	console.log('setFLFromOperType');
	    	console.log(event);  // event.target.value to get selected value
	    	console.log(id);
	    	if (event.target.value === "1") {
	    		this.simple_credits.find(item => item.id_local === id).sugerido = 0;	
	    	}	    	
	    	this.setSimpleLine("");
	    	
	    },

	    setRevolvingLine: function (val) {
	    	console.log('SET-REVOLVING-LINE');
	    	console.log(val);
	    	var new_revolving_credits = this.revolving_credits.filter(item => item.tipo_operacion === "3" );
	    	var incr_revolving_credits = this.revolving_credits.filter(item => item.tipo_operacion === "2" );
	    	console.log(new_revolving_credits);

	    	if (val === null || val === "") {	    			
	    		var cumulative_revolving_line = this.linea_revolvente;  
    		} else {
    			var cumulative_revolving_line = val;	    			
    		}

	    	if (incr_revolving_credits.length > 0) {
    			while (cumulative_revolving_line > 0) {
    				var incr_rev_credit = incr_revolving_credits.shift();
    				if (typeof incr_rev_credit === 'undefined') break;
    				var suggested_amount = Math.min(incr_rev_credit.monto, cumulative_revolving_line);
    				incr_rev_credit.sugerido = suggested_amount;
    				cumulative_revolving_line -= suggested_amount;
    			}
	    	}

	    	if (new_revolving_credits.length > 0) {
	    		
	    		var total_new_revolving_solicited = new_revolving_credits.map(nc => parseFloat(nc.monto)).reduce((a,b)=>a+b);    		

	    		if (total_new_revolving_solicited<=cumulative_revolving_line) {
	    			for (var i=0; i<new_revolving_credits.length;i++) {
	    				new_revolving_credits[i].sugerido = new_revolving_credits[i].monto;  
	    			}
	    		} else {
	    			for (var i=0; i<new_revolving_credits.length;i++) {
	    				
	    				new_revolving_credits[i].sugerido = Math.round( (new_revolving_credits[i].monto / total_new_revolving_solicited) * cumulative_revolving_line/ 10) * 10;  // (new_revolving_credits[i].monto / total_revolving_solicited) * cumulative_revolving_line;  
	    			}
	    		}

	    	} else {
	    		for (var i=0; i<this.revolving_credits.length;i++) {
	    				this.revolving_credits[i].sugerido = 0;  
	    		}
	    	}
	    },

	    setSimpleLine: function (val) {
	    	console.log('SET-SIMPLE-LINE');
	    	console.log(val);

	    	var new_simple_credits = this.simple_credits.filter(item => item.tipo_operacion === "3");
	    	console.log(new_simple_credits);

	    	if (new_simple_credits.length > 0) {
	    		console.log('meh');
	    		var total_simple_solicited = new_simple_credits.map(nc => parseFloat(nc.monto)).reduce((a,b)=>a+b);
	    		console.log(total_simple_solicited);
	    		if (val === null || val === "") {	    			
		    		var cumulative_simple_line = this.linea_simple;  
	    		} else {
	    			var cumulative_simple_line = val;	    			
	    		}

	    		if (total_simple_solicited<=cumulative_simple_line) {
	    			for (var i=0; i<new_simple_credits.length;i++) {
	    				new_simple_credits[i].sugerido = new_simple_credits[i].monto;  
	    			}
	    		} else {
	    			for (var i=0; i<new_simple_credits.length;i++) {

	    				new_simple_credits[i].sugerido = Math.round( (new_simple_credits[i].monto / total_simple_solicited) * cumulative_simple_line/ 10) * 10;  // (new_simple_credits[i].monto / total_simple_solicited) * cumulative_simple_line;  
	    			}
	    		}    		  		
	    	} else {
	    		for (var i=0; i<this.simple_credits.length;i++) {
	    				this.simple_credits[i].sugerido = 0;  
	    		}
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
			console.log('changing simple creds');
			// this.setSimpleLine("");
			this.$emit('smpl-credits-change', val);
		},
		revolving_credits: function(val) {
			console.log('changing revo creds');
			// this.setRevolvingLine("");
			this.$emit('rvlg-credits-change', val);
		}
		
	}
});