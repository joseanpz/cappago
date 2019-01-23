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
  					<div v-if="account_statements.length">
	  					<div class="columns" > \
	  						<div class="column">\
	  							<h5 class="title is-5">Créditos Simples </h5>
	  							<b-field v-for="credit in simple_credits" label="Monto Solicitado"> \
	  								<b-input type="number" step="0.01" v-model="credit.amount"></b-input> \
	  								<a class="button" @click="deleteCredit(credit.id)"> \
	    								Borrar credito \
	  								</a> \
	  							</b-field> \	  							
	  						</div> \
	  						<div class="column"> \	  							
	  							<b-field v-for="credit in revolving_credits" label="Monto"> \
	  								<b-input type="number" step="0.01" v-model="credit.amount"></b-input> \
	  								<b-input type="number" step="0.01" v-model="credit.term"></b-input> \
	  								<a class="button" @click="deleteCredit(credit.id)">\
	    								Borrar credito \
	  								</a> \
	  							</b-field> \	  							
	  						</div>\	  						
	  					</div>	  					
  					</div> \
				</section> `,

	data () {
		return {
			credits_count: 0,
			selected_type: null,
			solicited_credits: [],
		}
	},
	methods: {
		addCredit: function () {
			this.solicited_credits.find(elm => elm.id == id).statements.push({
		    	id: this.credits_count,
	    		type: this.selected_type,
	    		amount: null,
	    		term: null
	    	});
	    	this.credits_count++;
		},
		deleteCredit: function(id) {
	    	var index = this.solicited_credits.indexOf(this.solicited_credits.find(elm => elm.id == id));
	        if (index >= 0) this.solicited_credits.splice(index, 1);
	    },
	},
	computed: {
		simple_credits: function() {
			return this.solicited_credits.filter(credit => credit.type === 1);
		},
		revolving_credits: function() {
			return this.solicited_credits.filter(credit => credit.type === 2);
		},
	},
	watch: {
		solicited_credits: function(val) {
			this.$emit('sol-credits-change', val);
		}
	}
});