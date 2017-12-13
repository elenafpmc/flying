/////////////////////////
//
// Variables
//
/////////////////////////

var gulp = require('gulp');
var config = require('./config.json');
var util = require('gulp-util');
//var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var newer = require('gulp-newer');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var critical = require('critical');
var inlineCss = require('gulp-inline-css');
var cssnano = require('gulp-cssnano');
var sendmail = require('gulp-mailgun');
var notify = require("gulp-notify");
var sftp = require('gulp-sftp');
var svgSprite = require('gulp-svg-sprite');
var fileinclude = require('gulp-file-include');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);
// var hologram = require('gulp-hologram');
const pngquant = require('imagemin-pngquant');

var critical = require('critical').stream;


var fontName = 'Icons';



/////////////////////////
//
// VirtualServer Tasks
//
/////////////////////////

gulp.task('browserSync', function() {
  browserSync.init({
	files: ['./html/**/*.js','./html/**/*.php','./html/**/*.html'],
	proxy: config.app,
	open: "external"
  })
})


/////////////////////////
//
// PreCSS Tasks
//
/////////////////////////

gulp.task('sass',['sass-includes'], function() {

  return gulp.src(config.scss + '/*.scss')
	//.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError(function (error) {
	   return 'Error compilando SASS.\n' + error;
	})))
   //.pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.css + ''))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Styles task complete' }));;
});

gulp.task('sass-includes', function (callback) {
	var all = '_all.scss';
	glob(config.scss+'/**/'+ all, function (error, files) {
		files.forEach(function (allFile) {
			// Add a banner to warn users
			fs.writeFileSync(allFile, '// This is a dynamically generated file\n\n');

			var directory = path.dirname(allFile);
			var partials = fs.readdirSync(directory).filter(function (file) {
				return (
					// Exclude the dynamically generated file
					file !== all &&
					file !== '_reset.scss' &&
					file !== '_vars.scss' &&
					file !== '_mixins.scss' &&
					file !== '_colors.scss' &&
					// Only include _*.scss files
					path.basename(file).substring(0, 1) === '_' &&
					path.extname(file) === '.scss'
				);
			});

			// Append import statements for each partial
			partials.forEach(function (partial) {
				fs.appendFileSync(allFile, '@import "' + partial + '";\n');
			});
		});
	});

	callback();
});


/////////////////////////
//
// PostCSS Tasks
//
/////////////////////////

gulp.task('postcss', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
    ];
    return gulp.src(config.css + '/*.css')
	 //   .pipe(sourcemaps.init())
        .pipe(postcss(processors)).on('error', notify.onError(function (error) {
	   return 'Error PostCSS.\n' + error;
	}))
		//.pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(config.css + '/'))
    //Inyectamos el CSS
    //.pipe(browserSync.stream())
    ;
});


/////////////////////////
//
// JS Tasks
//
/////////////////////////

gulp.task('lint', function() {
  return gulp.src([config.js+'/async/app/**/*.js',config.js+'/critical/'])
    .pipe(jshint())
	.pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
//    .pipe(jshint.reporter('default'));
});

gulp.task('concatA', function() {
  return gulp.src([
  	config.js+'/_async/_core/_app/**/*.js',
  	config.js+'/_async/_core/_vendor/**/*.js',
  	config.js+'/_async/_core/_helpers/**/*.js',
  	config.js+'/_async/_core/_components/**/*.js',
  	config.js+'/_async/_core/*.js',
  	config.js+'/_async/_vendor/**/*.js',
  	config.js+'/_async/_helpers/**/*.js',
  	config.js+'/_async/_site/**/*.js',
  	config.js+'/_async/_pages/**/*.js',
  	config.js+'/_async/_blocks/**/*.js',
  	config.js+'/_async/*.js'
  	])
	//.pipe(sourcemaps.init())
    .pipe(concat('async.js')).on('error', notify.onError(function (error) {
	   return 'Error compilando Async JS.\n' + error;
	}))

//    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.js));
});

