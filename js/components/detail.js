const DetailForm = Vue.component('detail', {
  props: ['id'],
	template: `
	<section class="container" >
  <div id="detail-print" style="padding:30px;">          

        <header class="columns navbar is-primary" id="header_PDF" style="display:none; padding-bottom:20px;">
          <a class="navbar-item" href="#" style="font-weight:bold; padding-left:50px;">
              banregio  
          </a>
        </header>
        <div class="columns">
          <p style="font-size:12px; text-align:right;" class="column"> 
            ACUERDO PARA AUTORIZACIÓN DE LÍNEA DE CRÉDITO <br/>
            <span style="font-size:10px;"><b>Crédito negocio hasta 500 mil</b></span> <br/>
            <span style="font-size:10px;"><b>Fecha de presentación: 2019-02-05</b></span> <br/>
          </p>
        </div>
        <br/>
        <div class="columns" style="padding-bottom: 250px;">
          <div class="column">
            <table class="table is-bordered is-striped" style="width:100%;">
              <tbody>
                <tr>
                  <td colspan="6" class="div-titulos">Información General</td>
                <tr>
                <tr>
                  <td><label class="label">Solicitante:</label></td>
                  <td colspan="3">Jacob Mendoza Contreras</td>
                  <td><label class="label">Folio:</label></td>
                  <td>{{ solicitud.numero_solicitud }}</td>
                </tr>
                <tr>
                  <td><label class="label">Domicilio:</label></td>
                  <td colspan="3">Amapola 421, Tres Caminos, Gpe. NL.</td>
                  <td><label class="label">RFC:</label></td>
                  <td>{{ rfc }}</td>
                </tr>
                <tr>
                  <td><label class="label">Actividad:</label></td>
                  <td>{{ actividad }}</td>
                  <td><label class="label">Promotor:</label></td>
                  <td>Eduardo Alfonso solorio vega</td>
                  <td><label class="label">Cheques:</label></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label class="label">Cedente/prosp:</label></td>
                  <td>70321</td>
                  <td><label class="label">Subdirector:</label></td>
                  <td>Ismael anguiano carrillo</td>
                  <td><label class="label">Credito:</label></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label class="label">Accionistas:</label></td>
                  <td>PM</td>
                  <td><label class="label">Analista:</label></td>
                  <td>Rosalia martinez hernandez</td>
                  <td><label class="label">Inicio de operaciones:</label></td>
                  <td>2016-05-01</td>
                </tr>                
                <tr>
                  <td colspan="6" class="div-titulos">Lineas de crédito</td>
                </tr>
                <tr>
                  <td colspan="6">
                    <table style="font-size:13px;">
                      <tr>
                        <td><label class="label">Ref</label></td>
                        <td><label class="label">Emp</label></td>
                        <td><label class="label">Tipo</label></td>
                        <!--
                        <td><label class="label">Importe</label></td>
                        <td><label class="label">Respons.</label></td>
                        <td><label class="label">Vencimiento</label></td>
                        -->
                        <td><label class="label">Linea solicitada</label></td>
                        <td><label class="label">linea autorizada</label></td>
                        <td><label class="label">Plazo</label></td>
                        <td><label class="label">Gtia. fondos</label></td>
                        <td><label class="label">Clasif B-6</label></td>
                        <td><label class="label">Destino</label></td>
                        <td><label class="label">Hsc</label></td>
                        <td><label class="label">Periodo gracia</label></td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>BR</td>
                        <td>Simple</td>
                        <!--
                        <td>4,152.25</td>
                        <td></td>
                        <td></td>
                        -->
                        <td>450</td> 
                        <td></td>
                        <td>36 meses</td>
                        <td>x</td>
                        <td>NA</td>
                        <td>CT</td>
                        <td>x</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>BR</td>
                        <td>Simple</td>                        
                        <!--
                        <td>2,152.25</td>
                        <td></td>
                        <td></td>
                        -->
                        <td>460</td> 
                        <td></td>
                        <td>36 meses</td>
                        <td>x</td>
                        <td>NA</td>
                        <td>CT</td>
                        <td>x</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <!--
                        <td colspan="3">Total M.N.</td>
                        <td>0 M.N.</td>
                        <td>0</td>
                        <td>T.de.C.(0.00)</td>
                        <td>0</td>
                        <td></td>
                        -->
                        <td colspan="6" rowspan="3">
                          Riesgo potencial grupo 450
                        </td>
                      </tr>
                      <!--
                      <tr>
                        <td colspan="3">Total Dls.</td>
                        <td>0 M.N.</td>
                        <td>0</td>
                        <td>T.de.C.(0.00)</td>
                        <td>0</td>
                        <td></td>                        
                      </tr>
                      <tr>
                        <td colspan="3">Total Valorizados.</td>
                        <td>0 M.N.</td>
                        <td>0</td>
                        <td>T.de.C.(0.00)</td>
                        <td>0</td>
                        <td></td>                        
                      </tr>
                      -->

                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos">Avales/ Obligados solidarios / fiadores</td>
                <tr>
                <tr>
                  <td colspan="2"><label class="label">Ref:</label></td>
                  <td colspan="4"><label class="label">Nombre:</label></td>                  
                </tr>
                <tr>
                  <td colspan="2">01-01</td>
                  <td colspan="4">Ana Herrara Corea</td>                  
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos">Decreto del estudio de credito</td>
                <tr>                
                <tr>
                  <td colspan="6" style="text-align:center;"><b>{{ decreto }}</b></td>
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos">Calificación de cartera</td>
                <tr>
                <tr>
                  <td colspan="2">Fecha</td>
                  <td colspan="4">2018-02-05</td>                  
                </tr>
                <!--
                <tr>
                  <td colspan="2">Calif</td>
                  <td colspan="4">0.0000%</td>                  
                </tr>
                -->
                <tr>
                  <td colspan="2">Pre-calif</td>
                  <td colspan="4">A1</td>                  
                </tr>
                <tr>
                  <td colspan="2">Calif. de buro</td>
                  <td colspan="4">1A1</td>                  
                </tr>
                <tr>
                  <td colspan="6" class="div-titulos">Firmas facultadas</td>
                <tr>
                <tr>
                  <td colspan="6" class="div-titulos"><br/><br/></td>
                <tr>
              </tbody>
            </table>            
          </div>            
        </div>

        <div class="footer columns" style="display:none; bottom: 0; padding:10px; height:150px;" id="div_footer"> 
          <div style="font-weight:bold; font-size: 20px; text-align: center;" class="column is-4">banregio | Inteligencia de riesgos</div>
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
                  <input type="text" class="input"/>
                </label>
              </div>
              <div class="column">
                <label class="label" style="text-align:left;">
                  Domicilio
                  <input type="text" class="input"/>
                </label>
              </div>
              <div class="column">
                <label class="label" style="text-align:left;">
                  RFC
                  <input type="text" v-model="rfc" class="input" />
                </label>
              </div> 
            </div>              
          </div>                  
        </div>
        <br/>
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Avales:</p>
          </header>
          <div class="card-content">  
            <div class="content columns">
              <div class="column">              
                  <input type="text" class="input"/>              
              </div>
            </div>      
            <div class="columns">
              <div class="column">
                <button class="button " @click = "genPDF" style="background-color: rgb(58, 95, 171); border-color: rgb(58, 95, 171); color: white;" >Descarga</button>
              </div>
            </div>
          </div>
        </div>
        <br/>        
    </section> 
    `,
	data () {
		return {       
			solicitud : {
        id: null,
        id_actividad: null,
        id_nivel_riesgo: null,
        numero_solicitud: null,
        tipo_comprobante: null,
        plazo_simple: null,
        linea_simple_sugerida: null,
        linea_revolvente_sugerida: null,
        garantia: null,
        tipo_evaluacion_perfilador: null,
        decreto: null,
        score: null,
        ventas_anuales: null,
        // flujo_disponible_mensual : null,  
        uafir: null,
        capital_contable: null,
        destino_credito: null,
        antiguedad_actividad: null,
        antiguedad_operacion: null,
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
        exp_creditos_largos: null
      },
      risk_levels: [], 
      activities: [],
      rfc: null 
		}
	},

  created: function () {   
    this.readDetail();
    this.readRiskLevels();
    this.readActivities();  
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
        console.log('decreto');
        console.log(this.solicitud);
        if (!!this.solicitud.plazo_simple && parseInt(this.solicitud.plazo_simple) >= 48 && !this.solicitud.exp_creditos_largos) return "ESTUDIO";
        return "PRE-APROBADO"
      } ;
      return "N/A";
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
      document.getElementById("header_PDF").style.display = "block";
      document.getElementById("div_footer").style.display = "block";

			html2canvas(document.getElementById("detail-print"), {
				onrendered: function (canvas) {
          
					var img = canvas.toDataURL("image/url",1.0);  
					var doc = new jsPDF('p', 'pt', 'letter')
					doc.addImage(img, 'JPEG',25,75,560,650);
          
					doc.save('CapacidadPago_'+self.solicitud.numero_solicitud+'.pdf');
           document.getElementById("header_PDF").style.display = "none";
           document.getElementById("div_footer").style.display = "none";
				}
			});
    
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
    setSolicitud: function (response) {
      this.solicitud.id = response.id,
      this.solicitud.numero_solicitud = response.numero_solicitud;
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
      this.solicitud.id_nivel_riesgo = response.id_nivel_riesgo;
      this.solicitud.linea_revolvente_sugerida = response.linea_revolvente_sugerida;
      this.solicitud.linea_simple_sugerida = response.linea_simple_sugerida;
    },
   
    /* readActivities: function(){
      var self = this;
      google.script.run
      .withSuccessHandler(function(response){
        console.log(response);
        self.activityName = response.records;
      })
      .withFailureHandler(function(err){
        console.log(err);
      })
      .readCatalog('actividad')
    },*/
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
    /* 
      if(value >1000){
        var valor =  Math.round((value/50)* 100) / 100;       
      }else{
        var valor =  Math.round((value/10)* 100)/ 100;       
        } */
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
    }
  
        
  },
}); 