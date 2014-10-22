// portions of the code based on PROCESSING.JS - 1.4.0 by John Resig
/**
 * List is an ordered Collection of elements. This collection allows duplicates and null values. Iterator goes through
 * like a linked list, and ListIterator works like a doubly linked list
 */
define( [ 'core/Monogatari', 'core/collection/Iterator' ], function() {
  Monogatari.List = Class.extend( {
    init : function( array ) {
      this._values = ( Monogatari.Array.isArray( array ) ) ? array : new Array();
    },

    put : function( value ) {
      this._values.push( value );
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

    isEmpty : function() {
      return !this._values.length;
    },

    clear : function() {
      this._values.length = 0;
    },

    toArray : function() {
      return this._values.slice( 0 );
    },

    toJSON : function() {
      return JSON.stringify( this._values );
    },

    contains : function( value ) {
      return this.indexOf( value ) > -1;
    },

    find : function( value ) {
      for ( var i = 0, len = this._values.length; i < len; ++i )
        if ( Monogatari.Util.equals( value, this._values[ i ] ) )
          return this._values[ i ];
      return null;
    },

    indexOf : function( value ) {
      for ( var i = 0, len = this._values.length; i < len; ++i )
        if ( Monogatari.Util.equals( value, this._values[ i ] ) )
          return i;
      return -1;
    },

    lastIndexOf : function( value ) {
      for ( var i = this._values.length - 1; i >= 0; --i )
        if ( Monogatari.Util.equals( value, this._values[ i ] ) )
          return i;
      return -1;
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
} );