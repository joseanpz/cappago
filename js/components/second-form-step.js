Vue.use(VueJsonPretty);
const SecondFormStep = Vue.component('second-form-step', {
	props: ["bank_list"],
	template: '<section> \
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
  					<div class="columns" v-if="account_statements.length"> \
  						<div class="column" v-for"acc_smnt in account_statements" :key="acc_smnt.id">\
  							<b-field v-for="statement in acc_smnt.statements" :key="statement.id"> \
  								<b-input v-model="statement.deposits"></b-input> \
  								<b-input v-model="statement.balance"></b-input> \
  							</b-field> \
  							<a class="button" @click="addStatement(acc_smnt.id)">\
    							Agregar registro \
  							</a> \
  						</div>\
  					</div> \
				</section> ',
	data () {
		return {
			acc_stmnt_count: 0,
			account_statements: [],
    		selected_bank: null,
		}
	},
	methods: {
	    addAccountStetment: function () {
	    	console.log("adding acc statement");
	    	console.log(this.account_statements);
	        this.account_statements.push({
	        	id: this.acc_stmnt_count,
    			bank_name: this.selected_bank,
    			statements: []
    		});
    		this.acc_stmnt_count++;
	    },
	    addStatement: function(id) {
	    	this.account_statements[index].statements.find(elm => elm.id == id).push({
	    		id: this.acc_stmnt_count,
    			month: null,
    			deposits: null,
    			balance: null
    		});
    		this.acc_stmnt_count++;
	    }
	}
});


/*
*/