const DataTable = Vue.component('data-table', {
  // props:  ['data', 'columns', 'isPaginated', 'isPaginationSimple', 
  // 'defaultSortDirection', 'currentPage', 'perPage'],
  //template: '<span>Test</span>'
    template: ` 
        <section class="class-section" style="margin-top: 50px;">
            <b-field grouped group-multiline >
                <!--
                <b-select v-model="defaultSortDirection">
                    <option value="asc">Default sort direction: ASC</option>
                    <option value="desc">Default sort direction: DESC</option>
                </b-select>
                -->
                <b-input type="text" v-model="query" placeholder="Buscar folio"> </b-input>
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option value="5">5 por página</option>
                    <option value="10">10 por página</option>
                    <option value="15">15 por página</option>
                    <option value="20">20 por página</option>
                </b-select>                
                <div class="control is-flex">
                    <b-switch v-model="isPaginated">Paginado</b-switch>
                </div>
                <div class="control is-flex">
                    <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Paginación simple</b-switch>
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

                <template slot-scope="props">
                    <b-table-column field="numero_solicitud" label="Folio" width="40">
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
                    <b-table-column field="linea_revolvente" label="Línea revolvente sugerida">
                        {{ props.row.linea_revolvente_sugerida | redondeo_cantidad }}
                    </b-table-column> 
                    <b-table-column field="linea_simple" label="Línea simple sugerida">
                        {{ props.row.linea_simple_sugerida | redondeo_cantidad }}
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
            <label style="color:#3a5fab;"><b>*</b>Cantidades en Miles</label>

            <!--<pre> {{ risk_levels | pretty}} </pre>-->
        </section>`,
    data() {
		return {
            raw_data: [],
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
            perPage: 5,
            query: null 
        }
    },
    
    created: function () {        
        this.readRiskLevels();
        this.readSolicitudes();
    },

    computed: {
        data: function () {
            if (this.risk_levels.length === 0 || this.raw_data.length === 0) return [];
            return this.setData(this.raw_data);
        }
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
        redondeo_cantidad: function(value){
            //var c = Math.pow(10 , 2);
            if(isNaN(value) || value ===0) return parseFloat(0).toFixed(2);
            
                value = Math.round(value * 100) / 100;
                value += '';
                   var splitStr = value.split(',');
                   var splitLeft = splitStr[0];
                   var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
                   var regx = /(\d+)(\d{3})/;
                   while (regx.test(splitLeft)) {
                      splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
                   }
            return '$ ' + splitLeft + splitRight;
           
        },

    },

    methods: {
        readSolicitudes: function () {
            var self = this;
            google.script.run
            .withSuccessHandler(function(response){
                console.log('Response from "solicitudes".')
                // console.log(response);
                // self.setData(response.records);
                self.raw_data = response.records;
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
            })
            .withFailureHandler(function(err){
              console.log(err);
            })
            .readCatalog('nivel_riesgo')
        },

        setData: function () {
            var self = this, table_data;
            if (!!this.query) {
                table_data = this.raw_data.filter(item => item.numero_solicitud.match(this.query) );
            } else {
                table_data = this.raw_data;
            }

            return  table_data.map(function(record){
                // console.log(record);
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