define( [ 'core/Timer', 'lib/Three' ], function( timer, three ) {

  var _pressed = new Int8Array( 6 );
  var _buffer = new THREE.Vector3( 0, 0, 0 );
  var _position = new THREE.Vector3( 0, 0, 0 );

  // fill the pressed keys array for caching
  for ( var i = 0, len = _pressed.length; i < len; i++ ) {
    _pressed[ i ] = -1;
  }

  return {

    MOUSE_LMB: 0,
    MOUSE_MID: 1,
    MOUSE_RMB: 2,
    MOUSE_B3: 3,
    MOUSE_B4: 4,
    MOUSE_B5: 5,

    isDown: function( button ) {
      return ( _pressed[ button ] === -1 ) ? null : _pressed[ button ];
    },

    onMouseMove: function( event ) {
      _position.set( event.clientX, event.clientY, 0 );
    },

    onMouseDown: function( event ) {
      event.preventDefault();
      _pressed[ event.button ] = timer.time;
    },

    onMouseUp: function( event ) {
      _pressed[ event.button ] = -1;
    },

    getMousePositionOnElement: function( e ) {
      var rect = e.getBoundingClientRect();
      _buffer.set( _position.getX() - rect.left, _position.getY() - rect.top, 0 );
      return _buffer;
    }

  }

} );
