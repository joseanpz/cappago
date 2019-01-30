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
                >
                <!--
                default-sort="user.first_name">
                -->
                <template slot-scope="props">
                    <b-table-column field="numero_solicitud" label="#Solicitud" width="40" sortable>
                        {{ props.row.numero_solicitud }}
                    </b-table-column>

                    <b-table-column field="tipo_comprobante" label="Comprobantes">
                        {{ props.row.tipo_comprobante }}
                    </b-table-column>

                    <b-table-column field="garantia_hipotecaria" label="Garantía">
                        {{ props.row.garantia_hipotecaria }}
                    </b-table-column>
                    <!--
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
        </section>`,
    data() {
		return {
		  data: [
          /*
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
            */    
              ],
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
                field: 'garantia_hipotecaria',
                label: 'Garantia Hipotecaria',
                },
                /*{
                field: 'date',
                label: 'Date',
                centered: true
                },
                {
                field: 'gender',
                label: 'Gender',
                },*/
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
    },
    
    created: function () {
        this.readSolicitudes();
    },

    methods: {
        readSolicitudes: function () {
            var self = this;
            google.script.run
            .withSuccessHandler(function(response){
                console.log('Response from "solicitudes".')
                console.log(response);
                self.data = response.records;
            })
            .withFailureHandler(function(err){
                console.log('An error ocurred while fetching "solicitudes".')
                console.log(err);
            })
            .read('solicitud');
        },
    }

})