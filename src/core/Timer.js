define( function() {

  var Timer = function() {
    this.time = 0;
    this.lastTime = 0;
    this.lastFrameTime = 0;
    this.frameTicks = 0;
    this.fps = 60;

    this.FRAME_RATE_60FPS = 0.016666666667; // 1.0 second / 60.0 frames
  };

  // This should be accessed ONLY on engine Update
  Timer.prototype.tick = function() {

    // Use Date.now() instead of new Date().getTime(), avoids one object allocation
    var now = Date.now();
    var delta = now - this.lastTime;

    this.time += delta;
    this.lastTime = now;

    // Initiates lastFrameTime for first cycle
    if( this.lastFrameTime == 0 ) {
      this.lastFrameTime = this.time;
    }

    var frameDelta = this.time - this.lastFrameTime;

    if ( frameDelta >= 1000 ) {
      // In one second gets the stored frame ticks (FPS) and resets frame ticker
      this.fps = this.frameTicks;
      this.frameTicks = 0;
      this.lastFrameTime = this.time;
    }

    // Stores frame ticks per cycle
    this.frameTicks++;
  };

  return Timer;

} );
