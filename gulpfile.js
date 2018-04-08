gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('testLess', function () {
    gulp.src('./style/index.less')
        .pipe(less())
        .pipe(gulp.dest('./style/'));
});

gulp.task('testWatch', function () {
    gulp.watch('./style/*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
});
