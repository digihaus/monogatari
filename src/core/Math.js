define(
  [ 'lib/Three' ], function( _Three ) {

    /**
     * @exports Math
     */
    var Math = {};

    var X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );
    var Y_ALIGNED_VECTOR = new THREE.Vector3( 0, 1, 0 );
    var Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );
    var ONE = new THREE.Vector3( 1, 1, 1 );
    var ZERO = new THREE.Vector3( 0, 0, 0 );

    // Function hacks from:
    //  http://mudcu.be/journal/2011/11/bitwise-gems-and-other-optimizations/
    var roundHack = function( n ) {
      return n + ( n < 0 ? -0.5 : 0.5 ) >> 0;
    };
    var ceilHack = function( n ) {
      return n + ( n < 0 ? 0 : 1 ) >> 0;
    };
    var floorHack = function( n ) {
      // return n + ( n < 0 ? -1 : 0 ) >> 0;
      return n | 0;
    };
    var absHack = function( n ) {
      return n > 0 ? n : -n;
    };
    var minHack = function( a, b ) {
      return ( a < b ) ? a : b;
    };
    var maxHack = function( a, b ) {
      return ( a > b ) ? a : b;
    };

    /**
     * @constant
     * @type {number}
     * @default 57.295779513082
     */
    Math.RADTODEG = 57.295779513082;

    /**
     * @constant
     * @type {number}
     * @default 0.0174532925199
     */
    Math.DEGTORAD = 0.0174532925199;

    /**
     * @constant
     * @type {number}
     * @default 1.41421356237
     */
    Math.SQRT_2 = 1.41421356237;

    /**
     * @constant
     * @type {number}
     * @default 3.14159265358979
     */
    Math.PI = 3.14159265358979;

    /**
     * @constant
     * @type {number}
     * @default 6.28318530717958
     */
    Math.PI_2 = 6.28318530717958; // 2 * PI

    /**
     * @constant
     * @type {number}
     * @default 0.0174532925199
     */
    Math.PI_OVER_180 = 0.0174532925199; // PI / 180

    /**
     * @constant
     * @type {number}
     * @default 0.0087266462599
     */
    Math.PI_OVER_360 = 0.0087266462599; // PI / 360

    /**
     * @constant
     * @type {number}
     * @default Math.PI_OVER_180
     */
    Math.ONE_DEGREE = Math.PI_OVER_180; // same as PI_OVER_180, just for coding convenience

    /**
     * @constant
     * @type {number}
     * @default 1048576
     */
    Math.ONE_MEGABYTE = 1048576; // 1024 kilobytes * 1024 bytes

    /**
     * @static
     * @returns {THREE.Vector3}
     */
    Math.getXAlignedVector = function() {
      return X_ALIGNED_VECTOR;
    };

    /**
     * @static
     * @returns {THREE.Vector3}
     */
    Math.getYAlignedVector = function() {
      return Y_ALIGNED_VECTOR;
    };

    /**
     * @static
     * @returns {THREE.Vector3}
     */
    Math.getZAlignedVector = function() {
      return Z_ALIGNED_VECTOR;
    };

    /**
     * @static
     * @returns {THREE.Vector3}
     */
    Math.getVectorOne = function() {
      return ONE;
    };

    /**
     * @static
     * @returns {THREE.Vector3}
     */
    Math.getVectorZero = function() {
      return ZERO;
    };

    /**
     * @static
     * @param {number} a
     * @returns {number}
     */
    Math.toRadians = function( a ) {
      return a * this.DEGTORAD;
    };

    /**
     * @static
     * @param {number} a
     * @returns {number}
     */
    Math.toDegrees = function( a ) {
      return a * this.RADTODEG;
    };

    Math.decimalToBinary = function( num ) {
      return num.toString( 2 );
    };

    Math.decimalToOctal = function( num ) {
      return num.toString( 8 );
    };

    Math.decimalToHex = function( num ) {
      return num.toString( 16 );
    };

    Math.binaryToDecimal = function( num ) {
      return parseInt( num, 2 );
    };

    Math.octalToDecimal = function( num ) {
      return parseInt( num, 8 );
    };

    Math.hexToDecimal = function( num ) {
      return parseInt( num, 16 );
    };

    Math.nearestMultiple = function( numToRound, multiple ) {
      if( multiple === 0 )
        return numToRound;

      var remainder = this.abs( numToRound ) % multiple;
      if( remainder === 0 )
        return numToRound + multiple;
      if( numToRound < 0 )
        return -( this.abs( numToRound ) - remainder );
      return numToRound + multiple - remainder;
    };

    Math.min = minHack; // Math.min
    Math.max = maxHack; // Math.max
    Math.abs = absHack; // Math.abs
    Math.round = roundHack; // Math.round
    Math.ceil = ceilHack; // Math.ceil
    Math.floor = floorHack; // Math.floor

    return Math;
  }
);
