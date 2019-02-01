var CreditoStep = Vue.component('credito-step',{
	props:['id_solicitud'],
	template: `
		<section class="container formulario">
			<div class="columns">
				<div class="column">
					<div class="column">
						<label class="label">Garantia: </label>
						<input type="text" v-model="garantia" id="garantia"  class="input"/>
					</div>
					<div class="column">
						<label class="label">Destino credito: </label>
						<input type="text" v-model="destino_credito" class="input" />
					</div>
				</div>
			</div>
			<div class="columns">
              	<div  class="column is-2">
                  <b-field label="Tipo de crédito"></b-field>
              	</div>
              	<div class="column is-2">
	                <b-select placeholder="Select a name" v-model="selected_type">
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
	        <hr/>  					
			<div class="columns" >
				<div v-if="revolving_credits.length" class="column is-5">
					<div class="column card ">
						<header class="card-header" >
                	<p class="card-header-title title-color">Créditos Revolvente</p>
              		</header>
					<div class="card-content">                     
                		<div class="content">
            				<label class="label_color" >Monto Solicitado</label>
								<b-field v-for="credit in revolving_credits" :key="credit.id_local"> 
  								<b-input type="number" step="0.01" v-model="credit.monto" style="width:80%;"></b-input> &nbsp
  								<a class="button is-danger is-outlined "  style="justify-content: center;" @click="deleteCredit(credit.id_local, 'revolvente')">
								    <span>Borrar</span>
								    <span class="icon is-small">
								      <i class="fas fa-times"></i>
								    </span>
								 </a>			 
								</b-field>
							</div>	 	
						</div>	 			
					</div> 
				</div>

				<div v-if="simple_credits.length" class="column is-7">
					<div class="column card"> 
						<header class="card-header" >
							<p class="card-header-title title-color">Créditos Simple </p>
						</header>
						 <div class="card-content">                     
                		<div class="content"> 	
                		<div class="columns">
                			<label class="label_color column is-5"  >Monto solicitado</label>
            				<label class="label_color column is-5" >Plazo</label>
            				<div class="column"></div>					
                		</div>                		
  							<b-field v-for="credit in simple_credits"  :key="credit.id_local"> 
  								<div class="columns">
	  								<b-input type="number" step="0.01"  v-model="credit.monto" class="column is-5"></b-input> &nbsp
	  								<b-input type="number" step="0.01"  v-model="credit.plazo" class="column is-5"></b-input> &nbsp
	  								<a class="button is-danger is-outlined"  @click="deleteCredit(credit.id_local, 'simple')">
									    <span >Borrar</span>
									    <span class="icon is-small">
									      <i class="fas fa-times"></i>
									    </span>
									</a>
								</div>
  							</b-field> 
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
			console.log(this.selected_type);
			console.log(this.revolving_credits);
			console.log(this.simple_credits);
			  	
	    	this.credits_count++;
		},
		saveCredit: function (self, k, delay, m, n) {

			var that = self;
			console.log('saveCredit')

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
					console.log('Updating response!')
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
				console.log(k);				
				setTimeout(function() {self.saveCredit(self, k, delay, m, n);}, delay)
			}

		},
		saveCredits: function () {
			var self = this;
			var m = self.simple_credits.length;
			var n = self.revolving_credits.length
			
			setTimeout(function(){self.saveCredit(self, 0, 500, m, n)});  // 50 ms data corruption

			//for (var i = 0; i < this.simple_credits.length; i++) {
			//	setTimeout(function() {self.saveCredit(self.simple_credits[i])}, (i+1) * 1000); // output: hello
			//}

			//for (var j = 0; j < this.revolving_credits.length; j++) {
			//	setTimeout(function() {self.saveCredit(self.revolving_credits[j])}, (j+1) * 1000); // output: hello
			//}
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