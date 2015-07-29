define(
  function() {

    var Common = {
      sequence: 0
    };

    /**
     * @link http://stackoverflow.com/a/2117523
     * @returns {string}
     */
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

    Common.createUniqueId = function() {
      return this.sequence++;
    };

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
     * Usage: indexOf( value, array [, fromIndex] )
     *
     * @parameter value The value to search for.
     * @parameter array An array through which to search.
     * @parameter fromIndex The index of the array at which to begin the search. The default is 0, which will search the whole array.
     * @returns index of given value on the array, -1 if not found;
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

    Common.typeOf = function( obj ) {
      return Object.prototype.toString.apply( obj );
    };

    Common.isArray = function( a ) {
      return this.typeOf( a ) === '[object Array]';
    };

    return Common;
  }
);
