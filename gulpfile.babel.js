//http://www.cnblogs.com/sunshine-anycall/p/6338010.html
import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'

// 配置需要处理的文件目录和转码之后文件的存放目录
const config = {
    source: 'src/**/*.js',
    dest: 'build',
}

gulp.task('babel-sourcemaps', () => {
    return gulp.src(config.source)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
})

gulp.task('babel', () => {
    return gulp.src(config.source)
        .pipe(babel())
        .pipe(gulp.dest(config.dest))
})

gulp.task('default', ['babel-sourcemaps'], function () {
    console.log(`gulp start ...`);
});