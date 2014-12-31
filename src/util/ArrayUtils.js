define( [ 'core/CommonUtils' ], function( _CommonUtils ) {

  return {

    // http://stackoverflow.com/questions/4554252/typed-arrays-in-gecko-2-float32array-concatenation-and-expansion
    float32Concat: function( first, second ) {
      var firstLength = first.length;
      var result = new Float32Array( firstLength + second.length );

      result.set( first );
      result.set( second, firstLength );

      return result;
    },

    quicksort: function( array ) {
      if ( array.length === 0 ) {
        return [];
      }

      var head = [];
      var tail = [];
      var pivot = array[ 0 ];

      for ( var i = 1, len = array.length; i < len; i++ ) {
        ( array[ i ] < pivot ) ? head[ head.length ] = array[ i ] : tail[ tail.length ] = array[ i ];
      }

      return this.quicksort( head ).concat( pivot, this.quicksort( tail ) );
    },

    unique: function( array ) {
      var newArr = [];
      var found = false;

      for ( var x = 0, len = array.length; x < len; x++ ) {
        found = false;
        for ( var y = 0; y < newArr.length; y++ ) {
          if ( _CommonUtils.equals( array[ x ], newArr[ y ] ) ) {
            found = true;
            break;
          }
        }

        if ( !found ) {
          newArr.push( array[ x ] );
        }
      }

      return newArr;
    },

    /* side-effect */
    aphabeticalSort: function( array ) {
      if ( this.isArray( array ) ) {
        array.sort( function( a, b ) {
          return ( a.group < b.group ) ? -1 : ( a.group < b.group ) ? 1 : 0;
        } );
        return array;
      } else {
        return null;
      }
    },
    
    /**
    * @link http://ejohn.org/blog/javascript-array-remove/
    * @example Remove the second item from the array = array.remove(1);
    * @example Remove the second-to-last item from the array = array.remove(-2);
    * @example Remove the second and third items from the array = array.remove(1,2);
    * @example Remove the last and second-to-last items from the array = array.remove(-2,-1);
    */
    remove: function( array, from, to ) {
      var rest = array.slice( ( to || from ) + 1 || array.length );
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply( array, rest );
    },

    equals: function( arr1, arr2 ) {
      var len1 = arr1.length, len2 = arr2.length;

      if ( len1 != len2 ) {
        return false;
      }

      for ( var i = 0; i < len2; i++ ) {

        if ( this.isArray( arr1[ i ] ) ) { // nested array
          if ( !this.equals( arr1[ i ], arr2[ i ] ) ) {
            return false;
          }  else {
            continue;
          }
        }

        if ( !utils.equals( arr1[ i ], arr2[ i ] ) )
          return false;
        }
      }

      return true;
    },

    // Take the intersection between two arrays
    // returns elements present both arrays.
    // based on Underscore.js
    intersection: function( arr1, arr2 ) {
      var rest = concat.apply( Array.prototype, slice.call( arr2, 1 ) );

      return this.unique( arr1 ).filter( function( value ) {
        return this.inArray( value, rest );
      } );
    },

    // Produce an array that contains items that are on the first array and not on the second
    // based on Underscore.js
    difference: function( arr1, arr2 ) {
      var rest = concat.apply( Array.prototype, slice.call( arr2, 1 ) );

      var result = this.unique( arr1 ).filter( function( value ) {
        return !this.inArray( value, rest );
      } );

      return result;
    },

    // Carlos R. L. Rodrigues
    // @ http://jsfromhell.com/array/chunk [rev. #1]
    // Input :
    // chunk([1,2,3,4,5,6,7], 3)
    // Output:
    // [[1,2,3],[4,5,6],[7]]
    chunk: function( a, s ) {
      for ( var x, i = 0, c = -1, l = a.length, n = []; i < l; i++ ) {
        ( x = i % s ) ? n[ c ][ x ] = a[ i ] : n[ ++c ] = [ a[ i ] ];
      }
      return n;
    },

    // Input :
    // [[1,2,3],[4,5,6],[7]]
    // Output:
    // [1,2,3,4,5,6,7]
    flat: function( arr ) {
      return arr.reduce( function( a, b ) {
        return a.concat( b );
      }, [] );
    }

  }

} );
