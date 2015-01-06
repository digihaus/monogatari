define( [ 'core/Math' ], function( _Math ) {

  var Timer = function() {
    this.time = 0;
    this.lastTime = 0;
    this.maxStep = 60;
    this.cycleTime = 1e9;
    this.lastFrameTime = 0;
    this.frameTicks = 0;
    this.fps = 0;
  };

  Timer.FRAME_RATE_60FPS = 0.016666666667; // 1.0 second / 60.0 frames

  // This should be accessed ONLY on the Game Manager Update
  Timer.prototype.tick = function() {
    // Use Date.now() instead of new Date().getTime(), avoids one object allocation
    var now = Date.now();
    var delta = now - this.lastTime;

    if ( this.time > this.cycleTime ) {
      time = 0;
    }

    this.time += _Math.min( delta, this.maxStep );
    this.lastTime = now;
  };

  Timer.prototype.getTime = function() {
    if ( this.time > this.cycleTime ) {
      this.time = 0;
    }

    return this.time;
  };

  // Returns the difference in milliseconds from the given time, to current Monogatari time
  Timer.prototype.compare = function( time ) {
    return ( time > this.time ) ? this.time + this.cycleTime - time : this.time - time;
  };

  Timer.prototype.getFps = function() {
    var now = this.getTime();
    var delta = now - this.lastFrameTime;

    if ( delta >= 1000 ) {
      this.fps = this.frameTicks;
      this.frameTicks = 0;
      this.lastFrameTime = now;
    }

    this.frameTicks++;
    return this.fps;
  };

  return Timer;

} );
