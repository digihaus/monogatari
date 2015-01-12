define( [ 'core/Common' ], function( _Common ) {

  var BaseCollection = function( array ){
    this.values = _Common.isArray( array ) ? array : [];
  };

  BaseCollection.prototype.isEmpty = function() {
    return ( this.values.length === 0 );
  };

  return BaseCollection;
} );
