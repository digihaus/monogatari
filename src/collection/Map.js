/**
 * Map is an ordered Collection of elements paired by a key (index) and a value. A map cannot contain duplicate keys,
 * each key can map to one value or null. By inserting a value with an existing key, the index will be overwritten.
 */
define( [  'util/ArrayUtils', 'collection/Iterator' ], function( _Array, _Iterator ) {
  Monogatari.Map = Class.extend( {
    init : function( keys, values ) {
      this._keys = ( keys ) ? keys : new Array();
      this._values = ( values ) ? values : {};
    },

    contains : function( key ) {
      return _Array.inArray( key, this._keys );
    },

    get : function( key ) {
      return ( this.contains( key ) ) ? this._values[ key ] : null;
    },

    put : function( key, value ) {
      var k = ( key ) ? key : this.size();

      if ( !this.contains( k ) )
        this._keys.push( k );

      // if a value is provided, add it to the values array
      if ( value )
        this._values[ k ] = value;
      else
      // if a value is NOT provided AND there is no cached value on it, set the value to null
      // otherwise the cached value is returned
      if ( !this._values[ k ] )
        this._values[ k ] = null;

      return this._values[ k ];
    },

    size : function() {
      return this._keys.length;
    },

    // set null to a cached value
    nullify : function( key ) {
      if ( this._values[ key ] )
        this._values[ key ] = null;
    },

    concat : function( map ) {
      var keys = map.getKeys(), values = map.getValues();

      for ( var i = 0, len = keys.length; i < len; i++ )
        this.put( keys[ i ], values[ i ] );
    },

    // this function removes the key from array, but maintain the value cached
    remove : function( key ) {
      if ( this.contains( key ) )
        for ( var i = 0, len = this._keys.length; i < len; i++ )
          if ( this._keys[ i ] === key )
            this._keys.splice( i, 1 );
    },

    // this function removes the key and the value cached from both arrays
    removeFromCache : function( key ) {
      if ( this.contains( key ) ) {
        // set null to avoid circle references
        this._values[ key ] = null;

        // remove the item
        delete this._values[ key ];

        // remove the key
        for ( var i = 0, len = this._keys.length; i < len; i++ )
          if ( this._keys[ i ] === key )
            this._keys.splice( i, 1 );
      }
    },

    // this function removes all keys and values cached, allowing the GC to clear memory
    clear : function() {
      this._values.length = 0;
      this._values = {};
      this._keys.length = 0;
    },

    isEmpty : function() {
      return ( this.size() === 0 );
    },

    call : function( key, args ) {
      if ( this.contains( key ) && typeof ( this._values[ key ] ) === "function" )
        this._values[ key ]( args );
    },

    getKeys : function() {
      return this._keys;
    },

    getValues : function() {
      var v = new Array();

      for ( var i = 0, len = this.size(); i < len; i++ )
        v[ i ] = this._values[ this._keys[ i ] ];

      return v;
    },

    toArray : function() {
      return this.getValues();
    },

    // stringify only the active elements
    toJSON : function() {
      var v = {};

      for ( var i = 0, len = this.size(); i < len; i++ )
        v[ this._keys[ i ] ] = this._values[ this._keys[ i ] ];

      return JSON.stringify( v );
    },

    clone : function() {
      return new Monogatari.Map( this._keys, this._values );
    },

    iterator : function() {
      return new _Iterator.MapIterator( this._keys, this._values );
    }
  } );
} );
