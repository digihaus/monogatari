define(
  [ 'lib/Three' ], function( _Three ) {

    /**
     * Complimentary math functions and constants.
     * @requires lib/Three
     * @exports core/Math
     */
    var Math = {};

    /**
     * THREE.Vector3( 1, 0, 0 )
     * @type {THREE.Vector3}
     */
    Math.X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );

    /**
     * THREE.Vector3( 0, 1, 0 )
     * @type {THREE.Vector3}
     */
    Math.Y_ALIGNED_VECTOR = new THREE.Vector3( 0, 1, 0 );

    /**
     * THREE.Vector3( 0, 0, 1 )
     * @type {THREE.Vector3}
     */
    Math.Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );

    /**
     * THREE.Vector3( 1, 1, 1 )
     * @type {THREE.Vector3}
     */
    Math.VECTOR_ONE = new THREE.Vector3( 1, 1, 1 );

    /**
     * THREE.Vector3( 0, 0, 0 )
     * @type {THREE.Vector3}
     */
    Math.VECTOR_ZERO = new THREE.Vector3( 0, 0, 0 );

    /**
     * Factor to convert radians to degrees: 57.295779513082.
     * @constant
     * @type {Number}
     */
    Math.RADTODEG = 57.295779513082;

    /**
     * Factor to convert degrees to radians: 0.0174532925199.
     * @constant
     * @type {Number}
     */
    Math.DEGTORAD = 0.0174532925199;

    /**
     * 1.41421356237.
     * @constant
     * @type {Number}
     */
    Math.SQRT_2 = 1.41421356237;

    /**
     * 3.14159265358979.
     * @constant
     * @type {Number}
     */
    Math.PI = 3.14159265358979;

    /**
     * 2 * PI = 6.28318530717958.
     * @constant
     * @type {Number}
     */
    Math.PI_2 = 6.28318530717958;

    /**
     * PI / 180 = 0.0174532925199.
     * @constant
     * @type {Number}
     */
    Math.PI_OVER_180 = 0.0174532925199;

    /**
     * PI / 360 = 0.0087266462599.
     * @constant
     * @type {Number}
     */
    Math.PI_OVER_360 = 0.0087266462599;

    /**
     * 1 degree = PI / 180 = 0.0174532925199.
     * @constant
     * @type {Number}
     */
    Math.ONE_DEGREE = Math.PI_OVER_180;

    /**
     * 1024 kilobytes * 1024 bytes = 1048576.
     * @constant
     * @type {Number}
     */
    Math.ONE_MEGABYTE = 1048576;

    /**
     * Converts a given angle in degrees to radians.
     * @param {Number} a - An angle in degrees.
     * @returns {Number} Angle converted to radians.
     */
    Math.toRadians = function( a ) {
      return a * this.DEGTORAD;
    };

    /**
     * Converts a given angle in radians to degrees.
     * @param {Number} a - An angle in radians.
     * @returns {Number} Angle converted to degrees.
     */
    Math.toDegrees = function( a ) {
      return a * this.RADTODEG;
    };

    /**
     * Converts a decimal number to a binary String.
     * @param {Number} num - Decimal number.
     * @returns {String} Number converted to binary string.
     */
    Math.decimalToBinary = function( num ) {
      return num.toString( 2 );
    };

    /**
     * Converts a decimal number to a octal String.
     * @param {Number} num - Decimal number.
     * @returns {String} Number converted to octal string.
     */
    Math.decimalToOctal = function( num ) {
      return num.toString( 8 );
    };

    /**
     * Converts a decimal number to a hexadecimal String.
     * @param {Number} num - Decimal number
     * @returns {String} Number converted to hex string.
     */
    Math.decimalToHex = function( num ) {
      return num.toString( 16 );
    };

    /**
     * Converts a binary String to a decimal number.
     * @param {String} num - Binary string.
     * @returns {Number} Binary string converted to decimal.
     */
    Math.binaryToDecimal = function( num ) {
      return parseInt( num, 2 );
    };

    /**
     * Converts a octal String to a decimal number.
     * @param {String} num - Octal string.
     * @returns {Number} Binary string converted to decimal.
     */
    Math.octalToDecimal = function( num ) {
      return parseInt( num, 8 );
    };

    /**
     * Converts a hexadecimal String to a decimal number.
     * @param {String} num - Hex string.
     * @returns {Number} Binary string converted to decimal.
     */
    Math.hexToDecimal = function( num ) {
      return parseInt( num, 16 );
    };

    /**
     * Rounds the given number to the nearest multiple.
     * @param {Number} numToRound
     * @param {Number} multiple
     * @returns {Number} Nearest multiple.
     */
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
     * @param {Number} a - First number to be compared.
     * @param {Number} b - Second number to be compared.
     * @returns {Number} The minimum value between a and b.
     */
    Math.min = function( a, b ) {
      return ( a < b ) ? a : b;
    };

    /**
     * @param {Number} a - First number to be compared.
     * @param {Number} b - Second number to be compared.
     * @returns {Number} The maximum value between a and b.
     */
    Math.max = function( a, b ) {
      return ( a > b ) ? a : b;
    };

    /**
     * @param {Number} n - The number to get absolute value.
     * @returns {Number} Absolute value of n.
     */
    Math.abs = function( n ) {
      return n > 0 ? n : -n;
    };

    /**
     * @param {Number} n - The number to be rounded.
     * @returns {Number} Rounded value of n.
     */
    Math.round = function( n ) {
      return n + ( n < 0 ? -0.5 : 0.5 ) >> 0;
    };

    /**
     * Gets the nearest upwards integer of n.
     * @param {Number} n - The number to get ceil.
     * @returns {Number} Nearest upwards integer of n.
     */
    Math.ceil = function( n ) {
      return n + ( n < 0 ? 0 : 1 ) >> 0;
    };

    /**
     * Gets the nearest downwards integer of n.
     * @param {Number} n - The number to get floor.
     * @returns {Number} Nearest downwards integer of n.
     */
    Math.floor = function( n ) {
      // return n + ( n < 0 ? -1 : 0 ) >> 0;
      return n | 0;
    };

    return Math;
  }
);
