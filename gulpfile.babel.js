//http://www.cnblogs.com/sunshine-anycall/p/6338010.html
import gulp from 'gulp';
import babel from 'gulp-babel';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

// 配置需要处理的文件目录和转码之后文件的存放目录
const config = {
    source: 'src/**/*.js',
    dest: 'build',
}

const nofity_config = {
    title:'任务通知',
    onLast: true,
    message: "编译完成 @ <%= options.date %>",
    templateOptions: {
        date: new Date().toLocaleString()
    }
}

gulp.task('babel', () => {
    return gulp.src(config.source)
        // .pipe(sourcemaps.init())
        .pipe(babel())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
        .pipe(notify(nofity_config));
})

gulp.task('clean',function(cb){
    del([config.dest],cb);
});

gulp.task('default', function () {
    gulp.watch(['src/**/*.js'],['clean','babel'])
});