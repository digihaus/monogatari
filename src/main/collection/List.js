define(
  [ 'core/Common' ], function( Common ) {

    var List = function( array ) {
      this.values = Common.isArray( array ) ? array : [];
    };

    List.prototype.size = function() {
      return this.values.length;
    };

    List.prototype.put = function( value ) {
      this.values.push( value );
    };

    List.prototype.get = function( index ) {
      return this.values[ index ];
    };

    List.prototype.remove = function( index ) {
      return this.values.splice( index, 1 );
    };

    List.prototype.isEmpty = function() {
      return !this.values.length;
    };

    List.prototype.clear = function() {
      this.values.length = 0;
    };

    List.prototype.toArray = function() {
      return this.values.slice( 0 );
    };

    List.prototype.indexOf = function( value ) {
      return Common.indexOf( value, this.values );
    };

    List.prototype.contains = function( value ) {
      return this.indexOf( value ) > -1;
    };

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
