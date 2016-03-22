/**
 * Exports the {@link module:input/Mouse~Mouse|Mouse} class.
 * @module input/Mouse
 */
define(
  [ 'lib/Three' ], function( _Three ) {

    /**
     * Map and listens buttons and positions for mouse input
     * @class Mouse
     */
    var Mouse = function() {
      /**
       * Array of pressed buttons, they Store a timestamp if pressed or -1 of not pressed
       * @memberOf module:input/Mouse~Mouse
       * @instance
       * @type {Int32Array}
       * @name pressed
       */
      this.pressed = new Int32Array( 8 );

      /**
       * 3D vector of mouse of the position based on a DOM element (that is not the body tag).
       * @memberOf module:input/Mouse~Mouse
       * @instance
       * @type {Vector3}
       * @name buffer
       * @default Vector3( 0, 0, 0 )
       */
      this.buffer = new THREE.Vector3( 0, 0, 0 );

      /**
       * 3D vector of mouse position.
       * @memberOf module:input/Mouse~Mouse
       * @instance
       * @type {Vector3}
       * @name position
       * @default Vector3( 0, 0, 0 )
       */
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

    /**
     * Check if a button is pressed
     * @method
     * @instance
     * @name isDown
     * @param {Number} keyCode Constant of a button mapped
     * @return Number Timestamp of the last time the key was pressed or null if not pressed
     * @memberOf module:input/Mouse~Mouse
     */
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

    /**
     * Captures the position of the mouse using the given element as reference.
     * @method
     * @instance
     * @name getMousePositionOnElement
     * @param {DOMElement} e Target node of the Dom tree to watch.
     * @return {Vector3}
     * @memberOf module:input/Mouse~Mouse
     */
    Mouse.prototype.getMousePositionOnElement = function( e ) {
      var rect = e.getBoundingClientRect();
      this.buffer.set( this.position.x - rect.left, this.position.y - rect.top, 0 );
      return this.buffer;
    };

    return Mouse;
  }
);
