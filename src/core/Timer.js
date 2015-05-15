define(
  function() {

    var Timer = function() {
      this.time = 0;
      this.lastTime = 0;
      this.lastFrameTime = 0;
      this.frameTicks = 0;
      this.fps = 60;
    };

    Timer.FRAME_RATE_60FPS = 0.016666666667; // 1.0 second / 60.0 frames

    /**
     * Shall be accessed only on engine Update.
     */
    Timer.prototype.tick = function() {
      var now = Date.now();
      var delta = now - this.lastTime;

      this.time += delta;
      this.lastTime = now;

      // Initiates lastFrameTime for first cycle
      if( this.lastFrameTime == 0 ) {
        this.lastFrameTime = this.time;
      }

      var frameDelta = this.time - this.lastFrameTime;

      if( frameDelta >= 1000 ) {
        // Gets the stored frame ticks for 1 second (FPS)
        this.fps = this.frameTicks;
        this.frameTicks = 0;
        this.lastFrameTime = this.time;
      }

      // Frame counting
      this.frameTicks++;
    };

    var instance = null;

    Timer.getInstance = function() {
      if( instance === null ) {
        instance = new Timer();
      }
      return instance;
    };

    return Timer.getInstance();
  }
);
