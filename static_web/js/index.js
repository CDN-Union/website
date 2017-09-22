$(function() {
  var editor = editormd.markdownToHTML("test-editormd", {
    width  : "100%",
    height : 720,
    path   : '../lib/',
    htmlDecode      : "style,script,iframe",
    emoji           : true,
    taskList        : true,
    tocContainer    : "#custom-toc-container"

  });
});
