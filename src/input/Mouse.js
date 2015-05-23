define(
  [ 'lib/Three' ], function( _Three ) {

    var Mouse = function() {
      this.pressed = new Int32Array( 8 );
      this.buffer = new THREE.Vector3( 0, 0, 0 );
      this.position = new THREE.Vector3( 0, 0, 0 );

      for( var i = 0, len = this.length; i < len; i++ ) {
        this.pressed[ i ] = -1;
      }
    };

    Mouse.prototype.LMB = 0;
    Mouse.prototype.MID = 1;
    Mouse.prototype.RMB = 2;
    Mouse.prototype.B3 = 3;
    Mouse.prototype.B4 = 4;
    Mouse.prototype.B5 = 5;
    Mouse.prototype.B6 = 6;
    Mouse.prototype.B7 = 7;

    Mouse.prototype.isDown = function( button ) {
      return ( this.pressed[ button ] === -1 ) ? null : this.pressed[ button ];
    };

    Mouse.prototype.onMouseMove = function( event ) {
      this.position.set( event.clientX, event.clientY, 0 );
    };

    Mouse.prototype.onMouseDown = function( event, timer ) {
      event.preventDefault();
      this.pressed[ event.button ] = timer.time;
    };

    Mouse.prototype.onMouseUp = function( event ) {
      this.pressed[ event.button ] = -1;
    };

    Mouse.prototype.getMousePositionOnElement = function( e ) {
      var rect = e.getBoundingClientRect();
      this.buffer.set( this.position.x - rect.left, this.position.y - rect.top, 0 );
      return this.buffer;
    };

    return Mouse;
  }
);
