define( function() {

  var Base = function( array ){
    this.values = ( Object.prototype.toString.apply( array ) === '[object Array]' ) ? array : new Array();
  };

  Base.prototype.iterator = function() {
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

  return Base;

} );
