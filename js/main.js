/* global $, Please */
(function() {
  'use strict';

  function changeColors(selector) {
    var $elems = $(selector);
    var colors = Please.make_color({ colors_returned: $elems.length });

    $elems.each(function(idx) {
      $(this).css('background', colors[idx]);
    });
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function changeTransitions(selector) {
    var $elems = $(selector);

    $elems.each(function() {
      var trans = getRandomArbitrary(0, 2);
      $(this).css('transition', 'background ' + trans + 's linear');
    });
  }

  function percentSize(num, total, perColumn, addUnit) {
    addUnit = addUnit === undefined ? true : addUnit;
    return ((pixelSize(num, total, perColumn, false) / total) * 100) + (addUnit ? '%' : '');
  }

  function pixelSize(num, total, perColumn, addUnit) {
    addUnit = addUnit === undefined ? true : addUnit;
    return (total / (num / perColumn)) + (addUnit ? 'px' : '');
  }

  function generateGrid(selector) {
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var $elems = $(selector);
    var width = percentSize($elems.length, windowWidth, GRID_COLUMNS);
    var height = pixelSize($elems.length, windowHeight, GRID_ROWS);

    $elems.css({
      height: height,
      width: width
    });
  }

  function throttle(fn, frequency) {
    frequency = frequency || 100;
    var timeout = false;

    return function() {
      if (timeout) {
        return;
      }

      timeout = setTimeout(function() {
        timeout = false;
      }, frequency);

      fn.apply(this, arguments);
    };
  }

  var GRID_COLUMNS = 4;
  var GRID_ROWS = 4;
  var $window = $(window);

  generateGrid('.c');
  changeTransitions('.c');
  changeColors('.c');

  $window.on('resize', function() {
    throttle(generateGrid.bind(null, '.c'), 500)();
  });

  setInterval(function() {
    changeTransitions('.c');
    changeColors('.c');
  }, 1000);
})();
