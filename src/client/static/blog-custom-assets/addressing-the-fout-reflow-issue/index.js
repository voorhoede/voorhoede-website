/* eslint-disable */
(function(w, d) {
  var hasCSSAnimations = ('animation' in document.body.style || '-webkit-animation' in document.body.style);
  if(hasCSSAnimations) {
    return false;
  }

  var DEMO_REFLOW_ID = 'figure-demo--reflow';
  var DEMO_LETTERSPACING_ID = 'figure-demo--letter-spacing';
  var frames = 500;
  var frameDuration = 16;
  var duration = frames*frameDuration;

  var stylesheet = (function() {
    var style = d.createElement('style');
    d.head.appendChild(style);
    return style.sheet;
  }());

  var demoReflow = d.getElementById(DEMO_REFLOW_ID);
  var demoReflowBase = demoReflow.querySelector('.base');
  var demoReflowEnhancement = demoReflow.querySelector('.enhancement');

  var demoLetterSpacing = d.getElementById(DEMO_LETTERSPACING_ID);
  var demoLetterSpacingBase = demoLetterSpacing.querySelector('.base');

  // Reflow animation
  demoReflowBase.style.opacity = 1;
  w.setInterval(function () {
    demoReflowBase.style.opacity = 1;
    demoReflowEnhancement.style.opacity = 0;
    w.setTimeout(function() {
      demoReflowBase.style.opacity = 0;
      demoReflowEnhancement.style.opacity = 1;
    }, duration/2);

  }, duration);

  // Letter-spacing animation
  w.setInterval(function () {
    demoLetterSpacingBase.style.letterSpacing = 0;
    w.setTimeout(function() {
      demoLetterSpacingBase.style.letterSpacing = '0.0385em';
    }, duration/2);
  }, duration);

  // progressBar animation
  var p = 0;
  w.setInterval(function () {
    stylesheet.cssText = '.demo-content:after { width: '+p/(frames/100)+'% !important }';
    p = (p===frames) ? 0 : p+1;
  }, frameDuration);

}(window, document));
/* eslint-enable */
