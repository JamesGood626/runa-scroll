import bowser from "bowser";

export const SmoothScroll = (target, speed, smooth) => {
  // SmoothScroll works in chrome and firefox with both document.documentElement and document.body.parentNode
  // the above two don't work in safari
  // SmoothScroll works in safari with document.body
  // document.body doesn't allow SmoothScroll in chrome and firefox
  // In all cases where it doesn't work, there's no scrolling at all.
  const browser = bowser
    .getParser(navigator.userAgent)
    .getBrowserName()
    .toLowerCase();
  console.log("BROWSER: ", browser);
  if (target === document) {
    if (browser === "chrome" || browser === "firefox") {
      target = document.documentElement || document.body.parentNode;
    } else if (browser === "safari") {
      target = document.body;
    } else {
      // Have yet to test this on IE....
      target =
        document.documentElement || document.body.parentNode || document.body; // cross browser support for document scrolling
    }
  }
  console.log("THIS IS THE TARGET: ", target);
  var moving = false;
  var pos = target.scrollTop;
  target.addEventListener("mousewheel", scrolled, false);
  target.addEventListener("DOMMouseScroll", scrolled, false);

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling
    var delta = e.delta || e.wheelDelta;
    if (delta === undefined) {
      //we are on firefox
      delta = -e.detail;
    }
    delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function update() {
    moving = true;
    var delta = (pos - target.scrollTop) / smooth;
    target.scrollTop += delta;
    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function() {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
};
