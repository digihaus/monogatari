define( [ 'core/Monogatari', 'core/collection/Iterator' ], function() {
  Monogatari.Pool = Class.extend( {
    init : function() {
      this._values = [];
      this._freeIndexes = [];
    },

    put : function() {

    },

    size : function() {
      return this._values.length;
    },

    get : function( index ) {
      return this._values[ index ];
    },

    remove : function( index ) {
      return this._values.splice( index, 1 );
    },

    grow : function( amount ) {

    },

    free : function() {

    },

    isEmpty : function() {
      return !this._values.length;
    },

    clear : function() {
      this._values.length = 0;
      this._freeIndexes.length = 0;
    },

    toArray : function() {
      return this._values.slice( 0 );
    },

    toJSON : function() {
      return JSON.stringify( this._values );
    },

    // linked list iterator
    iterator : function() {
      return new Monogatari.Iterator( this._values );
    },

    // doubly linked list iterator
    listIterator : function() {
      return new Monogatari.ListIterator( this._values );
    }
  } );

  Monogatari.PoolNode = Class.extend( {
    init : function( index, value, alive ) {
      this.index = ( index ) ? index : 0;
      this.value = ( value ) ? value : null;
      this.alive = ( typeof ( alive ) === "boolean" ) ? alive : false;
    },

    equals : function( other ) {
      return Monogatari.Util.equals( other.value, this.value );
    }
  } );

} );