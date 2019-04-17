const gulp = require('gulp');

gulp.task('default', function () {
    // to do 
    return gulp.src('log')
        .pipe(gulp.dest('dist'));
});