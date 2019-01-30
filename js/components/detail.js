// require html2canvas
// require jsPDF

// to be used
/*
function genPDF() {
  var element = document.getElementById('my-pdf-div');
html2pdf(element, {
  margin:       1,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { dpi: 192, letterRendering: true },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
});


	html2canvas(document.getElementById("my-pdf-div"), {
		onrendered: function (canvas) {
			var img = canvas.toDataURL("image/jpge",1.0);
			var doc =new jsPDF("l", "mm", "a4");
			doc.addImage(img, 'JPEG', 10, 10, 180, 150);
			doc.save('test.pdf');
		}
	});
}
*/
const DetailForm = Vue.component('detail', {
  props: ['id'],
	template: `
	<section class="container" >
  <div id="detail-print">
        {{ $route.params.id }} <br/>
        <br/>
        <div class="columns navbar is-primary" id="header_PDF" style="display:none;">
          <a class="navbar-item" href="#" style="font-weight:bold; padding-left:50px;">
              banregio  
          </a>
        </div>
        <br/>
        <div class="columns">
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

        <br/><br/>
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
			html2canvas(document.getElementById("detail-print"), {
				onrendered: function (canvas) {
          
					var img = canvas.toDataURL("image/url",1.0);
					var doc = new jsPDF('p', 'pt', 'letter')
					doc.addImage(img, 'JPEG',30,20,550,500);
          
					doc.save('test.pdf');
           document.getElementById("header_PDF").style.display = "none";
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