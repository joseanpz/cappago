var SaldosDepositosStep = Vue.component('saldos-depositos-step',{
	props: ["bank_list", "id_solicitud"],
	template: `
		<section> 		
			<div class="columns">
				<div  class="column is-2">
					<label class="label titulos">Seleccione un Banco</label>
				</div>
				<div class="column is-2">
 					<b-select placeholder="Select a name" v-model="selected_bank"> 
						<option 
						v-for="bank in banks" 
						:value="bank.id" 
						:key="bank.id" 
						> 
							{{ bank.nombre}} 
						</option> 
					</b-select> 
                      
				</div>
				<div class="column is-2">
					<a class="button is-info is-outlined" @click="addAccountStetment">
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
					<div class="column" v-for="acc_smnt in account_statements" :key="acc_smnt.id_local">
						<div v-bind:class="{ 'is-6': account_statements.length===1 }" class="card column">
							<header class="header-sec-card" >
								<p class="card-header-title title-color">{{acc_smnt.bank_name}}</p>
							</header>  

							<div class="card-content"> 
								<div class="columns">
									<label class="label_color column is-2" >Meses</label>
									<label class="label_color column" >Depositos</label>
									<label class="label_color column" >Saldos</label>
								</div>
								<div class="content">
									<b-field v-for="statement in acc_smnt.statements" :key="statement.id_local">
									<div class="columns">
										<label class="lbl_months column is-2">{{statement.mes}}</label>
										<b-input type="number" class="column" step="0.01" v-model="statement.deposito"></b-input> &nbsp
										<b-input type="number" class="column" step="0.01" v-model="statement.saldo"></b-input>
									</div>
									</b-field>
								</div>
							</div>
							<footer class="card-footer">
								<!--<a class="card-footer-item" @click="addStatement(acc_smnt.id_local)">Agregar registro</a> -->
								<a class="card-footer-item button is-danger is-outlined" @click="deleteAccountStatement(acc_smnt.id_local)">Borrar banco</a>
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
    		banks: []
		}
	},
	computed: {
		selected_bank_name : function () {
			var bank_selected = this.banks.find(bank => bank.id === this.selected_bank);
			return bank_selected.nombre;
		}
	}, 
	created: function () {
		this.readBanks();
	},

	filters: {
		pretty: function(value) {
			console.log('pretty');
			console.log(value);
			return JSON.stringify(value, null, 2);
		}
	},
	components: {
		
	},
	methods: {

		readBanks: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
            	
              	console.log(response);
              	self.banks = response.records;
            })
            .withFailureHandler(function(err){
            	console.log('An error ocurred while fetching banks!')
              	console.log(err);
            })
            .readCatalog('banco')
        },
	    addAccountStetment: function () {
	    	console.log("adding acc statement");
	    	console.log(this.account_statements);
	    	var count = this.acc_stmnt_count;
	    	var statements = this.loadStatements(12);
	    	if (this.account_statements.length < 3) {
	    		this.acc_stmnt_count++;
	    		this.account_statements.push({
	        		id_local: count,
    				bank_name: this.selected_bank_name,
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
	    				id: null,
			    		id_local: i,
			    		id_solicitud: this.id_solicitud,
			    		id_banco: this.selected_bank,
		    			mes: '2019-01',
		    			deposito: null,
		    			saldo: null
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