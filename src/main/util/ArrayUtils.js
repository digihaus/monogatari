/**
 * Exports the {@link module:util/ArrayUtils~ArrayUtils|ArrayUtils} class.
 * @module util/ArrayUtils
 */
define(
  //https://github.com/techfort/PowerArray
  [ 'util/CommonUtils' ], function( CommonUtils ) {

    /**
     * Utility class for arrays
     * @class ArrayUtils
     */
    var ArrayUtils = function() {};

    /**
     * Concatenates two Float32Arrays
     * @link http://stackoverflow.com/questions/4554252/typed-arrays-in-gecko-2-float32array-concatenation-and-expansion
     * @method
     * @instance
     * @param {Float32Array} first First array to be concatenated
     * @param {Float32Array} second Second array to be concatenated
     * @name float32Concat
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.float32Concat = function( first, second ) {
      var firstLength = first.length;
      var result = new Float32Array( firstLength + second.length );

      result.set( first );
      result.set( second, firstLength );

      return result;
    };

    /**
     * Sorts the contents of the given array
     * @method
     * @instance
     * @name quicksort
     * @param {Array} array Unsorted Array
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.quicksort = function( array ) {
      if( array.length === 0 ) {
        return [];
      }

      var head = [];
      var tail = [];
      var pivot = array[ 0 ];

      for( var i = 1, len = array.length; i < len; i++ ) {
        ( array[ i ] < pivot ) ? head[ head.length ] = array[ i ] : tail[ tail.length ] = array[ i ];
      }

      return this.quicksort( head ).concat( pivot, this.quicksort( tail ) );
    };

    /**
     * Create and return a new array containing non-repeating values
     * @method
     * @instance
     * @name unique
     * @param {Array} array Unsorted Array
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.unique = function( array ) {
      var newArr = [];
      var found = false;

      for( var x = 0, len = array.length; x < len; x++ ) {
        found = false;
        for( var y = 0; y < newArr.length; y++ ) {
          if( CommonUtils.equals( array[ x ], newArr[ y ] ) ) {
            found = true;
            break;
          }
        }

        if( !found ) {
          newArr.push( array[ x ] );
        }
      }

      return newArr;
    };

    /**
     * Sort the contents of the given Array alphabetically
     * @method
     * @instance
     * @name alphabeticalSort
     * @param {Array} array Unsorted Array
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.alphabeticalSort = function( array ) {
      if( this.isArray( array ) ) {
        array.sort(
          function( a, b ) {
            return ( a.group < b.group ) ? -1 : ( a.group < b.group ) ? 1 : 0;
          }
        );
        return array;
      } else {
        return null;
      }
    };

    /**
     * Removes elements of the given array
     * @method
     * @instance
      @link http://ejohn.org/blog/javascript-array-remove/
     * @name remove
     * @param {Array} array Array to be processed
     * @param {Number} from Array index
     * @param {Number} to Array index
     * @return {Array}
     * @example
     *  // Remove the second item from the array:
     *  array.remove(1);
     *  // Remove the second-to-last item from the array:
     *  array.remove(-2);
     *  // Remove the second and third items from the array:
     *  array.remove(1,2);
     *  // Remove the last and second-to-last items from the array:
     *  array.remove(-2,-1);
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.remove = function( array, from, to ) {
      var rest = array.slice( ( to || from ) + 1 || array.length );
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply( array, rest );
    };

    /**
     * Compares the contents of two given arrays
     * @method
     * @instance
     * @name remove
     * @param {Array} arr1 Array to be compared
     * @param {Array} arr2 Array to be compared
     * @return {Boolean}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.equals = function( arr1, arr2 ) {
      var len1 = arr1.length, len2 = arr2.length;

      if( len1 != len2 ) {
        return false;
      }

      for( var i = 0; i < len2; i++ ) {

        if( this.isArray( arr1[ i ] ) ) { // nested array
          if( !this.equals( arr1[ i ], arr2[ i ] ) ) {
            return false;
          } else {
            continue;
          }
        }

        if( !CommonUtils.equals( arr1[ i ], arr2[ i ] ) ) {
          return false;
        }
      }

      return true;
    };

    /**
     * Take the intersection between two arrays and returns elements present both.
     * @method
     * @instance
     * @name intersection
     * @param {Array} arr1 Array to be compared
     * @param {Array} arr2 Array to be compared
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.intersection = function( arr1, arr2 ) {
      var rest = concat.apply( Array.prototype, slice.call( arr2, 1 ) );

      return this.unique( arr1 ).filter(
        function( value ) {
          return this.inArray( value, rest );
        }
      );
    };

    /**
     * Produce an array that contains items that are on the first array and not on the second
     * @method
     * @instance
     * @name difference
     * @param {Array} arr1 Array to be compared
     * @param {Array} arr2 Array to be compared
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     */
    ArrayUtils.prototype.difference = function( arr1, arr2 ) {
      var rest = this.concat.apply( Array.prototype, this.slice.call( arr2, 1 ) );

      return this.unique( arr1 ).filter(
        function( value ) {
          return !this.inArray( value, rest );
        }
      );
    };

    /**
     * Splits the Array in sizeable chunks
     * @from Carlos R. L. Rodrigues http://jsfromhell.com/array/chunk [rev. #1]
     * @method
     * @instance
     * @name difference
     * @param {Array} a Array to be processed
     * @param {Number} s size of chunk
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     * @example
     * // Input
     * chunk([1,2,3,4,5,6,7], 3);
     * //Output:
     * [[1,2,3],[4,5,6],[7]];
     */
    ArrayUtils.prototype.chunk = function( a, s ) {
      for( var x, i = 0, c = -1, l = a.length, n = []; i < l; i++ ) {
        ( x = i % s ) ? n[ c ][ x ] = a[ i ] : n[ ++c ] = [ a[ i ] ];
      }
      return n;
    };

    /**
     * Creates a flat array (one dimensional)
     * @method
     * @instance
     * @name difference
     * @param {Array} arr Array to be processed
     * @return {Array}
     * @memberOf module:util/ArrayUtils~ArrayUtils
     * @example
     *  //Input:
     *  [[1,2,3],[4,5,6],[7]];
     *  //Output:
     *  [1,2,3,4,5,6,7];
     */
    ArrayUtils.prototype.flat = function( arr ) {
      return arr.reduce(
        function( a, b ) {
          return a.concat( b );
        }, []
      );
    };

    return new ArrayUtils();
  }
);
