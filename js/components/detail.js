const DetailForm = Vue.component('detail', {
  props: ['id'],
  template: `
    <section class="container" >
      <div id="detail-print" style="padding:30px;">  
        <div class="columns">
          <p  class="column" style="font-weight:bold; color:black; line-height:15pt;">
            <span  style="font-size:20px; ">ACUERDO PARA AUTORIZACIÓN DE LÍNEA DE CRÉDITO</span>            
            <span style="font-size:16px; display:inline-block;">Crédito Negocios</span>            
          </p>
          <p style="font-size:14px; text-align:right; font-weight:bold" class="column">             
            <span id="header_PDF" style="font-size:16px; display:none;">banregio | inteligencia de riesgos</span>  
            <span style="display:grid;">Fecha de presentación: {{solicitud.fecha_solicitud}}</span>
          </p>
        </div>
        <br/>
        <div class="columns" style="#padding-bottom: 250px;">
          <div class="column table-pdf">
            <table class="table is-bordered" style="width:100%; font-weight:bold">
              <tbody>
                <tr>
                  <td colspan="6" class="div-titulos-pdf">Información General</td>
                <tr>
                <tr>
                  <td><label class="label">Solicitante:</label></td>
                  <td colspan="3">{{solicitante}}</td>
                  <td><label class="label">Folio:</label></td>
                  <td>{{ solicitud.numero_solicitud }}</td>
                </tr>
                <tr>
                  <td><label class="label">Domicilio:</label></td>
                  <td colspan="3">{{domicilio}}</td>
                  <td><label class="label">RFC:</label></td>
                  <td>{{ rfc }}</td>
                </tr>
                <tr>
                  <td><label class="label">Actividad:</label></td>
                  <td>{{ actividad }}</td>
                  <td><label class="label">Promotor:</label></td>
                  <td>{{solicitud.promotor}}</td>
                  <td><label class="label">Cheques:</label></td>
                  <td>{{solicitud.cheques_fecha}}</td>
                </tr>
                <tr>
                  <td><label class="label">Cedente/prosp:</label></td>
                  <td>{{solicitud.cedente_prosp}}</td>
                  <td><label class="label">Subdirector:</label></td>
                  <td>{{solicitud.subdirector}}</td>
                  <td><label class="label">Credito:</label></td>
                  <td>{{solicitud.credito_fecha}}</td>
                </tr>
                <tr>                
                  <td><label class="label">Analista:</label></td>
                  <td colspan="3">{{solicitud.analista}}</td>
                  <td><label class="label">Inicio de operaciones:</label></td>
                  <td>{{solicitud.antiguedad_operacion}}</td>
                </tr> 
                <tr>
                  <td><label class="label">Accionistas:</label></td>
                  <td colspan="5">{{accionistas}}</td>
                </tr>
                <tr>
                  <td><label class="label">Actividad específica:</label></td>
                  <td>{{solicitud.actividad_especifica}}</td>
                  <td><label class="label">No. empleados:</label></td>
                  <td>{{solicitud.numero_empleados}}</td>
                  <td><label class="label">Promedio venta anual:</label></td>
                  <td>{{solicitud.promedio_venta_anual}}</td>
                </tr>              
                <tr>
                  <td colspan="6" class="div-titulos-pdf">Líneas de crédito</td>
                </tr>
                <tr>
                  <td colspan="6">
                    <table style="font-size:13px; width:100%" >
                      <tr>
                        <td><label class="label">REF</label></td>
                        <td><label class="label">EMP</label></td>
                        <td><label class="label">TIPO</label></td>
                        <td><label class="label">PRODUCTO</label></td>
                        <!--                        
                        <td><label class="label">RESPONS.</label></td>
                        <td><label class="label">VENCIMIENTO</label></td>
                        -->
                        <td><label class="label">IMPORTE</label></td>
                        <td><label class="label">RESPONS.</label></td>
                        <td><label class="label">VENCIMIENTO</label></td>
                        <td><label class="label">LINEA SOLICITADA</label></td>
                        
                        <td><label class="label">LINEA AUTORIZADA</label></td>
                        
                        <td><label class="label">PLAZO</label></td>
                        
                        <td><label class="label">GTIA. FONDOS</label></td>
                        <td><label class="label">CLASIF B-6</label></td>
                        <td><label class="label">DESTINO</label></td>
                        <td><label class="label">SHC</label></td>
                        <td><label class="label">PERIODO GRACIA</label></td>
                        <!--<td><label class="label">TIPO OPERACIÓN</label></td>-->
                      </tr>
                     
                      <tr v-if="credits.length" v-for="credit in ordered_credits" :key="credit.id_local">
                        <td>{{credit.id_local}}</td>
                        <td>{{credit.empresa}}</td>
                        <td>{{credit.tipo | tipo_credito}}</td>
                        <td style="text-align:center;">{{productName(credit.id_producto)}}</td>                         
                        <td style="text-align:right;">{{credit.importe}}</td>
                        <td style="text-align:right;">{{credit.responsabilidad}}</td>
                        <td style="text-align:right;">{{credit.vencimiento}}</td> 
                        <td style="text-align:right;">{{credit.linea_solicitada | monto_redondeado}}</td>                            
                        <td style="text-align:right;">{{credit.autorizado | monto_redondeado}}</td>                           
                        <td>{{credit.plazo}}</td>                          
                        <td>{{credit.garantia_fondos | etiqueta_aplica}}</td>
                        <td>{{credit.clasif_b6 | credito_clasif_b6}}</td>
                        <td>{{credit.destino}}</td>
                        <td>{{credit.hsc | etiqueta_aplica}}</td>
                        <td>{{credit.periodo_gracia | etiqueta_aplica}}</td>
                      </tr>
                      <tr style="height: 49px;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>                         
                        <td></td>
                        <td></td>
                        <td></td> 
                        <td></td>                            
                        <td></td>                           
                        <td></td>                          
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr style="height: 49px;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>                         
                        <td></td>
                        <td></td>
                        <td></td> 
                        <td></td>                            
                        <td></td>                           
                        <td></td>                          
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>                       
                      <tr style="height: 49px;" >                        
                        <td colspan="16" rowspan="3" >
                          <b>RIESGO POTENCIAL GRUPO</b>: {{solicitud.riesgo_potencial}}
                        </td>
                      </tr>                      
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos-pdf">Avales / Obligados solidarios / Fiadores</td>
                <tr>
                <tr>
                  <td colspan="2"><label class="label">Ref:</label></td>
                  <td colspan="4"><label class="label">Nombre:</label></td>                  
                </tr>
                <tr>
                  <td colspan="2">01-01</td>
                  <td colspan="4">{{aval}}</td>                  
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos-pdf">Decreto paramétrico</td>
                </tr>                              
                <tr>
                  <td colspan="6" style="text-align:center;"><b>{{ decreto }}</b></td>
                </tr>
                <tr>
                  <td colspan="3" style="text-align:center;">Crédito Revolvente acumulado sugerido</td>
                  <td colspan="3" style="text-align:center;">Crédito Simple acumulado sugerido</td>  
                </tr> 
                <tr>
                  <td colspan="3" style="text-align:center; font-size:18px;"><b>{{solicitud.linea_revolvente_sugerida | monto_redondeado}}</b></td>
                  <td colspan="3" style="text-align:center; font-size:18px;"><b>{{solicitud.linea_simple_sugerida | monto_redondeado}}</b></td>   
                </tr> 
                <tr>
                  <td colspan="6" class="div-titulos-pdf">Calificación de cartera</td>
                <tr>
                <tr>
                  <td colspan="2">Fecha de consulta de buró</td>
                  <td colspan="4">{{solicitud.fecha_consulta}}</td>                  
                </tr>                
                <tr>
                  <td colspan="2">Calif</td>
                  <td colspan="4">{{solicitud.calificacion_interna}}</td>                  
                </tr>
                <tr>
                  <td colspan="2">Pre-calif</td>
                  <td colspan="4">{{solicitud.calificacion_deudor}}</td>                  
                </tr>
                <tr>
                  <td colspan="2">Calif. de buro</td>
                  <td colspan="4">{{solicitud.calif_buro}}</td>                  
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos-pdf">Firmas facultadas</td>
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos-pdf" style="height:200px;">
                    <label class="label" style="float:right;">Fecha de autorización</label>
                  </td>
                </tr>
              </tbody>
            </table>            
          </div>            
        </div>
        <div class="columns" style="padding-bottom: 20px;">

          <div class="column">
            <label class="label" style="text-align:left;">
                    Observaciones:                  
            </label>
            <ul style="height: 230px; font-size: 20px;">
              <li v-for="note in notes">{{note.texto}}</li>
            </ul>           
          </div>
        </div>

        <div class="footer columns" style="display:none; bottom: 0; padding:10px; height:150px;" id="div_footer"> 
          <div style="font-weight:bold; font-size: 20px; text-align: center;" class="column is-4">
            banregio | Inteligencia de riesgos
          </div>
          <div class="column" style="text-align: right;">
            <p><b>Banco Regional, S.A</b></p>
            <p><b>Institución de Banca Múltiple, Banregio Grupo Financiero. </b></p>
            <p>Todos los Derechos Reservados</p>
          </div>
        </div> 
      </div>
        
      <div id="editor" style="text-align:right;" class=" card" >
        <header class="card-header">
            <p class="card-header-title">Información sensible:</p>
        </header>
        <div class="card-content">  
          <div class="content columns">
            <div class="column">
              <label class="label" style="text-align:left;">
                Solicitante
                <input type="text" v-model="solicitante" class="input"/>
              </label>
            </div>
            <div class="column">
              <label class="label" style="text-align:left;">
                Domicilio
                <input type="text" v-model="domicilio" class="input"/>
              </label>
            </div>
            <div class="column">
              <label class="label" style="text-align:left;">
                RFC
                <input type="text" v-model="rfc" class="input" />
              </label>
            </div> 
          </div>
          <div class="columns">
            <div class="column is-2"><label class="label">Accionistas</label></div>
            <div class="column">
              <input type="text" class="input" v-model="accionistas">
            </div>
          </div>              
        </div>                  
      </div>
     
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Avales:</p>
        </header>
        <div class="card-content">  
          <div class="content columns">
            <div class="column">              
                <input type="text" v-model="aval" class="input"/>              
            </div>
          </div>            
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Observaciones:</p>
        </header>
        <div class="card-content">  
          <div class="content columns" v-for="note in notes" :key="note.id_local">
            <div class="column">              
                <input type="text" v-model="note.texto" class="input"/>              
            </div>
          </div>      
          <div class="columns">
            <div class="column">
              <button class="button " @click = "newNote" style="background-color: rgb(58, 95, 171); border-color: rgb(58, 95, 171); color: white;" >Agregar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">  
          <div class="content columns">
            <div class="column">              
              <button class="button " @click = "genPDF" style="float: right; background-color: rgb(58, 95, 171); border-color: rgb(58, 95, 171); color: white;" >Descargar</button>              
            </div>
          </div>            
        </div>
      </div>       
    </section> 
  `,
  data () {
    return {       
      solicitud : {
        id: null,
        id_actividad: null,
        id_nivel_riesgo: null,
        numero_solicitud: null,
        fecha_solicitud: null,
        tipo_comprobante: "account_statements",
        linea_simple_sugerida: null,
        plazo_simple: null,
        linea_revolvente_sugerida: null,
        garantia: null,
        tipo_evaluacion_perfilador: null,
        decreto: null,
        score: null,
        ventas_anuales: null,
        // flujo_disponible_mensual : null,  
        uafir: null,
        deuda_cortoplazo: null,
        pasivo_financiero_corto: null,
        capital_contable: null,
        destino_credito: null,
        antiguedad_actividad: null,
        antiguedad_operacion: null,
        actividad_especifica: null,
        numero_empleados: null,
        promedio_venta_anual: null,
        calificacion_deudor: null,
        deuda_total: null,
        MONTHS_ON_FILE_BANKING: null,
        BK12_CLEAN: null,
        BK12_MAX_CREDIT_AMT: null,
        num_cred_act_arren: null,
        num_cred_act_fact: null,
        num_cred_act_revol: null,
        num_cred_act_simp: null,
        sal_vig_cred_act_arren: null,
        sal_vig_cred_act_fact: null,
        sal_vig_cred_act_revol: null,
        sal_vig_cred_act_simp: null,
        sal_orig_cred_act_arren: null,
        sal_orig_cred_act_fact: null,
        sal_orig_cred_act_revol: null,
        sal_orig_cred_act_simp: null,
        exp_creditos_largos: null,
        fecha_consulta: null,
        calif_buro: null,
        calificacion_interna: null,
        pre_calif: null,
        cedente_prosp: null,
        promotor: null,
        subdirector: null,
        analista: null,
        accionistas: null,
        cheques_fecha: null,
        credito_fecha: null,
        riesgo_potencial: null,
      },
      risk_levels: [],
      products: [],
      activities: [],
      credits: [],
      notes: [],
      avales: [],
      aval: null,
      credits_count: 0,
      rfc: null,
      solicitante: null,
      domicilio: null,
      accionistas: null,
    }
  },

  created: function () {   
    this.readDetail();
    this.readRiskLevels();
    this.readActivities();
    this.readCredits();
    this.readProducts(); 
  },

  computed:{
    data: function() {
        return {          
              nivel_riesgo: this.nivel_riesgo,                  
        }
    },
    decreto: function() {
      if (!this.solicitud.decreto) return null;
      if (this.solicitud.decreto === "1") return "ESTUDIO";
      if (this.solicitud.decreto === "2") return "DENEGADO";
      if (this.solicitud.decreto === "3"){
        // console.log('decreto');
        // console.log(this.solicitud);
        // if (!!this.solicitud.plazo_simple && parseInt(this.solicitud.plazo_simple) >= 48 && !this.solicitud.exp_creditos_largos) return "ESTUDIO";
        return "PRE-APROBADO"
      } ;
      return "N/A";
    },
    ordered_credits: function () {
      return this.credits.filter(item => item.tipo_operacion === "1")
        .concat(this.credits.filter(item => item.tipo_operacion === "2"))
        .concat(this.credits.filter(item => item.tipo_operacion === "3"));
    },

    nivel_riesgo: function() {
      var self = this;
      console.log('nivel_riesgo computed');
        if(!this.solicitud.id) return null;
        if(this.risk_levels.length === 0) return null;
        console.log('Apunto de regresar');
        var nriesgo = this.risk_levels.find(function(item){
           //console.log(item.id);
           //console.log(self.solicitud);
           var ret = item.id === self.solicitud.id_nivel_riesgo;
           return ret;           
        });
        console.log(nriesgo);
        return nriesgo;        
    },
    nivel_riesgo_nombre: function () {
      if (!this.nivel_riesgo) return null;
      return this.nivel_riesgo.nombre;
    },
    nivel_riesgo_tasa: function () {
      if (!this.nivel_riesgo) return null;
      return this.nivel_riesgo.tasa;
    },
    actividad: function() {
      var self = this;
      console.log('actividad computed');
        if(!this.solicitud.id) return null;
        if(this.activities.length === 0) return null;
        console.log('Apunto de regresar actividad');
        var activity = this.activities.find(function(item){
           console.log(item.id);
           console.log(self.solicitud);
           var ret = item.id === self.solicitud.id_actividad;
           return ret;           
        });
        console.log(activity);
        return activity.nombre;        
    },
  },
  
  methods: {
    genPDF: function () {   
      var self = this;
      document.getElementById("header_PDF").style.display = "grid";
      // document.getElementById("div_footer").style.display = "block";

      html2canvas(document.getElementById("detail-print"), {
        onrendered: function (canvas) {
          
          var img = canvas.toDataURL("image/url",1.0);  
          var doc = new jsPDF('p', 'pt', 'letter')
          doc.addImage(img, 'JPEG',25,35,550,735); // (x0, y0, hlength, vlength)
          
          doc.save('CapacidadPago_'+self.solicitud.numero_solicitud+'.pdf');
           document.getElementById("header_PDF").style.display = "none";
           document.getElementById("div_footer").style.display = "none";
        }
      });
    
    },

    newNote: function () {
      var new_id_local = this.notes.map(note => note.id_local).reduce((a,b) => Math.max(a,b),0) + 1;
      var note = {id_local: new_id_local, texto: null};
      this.notes.push(note);
    },

    readDetail:function(){
      var self = this;
      console.log('Reading detail');
      google.script.run
      .withSuccessHandler(function(response){
        console.log('Response from solicitud ');
        console.log(response);

        //this.solicitud = response;
        self.setSolicitud(response);            
      })
      .withFailureHandler(function(err){
        console.log('An error ocurred while fetching a "solicitud"');
        console.log(err);
      })
      .readId('solicitud',this.id)

    },
    readProducts: function () {
      var self = this;
      google.script.run
        .withSuccessHandler(function(response){
          console.log('Reading products!')
            console.log(response);
            self.products = response.records;            
        })
        .withFailureHandler(function(err){
          console.log('An error ocurred while fetching products!')
            console.log(err);
        })
        .readCatalog('producto')
    },
    readActivities: function () {
      var self = this;
      google.script.run
      .withSuccessHandler(function(response){
        console.log('Reading activities');
        console.log(response);
        self.activities = response.records;
      })
      .withFailureHandler(function(err){
        console.log('An error ocurred while reading activities');
        console.log(err);
      })
      .readCatalog('actividad')
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

    readCredits: function () {
      var self = this;
      google.script.run
      .withSuccessHandler(function(response){
        console.log('Reading creditos');
        console.log(response);
        self.setCreditos(response.records);  // solicitud.numero_solicitud = response.numero_solicitud;
      })
      .withFailureHandler(function(err){
        console.log('An error ocurred while reading creditos');
        console.log(err);
      })
      .readFKRelation('credito_solicitado', 'id_solicitud', this.id);
    },

    setCreditos: function (records) {
      this.credits_count = records.length;
      if (this.credits_count > 0) {
        for (var i=0; i < this.credits_count; i++) {
          var record = records[i];
          // do trasform
          if (record.tipo_operacion === "2"){
            record.linea_solicitada = parseInt(record.monto) + parseInt(record.importe);
          } else {
            record.linea_solicitada = record.monto;
          }
          this.credits.push(record);
        }
      }
    },
    setSolicitud: function (response) {
      this.solicitud.id = response.id,
      
      /*this.solicitud.numero_solicitud = response.numero_solicitud;
      this.solicitud.destino_credito = response.destino_credito;
      this.solicitud.garantia = response.garantia;
      this.solicitud.id_actividad = response.id_actividad;
      this.solicitud.tipo_comprobante = response.tipo_comprobante;
      this.solicitud.antiguedad_actividad = response.antiguedad_actividad;
      this.solicitud.antiguedad_operacion = response.antiguedad_operacion;
      this.solicitud.deuda_total = response.deuda_total;
      this.solicitud.MONTHS_ON_FILE_BANKING = response.MONTHS_ON_FILE_BANKING;
      this.solicitud.BK12_CLEAN = response.BK12_CLEAN;
      this.solicitud.BK12_MAX_CREDIT_AMT = response.BK12_MAX_CREDIT_AMT;
      this.solicitud.num_cred_act_arren = response.num_cred_act_arren;
      this.solicitud.num_cred_act_fact = response.num_cred_act_fact;
      this.solicitud.num_cred_act_revol = response.num_cred_act_revol;
      this.solicitud.num_cred_act_simp = response.num_cred_act_simp;
      this.solicitud.sal_vig_cred_act_arren = response.sal_vig_cred_act_arren;
      this.solicitud.sal_vig_cred_act_fact = response.sal_vig_cred_act_fact;
      this.solicitud.sal_vig_cred_act_revol = response.sal_vig_cred_act_revol;
      this.solicitud.sal_vig_cred_act_simp = response.sal_vig_cred_act_simp;
      this.solicitud.sal_orig_cred_act_arren = response.sal_orig_cred_act_arren;
      this.solicitud.sal_orig_cred_act_fact = response.sal_orig_cred_act_fact;
      this.solicitud.sal_orig_cred_act_revol = response.sal_orig_cred_act_revol;
      this.solicitud.sal_orig_cred_act_simp = response.sal_orig_cred_act_simp;
      this.solicitud.exp_creditos_largos = (response.exp_creditos_largos === "true"); 
      this.solicitud.uafir = response.uafir;
      this.solicitud.capital_contable = response.capital_contable;
      this.solicitud.ventas_anuales = response.ventas_anuales;
      this.solicitud.calificacion_deudor = response.calificacion_deudor;
      this.solicitud.tipo_evaluacion_perfilador = response.tipo_evaluacion_perfilador;
      this.solicitud.decreto = response.decreto;
      this.solicitud.plazo_simple = response.plazo_simple;
      this.solicitud.score = response.score;
      this.solicitud.id_nivel_riesgo = response.id_nivel_riesgo;*/
      this.solicitud.linea_revolvente_sugerida = response.linea_revolvente_sugerida;
      this.solicitud.linea_simple_sugerida = response.linea_simple_sugerida;


      this.solicitud.numero_solicitud = response.numero_solicitud;
      this.solicitud.fecha_solicitud = response.fecha_solicitud;
      this.solicitud.cedente_prosp = response.cedente_prosp;
      this.solicitud.promotor = response.promotor;
      this.solicitud.subdirector = response.subdirector;
      this.solicitud.analista = response.analista;
      this.solicitud.accionistas = response.accionistas;
      this.solicitud.cheques_fecha = response.cheques_fecha;
      this.solicitud.credito_fecha = response.credito_fecha;
      this.solicitud.destino_credito = response.destino_credito;
      this.solicitud.garantia = response.garantia;
      this.solicitud.id_actividad = response.id_actividad;
      this.solicitud.tipo_comprobante = response.tipo_comprobante;
      this.solicitud.antiguedad_actividad = response.antiguedad_actividad;
      this.solicitud.antiguedad_operacion = response.antiguedad_operacion;
      this.solicitud.actividad_especifica = response.actividad_especifica;
      this.solicitud.numero_empleados = response.numero_empleados;
      this.solicitud.promedio_venta_anual = response.promedio_venta_anual;
      this.solicitud.deuda_total = response.deuda_total;
      this.solicitud.MONTHS_ON_FILE_BANKING = response.MONTHS_ON_FILE_BANKING;
      this.solicitud.BK12_CLEAN = response.BK12_CLEAN;
      this.solicitud.BK12_MAX_CREDIT_AMT = response.BK12_MAX_CREDIT_AMT;
      this.solicitud.deuda_cortoplazo = response.deuda_cortoplazo;
      this.solicitud.fecha_consulta = response.fecha_consulta;
      this.solicitud.calif_buro = response.calif_buro;  
      this.solicitud.linea_mas_alta = response.linea_mas_alta;  
      this.solicitud.num_cred_act_arren = response.num_cred_act_arren;
      this.solicitud.num_cred_act_fact = response.num_cred_act_fact;
      this.solicitud.num_cred_act_revol = response.num_cred_act_revol;
      this.solicitud.num_cred_act_simp = response.num_cred_act_simp;
      this.solicitud.sal_vig_cred_act_arren = response.sal_vig_cred_act_arren;
      this.solicitud.sal_vig_cred_act_fact = response.sal_vig_cred_act_fact;
      this.solicitud.sal_vig_cred_act_revol = response.sal_vig_cred_act_revol;
      this.solicitud.sal_vig_cred_act_simp = response.sal_vig_cred_act_simp;
      this.solicitud.sal_orig_cred_act_arren = response.sal_orig_cred_act_arren;
      this.solicitud.sal_orig_cred_act_fact = response.sal_orig_cred_act_fact;
      this.solicitud.sal_orig_cred_act_revol = response.sal_orig_cred_act_revol;
      this.solicitud.sal_orig_cred_act_simp = response.sal_orig_cred_act_simp;
      this.solicitud.exp_creditos_largos = (response.exp_creditos_largos === "true"); 
      this.solicitud.uafir = response.uafir;
      this.solicitud.capital_contable = response.capital_contable;
      this.solicitud.ventas_anuales = response.ventas_anuales;      
      this.solicitud.pasivo_financiero_corto = response.pasivo_financiero_corto;
      this.solicitud.calificacion_deudor = response.calificacion_deudor;
      this.solicitud.tipo_evaluacion_perfilador = response.tipo_evaluacion_perfilador;
      this.solicitud.decreto = response.decreto;
      this.solicitud.score = response.score;
      this.solicitud.id_nivel_riesgo = response.id_nivel_riesgo;      
      this.solicitud.calificacion_interna = response.calificacion_interna; 
      this.solicitud.pre_calif = response.pre_calif;
      this.solicitud.riesgo_potencial = response.riesgo_potencial;
    }, 

    productName: function(id) {
      console.log('product name en detalle')
      if (typeof this.products === 'undefined') return null;
      var producto = this.products.find(item => item.id === id);
      // console.log(this.products);
      // console.log(producto);
      if (typeof producto === 'undefined' || producto === null) return null;
      return producto.tipo_producto;
    },  
  },
  
  filters: {        
    nivel_riesgo_nombre: function(value) {
      if (!!value && typeof this.risk_levels != "undefined") {
          return this.risk_levels.find( item => item.id === value).nombre;
      } else {
          return null;
      }
    },

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

    

    monto_redondeado:function(value){
    if(!!value){     
    
         value += '';
         var splitStr = value.split(',');
         var splitLeft = splitStr[0];
         var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
         var regx = /(\d+)(\d{3})/;
         while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
         }
      return '$ ' + splitLeft + splitRight;

      }else{ 
        return null;
      }      

    },

    monto_etiquetas:function(value){
    if(!!value){      
      if(value >1000){
        return  "Cantidad en múltiplos de 50K"       
      }else{
        return  "Cantidad en múltiplos de 10K"
        }
      }else{
        return null;
      }
    },
    tipo_credito:function(value){
      if(!!value){
        if(value==="1"){return "SMP";}
        if(value==="2"){return "REV";}
      }
    },
    plazo_credito:function(value){
      if(!!value){
        return value;
      }else{
        return null;
      }
    },
    etiqueta_aplica:function(value){
      if(!!value){
        if(value==="1"){return "Si";}
        if(value==="2"){return "No";}
        if(value==="3"){return "No aplica";}
      }else{
        return null;
      }
    },     
    credito_clasif_b6:function(value){
      if(!!value){
          if(value==="1"){return "N/A";}
          if(value==="2"){return "B-6";}
          if(value==="3"){return "RE";}
          if(value==="4"){return "REV";}
          if(value==="5"){return "RV";}
      }else{
        return null;
      }
    },

    
  
        
  },
}); 