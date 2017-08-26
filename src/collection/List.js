var Common = require('core/Common');

/**
 * An ordered collection. The user of this interface has precise control over where in the list each element is inserted.
 * The user can access elements by their integer index (position in the list), search for elements and iterate through it.
 * @param {Array} [array] - Array of values
 * @requires module:core/Common
 * @exports collection/List
 */
var List = function (array) {
  this.values = Common.isArray(array) ? array : [];
};

/**
 * Returns the length of the list.
 * @return {Integer}
 */
List.prototype.size = function () {
  return this.values.length;
};

/**
 * Adds a value to the list, allows nulls and repeated values.
 * @param {Object} value - The value to add
 */
List.prototype.put = function (value) {
  this.values.push(value);
};

/**
 * Retrieves a value from the list.
 * @param {Number} index - The index position on the list
 * @return {Object|Null}
 */
List.prototype.get = function (index) {
  return this.values[index];
};

/**
 * Removes a value from the list, returning an array with remaining elements.
 * @param {Number} index - The index position on the List
 * @return {Array}
 */
List.prototype.remove = function (index) {
  return this.values.splice(index, 1);
};

/**
 * Checks if the list is empty.
 * @return {Boolean}
 */
List.prototype.isEmpty = function () {
  return !this.values.length;
};

/**
 * Clears the whole list, removing all references to it and signaling to be garbage collected.
 */
List.prototype.clear = function () {
  this.values.length = 0;
};

/**
 * Returns an array from the list
 * @return {Array}
 */
List.prototype.toArray = function () {
  return this.values.slice(0);
};

/**
 * Returns the first index of a given value.
 * @param {Number} value - The value to be checked
 * @return {Integer}
 */
List.prototype.indexOf = function (value) {
  return Common.indexOf(value, this.values);
};

/**
 * Checks if a given value is part of the list.
 * @param {Number} value - The value to be checked
 * @return {Boolean}
 */
List.prototype.contains = function (value) {
  return this.indexOf(value) > -1;
};

/**
 * Creates and returns an object with iterator functionality, allowing to navigate through the values stored on the list.
 * @return {Object} Iterator object.
 */
List.prototype.iterator = function () {
  var Iterator = function (array) {
    var index = -1;

    this.hasNext = function () {
      return index + 1 < array.length;
    };

    this.next = function () {
      return array[++index];
    };

    this.hasPrevious = function () {
      return index > 0;
    };

    this.previous = function () {
      return array[--index];
    };

    this.first = function () {
      index = -1;
      return (array.length > 0) ? array[0] : null;
    };

    this.last = function () {
      index = array.length - 1;
      return (array.length > 0) ? array[index] : null;
    };
  };

  return new Iterator(this.values);
};

module.exports = List;
