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
       * @type {number}
       */
      this.time = 0;

      /**
       * @memberOf module:core/Timer~Timer
       * @type {number}
       */
      this.lastTime = 0;

      /**
       * @memberOf module:core/Timer~Timer
       * @type {number}
       */
      this.lastFrameTime = 0;

      /**
       * Tick counter.
       * @memberOf module:core/Timer~Timer
       * @type {number}
       */
      this.frameTicks = 0;

      /**
       * Current frames per second, calculated by {@link Timer.tick}.
       * @memberOf module:core/Timer~Timer
       * @type {number}
       */
      this.fps = 60;
    };

    /**
     * @constant
     * @memberOf module:core/Timer~Timer
     * @type {number}
     * @default
     */
    Timer.FRAME_RATE_60FPS = 0.016666666667; // 1.0 second / 60.0 frames

    /**
     * Calculates the rate of frames per second the engine is running.
     * Is called on each cycle of engine update.
     * @memberOf module:core/Timer~Timer
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

    /**
     * {@link Timer} instance.
     * @memberOf module:core/Timer
     * @type {Timer}
     */
    var instance = null;

    /**
     * Gets a singleton instance of {@link Timer}.
     * @memberOf module:core/Timer
     * @returns {Timer}
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
