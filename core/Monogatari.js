define(['lib/Class', 'lib/Random'], function() {

	var Monogatari = {};

	Monogatari._undefined = undefined;

	// Reduce scope traversal
	Monogatari.acos = Math.acos;
	Monogatari.sqrt = Math.sqrt;
	Monogatari.sin = Math.sin;
	Monogatari.cos = Math.cos;
	Monogatari.tan = Math.tan;
	Monogatari.atan = Math.atan;
	Monogatari.atan2 = Math.atan2;
	Monogatari.pow = Math.pow;
	Monogatari.min = minHack; // Math.min;
	Monogatari.max = maxHack; // Math.max;
	Monogatari.abs = absHack; // Math.abs;
	Monogatari.round = roundHack; // Math.round;
	Monogatari.ceil = ceilHack; // Math.ceil;
	Monogatari.floor = floorHack; // Math.floor;

	// exposes the Chance.js to the engine context, just for consistency (does this use more memory?)
	Monogatari.Random = chance;

	// function hacks
	// from: http://mudcu.be/journal/2011/11/bitwise-gems-and-other-optimizations/
	function roundHack( n ) {
	  return n + ( n < 0 ? -0.5 : 0.5 ) >> 0;
	}

	function ceilHack( n ) {
	  return n + ( n < 0 ? 0 : 1 ) >> 0;
	}

	function floorHack( n ) {
	  // return n + ( n < 0 ? -1 : 0 ) >> 0;
	  return n | 0;
	}

	function absHack( n ) {
	  return n > 0 ? n : -n;
	}

	function minHack( a, b ) {
	  return ( a < b ) ? a : b;
	}

	function maxHack( a, b ) {
	  return ( a > b ) ? a : b;
	}

	// Exposes Monogatari object to an alias.
	window.Monogatari = Monogatari;
});