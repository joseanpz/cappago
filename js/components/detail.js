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
                    <td>{{numero_solicitud}}</td>
                  </tr>
                  <tr>
                    <td><label class="label">Tipo evaluacion:</label></td>
                    <td>{{tipo_evaluacion_perfilador}}</td>
                    <td><label class="label">Calificación deudor:</label></td>
                    <td>AA</td>
                  </tr> 
                  <tr>
                    <td><label class="label">Tipo comprobante:</label></td>
                    <td> {{ tipo_comprobante }}</td>
                    <td><label class="label">Actividad:</label></td>
                    <td>Pesca</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="div-titulos">Perfil</td>
                  <tr>
                  <tr>
                    <td><label class="label">Decreto:</label></td>
                    <td class="">{{decreto}}</td>
                    <td><label class="label">Score:</label></td>
                    <td class="">{{score}}</td>
                  </tr>
                  <tr>
                    <td><label class="label">Nivel de riesgo:</label></td>
                    <td class="">{{ nivel_riesgo }}</td>
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
                    <td class="td-cantidad">{{solicitud.linea_simple_sugerida}}</td>
                    <td><label class="label">Linea:</label></td>
                    <td class="td-cantidad">{{solicitud.linea_revolvente_sugerida}}</td>
                  </tr>
                  <tr>
                    <td><label class="label">Plazo :</label></td>
                    <td class="td-cantidad">2 meses</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><label class="label">Tasa :</label></td>
                    <td class="td-cantidad">12%</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
          </div>    
        </div>
        <div class="footer columns" style="display:none; bottom: 0; padding:10px; height:150px;" id="div_footer"> 
          <div style="font-weight:bold; font-size: 26px; text-align: center;" class="column is-3">banregio | riesgos</div>
          <div class="column" style="text-align: right;">
            <p><b>Banco Regional, S.A</b></p>
            <p><b>Institución de Banca Múltiple, Banregio Grupo Financiero. </b></p>
            <p>Todos los Derechos Reservados</p>
          </div>
        </div> 
        </div>
        
        <div id="editor" style="text-align:right;" >
          <button class="button" @click = "genPDF" style="background-color: rgb(58, 95, 171); border-color: rgb(58, 95, 171); color: white;" >Descarga</button>
        </div>
        <br/>
    </section>
    `,
	data () {
		return {       
			solicitud: null,
      risk_levels: [], 
      rfc: null 
		}
	},
	methods: {
		genPDF: function () {		
      document.getElementById("header_PDF").style.display = "block";
      document.getElementById("div_footer").style.display = "block";

			html2canvas(document.getElementById("detail-print"), {
				onrendered: function (canvas) {
          
					var img = canvas.toDataURL("image/url",1.0);  
					var doc = new jsPDF('p', 'pt', 'letter')
					doc.addImage(img, 'JPEG',25,25,560,750);
          
					doc.save('test.pdf');
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

            this.solicitud = response;
            self.readRiskLevels();
          })
          .withFailureHandler(function(err){
            console.log('An error ocurred while fetching a "solicitud"');
            console.log(err);
          })
          .readId('solicitud',this.id)

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
    /*setData: function (response) {
      var self = this;
      console.log('setting data solicitud');      
      var nriesgo = self.risk_levels.find( item => item.id === response.id_nivel_riesgo);
      if (typeof nriesgo != 'undefined') {
        response.nivel_riesgo = nriesgo.nombre;
      } else {
        response.nivel_riesgo = null;
      }  
      console.log('nivel_riesgo');
      console.log(response) ;             
     // this.solicitud = response;
        
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
  computed:{
    data: function() {
        return {          
              nivel_riesgo: this.nivel_riesgo,                  
        }
    },
    nivel_riesgo: function() {
      var self = this;
      console.log('nivel_riesgo computed');
        if(!this.solicitud) return null;
        if(this.risk_levels.length === 0) return null;
        console.log('Apunto de regresar');
        var nriesgo = this.risk_levels.find(function(item){
           console.log(item.id);
           console.log(self.solicitud);
           var ret = item.id === self.solicitud.id_nivel_riesgo;
           return ret;           
        });
        console.log(nriesgo);
        return nriesgo.nombre;        
    },
    numero_solicitud:function(){
      var self = this;
      if(!this.solicitud) return null;
      console.log('numero_solicitud computed');
      console.log(self.solicitud.numero_solicitud);
      return self.solicitud.numero_solicitud;
    },
    tipo_evaluacion_perfilador:function(){
      console.log('tipo_evaluacion_perfilador computed');
      var self = this;
      if(!this.solicitud) return null;
      if (self.solicitud.tipo_evaluacion_perfilador === "1") return "EXT";
      if (self.solicitud.tipo_evaluacion_perfilador === "2") return "NVO";
      
      return "N/A";
    },
    tipo_comprobante:function(){
      console.log('tipo_comprobante computed');
      var self = this;
      if(!this.solicitud) return null;
      if (self.solicitud.tipo_comprobante === "account_statements") return "Estados de Cuenta";
      if (self.solicitud.tipo_comprobante === "financial_statements") return "Estados Financieros";
      return "N/A";
    },
    decreto:function(){
      console.log('decreto computed');
      var self = this;
      if(!this.solicitud) return null;
      if (self.solicitud.decreto === "1") return "ESTUDIO";
      if (self.solicitud.decreto === "2") return "DENEGADO";
      if (self.solicitud.decreto === "3") return "PRE-APROBADO";
      return "N/A";
    },
    score:function(){
      var self = this;
      if(!this.solicitud) return null;
      return self.solicitud.score;
    }
	},
	beforeCreate: function() {


	},
	created: function () {
    this.readDetail();
	},
  filters: {        
        nivel_riesgo_nombre: function(value) {
            if (!!value && typeof this.risk_levels != "undefined") {
                return this.risk_levels.find( item => item.id === value).nombre;
            } else {
                return null;
            }
        },
        
    },
	beforeMount: function() {

	},
	mounted: function() {
	//	this.genPDF();
   
	}
}); 