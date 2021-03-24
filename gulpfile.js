let project_folder = require("path").basename(__dirname); // папка с уже собранным проектом

let path = {
  build: {
    // готовые файлы проекта
    html: project_folder + "/",
    php: project_folder + "/",
    phpmaler: project_folder + "/php/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    // исходные файлы
    html: "./*.html",
    php: "./*.php",
    css: "./sass/style.sass",
    js: "./js/main.js",
    img: "./img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: "./fonts/**/*.{woff,woff2}",
  },
  watch: {
    // файлы, за изменением которых нужно следить
    html: "./*.html",
    php: "./*.php",
    css: "./sass/**/*.{sass,scss}",
    js: "./js/**/*.js",
    img: "./img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"), // подключение gulp
  browsersync = require("browser-sync").create(), // подключение browserSync для обновления страницы
  del = require("del"), // удаление папки
  sass = require("gulp-sass"), // подключение gulp-sass
  autoprefixer = require("gulp-autoprefixer"), // автоматическое добовление вендорных префиксов к css
  mediaqueries = require("gulp-group-css-media-queries"), // собирает медиа-файлы, групирует и ставит в конец файла css
  clean_css = require("gulp-clean-css"), // чистит и сжимает css
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default, // чистит и сжимает js
  imagemin = require("gulp-imagemin"); // сжимает изображения.

// подключение сервера browserSync
function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

// копирование файлов html и php в папку с проектом
function html() {
  return (
    src(path.src.html).pipe(dest(path.build.html)),
    src(path.src.php).pipe(dest(path.build.php)).pipe(browsersync.stream())
  );
}

function phpmaler() {
  return (src("./php/**/*.php"))
    .pipe(dest(path.build.phpmaler)
    );
}

// получение стилей слайдера в проект
function slider() {
  return src("css/swiper-bundle.min.css").pipe(dest(path.build.css));
}

// cбор, оптимизация и минификация SASS
function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(mediaqueries())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: false,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// cбор, оптимизация и минификация javascript
function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(src("./js/*min.js"))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

//
function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 5, // 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

// загрузка шрифтов в проект
function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream());
}

// функция слежки за файлами
// function watchFiles(params) {
//   gulp.watch([path.watch.html], html);
//   gulp.watch([path.watch.php], html);
//   gulp.watch([path.watch.css], css);
//   gulp.watch([path.watch.js], js);
//   gulp.watch([path.watch.img], images);
// }

// Очистка папки с проектом
function clean(params) {
  return del(path.clean);
}

gulp.task("del", () => {
  return del([project_folder]);
});

let build = gulp.series(clean,gulp.parallel(slider, css, js, html, phpmaler, fonts, images));
let watch = gulp.parallel(build, browserSync);

// привязка переменных к gulp
exports.phpmaler = phpmaler;
exports.slider = slider;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
