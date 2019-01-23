const ThirdFormStep = Vue.component('third-form-step', {
	template: ` <section> \
					<b-field label="Tipo de crédito"> \
            			<b-select placeholder="Select a name" v-model="selected_type"> \
                			<option value="1" > Simple </option> \
                			<option value="2" > Revolvente </option>
            			</b-select> \
            		</b-field> \
            		<a class="button is-medium" @click="addCredit">\
    					Agregar Crédito \
  					</a> \
  					
	  				<div class="columns" > \
	  					<div v-if="revolving_credits.length">
	  						<div class="column">\
	  							<h5 class="title is-5">Créditos Revolvente </h5>
	  							<b-field v-for="credit in revolving_credits" label="Monto Solicitado" :key="credit.id"> \
	  								
		  								<b-input type="number" step="0.01" v-model="credit.amount"></b-input> \
		  								<a class="button" @click="deleteCredit(credit.id, 'revolvente')"> \
		    								Borrar credito \
		  								</a> \
		  							
	  							</b-field> \	  							
	  						</div> \
	  					</div>
	  					<div v-if="simple_credits.length">
	  						<div class="column"> \
	  							<h5 class="title is-5">Créditos Simple </h5>  							
	  							<b-field v-for="credit in simple_credits" label="Monto Solicitado - Plazo" :key="credit.id"> \
	  								
		  								<b-input type="number" step="0.01" v-model="credit.amount"></b-input> \
		  								<b-input type="number" step="0.01" v-model="credit.term"></b-input> \
		  								<a class="button" @click="deleteCredit(credit.id, 'simple')">\
		    								Borrar credito \
		  								</a> \
	  								
	  							</b-field> \	  							
	  						</div>\	
	  					</div>  						
	  				</div>	  					
  					
				</section> `,

	data () {
		return {
			credits_count: 0,
			selected_type: null,
			simple_credits: [],
			revolving_credits: [],
			//solicited_credits: [],
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
		simple_credits: function(val) {
			this.$emit('smpl-credits-change', val);
		},
		revolving_credits: function(val) {
			this.$emit('rvlg-credits-change', val);
		}
	}
});