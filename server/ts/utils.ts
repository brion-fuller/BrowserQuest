import * as sanitizer from "sanitizer";
import * as Types from "../../shared/ts/gametypes";

export const sanitize = (string) => {
  console.log(sanitizer);
  // Strip unsafe tags, then escape as html entities.
  return sanitizer.escape(sanitizer.sanitize(string));
};

export const random = (range) => {
  return Math.floor(Math.random() * range);
};

export const randomRange = (min, max) => {
  return min + Math.random() * (max - min);
};

export const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const clamp = (min, max, value) => {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
};

export const randomOrientation = () => {
  var o,
    r = random(4);

  if (r === 0) o = Types.Orientations.LEFT;
  if (r === 1) o = Types.Orientations.RIGHT;
  if (r === 2) o = Types.Orientations.UP;
  if (r === 3) o = Types.Orientations.DOWN;

  return o;
};

export const Mixin = (target, source) => {
  if (source) {
    for (var key, keys = Object.keys(source), l = keys.length; l--; ) {
      key = keys[l];

      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

export const distanceTo = (x, y, x2, y2) => {
  var distX = Math.abs(x - x2);
  var distY = Math.abs(y - y2);

  return distX > distY ? distX : distY;
};
