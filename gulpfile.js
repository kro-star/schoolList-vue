import gulp from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';

const sass = gulpSass(dartSass);

gulp.task('browser-sync', function() {
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('scss', function(){ 
	return gulp.src('src/assets/scss/**/*.scss','style.scss') 
		.pipe(sass()) 
		.pipe(autoPrefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('src/assets/css')) 
		.pipe(browserSync.reload({stream: true}))
});
gulp.task('scss-style', function(){ 
	return gulp.src('src/style.scss') 
		.pipe(sass()) 
		.pipe(autoPrefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('src')) 
		.pipe(browserSync.reload({stream: true}))
});
