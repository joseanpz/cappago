// require html2canvas
// require jsPDF

// to be used
function genPDF() {
	html2canvas(document.getElementById("my-pdf-div"), {
		onrendered: function (canvas) {
			var img = canvas.toDataURL("image/url");
			var doc = new jsPDF();
			doc.addImage(img, 'JPEG', 20, 20);
			doc.save('test.pdf');
		}
	});
}

const DetailForm = Vue.component('detail', {
	template: `
	<section class="container" id="detail-print">
        {{ $route.params.id }} <br/>
        <br/>
        <div class="columns">
          <div class="column div-titulos" >
            Información General 
          </div>
        </div>
        <div class="columns">
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">Solicitante:</label></td>
                    <td>Jacob Mendoza Contreras</td>
                  </tr>
                  <tr>
                    <td><label class="label">RFC:</label></td>
                    <td>MECJ890724KJ3</td>
                  </tr>
                  <tr>
                    <td><label class="label">Giro del negocio:</label></td>
                    <td>Giro</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">No. Solicitud:</label></td>
                    <td>00000010</td>
                  </tr>
                  <tr>
                    <td><label class="label">Fecha solicitud:</label></td>
                    <td>2019-01-25 13:52:25</td>
                  </tr>
                  <tr>
                    <td><label class="label">Antiguedad de operacion:</label></td>
                    <td>2 años</td> 
                  </tr>
                </tbody>
              </table>
          </div>    
        </div>

        <div class="columns">
          <div class="column is-6 div-titulos" >
            Ventas trimestrales 
          </div>
          <div class="column is-6 div-titulos" >
            Estados de cuenta 
          </div>
        </div>
        <div class="columns">
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">Trimestre 1:</label></td>
                    <td class="td-cantidad">$400,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Trimestre 2:</label></td>
                    <td class="td-cantidad">$4,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Trimestre 3:</label></td>
                    <td class="td-cantidad">$1,400,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Trimestre 4:</label></td>
                    <td class="td-cantidad">$5,400,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Trimestre 5:</label></td>
                    <td class="td-cantidad">$12,400,000.00</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">Mes 1:</label></td>
                    <td class="td-cantidad">$400,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Mes 2:</label></td>
                    <td class="td-cantidad">$4,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Mes 3:</label></td>
                    <td class="td-cantidad">$1,400,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Mes 4:</label></td>
                    <td class="td-cantidad">$5,400,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Mes 5:</label></td>
                    <td class="td-cantidad">$12,400,000.00</td>
                  </tr>
                </tbody>
              </table>
          </div>    
        </div>
        <hr style="border: 1px solid #FF681E;">
        <div class="columns">
          <div class="column is-6" >
            <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">Monto de invesión:</label></td>
                    <td class="centra-text">$123,987,000.00</td>
                  </tr>
                  <tr>
                    <td><label class="label">Contrato:</label></td>
                    <td class="centra-text">Si</td>
                  </tr>
                  <tr>
                    <td><label class="label">Respaldo:</label></td>
                    <td class="centra-text">Si</td> 
                  </tr>
                </tbody>
              </table> 
          </div>
          <div class="column is-6" >
            <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">Grupo de analisis:</label></td>
                    <td class="centra-text"><b>PREAPROBADO</b></td>
                  </tr>
                </tbody>
              </table> 
          </div>
        </div>

        <div class="columns">
          <div class="column div-titulos" >
            Información de buro de credito
          </div>
        </div>
        <div class="columns">
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td><label class="label">Hit:</label></td>
                    <td class="centra-text">Si</td>
                  </tr>
                  <tr>
                    <td><label class="label">MOP Actual:</label></td>
                    <td class="centra-text">02</td>
                  </tr>
                  <tr>
                    <td><label class="label">MOP maximo actual:</label></td>
                    <td class="centra-text">01</td>
                  </tr>
                  <tr>
                    <td><label class="label">Claves de observacion:</label></td>
                    <td class="centra-text">Si</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%;">
                <tbody>
                  <tr>
                    <td>
                        <label class="label">Observacion 1</label>
                        <label class="label">Observacion 2</label>
                        <label class="label">Observacion 3</label>
                        <label class="label">Observacion 4</label>
                        <label class="label">Observacion 5</label>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>    
        </div>
        <hr style="border: 1px solid #FF681E;">
        <div class="columns">
          <div class="column">
              <table class="table is-bordered is-striped" style="width:100%; text-align:center;">
                <tr>
                   <td class="centra-text">Decreto parametrico</td> 
                   <td class="centra-text">Monto autorizado</td> 
                   <td class="centra-text">Firma 1</td> 
                </tr>
                <tr>
                   <td class="centra-text"><b>APROBADO</b></td> 
                   <td class="centra-text">$567,980.00</td> 
                   <td class="centra-text">Firma 1</td> 
                </tr>
                <tr>
                   <td class="centra-text">Decreto Final</td> 
                   <td class="centra-text">Monto Otorgado</td> 
                   <td class="centra-text">Firma 2</td> 
                </tr>
                <tr>
                   <td class="centra-text"><b>APROBADO</b></td> 
                   <td class="centra-text">$767,180.00</td> 
                   <td class="centra-text">Firma 2</td> 
                </tr>
              </table>
              <br/><br/><br/>
          </div>
        </div>

    </section>`,
	data () {
		return {
			id: null
		}
	},
	methods: {
		genPDF: function () {		
			html2canvas(document.getElementById("detail-print"), {
				onrendered: function (canvas) {
					var img = canvas.toDataURL("image/url");
					var doc = new jsPDF();
					doc.addImage(img, 'JPEG', 20, 20);
					doc.save('test.pdf');
				}
			});
		},
	},
	beforeCreate: function() {

	},
	created: function () {

	},
	beforeMount: function() {

	},
	mounted: function() {
		this.genPDF();
	}
});