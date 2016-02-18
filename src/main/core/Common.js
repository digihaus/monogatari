/**
 * Exports the {@link module:core/Common~Common|Common} class.
 * @module core/Common
 */

define(
  function() {

    /**
     * Useful common functions
     *
     * @class Common
     */
    var Common = {
      sequence: 0
    };

/*
    Common.createUniqueId = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g, function( c ) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
          return v.toString( 16 );
        }
      );
    };
*/

    /**
     * Returns a sequential unique ID
     * @method
     * @instance
     * @name createUniqueId
     * @link http://stackoverflow.com/a/2117523
     * @memberOf module:core/Common~Common
     */
    Common.createUniqueId = function() {
      return this.sequence++;
    };

    /**
     * Check if a given Object is equal to another object
     * @method
     * @instance
     * @name equals
     * @param {object} obj
     * @param {object} other
     * @return {String}
     * @memberOf module:core/Common~Common
     */
    Common.equals = function( obj, other ) {
      if( obj === null || other === null ) {
        return obj === null && other === null;
      }
      if( typeof obj === 'string' ) {
        return obj === other;
      }
      if( typeof obj !== 'object' ) {
        return obj === other;
      }
      if( obj.equals instanceof Function ) {
        return obj.equals( other );
      }
      return obj === other;
    };

    /**
     * Find the index of a value in a given Array
     * @method
     * @instance
     * @name indexOf
     * @param {Object} value The value to search for.
     * @param {Array} array An array through which to search.
     * @param {Number} i The index of the array at which to begin the search. The default is 0, which will search the whole array.
     * @return index of given value on the array, -1 if not found;
     * @memberOf module:core/Common~Common
     */
    Common.indexOf = function( value, array, i ) {
      var len;

      if( this.isArray( array ) ) {
        if( array.indexOf && typeof array.indexOf === 'function' ) {
          return array.indexOf( value, i );
        }

        len = array.length;
        i = i ? i < 0 ? max( 0, len + i ) : i : 0;

        for( ; i < len; i++ ) {
          // Skip accessing in sparse arrays
          if( i in array && array[ i ] === value ) {
            return i;
          }
        }
      }

      return -1;
    };

    /**
     * Return an string with the type of the given Object
     * @method
     * @instance
     * @name typeOf
     * @param {Object} obj
     * @return {String}
     * @memberOf module:core/Common~Common
     */
    Common.typeOf = function( obj ) {
      return Object.prototype.toString.apply( obj );
    };

    /**
     * Check if given Object is an Array
     * @method
     * @instance
     * @name isArray
     * @param {Object} a
     * @return {Boolean}
     * @memberOf module:core/Common~Common
     */
    Common.isArray = function( a ) {
      return this.typeOf( a ) === '[object Array]';
    };

    return Common;
  }
);
