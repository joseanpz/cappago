var BuroCreditoStep = Vue.component('buro-credito-step',{
	template: `
		<section class="container">
			<div class="columns">
				<div class="column">
					<label class="label">Deuda total: </label>
					<input type="text" v-model="deuda_total" class="input" />
				</div>
				<div class="column">
					<label class="label">MONTHS_ON_FILE_CREDIT_AMT: </label>
					<input type="text" v-model="MONTHS_ON_FILE_BANKING" class="input" />
				</div>
				<div class="column">
					<label class="label">BK12_CLEAN: </label>
					<input type="text" v-model="BK12_CLEAN" class="input" />
				</div>
				<div class="column">
					<label class="label">BK12_MAX_CREDIT_AMT: </label>
					<input type="text" v-model="BK12_MAX_CREDIT_AMT" class="input" />
				</div>
				<div class="column">

				</div>
			</div>
		</section>
	`,
	data () {
		return {
			deuda_total: null,
			MONTHS_ON_FILE_BANKING: null,
			BK12_CLEAN: null,
			BK12_MAX_CREDIT_AMT: null,

		}
	},

	watch: {
		deuda_total: function (val) {
			this.$emit('total-debt-change', val);
		},
		MONTHS_ON_FILE_BANKING: function (val) {
			this.$emit('monfile-banking-change', val);
		},
		BK12_CLEAN: function (val) {
			this.$emit('bk12-clean-change', val);
		},
		BK12_MAX_CREDIT_AMT: function (val) {
			this.$emit('bk12maxcred-amt-change', val);
		},
		
	}
});