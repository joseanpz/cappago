var CreditoStep = Vue.component('credito-step',{
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
								<select v-model="garantia" id="garantia" class="select">
									<option value="0" selected>--Seleccione--</option>
									<option value="1">Fondo</option>
									<option value="2">Hipotecaria</option>
									<option value="3">Líquidas</option>
									<option value="4">Personal</option>
									<option value="5">Prendaria</option>
								</select>
							</div>
						</div>				
					</div>
					<div class="columns">
		              	<div  class="column is-2">
		                  <label class="label titulos">Tipo de crédito</label>
		              	</div>
		              	<div class="column is-2">
			                <b-select class="select" placeholder="Select a name" v-model="selected_type">
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
		            				<label class="label_color" >Monto Solicitado</label>
										<b-field v-for="credit in revolving_credits" :key="credit.id"> 
		  								<b-input type="number" step="0.01" v-model="credit.amount" style="width:80%;"></b-input> &nbsp
		  								<a class="button is-danger is-outlined "  style="justify-content: center;" @click="deleteCredit(credit.id, 'revolvente')">
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
								<header class="header-sec-card" >
									<p class="card-header-title title-color">Créditos Simple </p>
								</header>
								 <div class="card-content">                     
		                		<div class="content"> 	
		                		<div class="columns">
		                			<label class="label_color column is-5"  >Monto solicitado</label>
		            				<label class="label_color column is-5" >Plazo</label>
		            				<div class="column"></div>					
		                		</div>                		
		  							<b-field v-for="credit in simple_credits"  :key="credit.id"> 
		  								<div class="columns">
			  								<b-input type="number" step="0.01"  v-model="credit.amount" class="column is-5"></b-input> &nbsp
			  								<b-input type="number" step="0.01"  v-model="credit.term" class="column is-5"></b-input> &nbsp
			  								<a class="button is-danger is-outlined"  @click="deleteCredit(credit.id, 'simple')">
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

	methods: {
		addCredit: function () {
			if (this.selected_type === "1") {
				this.simple_credits.push({
		    		id: this.credits_count,
	    			type: this.selected_type,
	    			amount: null,
	    			term: null
	    		});	 
			} else if (this.selected_type === "2") {
				this.revolving_credits.push({
		    		id: this.credits_count,
	    			type: this.selected_type,
	    			amount: null,
	    			term: null
	    		});	  
			}
			console.log(this.selected_type);
			console.log(this.revolving_credits);
			console.log(this.simple_credits);
			  	
	    	this.credits_count++;
		},
		deleteCredit: function(id, crd_type) {
			if (crd_type === 'simple') {
				var index = this.simple_credits.indexOf(this.simple_credits.find(elm => elm.id == id));
	        	if (index >= 0) this.simple_credits.splice(index, 1);
				 
			} else if (crd_type === 'revolvente') {
				var index = this.revolving_credits.indexOf(this.revolving_credits.find(elm => elm.id == id));
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