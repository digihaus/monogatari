/**
 * Common utility class.
 * @exports util/CommonUtils
 */
var CommonUtils = {};

/**
 * Parses a given String to the float pixel value of it.
 * @param {String} text
 * @return {Number}
 * @example
 * parseUnitSizeToPixel('10pt'); //12.5
 * parseUnitSizeToPixel('10pc'); //150
 * parseUnitSizeToPixel('10mm'); //35.43307
 * parseUnitSizeToPixel('10cm'); //354.3307
 * parseUnitSizeToPixel('10in'); //900
 */
CommonUtils.parseUnitSizeToPixel = function (text) {
  var len = text.length - 2;
  if (len < 0) {
    return text;
  }
  if (text.indexOf('pt') === len) {
    return parseFloat(text.substring(0, len)) * 1.25;
  }
  if (text.indexOf('pc') === len) {
    return parseFloat(text.substring(0, len)) * 15;
  }
  if (text.indexOf('mm') === len) {
    return parseFloat(text.substring(0, len)) * 3.543307;
  }
  if (text.indexOf('cm') === len) {
    return parseFloat(text.substring(0, len)) * 35.43307;
  }
  if (text.indexOf('in') === len) {
    return parseFloat(text.substring(0, len)) * 90;
  }
  if (text.indexOf('px') === len) {
    return parseFloat(text.substring(0, len));
  }
  return parseFloat(text);
};

/**
 * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @example
 * alert( rgbToHex(0, 51, 255) ); // #0033ff
 */
CommonUtils.rgbToHex = function (r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * @example
 * alert( hexToRgb("#0033ff").g ); // "51";
 * alert( hexToRgb("#03f").g ); // "51
 */
CommonUtils.hexToRgb = function (hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(
    shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    }
  );

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Stores a given value on the Local Storage.
 * @param {String} key - Unique identifier on the Local Storage
 * @param {Object} val - The value to be stored
 * @param {Boolean} isObject - Boolean to flag if is an Object
 * @example
 * store('num', '1');
 * store('on', 'true');
 * store('name', 'pamela');
 * store('obj', {'hello': 'world'}, true);
 */
CommonUtils.store = function (key, val, isObject) {
  if (isObject) {
    localStorage.setItem(key, JSON.stringify(val));
  } else {
    localStorage.setItem(key, val);
  }
};

/**
 * Checks if a given object is a Monogatari GameObject.
 * @param {Object} object - The value to be tested
 * @return {Boolean}
 */
CommonUtils.isGameObject = function (object) {
  return (object && object.id && object.equals instanceof Function && object.update instanceof Function);
};

module.exports = CommonUtils;