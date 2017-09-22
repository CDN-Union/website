'use strict';
var clientWidth ='', clientHeight = '';
function init() {
  clientWidth = document.body.clientWidth;
  clientHeight = 200;

  $(window).resize(function() {
    clientWidth = document.body.clientWidth;
    clientHeight = 200;

    $('#canvas').css({
      'width': clientWidth,
      'height': clientHeight
    });
  });
}
init();