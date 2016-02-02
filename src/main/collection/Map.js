/**
 * Exports the {@link module:collection/Map~Map|Map} class.
 * @module collection/Map
 */

define(
  [ 'core/Common' ], function( Common ) {

    /**
     * An object that maps keys to values. A map cannot contain duplicate keys, each key can map to at most one value.
     * Does not allow null keys, but allow null values.
     * @class Map
     */
    var Map = function() {
      this.keySet = [];
      this.entries = [];
    };

    /**
     * Finds the position of a given key on the Map
     * @method
     * @abstract
     * @instance
     * @name indexOf
     * @param {Object} key The key value to be found
     * @memberOf module:collection/Map~Map
     * @returns {Number} index of given value on the array, -1 if not found;
     */
    Map.prototype.indexOf = function( key ) {
      return Common.indexOf( key, this.keySet );
    };

    /**
     * Check if given key exists within the Map
     * @method
     * @abstract
     * @instance
     * @name contains
     * @param {Object} key The key value to be found
     * @memberOf module:collection/Map~Map
     * @returns {Boolean}
     */
    Map.prototype.contains = function( key ) {
      return this.indexOf( key ) > -1;
    };

    /**
     * Return the length of the Map
     * @method
     * @abstract
     * @instance
     * @name size
     * @memberOf module:collection/Map~Map
     * @returns {Number}
     */
    Map.prototype.size = function() {
      return this.keySet.length;
    };

    /**
     * Associates the specified value with the specified key in this Map. If the map previously contained a mapping for the key, the old value is
     * replaced by the specified value. If no key is provided, no values are inserted.
     * @method
     * @abstract
     * @instance
     * @name put
     * @param {Object} key The key value
     * @param {Object} value The value to be stored
     * @memberOf module:collection/Map~Map
     */
    Map.prototype.put = function( key, value ) {
      if( key || key === 0 ) {
        if( !this.contains( key ) ) {
          this.keySet.push( key );
        }
        this.entries[ key ] = value;
      }
    };

    /**
     * Returns the value of a given key
     * @method
     * @abstract
     * @instance
     * @name get
     * @param {Object} key The key value
     * @memberOf module:collection/Map~Map
     * @returns {Object}
     */
    Map.prototype.get = function( key ) {
      return this.entries[ key ];
    };

    /**
     * Removes the reference of the key and the value from the map, and if there are no other references, flags both to garbage collection
     * @method
     * @abstract
     * @instance
     * @name remove
     * @param {Object} key The key value
     * @memberOf module:collection/Map~Map
     */
    Map.prototype.remove = function( key ) {
      var keyIndex = this.indexOf( key );
      if( keyIndex >= 0 ) {
        this.keySet.splice( keyIndex, 1 );
        delete this.entries[ key ];
      }
    };

    /**
     * Check if the map is empty
     * @method
     * @abstract
     * @instance
     * @name isEmpty
     * @memberOf module:collection/Map~Map
     * @returns {Boolean}
     */
    Map.prototype.isEmpty = function() {
      return this.size() === 0;
    };

    /**
     * Clear all keys and values, removing all references.
     * @method
     * @abstract
     * @instance
     * @name clear
     * @memberOf module:collection/Map~Map
     */
    Map.prototype.clear = function() {
      this.keySet.length = 0;
      this.entries.length = 0;
    };

    /**
     * Creates and returns an Object with iterator functionality, allowing to navigate through the values stored on the Map
     * @method
     * @abstract
     * @instance
     * @name iterator
     * @memberOf module:collection/Map~Map
     * @returns {Object}
     */
    Map.prototype.iterator = function() {
      var Iterator = function( keys, values ) {
        this.index = -1;

        this.hasNext = function() {
          return this.index + 1 < keys.length;
        };

        this.hasPrevious = function() {
          return this.index > 0;
        };

        this.next = function() {
          return values[ keys[ ++this.index ] ];
        };

        this.previous = function() {
          return values[ keys[ --this.index ] ];
        };

        this.first = function() {
          this.index = -1;
          return ( keys.length > 0 ) ? values[ keys[ 0 ] ] : null;
        };

        this.last = function() {
          this.index = keys.length - 1;
          return ( keys.length > 0 ) ? values[ keys[ this.index ] ] : null;
        };
      };

      return new Iterator( this.keySet, this.entries );
    };

    return Map;
  }
);
