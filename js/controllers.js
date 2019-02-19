// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
	
const HomeController = { 
  template: `
    <div style="background-image: url('https://portalbanregio.s3.amazonaws.com/assets/naranja/img/Creditos-Empresa.jpg'); border-color: rgb(249, 161, 27); height:500px;">
      <section class="container">
        <div class="columns" > 
          <div class="column" style="padding:50px;">        
            <h2  style="color: #fff; font-size: 1.0em;">Segmento Negocios</h2>
            <h3 style="color: white; font-size: 3.0em;"><b>Cálculo de capacidad de pago</b></h3>
            <h3 style="color:white; font-size: 1.5em;">Evaluación y asignación de lineas simple y revolvente para el segmento negocios.</h3>        
          </div>      
        </div> 
      </section>
    </div>
  ` 
};

const EvalListController = { 
	template: `
    <div>
      <section class="container" style="margin-top: 20px;">
        <div class="columns"> 
          <div class="column">                 
              <data-table class="table is-bordered is-striped is-hoverable" id="listado"></data-table>
          </div>        
        </div>
      </section>
    </div>
  `,
	components: {
      DataTable,
	},
};

const EvalFormController = { 
	template: `
    <div>
      <section class="container" style="margin-top: 20px;">
        <div class="columns"> 
          <div class="column">
            <eval-form @move-to-success-route="moveToListRoute"></eval-form>
          </div>  
        </div> 
      </section>
    </div>
  `,
  
	components: {
		EvalFormWizard,
	},

  methods: {
    moveToListRoute: function () {
      console.log('pushing list route')
      this.$router.push('/evaluaciones');
    }
  }
};

const EvalDetailController = {
  props: ['id'],
  template: `
    <detail v-bind="$props"></detail>
  `,
  components: {
    DetailForm,
  }
};


const EvalUpdateFormController = {
  props: ['id'], 
  template: `
    <div>
      <section class="container">
        <div class="columns"> 
          <div class="column">
            <eval-form :id_solicitud="id" @move-to-success-route="moveToListRoute"></eval-form>
          </div>  
        </div> 
      </section>
    </div>
  `,

  components: {
    EvalFormWizard,
  },

  methods: {
    moveToListRoute: function () {
      console.log('pushing list route')
      this.$router.push('/evaluaciones');
    }
  }
};
