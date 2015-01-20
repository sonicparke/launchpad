var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var glob = require('glob');
var runSequence = require('run-sequence');
var log = plug.util.log;
var paths = require('./gulp.config.json');
var del = require('del');

gulp.task('help', plug.taskListing);

///////////////////////////////////////////
//
// Delete the build folder then build again
//
///////////////////////////////////////////
gulp.task('clean-build', function(){
    runSequence('clean', 'build');
})


///////////////////////////////////////////
//
// Build
//
///////////////////////////////////////////
gulp.task('build', ['rev-and-inject', 'fonts', 'images'], function(){
    log('building')
});

///////////////////////////////////////////
//
// Rev & Inject
// Rev the concatenated & minified filenames
// And inject them into index.html in place
// Of the dev file links
//
///////////////////////////////////////////
gulp.task('rev-and-inject', ['js', 'vendorjs', 'css', 'vendorcss'], function() {
    log('Rev\'ing files and building index.html');

    var minified = paths.build + '**/*.min.*';
    var index = paths.app + 'index.html';
    var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);

    var stream = gulp
        // Write the revisioned files
        .src([].concat(minified, index)) // add all built min files and index.html
        .pipe(minFilter) // filter the stream to minified css and js
        .pipe(plug.rev()) // create files with rev's
        .pipe(gulp.dest(paths.build)) // write the rev files
        .pipe(minFilter.restore()) // remove filter, back to original stream

        // inject the files into index.html
        .pipe(indexFilter) // filter to index.html
        .pipe(inject('css/vendor.min.css', 'inject-vendor'))
        .pipe(inject('css/app.min.css', 'inject-app'))
        .pipe(inject('js/vendor.min.js', 'inject-vendor'))
        .pipe(inject('js/app.min.js', 'inject-app'))
        .pipe(gulp.dest(paths.build)) // write the rev files
        .pipe(indexFilter.restore()) // remove filter, back to original stream

        // replace the files referenced in index.html with the rev'd files
        .pipe(plug.revReplace()) // Substitute in new filenames
        .pipe(gulp.dest(paths.build)) // write the index.html file changes
        .pipe(plug.rev.manifest()) // create the manifest (must happen last or we screw up the injection)
        .pipe(gulp.dest(paths.build)); // write the manifest

    function inject(path, name) {
        var pathGlob = paths.build + path;
        var options = {
            relative:true,
            addRootSlash:false,
            //ignorePath: paths.build.substring(1),
            ignorePath:['../','../../','../../../','build/'],
            read: false

        };
        if (name) {
            options.name = name;
        }
        return plug.inject(gulp.src(pathGlob), options);
    }
});

///////////////////////////////////////////
//
// Cacatenate & minify app specific js files
//
///////////////////////////////////////////
gulp.task('js', ['templatecache'], function(){
    return gulp
        .src(['app/**/*.js', '!app/**/*.min.js', '!app/libs/**/*.js'])
        .pipe(plug.concat('app.min.js'))
        .pipe(plug.ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        //.pipe(plug.uglify({
        //    mangle: true
        //}))
        .pipe(gulp.dest(paths.build + 'js/'))
});

///////////////////////////////////////////
//
// Concatenate & minify vendor js files
//
///////////////////////////////////////////
gulp.task('vendorjs', function(){
    return gulp
        //.src(['app/libs/**/*.js', '!app/libs/**/*.min.js'])
        .src(paths.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        //.pipe(plug.uglify({
        //    mangle: true
        //}))
        .pipe(gulp.dest(paths.build + 'js/'))
});

///////////////////////////////////////////
//
// Concatenate & minify app specific css files
//
///////////////////////////////////////////
gulp.task('css', function() {
    log('Bundling, minifying, and copying the app\'s CSS');
    var dest = paths.build +  'css';
    return gulp.src(paths.css)
        .pipe(plug.concat('app.min.css')) // Before bytediff or after
        //.pipe(plug.autoprefixer('last 2 version', '> 5%'))
        //.pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        //.pipe(plug.bytediff.stop(bytediffFormatter))
        //        .pipe(plug.concat('all.min.css')) // Before bytediff or after
        .pipe(gulp.dest(dest));
});

///////////////////////////////////////////
//
// Concatenate & minify vendor css files
//
///////////////////////////////////////////
gulp.task('vendorcss', function() {
    log('Compressing, bundling, copying vendor CSS');

    var filter = plug.filter(['**/*.css']);

    var dest = paths.build + 'css';
    return gulp
        .src(paths.vendorcss)
        .pipe(filter)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(plug.minifyCss({}))
        .pipe(gulp.dest(dest));
});

///////////////////////////////////////////
//
// Optimize & move images
//
///////////////////////////////////////////
gulp.task('images', function() {
    log('Compressing, caching, and copying images');

    var filter = plug.filter(['**/*.jpg','**/*.png','**/*.svg','**/*.gif']);

    var dest = paths.build + 'images';
    return gulp
        .src(paths.images)
        .pipe(filter)
        .pipe(plug.imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(dest));
});

///////////////////////////////////////////
//
// Move Fonts
//
///////////////////////////////////////////
gulp.task('fonts', function() {
    var fileFilter = plug.filter(['**/*.eot','**/*.svg','**/*.ttf','**/*.woff']);
    var dest = paths.build + 'fonts';
    log('Copying fonts');
    return gulp
        .src(paths.fonts)
        .pipe(fileFilter)
        .pipe(gulp.dest(dest));
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src(paths.htmltemplates)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(paths.build));
});

///////////////////////////////////////////
//
// Clean ./build Folder
//
///////////////////////////////////////////
gulp.task('clean', function(cb) {
    log('Cleaning: ' + plug.util.colors.red(paths.build));

    var delPaths = [].concat(paths.build);
    del(delPaths, cb);
});