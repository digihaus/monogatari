// @Requires[core/Monogatari.js]
// @Requires[core/Timer.js]
// @Requires[core/Constants.js]
// @Requires[lib/Three.js]

Monogatari.Mouse = new MonogatariMouse();
  function MonogatariMouse() {
  
    // Constructor -----------------------
    window.addEventListener( 'mousemove', function( event ) {
      Monogatari.Mouse.onMouseMove( event );
    }, false );
    window.addEventListener( 'mousedown', function( event ) {
      Monogatari.Mouse.onMouseDown( event );
    }, false );
    window.addEventListener( 'mouseup', function( event ) {
      Monogatari.Mouse.onMouseUp( event );
    }, false );
    // -----------------------------------
  
    this._pressed = new Int8Array(6);
  
    this.position = new THREE.Vector3( 0, 0, 0 );
    this._buffer = new THREE.Vector3( 0, 0, 0 );
  
    this.MOUSE_LMB = 0;
    this.MOUSE_MID = 1;
    this.MOUSE_RMB = 2;
    this.MOUSE_B3 = 3;
    this.MOUSE_B4 = 4;
    this.MOUSE_B5 = 5;
  
    // fill the pressed keys array for caching
    for(var i = 0, len = this._pressed.length; i < len; i++)
      this._pressed[i] = -1;
  
  };
  
  MonogatariMouse.prototype.isDown = function( button ) {
    return ( this._pressed[button] === -1 ) ? null : this._pressed[button] ;
  };
  
  MonogatariMouse.prototype.onMouseMove = function( event ) {
    this.position.set( event.clientX, event.clientY, 0 );
  };
  
  MonogatariMouse.prototype.onMouseDown = function( event ) {
    event.preventDefault();
    this._pressed[event.button] = Monogatari.Time.time;
  };
  
  MonogatariMouse.prototype.onMouseUp = function( event ) {
    this._pressed[event.button] = -1;
  };
  
  MonogatariMouse.prototype.getMousePositionOnElement = function( e ){
    var rect = e.getBoundingClientRect();
    this._buffer.set( this.position.getX() - rect.left, this.position.getY() - rect.top, 0 );
    return this._buffer; 
  };