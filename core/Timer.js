// @Requires[core/Monogatari.js]

Monogatari.Time = new MonogatariTime();
function MonogatariTime() {

  this._last = 0;
  this._cycleTime = 1e9; // exponential notation, 1e9 = 1 with nine zeros

  this.time = 0;
  this.maxStep = 60;
};

// this should be accessed ONLY on the Game Manager Update
MonogatariTime.prototype.tick = function() {
  // use Date.now() instead of new Date().getTime(), avoids one object allocation
  var now = Date.now(),
      delta = now - this._last;

  if ( this.time > this._cycleTime )
    this.time = 0;

  this.time += Monogatari.min( delta, this.maxStep );
  this._last = now;
};

MonogatariTime.prototype.getTime = function() {
  if ( this.time > this._cycleTime )
    this.time = 0;

  return this.time;
};

// returns the difference in milliseconds from the given time, to current Monogatari time
MonogatariTime.prototype.compare = function( time ) {
  return ( time > this.time ) ? this.time + this._cycleTime - time : this.time - time;
};

Monogatari.Frames = new MonogatariFrames();
function MonogatariFrames() {
  this._lastTime = 0;
  this._ticks = 0;
  this._fps = 0;
};

MonogatariFrames.prototype.getFps = function() {
  var now = Monogatari.Time.getTime(),
      delta = now - this._lastTime;

  if ( delta >= 1000 ) {
    this._fps = this._ticks;
    this._ticks = 0;
    this._lastTime = now;
  }

  this._ticks++;
  return this._fps;
};