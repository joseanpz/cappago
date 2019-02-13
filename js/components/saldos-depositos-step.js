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
					<a class="button is-info is-outlined" @click="addAccountStatment">
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
										<b-input type="number" class="column" step="0.001"  v-model="statement.deposito"></b-input> &nbsp
										<b-input type="number" class="column" step="0.001" v-model="statement.saldo"></b-input>
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
            	console.log('Reading banks!')
              	console.log(response);
              	self.banks = response.records;
              	if (typeof self.id_solicitud != 'undefined' && !!self.id_solicitud) {
					self.readAccountStatments();	
				}
            })
            .withFailureHandler(function(err){
            	console.log('An error ocurred while fetching banks!')
              	console.log(err);
            })
            .readCatalog('banco')
        },

	    addAccountStatment: function () {
	    	console.log("adding acc statement");
	    	
	    	var count = this.acc_stmnt_count;
	    	var statements = this.loadStatements(12);

	    	// console.log(statements);

	    	// if () {

	    	// }
			
	    	if (this.account_statements.length < 3) {
	    		for ( var i=0; i<this.account_statements.length; i++) {
					if (this.selected_bank === this.account_statements[i].bank_id) {
						alert("Por favor elija otro banco que no haya seleccionado anteriormente");
						return;
					}
				}
	    		this.acc_stmnt_count++;
	    		this.account_statements.push({
	        		id_local: count,
	        		bank_id: this.selected_bank,
    				bank_name: this.selected_bank_name,
    				statements: statements
    			});    			
	    	} else {
	    		alert("No puede elegir más de tres bancos.");
	    	}
	    	//console.log('meh');
	    	//console.log(this.account_statements[0]);	        
	    },

	    readAccountStatments: function () {
			var self = this;
	        google.script.run
	        .withSuccessHandler(function(response){
				console.log('Reading saldos depositos');
				console.log(response);
				self.setAccountStatments(response.records);  // solicitud.numero_solicitud = response.numero_solicitud;
	        })
	        .withFailureHandler(function(err){
				console.log('An error ocurred while reading saldos depositos');
				console.log(err);
	        })
	        .readFKRelation('deposito_saldo', 'id_solicitud', this.id_solicitud);
		},

		setAccountStatments: function (records) {

			var l = records.length;
			if (l > 0) {
				this.account_statements.push({
					id_local: this.acc_stmnt_count,
					bank_id: records[0].id_banco,
					bank_name: this.banks.find(bank => bank.id === records[0].id_banco).nombre,
					statements: [records[0]]

				});
				this.acc_stmnt_count +=1;


				for( var i=1; i<l; i++) {
					var record = records[i];
					var bank_exist = false;
					for (var j=0; j < this.account_statements.length; j++) {
						if (record.id_banco === this.account_statements[j].bank_id) {
							this.account_statements[j].statements.push(record)
							bank_exist = true;
							break;
						}
					}
					if (!bank_exist) {
						this.account_statements.push({
							id_local: this.acc_stmnt_count,
							bank_id: record.id_banco,
							bank_name: this.banks.find(bank => bank.id === record.id_banco).nombre,
							statements: [record]
						});
						this.acc_stmnt_count +=1
					}
				}
			}

			
			
		},
	    /*addStatement: function(id) {

	    	if (this.account_statements.find(elm => elm.id == id).statements.length < 12) {
		    	this.account_statements.find(elm => elm.id == id).statements.push({
		    		id: this.acc_stmnt_count,
	    			month: null,
	    			deposits: null,
	    			balance: null
	    		});
	    		this.acc_stmnt_count++;
	    	}	
	    },*/

	    deleteAccountStatement: function(id) {
	    	var self = this;

	    	var account_statement = this.account_statements.find(elm => elm.id_local == id);
	    	var first_statemnt = account_statement.statements.find(elm => elm.id_local == 0);
	    	var index = this.account_statements.indexOf(account_statement);
	    	//console.log('deleting deposits');
	    	//console.log(index);
	    	//console.log(this.account_statements);
	    	console.log(account_statement);
	    	console.log(first_statemnt);
	        

	        if (!!first_statemnt.id) {
	        	google.script.run
				.withSuccessHandler(function(response){
					console.log('Deleting depositos_saldos response!');
					console.log(response);
					//self.solicitud.id = response.id;
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while deleting credito')
					console.log(err);
					alert("Ha ocurrido un error al intentar borrar los registro. Por favor intente de nuevo.");
					self.account_statements.push(account_statement);
				})
				.deleteRows('deposito_saldo', first_statemnt.id, 12);
	        }
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
		    			mes: this.getdate(i),
		    			deposito: 0,
		    			saldo: 0,
		    			synced: false
		    		});
	    	  	}
	    	return stmnts; 
	    },
	    getdate:function(i){
	    	var fechaAct = new Date();
	    	fechaAct = new Date(fechaAct.getFullYear(), fechaAct.getMonth() - 11, 0); 	    	
	    	var nuevafecha =  new Date(new Date(fechaAct.getFullYear(), fechaAct.getMonth() +i,1)).toJSON().slice(0,7);
	    	return nuevafecha;
	    },
	    save: function () {
	    	console.log('thrid marker');
	    	var to_be_created = [], to_be_updated = [];
	    	for (var i=0; i < this.account_statements.length; i++ ) {
	    		var statement = this.account_statements[i];
				console.log("statement");
	    		console.log(statement);
	    		for ( var j=0; j<statement.statements.length; j++) {
	    			//console.log(this.account_statements[i].statements[j])
	    			if (!statement.statements[j].id) {
	    				to_be_created.push(this.account_statements[i].statements[j]);
	    			} else {
	    				to_be_updated.push(this.account_statements[i].statements[j]);
	    			}
	    		}
	    	}
	    	console.log('to be created');
	    	console.log(to_be_created);
	    	console.log('to be updated');
	    	console.log(to_be_updated);
	    	if (to_be_created.length > 0) {
	    		google.script.run
				.withSuccessHandler(function(response){
					// TODO: handle different success response
					console.log('Creating "saldo_deposito"!')
					console.log(response);
					for (var l=0; l<to_be_created.length; l++) {
						to_be_created[l].id = response[l].id;
						to_be_created[l].synced = true;
					}
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while creating a "saldo_deposito"!')
					console.log(err);
				})
				.bulkCreate('deposito_saldo', to_be_created);
	    	}

	    	if (to_be_updated.length > 0) {
	    		google.script.run
				.withSuccessHandler(function(response){
					// TODO: handle different success response
					console.log('Updating "saldo_deposito"!')
					console.log(response);
					for (var l=0; l<to_be_updated.length; l++) {
						to_be_updated[l].synced = response[l];
					}
				})
				.withFailureHandler(function(err){
					console.log('An error ocurred while updating a "saldo_deporito"!')
					console.log(err);
				})
				.bulkUpdate('deposito_saldo', to_be_updated);
	    	}    	
	    },

	    findLineByLeastSquares: function(values_x, values_y) {
			var sum_x = 0;
			var sum_y = 0;
			var sum_xy = 0;
			var sum_xx = 0;
			var count = 0;

			/*
			 * We'll use those variables for faster read/write access.
			 */
			var x = 0;
			var y = 0;
			var values_length = values_x.length;

			if (values_length != values_y.length) {
				throw new Error('The parameters values_x and values_y need to have same size!');
			}

			/*
			* Nothing to do.
			*/
			if (values_length === 0) {
				return [ [], [] ];
			}

			/*
			 * Calculate the sum for each of the parts necessary.
			 */
			for (var v = 0; v < values_length; v++) {
				x = values_x[v];
				y = values_y[v];
				sum_x += x;
				sum_y += y;
				sum_xx += x*x;
				sum_xy += x*y;
				count++;
			}

			/*
			 * Calculate m and b for the formula:
			 * y = x * m + b
			 */
			var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
			var b = (sum_y/count) - (m*sum_x)/count;

			return [m, b]
		},

	},
	watch: {
		account_statements: function(val) {
			this.$emit('acc-statements-change', val);
		}
	}
});