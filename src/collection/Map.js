define( [ 'core/Common' ], function( _Common ) {

  var Map = function() {
    this.keySet = [];
    this.entries = [];
  };

  Map.prototype.indexOf = function( key ) {
    _Common.indexOf( key, this.keys ) > -1;
  };

  Map.prototype.contains = function( key ) {
    this.indexOf( key ) > -1;
  };

  Map.prototype.size = function() {
    return this.keySet.length;
  };

  Map.prototype.put = function( key, value ) {
    if( key ) {
      if( !this.contains( key ) ) {
        this.keySet.push( key );
      }
      this.entries[ key ] = value;
    }
  };

  Map.prototype.get = function( key ) {
    return this.entries[ key ];
  };

  Map.prototype.remove = function( key ) {
    var keyIndex = this.indexOf( key );
    if ( keyIndex >= 0 ) {
      this.keySet.splice( keyIndex, 1 );
      delete this.entries[ key ];
    }
  };

  Map.prototype.isEmpty = function() {
    return this.size() === 0;
  };

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

} );
