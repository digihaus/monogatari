/**
 * Complimentary math functions and constants.
 * @module core/Math
 */
define(
  [ 'lib/Three' ], function( _Three ) {

    /**
     * @constructor
     * @alias module:core/Math
     */
    var Math = {};

    var X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );
    var Y_ALIGNED_VECTOR = new THREE.Vector3( 0, 1, 0 );
    var Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );
    var ONE = new THREE.Vector3( 1, 1, 1 );
    var ZERO = new THREE.Vector3( 0, 0, 0 );

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.RADTODEG = 57.295779513082;

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.DEGTORAD = 0.0174532925199;

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.SQRT_2 = 1.41421356237;

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.PI = 3.14159265358979;

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.PI_2 = 6.28318530717958; // 2 * PI

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.PI_OVER_180 = 0.0174532925199; // PI / 180

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.PI_OVER_360 = 0.0087266462599; // PI / 360

    /**
     * @constant
     * @type {number}
     * @default
     */
    Math.ONE_DEGREE = Math.PI_OVER_180;

    /**
     * 1024 kilobytes * 1024 bytes.
     *
     * @constant
     * @type {number}
     * @default
     */
    Math.ONE_MEGABYTE = 1048576;

    /**
     * @returns {THREE.Vector3}
     */
    Math.getXAlignedVector = function() {
      return X_ALIGNED_VECTOR;
    };

    /**
     * @returns {THREE.Vector3}
     */
    Math.getYAlignedVector = function() {
      return Y_ALIGNED_VECTOR;
    };

    /**
     * @returns {THREE.Vector3}
     */
    Math.getZAlignedVector = function() {
      return Z_ALIGNED_VECTOR;
    };

    /**
     * @returns {THREE.Vector3}
     */
    Math.getVectorOne = function() {
      return ONE;
    };

    /**
     * @returns {THREE.Vector3}
     */
    Math.getVectorZero = function() {
      return ZERO;
    };

    /**
     * @param {number} a An angle in degrees.
     * @returns {number} Angle converted to radians.
     */
    Math.toRadians = function( a ) {
      return a * this.DEGTORAD;
    };

    /**
     * @param {number} a An angle in radians.
     * @returns {number} Angle converted to degrees.
     */
    Math.toDegrees = function( a ) {
      return a * this.RADTODEG;
    };

    /**
     * @param {number} num Decimal number.
     * @returns {string} Number converted to binary string.
     */
    Math.decimalToBinary = function( num ) {
      return num.toString( 2 );
    };

    /**
     * @param {number} num Decimal number.
     * @returns {string} Number converted to octal string.
     */
    Math.decimalToOctal = function( num ) {
      return num.toString( 8 );
    };

    /**
     * @param {number} num Decimal number
     * @returns {string} Number converted to hex string.
     */
    Math.decimalToHex = function( num ) {
      return num.toString( 16 );
    };

    /**
     * @param {string} num Binary string.
     * @returns {number} Binary string converted to decimal.
     */
    Math.binaryToDecimal = function( num ) {
      return parseInt( num, 2 );
    };

    /**
     * @param {string} num Octal string.
     * @returns {number} Binary string converted to decimal.
     */
    Math.octalToDecimal = function( num ) {
      return parseInt( num, 8 );
    };

    /**
     * @param {string} num Hex string.
     * @returns {number} Binary string converted to decimal.
     */
    Math.hexToDecimal = function( num ) {
      return parseInt( num, 16 );
    };

    Math.nearestMultiple = function( numToRound, multiple ) {
      if( multiple === 0 ) {
        return numToRound;
      }

      var remainder = this.abs( numToRound ) % multiple;
      if( remainder === 0 ) {
        return numToRound + multiple;
      }
      if( numToRound < 0 ) {
        return -( this.abs( numToRound ) - remainder );
      }
      return numToRound + multiple - remainder;
    };

    // Function hacks from:
    // http://mudcu.be/journal/2011/11/bitwise-gems-and-other-optimizations/

    /**
     * @param {number} a First number to be compared.
     * @param {number} b Second number to be compared.
     * @returns {number} The minimum value between a and b.
     */
    Math.min = function( a, b ) {
      return ( a < b ) ? a : b;
    };

    /**
     * @param {number} a First number to be compared.
     * @param {number} b Second number to be compared.
     * @returns {number} The maximum value between a and b.
     */
    Math.max = function( a, b ) {
      return ( a > b ) ? a : b;
    };

    /**
     * @param {number} n The number to get absolute value.
     * @returns {number} Absolute value of n.
     */
    Math.abs = function( n ) {
      return n > 0 ? n : -n;
    };

    /**
     * @param {number} n The number to be rounded.
     * @returns {number} Rounded value of n.
     */
    Math.round = function( n ) {
      return n + ( n < 0 ? -0.5 : 0.5 ) >> 0;
    };

    /**
     * Gets the nearest upwards integer of n.
     * @param {number} n The number to get ceil.
     * @returns {number} Nearest upwards integer of n.
     */
    Math.ceil = function( n ) {
      return n + ( n < 0 ? 0 : 1 ) >> 0;
    };

    /**
     * Gets the nearest downwards integer of n.
     * @param {number} n The number to get floor.
     * @returns {number} Nearest downwards integer of n.
     */
    Math.floor = function( n ) {
      // return n + ( n < 0 ? -1 : 0 ) >> 0;
      return n | 0;
    };

    return Math;
  }
);
