define( [ 'collection/Base', 'core/Common' ], function( _Base, _Common ) {

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

  ArrayList.prototype.indexOf = function( value ) {
    return _Common.indexOf( value, this.values );
  };

  ArrayList.prototype.contains = function( value ) {
    return this.indexOf( value ) > -1;
  };

  ArrayList.prototype.iterator = function() {
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

  return ArrayList;

} );
