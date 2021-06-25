// Определяем переменную "preprocessor"
// let preprocessor = 'scss'; 

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');

// Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass');
const less = require('gulp-less');

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем gulp-imagemin для работы с изображениями
const imagemin = require('gulp-imagemin');

// Подключаем модуль gulp-newer
const newer = require('gulp-newer');

// Подключаем модуль del
const del = require('del');

//Конвертація шрифта з ттф в воф
const ttf2woff = require('gulp-ttf2woff');

//Конвертація шрифта з ттф в воф2
const ttf2woff2 = require('gulp-ttf2woff2');

//convert otf in ttf
const gulpfonter = require('gulp-fonter');

const include = require('gulp-file-include');

// ===================================My settings========================================
// Збирає всі медіа запроси в кінець
const gulpmedia = require('gulp-group-css-media-queries');

// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'app/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function html() {
	return src('app/**.html')
		.pipe(include({
			prefix: '@@',
		}))
		.pipe(dest('app/'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([ // Берём файлы из источников
		'app/js/app.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
		.pipe(concat('app.min.js')) // Конкатенируем в один файл
		 .pipe(uglify()) // Сжимаем JavaScript
		.pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
		.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function styles() {
	return src([
		'node_modules/normalize.css/normalize.css',
		'app/scss/main.scss']) // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
		.pipe(sass())
		.pipe(gulpmedia())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
		.pipe(concat('app.main.css')) // Конкатенируем в файл app.min.js
		.pipe(cleancss({ level: { 1: { specialComments: 0 } }, format: 'beautify' })) // Минифицируем стили
		.pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
		.pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
		.pipe(cleancss({ level: { 1: { specialComments: 0 } }, /*format: 'beautify'  */ })) // Минифицируем стили
		.pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"



		.pipe(browserSync.stream()) // Сделаем инъекцию в браузер

}

function fountInWoff() {
	src('app/fonts/**/*.ttf')
		.pipe(ttf2woff())
		.pipe(dest('app/fonts'))
	return src('app/fonts/**/*.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts'))
		.pipe(browserSync.stream())
}
function fountInTtf() {
	return src('app/fonts/**/*.otf')
		.pipe(gulpfonter({ formats: ['ttf'] }))
		.pipe(dest('app/fonts'))
		.pipe(browserSync.stream())
}


function images() {
	return src('app/images/src/**/* ') // Берём все изображения из папки источника
		.pipe(newer('app/images/dest/')) // Проверяем, было ли изменено (сжато) изображение ранее
		.pipe(imagemin()) // Сжимаем и оптимизируем изображеня
		.pipe(dest('app/images/dest/')) // Выгружаем оптимизированные изображения в папку назначения
		.pipe(browserSync.stream())
}

function cleanimg() {
	return del('app/images/dest/**/*', { force: true }) // Удаляем всё содержимое папки "app/images/dest/"
}

function buildcopy() {
	return src([ // Выбираем нужные файлы
		'app/css/**/*.min.css',
		'app/css/**/*main.css',
		'app/fonts/**/*.woff',
		'app/fonts/**/*.woff2',
		'app/js/**/*.min.js',
		'app/images/dest/**/*',
		'app/**/*.html',
	], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
		.pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}

function cleandist() {
	return del('dist/**/*', { force: true }) // Удаляем всё содержимое папки "dist/"
}

function startwatch() {

	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);

	// Мониторим файлы препроцессора на изменения
	watch('app/scss/**/*.scss', styles);

	// Мониторим файлы HTML на изменения
	watch('app/**/*.html').on('change', browserSync.reload);

	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('app/images/src/**/*', images);

}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

exports.html = html;

// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспортируем функцию fountInWoff() в таск fountInWoff
exports.fountInWoff = fountInWoff;

// Экспортируем функцию gulpfonter() в таск gulpfonter
exports.gulpfonter = gulpfonter;

// Экспорт функции images() в таск images
exports.images = images;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

// Создаём новый таск "build", который последовательно выполняет нужные операции



// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(exports.build = series(cleandist, parallel(styles, scripts, images, html, fountInTtf, fountInWoff), buildcopy), browsersync, startwatch);