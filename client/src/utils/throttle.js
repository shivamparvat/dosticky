export function throttle(func, delay) {
  let lastExecuted = 0;
  return function () {
    const now = Date.now();
    if (now - lastExecuted >= delay) {
      func.apply(this, arguments);
      lastExecuted = now;
    }
  };
}
