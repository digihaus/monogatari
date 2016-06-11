define(
  [ 'lib/Three' ], function( _Three ) {

    /**
     * Map and listens buttons and positions for mouse input
     * @requires lib/Three
     * @exports input/Mouse
     */
    var Mouse = function() {
      /**
       * Array of pressed buttons, they Store a timestamp if pressed or -1 of not pressed.
       * @type {Int32Array}
       */
      this.pressed = new Int32Array( 8 );

      /**
       * 3D vector of mouse of the position based on a DOM element (that is not the body tag).
       * @type {THREE.Vector3}
       * @default Vector3( 0, 0, 0 )
       */
      this.buffer = new THREE.Vector3( 0, 0, 0 );

      /**
       * 3D vector of mouse position.
       * @type {THREE.Vector3}
       * @default Vector3( 0, 0, 0 )
       */
      this.position = new THREE.Vector3( 0, 0, 0 );

      for( var i = 0, len = this.length; i < len; i++ ) {
        this.pressed[ i ] = -1;
      }
    };

    /**
     * @enum
     */
    Mouse.BUTTON = {
      /** Left Mouse Button */
      LMB: 1,
      /** Middle Mouse Button */
      MID: 2,
      /** Right Mouse Button */
      RMB: 3,
      /** Mouse Button 3 */
      B3: 4,
      /** Mouse Button 4 */
      B4: 5,
      /** Mouse Button 5 */
      B5: 6,
      /** Mouse Button 6 */
      B6: 7,
      /** Mouse Button 7 */
      B7: 8
    };

    /**
     * Checks if a button is pressed.
     * @param {Number} keyCode - Constant of a button mapped
     * @return {Number} Timestamp of the last time the key was pressed or null if not pressed
     */
    Mouse.prototype.isDown = function( button ) {
      return ( this.pressed[ button ] === -1 ) ? null : this.pressed[ button ];
    };

    /**
     * @param {Event} event
     */
    Mouse.prototype.onMouseMove = function( event ) {
      this.position.set( event.clientX, event.clientY, 0 );
    };

    /**
     * @param {Event} event
     * @param {module:core/Timer} timer
     */
    Mouse.prototype.onMouseDown = function( event, timer ) {
      event.preventDefault();
      event.stopPropagation();
      this.pressed[ event.button ] = timer.time;
    };

    /**
     * @param {Event} event
     */
    Mouse.prototype.onMouseUp = function( event ) {
      event.stopPropagation();
      this.pressed[ event.button ] = -1;
    };

    /**
     * Captures the position of the mouse using the given element as reference.
     * @param {DOMElement} e - Target node of the Dom tree to watch.
     * @return {THREE.Vector3}
     */
    Mouse.prototype.getMousePositionOnElement = function( e ) {
      var rect = e.getBoundingClientRect();
      this.buffer.set( this.position.x - rect.left, this.position.y - rect.top, 0 );
      return this.buffer;
    };

    return Mouse;
  }
);
