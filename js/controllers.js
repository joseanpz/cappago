// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
	
const HomeController = { template: '#home-template' };

const EvalListController = { 
	template: '#list-template',
	components: {
      DataTable,
	},
	data() {
		return {
		  data: [
                { 'id': 1, 'user': { 'first_name': 'Jesse', 'last_name': 'Simmons' } , 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'user': { 'first_name': 'John', 'last_name': 'Jacobs' }, 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'user': { 'first_name': 'Tina', 'last_name': 'Gilbert' }, 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'user': { 'first_name': 'Clarence', 'last_name': 'Flores' }, 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'user': { 'first_name': 'Anne', 'last_name': 'Lee' }, 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
              ],
          columns: [
                {
                field: 'id',
                label: 'ID',
                width: '40',
                numeric: true
                },
                {
                field: 'first_name',
                label: 'First Name',
                },
                {
                field: 'last_name',
                label: 'Last Name',
                },
                {
                field: 'date',
                label: 'Date',
                centered: true
                },
                {
                field: 'gender',
                label: 'Gender',
                }
            ],
          isPaginated: true,
          isPaginationSimple: false,
          defaultSortDirection: 'asc',
          currentPage: 1,
          perPage: 5  
		}
	} 
};

const EvalFormController = { 
	template: '#form-template',
	components: {
		EvalFormWizard,
	} 
};

const EvalDetailController = {
  props: ['id'],
  template: '#detail-template',
  components: {
    DetailForm,
  }
};


const EvalUpdateFormController = {
  props: ['id'], 
  template: `
    <div>
      Update Form {{ id }}
      <section class="container">
        <div class="columns"> 
          <div class="column">
            <eval-form :id_solicitud="id"></eval-form>
          </div>  
        </div> 
      </section>
    </div>
  `,
  components: {
    EvalFormWizard,
  }
};
