define( [ 'lib/Three' ], function( _Three ) {

  var Math = {};

  var X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );
  var Y_ALIGNED_VECTOR = new THREE.Vector3( 0, 1, 0 );
  var Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );
  var ONE = new THREE.Vector3( 1, 1, 1 );
  var ZERO = new THREE.Vector3( 0, 0, 0 );

  // function hacks
  // from: http://mudcu.be/journal/2011/11/bitwise-gems-and-other-optimizations/
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

  Math.RADTODEG = 57.295779513082;

  Math.DEGTORAD = 0.0174532925199;

  Math.SQRT_2 = 1.41421356237;

  Math.PI = 3.14159265358979;

  Math.PI_2 = 6.28318530717958; // 2 * PI

  Math.PI_OVER_180 = 0.0174532925199; // PI / 180

  Math.PI_OVER_360 = 0.0087266462599; // PI / 360

  Math.ONE_DEGREE = Math.PI_OVER_180;  // same as PI_OVER_180, just for coding convenience

  Math.ONE_MEGABYTE = 1048576; // 1024 kilobytes * 1024 bytes

  Math.getXAlignedVector = function() {
    return X_ALIGNED_VECTOR;
  };

  Math.getYAlignedVector = function() {
    return Y_ALIGNED_VECTOR;
  };

  Math.getZAlignedVector = function() {
    return Z_ALIGNED_VECTOR;
  };

  Math.getVectorOne = function() {
    return ONE;
  };

  Math.getVectorZero = function() {
    return ZERO;
  };

  Math.toRadians = function( a ) {
    return a * this.DEGTORAD;
  };

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

  Math.acos = Math.acos;

  Math.sqrt = Math.sqrt;

  Math.sin = Math.sin;

  Math.cos = Math.cos;

  Math.tan = Math.tan;

  Math.atan = Math.atan;

  Math.atan2 = Math.atan2;

  Math.pow = Math.pow;

  Math.min = minHack; // Math.min

  Math.max = maxHack; // Math.max

  Math.abs = absHack; // Math.abs

  Math.round = roundHack; // Math.round

  Math.ceil = ceilHack; // Math.ceil

  Math.floor = floorHack; // Math.floor

  return Math;

} );
