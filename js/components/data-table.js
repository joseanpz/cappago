const DataTable = Vue.component('data-table', {
  props:  ['data', 'columns'],
  //template: '<span>Test</span>'
  template: `<b-table\
                :data="data" \
                :columns="columns" \
                :row-class="(row, index) => row.id === 1 && 'is-info'"> \
            </b-table>`
})