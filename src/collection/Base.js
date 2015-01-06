define( [ 'core/Common' ], function( _Common ) {

  var Base = function( array ){
    this.values = _Common.isArray( array ) ? array : [];
  };

  return Base;

} );
