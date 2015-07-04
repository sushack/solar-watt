/*jslint node: true */
(function() {
    'use strict';
    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var concat = require('gulp-concat');
    var livereload = require('gulp-livereload');
    var del = require('del');
    var templateCache = require('gulp-angular-templatecache');
    var foreman = require('gulp-foreman');

    gulp.task('clean', function() {
        return del(['public']);
    });
    gulp.task('scripts', function() {
        return gulp.src([
                '!solarwatt/**/*.spec.js',
                'solarwatt/auth/auth.module.js',
                'solarwatt/auth/auth.factory.js',
                'solarwatt/**/*.module.js',
                'solarwatt/**/*.controller.js',
                'solarwatt/**/*.js',
                'solarwatt/app.js'
            ])
            .pipe(concat('main.js'))
            .pipe(gulp.dest('public/javascripts'))
            .pipe(rename({
                suffix: '.min'
            })).pipe(uglify())
            .pipe(gulp.dest('public/javascripts'));
    });
    gulp.task('template_cache', function() {
        return gulp.src('solarwatt/**/*.html')
            .pipe(templateCache({
                module: 'solarwatt.templates',
                standalone: true
            }))
            .pipe(gulp.dest('public/javascripts'));
    });

    gulp.task('favicon', function() {
        return gulp.src('favicon.ico')
            .pipe(gulp.dest('public'));
    });

    gulp.task('select2_images', function() {
        return gulp.src([
            'bower_components/select2/select2.png',
            'bower_components/select2/select2-spinner.gif',
            ])
            .pipe(gulp.dest('public/stylesheets'));
    });

    gulp.task('vendor_images', ['favicon', 'select2_images']);
    gulp.task('vendor_js', function() {
        return gulp.src(
                [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/select2/select2.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/lodash/lodash.js',
                    'bower_components/restangular/dist/restangular.js',
                    'bower_components/angular-loading-bar/build/loading-bar.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-touch/angular-touch.js',
                    'bower_components/angular-carousel/dist/angular-carousel.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-ui-select2/src/select2.js',
                    'bower_components/moment/moment.js',
                    'bower_components/angular-moment/angular-moment.js',
                    'bower_components/angular-timeago/src/timeAgo.js',
                    'bower_components/ngtoast/dist/ngToast.js'
                ])
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('public/javascripts'));
    });
    gulp.task('vendor_css', function() {
        return gulp.src(
                [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/angular-loading-bar/build/loading-bar.css',
                    'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
                    'bower_components/angular-carousel/dist/angular-carousel.css',
                    'bower_components/select2/select2.css',
                    'bower_components/ngtoast/dist/ngToast.css',
                    'bower_components/ngtoast/dist/ngToast-animations.css'
                ])
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest('public/stylesheets'));
    });
    gulp.task('vendor_css_map', function() {
        return gulp.src(
                [
                    'bower_components/bootstrap/dist/css/bootstrap.css.map',
                    'bower_components/angular-carousel/dist/angular-carousel.css.map'
                ])
            .pipe(gulp.dest('public/stylesheets'));
    });
    gulp.task('vendor_components', ['vendor_js', 'vendor_css', 'vendor_css_map', 'vendor_images']);
    gulp.task('watch', function() {
        // Watch .js files
        gulp.watch('solarwatt/**/*.js', ['scripts']);
        gulp.watch('solarwatt/**/*.html', ['template_cache']);
        // Create LiveReload server
        livereload.listen();
        // Watch any files in dist/, reload on change
        gulp.watch(['public/**']).on('change', livereload.changed);
        gulp.watch(['views/**']).on('change', livereload.changed);

        //foreman();
    });
    gulp.task('build', ['vendor_components', 'scripts', 'template_cache']);
    gulp.task('default', ['watch', 'build']);
    gulp.task('heroku:production', ['build']);
    return gulp;
})();
