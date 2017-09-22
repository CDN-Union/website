const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const through = require('through2');
const showdown = require('showdown');
const fs = require('fs');
const merge = require('merge-stream');

function generateHTML(file, converter) {
    var tpl = fs.readFileSync('docs/mobileframework/doctpl.html', 'utf8');
    var contenttb = fs.readFileSync('docs/mobileframework/content-table.json', 'utf8');
    var ctb = JSON.parse(contenttb);
    var cnarray = ctb['zh-cn'];
    var ctbhtml = '';
    for(var i=0; i<cnarray.length; i++) {
        ctbhtml +='<a href="/docs/' + 'mobileframework' +cnarray[i].url
                +'">' + cnarray[i].name
                +'</a>';
    }
    var fileText = file.contents.toString();
    var fileHtml = converter.makeHtml(fileText);
    return tpl.replace('{contenttb}',ctbhtml).replace('{markdown}',fileHtml);
}

function gulpShowdown(options) {
    var defaultOptions = {}
    var converter = new showdown.Converter(options || defaultOptions)
    return through.obj(function(file, encoding, cb) {
        console.log('generating HTML: "' + file.path + '"');
        var pageHtml = generateHTML(file, converter);
        file.contents = new Buffer(pageHtml);
        file.path = gutil.replaceExtension(file.path, '.html');
        this.push(file);
        cb(null, file);
    })
}

gulp.task('md2html', function() {
  var folders = fs.readdirSync('docs/');
  var taskList = [];
  for(var j=0; j<folders.length;j++) {
    var task = gulp.src('docs/'+folders[j]+'/source/*.md')
        .pipe(gulpShowdown())
        .pipe(gulp.dest('../static_web/docs/' + folders[j]));
    taskList.push(task);
  }
  return merge(taskList);
});

