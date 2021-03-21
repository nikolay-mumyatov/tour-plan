let project_folder = require("path").basename(__dirname); // папка с уже собранным проектом

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: "/",
    css: "/sass/style.sass",
    js: "/js/*.js",
    img: "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: "/fonts/**/*.{woff,woff2}",
  },
  wath: {
    html: "/**/*.html",
    css: "/sass/**/*.{sass,scss}",
    js: "/js/**/*.js",
    img: "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
  gulp = require('gulp');