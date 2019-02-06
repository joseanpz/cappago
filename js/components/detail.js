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
                    <td>MECJ890724KJ3</td> 
                    <td><label class="label">Solicitud:</label></td>
                    <td>{{solicitud.numero_solicitud}}</td>
                  </tr>
                  <tr>
                    <td><label class="label">Tipo evaluacion:</label></td>
                    <td>Nuevo</td>
                    <td><label class="label">Calificación deudor:</label></td>
                    <td>AA</td>
                  </tr>
                  <tr>
                    <td><label class="label">Tipo comprobante:</label></td>
                    <td>Nomina</td>
                    <td><label class="label">Actividad:</label></td>
                    <td>Pesca</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="div-titulos">Perfil</td>
                  <tr>
                  <tr>
                    <td><label class="label">Decreto:</label></td>
                    <td class="">PREAPROBADO</td>
                    <td><label class="label">Score:</label></td>
                    <td class="">878</td>
                  </tr>
                  <tr>
                    <td><label class="label">Nivel de riesgo:</label></td>
                    <td class="">AAA</td>
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
                    <td class="td-cantidad">$452,255</td>
                    <td><label class="label">Linea:</label></td>
                    <td class="td-cantidad">$485,965</td>
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
			solicitud: null
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
      console.log(this);
      console.log(this.$parent);
      google.script.run
          .withSuccessHandler(function(response){
            console.log('Response from solicitud ');
            console.log(response);
            self.solicitud = response;
          })
          .withFailureHandler(function(err){
            console.log('An error ocurred while fetching a "solicitud"');
            console.log(err);
          })
          .readId('solicitud',this.id)

    }
	},
	beforeCreate: function() {


	},
	created: function () {
    this.readDetail();
	},
	beforeMount: function() {

	},
	mounted: function() {
	//	this.genPDF();
   
	}
}); 