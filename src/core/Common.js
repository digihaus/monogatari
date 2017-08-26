/**
 * Useful common functions
 * @exports core/Common
 */
var Common = {
  sequence: 0
};

/**
 * Creates a sequential runtime unique ID.
 * @return {Number}
 */
Common.createUniqueId = function () {
  return this.sequence++;
};

/**
 * Check if a given object is equal to another object.
 * @param {Object} obj - First object
 * @param {Object} other - Second object
 * @return {Boolean}
 */
Common.equals = function (obj, other) {
  if (obj === null || other === null) {
    return obj === null && other === null;
  } else if (typeof obj === 'string') {
    return obj === other;
  } else if (typeof obj !== 'object') {
    return obj === other;
  } else if (obj.equals instanceof Function) {
    return obj.equals(other);
  }
  return obj === other;
};

/**
 * Finds the index of a value in a given Array.
 * @param {Object} value - The value to search for
 * @param {Array} array - An array through which to search
 * @param {Number} [i] - The index of the array at which to begin the search
 * @return {Number} Index of given value on the array, -1 if not found
 */
Common.indexOf = function (value, array, i) {
  var len;

  if (this.isArray(array)) {
    if (array.indexOf && typeof array.indexOf === 'function') {
      return array.indexOf(value, i);
    }

    len = array.length;
    i = i ? i < 0 ? max(0, len + i) : i : 0;

    for (; i < len; i++) {
      // Skip accessing in sparse arrays
      if (i in array && array[i] === value) {
        return i;
      }
    }
  }

  return -1;
};

/**
 * Return an string with the type of the given object.
 * @param {Object} obj
 * @return {String}
 */
Common.typeOf = function (obj) {
  return Object.prototype.toString.apply(obj);
};

/**
 * Check if given Object is an Array.
 * @param {Object} a
 * @return {Boolean}
 */
Common.isArray = function (a) {
  return this.typeOf(a) === '[object Array]';
};

module.exports = Common;