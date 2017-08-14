define(
  [ 'util/MersenneTwister', 'core/Math' ], function( MersenneTwister, Math ) {

    /**
     * Utility methods for random number generator.
     * @requires lib/mersenne-twister
     * @requires core/Math
     * @exports util/Random
     */
    var Random = function() {
      this.init();
    };

    Random.prototype.init = function( seed ) {
      if( !seed ) {
        seed = new Date();
      }

      this.mt = new MersenneTwister( seed );
    };

    Random.prototype.bool = function() {
      return this.mt.random() * 100 < 50;
    };

    Random.prototype.integer = function( min, max ) {
      var _min = min || 0;
      var _max = max || 100;
      return Math.floor( this.mt.random() * (_max - _min + 1) + _min );
    };

    Random.prototype.percentage = function( chance ) {
      return this.mt.random() * 100 < chance;
    };

    return Random;
  }
);