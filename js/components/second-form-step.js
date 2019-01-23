Vue.use(VueJsonPretty);
const SecondFormStep = Vue.component('second-form-step', {
	props: ["bank_list"],
	template: `<section> \
					<b-field label="Seleccione Banco"> \
            			<b-select placeholder="Select a name" v-model="selected_bank"> \
                			<option \
                    		v-for="option in bank_list" \
                    		:value="option" \
                    		:key="option" > \
                   				{{ option}} \
                			</option> \
            			</b-select> \
            		</b-field> \
            		<a class="button is-medium" @click="addAccountStetment">\
    					Agregar \
  					</a> \
  					<div v-if="account_statements.length">
	  					<div class="columns" > \
	  						<div class="column" v-for="acc_smnt in account_statements" :key="acc_smnt.id">\
	  							{{acc_smnt.bank_name}}\
	  							<b-field v-for="statement in acc_smnt.statements" :key="statement.id"> \
	  								<b-input type="number" step="0.01" v-model="statement.deposits"></b-input> \
	  								<b-input type="number" step="0.01" v-model="statement.balance"></b-input> \
	  							</b-field> \
	  							<a class="button" @click="addStatement(acc_smnt.id)">\
	    							Agregar registro \
	  							</a> \
	  							<a class="button" @click="deleteAccountStatement(acc_smnt.id)">\
	    							Borrar banco \
	  							</a> \
	  						</div>\	  						
	  					</div>	  					
	  					
  					</div> \
  					
				</section> `,
	data () {
		return {
			acc_stmnt_count: 0,
			account_statements: [],
    		selected_bank: null,
		}
	},
	filters: {
    pretty: function(value) {
    	console.log('pretty');
    	console.log(value);
      return JSON.stringify(value, null, 2);
    }
  },
	components: {
		VueJsonPretty,
	},
	methods: {
	    addAccountStetment: function () {
	    	console.log("adding acc statement");
	    	console.log(this.account_statements);
	    	var count = this.acc_stmnt_count;
	    	var statements = this.loadStatements(12);
	    	if (this.account_statements.length < 3) {
	    		this.acc_stmnt_count++;
	    		this.account_statements.push({
	        		id: count,
    				bank_name: this.selected_bank,
    				statements: statements
    			});    			
	    	}	        
	    },
	    addStatement: function(id) {

	    	if (this.account_statements.find(elm => elm.id == id).statements.length < 12) {
		    	this.account_statements.find(elm => elm.id == id).statements.push({
		    		id: this.acc_stmnt_count,
	    			month: null,
	    			deposits: null,
	    			balance: null
	    		});
	    		this.acc_stmnt_count++;
	    	}	
	    },
	    deleteAccountStatement: function(id) {
	    	var index = this.account_statements.indexOf(this.account_statements.find(elm => elm.id == id));
	        if (index >= 0) this.account_statements.splice(index, 1);
	    },
	    loadStatements: function (n) {
	    	var stmnts = []
	    	for (var i = 0; i < n; i++) {
	    			stmnts.push({
			    		id: i,
		    			month: null,
		    			deposits: null,
		    			balance: null
		    		});
	    	  	}
	    	return stmnts;
	    }
	},
	watch: {
		account_statements: function(val) {
			this.$emit('acc-statements-change', val);
		}
	}
});


/*

*/