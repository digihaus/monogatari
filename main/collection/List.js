/**
 * Exports the {@link module:collection/List~List|List} class.
 * @module collection/List
 */
define(
  [ 'core/Common' ], function( Common ) {

    /**
     * An ordered collection. The user of this interface has precise control over where in the list each element is inserted.
     * The user can access elements by their integer index (position in the list), search for elements, and iterate through it.
     *
     * @param {Array} [array] List of values
     * @class List
     */
    var List = function( array ) {
      this.values = Common.isArray( array ) ? array : [];
    };

    /**
     * Returns the length of the List
     * @method
     * @instance
     * @name size
     * @memberOf module:collection/List~List
     */
    List.prototype.size = function() {
      return this.values.length;
    };

    /**
     * Add a value to the List, allows nulls and repeated values
     * @method
     * @instance
     * @name put
     * @memberOf module:collection/List~List
     */
    List.prototype.put = function( value ) {
      this.values.push( value );
    };

    /**
     * Recover a value from the List, allows nulls and repeated values
     * @method
     * @instance
     * @name get
     * @param {Number} index The index position on the List
     * @memberOf module:collection/List~List
     */
    List.prototype.get = function( index ) {
      return this.values[ index ];
    };

    /**
     * Remove a value from the List
     * @method
     * @instance
     * @name remove
     * @param {Number} index The index position on the List
     * @return Array
     * @memberOf module:collection/List~List
     */
    List.prototype.remove = function( index ) {
      return this.values.splice( index, 1 );
    };

    /**
     * Check if the List is Empty
     * @method
     * @instance
     * @name isEmpty
     * @return boolean
     * @memberOf module:collection/List~List
     */
    List.prototype.isEmpty = function() {
      return !this.values.length;
    };

    /**
     * Clear the whole List, removing all references to it and signaling to be garbage collected
     * @method
     * @instance
     * @name clear
     * @memberOf module:collection/List~List
     */
    List.prototype.clear = function() {
      this.values.length = 0;
    };

    /**
     * Returns an array from the List
     * @method
     * @instance
     * @name toArray
     * @return Array
     * @memberOf module:collection/List~List
     */
    List.prototype.toArray = function() {
      return this.values.slice( 0 );
    };

    /**
     * Returns the first index of a given value
     * @method
     * @instance
     * @name indexOf
     * @return Object
     * @memberOf module:collection/List~List
     */
    List.prototype.indexOf = function( value ) {
      return Common.indexOf( value, this.values );
    };

    /**
     * Checks if a given value is part of the List
     * @method
     * @instance
     * @name contains
     * @param {Number} value The value o be checked
     * @return boolean
     * @memberOf module:collection/List~List
     */
    List.prototype.contains = function( value ) {
      return this.indexOf( value ) > -1;
    };

    /**
     * Creates and returns an Object with iterator functionality, allowing to navigate through the values stored on the List
     * @method
     * @instance
     * @name iterator
     * @return Object
     * @memberOf module:collection/List~List
     */
    List.prototype.iterator = function() {
      var Iterator = function( array ) {
        var index = -1;

        this.hasNext = function() {
          return index + 1 < array.length;
        };

        this.next = function() {
          return array[ ++index ];
        };

        this.hasPrevious = function() {
          return index > 0;
        };

        this.previous = function() {
          return array[ --index ];
        };

        this.first = function() {
          index = -1;
          return ( array.length > 0 ) ? array[ 0 ] : null;
        };

        this.last = function() {
          index = array.length - 1;
          return ( array.length > 0 ) ? array[ index ] : null;
        };
      };

      return new Iterator( this.values );
    };

    return List;
  }
);
