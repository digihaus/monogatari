define( function() {

  var _time = 0;
  var _lastTime = 0;
  var _maxStep = 60;
  var _cycleTime = 1e9;
  var _lastFrameTime = 0;
  var _frameTicks = 0;
  var _fps = 0;

  return {

    // This should be accessed ONLY on the Game Manager Update
    tick: function() {
      // Use Date.now() instead of new Date().getTime(), avoids one object allocation
      var now = Date.now();
      var delta = now - _lastTime;

      if ( _time > _cycleTime ) {
        time = 0;
      }

      _time += Monogatari.min( delta, _maxStep );
      _lastTime = now;
    },

    getTime: function() {
      if ( _time > _cycleTime ) {
        _time = 0;
      }

      return _time;
    },

    // Returns the difference in milliseconds from the given time, to current Monogatari time
    compare: function( time ) {
      return ( time > _time ) ? _time + _cycleTime - time : _time - time;
    },

    getFps: function() {
      var now = this.getTime();
      var delta = now - _lastFrameTime;

      if ( delta >= 1000 ) {
        _fps = _frameTicks;
        _frameTicks = 0;
        _lastFrameTime = now;
      }

      _frameTicks++;
      return _fps;
    }

  }

} );
