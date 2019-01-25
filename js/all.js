const DataTable = Vue.component('data-table', {
  // props:  ['data', 'columns', 'isPaginated', 'isPaginationSimple', 
  // 'defaultSortDirection', 'currentPage', 'perPage'],
  //template: '<span>Test</span>'
  template: `    
    <section>
        <b-field grouped group-multiline>
            <b-select v-model="defaultSortDirection">
                <option value="asc">Default sort direction: ASC</option>
                <option value="desc">Default sort direction: DESC</option>
            </b-select>
            <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
            <div class="control">
                <button class="button" @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</button>
            </div>
            <div class="control is-flex">
                <b-switch v-model="isPaginated">Paginated</b-switch>
            </div>
            <div class="control is-flex">
                <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
            </div>
        </b-field>

        <b-table
            :data="data"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            default-sort="user.first_name">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" sortable numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="user.first_name" label="First Name" sortable>
                    {{ props.row.user.first_name }}
                </b-table-column>

                <b-table-column field="user.last_name" label="Last Name" sortable>
                    {{ props.row.user.last_name }}
                </b-table-column>

                <b-table-column field="date" label="Date" sortable centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column>

                <b-table-column label="Gender">
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                </b-table-column>
                <b-table-column label="Acciones">
                    <router-link :to="{ name: 'evaluaciones-detalle', params: { id: props.row.id }}">
	                    <a class="button btn_detalles"  title="Detalles">
						    <span class="icon">
						      <i class="far fa-clipboard"></i>
						    </span>
						   
						 </a>
                    </router-link>
                    <router-link :to="{ name: 'reevaluar', params: { id: props.row.id }}">
	                    <a class="button btn_editar"  title="Editar">
						    <span class="icon">
						      <i class="far fa-edit"></i>
						    </span>
						 </a>
                    </router-link>
                </b-table-column>
            </template>
        </b-table>
    </section>`,
  data() {
		return {
		  data: [
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'user': { 'first_name': 'Clarence', 'last_name': 'Flores' }, 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'user': { 'first_name': 'Anne', 'last_name': 'Lee' }, 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' }
                
              ],
          columns: [
                {
                field: 'id',
                label: 'ID',
                width: '40',
                numeric: true
                },
                {
                field: 'first_name',
                label: 'First Name',
                },
                {
                field: 'last_name',
                label: 'Last Name',
                },
                {
                field: 'date',
                label: 'Date',
                centered: true
                },
                {
                field: 'gender',
                label: 'Gender',
                },
                {
                field: 'Acciones',
                label: 'Acciones',
                }
            ],
          isPaginated: true,
          isPaginationSimple: false,
          defaultSortDirection: 'asc',
          currentPage: 1,
          perPage: 5  
		}
	}   
})
Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);

