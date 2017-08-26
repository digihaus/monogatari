/**
 * @exports core/Timer
 */
var Timer = {};

/**
 * Current time.
 * @type {Number}
 */
Timer.time = 0;

/**
 * @type {Number}
 */
Timer.lastTime = 0;

/**
 * @type {Number}
 */
Timer.lastFrameTime = 0;

/**
 * Tick counter.
 * @type {Number}
 */
Timer.frameTicks = 0;

/**
 * Current frames per second, calculated by {@link module:core/Timer#tick|tick()}.
 * @see module:core/Timer.tick
 * @type {Number}
 */
Timer.fps = 60;

/**
 * 1 second / 60 frames = 0.016666666667
 * @constant
 * @type {Number}
 */
Timer.FRAME_RATE_60FPS = 0.016666666667;

/**
 * Calculates the rate of frames per second the engine is running.
 * It is called on each cycle of engine update.
 */
Timer.tick = function () {
  var now = Date.now();

  this.time += now - this.lastTime;
  this.lastTime = now;

  // Initiates lastFrameTime for first cycle
  if (this.lastFrameTime == 0) {
    this.lastFrameTime = this.time;
  }

  var frameDelta = this.time - this.lastFrameTime;

  if (frameDelta >= 1000) {
    // Gets the stored frame ticks for 1 second (FPS)
    this.fps = this.frameTicks;
    this.frameTicks = 0;
    this.lastFrameTime = this.time;
  }

  // Frame counting
  this.frameTicks++;
};

module.exports = Timer;