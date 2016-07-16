
var gulp = require('gulp');
var rename = require("gulp-rename");
var webpack = require('webpack-stream');

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
    .pipe(gulp.dest('../public/javascript'));
});


gulp.task('watch',function() {
  gulp.watch('src/**/*.js', ['build-js']);
});


gulp.task('default', ['build-js','watch']);


