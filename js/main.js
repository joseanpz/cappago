(function() {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
})();

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Home = { template: '#home-template' };
const EvalList = { template: '#list-template' };
const EvalForm = { template: '#form-template' };
const EvalUpdateForm = { template: '#updateform-template' };
const EvalDetail = { template: '#detail-template' };
 
Vue.component('DataTable', {
  props:  ['data', 'columns'],
  template: '#table-template'
})


const User = { template: '<div>User {{ $route.params.uname }}</div>' };

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  // { path: '/foo', component: Foo },
  // { path: '/bar', component: Bar },
  { path: '/', component: Home, name: 'home' },
  { path: '/evaluaciones', component: EvalList, name: 'evaluaciones' },
  { path: '/evaluar', component: EvalForm, name: 'evaluar' },
  { path: '/evaluaciones/:id', component: EvalDetail, name: 'evaluaciones-detalle' },
  { path: '/evaluar/:id', component: EvalUpdateForm, name: 'reevaluar' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  
  data() {
            return {
              data_table() {  
                return {
                  data: [
                    { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                    { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                    { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                    { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                    { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
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
                  ]
                }            
                
              }
            }
  },
  router,
  /*computed: {
    username () {
      // We will see what `params` is shortly
      return this.$router.params.username
    }
  },*/
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}).$mount('#app')

// Now the app has started!