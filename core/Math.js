/**
 * Math functions for use as static methods.
 */
define(['core/Monogatari', 'core/Constants', 'core/Util', 'lib/Three'], function() {
	Monogatari.Math = new MonogatariMath();
	function MonogatariMath() {
	  // base normalized axis aligned vectors
	  this._X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );
	  this._Y_ALIGNED_VECTOR = new THREE.Vector3( 0, 1, 0 );
	  this._Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );

	  this._ONE = new THREE.Vector3( 1, 1, 1 );
	  this._ZERO = new THREE.Vector3( 0, 0, 0 );
	};

	MonogatariMath.prototype.getXAlignedVector = function() {
	  return this._X_ALIGNED_VECTOR;
	};

	MonogatariMath.prototype.getYAlignedVector = function() {
	  return this._Y_ALIGNED_VECTOR;
	};

	MonogatariMath.prototype.getZAlignedVector = function() {
	  return this._Z_ALIGNED_VECTOR;
	};

	MonogatariMath.prototype.getVectorOne = function() {
	  return this._ONE;
	};

	MonogatariMath.prototype.getVectorZero = function() {
	  return this._ZERO;
	};

	/**
	 * Converts the given degrees to radians.
	 * 
	 * @return float
	 */
	MonogatariMath.prototype.toRadians = function( a ) {
	  return a * Monogatari.Constants.DEGTORAD;
	};

	/**
	 * Converts the given radians to degrees.
	 * 
	 * @return float
	 */
	MonogatariMath.prototype.toDegrees = function( a ) {
	  return a * Monogatari.Constants.RADTODEG;
	};

	MonogatariMath.prototype.decimalToBinary = function( num ) {
	  return num.toString( 2 );
	};

	MonogatariMath.prototype.decimalToOctal = function( num ) {
	  return num.toString( 8 );
	};

	MonogatariMath.prototype.decimalToHex = function( num ) {
	  return num.toString( 16 );
	};

	MonogatariMath.prototype.binaryToDecimal = function( num ) {
	  return parseInt( num, 2 );
	};

	MonogatariMath.prototype.octalToDecimal = function( num ) {
	  return parseInt( num, 8 );
	};

	MonogatariMath.prototype.hexToDecimal = function( num ) {
	  return parseInt( num, 16 );
	};
});