
var gulp = require('gulp');
var rename = require("gulp-rename");
var webpack = require('webpack-stream');
var connect = require('gulp-connect');

gulp.task('build-js', function() {
  return gulp.src('./src/app.js')
    .pipe(webpack({
		module: {
			loaders: [
			  {
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference 
				query: {
				  presets: ['react', 'es2015']
				}
			  }
			]
		}
     }))
    .pipe(rename('app.bundle.js'))
    .pipe(gulp.dest('./www/script'));
});

gulp.task('build-css', function() {
  return gulp.src('./src/app.less')
    .pipe(less({

     }))
    .pipe(rename("app.css"))
    .pipe(gulp.dest('./www/style'));
});


gulp.task('page-reload', function () {
  gulp.src('./www/**/*.*')
    .pipe(connect.reload());
});

gulp.task('watch',function() {
  gulp.watch('src/**/*.js', ['build-js']);
  //gulp.watch('src/**/*.js', ['build-css']);  
  gulp.watch(['./www/**/*.*'], ['page-reload']);
});


gulp.task('server',function() {
  connect.server({
  	root: 'www',
  	livereload: true,
    //fallback: './www/nindex.html'
  });
});


gulp.task('default', ['server','build-js','watch']);


