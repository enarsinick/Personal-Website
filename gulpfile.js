const gulp = require('gulp');
const sass = require('gulp-sass');

// Compile Sass
gulp.task('sass', async () => {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('default', async() => {
    gulp.watch('sass/*.scss', gulp.series('sass'));
})