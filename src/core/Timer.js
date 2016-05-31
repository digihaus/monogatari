/**
 * Exports a singleton {@link module:core/Timer~Timer|Timer}.
 * @module core/Timer
 */
define(
  function() {

    /**
     * @class Timer
     */
    var Timer = function() {

      /**
       * Current time.
       * @memberOf module:core/Timer~Timer
       * @instance
       * @type {number}
       * @name time
       */
      this.time = 0;

      /**
       * @memberOf module:core/Timer~Timer
       * @instance
       * @type {number}
       * @name lastTime
       */
      this.lastTime = 0;

      /**
       * @memberOf module:core/Timer~Timer
       * @instance
       * @type {number}
       * @name lastFrameTime
       */
      this.lastFrameTime = 0;

      /**
       * Tick counter.
       * @memberOf module:core/Timer~Timer
       * @instance
       * @type {number}
       * @name frameTicks
       */
      this.frameTicks = 0;

      /**
       * Current frames per second, calculated by Timer.tick().
       * @memberOf module:core/Timer~Timer
       * @instance
       * @type {number}
       * @name fps
       */
      this.fps = 60;
    };

    /**
     * 1second / 60frames = 0.016666666667
     * @constant
     * @memberOf module:core/Timer~Timer
     * @type {number}
     */
    Timer.FRAME_RATE_60FPS = 0.016666666667; // 1.0 second / 60.0 frames

    /**
     * Calculates the rate of frames per second the engine is running.
     * It is called on each cycle of engine update.
     * @memberOf module:core/Timer~Timer
     * @instance
     */
    Timer.prototype.tick = function() {
      var now = Date.now();

      this.time += now - this.lastTime;
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

    /**
     * Gets the singleton instance of {@link module:core/Timer~Timer|Timer}.
     * @memberOf module:core/Timer
     * @returns module:core/Timer~Timer|Timer
     */
    function getInstance() {
      if( instance === null ) {
        instance = new Timer();
      }
      return instance;
    }

    return getInstance();
  }
);
