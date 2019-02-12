const DataTable = Vue.component('data-table', {
  // props:  ['data', 'columns', 'isPaginated', 'isPaginationSimple', 
  // 'defaultSortDirection', 'currentPage', 'perPage'],
  //template: '<span>Test</span>'
    template: ` 
        <section class="class-section">
            <b-field grouped group-multiline >
                <!--
                <b-select v-model="defaultSortDirection">
                    <option value="asc">Default sort direction: ASC</option>
                    <option value="desc">Default sort direction: DESC</option>
                </b-select>
                -->
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
            <br/>
            <b-table
                :data="data"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :default-sort-direction="defaultSortDirection"
                :risk_levels="risk_levels"
                >
                <!--
                default-sort="user.first_name">
                -->
                <template slot-scope="props">
                    <b-table-column field="numero_solicitud" label="Solicitud" width="40" sortable>
                        {{ props.row.numero_solicitud }}
                    </b-table-column>
                    <b-table-column field="tipo_evaluacion_perfilador" label="Tipo evaluación">
                        {{ props.row.tipo_evaluacion_perfilador | tipo_evaluacion_perfilador }}
                    </b-table-column>
                    <b-table-column field="decreto" label="Decreto">
                        {{ props.row.decreto | decreto }}
                    </b-table-column>
                    <b-table-column field="nivel_riesgo" label="Nivel de riesgo">
                        {{ props.row.nivel_riesgo }}
                    </b-table-column>
                    <b-table-column field="tipo_comprobante" label="Comprobantes">
                        {{ props.row.tipo_comprobante | comprobante }}
                    </b-table-column> 
                    <b-table-column field="linea_simple" label="Linea simple">
                        {{ props.row.linea_simple_sugerida }}
                    </b-table-column>
                    <b-table-column field="linea_revolvente" label="Linea revolvente">
                        {{ props.row.linea_revolvente_sugerida }}
                    </b-table-column>                    
  
                    <!--
                    <b-table-column field="garantia_hipotecaria" label="Garantía">
                        {{ props.row.garantia_hipotecaria }}
                    </b-table-column>
                    <b-table-column field="date" label="Date" sortable centered>
                        <span class="tag is-success">
                            {{ new Date(props.row.date).toLocaleDateString() }}
                        </span>
                    </b-table-column>
                    -->
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

            <!--<pre> {{ risk_levels | pretty}} </pre>-->
        </section>`,
    data() {
		return {
            data: [],
            columns: [
                {
                    field: 'numero_solicitud',
                    label: 'Numero de Solicitud',
                    //width: '40',
                    //numeric: false
                },
                {
                    field: 'tipo_comprobante',
                    label: 'Tipo Comprobante',
                },
                {
                    field : 'tipo_evaluacion_perfilador',
                    label : 'Tipo evaluacion'
                },
                {
                    field : 'decreto',
                    label : 'Decreto'
                },
                {
                    field: 'garantia_hipotecaria',
                    label: 'Garantia Hipotecaria',
                },
                {
                field: 'Acciones',
                label: 'Acciones',
                }
            ],
            risk_levels: [],
            isPaginated: true,
            isPaginationSimple: false,
            defaultSortDirection: 'asc',
            currentPage: 1,
            perPage: 5  
        }
    },
    
    created: function () {        
        this.readRiskLevels();
    },

    filters: {
        comprobante: function(value) {
            if (value === "account_statements") return "Estados de Cuenta";
            if (value === "financial_statements") return "Estados Financieros";
            return "N/A";
        },
        tipo_evaluacion_perfilador: function(value) {
            if (value === "1") return "EXT";
            if (value === "2") return "NVO";
            return "N/A";
        }, 
        decreto: function(value) {
            if (value === "1") return "ESTUDIO";
            if (value === "2") return "DENEGADO";
            if (value === "3") return "PRE-APROBADO";
            return "N/A";
        },
        nivel_riesgo_nombre: function(value) {
            if (!!value && typeof this.risk_levels != "undefined") {
                return this.risk_levels.find( item => item.id === value).nombre;
            } else {
                return null;
            }
        },

        pretty: function(value) {
            //console.log('pretty');
            //console.log(value);
            return JSON.stringify(value, null, 2);
        },

    },

    methods: {
        readSolicitudes: function () {
            var self = this;
            google.script.run
            .withSuccessHandler(function(response){
                console.log('Response from "solicitudes".')
                console.log(response);
                self.setData(response.records);
                //self.data = response.records;
            })
            .withFailureHandler(function(err){
                console.log('An error ocurred while fetching "solicitudes".')
                console.log(err);
            })
            .read('solicitud');
        },
        readRiskLevels: function () {
          var self = this;
          google.script.run
            .withSuccessHandler(function(response){
              console.log(response);
              self.risk_levels = response.records;
              self.readSolicitudes();
            })
            .withFailureHandler(function(err){
              console.log(err);
            })
            .readCatalog('nivel_riesgo')
        },

        setData: function (records) {
            var self = this;
            this.data = records.map(function(record){
                console.log(record);
                var nriesgo = self.risk_levels.find( item => item.id === record.id_nivel_riesgo);
                if (typeof nriesgo != 'undefined') {
                    record.nivel_riesgo = nriesgo.nombre;
                } else {
                    record.nivel_riesgo = null;
                }                
                return record;
            });
        },
    }

})