// @Requires[core/Monogatari.js]
Monogatari.Queue = Class.extend( {
  init : function() {
    this._values = new Array();
  },

  put : function( element ) {
    this._values.push( element );
  },

  read : function() {
    var length = this._values.length;
    var elements = new Array();
    for ( var i = 0; i < length; i++ )
      elements.push( this._values.shift() );
    return elements;
  },

  contains : function( element ) {
    var length = this._values.length;
    var elements = new Array();
    for ( var i = 0; i < length; i++ ) {
      if ( elements[ i ] === element ) {
        return true;
      }
    }
    return false;
  },

  size : function() {
    return this._values.length;
  },

  toJSON : function() {
    return JSON.stringify( this._values );
  }
} );