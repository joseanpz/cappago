var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');

var js_paths = [
	'js/components/data-table.js',
	'js/components/solicitud-step.js',
	'js/components/credito-step.js',
	'js/components/saldos-depositos-step.js',
	'js/components/laboral-step.js',
	
	'js/components/buro-credito-step.js',
	'js/components/estado-general-step.js',
	'js/components/resultado-perfilador-step.js',
	//'js/components/first-form-step.js',
	//'js/components/second-form-step.js',
	//'js/components/third-form-step.js',
	//'js/components/fourth-form-step.js',
	'js/components/eval-form.js',
	'js/components/detail.js',
	'js/controllers.js',
	'js/router.js',
	'js/main.js'
]

var js_assets_paths = [
	'js/assets/fontawesome.all.js',
	'js/assets/vue.min.js',
	'js/assets/vue-router.js',
	'js/assets/vue-form-wizard.js',
	'js/assets/vfg.min.js',
	'js/assets/jspdf.min.js',
	'js/assets/html2canvas.js',
	'js/assets/buefy.min.js'
]

var css_paths = [
	'css/assets/bulma.min.css',
	'css/assets/vue-form-wizard.min.css',
	'css/assets/vfg.css',
	'css/assets/materialdesignicons.min.css',
	'css/assets/buefy.min.css',
	'css/main.css'
]


gulp.task('scripts', function (){
	return gulp.src(js_paths)
    	.pipe(concat('all.js'))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('scripts-assets', function (){
	return gulp.src(js_assets_paths)
    	.pipe(concat('assets.js'))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('css-assets', function (){
	return gulp.src(css_paths)
    	.pipe(concat('assets.css'))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('html', function (){
	return gulp.src('index.html')
    	.pipe(htmlreplace({
        	'css': {
        		src: gulp.src('css/main.css'),
        		tpl: '<style> %s </style>'
        	},  // 'styles.min.css',
        	'js': {
        		src: gulp.src('dist/all.js'),
        		tpl: '<script>%s</script>'
	        },
	        /*'js-assets': {
	        	src: gulp.src('dist/assets.js'),
        		tpl: '<script>%s</script>'
	        }*/
    	}))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('watch:change', function(){
	gulp.watch('js/**/*.js', gulp.series('scripts', 'html'));
	gulp.watch('css/main.css', gulp.series('css-assets', 'html'));
	gulp.watch('index.html', gulp.series('html'));
});

gulp.task('default', gulp.series('scripts', 'html'));