const FirstFormStep = Vue.component('first-form-step', {
	template: ' <section>\
					<h4 class="title is-5">¿Cómo se desea comprobar los ingresos y flujos mensuales de la solicitud?</h4> \
					<div class="columns">\
					<div class="column is-half"> \
					    <b-radio v-model="evaluation_type" size="is-medium" \
					        native-value="account_statements"> \
					        Estados de Cuenta \
					    </b-radio> \
					</div> \
					<div class="column is-half"> \
					    <b-radio v-model="evaluation_type" size="is-medium" class="form-color" \
					        native-value="financial_statements"> \
					        Estados Financieros  \
					    </b-radio> \
					</div> \
					</div>\
					<p class="content"> \
					<br>\
					    <b>Selection:</b> \
					    {{ evaluation_type }} \
					</p> \
				</section> ',
	data () {
		return {
			evaluation_type: "account_statements",
			model: {
				radio: "Jack",
			}
		}
	},

	watch: {
		evaluation_type: function (val) {
			this.$emit('eval-type-change', val);
		}
	}
});

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
	  						<div class="column" v-for="acc_smnt in account_statements" :key="acc_smnt.id">
	  							<div v-bind:class="{ 'is-6': account_statements.length===1 }" class="card column">
                      <header class="card-header" >
                        <p class="card-header-title title-color">{{acc_smnt.bank_name}}</p>
                      </header>  
                      <div class="card-content">                     
                        <div class="content">
                        <label class="label_color" style="padding-left:20%;">Depositos</label>
                        <label class="label_color" style="padding-right:25%; float:right;">Saldos</label>

        	  							<b-field v-for="statement in acc_smnt.statements" :key="statement.id">
                            <label class="lbl_months">{{statement.month}}</label>
        	  								<b-input type="number" step="0.01" v-model="statement.deposits"></b-input>
        	  								<b-input type="number" step="0.01" v-model="statement.balance"></b-input>
        	  							</b-field>
                        </div>
                      </div>
                      <footer class="card-footer">
                        <!--<a class="card-footer-item" @click="addStatement(acc_smnt.id)">Agregar registro</a> -->
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
		    			month: '2019-01',
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
const ThirdFormStep = Vue.component('third-form-step', {
	template: ` <section> \
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
		  								<b-field v-for="credit in revolving_credits" label="Monto Solicitado" :key="credit.id"> \
		  								
			  								<b-input type="number" step="0.01" v-model="credit.amount"></b-input>
			  								<a class="button is-danger is-outlined" @click="deleteCredit(credit.id, 'revolvente')">
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
			  							<b-field v-for="credit in simple_credits" label="Monto Solicitado - Plazo" :key="credit.id"> 
			  								<b-input type="number" step="0.01" v-model="credit.amount"></b-input>
			  								<b-input type="number" step="0.01" v-model="credit.term"></b-input>
			  								<a class="button is-danger is-outlined" @click="deleteCredit(credit.id, 'simple')">
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
const FourthFormStep = Vue.component('fourth-form-step', {
	template: '<section> \
					<div class="columns"> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				    </div> \
				    <div class="columns"> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				    </div> \
				    <div class="columns"> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				        <b-field label="Name" class="column"> \
				            <b-input type="number"></b-input> \
				        </b-field> \
				    </div> \
				</section> ',

	data () {
		return {
			model: {

			}
		}
	}
});
Vue.use(VueFormWizard);


const EvalFormWizard = Vue.component('eval-form', {
	template: `<form-wizard @on-complete="onComplete" \
	             subtitle="subtitulo" nextButtonText="Siguiente" \
	            backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" \
	            color="#3a5fab"  errorColor="#8b0000" shape="circle" transition="" \
	            > \
	             <h1 slot="title">Evaluación</h1> \
	             <tab-content title="Personal details" icon="" :before-change="beforeTabSwitch"> \
			        <first-form-step v-on:eval-type-change="setEvalType"></first-form-step>\
			        <p class="content"> \
					    <b>Selection:</b> \
					    {{ evaluation_type }} \
					</p> \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       	<second-form-step :bank_list="bank_list" v-on:acc-statements-change="setAccountStatements"></second-form-step> \
			       	<!--<pre>{{ account_statements | pretty }}</pre>--> 
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       <third-form-step v-on:smpl-credits-change="setSimpleCredits" v-on:rvlg-credits-change="setRevolvingCredits" ></third-form-step> \
			       <pre>{{ solicited_credits | pretty }}</pre>
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       <fourth-form-step></fourth-form-step> \
			     </tab-content> \
			     <tab-content title="Last step"> \
			       <fourth-form-step></fourth-form-step> \
			     </tab-content> \
			     <template slot="footer" slot-scope="props"> \
                   <div class="wizard-footer-left"> \
                     <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle">Atras</wizard-button> \
                   </div> \
                   <div class="wizard-footer-right"> \
                     <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Siguiente</wizard-button> \
                     <wizard-button v-else @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">Finalizar</wizard-button> \
                   </div> \
                   <div class="wizard-footer-right" style = "padding-right: 10px;"> \
                     <wizard-button @click.native="saveForm" class="wizard-footer-right" :style="props.fillButtonStyle">Guardar</wizard-button> \
                   </div> \
                 </template> \
			   </form-wizard>`,
    data () {
    	return {
    		evaluation_type: "account_statements",
    		solicitation_number: null,
    		account_statements: [],
    		simple_credits: [],
    		revolving_credits: [],
    		//solicited_credits: [],
    		
    		// static, must be loaded from backend
    		bank_list: [
    			"Banregio",
    			"Scotiabank",
    			"Bancomer",
    			"Banorte",
    			"Banamex"
    		]		   
        }
    },
    components : {
    	FirstFormStep,
    	SecondFormStep,
    	ThirdFormStep
    },

    computed: {
    	solicited_credits: function () {
    		return this.simple_credits.concat(this.revolving_credits);
    	},
    },

    filters: {
    	pretty: function(value) {
    		console.log('pretty');
    		console.log(value);
      		return JSON.stringify(value, null, 2);
    	}
  	},

    methods: {
    	onComplete: function(){
          alert('Yay. Done!');
        },
        saveForm: function(){
          alert('Saving form!');
        },
        beforeTabSwitch: function(){
           //alert("This is called before switchind tabs")
           return true;
        },
        setEvalType: function(val) {
        	this.evaluation_type = val;
        },
        setAccountStatements: function(val) {
        	this.account_statements = val;
        },
        setSimpleCredits: function(val) {
        	this.simple_credits = val;
        },
        setRevolvingCredits: function(val) {
        	this.revolving_credits = val;
        } 
    }
});

// title="Evaluacion" subtitle="subtitulo" nextButtonText="Siguiente" backButtonText="Atras" finishButtonText="Guardar" stepSize="sm" 
// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
	
const HomeController = { template: '#home-template' };

const EvalListController = { 
	template: '#list-template',
	components: {
      DataTable,
	},
	data() {
		return {
		  data: [
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'user': { 'first_name': 'Clarence', 'last_name': 'Flores' }, 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'user': { 'first_name': 'Anne', 'last_name': 'Lee' }, 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
              ],
          columns: [
                {
                field: 'id',
                label: 'ID',
                width: '40',
                numeric: true
                },
                {
                field: 'first_name',
                label: 'First Name',
                },
                {
                field: 'last_name',
                label: 'Last Name',
                },
                {
                field: 'date',
                label: 'Date',
                centered: true
                },
                {
                field: 'gender',
                label: 'Gender',
                }
            ],
          isPaginated: true,
          isPaginationSimple: false,
          defaultSortDirection: 'asc',
          currentPage: 1,
          perPage: 5  
		}
	} 
};

const EvalFormController = { 
	template: '#form-template',
	components: {
		EvalFormWizard,
	} 
};


const EvalUpdateFormController = { template: '#updateform-template' };
const EvalDetailController = { template: '#detail-template' };
 
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: HomeController, name: 'home' },
  { path: '/evaluaciones', component: EvalListController, name: 'evaluaciones' },
  { path: '/evaluar', component: EvalFormController, name: 'evaluar' },
  { path: '/evaluaciones/:id', component: EvalDetailController, name: 'evaluaciones-detalle' },
  { path: '/evaluar/:id', component: EvalUpdateFormController, name: 'reevaluar' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
});
(function() {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
})();




// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  
  data() {
            return {
              state: false       
                
              }
            
  },
  router,
  /*computed: {
    username () {
      // We will see what `params` is shortly
      return this.$router.params.username
    }
  },*/
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}).$mount('#app')

// Now the app has started!