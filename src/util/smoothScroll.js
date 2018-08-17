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
  var moving = false;
  // nothing new here, just the top of the document scroll position
  var pos = target.scrollTop;

  // mousewheel deprecated: https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel -> use wheel instead
  // target.addEventListener("mousewheel", scrolled, false);
  // Link for wheel event https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  target.addEventListener("wheel", scrolled, false);
  // Also deprecated: https://developer.mozilla.org/en-US/docs/Web/Events/DOMMouseScroll
  // target.addEventListener("DOMMouseScroll", scrolled, false);

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling
    var delta = e.delta || e.wheelDelta; // e.delta undefined in safari and chrome... maybe IE uses it?
    if (delta === undefined) {
      //we are on firefox
      delta = -e.deltaY;
    }
    // the original e.wheelDelta value is usually -100 through -1000, sometimes more, when scrolling down.
    // It just indicates how long a user scrolled the wheel.
    // And vice versa for scrolling up you'll get a positive value.
    // When the delta is a negative value, the new delta value becomes the -1 returned from Math.max which indicates user is scrolling down
    // When the delta is a positive value, the new delta value becomes the 1 returned from Math.max which indicates user is scrolling up
    delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency -> but why?

    // -120 if delta is positive (scrolling up)/120 if negative (scrolling down)
    // so if the earlier assigned pos = scrollTop was 1110 then the new pos will be 1230 if scrolling down
    // and if scrolling up then you can end up with  pos = scrollTop was 1140 and after it will be 1320
    // arbitrary numbers as the range varies, just working out what kind of numbers update() is using.
    // cause by this logic pos - target.scrollTop should just be a difference of 120
    pos += -delta * speed;

    const totalAmountOfVerticalScrollability =
      target.scrollHeight - target.clientHeight;
    // these calculations contrain the scrollTop to be 0 <= pos <= totalAmountOfVerticalScrollability
    // without this then if you scroll all the way to the top or bottom and keep scrolling,
    // when scrolling back down, it won't scroll naturally until it reaches that range again.
    pos = Math.max(0, Math.min(pos, totalAmountOfVerticalScrollability)); // limit scrolling

    if (!moving) update();
  }

  function update() {
    moving = true;
    // The faster the user scrolls the greater the difference between pos - target.scrollTop.
    // As delta is added to target.scrollTop it closes the distance between the two.
    // really delta is the inertia, and the scrollTop value slowly creeps up to the dela value with each
    // iteration of requestFrame. so long as a value greater than 1 in this line -> target.scrollTop += delta
    // then the scroll inertia will continue.
    var delta = (pos - target.scrollTop) / smooth;
    // console.log("Delta before absolute value: ", delta);
    console.log("The pos: ", pos);
    console.log("The target.scrollTop: ", target.scrollTop);
    console.log("Absolute Value of delta", Math.abs(delta));
    target.scrollTop += delta;
    // 0.9166666666666666 -> using the check of delta > 0.92 instead
    // because the original check was against 0.5, and I seem to be consistently getting
    // the 0.916 repeating across safari, chrome, and mozilla to prevent requestFrame from continually running
    // even when the user isn't scrolling.
    if (Math.abs(delta) > 0.92) requestFrame(update);
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