gulp.task('concatC', function() {
  return gulp.src([
  	config.js+'/_critical/_core/_app/**/*.js',
  	config.js+'/_critical/_core/_vendor/**/*.js',
  	config.js+'/_critical/_core/_helpers/**/*.js',
  	config.js+'/_critical/_core/_components/**/*.js',
  	config.js+'/_critical/_core/*.js',
  	config.js+'/_critical/_vendor/**/*.js',
  	config.js+'/_critical/_helpers/**/*.js',
  	config.js+'/_critical/_site/**/*.js',
  	config.js+'/_critical/_pages/**/*.js',
  	config.js+'/_critical/_blocks/**/*.js',
  	config.js+'/_critical/*.js'
  ])
//	.pipe(sourcemaps.init())
    .pipe(concat('critical.js')).on('error', notify.onError(function (error) {
	   return 'Error compilando Critical JS.\n' + error;
	}))
//    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.js));
});

gulp.task('concat', ['concatA','concatC'], function() {});


/////////////////////////
//
// Mail Tasks
//
/////////////////////////

gulp.task('mailInline', ['sftp'], function() {
	return gulp.src('mails/src/*.html')
    .pipe(inlineCss()).on('error', notify.onError(function (error) {
	   return 'Error inlining email.\n' + error;
	}))
   .pipe(gulp.dest('mails/'));
});

//gulp mail --src email-name --dest gmail
gulp.task('mail', function() {

	var mailTemplate = 'mails/'+util.env.src+'.html';
	var mailService = util.env.dest;

	if(mailService == 'gmail'){
		recipient = 'flyingpigs@gmail.es';
	}else if(mailService == 'outlook'){
		recipient = 'flyingpigs@outlook.es';
	}else if(mailService == 'yahoo'){
		recipient = 'flyingpigs@yahoo.com';
	}

	  gulp.src(mailTemplate) // Modify this to select the HTML file(s)
	  .pipe(sendmail({
	    key: 'key-1454f0442daac8f50836afcbaa86c9e0', // Enter your Mailgun API key here
	    sender: 'pruebas@flyingpigs.com',
	    recipient: recipient,
	    subject: 'This is a test email'
	  })).on('error', notify.onError(function (error) {
	   return 'Error enviando email test.\n' + error;
	}))
	  ;


});


gulp.task('sftp', function () {
	return gulp.src('mails/src/img/*')
		.pipe(newer('mails/src/img/*'))
		.pipe(sftp({
			host: '188.93.78.31',
			port: '2220',
			user: 'desarrollo',
			pass: '4k3n4t0n4mh0th3p',
			remotePath: '/var/www/vhosts/desarrolloadn.net/test/new',
		})).on('error', notify.onError(function (error) {
	   return 'Error subiendo FTP.\n' + error;
	}))
		;
});

/////////////////////////
//
// Icons
//
/////////////////////////

//
// Icons - sprite SVG
//


gulp.task('iconsvg', function () {

	return gulp.src(config.svg+'/icons/*.svg')
    .pipe(svgSprite(
		{
		    shape               : {
		        dimension       : {
		            maxWidth    : 64,
		            maxHeight   : 64
		        },
		        spacing         : {
		            padding     : 0
		        },
		    },
		    mode                : {
		        symbol          : true
		    },
			preview: {
                sprite: "index.html"
            }
		}
    )).on('error', notify.onError(function (error) {
	   return 'Error creando sprite SVG.\n' + error;
	}))
    .pipe(gulp.dest(config.svg));

});

//
// Icons - webfont
//

//gulp.task('iconfont', function(){
//  gulp.src(config.svg+'/icons/*.svg')
//    .pipe(iconfontCss({
//      fontName: 'Icons',
//      path: 'scss',
//      targetPath: config.scss+'_icons.scss',
//      fontPath: config.fonts,
//    }))
//    .pipe(iconfont({
//      fontName: 'Icons',
//      formats: ['ttf', 'eot', 'woff'],
//     }))
//    .pipe(gulp.dest('app/assets/fonts/icons/'));
//});

gulp.task('iconfont', function(){
  return gulp.src(config.svg+'/icons/*.svg')

  	.pipe(iconfontCss({
      fontName: 'Iconfont',
      path: 'css',
      //path: './html/scss/_components/_icons-template.css',
      targetPath: '../scss/_components/_icons-font.scss',
      fontPath: '../fonts/'
    }))

    .pipe(iconfont({
      fontName: 'Iconfont', // required
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs, options);
      })
    .pipe(gulp.dest(config.fonts));
});

/////////////////////////
//
// Static Template
//
/////////////////////////

gulp.task('build-html', function() {
  gulp.src(['./html/src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      config: '@file'
    })).on('error', notify.onError(function (error) {
	   return 'Error compilando HTML.\n' + error;
	}))
    .pipe(gulp.dest('./html'));
});

