//引入gulp
var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss= require('gulp-minify-css');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var reload  = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps')

var date='201501/20150119/';

//项目debug目录地址
var spath={
    scripts: 'views/source/js/**/*.js',
    less:    'view/source/'+date+'less/*.less'
}
//项目release目录地址
var rpath={
    scripts: 'view/public/'+date+'js',
    css:    'view/public/'+date+'css'
}

// 编译less
gulp.task('less', function() {
    gulp.src(spath.less)
            .pipe(less())
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(rpath.css))
        .pipe(reload({stream:true}));
});

//合并压缩js文件
gulp.task('scripts', function() {
    gulp.src(spath.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('base.js'))
        .pipe(rename('base.min.js')) //本地调试环境
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename('script.min.js'))  //正式线上链接
        .pipe(uglify())
        .pipe(gulp.dest(rpath.scripts));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('less','scripts');
    // 监听文件变化
    gulp.watch(spath.less, function(){
        gulp.run('less');
    });
    gulp.watch(spath.scripts, function(){
        gulp.run('scripts');
    });
});


