Vue.use(VueJsonPretty);
const SecondFormStep = Vue.component('second-form-step', {
	props: ["bank_list"],
	template: `<section> 
                <div class="columns">
                  <div  class="column is-2">
                      <b-field label="Seleccione un Banco"></b-field>
                  </div>
                  <div class="column is-2">
                      <b-select placeholder="Select a name" v-model="selected_bank"> 
                        <option 
                          v-for="option in bank_list" 
                          :value="option" 
                          :key="option" > 
                            {{ option}} 
                        </option> 
                      </b-select> 
                      
                  </div>
                  <div class="column is-2">
                  <a class="button is-light" @click="addAccountStetment">
                      <span class="icon is-small">
                        <i class="fas fa-check"></i>
                      </span>
                      <span>Agregar</span>
                  </a>
                  </div>
                </div>
                <hr/>

  					<div v-if="account_statements.length">
	  					<div class="columns" >
	  						<div class="column" v-for="acc_smnt in account_statements" :key="acc_smnt.id">
	  							<div v-bind:class="{ 'is-6': account_statements.length===1 }" class="card column">
                      <header class="card-header">
                        <p class="card-header-title title-color">{{acc_smnt.bank_name}}</p>
                      </header>  
                      <div class="card-content">
                        <div class="content">
        	  							<b-field v-for="statement in acc_smnt.statements" :key="statement.id">
        	  								<b-input type="number" step="0.01" v-model="statement.deposits"></b-input>
        	  								<b-input type="number" step="0.01" v-model="statement.balance"></b-input>
        	  							</b-field>
                        </div>
                      </div>
                      <footer class="card-footer">
                        <a class="card-footer-item" @click="addStatement(acc_smnt.id)">Agregar registro</a>
                        <a class="card-footer-item" @click="deleteAccountStatement(acc_smnt.id)">Borrar banco</a>
                      </footer>
                  </div>
	  						</div>						
	  					</div>	  						
  					</div> 
  					
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