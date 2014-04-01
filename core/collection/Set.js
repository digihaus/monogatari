// @Requires[core/Monogatari.js]
// @Requires[core/collection/Iterator.js]

/**
 * Set is an ordered Collection of elements. A set cannot contain duplicate values. By inserting an existing value, the
 * collection will remain unchanged.
 */
Monogatari.Set = Class.extend( {
  init : function() {
    this._values = new Array();
  },

  put : function( value ) {
    if ( !this.contains( value ) )
      this._values.push( value );
  },

  clear : function() {
    this._values.length = 0;
  },

  contains : function( value ) {
    return this.indexOf( value ) > -1;
  },

  indexOf : function( value ) {
    return Monogatari.Array.indexOf( value, this._values );
  },

  size : function() {
    return this._values.length;
  },

  concat : function( collection ) {
    this._values.concat( collection.toArray() );
    return this._values.slice( 0 );
  },

  remove : function( value ) {
    if ( indexOf )
      return this._values.splice( this._values.indexOf( value ), 1 );

    for ( var i = 0, len = this._values.length; i < len; i++ )
      if ( i in this._values && this._values[ i ] === value )
        return this._values.splice( i, 1 );
  },

  isEmpty : function() {
    return ( this.size() === 0 );
  },

  toArray : function() {
    return this._values.slice( 0 );
  },

  // this.sort = function() {};
  toJSON : function() {
    return JSON.stringify( this._values );
  },

  iterator : function() {
    return new Monogatari.ListIterator( this._values );
  }
} );