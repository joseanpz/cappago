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
        <br/>
        <div class="columns" style="padding-bottom: 250px;">
          <div class="column">
            <table class="table is-bordered is-striped" style="width:100%;">
              <tbody>
                <tr>
                  <td colspan="4" class="div-titulos">Información General</td>
                <tr>
                <tr>
                  <td><label class="label">RFC:</label></td>
                  <td>{{ rfc }}</td> 
                  <td><label class="label">Solicitud:</label></td>
                  <td>{{ solicitud.numero_solicitud }}</td>
                </tr>
                <tr>
                  <td><label class="label">Tipo evaluacion:</label></td>
                  <td>{{ solicitud.tipo_evaluacion_perfilador | tipo_evaluacion_perfilador }}</td>
                  <td><label class="label">Calificación deudor:</label></td>
                  <td>{{this.solicitud.calificacion_deudor}}</td>
                </tr> 
                <tr>
                  <td><label class="label">Tipo comprobante:</label></td>
                  <td> {{ solicitud.tipo_comprobante | comprobante }}</td>
                  <td><label class="label">Actividad:</label></td>
                  <td>{{ actividad }}</td>
                </tr>
                <tr>
                  <td colspan="4" class="div-titulos">Perfil</td>
                <tr>
                <tr>
                  <td><label class="label">Decreto:</label></td>
                  <td class="">{{ decreto }}</td>
                  <td><label class="label">Score:</label></td>
                  <td class="">{{ solicitud.score }}</td>
                </tr>
                <tr>
                  <td><label class="label">Nivel de riesgo:</label></td>
                  <td class="">{{ nivel_riesgo_nombre }}</td>
                  <td><label class="label"></label></td>
                  <td class=""></td>
                </tr>
                <tr>
                  <td colspan="4" class="div-titulos">Capacidad de pago</td>
                <tr>
                <tr>
                  <td colspan="2"><label class="label">Simple:</label></td>
                  <td colspan="2"><label class="label">Revolvente</label></td>
                </tr>
                <tr>
                  <td><label class="label">Monto :</label></td>
                  <td class="td-cantidad">{{ solicitud.linea_simple_sugerida | monto_redondeado}}</td>
                  <td><label class="label">Linea:</label></td>
                  <td class="td-cantidad">{{ solicitud.linea_revolvente_sugerida | monto_redondeado }}</td>
                </tr>
                
                <tr>
                  <td><label class="label">Tasa :</label></td>
                  <td class="td-cantidad">{{ nivel_riesgo_tasa * 100 }}%</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>            
          </div>            
        </div>
        <div class="columns">
          <div class="column">
            <label style="color:#3a5fab;" class="column"><b>*</b>{{ solicitud.linea_simple_sugerida | monto_etiquetas}}</label>
          </div>
          <div class="column">
            <label style="color:#3a5fab;" class="column"><b>**</b>{{ solicitud.linea_simple_sugerida | monto_etiquetas}}</label>
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
              <p class="card-header-title">Captura de RFC:</p>
          </header>
          <div class="card-content">  
          <div class="content columns">
            <div class="column is-2">
              <label class="label titulos">RFC: </label>
            </div>
            <div class="column is-4">
              <input type="text" v-model="rfc" class="input" />
            </div>
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
      if(value >1000){
        return  Math.round(value/50);       
      }else{
        return  Math.round(value/10);       
        }
      }else{
        return null;
      }
    },

    monto_etiquetas:function(value){
    if(!!value){      
      if(value >1000){
        return  "Cantidades en 50K"       
      }else{
        return  "Cantidades en 10K"
        }
      }else{
        return null;
      }
    }
  
        
  },
}); 