// gulp.task('hologram', function() {
//         gulp.src('hologram_config.yml')
//         .pipe(hologram())
//         .on('error', notify.onError(function (error) {
// 		   return 'Error generando UIKIT.\n' + error;
// 		}));
// });

/////////////////////////
//
// Optimization Tasks - Manual call
//
/////////////////////////

//
// CSS Optimization
//


//Urls separadas cuando trabajamos con un CMS
gulp.task('critical-home', function() {
    return critical.generate({
        src: 'http://www.flyingpigs.es',
        dest: config.css + '/critical/critical-home.css',
        width: 1200,
        height: 900,
        minify: true
    });
});


gulp.task('critical-contact', function() {
    return critical.generate({
        src: 'http://www.flyingpigs.es/contacto/',
        dest: config.css + '/critical/critical-contacto.css',
        width: 1200,
        height: 900,
        minify: true
    });
});

//All critical CMS declarations in one
gulp.task('criticalcms',[

	'critical-home',
	'critical-contact',

], function() {});


//Urls automáticas cuando son HTMLs planos
gulp.task('critical', ['build-html'], function () {
    return gulp.src('./html/*.html')

    	// Inline en HTML
        .pipe(critical({base: './html/', inline: true, minify:true, css: [config.css+'/styles.css']}))
        .on('error', notify.onError(function (error) {
		   return 'Error optimizando CSS.\n' + error;
		}))
        .pipe(gulp.dest('./html'))

        //CSS Externo
        .pipe(critical({base: './html/css/critical', inline: false, minify:true, css: [config.css+'/styles.css']}))
        .on('error', notify.onError(function (error) {
		   return 'Error optimizando CSS.\n' + error;
		}))
        .pipe(gulp.dest('./html/css/critical'));


});


gulp.task('cssnano', function() {
    return gulp.src(config.css + '/**/*.css')
//	    .pipe(sourcemaps.init())
    	.pipe(newer(config.css + '/**/*.css'))
        .pipe(cssnano())
        .on('error', notify.onError(function (error) {
		   return 'Error optimizando CSS.\n' + error;
		}))
//        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(config.css + ''));
});

//
// IMG Optimization
//

gulp.task('imagemin', function(){
    return gulp.src('./html/**/*.+(png|jpg|jpeg|gif|svg)')
	    .pipe(newer('./html/**/*.+(png|jpg|jpeg|gif|svg)'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .on('error', notify.onError(function (error) {
		   return 'Error optimizando imágenes.\n' + error;
		}))
        .pipe(gulp.dest('./'));
});


//
// JS Optimization
//

gulp.task('uglify', function() {
  return gulp.src(config.js + '/*.js')
  .pipe(newer(config.js + '/*.js'))
    .pipe(uglify())
    .on('error', notify.onError(function (error) {
	   return 'Error comprimiendo JS.\n' + error;
	}))

    .pipe(gulp.dest(config.js + ''));
});


//
// All in one optimization
//

gulp.task('optimize',[

	'critical',
	'uglify',
	'imagemin',
	'cssnano'

], function() {});


/////////////////////////
//
// Watch Tasks
//
/////////////////////////

gulp.task('default', ['browserSync'], function (){

	//CSS
	gulp.watch(config.scss + '/**/!(_all).scss', ['sass']);
	gulp.watch(config.css + '/**/*.css', ['postcss']);
	// gulp.watch(config.css + '/**/*.css', ['postcss','hologram']);
	//JS
	gulp.watch(config.js + '/_critical/**/*.js', ['lint','concatC']);
	gulp.watch(config.js + '/_async/**/*.js', ['lint','concatA']);
	// gulp.watch(config.js + '/*.js', ['hologram']);
	gulp.watch(config.js + '/*.js', browserSync.reload);

	//Theme
	gulp.watch('./html/src/**/*.html', ['build-html']);
	gulp.watch('./html/*.'+config.ext, browserSync.reload);

	//Icons
	gulp.watch(config.svg+'icons/*.svg', ['iconfont','iconsvg','sass','postcss']);
	gulp.watch(config.svg+'icons/*.svg', browserSync.reload);

	//Mails
	gulp.watch('mails/src/*.html', ['mailInline']);
	gulp.watch('mails/*.html', browserSync.reload);



});
