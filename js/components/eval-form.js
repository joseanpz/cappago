Vue.use(VueFormWizard);

const EvalFormWizard = Vue.component('eval-form', {
	template: '<form-wizard> \
	             <tab-content title="Personal details"> \
			       My first tab content \
			     </tab-content> \
			     <tab-content title="Additional Info"> \
			       My second tab content \
			     </tab-content> \
			     <tab-content title="Last step"> \
			       Yuhuuu! This seems pretty damn simple \
			     </tab-content> \
			   </form-wizard>',
    

})