define( [ '../lib/Three' ], function() {

  var _X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );
  var _Y_ALIGNED_VECTOR =  new THREE.Vector3( 0, 1, 0 );
  var _Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );
  var _ONE = new THREE.Vector3( 1, 1, 1 );
  var _ZERO = new THREE.Vector3( 0, 0, 0 );

  return {

    RADTODEG: 57.295779513082,

    DEGTORAD: 0.0174532925199,

    SQRT_2: 1.41421356237,

    PI: 3.14159265358979,

    PI_2: 6.28318530717958, // 2 * PI

    PI_OVER_180: 0.0174532925199, // 433, // PI / 180

    PI_OVER_360: 0.0087266462599, // 716, // PI / 360

    ONE_DEGREE: this.PI_OVER_180,  // same as PI_OVER_180, just for coding convenience

    getXAlignedVector: function() {
      return _X_ALIGNED_VECTOR;
    },

    getYAlignedVector: function() {
      return _Y_ALIGNED_VECTOR;
    },

    getZAlignedVector: function() {
      return _Z_ALIGNED_VECTOR;
    },

    getVectorOne: function() {
      return _ONE;
    },

    getVectorZero: function() {
      return _ZERO;
    },

    toRadians: function( a ) {
      return a * this.DEGTORAD;
    },

    toDegrees: function( a ) {
      return a * this.RADTODEG;
    },

    decimalToBinary: function( num ) {
      return num.toString( 2 );
    },

    decimalToOctal: function( num ) {
      return num.toString( 8 );
    },

    decimalToHex: function( num ) {
      return num.toString( 16 );
    },

    binaryToDecimal: function( num ) {
      return parseInt( num, 2 );
    },

    octalToDecimal: function( num ) {
      return parseInt( num, 8 );
    },

    hexToDecimal: function( num ) {
      return parseInt( num, 16 );
    },

    // function hacks
    // from: http://mudcu.be/journal/2011/11/bitwise-gems-and-other-optimizations/

    roundHack: function( n ) {
      return n + ( n < 0 ? -0.5 : 0.5 ) >> 0;
    },

    ceilHack: function( n ) {
      return n + ( n < 0 ? 0 : 1 ) >> 0;
    },

    floorHack: function( n ) {
      // return n + ( n < 0 ? -1 : 0 ) >> 0;
      return n | 0;
    },

    absHack: function( n ) {
      return n > 0 ? n : -n;
    },

    minHack: function( a, b ) {
      return ( a < b ) ? a : b;
    },

    maxHack: function( a, b ) {
      return ( a > b ) ? a : b;
    },

    // Reduce scope traversal

    acos: Math.acos,

    sqrt: Math.sqrt,

    sin: Math.sin,

    cos: Math.cos,

    tan: Math.tan,

    atan: Math.atan,

    atan2: Math.atan2,

    pow: Math.pow,

    min: this.minHack, // Math.min

    max: this.maxHack, // Math.max

    abs: this.absHack, // Math.abs

    round: this.roundHack, // Math.round

    ceil: this.ceilHack, // Math.ceil

    floor: this.floorHack, // Math.floor

  }

} );
