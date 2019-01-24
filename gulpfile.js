var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');

var js_paths = [
	'js/components/data-table.js',
	'js/components/first-form-step.js',
	'js/components/second-form-step.js',
	'js/components/third-form-step.js',
	'js/components/fourth-form-step.js',
	'js/components/eval-form.js',
	'js/controllers.js',
	'js/router.js',
	'js/main.js'
]


gulp.task('scripts', function (){
	return gulp.src(js_paths)
    	.pipe(concat('all.js'))
    	.pipe(gulp.dest('js/'));
});


gulp.task('html', function (){
	return gulp.src('index.html')
    	.pipe(htmlreplace({
        	'css': {
        		src: gulp.src('css/main.css'),
        		tpl: '<style>%s</style>'
        	},  // 'styles.min.css',
        	'js': {
        		src: gulp.src('js/all.js'),
        		tpl: '<script>%s</script>'
	        }
    	}))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('watch:change', function(){
	gulp.watch('js/**/*.js', gulp.series('scripts', 'html'));
	gulp.watch('css/main.css', gulp.series('html'));
	gulp.watch('index.html', gulp.series('html'));
});

gulp.task('default', gulp.series('scripts', 'html'));