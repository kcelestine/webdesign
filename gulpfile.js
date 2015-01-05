var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync');

var jsSources = [
	'js/vendor/jquery-1.11.1.min.js',
	'js/plugins.js',
	'js/main.js'
];
var sassSources = ['sass/style.scss'];
var htmlSources = ['**/*.html'];

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			css: 'css',
			sass: 'sass',
			image: 'img',
			javascript: 'js',
			font: 'fonts',
			style: 'compressed'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js', 'bs-reload']);
	gulp.watch('sass/**/*.scss', ['compass']);
	gulp.watch(htmlSources, ['bs-reload']);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        logLevel: "silent",
        notify: false
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['js', 'compass', 'browser-sync', 'watch']);