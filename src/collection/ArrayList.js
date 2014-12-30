define( [ 'collection/Base', 'util/CommonUtils' ], function( _Base, _CommonUtils ) {

  var ArrayList = function ( array ) {
    _Base.call( this, array );
  };

  ArrayList.prototype = Object.create( _Base.prototype );

  ArrayList.prototype.size = function() {
    return this.values.length;
  };

  ArrayList.prototype.put = function( value ) {
    this.values.push( value );
  };

  ArrayList.prototype.get = function( index ) {
    return this.values[ index ];
  };

  ArrayList.prototype.remove = function( index ) {
    return this.values.splice( index, 1 );
  };

  ArrayList.prototype.isEmpty = function() {
    return !this.values.length;
  };

  ArrayList.prototype.clear = function() {
    this.values.length = 0;
  };

  ArrayList.prototype.toArray = function() {
    return this.values.slice( 0 );
  };

  ArrayList.prototype.toJSON = function() {
    return JSON.stringify( this.values );
  };

  ArrayList.prototype.contains = function( value ) {
    return this.indexOf( value ) > -1;
  };

  ArrayList.prototype.find = function( value ) {
    for ( var i = 0, len = this.values.length; i < len; ++i ) {
      if ( _CommonUtils.equals( value, this.values[ i ] ) ) {
        return this.values[ i ];
      }
    }
    return null;
  };

  ArrayList.prototype.indexOf = function( value ) {
    for ( var i = 0, len = this.values.length; i < len; ++i ) {
      if ( _CommonUtils.equals( value, this.values[ i ] ) ) {
        return i;
      }
    }
    return -1;
  };

  ArrayList.prototype.lastIndexOf = function( value ) {
    for ( var i = this.values.length - 1; i >= 0; --i ) {
      if ( _CommonUtils.equals( value, this.values[ i ] ) ) {
        return i;
      }
    }
    return -1;
  };

  return ArrayList;

} );
