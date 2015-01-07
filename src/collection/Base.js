define( [ 'core/Common' ], function( _Common ) {

  var Base = function( array ){
    this.values = _Common.isArray( array ) ? array : [];
  };

  Base.prototype.isEmpty = function() {
    return ( this.values.length === 0 );
  };

  return Base;
} );
